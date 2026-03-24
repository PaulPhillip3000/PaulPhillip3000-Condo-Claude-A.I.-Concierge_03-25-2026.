# PRD — Ground Truth Architecture Overhaul

**Date:** March 24, 2026
**Status:** ACTIVE — Must be implemented before next generation run
**Priority:** P0 — Blocking

---

## Problem Statement

The current system has fundamental architectural flaws:

1. **NOLA-Ledger columns are incomplete** — only has one "Assessments" column. Real NOLAs have Regular Assessment, Special Assessment, Water/Over Budget as separate categories. The Segovia NOLA has 8 distinct line items.
2. **NOLA row does not follow the NOLA** — The anchor row uses `=SUM()` over pre-NOLA ledger rows instead of distributing per the actual NOLA document's line items.
3. **Everything lands in "Other"** or a single column — Classification failures mean the NOLA-Ledger doesn't reflect the actual NOLA.
4. **SOA has wrong structure** — needs two-tier: ledger subtotal, then attorney charges below the line, then grand total. Plus a separate demand letter table.
5. **No Financial Variables Sheet** — missing a structured extraction sheet showing all parsed variables.
6. **Hardcoded to specific cases** — must work for any uploaded documents.
7. **Demand letter has blank/zero fields** where there should be real amounts.

---

## §1 — Processing Pipeline (Correct Order)

```
STEP 1: OCR documents (NOLA PDF + Ledger PDF)
           ↓
STEP 2: EXTRACT — Parse NOLA into Financial Variables Object
         Parse Ledger into Transaction List
           ↓
STEP 3: VALIDATE — NOLA breakdown sums to NOLA total?
         Ledger balance at NOLA date ≈ NOLA total?
           ↓
STEP 4: BUILD Financial Variables Sheet (new Sheet 3)
           ↓
STEP 5: BUILD NOLA-Ledger (Sheet 2) — columns from Variables Object
           ↓
STEP 6: BUILD Statement of Account (Sheet 1) — derived from Sheet 2
           ↓
STEP 7: BUILD First Demand Letter — derived from Sheet 1
```

All downstream outputs derive from the Financial Variables Object. No independent re-computation.

---

## §2 — Financial Variables Object (Single Source of Truth)

After OCR, the system extracts this object. It drives everything.

### §2.1 — NOLA Variables (from the NOLA PDF)

These come DIRECTLY from the NOLA document's line items. Every line item on the NOLA must be captured:

```
nola_date:              date
nola_total:             decimal   (the stated TOTAL OUTSTANDING)

# Line items — parsed from NOLA, mapped to categories:
nola_maintenance:       decimal   (Assessment-Homeowner, Maintenance Fee, HOA Fee)
nola_special_1:         decimal   (Special Assessment — first type)
nola_special_1_label:   string    (e.g., "Special Assessment 2025", "Roof Assessment")
nola_special_2:         decimal   (Special Assessment — second type, if any)
nola_special_2_label:   string
nola_water_utility:     decimal   (Over Budget - Water Bill, Water Assessment)
nola_late_fees:         decimal   (Delinquent Fee, Late Fee, Late Charge)
nola_interest:          decimal   (Interest through...)
nola_legal_fees:        decimal   (Legal Fees, Collection Fees)
nola_other:             decimal   (Key Fob, anything else)
nola_other_labels:      list      (descriptions of "other" items)

# Validation:
nola_parsed_sum:        decimal   (sum of all above)
nola_variance:          decimal   (nola_total - nola_parsed_sum)
```

**Rule: `nola_parsed_sum` must equal `nola_total` within $1.00.** If not, flag for review.

### §2.2 — Ledger Variables (from the uploaded Ledger PDF)

```
ledger_start_date:      date
ledger_end_date:        date
ledger_total_charges:   decimal
ledger_total_payments:  decimal
ledger_ending_balance:  decimal
monthly_assessment:     decimal   (mode of Regular Assessment charges)

# Post-NOLA charges by category:
post_nola_maintenance:  decimal
post_nola_special:      decimal
post_nola_late_fees:    decimal
post_nola_interest:     decimal
post_nola_other:        decimal
post_nola_payments:     decimal
post_nola_credits:      decimal
```

### §2.3 — Attorney-Entered Variables

```
certified_mail:         decimal   (default $40)
other_costs:            decimal   (default $16)
attorney_fees:          decimal   (default $400)
```

### §2.4 — Computed Totals

```
# Association charges subtotal (matches NOLA-Ledger TOTALS)
subtotal_association:   = nola_total + post_nola_charges - post_nola_payments

# Attorney charges (below the line)
subtotal_attorney:      = certified_mail + other_costs + attorney_fees

# Grand total (matches demand letter TOTAL OUTSTANDING)
total_outstanding:      = subtotal_association + subtotal_attorney
```

---

## §3 — NOLA-Ledger (Sheet 2) — Column Architecture

### §3.1 — Required Columns

The NOLA-Ledger MUST have columns for every category that appears in any Florida NOLA:

| Col | Letter | Header | Maps to NOLA line item |
|-----|--------|--------|----------------------|
| A | # | Row number | — |
| B | Date | Transaction date | — |
| C | Description | Full description | — |
| D | Type | Category label | — |
| E | Maintenance ($) | Regular assessments / HOA fees | nola_maintenance |
| F | Special Asmt 1 ($) | First special assessment | nola_special_1 |
| G | Special Asmt 2 ($) | Second special assessment / Water | nola_special_2 / nola_water |
| H | Interest ($) | Interest accrued | nola_interest |
| I | Late Fees ($) | Delinquent fees / late charges | nola_late_fees |
| J | Legal/Atty Fees ($) | Legal fees + attorney fees | nola_legal_fees + attorney_fees |
| K | Other ($) | Key fob, collection fees, misc | nola_other |
| L | Payments ($) | Cash payments received | — |
| M | Credits ($) | Waivers, write-offs | — |
| N | Running Balance ($) | Cumulative balance | formula |
| O | Notes | Context / flags | — |

### §3.2 — NOLA Anchor Row

The NOLA anchor row distributes the NOLA total across columns E–K **per the actual NOLA document**, NOT from ledger SUMs:

```
E (Maintenance):    = nola_maintenance
F (Special 1):      = nola_special_1
G (Special 2):      = nola_special_2 + nola_water_utility
H (Interest):       = nola_interest
I (Late Fees):      = nola_late_fees
J (Legal/Atty):     = nola_legal_fees
K (Other):          = nola_other
N (Running Bal):    = SUM(E:K) on this row
```

**Rule: SUM of E:K on NOLA row MUST equal the NOLA stated total.** This is NOT a SUM of pre-NOLA rows — it's the NOLA's own numbers, directly.

Pre-NOLA rows are shown for context only. They explain HOW the balance was reached, but the NOLA row uses the NOLA's stated amounts.

### §3.3 — TOTALS Row

TOTALS = SUM from NOLA row through last actual data row (before CURRENT BALANCE).
Excludes: pre-NOLA rows, CURRENT BALANCE row, 45-day projections.

### §3.4 — Missing Months

If the ledger ends before today (e.g., ledger ends Nov 2025, today is Mar 2026), the system adds catch-up assessment rows for Dec, Jan, Feb, Mar at the monthly rate. These are actual amounts owed but not yet on the management ledger.

---

## §4 — Statement of Account (Sheet 1) — Two-Tier Structure

### §4.1 — Section A: Association Balance (matches NOLA-Ledger)

```
ASSOCIATION CHARGES
─────────────────────────────────────────────────────
NOLA Balance (as of [NOLA date]):           $X,XXX.XX
Post-NOLA Maintenance:                      $X,XXX.XX
Post-NOLA Special Assessments:              $X,XXX.XX
Post-NOLA Late Fees:                        $X,XXX.XX
Post-NOLA Interest:                         $X,XXX.XX
Post-NOLA Other Charges:                    $X,XXX.XX
Payments Received:                         ($X,XXX.XX)
─────────────────────────────────────────────────────
SUBTOTAL (Association Charges):             $X,XXX.XX
                                            ← must equal NOLA-Ledger TOTALS

ATTORNEY CHARGES (below the line)
─────────────────────────────────────────────────────
Certified Mail / Service Charges:           $XX.XX
Other Attorney Costs:                       $XX.XX
Attorney's Fees:                            $XXX.XX
─────────────────────────────────────────────────────
TOTAL OUTSTANDING:                          $X,XXX.XX
```

### §4.2 — Section B: Demand Letter Table (9-row format)

Immediately below Section A, a second table with the EXACT 9 rows that appear in the demand letter:

```
AMOUNT DUE SUMMARY (First Demand Letter)
─────────────────────────────────────────────────────
Maintenance due including [Through Date]:   $X,XXX.XX
Special assessments due including [date]:   $X,XXX.XX
Late fees, if applicable:                   $X,XXX.XX
Other charges:                              $X,XXX.XX
Certified mail charges:                     $XX.XX
Other costs:                                $XX.XX
Attorney's fees:                            $XXX.XX
Partial Payment:                           ($X,XXX.XX)
TOTAL OUTSTANDING:                          $X,XXX.XX
─────────────────────────────────────────────────────
```

**Rules:**
- No blank fields. Every row shows a dollar amount ($0.00 if zero).
- "Maintenance" on the demand letter = nola_maintenance + post_nola_maintenance
- "Special assessments" = nola_special_1 + nola_special_2 + post_nola_special
- The TOTAL OUTSTANDING here = Section A TOTAL OUTSTANDING (same number)

### §4.3 — Validation Rule

A demand letter for delinquent assessments CANNOT have $0.00 for Maintenance. If it does, the classification is wrong and generation must be flagged.

---

## §5 — Financial Variables Sheet (NEW — Sheet 3)

A structured reference sheet showing every extracted variable and its source.

| Variable | Value | Source |
|----------|-------|--------|
| **NOLA EXTRACTION** | | |
| NOLA Date | 08/28/2025 | NOLA PDF |
| NOLA Total Outstanding | $1,345.00 | NOLA PDF |
| NOLA — Maintenance | $1,345.00 | NOLA PDF line item |
| NOLA — Special Assessment | $0.00 | NOLA PDF line item |
| NOLA — Late Fees | $0.00 | NOLA PDF line item |
| NOLA — Interest | $0.00 | NOLA PDF line item |
| NOLA — Other | $0.00 | NOLA PDF line item |
| NOLA Parse Variance | $0.00 | Computed |
| | | |
| **LEDGER EXTRACTION** | | |
| Ledger Period | 01/01/2025 — 11/01/2025 | Ledger PDF |
| Monthly Assessment Rate | $269.00 | Mode of Regular Assessment charges |
| Ledger Ending Balance | $2,152.00 | Last row balance |
| Total Charges | $2,959.00 | Ledger sum |
| Total Payments | $807.00 | Ledger sum |
| | | |
| **POST-NOLA CHARGES** | | |
| Post-NOLA Maintenance | $807.00 | 3 months × $269 |
| Post-NOLA Special | $0.00 | — |
| Post-NOLA Late Fees | $0.00 | — |
| Post-NOLA Interest | $0.00 | — |
| Post-NOLA Payments | $0.00 | — |
| | | |
| **ATTORNEY CHARGES** | | |
| Certified Mail | $40.00 | Attorney entered |
| Other Costs | $16.00 | Attorney entered |
| Attorney's Fees | $400.00 | Attorney entered |
| | | |
| **COMPUTED TOTALS** | | |
| Subtotal (Association) | $2,152.00 | NOLA + post-NOLA - payments |
| Subtotal (Attorney) | $456.00 | cert + costs + atty |
| **TOTAL OUTSTANDING** | **$2,608.00** | Association + Attorney |

---

## §6 — First Demand Letter Table

The demand letter table pulls directly from the Financial Variables Object:

| Row | Label | Source |
|-----|-------|--------|
| 1 | Maintenance due including [date] | nola_maintenance + post_nola_maintenance |
| 2 | Special assessments due including [date] | nola_special_1 + nola_special_2 + post_nola_special |
| 3 | Late fees, if applicable | nola_late_fees + post_nola_late_fees |
| 4 | Other charges | nola_other + nola_water + post_nola_other |
| 5 | Certified mail charges | certified_mail |
| 6 | Other costs | other_costs |
| 7 | Attorney's fees | attorney_fees |
| 8 | Partial Payment | post_nola_payments (negative) |
| 9 | TOTAL OUTSTANDING | sum of 1-7 minus 8 |

**Rules:**
- No blank fields
- Row 1 (Maintenance) CANNOT be $0.00 on a delinquent assessment letter
- Row 9 total must equal Sheet 1 Section A TOTAL OUTSTANDING

---

## §7 — Case-Agnostic Design

The system must work for ANY uploaded documents. Examples:

### Wheaton / Soleil (simple — one assessment type)
- NOLA: Maintenance=$1,345, Special=$0, Late=$0, Interest=$0
- Ledger: 14 transactions, all "Maintenance Fee" at $269/mo

### Pacheco / Segovia (complex — 8 NOLA line items)
- NOLA: Assessment-Homeowner=$3,669.32 (two line items), Special=$2,100, Over Budget-Water=$572.68, Key Fob=$10, Legal=$25, Delinquent Fee=$25, Collection=$25
- Ledger: 20+ transactions across multiple categories

### Any future case
- No hardcoded amounts, dates, or category names
- Classification by description keywords, not by specific case data

---

## §8 — Segovia NOLA Classification Example

The Segovia NOLA has these line items:

```
Assessment - Homeowner (Delinquent Fee) 2026    $25.00      → Late Fees (I)
Assessment - Homeowner 2025                     $3,211.32   → Maintenance (E)
Assessment - Homeowner 2026                     $458.00     → Maintenance (E)
Key Fob / Remotes 2025                          $10.00      → Other (K)
Legal Fees 2025                                 $25.00      → Legal/Atty (J)
Over Budget - Water Bill 2025                   $572.68     → Special Asmt 2 / Water (G)
Special Assessment 2025                         $2,000.00   → Special Asmt 1 (F)
Special Assessment 2026                         $100.00     → Special Asmt 1 (F)
Interest at the rate of 0% per annum            $0.00       → Interest (H)
Collection Fees                                 $25.00      → Other (K)
TOTAL OUTSTANDING                               $6,427.00
```

The NOLA anchor row on Sheet 2 would be:
```
E=$3,669.32  F=$2,100.00  G=$572.68  H=$0.00  I=$25.00  J=$25.00  K=$35.00
SUM = $6,427.00 ✓
```

---

## §9 — Financial Variables Sheet: Data Organization

### §9.1 — Purpose

The Financial Variables sheet is the system's "accounting workspace." Before ANY data goes into the NOLA-Ledger, the software must organize all extracted information into clearly labeled sections. This sheet is the bridge between OCR extraction and Excel generation.

### §9.2 — Required Sections (in order)

**Section A: Unit Owner Identity**
- Owner Name, Unit/Parcel, Property Address, Mailing Address
- Association Name, County, Governing Statute
- Matter ID, Prepared Date

**Section B: Irrelevant Pre-NOLA History** (account was current)
- Every charge/payment BEFORE the delinquency started
- These rows net to zero — owner was paying on time
- Subtotal (should be $0.00)

**Section C: Relevant Pre-NOLA History** (delinquency period)
- Charges that built up to the NOLA balance
- Starts when the owner stopped paying
- Subtotal (should approximate the NOLA balance)

**Section D: NOLA Variables** (Ground Truth — from the NOLA PDF)
- NOLA Date
- NOLA Total Outstanding
- Breakdown by category: Maintenance, Special Asmt, Water/Utility, Interest, Late Fees, Legal/Atty, Other
- Parse Variance (NOLA total - sum of parsed items)
- Monthly Assessment Rate

**Section E: Post-NOLA Variables** (charges after NOLA date)
- Each charge with source tag: [ledger] or [catch-up]
- Subtotals by category
- Payments received
- Net post-NOLA

**Section F: Attorney-Entered Charges** (below the line)
- Certified Mail, Other Costs, Attorney's Fees
- Subtotal

**Section G: Computed Totals**
- NOLA Balance + Post-NOLA Net = Association Subtotal
- + Attorney Charges = TOTAL OUTSTANDING
- Verification: confirms SOA, NOLA-Ledger, and DL all match

### §9.3 — Flow Into NOLA-Ledger

The NOLA-Ledger (Sheet 2) is populated FROM the Financial Variables:
- Section B → Pre-NOLA history rows (gray, context only)
- Section D → NOLA anchor row (yellow, direct NOLA values in each column)
- Section E → Post-NOLA transaction rows
- Section F → Attorney charge rows (below association charges)
- Section G → TOTALS row and summary block

---

## §10 — What Must Change (Implementation Checklist)

1. [ ] **Add Financial Variables Object** — structured dict computed ONCE, used everywhere
2. [ ] **Expand NOLA-Ledger columns** — add Special Asmt 1, Special Asmt 2/Water columns
3. [ ] **NOLA row uses NOLA values directly** — NOT SUM of pre-NOLA rows
4. [ ] **Add catch-up months** — missed months between ledger end and today
5. [ ] **Add Financial Variables Sheet** (Sheet 3)
6. [ ] **Restructure SOA** — two-tier with subtotal + demand letter table
7. [ ] **Fix demand letter field mapping** — maintenance can't be $0 on a delinquent assessment letter
8. [ ] **Remove all hardcoded case data** — work for any uploaded documents
9. [ ] **Run test on BOTH matters** — Wheaton/Soleil AND Pacheco/Segovia
10. [ ] **5/5 pass rate on both** before shipping
