"""Debug script to trace NOLA anchor and ledger filtering."""
import sys
import re
import datetime
from pathlib import Path
import pdfplumber

sys.path.insert(0, str(Path(__file__).parent))

UPLOAD_DIR = Path(__file__).parent / "uploads"

def extract_text(path):
    with pdfplumber.open(str(path)) as pdf:
        return "\n".join(p.extract_text() or "" for p in pdf.pages)

# 1. Load NOLA
nola_path = UPLOAD_DIR / "2025-9-24 NOLA Quintana 215.pdf"
nola_text = extract_text(nola_path)
print("=== NOLA text first 500 chars ===")
print(nola_text[:500])

# 2. Extract date
nd_match = re.search(r"(\w+ \d{1,2},\s*\d{4}|\d{1,2}/\d{1,2}/\d{4})", nola_text)
nola_date = None
if nd_match:
    raw = nd_match.group(1).strip()
    print(f"\nDate regex hit: {raw!r}")
    for fmt in ("%B %d, %Y", "%m/%d/%Y", "%B %d,%Y"):
        try:
            nola_date = datetime.datetime.strptime(raw, fmt).date()
            print(f"Parsed: {nola_date} via {fmt!r}")
            break
        except ValueError:
            pass
else:
    print("\nNo date match!")

# 3. Extract balance
balance = None
source = "none"
for pat in [
    r"(?:Total Amount Due|Balance Due|Total Due|Amount Due|Total Balance|Total Outstanding)[\s:]*\$?\s*([\d,]+\.\d{2})",
    r"(?:please remit|remit the sum of|pay the sum of)\s+\$?\s*([\d,]+\.\d{2})",
]:
    m = re.search(pat, nola_text, re.IGNORECASE | re.MULTILINE)
    if m:
        balance = float(m.group(1).replace(",", ""))
        source = "stated_total"
        print(f"Balance: ${balance} from {m.group(0)!r}")
        break

print(f"\nnola_date={nola_date}, nola_balance={balance}, source={source}")

# 4. Parse ledger
ledger_path = UPLOAD_DIR / "2025-11-11 Ledger Quintana 215.pdf"
ledger_text = extract_text(ledger_path)
print(f"\n=== Ledger text first 800 chars ===\n{ledger_text[:800]}")

# Try to import and call _parse_ledger_transactions
try:
    from backend import _parse_ledger_transactions
    items = _parse_ledger_transactions(ledger_text)
    print(f"\n_parse_ledger_transactions returned {len(items)} items")
    for item in items[:10]:
        print(" ", item)

    # Simulate the filter
    if nola_date and items:
        post = []
        for t in items:
            td = None
            for fmt in ("%m/%d/%Y", "%Y-%m-%d", "%m/%d/%y"):
                try:
                    td = datetime.datetime.strptime(str(t.get("date", "")), fmt).date()
                    break
                except (ValueError, AttributeError):
                    pass
            keep = td is None or td > nola_date
            print(f"  date={t.get('date')!r} parsed={td} keep={keep}")
            if keep:
                post.append(t)
        print(f"\nPost-NOLA transactions: {len(post)} (from {len(items)} total)")
    else:
        print(f"\nFilter not applied: nola_date={nola_date}, items={len(items) if items else 0}")
except Exception as ex:
    print(f"Error: {ex}")
