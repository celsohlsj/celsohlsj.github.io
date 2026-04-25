#!/usr/bin/env python3
"""
fetch_scholar.py
Fetches publication metrics for Celso H. L. Silva-Junior from Google Scholar
using the `scholarly` package and writes results to data/scholar_data.json.

Designed to run inside GitHub Actions (daily cron).
"""

import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path

from scholarly import scholarly, ProxyGenerator

SCHOLAR_ID = "UEWx5SkAAAAJ"
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "scholar_data.json"
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# ── Optional: use ScraperAPI proxy if the token is set as a GitHub secret ──
SCRAPER_API_KEY = os.environ.get("SCRAPER_API_KEY", "")
if SCRAPER_API_KEY:
    pg = ProxyGenerator()
    pg.ScraperAPI(SCRAPER_API_KEY)
    scholarly.use_proxy(pg)
    print("Using ScraperAPI proxy.")
else:
    print("No proxy configured — using direct connection (may be rate-limited).")


def fetch_author():
    print(f"Fetching author profile for ID: {SCHOLAR_ID}")
    search_query = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(search_query, sections=["basics", "indices", "publications"])
    return author


def build_payload(author):
    metrics = {
        "name": author.get("name", "Celso H. L. Silva-Junior"),
        "affiliation": author.get("affiliation", ""),
        "citations_total": author.get("citedby", 0),
        "citations_5y": author.get("citedby5y", 0),
        "h_index": author.get("hindex", 0),
        "h_index_5y": author.get("hindex5y", 0),
        "i10_index": author.get("i10index", 0),
        "i10_index_5y": author.get("i10index5y", 0),
        "fetched_at": datetime.now(timezone.utc).isoformat(),
    }

    pubs_raw = author.get("publications", [])
    print(f"Found {len(pubs_raw)} publications. Filling details...")

    filled = []
    for i, pub in enumerate(pubs_raw):
        try:
            filled_pub = scholarly.fill(pub)
            bib = filled_pub.get("bib", {})
            entry = {
                "title": bib.get("title", ""),
                "authors": bib.get("author", ""),
                "journal": bib.get("journal", bib.get("venue", "")),
                "year": bib.get("pub_year", ""),
                "citations": filled_pub.get("num_citations", 0),
                "scholar_url": filled_pub.get("pub_url", ""),
            }
            filled.append(entry)
            print(f"  [{i+1}/{len(pubs_raw)}] {entry['title'][:60]}... ({entry['citations']} cit.)")
            time.sleep(1.5)
        except Exception as exc:
            print(f"  Warning: could not fill pub {i+1}: {exc}")
            continue

    filled.sort(key=lambda x: x["citations"], reverse=True)
    metrics["top_publications"] = filled[:10]
    metrics["total_publications"] = len(filled)

    return metrics


def main():
    author = fetch_author()
    payload = build_payload(author)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    print(f"\n✓ Data written to {OUTPUT_PATH}")
    print(f"  Citations: {payload['citations_total']}  |  h-index: {payload['h_index']}  |  Publications: {payload['total_publications']}")


if __name__ == "__main__":
    main()
