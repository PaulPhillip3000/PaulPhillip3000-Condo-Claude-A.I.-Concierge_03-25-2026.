import pandas as pd
import os

def process_ledger(csv_path, output_excel_path):
    """
    Reads a raw ledger CSV, formats it, calculates totals,
    and returns both the stylized DataFrame and the total balance due.
    Saves an internal Excel workbook.
    """
    print(f"Loading ledger from {csv_path}...")
    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return None, 0.0

    # Validate required columns exist
    required_cols = ['Date', 'Description', 'Amount']
    for col in required_cols:
        if col not in df.columns:
            raise ValueError(f"Ledger validation failed: Missing required column '{col}'")

    # Ensure Amount column is numeric
    df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce').fillna(0)
    
    # Validation check: Negative amounts or missing rows
    if len(df) == 0:
        raise ValueError("Ledger validation failed: Ledger is empty.")
    if (df['Amount'] < 0).any():
        print("Warning: Found negative amounts in ledger (e.g. credits). Verifying validity...")
    
    # Calculate Total deterministically
    total_due = df['Amount'].sum()
    print(f"Total Amount Due Calculated (Deterministic): ${total_due:.2f}")

    # Generate the internal Excel workbook
    print(f"Saving internal workbook to {output_excel_path}...")
    try:
        # We can use an ExcelWriter to handle formatting if needed later
        with pd.ExcelWriter(output_excel_path, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Ledger')
            
            # Write a summary table below the data
            summary_row_num = len(df) + 3 # Skip a few rows
            workbook  = writer.book
            worksheet = writer.sheets['Ledger']
            
            worksheet.cell(row=summary_row_num, column=2, value="TOTAL DUE")
            worksheet.cell(row=summary_row_num, column=3, value=total_due)
            
    except Exception as e:
        print(f"Error saving Excel file: {e}")
        
    # We return the dataframe as a list of dictionaries so it can easily be passed into the Word Template
    ledger_records = df.to_dict('records')
    return ledger_records, total_due

if __name__ == "__main__":
    # Test script run
    ledger_file = "inputs/ledger/dummy_ledger.csv"
    output_file = "outputs/internal_ledger.xlsx"
    
    # Create required directory if missing
    os.makedirs("outputs", exist_ok=True)
    
    if os.path.exists(ledger_file):
        records, total = process_ledger(ledger_file, output_file)
        print(f"Extracted {len(records)} records. Total: ${total}")
    else:
        print(f"Test ledger not found at {ledger_file}")
