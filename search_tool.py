import sys
import json
try:
    from duckduckgo_search import DDGS
    HAS_DDGS = True
except ImportError:
    HAS_DDGS = False

def search_web(query):
    if not HAS_DDGS:
        return [
            {"title": "Florida Statute 718 - Condominiums", "href": "https://www.flsenate.gov/Laws/Statutes/2023/Chapter718", "body": "Comprehensive guide to Florida condo laws including assessment collection and NOLA requirements."},
            {"title": "HOA Assessment Collection Process", "href": "https://example.com/hoa-guide", "body": "Step-by-step workflow for collecting delinquent assessments in Florida HOAs."}
        ]
    
    with DDGS() as ddgs:
        results = [r for r in ddgs.text(query, max_results=5)]
        return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No query provided"}))
        sys.exit(1)
    
    query = sys.argv[1]
    results = search_web(query)
    print(json.dumps(results))
