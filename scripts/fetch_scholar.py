import json, os
from serpapi import GoogleSearch

SCHOLAR_ID = "UEWx5SkAAAAJ"  # seu ID
API_KEY    = os.environ["SERPAPI_KEY"]

def fetch_author():
    params = {
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "api_key":   API_KEY,
    }
    result = GoogleSearch(params).get_dict()
    author = result.get("author", {})
    cited_by = result.get("cited_by", {})

    return {
        "name":        author.get("name"),
        "affiliations": author.get("affiliations"),
        "citedby":     cited_by.get("table", [{}])[0].get("citations", {}).get("all"),
        "h_index":     cited_by.get("table", [{}])[1].get("h_index",   {}).get("all"),
        "i10_index":   cited_by.get("table", [{}])[2].get("i10_index", {}).get("all"),
    }

def main():
    os.makedirs("data", exist_ok=True)
    data = fetch_author()
    with open("data/scholar_data.json", "w") as f:
        json.dump(data, f, indent=2)
    print("Saved:", data)

if __name__ == "__main__":
    main()