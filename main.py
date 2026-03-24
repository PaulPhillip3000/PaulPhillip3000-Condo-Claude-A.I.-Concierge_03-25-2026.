import os
import glob
from scrapers import get_fl_statute_718, get_miami_dade_property
from ledger_processor import process_ledger
from letter_generator import generate_letter

def main():
    print("=== NOLA Statutory Letter Generator ===")
    
    # 1. Load inputs
    ledger_file = "inputs/ledger/dummy_ledger.csv"
    nola_file = "inputs/nola/dummy_nola.txt"
    
    if not os.path.exists(nola_file):
        print("Error: No NOLA found in inputs/nola/")
        return
        
    with open(nola_file, 'r') as f:
        nola_text = f.read()
        
    print("\n--- 1. Fetching Legal & Property Context ---")
    statute_text = get_fl_statute_718()
    if not statute_text:
        print("Failed to fetch statute. Proceeding with caution.")
    else:
        print(f"Loaded FL Statute Chapter 718 ({len(statute_text)} chars).")
        
    # We simulate reading the NOLA to find the address
    property_data = get_miami_dade_property("123 Sunshine Blvd Unit 4B")
    
    print("\n--- 2. Processing Ledger & Calculating ---")
    output_excel_path = "outputs/internal_ledger_calculations.xlsx"
    ledger_records, total_due = process_ledger(ledger_file, output_excel_path)
    if not ledger_records:
        print("Failed to process ledger. Exiting.")
        return
        
    print("\n--- 3. Drafting Statutory Letter via OpenAI ---")
    generate_letter(statute_text, property_data, nola_text, ledger_records, total_due)
    
    print("\n=== Pipeline Complete ===")
    print("Outputs available in: /outputs/")

if __name__ == "__main__":
    os.makedirs("outputs", exist_ok=True)
    main()
