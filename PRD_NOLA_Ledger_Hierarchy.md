# CondoClaw — NOLA Ground Truth, Payment Hierarchy & Excel Ledger Architecture
**PRD Addendum — Module: Financial Engine**
**Version:** 1.0
**Date:** March 22, 2026
**Status:** Active — Supersedes any prior ledger generation spec
**Triggers:** Quintana matter number discrepancy; Palacio validation confirmed correct

---

## Purpose

This module defines the authoritative rules for:
1. How the Excel ledger is constructed (starting point, sheet order, structure)
2. Why the NOLA is the financial ground truth
3. How the statutory payment hierarchy governs how payments are characterized
4. Why the first demand letter must be internally consistent with the NOLA

These rules resolve the class of errors observed in Quintana-type matters where ledger numbers diverge from the NOLA, producing demand letters that are internally inconsistent and legally objectionable.

---

## 1. The NOLA Is the Ground Truth

### 1.1 Principle

The **Notice of Late Assessment (NOLA)** is the authoritative financial starting point for every matter. All system-generated financial records and documents must derive from and remain consistent with the NOLA.

> **The NOLA is not one input among many. It is the anchor. Everything else is derived from it.**

### 1.2 Why This Is the Only Defensible Approach

The NOLA is a formal legal notice sent to the unit owner. Once issued:

- It establishes a declared balance as of a stated date — this is the **baseline balance**
- It triggers statutory rights and obligations (cure period, lien eligibility, etc.)
- It is the document the court will look at first if the matter proceeds to litigation

If the ledger, the statement of account, or the demand letter reflect a different balance than what the NOLA states — even by a small amount — the opposing party will object. The court will question the validity of the entire collections action.

**Inconsistency between the NOLA and the demand letter is inherently objectionable.**

### 1.3 What "Starting from the NOLA" Means in Practice

- The **NOLA anchor row** is the authoritative starting point — the balance stated in the NOLA is the opening balance
- **Pre-NOLA ledger history** is shown as context above the NOLA row (gray, informational) — this shows the transactions that led to the NOLA balance, but is excluded from TOTALS calculations
- All subsequent charges, fees, interest, and payments are applied **on top of** that NOLA baseline
- The NOLA is taken as given — pre-NOLA history provides context but does not override the NOLA balance

### 1.4 Assumption of NOLA Correctness

The system **assumes the NOLA is correct**. This is both a legal and a practical necessity:

- We issued the NOLA. It is our document.
- Challenging our own NOLA in subsequent documents is contradictory and undermines the entire action.
- If the NOLA has an error, the remedy is a corrected NOLA — not a demand letter with different numbers.

**The system must never generate a document that contradicts the NOLA's stated balance.**

### 1.5 What to Do When the NOLA Has Errors

The NOLA may, in some cases, contain errors (e.g., the association misapplied a payment). This is a real complication addressed in §4 below. However:

- The system does not self-correct the NOLA
- The system flags discrepancies for attorney review
- The first demand letter still reflects the NOLA balance — not a corrected figure
- Corrections are addressed through amended NOLAs or litigation, not by changing the demand letter

---

## 2. The Statutory Payment Hierarchy

### 2.1 The Governing Rule — Florida Statute 718.116(3)

When a unit owner makes a payment, **Florida Statute §718.116(3)** dictates the order in which that payment must be applied. The association does not have discretion to apply it differently.

**Mandatory Payment Application Order (§718.116(3)):**

| Priority | Category | Description |
|----------|----------|-------------|
| 1st | **Interest** | Interest accrued on the delinquent assessment |
| 2nd | **Administrative Late Fees** | As authorized by the declaration |
| 3rd | **Costs of Collection** | Including reasonable attorney's fees |
| 4th | **Delinquent Assessments** | Oldest first — the unpaid monthly/special assessments themselves |

> This means a $500 payment from an owner who owes $458 in assessments + $50 in late fees + $25 in interest does NOT pay off the assessment. It first pays the interest, then the late fee, then finally begins to reduce the assessment balance.

### 2.2 Why This Matters

Many associations apply payments incorrectly — they credit the monthly assessment first and leave fees and interest unpaid. This is a statutory violation. When CondoClaw processes the ledger:

1. **We re-apply every payment according to the statutory hierarchy**
2. **The characterization of each line item in the ledger reflects the hierarchy** — not how the association labeled it
3. **The total balance due must still equal the ledger total** — the hierarchy affects characterization, not the sum

### 2.3 Characterization vs. Total

These are separate concepts and must be treated separately:

- **Total balance** = sum of all charges minus sum of all payments = this must be mathematically correct based on the full ledger, and must match the NOLA
- **Characterization** = how each payment is allocated across interest / fees / costs / assessments = this follows the statutory hierarchy, regardless of how the association labeled the transaction

The system may disagree with how the association characterized a payment. That is acceptable. The total must not change.

### 2.4 Practical Example

| Date | Transaction | Association's Label | Correct Statutory Label |
|------|------------|--------------------|-----------------------|
| 03/01/25 | $458.00 charged | Monthly Assessment | Monthly Assessment |
| 03/15/25 | $25.00 charged | Late Fee | Administrative Late Fee |
| 03/20/25 | $15.00 charged | Interest | Interest (18% p.a.) |
| 04/01/25 | $25.00 payment | Payment on Assessment | Applied: $15.00 Interest → $10.00 Late Fee |
| Balance | $473.00 | Same | Same |

The totals are identical. The characterization differs because the payment goes to interest first, then late fee — not to the assessment. The demand letter must reflect the corrected characterization if it itemizes the balance.

### 2.5 Hierarchy Flag

When the system detects that the association applied a payment in a way that conflicts with the statutory hierarchy, it must:

1. **Log a characterization discrepancy** in the compliance checklist
2. **Re-characterize the line item** using the correct hierarchy
3. **Flag for attorney review** — the discrepancy may or may not need to be addressed in court
4. **Note in the compliance checklist**: "Association applied payment contrary to §718.116(3). Re-characterized for compliance. Total unaffected."

The attorney may decide to address this in the demand letter or reserve it for court. The system does not decide — it flags and presents both versions.

---

## 3. Demand Letter Consistency with the NOLA

### 3.1 The Core Rule

> **The first demand letter cannot contradict the NOLA. This is non-negotiable.**

Any document generated after the NOLA must:
- Use the NOLA date as the baseline date
- Use the NOLA balance as the opening balance
- Add only charges that accrued **after** the NOLA date
- Reflect payments received **after** the NOLA date applied per the statutory hierarchy

### 3.2 Permissible Differences Between NOLA and Demand Letter

The demand letter will typically show a **higher** balance than the NOLA because:
- Additional assessments have accrued since the NOLA date
- Additional interest has accrued
- Attorney's fees and costs may have been added (if the matter has progressed)
- Additional late fees may have been added

These differences are expected and acceptable. They must be clearly itemized.

### 3.3 Impermissible Differences

The demand letter must **never** show:
- A lower total than the NOLA (unless a payment was received — which must be shown in the ledger)
- A different opening balance than the NOLA stated
- Charges characterized differently than the NOLA without explanation (e.g., NOLA says "regular assessment" but demand letter says "special assessment")
- Any amount that cannot be traced back to: NOLA baseline + post-NOLA charges − post-NOLA payments

### 3.4 System Validation Gate

Before generating the first demand letter, the system must:

1. Extract the NOLA balance and NOLA date
2. Compare to the ledger opening balance on that date
3. Verify they match within $0.00 tolerance (or flag for review if they differ by any amount)
4. **Block document generation** if the demand letter total cannot be reconciled to: NOLA balance + accruals − payments

This is not a warning. It is a hard block. An inconsistent demand letter must not be generated.

---

## 4. The Complication: When the Association Got It Wrong

### 4.1 Acknowledging the Reality

Associations sometimes misapply payments, miscalculate interest, or categorize charges incorrectly. This creates a genuine tension:

- **The NOLA is assumed correct** (§1.4)
- **The association's ledger characterizations may be wrong** (§2.2)
- **The total must match** (§2.3)
- **Corrections are addressed in court**, not by changing our own documents

### 4.2 How the System Handles This

The system distinguishes between two types of association errors:

**Type A: Characterization Error (payment applied to wrong category)**
- The total is still correct
- The system re-characterizes per hierarchy
- Notes the discrepancy in the compliance checklist
- Does not change the demand letter total
- May be raised in court if the owner contests

**Type B: Mathematical Error (total in NOLA is wrong)**
- This is a NOLA error, not a ledger characterization error
- The system flags a **NOLA Discrepancy Alert**
- Attorney review required before proceeding
- Options: issue a corrected NOLA, or proceed with the NOLA as issued and address in court
- System does not auto-correct the NOLA

### 4.3 The Principle

> **So long as the total amount is correct based on the ledger, the system proceeds. Characterization corrections are noted but do not block the workflow. Mathematical errors block the workflow until reviewed.**

---

## 5. Excel Workbook Architecture

### 5.1 Sheet Order (Mandatory)

Every Excel workbook generated by CondoClaw must follow this exact sheet order:

| Sheet # | Sheet Name | Contents |
|---------|-----------|----------|
| 1 | **Statement of Account** | Summary view — owner, unit, NOLA date, opening balance, all charges/payments, current total due |
| 2 | **Ledger Detail** | Full transaction-by-transaction ledger starting from NOLA date |
| 3 | **Unit Owner Profile** | Owner demographics, property data, association info, occupancy status |
| 4 | **Compliance Checklist** | Step-by-step statutory compliance verification for this matter |

> **The Statement of Account is always Sheet 1.** This is the document the attorney reads first, the document that gets attached to correspondence, and the document the court receives. It must be immediately accessible.

### 5.2 Sheet 1 — Statement of Account

**Purpose:** One-page financial summary. A person unfamiliar with the matter should be able to read this sheet and understand the entire financial picture.

**Required fields:**
- Association name
- Unit owner name and unit number
- Property address
- NOLA date and NOLA balance (clearly labeled as such)
- Itemized charges since NOLA date:
  - Regular assessments (each period listed)
  - Special assessments (if applicable)
  - Interest (rate, period, amount)
  - Administrative late fees
  - Attorney's fees and costs (if applicable)
- Itemized payments received since NOLA date (with dates and statutory allocation)
- **Current Total Amount Due** (bold, prominent)
- As of date (today's date or a specified date)
- Statutory basis: "Pursuant to Florida Statute §718.116"

**Formatting requirements:**
- Charges shown as positive numbers
- Payments shown as negative numbers (or in a separate credit column)
- Running balance column
- Total Due row in bold at bottom
- NOLA row visually distinguished (different background color or bold border)

### 5.3 Sheet 2 — NOLA-Ledger (formerly "Ledger Detail")

**Purpose:** Complete transaction-level audit trail anchored to the NOLA, with pre-NOLA context from the uploaded ledger and post-NOLA accruals/payments.

**Required columns (13 total, A–M):**

| Col | Header | Description |
|-----|--------|-------------|
| A | # | Row number |
| B | Date | Transaction date |
| C | Description | Using statutory terminology |
| D | Type | Classification (Regular Assessment, Interest, Late Fee, etc.) |
| E | Assessments ($) | Assessment charges |
| F | Interest ($) | Interest charges |
| G | Late Fees ($) | Administrative late fees |
| H | Atty Fees ($) | Attorney fees and costs |
| I | Other ($) | Other charges (water, collection costs, etc.) |
| J | Payments ($) | Payments received from unit owner |
| K | Credits ($) | Waivers, adjustments, non-payment credits |
| L | Running Balance ($) | **Must use Excel formulas** |
| M | Notes | Flags, characterization notes |

**Sheet structure (in order):**

1. **Pre-NOLA Ledger History** (light gray background, smaller font, gray text)
   - Separator row: "PRE-NOLA LEDGER HISTORY"
   - Transactions from the uploaded ledger starting from **when the account first went delinquent** (balance crossed from zero/negative to positive) through the NOLA date
   - **Do NOT include the entire ledger history** — only from the start of delinquency forward
   - These show the context/charges that the NOLA balance is based on
   - Running balance builds up via formulas: `=L{prev}+E{r}+F{r}+G{r}+H{r}+I{r}-J{r}-K{r}`
   - This section is informational context only — **not included in TOTALS calculations**

2. **NOLA Anchor Row** (highlighted in yellow, bold)
   - Date = NOLA date
   - Description = "Balance per Notice of Late Assessment (NOLA)"
   - **Charge columns E–K use `=SUM()` formulas** over the RELEVANT pre-NOLA rows only
   - Formula: `E{nola} = =SUM(E{relevant_start}:E{relevant_end})`
   - This makes the NOLA balance **provable** from the ledger history — not conclusory
   - Running Balance (L) = `=E{row}+F{row}+G{row}+H{row}+I{row}-J{row}-K{row}`
   - If the SUM doesn't match the NOLA's stated balance, the discrepancy is visible and flagged
   - Notes = "NOLA ground truth opening balance — do not modify"

3. **Post-NOLA Transactions** (standard formatting)
   - All transactions from the uploaded ledger with dates after the NOLA date
   - Includes: assessments accrued, interest, late fees, attorney fees, payments received
   - Running balance via formula: `=L{prev}+E{r}+F{r}+G{r}+H{r}+I{r}-J{r}-K{r}`
   - **This section MUST always be populated when a ledger is uploaded.** If no post-NOLA transactions appear, the system must flag for investigation — it is never correct to have a NOLA with zero subsequent activity.

4. **45-Day Forward Projection** (green background, italic)
   - Separator row: "45-DAY FORWARD PROJECTION (PRD §42.6)"
   - Projected monthly assessments through the 45-day cure window
   - Running balance continues via formula

5. **Current Balance Row** (light blue `#B4C6E7`, bold)
   - Appears BEFORE the 45-day projections
   - Label: "CURRENT BALANCE (per ledger)"
   - Charge columns: SUM formulas from NOLA row to last post-NOLA row
   - Running Balance: references last post-NOLA row's running balance
   - This row should match the uploaded ledger's total — if it doesn't, that's a flag

6. **45-Day Forward Projection** (green background, italic)
   - Separator row: "45-DAY FORWARD PROJECTION (PRD §42.6)"
   - Projected monthly assessments through the 45-day cure window
   - Running balance continues via formula

7. **TOTALS Row** (gold background, bold)
   - SUM formulas for columns E–K, starting from the NOLA anchor row (excludes pre-NOLA history)
   - Running Balance (L) = reference to last data row's running balance
   - Formula pattern: `=SUM(E{nola_row}:E{last_data_row})`

6. **Summary Block** (below totals, with characterization)
   - Formula references to the TOTALS row for each category:
     - Total Assessments = `=E{totals_row}`
     - Total Interest = `=F{totals_row}`
     - Total Late Fees = `=G{totals_row}`
     - Total Attorney Fees = `=H{totals_row}`
     - Total Other Charges = `=I{totals_row}`
     - Total Payments = `=-J{totals_row}`
     - Total Credits = `=-K{totals_row}`
     - NET BALANCE DUE = `=L{totals_row}`
   - Every line must have a formula — no empty or irrelevant entries

**Formula requirements:**
- All Running Balance cells MUST use Excel formulas, never hardcoded values
- All TOTALS cells MUST use SUM formulas
- All Summary cells MUST reference the TOTALS row via formulas
- This ensures the spreadsheet recalculates correctly if any value is manually adjusted

**Pre-NOLA history scope rule:**
- The system computes a running balance over the full ledger
- It identifies the **last point where the balance was zero or negative** (i.e., the account was current)
- Pre-NOLA history starts from the transaction **after** that zero-balance point
- This means only the delinquency period is shown, not years of paid-on-time history
- If the balance never hit zero, show the entire ledger up to the NOLA date

**NOLA charge breakdown rule:**
- The NOLA document itself itemizes charges (assessments, late fees, interest, etc.)
- The system must parse the NOLA and populate the charge columns (E–I) on the NOLA row with this breakdown
- The sum of E through I minus J minus K on the NOLA row must equal the NOLA stated balance
- If the NOLA does not itemize (lump sum only), the entire amount goes in Assessments (E)

**Ledger file matching:**
- The system must match uploaded ledger files to the current matter by unit number or owner last name
- If no matter-specific ledger is found, fall back to the most recent ledger file
- Generic keyword matching ("ledger", "assessment", "transaction", "account", "statement") identifies candidate files

**Characterization column:**
- For each payment row, a "Statutory Allocation" column shows: "Interest: $X | Late Fee: $X | Assessment: $X"
- If the association's label conflicts with the statutory hierarchy, both are shown: "Association applied as: [label]. Corrected to: [hierarchy-based allocation]"

### 5.4 Sheet 3 — Unit Owner Profile

**Purpose:** Full profile of the delinquent owner for use in document generation and public records verification.

**Required fields:**
- Owner legal name (as on deed)
- Unit number
- Association name
- Property address (unit)
- Mailing address (if different)
- Ownership verification date (from county appraiser)
- Occupancy status: Owner-occupied / Tenant-occupied / Vacant
- Tenant name (if applicable)
- Monthly assessment amount
- Special assessment amount (if applicable)
- Governing statute: 718 / 720
- Account number (if the association uses one)
- NOLA date and NOLA reference number
- Date of first delinquency (pre-NOLA, for context only)
- Matter ID (CondoClaw internal)

### 5.5 Sheet 4 — Compliance Checklist

**Purpose:** Step-by-step verification that all statutory requirements have been satisfied for this matter. This sheet is the litigation defense document.

**Required checks:**

| # | Check | Status | Date Completed | Notes |
|---|-------|--------|---------------|-------|
| 1 | Correct statute identified (718 vs. 720) | ✓ / ✗ / Pending | | |
| 2 | NOLA issued and date recorded | ✓ / ✗ / Pending | | |
| 3 | NOLA mailed to correct address | ✓ / ✗ / Pending | | |
| 4 | NOLA balance matches ledger opening balance | ✓ / ✗ / Flag | | |
| 5 | Statutory cure period satisfied before demand | ✓ / ✗ / Pending | | |
| 6 | Payment hierarchy applied per §718.116(3) | ✓ / ✗ / Flag | | |
| 7 | Interest rate verified against declaration | ✓ / ✗ / Pending | | |
| 8 | Late fees authorized by declaration | ✓ / ✗ / Pending | | |
| 9 | Attorney fee entitlement confirmed | ✓ / ✗ / Pending | | |
| 10 | Demand letter total consistent with NOLA | ✓ / ✗ / Block | | |
| 11 | Mailing affidavit completed | ✓ / ✗ / Pending | | |
| 12 | Lien eligibility threshold met | ✓ / ✗ / Pending | | |
| 13 | Ownership verified via county appraiser | ✓ / ✗ / Pending | | |
| 14 | Payment characterization discrepancies noted | ✓ / N/A / Flag | | |

**Status legend:**
- ✓ = Complete and verified
- ✗ = Failed / Not satisfied
- Pending = Not yet completed
- Flag = Discrepancy detected — attorney review required
- Block = Hard block — system will not generate next document until resolved

---

## 6. What "Wrong Numbers" Looks Like — Quintana Pattern

The Quintana matter illustrates the failure mode this module is designed to prevent.

**Typical error pattern:**

1. NOLA issued with balance of $X
2. Ledger is constructed starting from an arbitrary prior date (not the NOLA date)
3. Ledger shows a different total because it includes pre-NOLA charges that were not in the NOLA
4. Demand letter uses the ledger total instead of the NOLA-anchored total
5. **Result**: Demand letter contradicts the NOLA → inherently objectionable

**Alternatively:**

1. Association applied a payment to the assessment instead of interest first
2. Ledger reflects the association's characterization
3. Demand letter itemizes interest as still fully outstanding, but ledger shows it was cleared
4. **Result**: Itemization in demand letter is inconsistent with ledger detail → objectionable

**The fix:**
- Start the ledger from the NOLA
- Take the NOLA balance as given
- Re-apply all post-NOLA payments per the statutory hierarchy
- Generate the demand letter from the corrected, NOLA-anchored ledger

---

## 7. Summary Rules — Quick Reference

| Rule | Requirement |
|------|------------|
| Ledger anchor | NOLA date and NOLA balance are the authoritative starting point |
| **Claude review (CENTERPIECE)** | **ALL documents reviewed by Claude AI before Excel generation — validates data, resolves dates, checks consistency** |
| Sheet 2 pre-NOLA history | FULL ledger history dumped. Relevant period (delinquency) in light gray. Irrelevant period (account current) in darker gray italic. Excluded from TOTALS |
| Dateless items | "Previous Balance" / "Balance Forward" items are pre-NOLA. Claude resolves dates; regex fallback assigns to pre-NOLA |
| Sheet 2 columns | 13 columns: #, Date, Desc, Type, Assessments, Interest, Late Fees, Atty Fees, Other, **Payments**, Credits, Running Balance, Notes |
| Sheet 2 NOLA charge breakdown | NOLA row E–I populated from NOLA category parsing (not zeros), must sum to NOLA balance |
| Sheet 2 NOLA row | Yellow highlight, charge columns populated from NOLA category breakdown, running balance = NOLA balance |
| Sheet 2 post-NOLA history | **Mandatory** when ledger is uploaded — must always show post-NOLA transactions |
| Sheet 2 formulas | Running balance (K), TOTALS, and summary MUST use Excel formulas, never hardcoded |
| Sheet 2 TOTALS range | SUM formulas start from NOLA anchor row (exclude pre-NOLA history) |
| Ledger file matching | Match by unit number or owner last name first, then fall back to generic keywords |
| Payment allocation | Per §718.116(3) hierarchy regardless of association's label |
| Total balance | Must be mathematically correct per full ledger |
| Demand letter total | Must equal NOLA balance + post-NOLA accruals − post-NOLA payments |
| Demand letter vs. NOLA | Never contradictory. Never lower without showing a payment. |
| Association characterization errors | Re-characterize + flag. Do not change total. |
| Association math errors (NOLA is wrong) | Block. Flag for attorney. Do not generate demand letter. |
| Excel Sheet 1 | Statement of Account |
| Excel Sheet 2 | NOLA-Ledger (pre-NOLA history + NOLA anchor + post-NOLA + projections) |
| Excel Sheet 3 | Unit Owner Profile |
| Excel Sheet 4 | Compliance Checklist |
| NOLA correctness assumption | Yes — system assumes NOLA is correct unless flagged |
| File naming | No version number (infer from date). FirstDemand (not FirstDemandLetter). Concise type labels. |

---

## 8. Implementation Notes for Development

### 8.1 Ledger Processor Changes (ledger_processor.py)

- Add `nola_date` and `nola_balance` as required inputs to `process_ledger()`
- Filter all transactions: only include rows with date >= NOLA date
- Inject NOLA row as first data row with description = "Balance per Notice of Late Assessment (NOLA)" and amount = NOLA balance
- Add `apply_payment_hierarchy()` function that re-allocates each payment row per §718.116(3):
  - Running totals for: outstanding_interest, outstanding_late_fees, outstanding_costs, outstanding_assessments
  - Each payment reduces them in order
  - Output: per-payment allocation breakdown as additional columns

### 8.2 Excel Output Changes

- Replace single `Ledger` sheet with 4-sheet workbook in the order specified in §5.1
- Sheet 1 (Statement of Account): auto-generated summary from ledger data
- Sheet 2 (Ledger Detail): current ledger output plus statutory allocation columns
- Sheet 3 (Unit Owner Profile): populated from unit_owners database table
- Sheet 4 (Compliance Checklist): auto-populated based on matter state + validation flags

### 8.3 Claude Document Review Layer — CENTERPIECE

**This is the most important architectural component of CondoClaw.**

The Claude review is a **TWO-STEP process** — like an attorney paired legal review:

1. **Step 1 — Upload Review**: When documents are uploaded, Claude understands the NOLA and ledger. It validates data, resolves dateless items, breaks down the NOLA balance, and flags inconsistencies. This produces the structured dataset that the Excel generator uses.

2. **Step 2 — Post-Generation Review**: After the Excel data is assembled, Claude reviews the generated output against the original documents. It checks mathematical consistency, completeness, unexplained numbers, and anything an opposing attorney would object to. Issues are logged and can block generation if severity warrants it.

In other words: Claude does what we're doing now — reviewing the output for correctness.

#### 8.3.1 Architecture

```
Uploaded NOLA + Uploaded Ledger
        │
        ▼
┌──────────────────────────────┐
│  STEP 1: Upload Review       │  ← Claude understands documents
│  (Anthropic API — Claude)    │
│                              │
│  • FL Statute §718/§720      │
│  • Payment hierarchy         │
│  • CAM accounting conventions│
│  • NOLA–Ledger reconciliation│
│  • Date resolution           │
│  • Category classification   │
│  • Consistency validation    │
└──────────────────────────────┘
        │
        ▼
  Structured, validated dataset
        │
        ▼
  Excel spreadsheet generation
  (formulas, SUM references, formatting)
        │
        ▼
┌──────────────────────────────┐
│  STEP 2: Post-Gen Review     │  ← Claude reviews output
│  (Attorney paired review)    │
│                              │
│  • Math consistency check    │
│  • Completeness check        │
│  • Unexplained numbers       │
│  • Running balance chain     │
│  • NOLA balance verification │
│  • Opposing counsel objection│
│    anticipation              │
└──────────────────────────────┘
        │
        ▼
  Final Excel output (or flagged for review)
```

#### 8.3.2 What Claude Reviews

1. **Document understanding**: Claude reads both the NOLA and ledger as a paralegal would — understanding the relationship between them, not just regex-matching fields.

2. **FL Statute knowledge**:
   - §718.116(3) payment hierarchy: Interest → Late Fees → Costs → Assessments
   - §718.121 lien procedures and cure periods
   - §720.3085 HOA equivalents
   - NOLA requirements and timelines

3. **CAM (Community Association Manager) accounting**:
   - How property management systems (TOPS, BuildingLink, AppFolio, CINC) format ledgers
   - "Previous Balance" / "Balance Forward" entries — these are opening balances, not new charges
   - How assessments, special assessments, water bills, delinquent fees, and collection costs are categorized
   - Payment types: eCheck, ACH, check — and their ledger representations

4. **NOLA breakdown**: Parse the NOLA's stated amounts into categories (assessments, interest, late fees, attorney fees, other)

5. **Date resolution**: Dateless items (e.g., "Previous Balance — Assessment 2025") get assigned logical dates based on context

6. **Consistency validation**:
   - Does the pre-NOLA ledger history add up to the NOLA stated balance?
   - Are post-NOLA transactions complete and reasonable?
   - Do any numbers appear without explanation?
   - Are there gaps in the transaction history?

#### 8.3.3 Claude's Output

Claude returns structured JSON with:
- `nola_date`: Validated NOLA date
- `nola_balance`: Validated NOLA balance
- `nola_breakdown`: Category breakdown (assessments, interest, late fees, atty fees, other)
- `delinquency_start_date`: When the account first became delinquent
- `line_items[]`: Every transaction with validated date, description, type, charge, credit, pre/post-NOLA flag, relevance flag
- `validation{}`: Pre-NOLA net balance, NOLA match check, discrepancy amount, flags, warnings

#### 8.3.4 Step 2 — Post-Generation Review

After the Excel data is assembled (rows, formulas, sections), Claude reviews the output:

**What Claude checks:**
- Mathematical consistency: Do pre-NOLA charges sum to the NOLA balance?
- Completeness: Are there gaps in the transaction history?
- Dateless entries: Any rows still missing dates?
- Category accuracy: Are charges in the right columns?
- Unexplained numbers: Any amounts that don't tie to NOLA or ledger?
- Running balance chain: Does it flow correctly?
- Opposing counsel anticipation: Would an attorney object to any entry?

**Output:**
- `status`: "pass" (clean), "review_needed" (warnings), or "block" (errors that must be fixed)
- `issues[]`: Each issue with severity (error/warning/info), row number, description, suggested fix
- `discrepancy`: Dollar amount difference between pre-NOLA sum and NOLA stated balance

**Action on issues:**
- `error` severity → logged to Compliance Checklist, may block document generation
- `warning` severity → logged, flagged for attorney review
- `info` severity → logged for reference

#### 8.3.5 Fallback

If the Anthropic API key is not configured or Claude is unavailable, the system falls back to regex-based parsing. However, the fallback path should be considered degraded — it cannot validate consistency or resolve dateless items.

**Required environment variable:** `ANTHROPIC_API_KEY`
**Required Python package:** `anthropic>=0.49.0`

#### 8.3.6 Claude Chat Integration (AI Concierge)

Claude's reviews appear in the **AI Concierge chat** on the right-hand side of the UI. The chat uses Claude (Anthropic API) as its primary AI engine when `ANTHROPIC_API_KEY` is configured, falling back to Gemini otherwise.

**When Claude speaks in the chat:**

1. **On document upload**: After each document is uploaded and parsed, the frontend calls `/api/claude-review`. If both NOLA and ledger are available, Claude's Step 1 review appears in the chat with:
   - NOLA balance and ledger reconciliation
   - Delinquency start date
   - Flags and warnings
   - Whether the NOLA balance matches the ledger

2. **On "Generate Ledger" button press**: After the ledger Excel is generated, Claude's Step 2 post-generation review appears in the chat with:
   - Pass/review_needed/block status
   - Specific issues by row
   - Discrepancy amounts
   - Opposing counsel objection anticipation

3. **On "Generate First Letter" button press**: Claude comments on statutory compliance and NOLA consistency.

4. **Interactive chat**: Users can ask Claude questions about the matter, documents, FL statutes, or the generated output at any time. Claude responds with full context of the uploaded documents and generated data.

**Technical implementation:**
- Backend: `/api/chat` prefers Claude (Anthropic) when `ANTHROPIC_API_KEY` is set
- Backend: `/api/claude-review` endpoint for Step 1 review
- Backend: `/api/generate/ledger` returns `post_review` in response for Step 2
- Frontend: `condoclaw:claude_review` custom event dispatched from Dashboard
- Frontend: AIConcierge listens for `condoclaw:claude_review` and displays in chat

#### 8.3.7 No Hardcoded Matter Data

The system must NEVER contain hardcoded references to specific matters, owners, units, addresses, or financial amounts. All data must come from uploaded documents. The system is generic — it works with any NOLA and ledger that are uploaded.

Prohibited hardcodes: specific owner names, unit numbers, association names, NOLA dates, assessment amounts, addresses, counties (as defaults).

### 8.4 Validation Gate (backend.py — /api/process)

Before generating any demand letter document:
1. Extract NOLA balance from uploaded NOLA document (or from unit_owners/uploads table)
2. Compare to ledger opening balance
3. If delta > $0.00 → return `{"status": "blocked", "reason": "NOLA_LEDGER_MISMATCH", "details": {...}}`
4. If delta == $0.00 → proceed to document generation

### 8.5 Demand Letter Consistency Check (letter_generator.py)

Add pre-generation check:
```
total_from_ledger = sum_of_charges - sum_of_payments (post-NOLA only)
if abs(demand_letter_total - total_from_ledger) > 0.01:
    block("DEMAND_LETTER_INCONSISTENT_WITH_NOLA_LEDGER")
```

---

*This module is referenced from PRD.md §12 (Baseline Excel Ledger) and §8 (Cross-document Validation).*
*Related statutes: Florida Statute §718.116(3) (payment hierarchy), §718.121 (liens).*
