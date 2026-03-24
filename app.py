import streamlit as st
import os
from scrapers import get_fl_statute_718, get_miami_dade_property
from ledger_processor import process_ledger
from letter_generator import generate_letter

st.set_page_config(page_title="Statutory Letter Generator", page_icon="📜", layout="wide")

st.title("Florida Statute 718 Letter Generator")
st.write("Generate automated statutory letters compliant with FL Chapter 718.")

with st.sidebar:
    st.header("Inputs")
    ledger_file = st.file_uploader("Upload Ledger (CSV)", type=["csv"])
    nola_file = st.file_uploader("Upload NOLA (TXT)", type=["txt"])
    
if st.button("Generate Statutory Letter", type="primary"):
    if not ledger_file or not nola_file:
        st.error("Please upload both a Ledger CSV and a NOLA TXT file in the sidebar.")
    else:
        with st.spinner("Processing files and fetching legal context..."):
            os.makedirs("inputs/ledger", exist_ok=True)
            os.makedirs("inputs/nola", exist_ok=True)
            
            # Save uploaded files temporarily
            ledger_path = os.path.join("inputs", "ledger", ledger_file.name)
            with open(ledger_path, "wb") as f:
                f.write(ledger_file.getbuffer())
                
            nola_path = os.path.join("inputs", "nola", nola_file.name)
            with open(nola_path, "wb") as f:
                f.write(nola_file.getbuffer())
                
            with open(nola_path, 'r', encoding='utf-8') as f:
                nola_text = f.read()

            # 1. Fetch Legal & Property Context
            st.info("Fetching FL Statute Chapter 718...")
            statute_text = get_fl_statute_718()
            if not statute_text:
                st.warning("Failed to fetch statute online. Proceeding with caution.")
            
            # Simulate reading NOLA for address
            property_data = get_miami_dade_property("123 Sunshine Blvd Unit 4B")
            
            # 2. Process Ledger
            st.info("Processing ledger calculations...")
            os.makedirs("outputs", exist_ok=True)
            output_excel_path = "outputs/internal_ledger_calculations.xlsx"
            ledger_records, total_due = process_ledger(ledger_path, output_excel_path)
            
            if not ledger_records:
                st.error("Failed to process ledger.")
            else:
                # 3. Draft Letter
                st.info("Drafting letter via OpenAI...")
                output_docx = generate_letter(statute_text, property_data, nola_text, ledger_records, total_due)
                
                st.success("Pipeline Complete! 🎉")
                
                st.write("### Generated Outputs")
                st.write("Files are available for download:")
                
                # Provide download links
                if os.path.exists(output_excel_path):
                    with open(output_excel_path, "rb") as f:
                        st.download_button("Download Ledger Rules Engine (Excel)", data=f, file_name="internal_ledger_calculations.xlsx")
                
                if output_docx and os.path.exists(output_docx):
                     with open(output_docx, "rb") as f:
                        st.download_button("Download Statutory Letter (Word)", data=f, file_name=os.path.basename(output_docx))
