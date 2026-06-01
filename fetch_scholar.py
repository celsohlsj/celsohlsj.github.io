"""
fetch_scholar.py
================
Busca métricas e artigos científicos do Google Scholar via SerpAPI.

Regras de filtragem aplicadas a cada item retornado pelo Scholar:
  ✅ MANTÉM  — artigos em periódicos científicos
  ❌ REMOVE  — livros, capítulos, dissertações, teses, resumos em anais,
               relatórios técnicos, notas técnicas, policy briefs,
               preprints sem periódico identificado, e itens sem ano

Saída:
  data/scholar_data.json   — métricas do autor (citações, h-index, i10)
  data/scholar_papers.json — apenas artigos em periódicos

Uso:
  pip install google-search-results
  export SERPAPI_KEY="sua_chave_serpapi"
  python fetch_scholar.py

Automação: .github/workflows/update_scholar.yml  (toda segunda, 06h UTC)
"""

import re
import json
import os
import time
from serpapi import GoogleSearch

# ── configuração ──────────────────────────────────────────────────── #
SCHOLAR_ID = "UEWx5SkAAAAJ"          # ID Google Scholar do autor
API_KEY    = os.environ.get("SERPAPI_KEY", "")
if not API_KEY:
    raise SystemExit("❌  SERPAPI_KEY environment variable is not set. "
                     "Add it as a GitHub Actions secret named SERPAPI_KEY.")
PAGE_SIZE  = 100                      # máximo permitido pela API
SLEEP_SEC  = 1.2                      # pausa entre páginas (rate-limit)


# ── tokens que identificam NÃO-periódicos ─────────────────────────── #
# Se qualquer token aparecer no campo "publication" do Scholar,
# o item é descartado.
BOOK_TOKENS = [
    # livros / capítulos
    "springer", "elsevier book", "academic press", "wiley book",
    "cambridge university press", "oxford university press",
    "editora", "publisher", "isbn",
    # anais / conferências
    "proceedings", "anais", "simpósio", "symposium", "congress",
    "conference", "workshop", "meeting", "sbsr",
    # teses / dissertações
    "dissertation", "dissertação", "thesis", "tese", "mestrado",
    "doutorado", "monografia",
    # relatórios / notas técnicas
    "technical report", "nota técnica", "nota metodológica",
    "policy brief", "relatório",
    # preprints sem periódico
    "biorxiv", "arxiv", "ssrn", "preprint",
]

# Se o campo "publication" estiver vazio ou for apenas o ano,
# o item também é descartado.
YEAR_ONLY_RE = re.compile(r'^\s*\d{4}\s*$')


# ── helpers ───────────────────────────────────────────────────────── #
def extract_year(pub_str: str) -> int | None:
    m = re.search(r'\b(19|20)\d{2}\b', pub_str or '')
    return int(m.group()) if m else None


def normalise_authors(authors: str | None) -> str | None:
    """Garante 'Silva-Junior' com hífen em todas as entradas."""
    if not authors:
        return authors
    return re.sub(r'Silva\s+Junior', 'Silva-Junior', authors,
                  flags=re.IGNORECASE)


def categorise(journal: str) -> str:
    """Nature Portfolio / Science / other."""
    j = (journal or '').lower()
    if 'science of the total' in j:
        return 'other'
    for k in ['nature', 'communications earth', 'scientific reports',
               'scientific data', 'npj']:
        if k in j:
            return 'nature'
    for k in ['science', 'science advances']:
        if k in j:
            return 'science'
    return 'other'


def is_journal_article(publication: str) -> bool:
    """
    Retorna True somente se o campo 'publication' parecer um periódico.
    Descarta livros, anais, dissertações, relatórios, preprints, etc.
    """
    if not publication:
        return False
    if YEAR_ONLY_RE.match(publication):
        return False

    pub_lower = publication.lower()
    for token in BOOK_TOKENS:
        if token in pub_lower:
            return False

    # Precisa conter pelo menos um ano para ser um artigo datado
    if not re.search(r'\b(19|20)\d{2}\b', publication):
        return False

    return True


# ── fetch author stats ────────────────────────────────────────────── #
def fetch_author_stats() -> dict:
    print("  Fetching author metrics…")
    result = GoogleSearch({
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "api_key":   API_KEY,
    }).get_dict()
    if "error" in result:
        raise SystemExit(f"❌  SerpAPI error: {result['error']}")

    author  = result.get("author", {})
    table   = result.get("cited_by", {}).get("table", [{}, {}, {}])

    return {
        "name":        author.get("name"),
        "affiliations": author.get("affiliations"),
        "thumbnail":   author.get("thumbnail"),
        "citedby":     table[0].get("citations",  {}).get("all"),
        "citedby5y":   table[0].get("citations",  {}).get("since_2019"),
        "h_index":     table[1].get("h_index",    {}).get("all"),
        "h_index5y":   table[1].get("h_index",    {}).get("since_2019"),
        "i10_index":   table[2].get("i10_index",  {}).get("all"),
        "i10_index5y": table[2].get("i10_index",  {}).get("since_2019"),
        "updated_at":  time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }


# ── fetch all papers (paginated) ─────────────────────────────────── #
def fetch_all_papers() -> list[dict]:
    """
    Pagina o perfil do Scholar (start = 0, 100, 200, …) e
    retorna apenas itens identificados como artigos em periódicos.
    """
    print("  Fetching articles from Google Scholar…")
    journal_articles = []
    discarded        = 0
    start            = 0

    while True:
        result   = GoogleSearch({
            "engine":    "google_scholar_author",
            "author_id": SCHOLAR_ID,
            "api_key":   API_KEY,
            "sort":      "cited",    # mais citados primeiro
            "num":       PAGE_SIZE,
            "start":     start,
        }).get_dict()

        if "error" in result:
            raise SystemExit(f"❌  SerpAPI error: {result['error']}")
        articles = result.get("articles", [])
        if not articles:
            break

        for art in articles:
            pub = art.get("publication", "")

            if not is_journal_article(pub):
                discarded += 1
                continue

            journal_articles.append({
                "title":       art.get("title"),
                "authors":     normalise_authors(art.get("authors")),
                "journal":     pub,
                "year":        extract_year(pub),
                "cited_by":    art.get("cited_by", {}).get("value") or 0,
                "link":        art.get("link"),
                "citation_id": art.get("citation_id"),
                "category":    categorise(pub),
            })

        page_kept = len([a for a in articles
                         if is_journal_article(a.get("publication", ""))])
        print(f"    start={start:>4}: {len(articles)} retrieved, "
              f"{page_kept} kept as journal articles")

        if len(articles) < PAGE_SIZE:
            break
        start += PAGE_SIZE
        time.sleep(SLEEP_SEC)

    print(f"\n  Total discarded (books/proceedings/etc.): {discarded}")
    return journal_articles


# ── main ─────────────────────────────────────────────────────────── #
def main():
    os.makedirs("data", exist_ok=True)

    print("\n📊  Step 1/2 — Author metrics")
    stats = fetch_author_stats()
    with open("data/scholar_data.json", "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    print(f"  ✅  citedby={stats['citedby']}  "
          f"h-index={stats['h_index']}  i10={stats['i10_index']}")

    print("\n📚  Step 2/2 — Journal articles")
    papers = fetch_all_papers()

    # Final sort: citations desc, then year desc
    papers.sort(key=lambda p: (p.get("cited_by") or 0, p.get("year") or 0),
                reverse=True)

    with open("data/scholar_papers.json", "w", encoding="utf-8") as f:
        json.dump(papers, f, indent=2, ensure_ascii=False)

    total_cit = sum(p.get("cited_by") or 0 for p in papers)
    print(f"\n✅  {len(papers)} journal articles saved")
    print(f"   Sum of individual citations: {total_cit:,}")
    print(f"\n📁  Output files:")
    print(f"    data/scholar_data.json   (author metrics)")
    print(f"    data/scholar_papers.json ({len(papers)} articles)")


if __name__ == "__main__":
    main()
