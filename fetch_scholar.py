import re
"""
fetch_scholar.py
================
Busca dados completos do Google Scholar via SerpAPI e salva em:
  data/scholar_data.json   — stats gerais (citações, h-index, i10)
  data/scholar_papers.json — lista de artigos com citações individuais

Uso:
  pip install google-search-results
  export SERPAPI_KEY="sua_chave"
  python fetch_scholar.py

Recomendação: rodar semanalmente via cron ou GitHub Actions.
"""

import json
import os
import time
from serpapi import GoogleSearch

SCHOLAR_ID = "UEWx5SkAAAAJ"
API_KEY    = os.environ["SERPAPI_KEY"]

# ------------------------------------------------------------------ #
#  1. DADOS DO AUTOR (stats gerais)
# ------------------------------------------------------------------ #
def fetch_author_stats():
    params = {
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "api_key":   API_KEY,
    }
    result    = GoogleSearch(params).get_dict()
    author    = result.get("author", {})
    cited_by  = result.get("cited_by", {})
    table     = cited_by.get("table", [{}, {}, {}])

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


# ------------------------------------------------------------------ #
#  2. LISTA COMPLETA DE ARTIGOS  (paginação automática)
# ------------------------------------------------------------------ #
def fetch_all_papers():
    """
    A API retorna até 100 artigos por página.
    Paginamos com start=0, 100, 200, … até não haver mais resultados.
    """
    all_articles = []
    start        = 0
    page_size    = 100

    while True:
        params = {
            "engine":        "google_scholar_author",
            "author_id":     SCHOLAR_ID,
            "api_key":       API_KEY,
            "sort":          "cited",       # ordena por citações (mais citado primeiro)
            "num":           page_size,
            "start":         start,
        }
        result   = GoogleSearch(params).get_dict()
        articles = result.get("articles", [])

        if not articles:
            break

        for art in articles:
            all_articles.append({
                "title":    art.get("title"),
                "authors":  _normalise_authors(art.get("authors")),
                "journal":  art.get("publication"),   # ex: "Nature, 2023"
                "year":     _extract_year(art.get("publication", "")),
                "cited_by": art.get("cited_by", {}).get("value"),
                "link":     art.get("link"),
                "citation_id": art.get("citation_id"),
            })

        # Se recebemos menos do que pedimos, chegamos ao fim
        if len(articles) < page_size:
            break

        start += page_size
        time.sleep(1)  # respeita rate-limit da SerpAPI

    return all_articles


def _extract_year(publication_str: str) -> int | None:
    """Extrai o ano de strings como 'Nature Climate Change, 2025'."""
    import re
    m = re.search(r'\b(19|20)\d{2}\b', publication_str)
    return int(m.group()) if m else None


def _normalise_authors(authors: str | None) -> str | None:
    """
    Normalisa o nome do autor para sempre usar 'Silva-Junior' (com hífen).
    O Google Scholar às vezes retorna 'Silva Junior' sem hífen.
    """
    import re
    if not authors:
        return authors
    return re.sub(r'Silva\s+Junior', 'Silva-Junior', authors, flags=re.IGNORECASE)


# ------------------------------------------------------------------ #
#  3. CATEGORIZAÇÃO AUTOMÁTICA
# ------------------------------------------------------------------ #
NATURE_JOURNALS = {
    "nature", "nature climate change", "nature ecology & evolution",
    "nature ecology and evolution", "nature communications",
    "nature geoscience", "nature food", "nature plants",
    "communications earth & environment", "communications earth and environment",
    "scientific reports", "scientific data", "npj",
}

SCIENCE_JOURNALS = {
    "science", "science advances", "science of the total environment",
}

def categorise(journal_str: str) -> str:
    j = (journal_str or "").lower()
    for n in NATURE_JOURNALS:
        if n in j:
            return "nature"
    for s in SCIENCE_JOURNALS:
        if s in j:
            return "science"
    return "other"


# ------------------------------------------------------------------ #
#  4. MAIN
# ------------------------------------------------------------------ #
def main():
    os.makedirs("data", exist_ok=True)

    print("⏳  Fetching author stats…")
    stats = fetch_author_stats()
    with open("data/scholar_data.json", "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    print(f"✅  Author stats saved  →  citedby={stats['citedby']}, "
          f"h={stats['h_index']}, i10={stats['i10_index']}")

    print("\n⏳  Fetching full article list (may take a few seconds)…")
    papers = fetch_all_papers()

    # Enrich with category
    for p in papers:
        p["category"] = categorise(p["journal"])

    with open("data/scholar_papers.json", "w", encoding="utf-8") as f:
        json.dump(papers, f, indent=2, ensure_ascii=False)

    total_cit = sum(p["cited_by"] or 0 for p in papers)
    print(f"✅  {len(papers)} papers saved  →  total citations (sum) = {total_cit:,}")
    print(f"\n📁  Files written:")
    print(f"    data/scholar_data.json")
    print(f"    data/scholar_papers.json")


if __name__ == "__main__":
    main()
