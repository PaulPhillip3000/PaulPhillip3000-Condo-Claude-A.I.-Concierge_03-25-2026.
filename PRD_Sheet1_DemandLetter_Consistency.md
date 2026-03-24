# PRD Addendum — Statement of Account / Demand Letter Table Consistency

**Date:** March 24, 2026
**Status:** Active
**Supersedes:** Previous SOA layout in PRD.md §5.1

---

## §48 — Pre-Generation Variable Extraction (Main Object)

### §48.1 — Requirement

Before any Excel sheet is generated, the system MUST produce a structured **Financial Variables Object** from the OCR'd documents (NOLA + Ledger). This object is the single source of truth for all downstream outputs.

The extraction step occurs AFTER document OCR and Claude/Gemini review, BEFORE Excel generation.

### §48.2 — Financial Variables Object Schema

```json
{
  "nola_date": "MM/DD/YYYY",
  "nola_balance": 0.00,
  "nola_breakdown": {
    "assessments": 0.00,
    "special_assessments": 0.00,
    "interest": 0.00,
    "late_fees": 0.00,
    "attorney_fees": 0.00,
    "other_charges": 0.00
  },
  "post_nola_charges": {
    "assessments": 0.00,
    "special_assessments": 0.00,
    "interest": 0.00,
    "late_fees": 0.00,
    "other_charges": 0.00
  },
  "payments_after_nola": 0.00,
  "credits_after_nola": 0.00,
  "monthly_assessment_rate": 0.00,
  "attorney_entered": {
    "attorney_fees": 0.00,
    "certified_mail": 0.00,
    "other_costs": 0.00
  },
  "computed": {
    "subtotal_before_attorney": 0.00,
    "attorney_total": 0.00,
    "total_outstanding": 0.00
  }
}
```

### §48.3 — Processing Order

1. **OCR** documents (NOLA PDF + Ledger PDF)
2. **Extract & Classify** every line item into the Financial Variables Object
3. **Validate** — NOLA breakdown must sum to NOLA balance (±$1 tolerance)
4. **Generate NOLA-Ledger** (Sheet 2) — each charge placed in the correct column based on its classification
5. **Generate Statement of Account** (Sheet 1) — derived from the same Financial Variables Object
6. **Generate First Demand Letter** — its table is a direct rendering of the same object

All three outputs read from ONE object. No independent re-computation.

### §48.4 — NOLA Row Apportionment

The NOLA anchor row on Sheet 2 MUST distribute the NOLA balance across the correct charge columns:

| Column | Source |
|--------|--------|
| E (Assessments) | `nola_breakdown.assessments + nola_breakdown.special_assessments` |
| F (Interest) | `nola_breakdown.interest` |
| G (Late Fees) | `nola_breakdown.late_fees` |
| H (Atty Fees) | `nola_breakdown.attorney_fees` |
| I (Other) | `nola_breakdown.other_charges` |

The NOLA row uses `=SUM()` formulas over RELEVANT pre-NOLA rows. If the pre-NOLA rows don't break out into these categories correctly, the system MUST classify them from the original descriptions.

---

## §49 — Statement of Account = Demand Letter Table

### §49.1 — Core Rule

Sheet 1 (Statement of Account) MUST contain the **exact same 9-row table** that appears in the First Demand Letter. Word for word, dollar for dollar.

### §49.2 — The 9-Row Table

| # | Label | Source |
|---|-------|--------|
| 1 | Maintenance due including [Through Date] | Financial Variables Object → nola_breakdown.assessments + post_nola_charges.assessments |
| 2 | Special assessments due including [Through Date] | Financial Variables Object → nola_breakdown.special_assessments + post_nola_charges.special_assessments |
| 3 | Late fees, if applicable | Financial Variables Object → nola_breakdown.late_fees + post_nola_charges.late_fees |
| 4 | Other charges | Financial Variables Object → nola_breakdown.other_charges + post_nola_charges.other_charges |
| 5 | Certified mail charges | attorney_entered.certified_mail |
| 6 | Other costs | attorney_entered.other_costs |
| 7 | Attorney's fees | attorney_entered.attorney_fees |
| 8 | Partial Payment | payments_after_nola (shown as negative) |
| 9 | **TOTAL OUTSTANDING** | Sum of rows 1–7 minus row 8 |

### §49.3 — Zero Values

Every row MUST display a dollar amount. If the value is zero, display `$0.00`. Never leave a cell blank. A blank cell suggests missing data; `$0.00` confirms the value was computed and is zero.

### §49.4 — Two-Tier Total (Attorney Charges Below the Line)

The NOLA-Ledger (Sheet 2) TOTALS row reflects charges from the association ledger only. Attorney-entered charges (certified mail, other costs, attorney fees) are added AFTER the ledger balance. The SOA renders this as:

```
  Maintenance due including April 1, 2026:    $2,152.00
  Special assessments:                        $0.00
  Late fees, if applicable:                   $0.00
  Other charges:                              $0.00
  Partial Payment:                            $0.00
  ─────────────────────────────────────────────────────
  SUBTOTAL (Association Charges):             $2,152.00

  Certified mail charges:                     $40.00
  Other costs:                                $16.00
  Attorney's fees:                            $400.00
  ─────────────────────────────────────────────────────
  TOTAL OUTSTANDING:                          $2,608.00
```

The First Demand Letter table uses the TOTAL OUTSTANDING (inclusive of attorney charges).

### §49.5 — Consistency Gate

Before writing ANY output file, the system asserts:

```
SOA_TOTAL == DEMAND_LETTER_TOTAL == NOLA_LEDGER_NET_BALANCE + ATTORNEY_CHARGES
```

If this assertion fails, generation is blocked and the error is logged.

---

## §50 — First Demand Letter Table Field Mapping

### §50.1 — No Blank Fields

Every row in the AMOUNT DUE SUMMARY table MUST have a dollar value. The `_money()` formatter must return `"$0.00"` for zero values, not an empty string.

### §50.2 — Field Sources

| Demand Letter Field | Entity Key | Fallback |
|---|---|---|
| Maintenance due including [date] | `principal_balance` | Must be computed — never "See Ledger" |
| Special assessments | `special_assessments` | $0.00 |
| Late fees | `late_fees` | $0.00 |
| Other charges | `other_charges` | $0.00 |
| Certified mail charges | `certified_mail_charges` | $0.00 |
| Other costs | `other_costs` | $0.00 |
| Attorney's fees | `attorney_fees` | $0.00 |
| Partial Payment | `partial_payment` | $0.00 |
| TOTAL OUTSTANDING | `total_amount_owed` | Must be computed — never $0 |

### §50.3 — Classification Errors

"Everything in other charges" is a classification failure. The system must:
1. Parse the NOLA for maintenance, special assessments, late fees, and other charges separately
2. Parse the ledger for post-NOLA charges by the same categories
3. Map each to the correct demand letter row

If the NOLA uses non-standard labels (e.g., "Maintenance Fee" instead of "Assessment"), the parser MUST recognize them. See §48.4.
