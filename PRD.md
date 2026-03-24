# CondoClaw AI Concierge — Product Requirements Document
**Version:** 2.1
**Date:** March 21, 2026
**Status:** Active Development

---

## 1. Product Overview

### 1.1 What CondoClaw Is

CondoClaw is an AI-driven legal operations platform that transforms how condominium and HOA collection matters are managed. The system automatically organizes cases around associations, extracting intelligence from uploaded documents — ledgers, NOLAs, and governing declarations — to create a structured data layer that standardizes financial rules, validates compliance, and enhances document generation. An AI Concierge continuously analyzes and cross-references information to detect discrepancies, guide workflows, and improve accuracy over time. Ultimately, CondoClaw turns fragmented legal and financial data into a centralized, intelligent system that reduces risk, increases efficiency, and supports scalable legal operations.

> **This is not document automation. It is a compliance and litigation risk engine.**

**Complete product definition:**

> CondoClaw is a system that converts messy financial and legal inputs — PDFs, ledgers, affidavits, governing declarations — into a continuously updated, audit-ready, statute-compliant financial record that drives all legal actions. Every fee is applied automatically. Every balance is verifiable. Every document is defensible.

---

### 1.2 Goal

Build an AI-driven platform that structures, analyzes, and automates HOA/condo collections workflows by transforming unstructured documents into validated, actionable legal intelligence.

---

### 1.3 Core Problem

Legal collections are:
- **Document-heavy** — NOLAs, ledgers, declarations, affidavits, liens across hundreds of matters
- **Inconsistent** — every association has different rules; no standardization across matters
- **Error-prone** — interest miscalculations, incorrect late fees, non-compliant notices create litigation exposure
- **Manual** — attorneys and staff re-create the same analysis from scratch for every matter

---

### 1.4 Solution

A system that:
1. Organizes every matter by association
2. Extracts structured, validated data from uploaded documents
3. Applies association-specific governing rules (declarations, bylaws)
4. Validates financial and legal outputs against statute and governing documents
5. Flags risks and inconsistencies before documents are generated
6. Guides every workflow step through an AI Concierge

**Core flow:**
> Upload → AI Reads → AI Verifies (Web) → AI Reasons → AI Validates → AI Generates → User Reviews

The AI Concierge ("The Condor") is the operator. The dashboard is the control center.

---

### 1.5 Core System Architecture — Entities

The system is organized around four core entities. Every feature in the product touches at least one.

**Association**
- Name, governing documents (Declaration, Bylaws, Amendments)
- Extracted rules: interest rate, late fees, grace periods, attorney fee entitlement
- Status: Empty → Partially Configured → Configured → Verified *(see §15.4)*

**Matter**
- Linked to an Association and a Unit Owner
- Contains: Ledger, NOLA, lien documents, workflow history
- Status: Draft → In Validation → Eligible → Stage 1–4 → Closed *(see §15.3)*

**Documents**
- Ledger (financial source of truth)
- NOLA (trigger for collections pipeline)
- Declaration (rules engine input)
- Generated documents (letters, liens, complaints)

**AI Intelligence Layer**
- Extraction — structured data from unstructured documents
- Rule application — declaration rules applied to ledger
- Cross-document validation — NOLA vs. ledger vs. affidavit vs. public records
- Risk detection — discrepancies, non-compliance, missing required elements
- Confidence scoring — every AI output carries a confidence tier *(see §15.5)*

---

### 1.6 Value Proposition

| Value | Benefit |
|-------|---------|
| **Statutory Compliance Automation** | The correct statute (718 vs. 720) is determined at intake and enforced at every step — reducing invalid liens and dismissed cases |
| **Efficiency** | Reduce manual review time by 60–80% through AI extraction, automated ledger calculation, and stage-triggered document generation |
| **Litigation Defense** | Full audit trail + compliance certification at lien stage = step-by-step proof that every requirement was met |
| **Risk Reduction** | Compliance errors caught before documents are sent — wrong statute, incorrect interest, missing notices, timing violations |
| **Workflow Enforcement** | No missed steps. No premature filings. The system enforces the correct sequence and blocks progression until all requirements are satisfied |
| **Standardization** | Uniform calculations and correct legal pathways across all matters — regardless of staff, association, or prior history |
| **Institutional Memory** | Associations become reusable intelligence profiles — rules extracted once, applied to every future matter, improved over time |
| **Legal Defensibility** | Every extraction, calculation, classification, override, and generation event is logged in an immutable audit trail *(§16.9)* |

---

### 1.7 System Outputs — What CondoClaw Produces

The following outputs are what CondoClaw sells. Every feature in this PRD exists to produce one or more of these. *(Full specification: §16.2)*

1. **Correct legal pathway** — HOA vs. Condominium classification + statute locked (718 / 720) before any step proceeds *(§10)*
2. **Validated enforcement timeline** — all steps tracked, all statutory deadlines enforced *(§10.8)*
3. **Eligibility decision** — Eligible / Conditional / Blocked per matter before any document is generated *(§8)*
4. **Statute-compliant draft documents** — NOLI, Letter 1, Letter 2, Claim of Lien — statute-appropriate templates *(§10.9)*
5. **Compliance certification** — at lien stage, a structured summary confirming all required steps were completed *(§10.10)*
6. **Baseline Excel ledger** — normalized, versioned, auditable financial record *(§12)*
7. **Conflict report** — specific discrepancies between NOLA, ledger, affidavit, and public records *(§8)*
8. **Standardized interest calculation** — association-specific, declaration-sourced, defensible *(§13)*
9. **Public record verification** — deed holder, address, ownership transfer from county appraiser *(§6)*
10. **Risk alerts** — wrong statute, missing notice, timing violation, data inconsistencies — flagged before harm *(§16.2)*
11. **Association Intelligence Profile** — extracted rules, historical patterns, reusable across all matters *(§14)*
12. **Memory comparison report** — similarity score vs. prior approved examples *(§17)*
13. **Audit trail** — complete, timestamped, immutable record of every system event *(§16.9)*

---

### 1.8 V1 Scope — What Gets Built First

**Must Have (V1 / MVP):**
- Association classification — HOA vs. Condominium, statute locked at intake *(§10.2–10.4)*
- Statutory Rule Engine — 718 vs. 720 workflow loaded and enforced *(§10.4)*
- Post-NOLI workflow — Letter 1 → Letter 2 → Claim of Lien, with timing enforcement *(§10.7–10.8)*
- Step validation — no step can be skipped; no document generated out of order *(§10.7)*
- Governing document upload + OCR extraction + confidence scoring *(§13)*
- Core Matter Variables extraction and validation *(§7–8)*
- Cross-document validation + discrepancy detection *(§8)*
- Matter state machine enforced *(§10.7)*
- Audit trail for all system events *(§16.9)*
- NOLI generation (statute-appropriate template) *(§10.9)*
- Attorneys' fees + costs engine (stage-triggered) *(§15)*
- Baseline Excel ledger generation *(§12)*

**Nice to Have (V2):**
- Full litigation workflow (complaints, hearings, service of process)
- Advanced risk scoring and predictive analytics
- Bulk processing across multiple matters
- Per-association fee templates
- Court cost automation and fee cap enforcement

*Full MVP scope: §25. Success criteria: §26.*

---

### 1.9 Strategic Clarity

> CondoClaw is not software that stores legal documents.
>
> CondoClaw is a **self-learning legal collections engine** that determines the correct legal pathway, adapts to how each firm works, validates every step, and defends the result.

This places CondoClaw in a higher-value category:
- Closer to **compliance infrastructure** than case management
- Closer to a **legal correctness engine** than a document generator
- Closer to **AI-assisted litigation defense** than a workflow tool
- Closer to **adaptive firm intelligence** than static templates

**What separates CondoClaw from every competitor:**

| Competitors | CondoClaw |
|------------|-----------|
| Static templates | Firm-specific learned templates that adapt over time *(§17.14)* |
| Hardcoded workflows | Statute-driven dynamic workflows (718 vs. 720) *(§10.8)* |
| Manual everything | Stage-triggered automation with human review gates |
| One-size-fits-all formatting | Ledger and document generation that mirrors how each firm already works *(§17.16)* |
| Documents stored | Documents validated, compliance-certified, and litigation-proofed *(§17.18)* |

The competition stores files. CondoClaw reads them, classifies them, validates them, learns from them, enforces the correct legal sequence, and proves you did it right.

---

### 1.10 Core Generation Promise

> **CondoClaw generates approximately 99% of every letter, ledger, and lien automatically.**

The user's role is not drafting. It is final review and correction.

**How it achieves this:**

CondoClaw combines every available source — the NOLA, the ledger, the mailing affidavit, and the association's declaration — to build a complete, statute-compliant draft without manual input. It first constructs a baseline document that satisfies all statutory requirements for the locked statute (Chapter 718 or 720). It then refines that baseline using the firm's prior approved letters, ledgers, and liens — applying the firm's preferred structure, language, and format automatically.

Before presenting the draft to the user, the AI validation layer cross-checks everything:
- All extracted variables (owner, unit, amounts, dates, addresses)
- All calculations (interest, late fees, total balance)
- All statutory requirements (required language, disclosures, citations, timing)
- Similarity to prior approved examples from the firm

The draft arrives at the user's screen with a confidence score, compliance score, similarity score, and any flags — ready for review, not ready to be written.

**The user's only job is to say what is right or wrong.**

Every correction the user makes is fed back into CondoClaw Memory. The system learns from it, applies it to the next similar matter, and gets closer to perfect output with every case.

**The progression:**

```
Matter 1:    System generates draft. User makes 5 corrections. System learns.
Matter 10:   System generates draft. User makes 2 corrections. System learns.
Matter 50:   System generates draft. User makes 0 corrections. System has learned.
Matter 100+: System generates the right document on the first try.
```

This is the product's north star. Everything in this PRD — the state machine, the confidence layer, the Memory schema, the Alpha Learning Loop, the Gold Standard training, the statute engine — exists to make this promise true.

---

### 1.11 Intelligent Document Synthesis Engine — Capability Specification

This section defines the five-layer technical capability of CondoClaw's core document generation system.

---

#### Layer 1 — Multi-Source Input Ingestion

The system ingests and normalizes multiple legal data sources simultaneously:

| Input Source | Type | What Is Extracted |
|-------------|------|-------------------|
| Notice of Late Assessment (NOLA) | Unstructured PDF | Owner, unit, association, amount, date, statutory basis |
| Financial ledger | Structured / unstructured | Transaction history, balance, fee breakdown, calculation basis |
| Mailing affidavit | Unstructured PDF | Mailing address, certified mail tracking, proof of service |
| Association Declaration | Unstructured PDF | Interest rate, late fee rules, grace periods, attorney fee rights |
| Case metadata | Structured fields | Parties, dates, jurisdiction, matter posture, statute type |

Inputs may be structured (forms, fields) or unstructured (PDFs, scanned documents, narrative text). The system normalizes them into the Core Matter Variables layer (§7) and the Variable Engine (§2.4) — a single source of truth used by every downstream system.

---

#### Layer 2 — Intelligent Document Construction (~99% Automation)

Using the normalized input data, the system generates a near-complete legal document that:
- Applies the correct statutory rules and procedural requirements for the locked statute (Chapter 718 or 720)
- Integrates facts across all provided sources into a coherent legal narrative
- Produces jurisdictionally appropriate language and formatting
- Mirrors the firm's preferred structure and language from prior approved documents
- Requires minimal human editing — target: ~1% final review

**This is not template filling.** It is context-aware synthesis that combines statute, facts, calculations, and firm-specific preferences into a single document. *(Full specification: §1.10, §17.14)*

---

#### Layer 3 — Real-Time Legal Enrichment (Online Intelligence Layer)

The system retrieves and incorporates relevant external legal information at the time of document generation. This ensures outputs are not only factually accurate but legally current and properly grounded.

**Real-time retrieval includes:**

| Retrieved Resource | Source | Applied To |
|-------------------|--------|-----------|
| Applicable statutes (jurisdiction-specific) | Florida Statutes online / DuckDuckGo / Playwright | Statutory citations, required language, cure periods |
| Procedural rules and filing requirements | County clerk sites, court rules | Lien filing format, recording fees, cover sheet requirements |
| Relevant case law and precedents | Legal databases *(future)* | Document language, argumentation patterns |
| County property appraiser records | Agentic Playwright browser automation | Ownership verification, mailing address confirmation |

**Behavior:**
- Statutory lookups are performed at the locked statute version — the system does not rely on training data alone for current statute text
- Retrieved statute text is compared against the document's language for exact citation accuracy
- If the retrieved statute differs from the version the system was trained on, the AI Concierge flags the discrepancy
- County property appraiser lookups are triggered automatically at intake for ownership verification *(§6.3)*

**Non-negotiable:** The system uses real-time retrieval to verify statutory content at generation time. Training data is used for structure, language, and patterns — not for authoritative statutory text.

---

#### Layer 4 — Validation and Consistency Engine

Before any document is presented to the user, the system performs a full internal validation pass:

| Check | What It Validates |
|-------|-----------------|
| Cross-source fact consistency | Owner name, address, unit number, and amounts are consistent across NOLA, ledger, affidavit, and public record |
| Date and timeline integrity | NOLA date precedes letter dates; waiting periods are satisfied; dates are internally consistent |
| Calculation accuracy | Interest, late fees, and total balance calculated deterministically and verified against the ledger |
| Statutory language completeness | All required disclosures, citations, and cure period language are present for the locked statute |
| Argument-fact alignment | Legal assertions in the document are supported by the extracted facts |

Validation failures produce flags at three severity levels (Minor / Major / Critical) before the document is shown to the user. *(Full specification: §16.6, §18.15)*

---

#### Layer 5 — Feedback-Driven Learning Loop (Firm-Specific Intelligence)

Every user edit, correction, or override is captured and used to continuously improve future outputs:

- **Preferred language and tone** — system learns how this firm phrases demands, warnings, and statutory references
- **Argument structure** — system learns the firm's preferred paragraph order, emphasis, and escalation pattern
- **Formatting conventions** — header style, signature block, date format, spacing
- **Firm-specific strategies** — which language this firm has used successfully in prior matters

This creates a compounding advantage: the system becomes increasingly tailored to the firm's workflow and standards with every approved document. The edit distance — the gap between system output and final approved document — decreases over time until it approaches zero. *(Full specification: §17.11–17.20)*

---

## 2. Architecture Principle: One Matter, Many Surfaces

### 2.1 The Core Idea

Every page in CondoClaw is a **view of a single Matter Object** — not a standalone screen.

The user is not navigating between pages. They are navigating one matter through different lenses: the command center, the document layer, the time engine, the data store, the learning engine. The matter is always the same object. Only the view changes.

This is the architectural north star. Every component, every API endpoint, every UI panel, and every AI decision must be grounded in this principle. If a feature cannot be tied to a Matter Object, it does not belong in the core workflow.

> Clio is case management.
> CondoClaw is a decision + execution system.
> The value is not "generate documents." The value is: **"Tell me if I can act, what to do next, and do it for me."**
> That only works if variables are unified, pages are connected, and the AI sees everything.

### 2.2 The Matter Object

Every matter has exactly one Matter Object. It is the canonical record for the entire lifecycle of a delinquency case. All pages read from it. All systems write to it.

**The Matter Object contains:**

| Layer | Contents |
|-------|----------|
| **Identity** | Matter ID, Association, Unit Owner, Unit Number, Statute Type |
| **Variables** | All Core Matter Variables (owner name, address, amounts, dates — see §6) |
| **Documents** | All uploaded files (NOLA, ledger, affidavit) + all generated outputs, versioned |
| **Validation** | Intake validation results, eligibility decision, conflict list |
| **Workflow State** | Current stage (0–3), stage history, timestamps, next eligible action date |
| **Deadlines** | All statute-driven deadlines and reminders, auto-generated by the timing engine |
| **AI Decisions** | Statute classification, compliance assessments, similarity scores, discrepancy flags |
| **Memory Comparisons** | Prior approved examples referenced, similarity scores, flagged differences |
| **Audit History** | Every variable change, correction, override, user confirmation — timestamped |

### 2.3 How Each Page Connects to the Matter Object

This is the connective tissue that is currently missing. Each page is a window into the same object, not an isolated feature.

---

**Dashboard — Command Center**

*Reads:* Current pipeline stage, validation result, eligibility decision, upcoming deadlines, variable conflicts
*Writes:* Uploaded documents, user confirmations, manual variable corrections

The Dashboard is the brain overview. It shows the AI's current assessment of the matter — can you proceed, what is wrong, what is next — without the user having to ask.

---

**Document Generation — Execution Layer**

*Reads:* Core Matter Variables (owner name, address, amounts, dates), current workflow stage, statute type
*Writes:* Generated documents (versioned) back to the Matter Object

No manual typing. Every field in every generated letter is auto-populated from the validated Matter Object variables. If a variable is not yet validated, the field is flagged — not left blank and not silently wrong.

---

**Documents — Source of Truth**

*Reads:* All documents associated with the matter (uploaded + generated + versioned)
*Writes:* Nothing — read-only view of the matter's document layer

Every document — whether uploaded by the user or generated by the system — is stored in the Matter Object and accessible here. Prior versions are never deleted. Every document is linked to the stage at which it was created or received.

---

**Unit Owners — Structured Data Layer**

*Reads:* Verified owner name, mailing address, property description from the Matter Object
*Writes:* Confirmed/corrected owner data back to Core Matter Variables

This page is not a standalone contacts database. It is the persistent store for owner-level variables that were extracted via NLP and confirmed via public record verification. Once confirmed here, those values flow into every generated document for this owner — present and future matters.

---

**Schedule — Time Engine**

*Reads:* NOLA date, mailing date, cure date, statute type from the Matter Object
*Writes:* Nothing — schedule is fully auto-generated by the timing engine

The Schedule is not a manual calendar. It is statute math. Given the dates and the applicable chapter, the system calculates every deadline automatically:
- When the cure period expires
- When the next stage becomes eligible
- When the lien filing window opens
- When the lien expires if no action is taken

The user opens Schedule to know exactly what to do next and when. The system puts it there automatically.

---

**CondoClaw Memory — Learning Engine**

*Reads:* Current matter's variables and documents (to run similarity comparisons)
*Writes:* Approved documents, corrections, and flagged examples (when user verifies or corrects)

Memory is not a separate page. It is a live connection to the active matter. Every time a document is analyzed, the system checks it against Memory and surfaces: "These are the 5 prior approved NOLAs this matter was compared against. Here is the similarity score. Here is what was flagged." That result flows back into the Matter Object as an AI Decision.

---

**AI Concierge — Intelligence Layer (Runs Across All Pages)**

*Reads:* The entire Matter Object — always
*Writes:* Explanations, recommendations, and triggered actions back to the matter

The AI Concierge is not a chatbot on the side. It is the system's reasoning layer, always reading the full Matter Object and always aware of the current state. It knows the stage, the variables, the conflicts, the deadlines, the statute, and the memory comparisons. It uses all of this to guide the user — proactively, not reactively.

### 2.4 The Global Variable Engine

The variable system is the circulatory system of CondoClaw. Variables are extracted once, validated once, stored once, and reused everywhere. They are never re-parsed from raw documents.

**Canonical variable set (minimum):**

```
owner_name
property_address
mailing_address
unit_number
association_name
statute_type           (718 / 720 / 617)
total_amount_due
assessment_amount
interest_rate
interest_amount
late_fees
nola_date
mailing_date
cure_date
ledger_date_range
legal_description
```

**Variable lifecycle:**

```
Intake (Dashboard)
  → NLP extracts variables from NOLA, ledger, affidavit
  → Variables stored in Matter Object with source + confidence

Validation (Intake Engine)
  → Variables compared across documents
  → Conflicts flagged, eligibility determined

Verification (Public Records Agent)
  → Variables confirmed or overridden using county property appraiser data
  → Source updated to "Public Record — Verified"

Unit Owners Page
  → Final confirmed owner variables stored for reuse across matters

Document Generation
  → Variables auto-fill every field in every generated letter
  → No manual input — zero

Schedule
  → Date variables trigger statutory deadline calculations
  → Deadlines auto-created in Matter Object

CondoClaw Memory
  → Variables compared to prior approved matters
  → Similarity scores and discrepancy flags returned to Matter Object
```

### 2.5 What This Means for Development

**Build CondoClaw as a matter-based system.** Every API endpoint, every database table, every UI component must answer: "which matter does this belong to, and what does it read from or write to that matter?"

**Non-negotiable architectural rules:**
1. Every page that shows data about a matter reads from the Matter Object — not from its own local state
2. Every variable used in a generated document comes from the validated variable store — never from raw document text
3. The Schedule is never manually created — it is always derived from matter dates and statute logic
4. Every document — uploaded or generated — is stored in the Matter Object and versioned
5. The AI Concierge always has access to the full Matter Object — not just the current page's data
6. CondoClaw Memory is always compared against the active matter automatically — it is not an opt-in feature

---

## 3. System Navigation & Module Responsibilities

### 3.1 Governing Principle

CondoClaw is not a collection of independent pages. It is a Matter-driven system where each navigation item represents a **different view or function applied to the same underlying Matter Object and Variable Engine.**

Every module must:
- Pull its data from the Matter Object
- Write its outputs back to the Matter Object
- Reflect real-time Matter state
- Operate with zero duplicate data entry

No module is self-contained. No module stores data that isn't part of the shared Matter architecture. No module requires the user to re-enter information that has already been captured.

### 3.2 Module Map

| Module | Role in the System | Reads From | Writes To |
|--------|-------------------|------------|-----------|
| Dashboard | Command center — Matter status + AI decisions + next actions | Matter state, variable conflicts, deadlines | Stage updates, AI decision logs |
| Document Generation | Execution engine — generates legal documents from variables | Variable Engine, statute type, current stage | Generated documents, versions, timestamps |
| Documents | Source of truth — all uploaded and generated documents | Matter document layer | Document records, version history, approval status |
| Unit Owners | Structured data layer — verified owner and property data | NLP extraction + public record verification | Confirmed variables (override NLP) |
| Schedule | Statutory timeline engine — statute-driven deadlines and reminders | Matter dates, statute type, current stage | Deadline events, compliance status, action triggers |
| CondoClaw Memory | Learning engine — improves accuracy over time via comparisons | Active matter documents + variables | Confidence scores, validation results, correction logs |
| AI Concierge | Persistent intelligence layer — reads all, acts across all | Full Matter Object (all modules) | Explanations, triggered actions, matter updates |
| Associations | Association config — rules, statute preferences (future) | Association registry | Association-level templates and rules |
| Reports | Portfolio analytics — compliance and recovery insights (future) | All matters | Read-only reporting outputs |

### 3.3 Module Specifications

---

#### 3.3.1 Dashboard — Primary Command Center

**Purpose:** Provide a real-time overview of the Matter and surface the system's intelligence for the current stage.

**What it displays:**
- Matter identity (ID, association, owner, unit, statute type)
- Pipeline stage progress (current stage, completed stages, locked stages)
- AI validation result — Pass / Conditional / Blocked — with explanation
- Upcoming statutory deadlines (auto-generated by timing engine)
- Next Best Action — a single, specific, actionable recommendation from the AI Concierge
- Document readiness status (all three source documents: parsed / incomplete / missing)
- Matter Intelligence Panel (§10.14) — statute classification, core variables, conflict list, eligibility status, public record result, next allowed stage

**Reads from Matter:** Stage, validation results, variable conflicts, eligibility decision, deadlines, document status
**Writes to Matter:** Stage updates triggered by user action, AI decision logs, user-confirmed corrections

---

#### 3.3.2 Document Generation — Execution Engine

**Purpose:** Generate statute-compliant legal documents using validated Matter variables, with zero manual data entry.

**What it does:**
- Pulls all variables from the Variable Engine — owner name, address, amounts, dates, statute type
- Generates the correct document for the current workflow stage (First Letter, Second Letter, Claim of Lien)
- Auto-fills every field — no manual typing
- Allows template selection from CondoClaw Memory (prior approved examples for the same association)
- Shows baseline vs. training data comparison (§9) — flags if the generated document deviates from statute
- Surfaces AI Concierge guidance on the current stage before generation

**Reads from Matter:** All Core Matter Variables, statute type, current stage, CondoClaw Memory templates
**Writes to Matter:** Generated documents (versioned), document metadata, generation timestamps

**Non-negotiable:** If a variable is not yet validated, the corresponding field is flagged — not left blank and not silently populated with unvalidated data.

---

#### 3.3.3 Documents — Repository & Source of Truth

**Purpose:** Store every document — uploaded and generated — tied to the Matter, versioned and auditable.

**What it stores:**
- Uploaded source documents: NOLA, Ledger, Mailing Affidavit
- Generated outputs: First Letter, Second Letter, Claim of Lien, Excel ledger
- Document status: Generated / Approved / Archived
- Full version history — prior versions are never deleted
- Stage at which each document was created or received

**Reads from Matter:** All documents linked to the matter
**Writes to Matter:** Document records, version history, approval status, download events

---

#### 3.3.4 Unit Owners — Structured Data Layer

**Purpose:** Store the verified, canonical ownership and mailing data that flows into every generated document.

**What it maintains:**
- Owner name (NLP-extracted, then verified via public records)
- Property address
- Mailing address (must match county record or conflict is flagged)
- Legal description
- Assessment history
- Occupancy status

**Reads from Matter:** NLP-extracted variables, public record verification results
**Writes to Matter:** Confirmed/corrected owner variables — these override NLP extraction and become the authoritative value used in all document generation

**Key behavior:** Once an owner variable is confirmed on the Unit Owners page, it is stored and reused across all future matters for the same owner. It does not need to be re-extracted.

---

#### 3.3.5 Schedule — Statutory Timeline Engine

**Purpose:** Automatically generate and track all statute-driven deadlines. The user should never need to manually create a deadline.

**What it generates:**
- Cure period expiration (NOLA date + statutory window)
- Next stage eligibility date (calculated from prior stage mailing date)
- Lien filing window open/close dates
- Lien expiration alert (if no action taken within statutory limit)

**Reads from Matter:** NOLA date, mailing date, cure date, statute type, current stage
**Writes to Matter:** Deadline events, compliance status flags, action triggers that notify the AI Concierge

**Key behavior:** Schedule entries are never manually created for statute-driven deadlines. They are computed and created automatically when the relevant date variables are confirmed. Manual events (e.g., board meetings, internal reminders) may be added separately.

---

#### 3.3.6 CondoClaw Memory — Learning Engine

**Purpose:** Act as the system's institutional knowledge base — improving accuracy, flagging inconsistencies, and learning from corrections over time.

**What it stores:**
- Approved NOLAs, letters, affidavits, ledger formats
- Rejected and flagged documents (with reason)
- User corrections and verified examples
- FL Statute 718/720 reference text

**What it does with the active matter:**
- Compares current documents against stored approved examples
- Returns similarity scores and specific discrepancy flags
- Surfaces: "This affidavit matches 94.2% of prior approved affidavits — one section differs"
- Feeds confidence scores back into the Matter Object
- Improves over time as users verify and correct documents (human-in-the-loop)

**Reads from Matter:** Current documents and variables (to run comparisons)
**Writes to Matter:** Confidence scores, validation results, correction logs, approved document references

---

#### 3.3.7 AI Concierge — Persistent Intelligence Control Layer

The AI Concierge is not a chat panel. It is the **persistent control layer** of CondoClaw, operating across every module.

**The AI Concierge must:**
- Maintain full awareness of the Matter Object at all times — regardless of which page the user is viewing
- Read every layer of the Matter: variables, documents, validation results, workflow stage, deadlines, memory comparisons
- Initiate actions across modules without requiring the user to navigate — generate a document, schedule a deadline, trigger a validation, update a variable — all from the chat panel
- Surface the Next Best Action proactively — not only when asked
- Guide stage transitions — confirm readiness, explain what is required, warn against premature actions
- Explain the system's reasoning in plain language after every significant decision

> **The AI Concierge must function as a persistent control layer across all modules, capable of reading full Matter state and initiating actions — document generation, validation, scheduling — without requiring navigation between modules.**

**Reads from:** The entire Matter Object — always
**Writes to:** Any layer of the Matter the user authorizes via chat — variables, documents, deadlines, memory corrections

---

#### 3.3.8 Associations — Future Module

**Planned responsibilities:**
- Store association-specific legal templates and governing statute preferences (718 vs. 720)
- Define billing and enforcement rules per association
- Maintain association contact information and board structure
- Feed association-level context into the Variable Engine automatically when a new matter is created for that association

---

#### 3.3.9 Reports — Future Module

**Planned responsibilities:**
- Portfolio-level reporting across all active matters
- Compliance status summaries (matters in each stage, overdue actions)
- Financial recovery tracking (total amount in collections, amounts resolved)
- CondoClaw Memory performance metrics (pass rate trends, correction frequency)

### 3.4 Cross-Module Data Flow

All modules integrate through three shared systems. These are not optional integrations — they are the architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                      MATTER OBJECT                          │
│  Documents · Variables · Stage · Deadlines · AI Decisions   │
│  Memory Results · Audit History · Validation Results        │
└─────────────┬───────────────────────────────────────────────┘
              │  All modules read from and write to this object
              │
┌─────────────▼──────────────────────────────────────────────┐
│                    VARIABLE ENGINE                          │
│  owner_name · mailing_address · total_amount_due           │
│  nola_date · statute_type · cure_date · ...                │
│  Extracted once. Validated once. Reused everywhere.        │
└─────────────┬──────────────────────────────────────────────┘
              │
┌─────────────▼──────────────────────────────────────────────┐
│                    AI CONCIERGE                             │
│  Reads: Full Matter Object                                 │
│  Acts: Across all modules, without navigation              │
│  Guides: Every stage transition and user decision          │
└────────────────────────────────────────────────────────────┘
```

### 3.5 What Breaks Without This Architecture

| Without it | With it |
|------------|---------|
| Dev builds screens | Dev builds architecture |
| Data gets duplicated across pages | Data is extracted once and flows everywhere |
| User re-enters data manually | Zero re-entry — variables auto-populate |
| AI only knows what's on the current page | AI sees the full matter state always |
| Schedule is manually maintained | Schedule is statute math, auto-generated |
| Memory is a separate feature | Memory is a live connection to every active matter |
| Pages feel disconnected | System feels like one intelligent workflow |

---

## 4. Primary Users

- **Property Managers** — managing delinquent unit files across multiple associations
- **HOA/Condo Attorneys** — generating and reviewing statutory notices and lien documents
- **Association Board Members** — monitoring compliance status and deadlines

---

## 5. Core Problems Being Solved

1. The collections workflow under FL Statute 718/720 is procedurally rigid. Missing a step or using the wrong language voids the lien.
2. Ledger reconciliation is manual and error-prone — balances, dates, and unit numbers must match exactly across all documents.
3. Attorneys and managers spend hours drafting notices that follow the same statutory pattern every time.
4. Ownership verification requires manual lookup of public property appraiser sites — slow, error-prone, and skipped under time pressure.
5. There is no institutional memory — prior approved NOLAs, affidavits, and ledgers sit in folders with no way to compare a new document against them.

---

## 6. Core Features

### 6.1 Document Intake (Dashboard-Centered)

The dashboard must allow:
- **Drag-and-drop upload** for:
  - NOLA (PDF)
  - Ledger (Excel or PDF)
  - Mailing Affidavit (PDF)
- **Instant feedback:** file name, upload confirmation, replace/remove option
- **"Run AI Concierge"** activates only when all required files are present
- If a document is scanned, OCR runs automatically

### 6.2 NLP Document Understanding

The AI extracts from each document:

| Document | Extracted Fields |
|----------|-----------------|
| NOLA | Owner name, unit number, association, notice date, assessment amount, due date |
| Ledger | All line items, payment history, running balance, interest/fees, total amount due |
| Mailing Affidavit | Mailing date, certified mail number, recipient name and address, notary details |

After extraction, the AI explains findings in plain language and flags any discrepancies between documents.

### 6.3 Agentic Web Verification (Critical Feature)

This is not a static API lookup — it is agentic browsing.

The system must behave like an AI agent that browses the internet to verify ownership. It must:
- Search public property appraiser sites for the subject property
- Retrieve: owner name, mailing address, legal description, deed info
- Compare public records vs. uploaded documents
- Detect issues such as: wrong owner, outdated address, mismatch with affidavit, ownership transfer after notice date
- Return links and sources alongside findings

**Behavior Example (AI Concierge):**
> "Public records show ownership transferred on Oct 12. The NOLA was mailed to the prior owner. This may invalidate notice."

**Technical Requirements:**
- Live web search via `duckduckgo_search`
- Browser navigation via Playwright (or similar)
- HTML parsing via BeautifulSoup / lxml
- Structured data extraction and source attribution

### 6.4 CondoClaw Memory (Dataset Engine)

Accessible via left sidebar. CondoClaw Memory is the institutional knowledge base of the product.

**What gets stored:**
- Approved NOLAs
- Verified mailing affidavits
- Clean ledger formats
- Generated statutory notices that passed review
- Failed/flagged documents
- Corrected outputs and templates
- FL Statute 718/720 reference text

**What it displays:**
- Pass rate and confidence scores
- Flagged discrepancies
- Document history

**How it works:**
1. When a user verifies a document (clicks VERIFY in AlphaCondor Review), it is embedded and stored
2. When a new document is uploaded, it is compared against the dataset
3. The AI reports the similarity score and flags inconsistencies ("This affidavit closely matches prior approved affidavits — 94.2% similarity")
4. When a user corrects a mistake, the correction is stored and the dataset improves (human-in-the-loop feedback)

### 6.5 AI Concierge (Core System)

The AI Concierge is the most important component of CondoClaw. It is not a chat panel. It is the **persistent intelligence and control layer** of the entire system.

> **The AI Concierge must function as a persistent control layer across all modules, capable of reading full Matter state and initiating actions — document generation, validation, scheduling — without requiring navigation between modules.**

It must:
- Maintain full awareness of the Matter Object at all times, regardless of which page the user is viewing
- Understand the active matter in its entirety: identity, variables, documents, validation results, workflow stage, statutory deadlines, memory comparisons, and audit history
- Explain what the system is doing and why — in plain language, after every significant decision
- Detect issues and suggest corrections proactively — not only when asked
- Initiate actions across any module from the chat panel — generate a document, schedule a deadline, trigger a validation, update a variable — without requiring the user to navigate
- Search the web and return source links
- Reference CondoClaw Memory for similarity comparisons
- Surface the Next Best Action — one specific, actionable recommendation at all times
- Guide every stage transition: confirm readiness, explain requirements, warn against premature actions

**Chat command examples:**

| User says | AI does |
|-----------|---------|
| "Run the analysis" | Triggers document parsing and extraction |
| "Verify ownership" | Launches agentic web search on property appraiser site |
| "Generate the first letter" | Pulls variables, generates Stage 1 document — no navigation required |
| "Search statute 718" | Returns relevant FL 718 sections with links |
| "Compare affidavit to prior ones" | Runs similarity search against CondoClaw Memory |
| "Fix the draft" | Identifies and corrects issues in the generated notice |
| "When can I send the second notice?" | Calculates and states the eligibility date |
| "What is the balance owed by the owner in Unit 402?" | Queries parsed ledger |
| "Does this NOLA meet the 30-day statutory requirement?" | Checks notice date against statutory timeline |
| "Schedule the next step" | Creates deadline event in the Matter — no navigation required |

The AI responds with reasoning, actions, links, and recommendations — and can execute those actions directly from the panel.

### 6.6 Workflow Pipeline (5 Stages, Visible in Real Time)

| Stage | Name | What Happens |
|-------|------|-------------|
| 1 | Review Documents | Upload NOLA, Ledger, Mailing Affidavit. AI parses and extracts all key entities. |
| 2 | Build Ledger | AI aggregates line items, calculates total balance due, flags discrepancies. |
| 3 | Verify Owner | AI browses public property appraiser sites and cross-references owner data. |
| 4 | Draft Document | AI generates the statutory notice using approved templates and verified data. |
| 5 | Ready for Review | Human reviews the draft. Corrections feed back into CondoClaw Memory. |

Each stage updates in real time as the AI progresses.

### 6.7 Document Generation

Outputs:
- **Excel ledger** — formatted, audit-ready
- **Word notice** — statutory notice using approved language and verified owner data

User can: preview, download, revise.

### 6.8 Schedule & Deadlines

The system must show:
- Upcoming statutory deadlines
- Next required actions per matter
- Workflow timing and notice windows

This ensures the user always knows what to do next.

---

## 7. Core Matter Variables

### 7.1 Overview

The system must define and maintain a set of Core Matter Variables that are consistently used across all documents, workflows, and AI outputs. These variables represent the **single source of truth** for each matter. They are extracted from uploaded documents, validated against public records and CondoClaw Memory, and reused in every generated output.

Core Matter Variables ensure that:
- All documents (NOLA, ledger, mailing affidavit, generated letters) remain internally consistent
- Discrepancies are detected early, before a defective notice goes out
- Generated outputs are accurate and standardized
- The AI Concierge can reason about the matter reliably without re-reading raw files

### 7.2 Required Variables

The system must always attempt to extract and validate the following for every matter:

| Variable | Source Documents | Notes |
|----------|-----------------|-------|
| Owner Name | NOLA, Affidavit, Public Records | Must match across all three |
| Property Address | NOLA, Public Records | Unit address, not mailing address |
| Mailing Address | NOLA, Affidavit, Public Records | Where notice was/should be sent |
| Unit Number | NOLA, Ledger | Must be consistent |
| Association Name | NOLA, Ledger | Full legal name |
| Amount Owed | Ledger | Total principal due |
| Interest Rate | Ledger, Governing Docs | Per annum or per diem |
| Late Fees | Ledger | Itemized |
| Notice Date | NOLA | Date of the notice letter |
| Mailing Date | Affidavit | Date sent via certified mail |
| Due Date | NOLA | Deadline for payment/cure |
| Legal Description | Public Records | Parcel/lot description from county |
| Statutory References | NOLA, Generated Notice | FL 718, 720, or 617 as applicable |

### 7.3 Data Flow

Every matter follows this pipeline for Core Matter Variables:

```
Extract → Normalize → Validate → Compare → Store → Reuse
```

1. **Extract** — parse all variables from uploaded NOLA, ledger, and mailing affidavit
2. **Normalize** — convert to consistent formats (dates → MM/DD/YYYY, amounts → dollar-formatted floats, names → title case)
3. **Validate** — check values against public records (county property appraiser) and internal logic (e.g., mailing date must precede due date)
4. **Compare** — cross-reference all sources to detect conflicts
5. **Store** — persist as the canonical dataset for this matter in SQLite
6. **Reuse** — all generated outputs (Excel, Word, future documents) pull from this layer — never from raw files

### 7.4 Validation & Reconciliation

The system continuously compares Core Matter Variables across three sources:

| Source | What It Provides |
|--------|-----------------|
| Uploaded documents | Extracted owner name, address, balances, dates |
| Public records (property appraiser) | Ground-truth owner, mailing address, legal description |
| CondoClaw Memory | Prior approved values for similar matters |

The AI Concierge must flag conflicts such as:
- Owner name in NOLA does not match public records
- Mailing address on affidavit differs from current county record
- Balance on ledger does not reconcile with NOLA amount
- Interest rate inconsistent with prior approved matters of the same association
- Notice date violates statutory timing requirements

### 7.5 AI Concierge Behavior

When variables are extracted or a conflict is detected, the AI Concierge must:
- Summarize what was extracted in plain language
- Clearly identify any inconsistencies and their significance
- Suggest a resolution and ask for confirmation before making changes

**Example:**
> "The owner listed in the NOLA is Robert Hines. Public records for Unit 402 at Pelican Bay Condominium show the current owner is Patricia Hines as of February 3, 2026. The NOLA may have been addressed to the wrong party. Would you like me to update the matter to the verified owner?"

When the user confirms a correction, the system updates the Core Matter Variables and logs the change.

### 7.6 Matter Data Panel (UI)

The dashboard must include a **Matter Data Panel** that displays all Core Matter Variables in a structured view.

**Every variable displayed in the panel must carry full provenance metadata.** This is what makes the system legally defensible — not just that a value is correct, but that the system can prove where it came from, when it was confirmed, and which document version it was frozen into.

**Required provenance fields per variable:**

| Field | Description |
|-------|-------------|
| `value` | The extracted or confirmed value |
| `source_document` | Document it came from (NOLA / Ledger / Affidavit / Public Record / User Entry) |
| `extraction_anchor` | Page number and line or paragraph where the value was found |
| `confidence` | Numeric score (0.0–1.0) with tier label (High / Medium / Low / Unconfident) |
| `last_confirmed_timestamp` | When this value was last verified or confirmed |
| `confirmed_by` | User who confirmed the value, or `SYSTEM` if auto-extracted without override |
| `frozen_in_snapshot` | The Frozen Evidence Snapshot ID (§30) this value is locked into, if any |

**UI display per variable:**
```
Owner Name:  Patricia Hines
  Source:     Public Record (County Property Appraiser)
  Page/Line:  Parcel lookup result, retrieved 2026-04-01
  Confidence: 0.97 [High]
  Confirmed:  2026-04-01 09:14 UTC by jsmith@firm.com
  Frozen in:  Snapshot_NOLI_CC8921_20260401
```

**Status flags:**
- `Verified` — confirmed by user or public record match
- `Conflict` — value differs across two or more sources
- `Pending` — extracted but not yet confirmed
- `Frozen` — locked into an evidence snapshot; cannot be edited without creating a new matter event

The user must be able to:
- Review all extracted values and their full provenance at a glance
- Manually edit any `Pending` or `Conflict` value
- Confirm a correction (which updates the canonical dataset, logs the change, and triggers re-validation)
- Cannot directly edit a `Frozen` value — must create a correction event through the AI Concierge

### 7.7 Role in Document Generation

All generated outputs — Excel ledgers, Word notices, referral packets — must pull variable values **exclusively from the Core Matter Variables layer**, not from raw document text. This is non-negotiable.

This ensures:
- Consistency across all documents in a matter
- No silent errors from re-parsing raw files
- Repeatable, auditable workflows where every field is traceable to a source

---

## 8. Intake Validation & Eligibility Engine

### 8.1 Overview

> **Terminology note:** The eligibility decision produced by this engine is called **Intake Eligibility** — it is a one-time gate run at document intake, before any document is generated. It is distinct from **Stage Eligibility** (§10.7), which is enforced continuously throughout the matter lifecycle as each state-machine transition is attempted.

The system must include an **Intake Validation & Eligibility Engine** that evaluates whether a matter is factually consistent, procedurally valid, and eligible to advance through the pipeline.

This engine goes beyond checking whether documents are present. It actively reads across all three uploaded documents plus public records and determines whether they **agree with each other**. A matter cannot proceed — and documents cannot be generated — unless this engine clears it.

> The system must be able to say: "The documents do not agree — you cannot proceed."

This engine runs automatically after document parsing (Stage 1) and before the baseline ledger or statutory notice is generated. It is the **gating mechanism** for the entire pipeline.

### 8.2 Variables Validated

The engine validates all Core Matter Variables (see §7) across every available source. These fall into four categories:

**Identity & Property**
- Owner Name
- Property Address
- Mailing Address
- Unit Number
- Legal Description
- Association Name

**Financial**
- Total Amount Owed
- Assessment Amount(s)
- Interest Rate and calculated Interest Amount
- Late Fees (itemized)
- Credits and Payments
- All Ledger Line Items
- Running Balance and Final Balance

**Dates & Timing**
- NOLA Date
- Mailing Date (from affidavit)
- Due Date / Cure Date
- Ledger Date Range
- Current Date (system clock — used for statutory timing checks)

**Document Integrity**
- Presence of required sections in the NOLA
- Mailing affidavit completeness (signature, notary, certified mail proof)
- Ledger structure integrity (line items, running totals, column formatting)

### 8.3 Dynamic Variable Discovery (NLP Expansion)

In addition to the predefined variable list, the system must:
- Use NLP to detect additional fields present in the documents but not in the standard variable set
- Evaluate whether those fields are material to the matter
- Incorporate them into validation automatically if relevant

**Example:**
> "An additional fee category ('Special Assessment — Roof Reserve') was detected in the ledger that is not referenced in the NOLA. This may represent an undisclosed charge."

### 8.4 Cross-Document Validation (Critical)

This is the most important function of the engine. The system must explicitly validate consistency across every pair of source documents and against public records.

#### NOLA vs. Ledger

| Check | What Is Validated |
|-------|------------------|
| Amount | Amount demanded in NOLA matches ledger total |
| Fees | Interest and late fees consistent across both |
| Dates | NOLA notice date falls within ledger date range |
| Line items | All charges referenced in NOLA are present in ledger |

**Example conflict:**
> "The NOLA demands $4,500, but the ledger total is $4,120. The $380 discrepancy appears in the late fee line. This inconsistency may invalidate the notice."

#### NOLA vs. Mailing Affidavit

| Check | What Is Validated |
|-------|------------------|
| Recipient | Recipient name on affidavit matches owner name on NOLA |
| Address | Mailing address on affidavit matches NOLA address |
| Timing | Mailing date is on or after NOLA issuance date |
| Delivery | Certified mail number is present and formatted correctly |

**Example conflict:**
> "The mailing affidavit shows the notice was sent to 4201 Palm Ave, but the NOLA lists the address as 4021 Palm Ave. This may indicate a delivery failure."

#### All Documents vs. Public Records

| Check | What Is Validated |
|-------|------------------|
| Ownership | Owner name matches current deed holder in county records |
| Mailing address | Mailing address is current as of county record date |
| Property description | Legal description matches parcel record |
| Transfer date | Ownership has not changed since NOLA was issued |

**Example conflict:**
> "Public records show ownership of Unit 402 transferred to Patricia Hines on February 3, 2026. The NOLA was issued to Robert Hines on January 14, 2026. The notice may have been valid at issuance — proceed with caution."

### 8.5 Validation Categories

The engine runs three classes of checks:

**1. Timing Validation**
- Statutory waiting periods are satisfied
- Cure period is correctly specified
- Mailing date precedes due date by the required statutory window
- Notice is not expired (current date vs. cure date)

**2. Data Consistency Validation**
- Financial amounts reconcile across NOLA, ledger, and affidavit
- Owner identity is consistent across all sources
- Mailing address is consistent and current
- Dates are internally logical (mailing date < due date, NOLA date ≤ mailing date)

**3. Document Integrity Validation**
- NOLA contains all required sections and statutory language
- Mailing affidavit is signed, notarized, and includes certified mail proof
- Ledger is structured with all required columns and a computable running balance

### 8.6 Eligibility Decision

After running all checks, the engine classifies the matter into one of three states:

| Status | Meaning | Pipeline Effect |
|--------|---------|-----------------|
| **Eligible to Proceed** | All checks passed — no conflicts detected | Pipeline advances normally |
| **Conditionally Eligible** | Minor issues detected — not blocking, but flagged | Pipeline advances with AI warning surfaced |
| **Not Eligible to Proceed** | Material conflict or missing data detected | Pipeline **blocked** — document generation disabled |

When a matter is blocked, the system must:
- Surface a clear explanation of the specific conflict
- Identify which document(s) are likely incorrect
- Suggest corrective actions the user can take
- Allow the user to manually override with acknowledgment (logged)

### 8.7 AI Concierge Behavior

The AI Concierge is the voice of the engine. It must:
- Explain which variables conflict and across which documents
- Identify which source is most likely correct (e.g., "public records are typically authoritative for ownership")
- Suggest the corrective action with specificity
- Ask for confirmation before modifying any Core Matter Variable
- Never proceed silently past a material conflict

**Example exchange:**
> "The ledger and NOLA totals do not match. The ledger shows $4,120 but the NOLA demands $4,500. The discrepancy of $380 appears in the late fees row. The ledger is more likely to be the authoritative source. Would you like me to regenerate the notice using the corrected ledger total of $4,120?"

### 8.8 UI Requirements

The dashboard must surface validation results clearly after intake:

- A **Validation Summary card** showing overall eligibility status (Eligible / Conditional / Blocked)
- A **Conflict Detail list** — each conflict shown with:
  - The conflicting variable name
  - The value from Source A vs. Source B
  - Severity (Blocking / Warning / Informational)
  - Suggested resolution
- Conflicting values **highlighted** in the Matter Data Panel (§7.6)
- The primary CTA button ("Run AI Concierge") is **disabled** when status is "Not Eligible to Proceed"
- User can expand any conflict to see AI reasoning and trigger a correction

### 8.9 Position in System Flow

```
Documents Uploaded & Parsed (Stage 1)
            ↓
Intake Validation & Eligibility Engine Runs
            ↓
   ┌─────────────────────────────┐
   │  Eligible to Proceed?       │
   │  ✅ Yes → Pipeline Advances │
   │  ⚠️  Conditional → Advance  │
   │       with Warnings         │
   │  ❌ No → Pipeline Blocked   │
   │       User Must Resolve     │
   └─────────────────────────────┘
            ↓
Baseline Ledger & Statutory Document Engine (§11)
```

---

## 9. Multi-Stage Statutory Workflow Engine

### 9.1 Overview

The system must implement a **Multi-Stage Statutory Workflow Engine** that governs the full lifecycle of a delinquency matter — from initial NOLA intake through Claim of Lien — in accordance with Florida law.

The governing statute is determined automatically at intake. Every stage transition is gated by the engine. No document is generated and no stage is advanced unless the engine confirms it is valid to do so.

> This is a statute-driven workflow, not a template-driven workflow.

### 9.2 Statute Classification (Core Matter Variable)

Upon document intake, the system must classify the matter under its governing statute. This classification is itself a **Core Matter Variable** (Section 5) — it flows into every downstream decision.

**Classification inputs:**
- Language and structure of the NOLA
- Association name and type indicators
- Governing documents (if uploaded)
- Ledger structure and terminology
- CondoClaw Memory patterns from prior matters of the same association

**Output — Statute Type (one of):**

| Classification | Governing Law | Applies To |
|----------------|---------------|------------|
| Chapter 718 | Florida Condominiums Act | Condominium associations |
| Chapter 720 | Homeowners' Associations Act | HOAs |
| Chapter 617 | Florida Not For Profit Corporation Act | Applies in conjunction with 718/720 for corporate governance |

**Example AI Concierge response at intake:**
> "This matter appears to fall under Chapter 718 (Condominium) based on the association name 'Pine Ridge Condominium' and NOLA structure. The Chapter 718 workflow will be applied."

If the system cannot determine the applicable statute with high confidence, it must flag this as a **blocking issue** and ask the user to confirm before proceeding.

### 9.3 Workflow Stages

The system enforces a 4-stage statutory workflow. Each stage must be completed in order. Skipping or reversing stages is not permitted.

| Stage | Name | Description |
|-------|------|-------------|
| 0 | NOLA (Input) | Notice of Late Assessment — the triggering document. Validated at intake. |
| 1 | First Letter — Demand Notice | Statutory demand letter sent to the unit owner. Required before any lien can be recorded. |
| 2 | Second Letter — Intent to Lien | Notice of intent to record a claim of lien. Must be sent after the waiting period following Stage 1. |
| 3 | Claim of Lien | Formal lien recorded against the property. Requires prior stages to have been completed and timing satisfied. |

Future stages (post-MVP): Foreclosure Referral, Satisfaction of Lien, Release.

### 9.4 Per-Stage Requirements

Each stage enforces three categories of rules before generating any document or advancing the pipeline:

#### 9.4.1 Statutory Content Validation
Every generated document must include:
- All required statutory language for that stage under the applicable chapter (718, 720, or 617)
- All required disclosures specific to the stage
- All required structural sections in the correct order
- Correct identification of cure rights, amounts owed, and deadlines

#### 9.4.2 Timing Enforcement
The system must calculate and enforce all statutory timing requirements:
- Waiting periods between stages (e.g., cure period must expire before Stage 2 is eligible)
- Minimum days between mailing and next action
- Statutory deadline windows for each document type
- Notice requirements (e.g., certified mail, first-class mail)

The system **blocks stage advancement** if the timing requirements are not yet satisfied.

**Example:**
> "You are not yet eligible to proceed to Stage 2 (Intent to Lien). The 30-day cure period expires on April 19, 2026. Reminder scheduled."

#### 9.4.3 Variable Consistency
All generated documents must draw from validated Core Matter Variables (§7). Values extracted from raw documents are never used directly in generation — only values that have passed through the Intake Validation & Eligibility Engine (§8).

### 9.5 Timing & Scheduling Engine

The system must automatically compute all statutory deadlines and surface them in the UI and AI Concierge.

**On stage completion, the system must:**
1. Calculate the next eligible action date based on the applicable statute
2. Create a scheduled reminder in the matter's deadline list
3. Update the pipeline tracker and Schedule page
4. Notify the AI Concierge so it can inform the user proactively

**Scheduling outputs per matter:**

| Event | Calculated From | Output |
|-------|----------------|--------|
| Cure period expiration | NOLA date + statutory window | Blocks Stage 1 until date passes |
| Stage 2 eligibility | Stage 1 mailing date + waiting period | Unlocks Stage 2, reminder created |
| Lien filing window | Stage 2 mailing date + statutory window | Unlocks Stage 3, reminder created |
| Lien expiration | Recording date + statutory limit | Alert created if no action |

**Example AI Concierge message (proactive):**
> "The cure period for matter #CC-8921 expires tomorrow, April 19. You will be eligible to send the Intent to Lien notice on April 20. Would you like me to prepare that document now?"

### 9.6 Client File & Matter Structure

Each matter must have a structured client file that persists all activity in a consistent hierarchy:

```
Association
  └── Unit Owner
        └── Matter (Case ID)
              ├── Uploaded Documents (NOLA, Ledger, Affidavit)
              ├── Generated Outputs (versioned)
              ├── Core Matter Variables (validated)
              ├── Validation Results (per-stage)
              ├── Deadlines & Scheduled Actions
              └── Audit History (stage transitions, corrections, overrides)
```

**Behavior requirements:**
- Every uploaded file is stored in the matter and linked to the stage at which it was received
- Every generated document is versioned (v1, v2...) — prior versions are never deleted
- Every stage transition is recorded with timestamp, user, and validation result
- Every manual correction or override is logged with the user's confirmation

### 9.7 AI Concierge Role in Workflow

The AI Concierge is the user's guide through every stage transition. It must:
- Confirm which statute governs the matter and why
- Explain the current stage and what is required to complete it
- Explain the timing requirements and when the next stage becomes eligible
- Warn against premature actions (e.g., if the user tries to generate a lien before the cure period expires)
- Proactively notify the user when a deadline is approaching or a stage becomes eligible
- Guide document generation at each stage using the correct statutory template

**Example exchange at Stage 1:**
> "This matter falls under Chapter 718. You are currently at Stage 1: First Letter (Demand Notice). I've generated a compliant demand letter using the validated matter data. Once you confirm and mail this notice, the 30-day cure period begins. I'll schedule a reminder for the cure period expiration."

**Example exchange at Stage 2 attempt (too early):**
> "The cure period for this matter does not expire until April 19. Generating the Intent to Lien notice before that date would not be in substantial compliance with Chapter 718. Would you like me to schedule this for April 20?"

### 9.8 Compliance Enforcement

The engine enforces **substantial compliance** as a legal standard at every stage, not just at document generation.

If a stage or document does not meet the standard, the system must:
- Block progression — the next stage cannot be triggered
- Surface a clear explanation of the specific compliance issue
- Suggest the corrective action
- Allow a user override **only with explicit acknowledgment** (logged to audit history)

The AI Concierge must never silently allow a non-compliant action to proceed.

### 9.9 UI Requirements

The dashboard must expose the workflow engine's state at all times:

**Statute Indicator (top of active matter header):**
- "Chapter 718 Matter" or "Chapter 720 Matter" badge, always visible

**Workflow Timeline (pipeline tracker, enhanced):**

```
NOLA (Input)  →  First Letter  →  Second Letter  →  Claim of Lien
     ✅              ✅               ⏳ (Apr 20)          🔒
```

Each stage node shows:
- Status: Completed / Active / Waiting (with date) / Locked
- Timing countdown: "Eligible in 12 days"
- Next required action label

**Schedule Panel (enhanced):**
- Deadline list driven by the timing engine, not manual entries
- Each item linked to its matter and stage
- Priority auto-assigned based on statutory urgency

**Matter File Access:**
- User can open any matter and view all documents, generated outputs, stage history, and deadlines in one place

### 9.10 Integration Points

This engine connects to every other system component:

| System | Integration |
|--------|------------|
| Core Matter Variables (§7) | Statute type is a variable; all stage docs use validated variables |
| Intake Validation & Eligibility Engine (§8) | Validation results gate Stage 0 → Stage 1 transition |
| Baseline Ledger & Statutory Document Engine (§11) | Baseline generates the document for the current stage |
| CondoClaw Memory (§18) | Prior approved stage documents used for comparison |
| Schedule Page (§25) | Deadlines and reminders are engine-generated, not manual |
| AI Concierge (§3) | Real-time guidance through every stage transition |

### 9.11 Design for Scale

The MVP covers Stages 0–3 (NOLA through Claim of Lien). The system must be architected to add future stages without redesign:
- Foreclosure Referral (Stage 4)
- Satisfaction of Lien (Stage 5)
- Lien Release / Payoff Letter (Stage 6)

Each future stage is a configuration of the same engine — statute, timing rules, required content, document template — not a new system.

---

## 10. Association Classification & Statutory Rule Engine

### 10.1 Purpose

Before any workflow step can begin, CondoClaw must determine:
1. **What type of association** this is — HOA or Condominium
2. **Which Florida statute governs** this matter — Chapter 720 (HOA) or Chapter 718 (Condominium)

This is not optional metadata. The statute classification is the single most important decision the system makes per matter. It determines the legal pathway, notice requirements, waiting periods, document language, fee structures, and every compliance check the system enforces.

**Core Principle:** The system does not just generate documents — it determines the correct legal pathway first, then generates documents that comply with it.

---

### 10.2 Association Type — Required Classification

Every association must be classified into exactly one type:

| Type | Governing Statute | Meaning |
|------|------------------|---------|
| `CONDOMINIUM` | Chapter 718, Florida Statutes | A condominium association where unit owners own individual units and share common elements |
| `HOA` | Chapter 720, Florida Statutes | A homeowners association governing a planned community with individually-owned lots |
| `NOT_FOR_PROFIT` | Chapter 617, Florida Statutes | A not-for-profit corporation (may also intersect with 718 or 720) |
| `UNKNOWN` | None — blocked | Classification could not be determined; workflow blocked until resolved |

The `UNKNOWN` state must hard-block matter progression. No documents can be generated until the association type is confirmed.

---

### 10.3 AI Classification Logic

The system must determine association type automatically at intake using the following signal hierarchy:

**Signal 1 — Declaration Language (Highest Priority)**

| Language Found | Classification |
|---------------|---------------|
| "Declaration of Condominium" / "condominium association" | `CONDOMINIUM` |
| "Declaration of Covenants, Conditions and Restrictions" / "homeowners association" | `HOA` |
| "Articles of Incorporation" / "not-for-profit corporation" | `NOT_FOR_PROFIT` |

**Signal 2 — SunBiz Entity Type**

| Entity Type from SunBiz | Classification |
|------------------------|---------------|
| "Condominium Association" | `CONDOMINIUM` |
| "Homeowners Association" | `HOA` |
| "Non-Profit Corporation" | `NOT_FOR_PROFIT` |

**Signal 3 — Document Patterns**

- Presence of Chapter 718-specific clauses (right of first refusal, unit boundary descriptions) → `CONDOMINIUM`
- Presence of Chapter 720-specific clauses (lot covenant, community development district language) → `HOA`

**Confidence Layer Applied:**

| Confidence | System Behavior |
|-----------|----------------|
| High (0.90+) | Auto-classify · Display classification badge · Log decision |
| Medium (0.70–0.89) | Suggest classification · Require user confirmation before locking |
| Low (<0.70) | Show possible classifications · Require user selection · Block progression until confirmed |
| Conflicting signals | Flag conflict + require user decision (see §10.5 edge cases) |

---

### 10.4 Statutory Rule Engine

Once the association type is confirmed, the Statutory Rule Engine locks the matter to the correct legal framework.

**Chapter 718 — Condominium (applied when `CONDOMINIUM`)**

| Rule | Requirement |
|------|------------|
| Pre-lien notice | Notice of Intent to Record Claim of Lien required |
| Minimum notice period | 30 days from mailing |
| Interest | Per declaration, or statutory default |
| Late fees | Per declaration only |
| Mailing requirements | First-class mail to unit address + last known mailing address |
| Required disclosures | Specific statutory disclosure language per §718.116 |
| Claim of Lien timing | After notice period expires with no cure |

**Chapter 720 — HOA (applied when `HOA`)**

| Rule | Requirement |
|------|------------|
| Pre-lien notice | Notice of Intent to Lien required |
| Minimum notice period | 45 days from mailing (§720.3085) |
| Interest | Per declaration, or 18% per annum statutory default |
| Late fees | Capped at greater of $25 or 5% of delinquent installment per §720.3085 |
| Mailing requirements | First-class mail + certified mail to last known mailing address |
| Required disclosures | Statutory language per §720.3085(2)(b) |
| Claim of Lien timing | After 45-day notice period with no cure |

**Chapter 617 — Not-for-Profit (applied when `NOT_FOR_PROFIT`)**

- Governs corporate governance and operation; may intersect with 718 or 720
- System must determine whether 617-only or 617 + 718/720 applies based on Declaration language
- AI Concierge prompts for confirmation when 617 is detected without a clear 718/720 signal

---

### 10.5 System Behavior — Statute Lock

Once the association type is confirmed and a statute is locked to a matter:

1. **The workflow engine loads the correct rule set** — timing, required steps, document templates, compliance checks
2. **Document generation is constrained** — only statute-appropriate templates are available
3. **Validation checks reference the correct statute** — wrong statutory citations are flagged
4. **The statute type appears as a locked badge** on every matter view — it cannot be changed without an explicit override and audit log entry
5. **Changing the statute type after documents have been generated** triggers a hard warning: "Documents have already been generated under [Chapter X]. Changing the statute type will invalidate those documents. Are you sure?"

---

### 10.6 Edge Cases — Classification Conflicts

| Edge Case | System Behavior |
|-----------|----------------|
| Declaration says "Condominium" but SunBiz says HOA entity type | Flag conflict · Show both signals with source · Require user to select and confirm · Log decision |
| No declaration uploaded at intake | Classify as `UNKNOWN` · Block progression · AI Concierge prompts: "Upload Declaration to determine statute type before proceeding" |
| Declaration found but no clear HOA or Condo language | Low confidence classification · AI Concierge surfaces best guess + asks for confirmation |
| User manually overrides a High Confidence auto-classification | Require explicit acknowledgment + reason · Log override with user + timestamp |
| Matter was processed under wrong statute (discovered later) | System surfaces conflict · Documents generated under prior statute are flagged as potentially invalid · User must confirm corrective action |

---

### 10.7 Expanded Matter State Machine

> **Terminology note:** Transitions in this state machine enforce **Stage Eligibility** — continuous, time-sensitive gates that control whether a matter may advance from one legal phase to the next. Stage Eligibility is distinct from **Intake Eligibility** (§8), which is a one-time document consistency check at intake. Both must pass independently; passing one does not satisfy the other.

The state machine from §16.3 is upgraded here to its full 5-phase form, reflecting the legal lifecycle of a collections matter.

**Phase 1 — Pre-Legal**

| State | Meaning |
|-------|---------|
| `DRAFT` | Matter created; no documents uploaded yet |
| `LEDGER_UPLOADED` | Ledger received; extraction running |
| `ASSOCIATION_CLASSIFIED` | Association type confirmed (HOA / Condo) |
| `STATUTE_DETERMINED` | Statute locked to matter (718 / 720 / 617); workflow engine loaded |

**Phase 2 — NOLI (Notice of Intent)**

| State | Meaning |
|-------|---------|
| `NOLI_READY` | All required variables validated; matter eligible to generate NOLI |
| `NOLI_GENERATED` | NOLI draft created; awaiting user approval |
| `NOLI_SENT` | NOLI approved and sent; statutory waiting period begins |
| `NOLI_EXPIRED` | Waiting period elapsed with no cure; matter eligible to proceed to enforcement |

**Phase 3 — Post-NOLI Enforcement (Letter Sequence)**

| State | Meaning |
|-------|---------|
| `LETTER_1_READY` | Eligible to generate First Demand Letter |
| `LETTER_1_SENT` | First Letter sent; timing tracked |
| `LETTER_2_READY` | Eligible to generate Second (Final) Demand Letter |
| `LETTER_2_SENT` | Second Letter sent; lien window open |

**Phase 4 — Lien**

| State | Meaning |
|-------|---------|
| `LIEN_READY` | All required steps completed; eligible to generate Claim of Lien |
| `LIEN_REVIEW` | Claim of Lien generated; under attorney review |
| `LIEN_FILED` | Claim of Lien recorded; lien is active |

**Phase 5 — Litigation (Future-Ready)**

| State | Meaning |
|-------|---------|
| `COMPLAINT_READY` | Matter escalated; eligible for complaint filing *(future)* |
| `FILED` | Legal action filed *(future)* |
| `CLOSED` | Matter resolved — paid, settled, or otherwise concluded |
| `ON_HOLD` | Matter paused by user |

**State Machine Rules:**
- States advance only forward — no backward movement except via explicit admin override
- Timing enforcement: no state advances before the statutory waiting period has elapsed
- Step enforcement: no step can be skipped (cannot go from `NOLI_SENT` to `LIEN_READY` without the letter sequence)
- Every state transition is logged in the audit trail with timestamp, user, and triggering action

---

### 10.8 Dynamic Workflow — Statute-Specific Sequences

The workflow engine generates the correct step sequence based on the locked statute.

**Chapter 720 — HOA Workflow:**

```
1. Ledger Uploaded → Core Variables Extracted
2. Association Classified → HOA → Chapter 720 locked
3. NOLI Generated (§720.3085 language)
4. NOLI Sent → 45-day waiting period begins
5. Day 45+ → Letter 1 (First Demand)
6. Letter 2 (Final Demand + Pre-lien warning)
7. Claim of Lien (after all steps satisfied)
```

**Chapter 718 — Condominium Workflow:**

```
1. Ledger Uploaded → Core Variables Extracted
2. Association Classified → Condominium → Chapter 718 locked
3. NOLI Generated (§718.116 language + required disclosures)
4. NOLI Sent → 30-day waiting period begins
5. Day 30+ → Claim of Lien eligible (letters configurable)
```

The system enforces the correct sequence and prevents any step from being generated, sent, or marked complete out of order.

---

### 10.9 Document Generation — Statute-Aware Templates

Each generated document must use the statute-appropriate template. Templates are not interchangeable between 718 and 720.

| Document | Chapter 718 Template | Chapter 720 Template |
|----------|---------------------|---------------------|
| NOLI | §718.116 language + 30-day cure | §720.3085(2)(b) language + 45-day cure |
| First Letter | Demand + 718 statutory cite | Demand + 720 statutory cite |
| Second Letter | Final demand + pre-lien warning | Final demand + pre-lien warning |
| Claim of Lien | Condominium lien form | HOA lien form |

Each generated document includes:
- AI-generated content built from Core Matter Variables
- Source-backed data (every value traced to its origin document)
- Confidence score for the matter at time of generation
- Statute compliance validation result (compliant / flagged / blocked)

---

### 10.10 Compliance Certification

At the Claim of Lien stage, the system must produce a **Compliance Certification** — a structured summary attached to the lien file.

The certification confirms:
- Association type and governing statute
- All required steps completed (NOLI sent, waiting period elapsed, letters sent)
- All statutory timing requirements satisfied
- Financial amounts validated (ledger + declaration + calculation sheet)
- Document content compliance check result

**AI Concierge message at lien stage:**
> "All required steps have been completed for this matter. The Claim of Lien complies with Chapter [718/720] requirements based on available data. A compliance summary has been added to the matter file. Would you like to review it before filing?"

This compliance certification becomes litigation-grade evidence if the lien is later challenged.

---

### 10.11 AI Concierge Behavior — Classification & Statute Engine

**On association type auto-classification (High Confidence):**
> "I've classified [Association Name] as a Condominium Association governed by Chapter 718. This is based on the Declaration language on page 1. The Chapter 718 workflow is now active for this matter."

**On classification requiring confirmation (Medium Confidence):**
> "Based on the Declaration, this appears to be a Homeowners Association (Chapter 720) — but I'm not fully certain. Please confirm the association type before I lock the workflow."

**On conflicting classification signals:**
> "I found conflicting indicators: the Declaration uses 'condominium' language, but the SunBiz registration shows a Homeowners Association entity type. Please review and select the correct classification. The workflow cannot begin until this is resolved."

**On wrong statute applied (detected during document review):**
> "This NOLI references Chapter 720, but the association is classified as a Condominium (Chapter 718). The statutory language and timing requirements are different. I recommend regenerating the NOLI under the correct statute."

**On timing enforcement:**
> "The statutory 45-day waiting period for this HOA matter expires on [date]. You are not eligible to generate the Claim of Lien until that date. I'll remind you when the window opens."

---

## 11. Baseline Ledger & Statutory Document Engine

### 11.1 Overview

The system must be capable of generating a baseline-compliant ledger and statutory document set **independently** — before relying on any user-provided training data from CondoClaw Memory.

This ensures CondoClaw operates from a statute-grounded foundation, not from potentially flawed historical examples. Training data is used to refine style and pattern. **It does not define correctness. The statute does.**

> The system must not assume training data is correct.
> The system must first establish what is correct based on statute and logic.

### 11.2 Baseline Ledger Generation

The system must construct an internal ledger model from raw inputs even if no prior sample is provided or the uploaded ledger is incomplete or inconsistent.

The baseline ledger must include:
- Principal assessments
- Interest calculations (per annum or per diem, as specified)
- Late fees (itemized)
- Credits and payments
- Running balance
- Total amount due
- All relevant dates

All calculations must be:
- **Deterministic** — code-based, not AI-generated guesses
- **Traceable** — every line item has a source
- **Reproducible** — same inputs always produce the same output

The system generates an Excel ledger from this model. That output is the authoritative ledger for the matter.

### 11.3 Baseline Statutory Document Generation

The system must generate a statutory notice or letter using:
- Core Matter Variables (Section 5)
- The calculated baseline ledger
- Statutory requirements for the applicable chapter (718, 720, or 617)

The generated document must:
- Follow the required section structure
- Include all required disclosures and statutory language
- Comply with timing rules (e.g., 30-day cure period under Ch. 718)
- Be independently valid before any comparison to training data

### 11.4 Statutory Compliance Requirement — Substantial Compliance

The system must enforce **substantial compliance** with Florida Chapters 718 and 720. This is a legal standard, not a style preference.

The AI Concierge must:
- Reference the specific statutory requirement being checked
- Verify that required elements are present in the generated document
- Flag missing or incorrect sections before the document is presented to the user

**Example:**
> "The notice may not substantially comply with Chapter 718 due to missing statutory language regarding the cure period. The required language has been added to the baseline version."

### 11.5 Relationship to CondoClaw Memory

After generating the statute-compliant baseline, the system compares it against CondoClaw Memory (training data). This comparison evaluates differences in:
- Document structure
- Statutory language and phrasing
- Ledger calculations and line item formatting

The baseline is the standard. CondoClaw Memory is the reference.

**If training data conflicts with the statutory baseline:**

| Conflict Type | System Behavior |
|---------------|----------------|
| Training data omits a required statutory clause | Flag + explain + offer corrected version |
| Training data uses different (but compliant) language | Note the difference, no flag required |
| Training data shows a different calculation method | Flag + explain the discrepancy |
| Training data matches baseline | Confirm alignment, no action needed |

**Example AI response:**
> "The sample letter in CondoClaw Memory omits a required statutory clause under Chapter 720. This may not comply with the statute. Would you like to proceed with the baseline-compliant version, or review the difference?"

### 11.6 AI Concierge Behavior

The AI Concierge must:
- Explain how the baseline was generated and which statute sections it satisfies
- Identify where training data differs from the baseline and why it matters
- Recommend corrections when training data falls short of statutory requirements
- Allow the user to accept the baseline, accept the training data version, or manually adjust

This creates an explicit dialogue about correctness — the user is never silently given a document that may not comply.

### 11.7 System Flow

```
Statute + Logic
      ↓
Baseline Ledger + Baseline Document Generated
      ↓
Compare Against CondoClaw Memory
      ↓
Detect Differences (Structure / Language / Calculations)
      ↓
Explain via AI Concierge
      ↓
User Confirms, Adjusts, or Overrides
      ↓
Final Document Saved to Matter
```

### 11.8 UI Requirements

Each generated document must display a clear status indicator:

| Status | Meaning |
|--------|---------|
| **Baseline Generated (Statute-Compliant)** | Built from statute and logic, no training data conflict |
| **Aligned with Training Data** | Baseline matches CondoClaw Memory — high confidence |
| **Flagged for Review** | Conflict detected between baseline and training data |

Differences between baseline and training data must be surfaced in the AI Concierge panel. A side-by-side comparison view is a planned future feature.

---

## 12. Client File, Matter File & Baseline Excel Ledger

### 12.1 Purpose

When a new matter is created from an uploaded NOLA, ledger, and mailing affidavit, CondoClaw must automatically create and maintain a structured file for that matter.

The client is the condominium or HOA association. Each unit owner belongs to that association. Each delinquency matter lives inside the association and owner structure, with all uploaded documents, generated documents, ledgers, and workflow history attached to it.

---

### 12.2 Client / Matter File Hierarchy

The system must automatically create and maintain the following hierarchy at matter creation:

```
Association (Client)
  └── Unit Owner
        └── Matter
              ├── Source Documents
              │     ├── Original NOLA
              │     ├── Original Ledger
              │     └── Mailing Affidavit
              ├── Generated Documents
              │     ├── First Letter
              │     ├── Second Letter
              │     ├── Claim of Lien
              │     └── Future Documents
              ├── Ledger Files
              │     ├── Baseline Excel Ledger
              │     ├── Updated Excel Ledger Versions
              │     └── Audit Ledger
              ├── Validation Results
              ├── Schedule / Deadlines
              └── Matter History
```

**Key Principle:** Every stage-specific document must have a corresponding ledger state. The First Letter uses one ledger snapshot, the Second Letter uses an updated snapshot, and the Claim of Lien uses another. The ledger is not static — it changes as assessments accrue, late fees are added, interest grows, and payments or credits are posted.

The system must treat the ledger as a **versioned financial record**, not a one-time upload.

---

### 12.3 Baseline Excel Ledger Requirement

Before learning from any customer-provided samples, CondoClaw must generate its own baseline Excel ledger.

This baseline ledger must:
- Recapture the substance of the original association ledger
- Normalize it into a consistent, structured Excel format
- Preserve all important financial line items
- Support statutory document generation at every stage
- Allow the user to review, download, and compare versions

The baseline ledger becomes the system's internal working ledger. The uploaded association ledger is the source input. Customer samples may later refine formatting and preferences — they do not replace the system's core ledger logic.

---

### 12.4 Baseline Excel Ledger Design

The workbook is organized into five sheets, each serving a distinct function.

---

#### Sheet 1 — Summary

**Purpose:** High-level matter financial snapshot.

| Field | Description |
|-------|-------------|
| Association Name | The condominium or HOA association |
| Unit Owner Name | Full legal name from Core Matter Variables |
| Unit Number | As recorded on the NOLA |
| Property Address | Physical unit address |
| Mailing Address | Verified mailing address (from affidavit or public record) |
| Matter ID | CondoClaw-assigned unique identifier |
| Statute Type | Chapter 718 / Chapter 720 / Chapter 617 |
| Ledger Through Date | The date through which charges are calculated |
| Total Principal Due | Sum of all assessment charges |
| Total Interest Due | Calculated statutory interest |
| Total Late Fees | Sum of all late fee charges |
| Total Credits / Payments | Sum of all credits and payments posted |
| **Total Balance Due** | **Net balance = Principal + Interest + Late Fees − Credits** |

This sheet is the top-level financial snapshot used to populate generated documents.

---

#### Sheet 2 — Transaction Ledger

**Purpose:** Detailed line-item ledger — the closest recapture of the original association ledger.

| Column | Description |
|--------|-------------|
| Posting Date | Date the charge or payment was applied (MM/DD/YYYY) |
| Description | Human-readable line item description |
| Charge Type | Assessment / Special Assessment / Late Fee / Interest / Attorney Fee / Cost / Payment / Credit Adjustment |
| Reference Period | The billing period the charge applies to (e.g., Q1 2025) |
| Debit | Charge amount (positive number) |
| Credit | Payment or credit amount (positive number) |
| Running Balance | Cumulative running total after this line |
| Source | Uploaded Ledger / CondoClaw Calculated / User Override |
| Notes | Validation notes, flags, or override reason |

This sheet must remain editable by the user. Every user-applied change triggers a new ledger version.

---

#### Sheet 3 — Calculation

**Purpose:** Shows how CondoClaw calculated all statutory amounts. Required for auditability.

Sections include:
- Principal subtotal
- Interest rate applied (per statute or governing documents)
- Interest calculation method (simple / compound / per diem)
- Interest start date and end date
- Late fee logic and basis (flat fee vs. percentage)
- Attorney fee logic (actual vs. statutory cap)
- Cost logic
- Adjustments excluded from the notice
- Final amount used in the current stage document

This sheet is read-only to the user but must be clearly legible. It is the paper trail that supports statutory compliance.

---

#### Sheet 4 — Document Snapshot

**Purpose:** Records which ledger values were used for each generated document.

| Column | Description |
|--------|-------------|
| Document Type | First Letter / Second Letter / Claim of Lien / etc. |
| Version | v1 / v2 / v3 |
| Date Generated | MM/DD/YYYY |
| Principal Used | $ amount used in document |
| Interest Used | $ amount used in document |
| Late Fees Used | $ amount used in document |
| Total Used | Net total used in document |
| Notes / Validation Comments | Any flags, conflicts, or overrides at time of generation |

**Example rows:**
```
First Letter  · v1 · 04/01/2026 · Principal $3,600.00 · Interest $180.00 · Late Fees $340.00 · Total $4,120.00
Second Letter · v2 · 05/15/2026 · Principal $3,600.00 · Interest $228.73 · Late Fees $660.00 · Total $4,488.73
```

This sheet enables the user to trace which ledger version supported which document at what date.

---

#### Sheet 5 — Audit / Reconciliation

**Purpose:** Tracks differences between the original uploaded ledger, the CondoClaw normalized ledger, corrected values, and final document values. This sheet makes the ledger defensible.

| Column | Description |
|--------|-------------|
| Field | Variable name or line item |
| Original Value | Value as extracted from the uploaded association ledger |
| Normalized Value | Value after CondoClaw normalization |
| Corrected Value | Value after user override (if any) |
| Difference | Delta between Original and Final |
| Reason for Change | Auto-description or user-entered explanation |
| Confirmed By | User identity (from session) |
| Timestamp | Date and time of change |

---

### 12.5 Ledger Versioning Rules

> **Live state vs. versioned snapshot — canonical distinction:**
> The ledger exists in two forms simultaneously. The **live ledger state** is the current, continuously updated financial record — it reflects today's balance, including daily interest accrual, recurring assessments, and any new payments or corrections. The **versioned ledger snapshot** is an immutable file created at specific trigger points. The live state has no file. The snapshot is a file. These are not the same thing. Document generation always uses the most recent approved snapshot, never the raw live state.

The system must create a new versioned ledger snapshot whenever:
- A matter advances to a new statutory stage
- A payment or credit is posted
- A correction or user override is applied
- A new document is generated using updated financial data

**Version label convention:**
```
Ledger_v1_Intake
Ledger_v2_First_Letter
Ledger_v3_Second_Letter
Ledger_v4_Claim_of_Lien
```

Prior versions must never be overwritten. Every version is immutable once created. The user must always be able to retrieve and compare any prior version.

---

### 12.6 Document Generation Dependency

Every generated document must pull its financial values from the current approved ledger version — never directly from the raw uploaded ledger.

| Document | Source Ledger Version |
|----------|-----------------------|
| First Letter | Approved First Letter ledger version |
| Second Letter | Approved Second Letter ledger version |
| Claim of Lien | Approved Claim of Lien ledger version |

This rule ensures the ledger and the document are always consistent. If the ledger has not yet been approved for the current stage, document generation must be blocked until it is.

---

### 12.7 Excel Visual Formatting Specification

The baseline Excel ledger is a legal and financial document. Its formatting must be clean, professional, and print-ready. The following standards apply to all CondoClaw-generated workbooks.

---

#### Workbook-Level Standards

| Property | Standard |
|----------|----------|
| File naming | `CondoClaw_Ledger_{MatterID}_{VersionLabel}_{YYYYMMDD}.xlsx` |
| Sheet tab colors | Summary = Green · Transaction = Blue · Calculation = Purple · Document Snapshot = Orange · Audit = Red |
| Default zoom | 100% |
| Default font | Calibri 10pt (body) / Calibri 12pt (headers) |

---

#### Header Block (Rows 1–5, All Sheets)

Every sheet must begin with a consistent header block:

| Row | Content |
|-----|---------|
| Row 1 | **CondoClaw** — `[Association Name]` — Matter ID: `[Matter ID]` |
| Row 2 | Unit Owner: `[Owner Name]` — Unit: `[Unit Number]` — `[Property Address]` |
| Row 3 | Statute: `[Chapter 718 / 720 / 617]` — Generated: `[MM/DD/YYYY HH:MM]` — Version: `[v1 / v2 / etc.]` |
| Row 4 | Sheet: `[Sheet Name]` — Ledger Through: `[Through Date]` |
| Row 5 | *(blank separator row)* |

Header block cells are merged across columns, background filled in dark navy (`#1E3A5F`), white bold text, 12pt.

---

#### Color Rules

| Element | Background | Text | Style |
|---------|-----------|------|-------|
| Header block (rows 1–4) | `#1E3A5F` (dark navy) | White | Bold, 12pt |
| Column header row | `#2E6DA4` (medium blue) | White | Bold, 10pt, centered |
| Section header rows | `#D6E4F7` (light blue) | `#1E3A5F` | Bold, 10pt |
| Subtotal rows | `#EBF3FB` (very light blue) | Black | Bold |
| **Total row** | `#F5A623` (gold/amber) | White | **Bold, 11pt** |
| Credit / Payment rows | `#E8F5E9` (light green) | `#2E7D32` (dark green) | Normal |
| Negative values (any sheet) | *(no fill)* | `#C62828` (red) | Normal |
| Flagged / conflicted rows | `#FFF8E1` (pale yellow) | `#E65100` (orange) | Italic |
| User-corrected rows | `#F3E5F5` (pale purple) | `#6A1B9A` (purple) | Normal |
| Alternating data rows | `#FFFFFF` / `#F5F5F5` | Black | Normal |

---

#### Column Width Standards (Transaction Ledger Sheet)

| Column | Content | Width |
|--------|---------|-------|
| A | Posting Date | 14 |
| B | Description | 40 |
| C | Charge Type | 20 |
| D | Reference Period | 18 |
| E | Debit | 14 |
| F | Credit | 14 |
| G | Running Balance | 16 |
| H | Source | 18 |
| I | Notes | 35 |

---

#### Frozen Panes

| Sheet | Freeze |
|-------|--------|
| All sheets | Freeze rows 1–5 (header block) and column A |
| Transaction Ledger | Also freeze the column header row (row 6) — user can scroll right and down freely |

---

#### Auto-Filter

Auto-filter must be applied to:
- Transaction Ledger Sheet — column header row (row 6)
- Audit / Reconciliation Sheet — column header row

---

#### Number Formatting

| Value Type | Format |
|------------|--------|
| Currency | `$#,##0.00` |
| Negative currency | `($#,##0.00)` in red |
| Dates | `MM/DD/YYYY` |
| Percentages | `0.00%` |
| Running balance at zero | Display as `$0.00`, not blank |

---

#### Print Settings

| Property | Summary Sheet | Transaction Ledger | Other Sheets |
|----------|--------------|-------------------|--------------|
| Orientation | Portrait | Landscape | Portrait |
| Margins | 0.5" all sides | 0.5" all sides | 0.5" all sides |
| Scaling | Fit to 1 page wide | Fit to 1 page wide | Fit to 1 page wide |
| Page header | Matter ID + Sheet Name (center) | Matter ID + Sheet Name (center) | Matter ID + Sheet Name (center) |
| Page footer | "Generated by CondoClaw · Confidential" (left) · Page N of M (right) | Same | Same |
| Repeat rows at top | Rows 1–6 on every page | Rows 1–6 on every page | Rows 1–5 on every page |
| Gridlines | Print on | Print on | Print on |

---

#### Summary Sheet Totals Block

The Summary Sheet must end with a clearly formatted totals section:

```
─────────────────────────────────────────────────────
  Total Principal Due            $  X,XXX.XX
  Total Interest Due             $    XXX.XX
  Total Late Fees                $    XXX.XX
  Total Credits / Payments      ($    XXX.XX)
─────────────────────────────────────────────────────
  TOTAL BALANCE DUE              $  X,XXX.XX   ← Gold row, Bold 12pt
─────────────────────────────────────────────────────
```

---

### 12.8 UI / Product Behavior

The system must allow the user to:
- Preview the current Excel ledger inline (read-only preview panel in the UI)
- Download the current ledger as `.xlsx`
- View a list of all prior ledger versions with labels and dates
- Compare two ledger versions side by side (diff view — future feature)
- See which ledger version was used for each generated document
- Approve a ledger version before the next stage document is generated (approval gates generation)

**The Documents page and Matter File must clearly label each ledger entry:**

| Entry | Label |
|-------|-------|
| Uploaded original | `[Filename] — Original Upload — [Date]` |
| CondoClaw baseline | `Ledger_v1_Intake — CondoClaw Baseline — [Date]` |
| Stage-specific versions | `Ledger_v2_First_Letter — Approved — [Date]` |
| Working (unapproved) version | `Ledger_v3_Working — Pending Approval` |

---

### 12.9 Relationship to Source Ledger

The uploaded association ledger is preserved exactly as uploaded and never modified.

The CondoClaw Excel ledger is the normalized working ledger. It must be faithful enough that:
- The user can recognize the original accounting history
- Every line item can be traced back to the source document
- The resulting Excel feels like an accurate representation of the matter's financial state

At the same time, it must be reorganized into a format that is readable, auditable, reusable in document generation, and consistent across all matters — regardless of how the source association formatted their own records.

---

### 12.10 Future Customer Sample Alignment

Later, when customer sample ledgers are uploaded, CondoClaw may learn from those examples to adapt formatting preferences and layout patterns.

Rules:
- The baseline ledger structure must exist before any sample learning occurs
- Customer samples refine layout and column preferences only
- Customer samples do not replace the system's core calculation logic
- Customer samples cannot override the statutory Calculation Sheet
- If a customer sample conflicts with the baseline format in a material way, the AI Concierge flags the conflict and asks the user to confirm which format to use going forward

The baseline ledger is the system default. Customer samples are style and pattern refinements.

---

### 12.11 OCR Ledger Conversion Engine — PDF to Structured Excel

Association ledgers arrive as PDFs — often inconsistent, unstructured, or scanned. The system must convert them into a clean, calculation-ready Excel workbook automatically.

**The 4-Step Pipeline:**

---

**Step 1 — OCR Extraction**

The system processes the uploaded PDF using `pdfplumber` (text-based PDFs) or `pytesseract` (scanned images) to extract:

| Field | Extraction Target |
|-------|-----------------|
| Posting dates | All date formats normalized to MM/DD/YYYY |
| Charge descriptions | Narrative text for each line item |
| Charge types | Assessment / Late Fee / Interest / Payment / etc. |
| Debit amounts | All charges |
| Credit amounts | All payments and credits |
| Running balance | Per-line balance if present |

Each extracted value is stored with a **confidence score** and **source page reference** from the original PDF.

---

**Step 2 — Normalization**

Raw extracted data is mapped into the CondoClaw standard ledger schema:

```
| Posting Date | Description | Charge Type | Debit | Credit | Running Balance | Source | Notes |
```

Normalization rules:
- Dates standardized to MM/DD/YYYY
- Charge types classified into the standard taxonomy (Assessment / Late Fee / Interest / Attorney Fee / Cost / Payment / Credit Adjustment)
- Amounts cleaned of formatting artifacts ($, commas, parentheses for negatives)
- Running balance recalculated from scratch as a validation check
- Duplicate lines flagged (same date + description + amount)

---

**Step 3 — Validation**

Before the Excel is generated, the system performs a math consistency check:

| Check | What It Validates |
|-------|-----------------|
| Running balance integrity | Each line's balance = prior balance + debit − credit |
| Opening balance | First line balance matches expected starting value |
| Missing fields | Any line with no date, no amount, or unclassifiable type is flagged |
| Unclear entries | Entries with confidence score below 0.70 are flagged for user review |
| Total reconciliation | Sum of all debits − sum of all credits = final balance |

Flagged entries are surfaced in the AI Concierge panel before the Excel is finalized:

> "Ledger converted from PDF. 3 entries flagged for review: Line 12 (amount unclear), Line 24 (duplicate detected), Line 31 (charge type unclassified). Please review before proceeding."

---

**Step 4 — Excel Generation**

The validated, normalized data is written to the CondoClaw Excel workbook (§12.4) with:
- Full visual formatting applied (§12.7)
- Formulas intact in all calculated columns (running balance, subtotals, totals)
- Flagged rows highlighted in pale yellow with notes
- Summary Sheet (Sheet 1) populated from normalized totals
- Audit/Reconciliation Sheet (Sheet 5) populated with original vs. normalized comparison
- File available for immediate download as `.xlsx`

The generated Excel is versioned as `Ledger_v1_Original (OCR)` and `Ledger_v2_Normalized` per the versioning convention (§12.5).

---

### 12.12 Extended Ledger Version Sequence

The full versioning sequence, from intake through lien, is:

| Version Label | Created When |
|--------------|-------------|
| `Ledger_v1_Original_OCR` | PDF uploaded — raw extracted data |
| `Ledger_v2_Normalized` | Normalization and validation complete |
| `Ledger_v3_First_Letter` | First Letter generated |
| `Ledger_v4_Post-Payment` | Payment or credit received and applied |
| `Ledger_v5_Second_Letter` | Second Letter generated |
| `Ledger_v6_Lien` | Claim of Lien generated |
| `Ledger_vN_Update_[date]` | Any mid-stage update (additional payment, fee adjustment) |

No version is ever overwritten. Each is immutable. The user can retrieve and download any version at any time.

---

### 12.13 Live Ledger Synchronization Rule

**The Excel ledger must always match the number shown in any generated document.**

This is enforced by the following rule: every system event that changes the financial state must update the live ledger immediately and, if a document is subsequently generated, create a new versioned snapshot.

Events that trigger a ledger update:

| Event | Ledger Action |
|-------|-------------|
| Stage-triggered fee applied (§15) | New debit line item added; running balance updated |
| Interest accrual (§16.3) | Interest line item added or updated; running balance updated |
| Recurring assessment added (§16.3) | Assessment debit added; running balance updated |
| Late fee triggered (§16.3) | Late fee debit added; running balance updated |
| Payment or credit uploaded (§16.11) | Credit line added; running balance reduced |
| User manual entry | Line item added; flagged as `User Manual Entry` in Source column |
| Document generated | Current live state frozen as a versioned snapshot |

The live ledger is the single source of truth. Documents pull from it. The AI Concierge reads from it. The schedule is based on it.

---

### 12.14 Dispute & Verification Readiness

> **The ledger created by CondoClaw is the authoritative financial record for the matter.**

The system must be able to produce a complete, defensible financial record on demand — for homeowner disputes, verification requests, or court scrutiny.

**Output A — Clean Excel Ledger (Download)**
- Current versioned ledger in `.xlsx` format
- All line items visible with dates, descriptions, and amounts
- Formulas intact — any reviewer can recalculate independently
- Source column shows where each entry came from

**Output B — Audit Trail**

For every number in the ledger, the audit trail must answer:
- Where did this number come from? (source document + page)
- When did it change? (timestamp of each modification)
- Why did it change? (system event or user override + reason)

*(Full audit trail specification: §17.10)*

**Output C — Reconciliation View**

A side-by-side comparison of the original uploaded PDF ledger, the CondoClaw normalized ledger, and the current working ledger:

| Field | Original PDF | CondoClaw Normalized | Current | Difference | Reason |
|-------|-------------|---------------------|---------|-----------|--------|
| Total Assessments | $4,500.00 | $4,500.00 | $4,500.00 | $0.00 | — |
| Late Fees | $100.00 | $50.00 | $50.00 | -$50.00 | Misapplied late fee corrected per Declaration |
| Interest | $0.00 | $0.00 | $180.00 | +$180.00 | Accrued since ledger upload |
| Payments | $0.00 | $500.00 | $500.00 | +$500.00 | Payment detected in updated ledger |
| **Total Balance** | **$4,600.00** | **$4,050.00** | **$4,230.00** | **-$370.00** | See above |

This view is available from the Matter File and can be exported as a standalone PDF or included with the Excel ledger.

**AI Concierge on demand:**
> "Would you like to generate a verification-ready ledger package? I'll include the current Excel ledger, the reconciliation view, and a summary of all changes since intake."

---

### 12.15 Payment Detection & Auto-Reconciliation Engine

> **CondoClaw must never assume the last uploaded ledger is still correct. Before every major step, it must check whether money moved.**

> **Relationship to §16.11:** This engine detects and reconciles financial changes when a new ledger is uploaded. §16.11 (Pre-Generation Ledger Verification Gate) is the enforcement point that *blocks document generation* if the ledger has not been verified at that moment. These are complementary, not overlapping: §12.15 handles detection and reconciliation logic; §16.11 handles the generation gate. Both must be active.

The system must detect payments, credits, and financial adjustments made after the original ledger was uploaded, and automatically reconcile those changes against the active Matter ledger before any new document is generated.

---

#### 12.15.1 Payment Detection

The engine must detect possible new payments or credits from any of the following sources:

| Source | How Detected |
|--------|-------------|
| Newly uploaded ledger | Parsed and compared line-by-line against the prior approved version |
| Payment record or receipt | OCR-extracted, amount and date matched against open balance |
| Revised account statement | Full re-parse; delta computed against prior state |
| User-entered manual adjustment | Entered directly by user in the ledger panel |

**Change types the engine must identify:**

| Type | Description |
|------|-------------|
| Payment | Full payment received — matter may close |
| Partial Payment | Credit applied; balance reduced; matter remains active |
| Credit Adjustment | Non-payment credit (waiver, correction, settlement) |
| Reversed Charge | Previously applied charge removed or reversed |
| Fee Change | Attorney fee or cost amount modified |
| Interest Change | Interest rate or accrual basis updated |
| Possible Duplicate Entry | Same date + amount appears in both prior and new ledger |
| Overpayment | Credit exceeds balance — requires review before escalation |
| Unexplained Balance Difference | Delta detected with no identifiable cause — requires user review |

---

#### 12.15.2 Auto-Reconciliation Logic

When a new ledger or payment-related document is uploaded, the engine runs automatically:

```
Step 1 — Parse incoming document → extract all line items
Step 2 — Compare against current approved ledger version line by line
Step 3 — Identify: new entries / removed entries / changed amounts
Step 4 — Classify each change into a reconciliation category
Step 5 — Recalculate running balance from first entry
Step 6 — Generate reconciliation report
Step 7 — Create new versioned ledger snapshot
Step 8 — Surface results to user + AI Concierge
```

**Comparison rules:**
- Entries matched by: posting date + description + charge type + amount
- An entry in the new ledger with no match in the prior version = new entry (possible payment)
- An entry in the prior version missing from the new ledger = possible reversal or correction
- Same entry with a changed amount = possible adjustment

---

#### 12.15.3 Reconciliation Output

The system must produce a clear, structured reconciliation result before document generation continues:

```
┌────────────────────────────────────────────────────────┐
│  Reconciliation Complete                                │
├────────────────────────────────────────────────────────┤
│  Prior Ledger Version:    Ledger_v2_First_Letter        │
│  New Ledger Version:      Ledger_v3_Post_Payment        │
├────────────────────────────────────────────────────────┤
│  Changes Detected:                                      │
│    ✓ Payment Posted:      $500.00 on 04/15/2026         │
│    ✓ Interest Recalculated (lower base balance)         │
├────────────────────────────────────────────────────────┤
│  Prior Balance:           $4,120.00                     │
│  New Balance:             $3,620.00                     │
│  Balance Change:          -$500.00                      │
├────────────────────────────────────────────────────────┤
│  Recommended Action:                                    │
│  Second Letter should be regenerated with updated       │
│  balance before sending.                                │
│                                                         │
│  [Regenerate Document]   [View Full Reconciliation]     │
└────────────────────────────────────────────────────────┘
```

---

#### 12.15.4 Reconciliation Categories — Severity & Display

Every detected change is classified and shown with a severity indicator:

| Category | Severity | User Action Required |
|----------|---------|---------------------|
| Payment Detected | High — balance change | Confirm and regenerate document |
| Partial Payment Detected | High — balance change | Confirm and regenerate document |
| Credit Adjustment | Medium | Review and confirm |
| Reversed Charge | Medium | Review and confirm |
| Fee Change | Medium | Review and confirm |
| Interest Change | Low | System auto-applies if within rules |
| Possible Duplicate Entry | Medium | User must resolve before proceeding |
| Overpayment Detected | High — escalation blocked | Review required; consider closing matter |
| Unexplained Balance Difference | High | Must resolve before generation |

High-severity changes **block document generation** until the user confirms or resolves them. Medium and Low are surfaced as warnings but do not hard-block.

---

#### 12.15.5 Ledger Update & Versioning on Reconciliation

When reconciliation detects any change:

1. The prior approved ledger version is locked — never modified
2. All new/changed entries are applied to a working copy
3. Running balance is recalculated from the first entry
4. If user confirms the reconciliation result, a new versioned snapshot is created
5. The new version is linked to the triggering reconciliation event in the audit trail

**Extended version sequence including reconciliation events:**

| Version | Trigger |
|---------|---------|
| `Ledger_v1_Intake` | Original upload and OCR normalization |
| `Ledger_v2_First_Letter` | First Letter generation |
| `Ledger_v3_Post_Payment` | Payment detected and confirmed |
| `Ledger_v4_Second_Letter` | Second Letter generation |
| `Ledger_v5_Claim_of_Lien` | Claim of Lien generation |
| `Ledger_vN_Reconciliation_[date]` | Any mid-stage reconciliation event |

---

#### 12.15.6 Compliance & Risk Protection

The system must prevent users from generating letters or liens using a balance that has been superseded by a confirmed payment or reconciliation event.

**Hard block conditions:**
- A new ledger has been uploaded but reconciliation has not been reviewed → block generation
- Reconciliation reveals a High-severity change that has not been confirmed → block generation
- An overpayment exists that has not been reviewed → block escalation to lien

**Soft block (warning only):**
- Current ledger version is older than a configurable threshold (default: 30 days) → warn but allow if user confirms
- Interest has accrued significantly since last document generation → recommend regeneration

When a hard block is active, the document generation panel shows:

> "Document generation is blocked. A reconciliation event requires your review before this matter can advance. [View Reconciliation]"

---

#### 12.15.7 Audit Trail — Reconciliation Events

Every reconciliation event is logged immutably with the following fields:

| Field | Value |
|-------|-------|
| `prior_ledger_version` | ID and label of version before reconciliation |
| `new_ledger_version` | ID and label of version after reconciliation |
| `change_categories` | List of all detected change types |
| `amount_difference` | Net change in balance |
| `user_action` | Confirmed / Overridden / Pending |
| `override_reason` | If user overrode a High-severity flag |
| `timestamp` | Date and time of reconciliation run |
| `triggered_by` | Document upload / User manual entry / System detection |

This log makes the full payment history and balance evolution of every matter fully traceable and legally defensible.

---

#### 12.15.8 AI Concierge — Payment & Reconciliation Behavior

**On payment detected in uploaded document:**
> "A new payment of $500.00 was detected in the updated ledger, posted 04/15/2026. I've recalculated the balance: $3,620.00. A new ledger version has been created. The Second Letter should be regenerated before sending — shall I update it now?"

**On aging ledger at generation gate:**
> "Your current ledger is 18 days old. Before generating the Claim of Lien, please upload an updated ledger or confirm no changes have occurred."

**On overpayment or duplicate:**
> "An overpayment or possible duplicate credit may exist in the updated ledger. I've blocked escalation until this is resolved. Please review the reconciliation summary."

**On unexplained balance difference:**
> "The updated ledger shows a balance that differs from what I calculate by $42.00, and I cannot identify the cause. Please review Lines 18 and 22 — there may be a correction or adjustment that needs explanation."

**On clean reconciliation (no changes):**
> "Reconciliation complete. No changes detected since the last approved ledger version. The balance remains $3,620.00. You may proceed with document generation."

---

## 13. Association Documents, OCR Intelligence & Interest Rules Engine

### 13.1 Purpose

Each association has governing documents — Declaration, Bylaws, Rules & Regulations — that define the financial rules for that community: interest rates, late fees, collection rights, and recoverable charges. CondoClaw must ingest, analyze, and apply these rules using OCR and AI.

**Core Principle:** The system must not assume financial rules. It derives them from the association's governing documents whenever available, and falls back to safe configurable defaults when they are not.

---

### 13.2 Association System States

Each association must track two key states that control how the system behaves for all matters in that association:

| State | Options | Effect |
|-------|---------|--------|
| Has Governing Documents | Yes / No | Controls whether AI can extract interest and fee rules |
| Interest Rate Source | Default / Extracted / User Override | Determines which interest rate is applied to ledger calculations |

When no governing documents have been uploaded, the system operates in **Default Mode** — usable immediately but without association-specific intelligence.

When documents are uploaded, the system upgrades to **Extracted Mode** — applying association-specific rules automatically.

---

### 13.3 Association Document Upload

The Associations module must allow users to upload the following document types for each association:

| Document | Purpose |
|----------|---------|
| Declaration of Condominium / HOA Declaration | Primary source for interest rate, late fee rules, collection rights |
| Bylaws | Governance procedures, additional fee provisions |
| Rules & Regulations | Operational rules, additional charges |
| Amendments | Override or modify original declarations; must be processed after base document |

**Upload behavior:**
- Multiple documents per association are supported
- Amendments are processed after the base document and may override extracted values
- All uploaded documents are preserved exactly as uploaded (never modified)
- Upload triggers automatic OCR + AI extraction (see §12.4)

---

### 13.4 OCR + AI Extraction Pipeline

Upon document upload, the system runs the following pipeline:

```
Upload → OCR (pdfplumber / pytesseract) → AI Clause Extraction → Variable Normalization → Confidence Scoring → Storage
```

**Extracted Variables (Key Financial Provisions):**

| Variable | Example | Notes |
|----------|---------|-------|
| Interest Rate | 18% per annum | Extract percentage and period |
| Late Fee Amount | $25 per occurrence | Extract flat amount or percentage of assessment |
| Grace Period | 15 days after due date | Extract days before late fee applies |
| Attorney Fee Entitlement | "prevailing party entitled to fees" | Boolean + extracted clause text |
| Collection Rights | Power to lien, power to foreclose | Boolean flags |
| Special Assessment Authority | Yes / No | *(future)* |

**For each extracted variable, the system stores:**
- Extracted value
- Source document and page number
- Confidence score (0.0 – 1.0)
- Extracted clause text (verbatim)
- Extraction timestamp

---

### 13.5 Interest Rate Extraction Logic

Interest is the most important extracted variable. The system must apply the following logic:

**Step 1 — Locate the interest clause**
Search for keywords: `interest`, `rate`, `per annum`, `annually`, `monthly`, `accrued`, `assessment interest`

**Step 2 — Extract the rate**
- Extract percentage value
- Identify whether stated as annual, monthly, or unspecified
- If unspecified, default to annual (safer assumption)

**Step 3 — Store with metadata**
```
interest_rate_annual: 18.00
interest_rate_source: "Declaration, Page 12, Section 4.3"
interest_rate_confidence: 0.94
interest_rate_clause: "Interest shall accrue at the rate of eighteen percent (18%) per annum..."
```

**Step 4 — Apply to ledger calculations**
- Monthly Rate = Annual Rate ÷ 12
- Daily Rate (per diem) = Annual Rate ÷ 365
- Interest Accrued = Outstanding Balance × Daily Rate × Days Elapsed

---

### 13.6 Usury Protection Rule

> **The system must never auto-apply an interest rate that may exceed applicable legal limits.**

If the extracted interest rate is at or above a configurable warning threshold (default: 18% annual):
1. The system flags the rate for review — it does not auto-apply it
2. The AI Concierge surfaces a warning:

> "Detected 24% interest rate in the Declaration. Please confirm this rate complies with applicable Florida law before applying. CondoClaw has not applied this rate automatically."

3. The user must explicitly confirm before the rate is applied
4. The confirmation is logged in the association record with user identity and timestamp

---

### 13.7 Late Fee Validation

When a matter is processed, the system must compare ledger late fee charges against the extracted Declaration late fee rules.

**If a mismatch is detected:**
- The AI Concierge flags the discrepancy
- The specific difference is shown (declaration says $25 / ledger shows $50)
- The user can accept the ledger amount, apply the declaration amount, or manually override
- The resolution is logged in the Audit Sheet

**Example AI Concierge message:**
> "Late fee of $50.00 in the uploaded ledger does not match the Declaration provision for Oak Hollow HOA, which specifies $25.00 per occurrence. Would you like to apply the declaration amount or keep the ledger amount?"

---

### 13.8 Default Behavior — No Governing Documents

When no governing documents have been uploaded for an association:

1. System applies safe default interest rate (configurable — default: 0%)
2. System applies safe default late fee (configurable — default: as uploaded in ledger)
3. AI Concierge prompts at matter creation:

> "No governing documents found for [Association Name]. Upload the Declaration to enable interest calculation and late fee validation. Currently operating with system defaults."

4. The interest field on the ledger Calculation Sheet shows: `Interest Rate: 0.00% (Default — No Declaration Uploaded)`
5. Matter can still proceed — the system is fully usable without documents

---

### 13.9 AI Concierge Behavior — Association Intelligence Layer

**At Matter Creation (no governing docs):**
> "No governing documents found for [Association Name]. I cannot verify the interest rate or late fee rules for this matter. Upload the Declaration to enable association-specific calculations."

**After Document Upload — Extraction Summary:**
> "Association documents processed for [Association Name]. Here's what I found:
> - Interest Rate: 18% annually (source: Declaration, p. 12)
> - Late Fee: $25.00 per occurrence after 15-day grace period
> - Attorney Fees: Recoverable (prevailing party language confirmed)
> These rules have been applied to all active matters for this association."

**During Ledger Validation:**
> "The late fee charged in the uploaded ledger ($50.00) does not match the Declaration provision ($25.00). I've flagged this as a conflict. Please resolve before generating documents."

**When Documents Are Amended:**
> "An amended Declaration has been uploaded for [Association Name]. Re-running extraction. I'll notify you if any financial rules have changed from the prior version."

---

### 13.10 Association Creation Logic

**Automatic creation from matter intake:**

When a new matter is created from an uploaded NOLA, ledger, and mailing affidavit, the system must automatically extract the association name and create the association record if it does not already exist.

Extracted at intake:
- Association name (from NOLA header)
- Property address / community name
- Unit number
- Statute type (718 / 720 / 617) — from document context

The association can exist without governing documents. Intelligence is added later as documents are uploaded.

**Deferred intelligence upgrade:**
1. Matter is created → association auto-created in Default Mode
2. User uploads Declaration → system re-runs extraction
3. AI Concierge confirms new rules and re-evaluates active matters
4. Ledger recalculated where applicable (with user confirmation)

---

### 13.11 Ledger Integration — Interest Calculation Fields

The Calculation Sheet (§11.4, Sheet 3) must include the following association-sourced fields:

| Field | Source |
|-------|--------|
| Interest Rate (Annual %) | Extracted / Default / User Override |
| Interest Rate (Monthly %) | Calculated from annual |
| Interest Rate (Daily — Per Diem) | Calculated from annual |
| Interest Rate Source | Declaration · Page · Section |
| Interest Start Date | From matter (date after NOLA or per declaration) |
| Interest End Date | Ledger Through Date |
| Days Elapsed | Calculated |
| Interest Accrued | Outstanding Balance × Daily Rate × Days Elapsed |
| Usury Flag | Yes / No — if rate was flagged for review |

---

### 13.12 User Override

The user must be able to:
- Override the extracted interest rate for a specific matter
- Override the extracted late fee amount for a specific matter
- Set a manual interest rate at the association level (applies to all new matters)

**Override rules:**
- Overrides are logged with user identity, timestamp, and reason
- Override does not replace the extracted value — both are preserved in the record
- AI Concierge warns if the override differs significantly from the extracted value
- Interest rate source field updates to: `User Override (was: Extracted 18.00%)`

---

### 13.13 Associations Page — UI Requirements

Each association record page must include:

**Documents Section**
- List of all uploaded governing documents with upload date and OCR status
- `Upload Documents` action
- `Re-run OCR` action (if extraction failed or document was updated)
- `View Extracted Data` — shows raw extraction result with confidence scores

**Financial Rules Summary Panel**
- Interest rate (with source label: Default / Extracted / Override)
- Late fee structure (amount + grace period)
- Attorney fee entitlement (Yes / No + clause text)
- Collection rights flags

**System State Indicators**
- `Has Governing Documents: Yes / No`
- `Interest Source: Default / Extracted / User Override`
- `Last Extraction Run: [timestamp]`
- `Extraction Confidence: [score]`

**Actions**
- Upload Documents
- Re-run OCR & Extraction
- Override Interest Rate
- Override Late Fee
- View All Matters for This Association

---

### 13.14 Evolution Principle

> CondoClaw evolves from document automation to association-specific legal intelligence.

**Phase 1 (MVP):** Usable immediately with defaults. System processes matters without governing documents. AI Concierge prompts for uploads.

**Phase 2:** OCR + extraction active. System derives rules from Declaration. Ledger calculations become association-specific. Discrepancies are flagged automatically.

**Phase 3 (Future):** Full association intelligence. Per-association fee templates, amendment tracking, multi-document conflict resolution, statute + declaration cross-validation.

---

## 14. Associations Module — Structure, UI & Intelligence Layer

### 14.1 Purpose

The Associations module is the central intelligence layer for each condominium or HOA. It stores governing documents, financial rules, management and ownership information, and statutory context — and applies that intelligence to every matter associated with that entity.

**Core Principle:** The Association is the client. All matters, unit owners, documents, and financial rules are anchored to it. Nothing in CondoClaw exists outside an association.

---

### 14.2 Association Creation Logic

**Primary Method — Automatic creation from matter intake:**

When a user uploads a NOLA, ledger, and mailing affidavit to create a new matter, the system must:

1. Extract the association name and community/property name from the uploaded documents
2. Check whether an association record with that name already exists
3. If an association already exists → link the new matter to it
4. If no association exists → automatically create a new Association record and link the matter to it

The association is created with minimal data at intake. Full enrichment is deferred until the user adds governing documents, contacts, and financial rules.

**Manual creation:**
A user may also create an association directly from the Associations page using the `+ Add Association` button, entering name, statute type, and community details manually.

**Deferred enrichment:**
A newly created association may initially lack:
- Governing documents
- Extracted financial rules
- Management contacts
- Officer information

The system must allow progressive enhancement over time without blocking matter creation or processing.

---

### 14.3 Data Model

Each Association record must store the following fields:

**Core Fields**

| Field | Type | Description |
|-------|------|-------------|
| `association_id` | UUID | System-generated unique identifier |
| `association_name` | string | Full legal name of the association |
| `community_name` | string | Common name / property name (may differ from legal name) |
| `address` | string | Primary community address |
| `statute_type` | enum | Chapter 718 / Chapter 720 / Chapter 617 |
| `created_from` | enum | Auto (from matter intake) / Manual |
| `created_at` | datetime | Creation timestamp |

**Document Layer**

| Field | Type | Description |
|-------|------|-------------|
| `declaration_uploaded` | boolean | Whether a Declaration has been uploaded |
| `bylaws_uploaded` | boolean | Whether Bylaws have been uploaded |
| `amendments_uploaded` | boolean | Whether any amendments have been uploaded |
| `ocr_status` | enum | Pending / Processing / Complete / Failed |
| `last_extraction_run` | datetime | Timestamp of last OCR + AI extraction |
| `extracted_rules` | JSON | Full extraction result (rates, fees, clauses, confidence scores) |

**Financial Rules**

| Field | Type | Description |
|-------|------|-------------|
| `interest_rate` | decimal | Applied annual interest rate |
| `interest_source` | enum | Default / Extracted / User Override |
| `late_fee_amount` | decimal | Per-occurrence late fee |
| `late_fee_source` | enum | Default / Extracted / User Override |
| `grace_period_days` | integer | Days before late fee applies |
| `fee_recovery_allowed` | boolean | Attorney fees recoverable per governing docs |

**Contacts**

| Field | Type | Description |
|-------|------|-------------|
| `management_company` | string | Management company name |
| `management_contact` | string | Primary contact name |
| `management_email` | string | Contact email |
| `management_phone` | string | Contact phone |
| `officer_president` | string | Board President name (optional) |
| `officer_treasurer` | string | Treasurer name (optional) |
| `officer_secretary` | string | Secretary name (optional) |
| `registered_agent` | string | SunBiz registered agent (optional) |

**System Flags**

| Field | Type | Description |
|-------|------|-------------|
| `needs_documents` | boolean | No governing docs uploaded yet |
| `needs_review` | boolean | Extraction conflict or validation issue pending |
| `sunbiz_synced` | boolean | Whether SunBiz data has been pulled |
| `sunbiz_sync_date` | datetime | Timestamp of last SunBiz pull |

---

### 14.4 Associations Dashboard View

**Top Bar**
- Search field: `Search associations...`
- `+ Add Association` button (right-aligned)

**Association Cards / Table**

Each row or card displays:

| Column | Content |
|--------|---------|
| Association Name | Full name with statute type badge (718 / 720 / 617) |
| Active Matters | Count of open matters |
| Units | Total units (if known) |
| Governing Docs | `Yes` (green) / `No` (amber warning) |
| Last Activity | Relative timestamp (e.g., "2 days ago") |
| Status | Active / Needs Documents / Needs Review |
| Actions | `View` → opens detail page |

The `Needs Documents` status badge is shown whenever `needs_documents = true`. It is a soft nudge — it does not block the association from being used.

---

### 14.5 Association Detail Page

Clicking an association opens a structured detail page with five panels.

---

#### Panel 1 — Overview

| Field | Display |
|-------|---------|
| Association Name | Full legal name |
| Community / Property | Common name (if different) |
| Address | Community address |
| Statute Type | Chapter 718 / 720 / 617 badge |
| Created From | `Auto — from matter intake` / `Manual` |
| Active Matters | Count with link to matter list |
| Total Units | If known |
| Member Since | Association creation date |

---

#### Panel 2 — Governing Documents

**If no documents uploaded:**
```
┌──────────────────────────────────────────────────────┐
│  No governing documents uploaded.                     │
│  Upload the Declaration to enable interest            │
│  calculation and late fee validation.                 │
│                          [Upload Documents ↑]         │
└──────────────────────────────────────────────────────┘
```

**After upload:**
- Document list with name, type, upload date, and OCR status indicator
- Per-document actions: `View`, `View Extracted Data`, `Re-run OCR`, `Remove`

**Extraction Summary Card (after successful OCR):**
```
Detected from Declaration (uploaded MM/DD/YYYY):
─────────────────────────────────────────────
  Interest Rate:       18% annually
  Late Fee:            $25.00 per occurrence
  Grace Period:        15 days
  Attorney Fees:       Recoverable ✓
  Collection Rights:   Lien + Foreclosure ✓
─────────────────────────────────────────────
  Confidence: 94%   [View Raw Text] [Override Values]
```

**Actions available:**
- `Upload Documents`
- `Re-run OCR & Extraction`
- `View Extracted Rules` (full extraction detail with confidence scores and source page references)
- `View Raw Text` (verbatim OCR output)
- `Override Values`

---

#### Panel 3 — Financial Rules

A clean, editable panel that feeds directly into ledger calculations and document generation for all matters at this association.

| Rule | Value | Source | Action |
|------|-------|--------|--------|
| Interest Rate (Annual) | 18.00% | Declaration, p. 12 | Override |
| Late Fee | $25.00 / occurrence | Declaration, p. 8 | Override |
| Grace Period | 15 days | Declaration, p. 8 | Override |
| Attorney Fee Recovery | Yes | Declaration, p. 14 | — |

Source labels:
- `Declaration` — extracted from uploaded governing document
- `Default` — system default (no document uploaded)
- `User Override` — manually set by user (original extracted value preserved below)

When a user overrides a value, the original extracted value remains visible in a secondary line: `(was: 18.00% from Declaration)`

---

#### Panel 4 — Management & Contacts

**Standard fields:**
- Management Company Name
- Primary Contact Name
- Email
- Phone

**Board / Officers (optional):**
- President
- Treasurer
- Secretary

**SunBiz Integration:**

A `Pull from SunBiz` button allows the system to look up the association as a registered Florida entity. Because association names vary in registration and may match multiple entities, the flow includes an entity matching step before any data is written to the record.

**Full SunBiz matching flow — see §15.8 for complete specification.**

Summary:
1. User clicks `Pull from SunBiz`
2. System returns up to 5 matching entities with relevance scores
3. User selects the correct match from the list
4. System shows full confirmation panel (Registered Agent, Officers, filing status)
5. User confirms or edits individual fields before saving
6. Data written to association record with `sunbiz_synced: true` and sync timestamp

**AI Concierge message after pull:**
> "I found [Association Name] in SunBiz. Please confirm the correct entity before I save the data to the association record."

---

#### Panel 5 — Matters

A list of all matters linked to this association:

| Column | Content |
|--------|---------|
| Matter ID | Link to matter |
| Unit Owner | Owner name |
| Unit Number | Unit |
| Current Stage | NOLA / First Letter / Second Letter / Claim of Lien |
| Balance Due | Total outstanding |
| Status | Active / Closed / On Hold |
| Last Updated | Relative date |

Summary row at the bottom: `Total Outstanding Across All Active Matters: $XX,XXX.XX` *(future — requires summing active matter balances)*

---

### 14.6 AI Concierge Behavior — Association Layer

**If no governing documents exist:**
> "No governing documents found for [Association Name]. I cannot verify the interest rate or late fee rules for this association. Upload the Declaration to enable association-specific calculations for all matters."

**After document upload + successful extraction:**
> "Governing documents processed for [Association Name]. Here's what I found:
> - Interest Rate: 18% annually (Declaration, p. 12)
> - Late Fee: $25.00 per occurrence after 15-day grace period
> - Attorney Fees: Recoverable (confirmed)
> I've applied these rules to all active matters for this association. Let me know if anything needs to be adjusted."

**During matter processing (referencing association rules):**
> "Using 18% annual interest rate from [Association Name] Declaration. Daily rate: 0.0493%. Accrued interest through today: $XXX.XX."

**If conflict detected:**
> "The late fee charged in this matter's ledger ($50.00) does not match the [Association Name] Declaration provision ($25.00). Please resolve before generating documents."

**After SunBiz pull:**
> "I found [Association Name] in the SunBiz database. Registered Agent: [Name]. Officers: President [Name], Treasurer [Name], Secretary [Name]. Would you like me to save this information to the association record?"

---

### 14.7 System Behavior Rules

**Rule 1 — Association drives everything**
All matters linked to an association automatically inherit:
- Financial rules (interest rate, late fee, grace period)
- Document logic (attorney fee recovery language)
- Compliance structure (statute type)

If the association's financial rules are updated (e.g., new Declaration uploaded), active matters must be re-evaluated. The AI Concierge notifies the user and requests confirmation before recalculating ledger values.

**Rule 2 — No blocking**
The user can proceed with matter creation, document generation, and ledger calculation without governing documents. The system operates on safe defaults and prompts — not hard blocks.

**Rule 3 — Progressive intelligence**
An association starts simple and becomes smarter as:
- Governing documents are uploaded
- Financial rules are extracted
- SunBiz data is pulled
- Matter history accumulates

Each enrichment step improves the intelligence applied to all matters at that association — past and future.

---

## 15. Attorneys' Fees, Costs & Recoverable Charges Engine

### 15.1 Purpose

CondoClaw must automatically calculate, apply, and track recoverable attorneys' fees and costs in compliance with Florida condominium and HOA statutes. These charges must be:
- Triggered at the correct statutory stage — not manually entered each time
- Transparently reflected as line items in the ledger
- Included in all generated documents with a visible breakdown
- Editable by the user when necessary

**Core Principle:** Attorneys' fees and costs are stage-triggered, rule-based, and user-adjustable — not manually recreated each matter.

---

### 15.2 Statutory Trigger Logic

The system must enforce the following baseline rule derived from FL Chapter 718/720:

| Stage | Fee Trigger |
|-------|------------|
| Before NOLA issued | No attorneys' fees applied |
| After NOLA issued | Attorneys' fees and mailing costs may be charged |
| After Claim of Lien recorded | Additional fees + recordation costs must be applied |

These triggers are enforced automatically at each stage transition. The system must not apply fees that are not yet triggered and must not skip fees that are required.

---

### 15.3 Fee Category Structure

Instead of many manual fields, the system uses three controlled categories:

**Category 1 — Attorneys' Fees**
- Flat or preset amount per stage
- Examples: NOLA preparation fee, Second Letter fee, Lien preparation fee
- Applied automatically at stage trigger
- User may override per matter

**Category 2 — Administrative / Mailing Costs**
- Covers certified mail, postage, and processing
- May be configured as flat fee or per-document fee
- Applied automatically when a document is generated for mailing

**Category 3 — Hard Costs (Lien & Legal Costs)**
- Includes recording fees, title search *(future)*, court-related costs *(future)*
- Applied at Claim of Lien stage
- Recording fee amount sourced from county configuration or user override

---

### 15.4 Fee Preset System

The system maintains a default fee schedule at the system level. Associations may later have their own fee templates (see §12.9).

**Default system fee schedule:**

| Stage | Fee Type | Category | Default Amount |
|-------|---------|----------|---------------|
| NOLA | Attorneys' Fee | Category 1 | Configurable |
| NOLA | Certified Mail / Mailing Cost | Category 2 | Configurable |
| Second Letter | Attorneys' Fee | Category 1 | Configurable |
| Second Letter | Mailing Cost | Category 2 | Configurable |
| Claim of Lien | Lien Preparation Fee | Category 1 | Configurable |
| Claim of Lien | Recording Cost | Category 3 | Configurable |
| Claim of Lien | Mailing Cost | Category 2 | Configurable |

Default amounts are set in system configuration. They are not hardcoded — they can be updated by the firm without a code change.

---

### 15.5 Minimal Required Fields Per Fee Line

To keep the system simple, each fee entry requires only three fields:

| Field | Description |
|-------|-------------|
| Fee Preset | The default amount from the fee schedule |
| Allow Override | Yes / No — whether the user can change this amount |
| Override Amount | Optional — user-entered amount that replaces the preset |

These three fields are sufficient to handle 90% of cases without manual work.

---

### 15.6 Workflow — How Fees Are Applied

**Stage 1 — Matter Created**
- No fees applied yet
- Fee schedule loaded for the matter's statute type

**Stage 2 — NOLA Generated**
The system automatically:
1. Applies the NOLA attorneys' fee line item
2. Applies the mailing cost line item
3. Writes both to the active ledger version as new debit rows
4. Creates a new ledger version: `Ledger_v2_First_Letter`

**Stage 3 — Second Letter Generated**
The system automatically:
1. Applies the additional attorneys' fee
2. Applies the mailing cost
3. Updates the ledger: `Ledger_v3_Second_Letter`

**Stage 4 — Claim of Lien Generated**
The system automatically:
1. Applies the lien preparation fee
2. Applies the recording cost
3. Applies the mailing cost
4. Updates the ledger: `Ledger_v4_Claim_of_Lien`

---

### 15.7 Ledger Integration

All fees and costs must appear as explicit line items in the Transaction Ledger (Sheet 2 of the Excel workbook). They must use the same structure as all other ledger entries:

| Posting Date | Description | Charge Type | Debit |
|-------------|-------------|------------|-------|
| 04/01/2026 | NOLA Attorney Fee | Attorney Fee | $150.00 |
| 04/01/2026 | Certified Mail — NOLA | Cost | $12.00 |
| 05/10/2026 | Second Letter Attorney Fee | Attorney Fee | $75.00 |
| 05/10/2026 | Certified Mail — Second Letter | Cost | $12.00 |
| 06/01/2026 | Lien Preparation Fee | Attorney Fee | $250.00 |
| 06/01/2026 | Lien Recording Fee | Cost | $135.00 |
| 06/01/2026 | Certified Mail — Lien | Cost | $12.00 |

Every fee line item carries a `Source` of `CondoClaw Auto-Applied` unless the user overrides it, in which case it becomes `User Override`.

---

### 15.8 Fee Visibility Layer (UI Requirement)

Every document and ledger view must surface a clear fee breakdown to the user. This prevents disputes and makes documents defensible.

**The following breakdown must be visible at all times in the Matter view:**

```
─────────────────────────────────────────────
  Total Assessments (Principal)    $  X,XXX.XX
  Total Interest                   $    XXX.XX
  Total Attorneys' Fees            $    XXX.XX
  Total Costs                      $    XXX.XX
  Total Credits / Payments        ($    XXX.XX)
─────────────────────────────────────────────
  TOTAL BALANCE DUE                $  X,XXX.XX
─────────────────────────────────────────────
```

This breakdown must appear:
- In the Matter Intelligence Panel
- On the Summary Sheet of the Excel ledger (§11.4, Sheet 1)
- In the Document Generation panel before final generation
- In any generated document that requires a full balance breakdown

---

### 15.9 User Controls

The user must be able to:
- Edit any fee amount before finalizing a document
- Remove a fee line item if not applicable to this matter
- Add a custom cost line with a description
- See each fee broken down by category (Attorney Fee / Cost / Hard Cost)
- Confirm the fee total before document generation proceeds

Constraints:
- System defaults should handle 90% of cases without manual edits
- Fee edits are logged in the Audit Sheet of the ledger (§11.4, Sheet 5)
- Removing a fee that is statutorily required triggers a warning from the AI Concierge before allowing removal

---

### 15.10 Document Integration

Every generated document must reflect:
- Total amount due (including all fees and costs)
- A breakdown if required by the document type or statute
- Line-item inclusion of: assessments, interest, attorneys' fees, costs

The document pulls these values from the approved ledger version for that stage (see §11.6). If the ledger has unapproved fee edits, the document generation panel shows a warning and requires the user to approve the ledger before proceeding.

---

### 15.11 Versioning Requirement

Each time fees are applied at a stage transition, a new ledger version is automatically created (per §11.5 versioning rules). The document generated at that stage is permanently linked to that ledger version. This link is recorded in the Document Snapshot Sheet (§11.4, Sheet 4) and in the Matter History.

---

### 15.12 AI Concierge Behavior

At each stage where fees are auto-applied, the AI Concierge must notify the user:

> "The NOLA has been generated. I've automatically applied the NOLA attorneys' fee ($150.00) and certified mail cost ($12.00) to the ledger. The updated total balance due is $4,282.00. Would you like to review or adjust these charges before proceeding?"

If the user removes a required fee:
> "Removing the NOLA attorneys' fee will bring the total below the amount referenced in the notice. This may create a discrepancy between the ledger and the document. Would you like to proceed, or keep the fee and adjust the notice instead?"

If the fee schedule has no preset for this matter's statute type:
> "No fee preset is configured for Chapter 720 matters at this association. Please enter the attorneys' fee and costs manually, or configure a default fee schedule for this association."

---

### 15.13 Future Expansion

The following are planned but out of MVP scope:
- **Per-association fee templates** — each association has its own default fee schedule
- **Per-attorney billing structures** — flat fee vs. hourly; billing entity tracked per matter
- **Court cost automation** — foreclosure filing fees, service of process costs
- **Title search integration** — chain-of-title cost at Claim of Lien stage
- **Fee cap enforcement** — statutory attorney fee caps where applicable under FL 718/720

---

## 16. Time-Awareness Engine — Real-Time Financial & Legal Simulation

### 16.1 Core Principle

> **The system is not static. It is a living model of the matter that evolves with time.**

CondoClaw must operate on a real-time, continuously updating basis — automatically advancing financial calculations, deadlines, and legal eligibility based on the passage of time. It simulates what a user, association, or attorney would do manually, but continuously and automatically.

This transforms CondoClaw from a static document generator into a **continuously running financial and legal simulation engine** that always reflects current reality.

---

### 16.2 Internal Clock — Time Awareness Engine

The system must maintain an internal time reference that continuously compares the current date against all matter-relevant dates:

| Tracked Date | Source | Used For |
|-------------|--------|---------|
| NOLA mailing date | Mailing affidavit / NOLA | Statutory waiting period countdown (30 or 45 days) |
| Ledger through date | Ledger / user input | Interest and fee accrual calculation endpoint |
| Assessment due dates | Ledger pattern / association rules | Recurring assessment auto-addition |
| Stage document dates | Document generation events | Timing between stages |
| Today's date | System clock | All real-time calculations |

The time engine runs continuously in the background. It does not require user action. It triggers recalculations, schedule updates, AI Concierge notifications, and eligibility status changes automatically.

---

### 16.3 Automatic Time-Based Financial Calculations

**A. Interest Accrual**

Interest accrues automatically based on the following logic:

```
Daily Interest = Outstanding Balance × (Annual Rate ÷ 365)
Accrued Interest = Daily Interest × Days Elapsed Since Last Calculation Date
```

- Rate source: Declaration (if uploaded and extracted) → User Override → System Default (0%)
- Applied: daily (per diem) or monthly, per declaration terms
- Balance increases automatically each day without user action
- When the rate source is 0% (no declaration), the ledger shows `$0.00 interest` and the AI Concierge prompts for Declaration upload

**B. Recurring Assessments**

Monthly or quarterly assessments are added automatically based on:
- Ledger pattern detection (if prior assessments follow a regular schedule)
- Association rules (if declaration specifies regular assessment amount and due date)

When a new assessment period begins, the system:
1. Adds the assessment as a new debit line in the Transaction Ledger
2. Updates the running balance
3. Creates a new logical ledger state (a snapshot is saved if the user generates a document)
4. AI Concierge notifies: *"New monthly assessment of $XXX added to ledger for [Association Name] — [unit]."*

**C. Late Fees**

Late fees are triggered automatically when:
- A payment due date passes with no corresponding credit posted
- The grace period (from declaration or default) has elapsed

Trigger behavior:
1. System detects missed payment date + elapsed grace period
2. Late fee line item added to Transaction Ledger
3. Running balance updated
4. AI Concierge: *"Late fee of $XX applied — [due date] assessment unpaid after [N]-day grace period."*

---

### 16.4 Live Ledger — Dynamic Financial Model

The ledger is never frozen until a document is generated. Between document generations, it is a live financial model that reflects the current state of the matter at all times.

**Logical vs. Versioned States:**

| State Type | Description | Saved to File? |
|-----------|-------------|---------------|
| Live (logical) state | The current balance as of today, including all accrued charges | No — exists in memory |
| Versioned snapshot | The ledger at the moment a document was generated | Yes — permanent, immutable |

When the user views the ledger between document generations, they see the **live state**.
When a document is generated, the live state is **frozen into a versioned snapshot** that becomes the financial record for that document. *(Version naming: §12.5)*

**User-selectable views:**
- `As of Today` — current live balance with all accrued charges
- `As of [Document Date]` — the snapshot used for any prior generated document

---

### 16.5 Statutory Timing Engine

The system must track every statutory waiting period and automatically update matter eligibility status when a threshold is crossed.

**Timing enforcement table:**

| Event | Statute | Waiting Period | Next Eligible Action |
|-------|---------|---------------|---------------------|
| NOLI mailed | Chapter 720 (HOA) | 45 days | First Letter |
| NOLI mailed | Chapter 718 (Condo) | 30 days | Claim of Lien or First Letter |
| First Letter sent | Either | Per configuration | Second Letter |
| Second Letter sent | Either | Per configuration | Claim of Lien |

**System behavior during waiting period:**

```
Day 1 after NOLI sent (HOA, Ch. 720):
  Matter status: NOLI_SENT
  Next action: BLOCKED — 44 days remaining
  AI Concierge: "NOLI mailed 1 day ago. 44 days remaining before First Letter is eligible."

Day 45:
  Matter status: NOLI_EXPIRED → LETTER_1_READY (auto-transition)
  Next action: First Letter now available
  AI Concierge: "The 45-day statutory period has elapsed. You are now eligible to send the First Letter."
```

State transitions triggered by time are automatic — the matter status updates at midnight on the eligibility date without user action.

---

### 16.6 Schedule Integration — Action Engine

The time engine must populate and continuously update the Schedule view with time-aware events.

**Automatically created schedule entries:**

| Event | When Created | Type |
|-------|-------------|------|
| NOLI sent confirmation | When NOLI stage reached | Past event |
| First Letter eligibility | Calculated from NOLI date + waiting period | Future: "Next Action Available" |
| Second Letter eligibility | Calculated from First Letter date + wait | Future: "Upcoming Deadline" |
| Claim of Lien eligibility | Calculated from full sequence | Future: "Upcoming Deadline" |
| Next assessment due | From ledger pattern | Recurring: "Expected Charge" |
| Interest milestone | When interest crosses a configurable threshold | Alert |

The schedule is not manually entered — it is generated and maintained by the time engine. Users can add custom reminders on top of it but cannot remove system-generated deadline entries.

---

### 16.7 AI Concierge — Live Matter Monitoring

The AI Concierge must act as a live monitor that proactively notifies the user of time-based changes without waiting to be asked.

**Proactive notification examples:**

> "Interest has increased by $42.18 since your last document generation. The current balance is $4,562.18. Would you like to regenerate the Second Letter with the updated amount?"

> "The 45-day statutory period elapsed yesterday. You are now eligible to send the First Letter for [Matter ID] — [Owner Name], [Unit]."

> "A new monthly assessment of $350.00 has been added to the ledger for Oak Hollow HOA Unit 204. Total balance is now $4,912.18."

> "The balance in this matter has changed by more than $200 since the Second Letter was generated. Consider regenerating the document before filing the Claim of Lien."

> "No declaration found for [Association Name]. Interest has not been applied. The current balance reflects principal and late fees only."

**Notification triggers:**
- Balance change exceeds configurable threshold (default: $50 or 5% of prior balance)
- Statutory waiting period expires → matter becomes eligible for next step
- New recurring assessment added to ledger
- Late fee triggered
- Document generation uses a balance that differs from the current live balance by more than a threshold

---

### 16.8 User Visibility — Live Matter Dashboard

The matter view must display real-time financial and timeline indicators at all times.

**Live Indicators (always visible on matter view):**

| Indicator | Value Shown |
|-----------|-----------|
| Current Balance | Live total as of today, with last-updated timestamp |
| Days Since NOLA | Calendar days since NOLA mailing date |
| Accrued Interest | Running interest total since calculation start date |
| Next Eligible Action | What the user can do next + when |
| Days Until Eligible | Countdown if waiting period is active |
| Last Document Generated | Type + date + balance used |

**Ledger View Toggle:**

```
[As of Today ▼]  or  [As of First Letter — 04/01/2026 ▼]
```

User can toggle between the live ledger and any prior versioned snapshot. The toggle is non-destructive — switching views does not change any data.

---

### 16.9 Manual Override Controls

The user must retain full manual control when needed.

| Control | Function |
|---------|---------|
| Freeze Ledger | Stops all automatic accruals for this matter; user must manually unlock |
| Edit Value | Override any calculated value; original preserved; override logged in audit trail |
| Stop Auto-Calculation | Disable time engine for this matter entirely |
| Add Manual Entry | Add a custom debit or credit line to the ledger at any date |
| Lock Balance | Freezes the balance at a specific value for document generation purposes |

All manual overrides are logged in the Audit Trail (§17.10) with user identity, timestamp, original value, new value, and override reason.

**AI Concierge behavior on override:**
> "Automatic interest accrual has been paused for this matter. I will not update the balance until you resume auto-calculation. All documents generated during this period will use the frozen balance."

---

### 16.10 Edge Cases

| Edge Case | System Behavior |
|-----------|----------------|
| No declaration uploaded — interest rate unknown | Apply 0% rate; flag in ledger as `No Declaration — Interest Not Applied`; AI Concierge prompts for upload |
| Incorrect NOLA date entered | Flag: "NOLA date is in the future — statutory waiting period cannot begin until NOLA is sent"; block countdown |
| Ledger has no identifiable assessment pattern | Do not auto-add recurring assessments; AI Concierge: "No recurring pattern detected. Assessments must be added manually." |
| User override conflicts with a time-triggered calculation | Log conflict; apply user override; AI Concierge: "Manual override applied. Auto-calculation for [field] has been suspended." |
| Document generated with stale balance | Warn before generation: "The current balance ($X,XXX.XX) differs from the balance used in the prior [document]. The document will use today's live balance. Confirm?" |
| Two time-triggered events occur same day | Both processed in sequence; single AI Concierge notification summarizes both |

---

### 16.11 Pre-Generation Ledger Verification — Mandatory Gate

> **Every document must be based on the latest, verified ledger state — not an outdated snapshot.**

> **Relationship to §12.15:** The Payment Detection & Auto-Reconciliation Engine (§12.15) handles detection and reconciliation logic when new ledger data arrives. This section is the enforcement gate that blocks generation if that process has not completed. §12.15 is the engine; §16.11 is the door.

Before generating any stage document (First Letter, Second Letter, or Claim of Lien), the system must pause, verify, and confirm the current financial state of the matter. This is not an optional step. It is a required gate.

---

#### 16.11.1 The Gate — What Triggers It

This verification is triggered automatically when the user initiates generation of any of the following:

| Document | Gate Triggered |
|----------|---------------|
| First Letter | Yes — after NOLI waiting period expires |
| Second Letter | Yes — after First Letter sent |
| Claim of Lien | Yes — always, mandatory before lien filing |

The gate is not triggered for NOLI generation, since the NOLI is the first act and there is no prior ledger state to verify against.

---

#### 16.11.2 User Prompt Flow

When generation is initiated and the gate fires, the system pauses and presents:

```
┌──────────────────────────────────────────────────────────────┐
│  Ledger Verification Required                                 │
│                                                              │
│  Last ledger update: 15 days ago                             │
│  Current balance:    $4,562.18                               │
│                                                              │
│  Has there been any payment, credit, or adjustment           │
│  since the last ledger update?                               │
│                                                              │
│  [Upload Updated Ledger]   [Confirm No Changes]              │
└──────────────────────────────────────────────────────────────┘
```

**Option A — Upload Updated Ledger:**
1. User uploads a new ledger or payment record
2. System parses the new document
3. System identifies all new entries: payments, credits, adjustments
4. System updates the running balance
5. A new versioned ledger snapshot is created (see §16.11.4)
6. AI Concierge confirms: *"Updated ledger processed. Payment of $500.00 detected. New balance: $4,062.18. Proceed to generate [document]?"*
7. User confirms → generation proceeds with new balance

**Option B — Confirm No Changes:**
1. User confirms that no payments or changes have occurred
2. Confirmation is logged in the audit trail with user identity and timestamp
3. System proceeds with the current ledger version
4. Generated document references the confirmed ledger version and the confirmation timestamp

---

#### 16.11.3 Automatic Detection

When the user uploads any new document — a payment record, updated ledger, or financial statement — before initiating generation, the system must auto-detect the relevant changes:

1. System parses the uploaded document
2. System compares it against the current ledger
3. If new entries are detected, AI Concierge surfaces them:

> "New ledger detected. I found a payment of $500.00 posted on 04/15/2026. This reduces the balance from $4,562.18 to $4,062.18. Would you like me to apply this update before generating the [document]?"

4. User confirms or rejects the update
5. Either path is logged in the audit trail

---

#### 16.11.4 Ledger Update Logic & Versioning

When a new or updated ledger is provided at the verification gate:

1. System parses all new entries since the last known state
2. New entries are classified: Payment / Credit / Adjustment / New Assessment
3. Running balance is recalculated
4. Prior ledger version is preserved as immutable
5. New versioned snapshot is created with a stage-appropriate label

**Version label convention at update:**

| Scenario | Version Label |
|----------|-------------|
| Update after intake, before First Letter | `Ledger_v2_Post-Payment_[date]` |
| Update at Second Letter gate | `Ledger_v3_Second_Letter_[date]` |
| Update at Claim of Lien gate | `Ledger_v4_Lien_[date]` |
| Mid-stage update (multiple payments) | `Ledger_v[N]_Update_[date]` |

No version is ever overwritten. Every version is immutable once created.

---

#### 16.11.5 Document Dependency Rule

Every generated document must be permanently linked to the exact ledger version used at generation time:

| Field Stored | Value |
|-------------|-------|
| `ledger_version_id` | ID of the specific versioned snapshot |
| `balance_used` | Total balance at time of generation |
| `balance_date` | The date the balance was confirmed |
| `verification_method` | `Uploaded Update` / `User Confirmed No Changes` |
| `verified_by` | User identity |
| `verified_at` | Timestamp |

This record is stored in:
- The Document Snapshot Sheet of the Excel ledger (§12.4, Sheet 4)
- The Audit Trail (§17.10)
- The Matter History

---

#### 16.11.6 Partial Payments & Overpayments

**Partial payment received:**
- Applied as a credit line item in the Transaction Ledger
- Running balance reduced accordingly
- Interest accrual base recalculated from new balance
- AI Concierge: *"Partial payment of $500.00 applied. Remaining balance: $4,062.18. The matter remains active."*

**Overpayment received:**
- Applied as a credit; excess flagged for review
- System does not automatically close the matter
- AI Concierge: *"Overpayment detected. Credit of $4,562.18 applied against balance of $4,062.18. Excess credit: $500.00. Please review before proceeding. Consider closing this matter."*
- Matter status does not advance until user resolves the overpayment flag

**Missing or unclear payment information:**
- AI Concierge prompts: *"A payment appears to have been made but the amount is unclear. Please confirm the payment amount before I apply it to the ledger."*
- User enters the amount manually; system logs it as `User-Confirmed Entry` in the Source column

---

#### 16.11.7 Compliance & Risk Protection

This gate directly prevents three categories of legal exposure:

| Risk | How the Gate Prevents It |
|------|------------------------|
| Lien filed with overstated balance | Balance verified against latest ledger before every lien generation |
| Demand letter sends incorrect amount | Balance confirmed before every letter; prior payment detection mandatory |
| Debt understated (fee or interest missed) | Live ledger accruals ensure all charges are included before confirmation |

Without this gate, a payment received between document generations would be invisible to the system. The attorney would send a demand or file a lien for the wrong amount. The gate ensures that **no document ever uses a balance that has not been explicitly confirmed as current**.

---

#### 16.11.8 Stale Balance Classification

Before allowing the gate to proceed, the system must classify the current ledger state into one of three categories. The classification determines whether generation can proceed immediately, proceed with a warning, or must be blocked.

| Classification | Criteria | System Action |
|---------------|----------|--------------|
| **Current** | Ledger updated within the staleness window AND no new assessment period has started AND interest accrual since last update is below the materiality threshold | Generation proceeds automatically |
| **Stale — Usable** | Ledger is older than the staleness window BUT: no payment detected, no new assessment period started, interest delta is below materiality threshold, no governing-doc rule has changed | AI Concierge surfaces a warning and requires user confirmation before proceeding |
| **Stale — Must Regenerate** | Any of the following: payment detected in an updated ledger · new assessment period started since last ledger · interest accrual since last update exceeds materiality threshold · governing-doc rule change detected · ledger is older than the hard expiration window | Generation is **blocked** until a new ledger is uploaded, reconciled, and approved |

**Configurable thresholds (defaults):**
- Staleness window: 14 days
- Hard expiration window: 30 days
- Interest materiality threshold: $10.00 or 1% of balance (whichever is smaller)

**AI Concierge message on Stale — Usable:**
> "Your ledger was last confirmed 18 days ago. I found no payments, new assessments, or material interest changes since then. The balance appears reliable, but the ledger is aging. Do you want to proceed with the current balance of $4,562.18, or would you like to upload an updated ledger first?"

**AI Concierge message on Stale — Must Regenerate:**
> "I cannot proceed. The ledger has changed materially since the last confirmation — a new assessment period started on [date] and interest has accrued an additional $43.20. The document must be regenerated from a current ledger. Please upload an updated ledger before continuing."

---

#### 16.11.9 AI Concierge Behavior — Pre-Generation

**Before generation (with aging ledger):**
> "Your last ledger update was 15 days ago. Before generating the Second Letter, please confirm whether any payments or credits have been received. Would you like to upload an updated ledger or confirm no changes?"

**After payment detected in uploaded document:**
> "Payment of $500.00 detected on 04/15/2026. New balance: $4,062.18. The Second Letter will use this updated amount. Shall I proceed?"

**After user confirms no changes:**
> "Confirmed — no changes since last update. The Second Letter will use the balance of $4,562.18 as of 04/01/2026. This confirmation has been logged."

**On overpayment:**
> "This payment exceeds the current balance. Please review before proceeding. I've flagged this matter for your attention."

---

## 17. Platform Intelligence Architecture — States, Confidence, Roles & Audit

### 17.1 Product Vision

CondoClaw is an AI-driven legal operations platform that transforms how condominium and HOA collection matters are managed. The system automatically organizes cases around associations, extracting intelligence from uploaded documents — ledgers, NOLAs, and governing declarations — to create a structured data layer that standardizes financial rules, validates compliance, and enhances document generation. An AI Concierge continuously analyzes and cross-references information to detect discrepancies, guide workflows, and improve accuracy over time. Ultimately, CondoClaw turns fragmented legal and financial data into a centralized, intelligent system that reduces risk, increases efficiency, and supports scalable legal operations.

**This is not CRUD software. It is a compliance and litigation risk engine.**

---

### 17.1.1 The Generation Priority Hierarchy — Canonical Rule

This rule governs every document generation decision in the system. It is referenced throughout this PRD and must be enforced without exception.

```
Priority 1 — Statute (Chapter 718 / 720 / 617)      ← ALWAYS HIGHEST
Priority 2 — Verified Data (ledger, NOLA, affidavit, public record)
Priority 3 — Baseline System Logic (deterministic calculations, statutory templates)
Priority 4 — User Dataset (format, structure, language preferences)
```

| Priority | Source | Can Override Lower | Can Be Overridden By |
|----------|--------|-------------------|---------------------|
| 1 — Statute | Florida Statutes Ch. 718/720/617 | All | Nothing |
| 2 — Verified Data | NOLA, ledger, affidavit, county property appraiser | 3 and 4 | Statute only |
| 3 — Baseline System Logic | Deterministic calculation engine, statutory templates | 4 | Statute and Verified Data |
| 4 — User Dataset | Firm's prior approved documents, corrections, Gold Standards | Nothing | Everything above |

**Enforcement:** Implemented by the Statute Alignment mechanism (§17.7), the Template Conflict Resolution Engine (§18.15), and the Non-Negotiable Rule (§18.9). Any user template that would cause a Priority 4 action to override a Priority 1 requirement is blocked at Tier 3 severity.

---

### 17.2 System Outputs — What CondoClaw Produces

The following are the definitive outputs of the system. Every feature in the PRD exists to produce one or more of these outputs.

| Output | Description |
|--------|-------------|
| Eligibility decision | Per-matter Eligible / Conditional / Blocked determination before any document is generated |
| Statute-compliant draft documents | NOLA, First Letter, Second Letter, Claim of Lien — each built from verified variables |
| Baseline Excel ledger | Normalized, versioned, auditable financial record for each matter |
| Conflict report | Specific discrepancies between NOLA, ledger, affidavit, and public records |
| Non-compliant affidavit flag | AI-detected deviation from approved affidavit patterns |
| Standardized interest calculation | Association-specific, declaration-sourced, defensible calculation |
| Stage scheduling | Statutory deadlines calculated and enforced per Ch. 718/720 |
| Public record verification result | Deed holder, address, ownership transfer — sourced from county appraiser |
| Memory comparison report | Similarity score + section-by-section differences from prior approved examples |
| **Risk alerts** | Inconsistent data, missing documents, high-risk cases — flagged before documents are generated or sent |
| **Association Intelligence Profile** | Extracted rules, historical patterns, and confirmed financial logic — reusable across all matters for that association |
| Audit trail | Complete, timestamped, immutable record of every extraction, correction, override, and generation event |

These outputs — not the features — are what CondoClaw sells.

---

### 17.3 State Machine — Matter Status

> **Full 5-phase matter state machine: §10.7.** The canonical state machine is defined there and supersedes the simplified version below.

The expanded state machine uses 16 states across 5 phases: Pre-Legal (`DRAFT` → `STATUTE_DETERMINED`), NOLI Phase (`NOLI_READY` → `NOLI_EXPIRED`), Post-NOLI Enforcement (`LETTER_1_READY` → `LETTER_2_SENT`), Lien Phase (`LIEN_READY` → `LIEN_FILED`), and Litigation (`COMPLAINT_READY` → `CLOSED`).

**Key rules (all phases):**
- States advance only forward — no backward movement except via explicit admin override with audit log
- Timing enforcement: no state advances before the statute-specific waiting period has elapsed (30 days for Ch. 718; 45 days for Ch. 720)
- Step enforcement: no step can be skipped — `LIEN_READY` requires `LETTER_2_SENT` (or documented waiver)
- `STATUTE_DETERMINED` is a required gate — the workflow does not begin until 718 or 720 is locked
- `CLOSED` requires explicit user confirmation
- Every state transition is logged in the audit trail with timestamp, user, and triggering action

---

### 17.4 State Machine — Association Status

Each association must have exactly one status at all times.

| Status | Meaning | System Behavior |
|--------|---------|----------------|
| `Created (Empty)` | Association record exists; no documents, no financial rules | AI Concierge prompts for document upload · Default mode active |
| `Partially Configured` | Some data entered (e.g., contacts only) or partial docs uploaded | AI Concierge surfaces remaining gaps · Extraction may be incomplete |
| `Fully Configured` | Governing documents uploaded + OCR complete + financial rules extracted | All rules applied automatically to new matters |
| `Verified` | User has reviewed and confirmed all extracted rules | Highest confidence; rules applied without prompts; audit log updated |
| `Needs Review` | Extraction conflict, usury flag, or inconsistency detected | AI Concierge flags; user must resolve before rules auto-apply |

**Transition rules:**
- `Created (Empty)` → `Partially Configured`: any data entered
- `Partially Configured` → `Fully Configured`: governing docs uploaded + extraction successful
- `Fully Configured` → `Verified`: user explicitly confirms all extracted rules
- Any status → `Needs Review`: system detects conflict or flag during extraction or matter processing
- `Needs Review` → prior status: user resolves all flags

---

### 17.5 AI Confidence Layer

Every value produced by AI extraction or NLP must carry a confidence score. Confidence scores are used to determine whether a value is auto-applied, surfaced for review, or blocked pending confirmation.

**Confidence Tiers:**

| Tier | Score Range | System Behavior |
|------|------------|----------------|
| High | 0.90 – 1.00 | Auto-applied · Displayed with green indicator |
| Medium | 0.70 – 0.89 | Applied with review prompt · Displayed with amber indicator |
| Low | 0.50 – 0.69 | Not auto-applied · Requires user confirmation before use · Displayed with red indicator |
| Unconfident | Below 0.50 | Extracted value shown as suggestion only · AI Concierge recommends manual verification |

**Examples in UI:**

```
Interest Rate:    18.00%   [High Confidence — 0.94]
Late Fee:         $25.00   [Medium Confidence — 0.78]
Grace Period:     15 days  [Low Confidence — 0.61 — Review Required]
Owner Name:       J. Smith [High Confidence — 0.97]
Mailing Address:  123 Main [Medium Confidence — 0.82]
```

**Confidence scoring applies to:**
- All Core Matter Variables extracted from NOLA, ledger, and affidavit (§7)
- All financial rules extracted from governing documents (§12)
- Cross-document comparison similarity scores (§16)
- Public record verification match results (§6.3)

**Confidence is legal defensibility.** A value used in a generated document should have a documented source and confidence score in the audit trail. If a user overrides a High Confidence value, the override is logged with a reason field.

**Operational fallback behavior by tier:**

| Scenario | System Action |
|----------|--------------|
| High confidence (0.90+) | Auto-apply value to Core Matter Variables; display with green indicator; no user prompt required |
| Medium confidence (0.70–0.89) | Apply value but surface a visible review prompt; user may confirm or correct before proceeding |
| Low confidence (0.50–0.69) | Do not auto-apply; require explicit user confirmation before value is used in any document or calculation |
| Unconfident (below 0.50) | Show extracted value as suggestion only; AI Concierge recommends manual verification; value cannot be used in generation until confirmed |
| **Contradictory high-confidence sources** | **Block and escalate — do not auto-apply either value.** AI Concierge surfaces both values with source attribution and asks user to select. Matter status set to `Conditional` or `Blocked` depending on variable type. Neither value may be used until resolved. |

**Example — contradictory high-confidence block:**
> "I found two high-confidence values for Owner Name that conflict. The NOLA shows 'Robert Hines' (confidence: 0.94). Public records show 'Patricia Hines' (confidence: 0.97). I cannot auto-resolve this — the owner identity is a legally critical field. Which is correct for this matter?"

---

### 17.6 Error Handling & Edge Cases

The following edge cases must be explicitly handled by the system. For each, the system must have a defined behavior — it must never silently fail or produce an incorrect result.

| Edge Case | System Behavior |
|-----------|----------------|
| Ledger has no association name | AI Concierge prompts user to manually identify or confirm association · Matter is not linked until confirmed |
| Two associations have similar names | System shows both matches with confidence scores; user selects correct one before linking |
| OCR extracts conflicting values from same document | Both values shown with source page references; user selects correct one; selection logged |
| Interest rate extracted above usury threshold | Rate flagged; not auto-applied; AI Concierge requires explicit user confirmation (§12.6) |
| NOLA owner name does not match public record deed holder | Flagged as a validation conflict with severity: High · Matter status moves to `Conditional` or `Blocked` depending on severity |
| Ledger has no legible text (scanned image) | OCR fallback via pytesseract; if extraction fails, AI Concierge notifies user and requests a cleaner document or manual entry |
| Duplicate matter detected (same owner + association + open status) | System alerts user before creating a second matter; user must confirm or link to existing |
| Amended Declaration conflicts with original | Amendments processed after base document; conflicts surfaced for user resolution; association status moves to `Needs Review` |
| Stage timing check fails (user tries to advance too early) | Hard block on document generation; AI Concierge explains exactly how many days remain |
| Document generation attempted with unapproved ledger | Hard block; AI Concierge prompts to approve ledger before proceeding |
| Association type is `UNKNOWN` at document generation | Hard block; AI Concierge: "Association type must be confirmed before documents can be generated" |
| Declaration says Condominium but SunBiz shows HOA entity | Flag conflict · Require user to select and confirm correct type · Log decision with reason |
| Wrong statute applied — discovered during document review | Hard warning: "Documents generated under [Chapter X] may be invalid if this association is governed by [Chapter Y]"; require user to confirm or regenerate |
| User attempts to skip letter sequence and jump to lien | Hard block; AI Concierge: "Chapter [718/720] requires [NOLI + letter sequence] before lien filing. Required steps: [list]. Please complete them in order." |
| Statutory waiting period not yet elapsed at lien stage | Hard block with countdown: "45-day statutory period expires on [date]. You are not eligible to file the Claim of Lien until that date." |
| No NOLI sent before letter sequence attempted | Hard block; system enforces: NOLI must be in `NOLI_SENT` state before letters can be generated |
| No dataset exists for this firm / document type | Use statutory baseline templates; AI Concierge prompts: "No prior [document type] examples found for this firm. Upload prior approved documents to personalize future outputs." |
| Conflicting historical data in Memory (multiple patterns) | Use most recent approved record or highest-confidence record; AI Concierge surfaces the conflict: "I found two different formats in your history. Which should I use going forward?" |
| Poor quality dataset (low confidence, few examples) | Lower overall confidence score on output; AI Concierge prompts: "Your dataset for this document type has limited examples. Upload more approved [document type] documents to improve output quality." |
| Overfitting risk (system biased too heavily to one old example) | Statute always overrides pattern; if a pattern would violate a statutory requirement, the statutory baseline takes precedence and the deviation is flagged (§18.15 Tier 3) |

---

### 17.7 User Roles & Permissions

CondoClaw supports three user roles. Role assignment is managed at the firm / organization level by an Admin.

**Role: Admin**

| Permission | Access |
|-----------|--------|
| Create / edit / delete associations | ✓ |
| Create / edit / delete matters | ✓ |
| Upload governing documents | ✓ |
| Override extracted values | ✓ |
| Approve ledger versions | ✓ |
| Generate documents | ✓ |
| Download documents | ✓ |
| Access CondoClaw Memory | ✓ |
| Manage user accounts | ✓ |
| Configure system fee schedules | ✓ |
| View audit trail | ✓ |
| Override eligibility decisions | ✓ |

**Role: Staff**

| Permission | Access |
|-----------|--------|
| Create / edit associations | ✓ |
| Create / edit matters | ✓ |
| Upload governing documents | ✓ |
| Override extracted values | Limited (low-confidence values only; high-confidence requires admin) |
| Approve ledger versions | ✓ |
| Generate documents | ✓ |
| Download documents | ✓ |
| Access CondoClaw Memory | Read only |
| Manage user accounts | ✗ |
| Configure system fee schedules | ✗ |
| View audit trail | Own actions only |
| Override eligibility decisions | ✗ (Admin only) |

**Role: Viewer**

| Permission | Access |
|-----------|--------|
| View associations | ✓ |
| View matters | ✓ |
| View generated documents | ✓ |
| Download documents | ✓ |
| Upload documents | ✗ |
| Override any values | ✗ |
| Generate documents | ✗ |
| Access CondoClaw Memory | ✗ |
| View audit trail | ✗ |

**Permission notes:**
- Role is assigned per user, not per matter
- Future: per-association role scoping (a Staff user may be limited to specific associations)
- Every action that changes system state is logged regardless of role

---

### 17.8 AI Concierge — Execution Authority & Permission Model

The AI Concierge is an advisory and guidance system. It does **not** have autonomous execution authority over any action that changes matter state, generates documents, or modifies financial data. All such actions require explicit user confirmation.

**What the AI Concierge CAN do without user confirmation:**
- Retrieve and display information (matter data, deadlines, balances, audit history)
- Run calculations and surface the result for review
- Generate a document draft and present it — draft is not finalized until user approves
- Surface conflicts, warnings, flags, and recommendations
- Explain statutory requirements and timing rules
- Schedule internal reminders and deadline notifications

**What the AI Concierge CANNOT do without explicit user confirmation:**
- Finalize or send a generated document
- Advance the matter state machine (e.g., mark a NOLI as "Sent")
- Override an eligibility decision or validation block
- Approve or lock a ledger version
- Modify any Core Matter Variable value
- Execute a SunBiz sync and write the result to the association record
- Mark a stage complete

**Override permission by role:**

| Action | Admin | Staff | Viewer |
|--------|-------|-------|--------|
| Approve AI-drafted document | ✓ | ✓ | ✗ |
| Override eligibility block | ✓ | ✗ | ✗ |
| Override High Confidence extracted value | ✓ | ✗ | ✗ |
| Confirm statute type override | ✓ | ✗ | ✗ |
| Approve ledger version | ✓ | ✓ | ✗ |

**Design principle:** The AI Concierge must never act silently. Every recommendation that leads to a state change must be surfaced as a proposed action, explicitly approved by the user before execution. The user is always the decision-maker; the AI Concierge is always the advisor.

---

### 17.9 SunBiz Entity Matching — Confirmation Flow

The SunBiz `Pull from SunBiz` action (§13.5 Panel 4) must include an entity matching step before any data is written to the association record. Association names vary in registration and may match multiple entities.

**Flow:**

1. User clicks `Pull from SunBiz` on the Association detail page
2. System searches SunBiz using the association name as the query
3. System returns up to 5 matching entities, ordered by relevance score
4. Each match displays:
   - Registered entity name
   - Entity type (Condominium Association / HOA / Corporation)
   - Address
   - Registration status (Active / Inactive)
   - Relevance score (%)
5. User selects the correct match
6. System shows a confirmation panel with the full SunBiz data extracted:
   - Registered Agent name and address
   - Officers / Directors
   - Filing date and status
7. User confirms or edits individual fields before saving
8. Saved data is written to the association record with `sunbiz_synced: true` and `sunbiz_sync_date: [timestamp]`

**If no matches found:**
> "No SunBiz entity found matching [Association Name]. Try a partial name search or enter the entity registration number directly."

**If the selected entity is Inactive:**
> "This entity is listed as Inactive in SunBiz. The association may have been dissolved or re-registered. Please confirm before saving."

---

### 17.10 Audit Trail

The audit trail is not optional in legal workflows. Every action that changes system state must be logged — permanently, immutably, and with enough context to reconstruct what happened and why.

**Events that must be logged:**

| Event | Logged Fields |
|-------|--------------|
| Document uploaded | User · Timestamp · File name · File hash · Association / Matter linked |
| OCR extraction run | Timestamp · Extraction model version · Confidence scores · Extracted values |
| Variable value extracted | Variable name · Value · Source document · Page · Confidence score · Timestamp |
| Variable value overridden | Variable name · Original value · New value · Reason (required) · User · Timestamp |
| Eligibility decision made | Decision (Eligible / Conditional / Blocked) · Reason · Timestamp · Matter status at time |
| Eligibility decision overridden | Original decision · Override decision · Acknowledgment text · User · Timestamp |
| Ledger version created | Version label · Values snapshot · Triggering event · Timestamp |
| Ledger version approved | Version label · User · Timestamp |
| Document generated | Document type · Version · Ledger version used · User · Timestamp |
| Document downloaded | Document type · Version · User · Timestamp |
| Stage advanced | From stage · To stage · User · Timestamp · Timing check result |
| Fee applied (auto) | Fee type · Amount · Stage · Ledger version updated · Timestamp |
| Fee overridden | Fee type · Original amount · Override amount · Reason · User · Timestamp |
| SunBiz pull | Query · Match selected · Data imported · User · Timestamp |
| User role changed | User · From role · To role · Changed by · Timestamp |

**Audit trail rules:**
- No audit record may ever be deleted or modified after creation
- Audit records are append-only
- The audit trail is accessible to Admin users from the Matter detail page and Association detail page
- Each matter's audit trail is exported with any matter export (future feature)
- The audit trail is the primary defense against disputes about what data was used, when, and by whom

---

## 18. CondoClaw Memory — Dataset Schema & Intelligence Engine

### 18.1 Overview

CondoClaw Memory is not a document archive. It is a structured learning system. Every record stored in Memory must carry a complete data schema that enables the system to compare new documents, detect patterns, score confidence, surface corrections, and improve over time.

This schema is the data contract between the AI agent, the NLP layer, the validation engine, and the user. Every record that enters Memory — whether uploaded as training data, verified by a user, or generated by the system — must conform to this schema.

### 18.2 Minimum Dataset Schema

Every Memory record contains seven layers:

---

#### Layer 1 — Document

The raw input and its parsed form.

| Field | Type | Description |
|-------|------|-------------|
| `document_id` | UUID | Unique identifier for this memory record |
| `document_type` | Enum | `NOLA` / `affidavit` / `ledger` / `generated_notice` / `claim_of_lien` |
| `raw_text` | String | Full extracted text from the document |
| `structured_output` | JSON | All parsed variables and their values as extracted by NLP |
| `file_hash` | String | SHA hash of source file — used to detect duplicates |
| `source_matter_id` | UUID | The matter this document originated from |
| `created_at` | Timestamp | When this record was stored |

---

#### Layer 2 — Variable

All Core Matter Variables extracted from this document, with source attribution and per-variable confidence.

| Field | Type | Description |
|-------|------|-------------|
| `variables` | JSON Object | All Core Matter Variables (owner_name, mailing_address, total_amount_due, nola_date, etc.) |
| `variable_sources` | JSON Object | Per-variable source: `NOLA` / `ledger` / `affidavit` / `public_record` / `user_confirmed` |
| `variable_confidence` | JSON Object | Per-variable confidence score 0.0–1.0 |
| `variables_confirmed` | Boolean | Whether a user has confirmed the variable set |

---

#### Layer 3 — Validation

The results of cross-document validation and statute compliance checks run at intake.

| Field | Type | Description |
|-------|------|-------------|
| `conflicts_detected` | Array | List of conflict objects — each with variable name, value_a, source_a, value_b, source_b |
| `conflict_types` | Array | Enum values: `amount_mismatch` / `owner_mismatch` / `address_mismatch` / `date_conflict` / `missing_section` / `timing_violation` |
| `statute_compliance_score` | Float | 0.0–1.0 — degree of substantial compliance with applicable statute |
| `statute_type` | Enum | `718` / `720` / `617` |
| `eligibility_decision` | Enum | `eligible` / `conditional` / `blocked` |
| `validation_timestamp` | Timestamp | When validation was run |

---

#### Layer 4 — Outcome

What happened to this document after it was reviewed by a human.

| Field | Type | Description |
|-------|------|-------------|
| `approved_by_user` | Boolean | User clicked VERIFY or equivalent |
| `corrected_by_user` | Boolean | User modified extracted data before approval |
| `rejected` | Boolean | User rejected this document as unusable |
| `rejection_reason` | String | Free text reason if rejected |
| `final_version_used` | Boolean | Whether this record was used as the basis for a generated output |
| `outcome_timestamp` | Timestamp | When the outcome was recorded |

---

#### Layer 5 — Correction *(Most Important)*

The granular change log. Every correction is stored with its full before/after context. This is the human-in-the-loop feedback signal that makes the system smarter.

| Field | Type | Description |
|-------|------|-------------|
| `corrections` | Array | List of correction objects |
| `correction.field` | String | The variable or section that was changed |
| `correction.original_value` | Any | The value before correction |
| `correction.corrected_value` | Any | The value after correction |
| `correction.corrected_by` | Enum | `user` / `ai_suggestion` / `public_record` |
| `correction.correction_type` | Enum | `variable_value` / `missing_section` / `amount_discrepancy` / `owner_mismatch` / `address_error` / `date_error` / `statutory_language` |
| `correction.correction_reason` | String | Optional: why the correction was made |
| `correction.timestamp` | Timestamp | When the correction was made |

This layer feeds the system's pattern recognition. When the same correction type recurs across multiple records for the same association or statute, the system learns to flag that pattern automatically in future matters.

---

#### Layer 6 — Context

The contextual metadata that allows Memory to be filtered, grouped, and compared meaningfully.

| Field | Type | Description |
|-------|------|-------------|
| `association_name` | String | The association this document belongs to |
| `association_id` | UUID | Linked association record |
| `statute_type` | Enum | `718` / `720` / `617` |
| `workflow_stage` | Enum | `nola` / `first_letter` / `second_letter` / `claim_of_lien` / `foreclosure` |
| `matter_type` | Enum | `delinquency` / `foreclosure` / `lien_satisfaction` |
| `matter_id` | UUID | Reference to the source matter — enables drilling back to full matter context |
| `tags` | Array | User-applied tags (e.g., by association, by correction pattern) |

---

#### Layer 7 — Performance

The metrics that track how well this record has performed and contributed to the system.

| Field | Type | Description |
|-------|------|-------------|
| `similarity_score` | Float | How similar this record is to the new document being analyzed (computed at comparison time, not stored) |
| `confidence_score` | Float | Aggregate confidence across all extracted variables |
| `validation_result` | Enum | `pass` / `fail` / `conditional` |
| `correction_frequency` | Integer | How many times this record has been corrected or referenced in corrections |
| `downstream_success` | Boolean | *(Future)* Whether the matter using this record resulted in a successful lien or resolution |
| `drift_flag` | Boolean | Whether this record's patterns diverge significantly from recent approved examples |

### 18.3 Dataset Metrics Dashboard

The Memory page must display the following metrics — not just Pass Rate and Confidence:

| Metric | Description | Color |
|--------|-------------|-------|
| **System Pass Rate** | % of documents approved without correction | Green |
| **Average Confidence** | Mean confidence score across all variable layers | Blue |
| **Correction Rate** | % of records that required at least one user correction | Amber |
| **Rejection Rate** | % of records marked as rejected/unusable | Red |
| **Conflict Frequency** | Average number of conflicts detected per record | Amber |
| **Statute Compliance Score** | Mean compliance score across all validated records | Green / Red based on threshold |
| **Drift Detection** | Flag when recent records diverge from established patterns — indicates the system may need retraining | Red when triggered |
| **Model Improvement Rate** | *(Future)* Rate at which corrections are reducing repeat errors | Indigo |

### 18.4 Memory Actions — Full Specification

The current Memory page is missing the following actions. Each must be implemented:

| Action | Function | System Behavior |
|--------|----------|----------------|
| **Mark as Canonical** | Designate this record as the reference standard for its document type + statute + stage | Sets `canonical = true` · Prioritizes this record in all future comparisons of the same type |
| **Reject Example** | Remove a record from active use in comparisons | Sets `rejected = true` · Record is archived, not deleted · System stops using it for similarity scoring |
| **View Differences** | Compare this record against the current baseline | Opens side-by-side diff view showing statute baseline vs. this record — highlights deviations |
| **Apply Correction to System** | Propagate a correction to all similar records | Identifies records with the same original error · Prompts user to confirm bulk correction |
| **Promote to Template** | Elevate a record to an official document template | Adds to Document Generation template library · Available for selection in generation engine |
| **Compare Against Active Matter** | Run a similarity comparison between this record and the current active matter | Returns match score, section-by-section diff, and any flags |
| **Re-run Validation** | Re-apply the current validation engine against this record | Useful when statute rules are updated or NLP model is retrained |
| **Tag by Association** | Apply an association-specific tag to this record | Enables filtering by association in dataset view |
| **Tag by Statute** | Apply a statute type tag (718 / 720) | Enables statute-based filtering |
| **View Learning Impact** | Show how many matters have been influenced by this record | Displays: times used in comparisons, times flagged as reference, correction propagations triggered |

### 18.5 Memory Filters — Full Specification

The current filter is search-only. The following filters must be added:

| Filter | Options |
|--------|---------|
| **By Association** | Dropdown — all associations in the system |
| **By Statute** | 718 · 720 · 617 · Unclassified |
| **By Document Type** | NOLA · Affidavit · Ledger · Generated Notice · Claim of Lien |
| **By Outcome** | Approved · Corrected · Rejected · Pending Review |
| **By Confidence Range** | Slider: 0%–100% · Common presets: High (>85%) / Medium (60–85%) / Low (<60%) |
| **By Correction Frequency** | Never corrected · Corrected once · Corrected multiple times |
| **By Stage** | NOLA · First Letter · Second Letter · Claim of Lien |
| **By Date Range** | Date picker for `created_at` |
| **Canonical Only** | Toggle — show only records marked as canonical |
| **Drift Flagged** | Toggle — show only records where `drift_flag = true` |

### 18.6 Learning States

Every Memory record must be classified into exactly one learning state at all times. This state determines how the system uses the record in comparisons, validations, and document generation.

| State | Meaning | System Behavior |
|-------|---------|----------------|
| **Approved** | Verified by a user — no corrections needed | Used as positive training signal · High weight in similarity comparisons |
| **Corrected** | Approved after user corrections | Used as training signal · Correction Layer populates pattern recognition |
| **Flagged** | Identified as potentially problematic | Used with reduced weight · Surfaces as a warning example in comparisons |
| **Rejected** | Removed from active use — unusable | Archived only · Not used in comparisons · Never deleted |
| **Canonical** | Designated as the reference standard for its type + statute + stage | Highest priority in comparisons · Used as template baseline |
| **Experimental** | New record not yet validated — awaiting human review | Used in comparisons with explicit "experimental" label · Not used in generation templates |

State transitions:
```
Experimental → Approved (user verifies)
Experimental → Corrected (user corrects then approves)
Experimental → Rejected (user rejects)
Approved → Canonical (user promotes)
Approved → Flagged (system or user flags)
Corrected → Canonical (user promotes after correction)
Flagged → Rejected (user confirms rejection)
Flagged → Approved (user clears flag)
```

### 18.7 Learning Mechanisms

The system does not learn from documents. **It learns from validated outcomes, corrections, and conflicts.** Five mechanisms drive this learning:

---

#### Mechanism 1 — Similarity Matching

**What it does:** Compares a new matter's documents and variables against prior approved Memory records.

**Process:**
1. Embed the new document using the same model as the Memory dataset
2. Retrieve the top-N most similar records (filtered by statute type + document type + association when available)
3. Return similarity scores and section-by-section differences
4. Surface results in the AI Concierge and Matter Intelligence Panel

**Output to AI Concierge:**
> "This NOLA matches 91.4% of prior approved NOLAs for Pine Ridge Condominium. The mailing section differs — prior approved versions include certified mail tracking language that is absent here."

---

#### Mechanism 2 — Conflict Learning

**What it does:** Tracks recurring discrepancies across records to identify systemic failure patterns.

**Process:**
1. Every conflict stored in the Validation Layer (Layer 3) is indexed by `conflict_type` + association + statute
2. When the same `conflict_type` appears in 3+ records for the same association, the system flags it as a **known pattern**
3. On new intake, the system proactively checks for known patterns before running full validation
4. The AI Concierge warns: "This association has a recurring amount mismatch between NOLA and ledger — checking now"

---

#### Mechanism 3 — Correction Learning *(Highest Priority)*

**What it does:** Every user correction updates the system's understanding of what is correct — not just for this record, but for future records of the same type.

**Process:**
1. Every correction is stored in Layer 5 with `correction_type`, `original_value`, and `corrected_value`
2. Corrections are aggregated by `correction_type` + statute + stage
3. When a new document is analyzed, the system checks whether any variable values match known `original_value` patterns that have been corrected before
4. If a match is found, the system proactively flags the value: "This amount format has been corrected in 4 prior matters — suggesting review"

**Variable weight updates:** Correction frequency increases the weight given to human-verified values over NLP-extracted values for that variable type.

---

#### Mechanism 4 — Statute Alignment

**What it does:** Constrains all learning within the statutory baseline. Training data cannot override statute compliance.

**Rule:** A Memory record may have a high similarity score and be user-approved — but if it contains language that does not meet substantial compliance with the applicable statute, it must not be used to generate new documents.

**Process:**
1. Every record's `statute_compliance_score` (Layer 3) is checked before the record is used in generation
2. Records with `statute_compliance_score` below threshold (default: 0.85) are flagged — they can be used for comparison but not as generation templates
3. The statutory baseline (Section 10) is the floor — Memory cannot pull the system below it

---

#### Mechanism 5 — Feedback Loops

Three types of feedback signal flow into Memory:

**Explicit Feedback** *(highest signal)*
- User corrections — direct error identification, highest learning weight
- Manual variable overrides — user asserting ground truth
- Flag and Reject actions — negative learning signals

**Implicit Feedback** *(medium signal)*
- Documents accepted without any edits — positive reinforcement
- Generated documents downloaded without revision — implicit approval
- Matter successfully closed after using a given template — downstream success signal *(future)*

**System Feedback** *(baseline signal)*
- Validation conflicts detected at intake — flags potential problem patterns
- Baseline deviations — documents that differ from statute baseline trigger pattern logging
- Drift Detection — when recent approved records diverge from older established patterns, the system flags potential model drift requiring human review

### 18.8 AI Concierge Integration with Memory

The AI Concierge must reference Memory in every validation step. Memory is not an optional lookup — it is part of the standard reasoning process.

**At every validation step, the AI Concierge must:**
- Surface the top similarity matches from Memory with their scores
- Identify which prior approved examples the current document differs from
- Explain why a document is flagged by referencing specific prior examples
- Distinguish between: "this differs from prior examples" vs. "this violates the statute"

**Example AI Concierge responses:**

> "This mailing affidavit scores 88.3% similarity against prior approved affidavits. The difference is in the notary block — prior approved versions include the notary's commission expiration date, which is absent here."

> "The NOLA language in Section 3 has been flagged. In 6 of 8 prior matters for Oak Hollow HOA, this section was corrected to include the cure period reference. Would you like me to apply that correction?"

> "CondoClaw Memory contains 3 canonical examples for Chapter 720 Intent to Lien letters. This draft matches the structure of canonical example #2 at 96.1%. One deviation detected: the statutory citation references §720.3085 but prior approved versions for this association use §720.3085(2)(b). Recommend updating."

**What the AI Concierge learns from:**
- Every correction the user makes (Correction Layer)
- Every document approved without edit (Outcome Layer)
- Every conflict the validation engine detects (Validation Layer)
- Every document rejected by the user (Outcome Layer — negative signal)

### 18.9 Non-Negotiable Rule

> **CondoClaw Memory improves the system, but it never overrides statutory compliance.**

This rule has three implications:

1. **Memory is advisory, statute is mandatory.** A Memory record with a high similarity score and a "Canonical" learning state does not automatically make a document valid. The statute baseline (Section 10) is checked independently. If a document passes Memory comparison but fails the statute check, it is flagged — not approved.

2. **Training data cannot teach the system to be non-compliant.** If user-approved training data contains language that does not meet substantial compliance, that record's `statute_compliance_score` is below threshold and it cannot be promoted to a generation template. The user is notified.

3. **The correction hierarchy is: Statute > Public Record > User Correction > NLP Extraction.** When sources conflict, the system resolves in this order. Memory records inherit this hierarchy — a record containing a variable value that conflicts with the statute or a verified public record is automatically flagged regardless of its learning state.

### 18.9.1 Banned Learning Sources

The Alpha Learning Loop must never ingest data from the following sources. Ingesting from these sources poisons the dataset and is explicitly prohibited.

| Banned Source | Reason |
|---------------|--------|
| Rejected documents | User explicitly rejected this output — treating it as training data teaches the wrong pattern |
| Documents superseded by corrected versions | If a v1 draft was replaced by a v2 correction, only v2 may be learned from — not v1 |
| Documents tied to overridden statute classifications | If the statute was later changed (e.g., matter reclassified from 718 to 720), any documents generated under the prior classification are invalidated as training data |
| Documents generated from stale ledgers | If the pre-generation ledger verification gate (§16.11) was skipped or overridden, the resulting document cannot be used for learning |
| Documents where compliance certification failed | If the compliance check at the lien stage returned a failure or partial result, that document is contaminated and must not enter the learning pool |
| Documents generated under manual eligibility override | If the user bypassed a `Blocked` eligibility decision, the output may not represent valid legal practice and must not be learned from without explicit admin approval |
| Documents from matters later identified as using wrong association type | If an HOA matter was incorrectly processed as a Condominium matter, all generated documents from that matter are invalid training data |

**Implementation requirement:** Every document in `memory_dataset` must carry a `learning_eligible` boolean field. Before any document is promoted from `raw` to `reviewed` learning state, the system must automatically evaluate all banned-source conditions and set `learning_eligible = false` if any apply. An Admin may manually override with explicit acknowledgment, logged to the audit trail.

### 18.10 What This Enables

| Capability | How |
|------------|-----|
| Pattern learning | Correction Layer + Conflict Learning accumulate — recurring errors auto-flagged on future intake |
| Association-specific intelligence | Context Layer filters isolate comparisons to the same association |
| Statute-constrained training | Statute Alignment mechanism prevents non-compliant training data from polluting generation |
| Learning state progression | Records graduate from Experimental → Approved → Canonical as they accumulate validation |
| Drift detection | Performance Layer flags divergence from established patterns — signals retraining need |
| Template promotion | Canonical records become the authoritative starting point for Document Generation |
| Feedback-driven accuracy | Three feedback loop types continuously improve NLP confidence and variable weighting |

---

### 18.11 Alpha Learning Loop — Self-Improvement Engine

The Alpha Learning Loop is the continuous cycle that drives all improvement in CondoClaw Memory. It runs on every document generation and user interaction.

```
Generate → Evaluate → Score → User Feedback → Learn → Reinforce → (repeat)
```

---

**Step 1 — Generate**

System creates a ledger, letter, or lien using:
- Statutory baseline templates (always active)
- Firm-specific dataset (if available — prioritized for formatting and structure)

---

**Step 2 — Evaluate**

AI compares the generated output against:
- Historical successful documents in Memory (same type + statute + association)
- Statutory rules for Chapter 718 or 720
- Firm-specific formatting and language patterns

---

**Step 3 — Score**

Each output receives three scores before it is shown to the user:

| Score | What It Measures |
|-------|----------------|
| **Confidence Score** | How certain the system is about the extracted values used |
| **Similarity Score** | How closely the output matches prior approved examples (%) |
| **Compliance Score** | Whether the output satisfies all statutory requirements for the locked statute |

All three scores are shown to the user in the document generation panel before approval.

---

**Step 4 — User Feedback**

User may:
- **Approve** — document is accepted as-is; positive signal recorded
- **Edit then Approve** — user modifies content, then approves; edits logged as corrections
- **Reject** — document discarded; rejection reason logged

---

**Step 5 — Learn**

System updates the dataset after every feedback action:
- Approval → record promoted (Experimental → Approved) · Positive weight to its patterns
- Edit → correction stored in Correction Layer with `original_value` vs. `corrected_value` · "This is how this firm does it"
- Rejection → record archived as Rejected · Negative weight; pattern avoided in future

---

**Step 6 — Reinforce**

Future outputs for the same firm, association, and document type are biased toward:
- Approved patterns (higher similarity weight)
- Corrected structures (automatic application of prior corrections)
- Away from rejected patterns (negative reinforcement)

The loop runs indefinitely. Each matter makes the system more accurate for the next one.

---

### 18.12 Dataset Types & Architecture

CondoClaw Memory stores five distinct dataset types. Each drives a different aspect of learning.

| Dataset | What It Stores | How It's Used |
|---------|---------------|---------------|
| **Template Dataset** | First Letter formats, Second Letter formats, Claim of Lien structures | Document generation templates, similarity comparison |
| **Ledger Dataset** | Historical Excel ledger structures, column layouts, field mappings, calculation patterns | Ledger generation that mirrors the firm's existing format |
| **Outcome Dataset** | Successful liens, rejected documents, accepted letters | Positive and negative reinforcement signals for the learning loop |
| **Correction Dataset** | User edits, value overrides, fee and interest adjustments, formatting corrections | Correction Learning (§17.7 Mechanism 3) — highest priority signal |
| **Association Dataset** | Governing documents, extracted interest rules, fee structures, custom practices | Association-specific rule application across all matters |

These five datasets are the architecture behind the 7-layer Memory schema (§17.2). Each record in Memory belongs to one or more of these dataset types.

---

### 18.13 Dataset Quality Metrics

The system must track the quality of its own dataset at all times. Poor quality data produces poor outputs — and the system must surface this transparently.

| Metric | Definition | Why It Matters |
|--------|-----------|---------------|
| **Success Rate** | % of generated documents approved without any user edits | High = system has learned the firm's preferences well |
| **Correction Frequency** | How often users modify outputs before approving | High = system is generating outputs that need adjustment; low = it has adapted |
| **Pattern Stability** | Whether the firm uses consistent formats across matters | Low stability = firm is inconsistent; system should surface this |
| **Statutory Compliance Rate** | % of outputs that pass all statutory checks without manual fixes | High = statute engine is correctly calibrated |
| **Confidence Calibration** | Are high-confidence outputs actually accepted without edit? | Detects miscalibration — if High Confidence outputs are frequently corrected, calibration is off |

These metrics are displayed on the CondoClaw Memory page and reviewed by the AI Concierge when dataset quality drops below thresholds.

**AI Concierge message when success rate drops:**
> "Your document approval rate has dropped to 61% over the last 20 matters. This suggests a pattern shift. Would you like me to re-analyze recent corrections and update the template dataset?"

---

### 18.14 Template Intelligence — Baseline + Custom Hybrid

CondoClaw uses a hybrid model for document generation that combines statute-mandated baseline content with firm-specific learned preferences.

**Baseline Templates (System Default)**
- Legally compliant structure per statute (718 or 720)
- Required statutory language, disclosures, and citations
- Generic formatting and neutral language
- Always present — cannot be disabled or replaced

**User Templates (Learned from Dataset)**
- Firm-specific formatting preferences
- Preferred phrasing and tone
- Structural conventions (header layout, signature block, paragraph order)
- Learned from the firm's uploaded and approved prior documents

**Hybrid Behavior:**

When a user dataset exists for this document type:
1. System uses the user's format as the structural template
2. Fills in required statutory language from the baseline engine
3. Surfaces any conflict between user template and statutory baseline (see §18.15)
4. User format is applied everywhere the statute permits flexibility
5. Statute is enforced everywhere it is mandatory

When no user dataset exists:
1. System uses the generic statutory baseline template
2. AI Concierge prompts: "No prior [Letter 1] examples found for this firm. Upload prior approved letters to personalize future outputs."

---

### 18.15 Template Conflict Resolution Engine

When a user's template structure conflicts with statutory requirements, the system must resolve the conflict — not silently override either source.

**Conflict Tier 1 — Minor Issue (Suggestion)**

The deviation does not affect legal validity but differs from statutory best practice.

System behavior: Suggest improvement without blocking.

> "Your Letter 1 template omits the cure period reference in the closing paragraph. Prior approved Chapter 720 letters typically include this language. Add it?"

---

**Conflict Tier 2 — Major Legal Issue (Warning)**

The deviation may affect the document's validity or compliance with the applicable statute.

System behavior: Surface a clear warning. User must acknowledge before proceeding.

> "This Letter 1 format does not include the statutory cure period disclosure required under §720.3085(2)(b). Documents without this language may not support a valid Claim of Lien. Do you want me to add the required language, or proceed without it?"

---

**Conflict Tier 3 — Critical Violation (Block or Override)**

The deviation violates a mandatory statutory requirement. The document cannot be considered compliant if generated as-is.

System behavior: Block generation. Admin override available with mandatory acknowledgment.

> "This Claim of Lien format is missing required statutory language under §718.116. Generation is blocked. An Admin can override with a written acknowledgment that the document may not be enforceable."

---

### 18.16 Ledger Learning System

The ledger is one of the most variable documents across law firms. Each firm has its own preferred Excel structure — column order, naming conventions, calculation layout, fee breakdown style. CondoClaw learns these preferences and mirrors them.

**What the system learns from uploaded historical ledgers:**
- Column header names (e.g., "Principal" vs. "Assessments Due")
- Column order and grouping
- Fee breakdown structure (combined vs. line-by-line)
- Interest calculation display (formula shown vs. total only)
- Running balance format
- Footer / totals block layout
- Font size, bold conventions, color usage *(pattern recognition, not hard-coded)*

**Behavior after 3+ approved ledger examples from the same firm:**

> "I've detected a consistent ledger format across your prior matters. Future ledger generation will mirror your preferred structure. You can update this at any time from the Memory page."

**Why this matters:**

The product adapts to how each firm already works — instead of forcing them to adapt to the system. This reduces adoption friction and makes the system feel like it was built for that firm specifically.

---

### 18.17 Gold Standard Training Mode

Users can explicitly designate specific documents as the authoritative reference — the Gold Standard — for their firm.

**How to designate a Gold Standard document:**
1. Open any approved document from the Documents page
2. Click `Designate as Gold Standard`
3. Select the document type (Letter 1 / Letter 2 / Claim of Lien / Ledger)
4. Optionally add a label: "Correct Chapter 720 Letter 1 Format"
5. System marks the record with `Learning State: Canonical`

**System behavior for Gold Standard documents:**
- Used as the **primary reference** in all future similarity comparisons for that document type
- All future generations start by mirroring the Gold Standard structure
- Similarity scores are measured against the Gold Standard first
- The AI Concierge references the Gold Standard when flagging deviations:

> "This Letter 2 deviates from your Gold Standard at two points: (1) the demand paragraph uses different cure period language, and (2) the statutory citation references §720.3085 instead of §720.3085(2)(b). Would you like me to apply your Gold Standard format?"

**Multiple Gold Standards:**
A firm may designate different Gold Standards for each combination of document type + statute type (e.g., one Gold Standard for 718 Letter 2, a different one for 720 Letter 2).

---

### 18.18 Intelligent Document Generation Output Format

Every generated document must be delivered with an intelligence layer — not just the document itself.

**Output format:**

```
┌─────────────────────────────────────────────────────────┐
│  [Document Type] — [Version] — [Date]                    │
├─────────────────────────────────────────────────────────┤
│  Confidence Score:     94%  ██████████░  High            │
│  Similarity Score:     91%  █████████░░  vs. Gold Std    │
│  Compliance Score:    100%  ██████████   Chapter 720 ✓   │
├─────────────────────────────────────────────────────────┤
│  Flags (0):           None detected                      │
│  Dataset Referenced:  Gold Standard Letter 2 (v3)        │
│  Association Rules:   18% interest (Declaration, p. 12)  │
├─────────────────────────────────────────────────────────┤
│  [Approve]  [Edit & Approve]  [Reject]                   │
└─────────────────────────────────────────────────────────┘
```

**Fields explained:**

| Field | Meaning |
|-------|---------|
| Confidence Score | Certainty of underlying extracted variables |
| Similarity Score | % match to prior approved / Gold Standard for this type |
| Compliance Score | % of statutory requirements satisfied |
| Flags | Any deviations, conflicts, or missing elements — with severity |
| Dataset Referenced | Which Memory record(s) influenced this output |
| Association Rules | Which association-specific rules were applied (interest rate, fee structure) |

---

### 18.19 Learning-Enhanced Audit Trail

The audit trail (§16.9) must be extended to capture learning provenance — not just what happened, but what the system was thinking when it happened.

**Additional learning provenance fields for each document generation event:**

| Field | Description |
|-------|-------------|
| `dataset_referenced` | ID(s) of Memory records that influenced this output |
| `gold_standard_used` | Whether a Gold Standard document was the primary reference |
| `similarity_score_at_generation` | The similarity score at the moment the document was generated |
| `compliance_score_at_generation` | The compliance score at the moment of generation |
| `flags_at_generation` | Any flags detected before user approval |
| `user_action` | Approved / Edited / Rejected |
| `corrections_applied` | Summary of user edits (before → after for each changed field) |
| `learning_state_update` | What state the Memory record moved to as a result of user action |

**Why this is legally defensible:**

If a lien is challenged, the firm can show:
- The exact document that served as the reference for this output
- That the output was validated against statute before generation
- That the user reviewed it and explicitly approved it
- Exactly what the user changed (if anything) and why
- The statutory compliance score at the time of approval

This turns the learning system into a **litigation support asset**.

---

### 18.20 The North Star — What All of This Builds Toward

Every subsection of this section — the dataset schema, the learning states, the Alpha Learning Loop, the template intelligence, the ledger learning, the Gold Standard training mode, the conflict resolution engine, the intelligent output format, the learning-enhanced audit trail — exists for one purpose:

> **CondoClaw generates approximately 99% of every letter, ledger, and lien automatically. The user reviews and corrects. Every correction makes the next output better.**

**The generation sequence:**

1. System extracts all available data — NOLA, ledger, mailing affidavit, declaration
2. System builds a statute-compliant baseline document (Chapter 718 or 720)
3. System refines it using the firm's prior approved letters, ledgers, and liens
4. System cross-checks variables, calculations, and statutory requirements via the AI Validation Layer
5. System scores the output (Confidence / Similarity / Compliance) and surfaces any flags
6. User receives a near-complete draft — not a blank page

**The user's only job: say what is right or wrong.**

**The learning progression:**

| Matter Count | Expected Behavior |
|-------------|------------------|
| Matter 1–5 | Baseline output; user may make several corrections; system begins learning |
| Matter 6–20 | Fewer corrections; firm-specific patterns established in Memory |
| Matter 21–50 | System mirrors firm's format reliably; corrections become rare |
| Matter 50+ | System generates the right document on the first try for most matters |

This is not a feature. It is the promise the entire architecture is designed to keep.

---

### 18.21 Baseline Mode — Full Functionality Without a User Dataset

> **The system must be fully functional before it learns.**
>
> The baseline is not a fallback. It is the system's foundation of truth.

Without this guarantee, the product fails at first use. Users won't trust outputs. Learning never properly initializes. With it: immediate value on day one, smooth onboarding, and a solid foundation for long-term improvement.

---

#### 17.21.1 Core Principle

The system must be able to generate statute-compliant, legally usable, professionally formatted outputs for all four core document types — with zero user-provided examples:

- Excel Ledger (baseline normalized)
- First Letter (statute-compliant, Chapter 718 or 720)
- Second Letter (statute-compliant)
- Claim of Lien (statute-compliant)

This ensures immediate usability on day one, before any firm-specific dataset has been built.

---

#### 17.21.2 Baseline Mode — Document Behavior

**A. Baseline Excel Ledger**

The system normalizes the uploaded association ledger into a structured Excel workbook (§12) and applies:
- Principal balance from uploaded ledger
- Interest — if declaration is available, uses extracted rate; if not, applies 0% and flags
- Late fees — if declaration is available, uses extracted rule; if not, uses amounts from uploaded ledger
- Attorneys' fees and costs — applies stage-triggered fee schedule (§15)

The baseline ledger must be clear, auditable, and internally consistent. It must be recognizable to the user as an accurate representation of the matter's financial state.

**B. Baseline Letters and Lien**

Each document is generated using:
- Correct statutory template for the locked statute (Chapter 718 or 720)
- All required statutory language, disclosures, and citations
- Core Matter Variables extracted from NOLA, ledger, and affidavit
- Neutral, professional legal language
- Internal consistency with the baseline ledger

Baseline documents must be **legally usable** — not approximate outputs that require heavy rewriting. They must satisfy substantial compliance with the applicable statute, standing alone, before any user data is applied.

**C. Statutory Defaults for Missing Data**

When required data is missing, the system applies safe defaults and flags each one via the AI Concierge:

| Missing Data | Default Applied | AI Concierge Message |
|-------------|----------------|---------------------|
| Interest rate (no declaration) | 0% — not applied | "No declaration found. Interest not applied. Upload Declaration to enable interest calculation." |
| Late fee rule (no declaration) | Amount from uploaded ledger, if present | "Late fee sourced from uploaded ledger. Upload Declaration to validate against governing documents." |
| Mailing address (no affidavit) | Address from NOLA | "No mailing affidavit found. Using address from NOLA. Upload affidavit to confirm mailing." |
| Statute type (unknown) | Blocked — no document generated | "Association type must be confirmed before documents can be generated. Is this Chapter 718 or 720?" |

No silent defaults. Every default is logged in the audit trail and surfaced to the user.

---

#### 17.21.3 Priority Hierarchy — The Law of the System

This is the single most important rule governing all document generation. It applies at all times, in all modes.

```
Priority 1 — Statute (Chapter 718 / 720)          ← ALWAYS HIGHEST — cannot be overridden
Priority 2 — Verified Data (ledger, NOLA, affidavit, public record)
Priority 3 — Baseline System Logic (calculations, defaults, statutory templates)
Priority 4 — User Dataset (format, style, language preferences)
```

**What this means:**

- User data can **refine** format, structure, and language
- User data **cannot override** statutory compliance
- If a user's prior document contains language that violates the statute, that language is flagged and not applied (§18.15 Conflict Resolution Engine)
- If a calculation from the user's dataset conflicts with the system's deterministic baseline, the baseline is used and the conflict is surfaced

This hierarchy is enforced by the Statute Alignment mechanism (§17.7, Mechanism 4) and the Template Conflict Resolution Engine (§18.15).

---

#### 17.21.4 AI Concierge Behavior — Cold Start

When the system is operating in Baseline Mode (no user dataset), the AI Concierge must actively guide the user with transparent prompts at every step.

**At document generation:**
> "Using baseline statutory format for Chapter 720. No prior Letter 1 examples found for this firm. Upload prior approved letters to customize future outputs."

**At ledger generation:**
> "No declaration uploaded for [Association Name]. Interest has not been applied. Upload the Declaration to enable interest calculation and late fee validation."

**At intake (no affidavit):**
> "No mailing affidavit found. The mailing address has been sourced from the NOLA. Upload a mailing affidavit to confirm proof of service before generating documents."

**After first user correction:**
> "Correction recorded. I've updated the dataset for this firm. Future Letter 1 drafts will incorporate this change."

**After sufficient corrections to trigger learning:**
> "You've now approved 5 documents for this firm. I'm beginning to adapt outputs to your preferred format. Upload additional prior letters and ledgers to accelerate this process."

---

#### 17.21.5 Baseline Quality Standard

Baseline outputs are not rough drafts. They are the system's unassisted best effort — and that effort must meet a high standard.

Every baseline output must be:

| Requirement | Standard |
|-------------|---------|
| Legally usable | Satisfies substantial compliance with Chapter 718 or 720 independently |
| Internally consistent | All amounts, dates, names, and addresses match across ledger and document |
| Professionally formatted | Reads as a firm-quality legal document; not a generic template |
| Minimal correction required | A competent attorney should need only minor edits, if any, on a clean matter |
| Fully flagged | Every assumption, default, or missing value is surfaced in the AI Concierge — nothing is silent |

This quality standard is what earns user trust on day one. A system that produces poor baseline outputs will never be trusted, and learning will never begin.

---

#### 17.21.6 Learning Trigger — When the System Switches Modes

The system transitions from **Baseline Mode** to **Adaptive Mode** when either of the following occurs:

| Trigger | What Happens |
|---------|-------------|
| User uploads prior letters, ledgers, or liens | System runs similarity analysis against baseline outputs; begins incorporating firm patterns |
| User makes first correction to a generated output | System records the correction in the Correction Dataset; begins applying it to future similar documents |

The transition is automatic and transparent. The AI Concierge notifies the user:
> "I've detected your prior document format. Future outputs will begin adapting to your firm's style."

Once in Adaptive Mode, the system never abandons the Priority Hierarchy — statute always wins. The firm's preferences are layered on top of compliance, never instead of it.

---

## 19. UI/UX Requirements

### 19.1 Global Layout

The application uses a fixed four-panel layout at all times:

| Panel | Position | Description |
|-------|----------|-------------|
| Left Sidebar | Fixed left | Navigation, logo, user profile |
| Top Bar | Fixed top | Search, system status, notifications, user |
| Main Content | Center, scrollable | Active page content |
| AI Concierge | Fixed right (384px) | Persistent chat panel |

The AI Concierge panel is **always visible** regardless of which page is active. It is the persistent intelligence layer — the user is never without it.

### 19.2 Design System

**Color palette:**
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1F6F5C` | Sidebar, active states, buttons |
| Accent | `#F2C94C` | CTA buttons, logo background, highlights |
| Success | Green | Completed stages, verified documents |
| Warning | Amber | Pending states, medium priority |
| Danger | Red | High priority deadlines, errors |
| Info | Blue | Neutral information |

**Typography:** Public Sans — bold headings, small-caps labels, consistent scale from xs to 3xl.

**Interaction patterns:**
- Hover states on all cards and rows
- Animated loading states (spinners, progress bars, pulsing dots)
- Drag-and-drop file inputs with live feedback
- Copy-to-clipboard with confirmation flash
- Stage progress with pulse animation on active step

### 19.3 Left Sidebar

Dark green background (`#1F6F5C`). Contains:
- **Logo** — CondoClaw name + "AI Concierge" tagline in a yellow accent square
- **Navigation items** — icon + label, active state highlighted
- **Settings** — bottom of sidebar
- **User profile card** — "Della Street / Admin Access" with avatar

Navigation order:
1. Dashboard
2. Document Generation
3. Associations
4. Unit Owners
5. Schedule
6. Documents
7. CondoClaw Memory
8. Reports

### 19.4 Top Bar

64px height, white with bottom border. Contains:
- **Search** — full-text search across matters, owners, documents
- **System status badge** — green pulsing dot + "System: Online / Synced"
- **Notification bell** — red dot indicator for pending alerts
- **User identity** — name + circular avatar

### 19.5 Dashboard Page

The primary workspace. All matter intake, pipeline control, and document output happen here.

#### Active Matter Header
Displays the currently active matter: e.g., `#CC-8921: Pine Ridge Delinquency`.

#### New Matter Intake + NLP Review Panel
Three drag-and-drop upload zones side by side:

| Zone | Accepts | Success State |
|------|---------|---------------|
| NOLA (PDF) | `.pdf` | "Structured Data Extracted" badge |
| Ledger (Excel/PDF/Word) | `.pdf .docx .xlsx .xls .csv` | "Tables Parsed" badge |
| Mailing Affidavit (PDF) | `.pdf` | "Text Extracted" badge |

During parsing: animated progress bar. On completion: green checkmark, badge appears.

Top-right of the panel: **AlphaCondor Review** button — opens the human-in-the-loop review panel.

#### AlphaCondor Review (Human-in-the-Loop)
Shown after parsing. Displays extracted entities per document:
- File name and document type
- Similarity percentage vs. CondoClaw Memory
- Extracted entity grid (owner name, unit number, balance, dates, etc.)
- **VERIFY** button (green) — confirms extraction and stores to CondoClaw Memory
- **CORRECT** button (gray) — opens editable JSON view for manual correction

#### Primary Action Button
Yellow CTA button below the upload panel. Label evolves with pipeline state:
- "RUN AI CONCIERGE — NEXT: BUILD LEDGER"
- "PROCEED TO STAGE X"
- "FINALIZE MATTER"

Button is **disabled** until all required files are uploaded.

#### 5-Stage Pipeline Tracker
Horizontal progress bar with five labeled nodes:

| Stage | Label |
|-------|-------|
| 1 | Review Documents |
| 2 | Build Ledger |
| 3 | Verify Owner |
| 4 | Draft Document |
| 5 | Ready for Review |

Status per node: completed (green circle + checkmark), active (pulsing blue), pending (light gray).

#### Bottom Two-Column Area

**Left — Upcoming Deadlines:**
- Priority-colored left border (red = urgent, yellow = medium, blue = low)
- Task title, association, time/date
- Action label (e.g., "Verify Ledger", "AlphaCondor Review")

**Right — Generated Documents / Queue:**
- Table: Document name, Status badge, Actions (View / Download / Flag)
- Status values: Pending Review, Verified, In Queue, Archived
- "View All Queue" link

### 19.6 AI Concierge Panel (Right Sidebar)

Always visible. Width: 384px. **This is not a chat panel — it is the persistent intelligence and control layer of the system.**

The AI Concierge panel must function across every page without the user navigating. A user on the Schedule page can type "Generate the first letter for matter #CC-8921" and the AI generates it, stores it to the Matter Object, and confirms — all without leaving the Schedule page.

**Header:**
- AI icon in primary-colored square
- "AI Concierge" title + status indicator ("System Synced" / "Accessing Memory..." / "Running Verification...")
- Settings gear icon

**Next Best Action bar (below header):**
- Always-visible single-line recommendation: *"Ready to generate First Letter for Pine Ridge · Unit 402 — cure period expired Apr 19"*
- One-click execute button

**Message Thread:**
- AI messages — left-aligned with icon bubble, markdown rendered, timestamp
- Each AI message may include a **CondoClaw Logic** reasoning box — dark callout card explaining the system's reasoning, the sources consulted, and the action taken
- User messages — right-aligned, primary color background, timestamp
- Typing indicator — three animated bouncing dots

**AI Concierge reacts to all system events automatically (not just dashboard):**
- When a file is parsed → summarizes extracted entities and surfaces conflicts immediately
- When a pipeline stage advances → explains what's required next and the timing constraint
- When a deadline approaches → proactive reminder with the eligible date and suggested action
- When a Memory comparison completes → surfaces similarity score and what was flagged
- When a correction is made → acknowledges, updates the Matter Object, logs to Memory

**Action execution from the panel:**
The AI Concierge can execute the following from chat, regardless of which page the user is on:
- Generate a document for the current stage
- Trigger intake validation
- Schedule a deadline
- Update a Core Matter Variable (with user confirmation)
- Run a web verification search
- Navigate to a specific page or matter

**Input:**
- Large textarea — placeholder: *"Ask The Condor about statutes, ledgers, or NOLA compliance..."*
- Send button (primary color, arrow icon)
- Footer badge: "Secured by CondoClaw Intelligence"

### 19.7 Document Generation Page

Two-column layout.

**Left column — Active Matters List:**
Each row shows owner name, unit number, and current legal stage badge:
- Intent to Lien (amber)
- Statutory Notice (blue)
- Foreclosure (red)

Selecting a row highlights it with a border and loads the right column.

**Right column — Legal Workflow Timeline:**
When a matter is selected, displays a vertical 4-step legal workflow:

| Step | Name | Description |
|------|------|-------------|
| 1 | First Letter (Statutory Notice) | 30-day notice of delinquency per FL Statute 718 |
| 2 | Second Letter (Intent to Lien) | 45-day notice of intent to record a claim of lien |
| 3 | Claim of Lien | Formal recording of lien against the property |
| 4 | Foreclosure Referral | Final referral to legal counsel |

Status per step: completed (green), current (pulsing dark green), pending/locked (gray).

Action buttons per step: "Download PDF" (completed), "Generate Draft" (current), "Locked" (pending).

**CondoClaw Intelligence Panel (bottom of right column):**
- Dark background
- AI recommendation text based on delinquency stage
- Statutory citation (e.g., FL Statute 718.116)
- Suggests immediate next action

### 19.8 Associations Page

Placeholder — not yet built. Coming soon.

### 19.9 Unit Owners Page

**Header:** Title, search input, "Add Owner" button.

**Statistics row (4 cards):**
- Total Owners
- Leased Units
- Owner Occupied
- Pending Updates

**Owner Table:**

| Column | Content |
|--------|---------|
| Owner & Property | Initials avatar, owner name, address, unit number |
| Association | Association name |
| Assessments | Monthly amount ($X.XX/mo) |
| Occupancy | "Owner Occupied" (green) or "Leased" (amber) |
| Actions | Copy (clipboard), View (eye), Flag (alert) |

- Live search across name, unit number, association
- Data loads from `/api/unit-owners`
- Loading state: spinner + "Accessing CondoClaw Database..."
- Empty state: prompt to upload documents on Dashboard

### 19.10 Schedule & Deadlines Page

Two-column layout.

**Left column (2/3 width) — Task List:**
Each deadline item:
- Priority dot (red / yellow / blue)
- Task title and association
- Date/time
- Action badge (e.g., "Verify Ledger", "Export Reports")
- "Execute Task" button (appears on hover)

**Right column (1/3 width) — Summary Cards:**

*Legal Compliance Card* (dark green):
- Status message about matters within 30-day statutory window
- "View Compliance Report" button (yellow)

*Calendar Summary Card* (white):
- Total Tasks count
- Critical Deadlines count (red)
- Completed This Week count (green)

### 19.11 Documents Page

**Header:** "Document Repository" — subtitle, "Version History" button, "Upload New" button.

**Filters:** Search input + Document Type dropdown (All Types / Notices / Ledgers / Affidavits).

**Documents Table:**

| Column | Content |
|--------|---------|
| Document Name | File icon + filename |
| Type | Notice / Ledger / Affidavit / NOLA |
| Association | Association name |
| Status | Approved (green) / Generated (blue) / In Queue (yellow) / Archived (gray) |
| Version | v1, v2, etc. |
| Actions | View / Download / Flag |

Download calls `/api/download/{doc.name}`.

### 19.12 CondoClaw Memory Page

The institutional knowledge base and learning engine UI. See Section 11 for the full dataset schema.

**Header:**
- Page title + subtitle
- "Export Dataset" button
- "Upload Training Data" button (spinner during upload)
- "Re-run Validation" button — re-validates all records against the current engine

**Metrics row (8 cards):**

| Metric | Description | Color |
|--------|-------------|-------|
| System Pass Rate | % of documents approved without correction | Green |
| Average Confidence | Mean variable confidence across all records | Blue |
| Correction Rate | % of records that required user correction | Amber |
| Rejection Rate | % of records marked rejected/unusable | Red |
| Conflict Frequency | Avg conflicts detected per record | Amber |
| Statute Compliance Score | Mean compliance score across all validated records | Green / Red |
| Flagged Items | Count of records currently flagged for review | Amber |
| Drift Detection | Indicator — triggered when recent patterns diverge from established baseline | Red when active |

Each card: icon, large value, label, "Live Metric" badge.

**Filters bar (above dataset table):**

| Filter | Options |
|--------|---------|
| Search | Full-text search across content |
| By Association | Dropdown — all associations |
| By Statute | 718 · 720 · 617 · Unclassified |
| By Document Type | NOLA · Affidavit · Ledger · Generated Notice · Claim of Lien |
| By Outcome | Approved · Corrected · Rejected · Pending Review |
| By Confidence | Slider 0–100% · Presets: High (>85%) / Medium / Low (<60%) |
| By Correction Frequency | Never · Once · Multiple |
| By Stage | NOLA · First Letter · Second Letter · Claim of Lien |
| By Date Range | Date picker |
| Canonical Only | Toggle |
| Drift Flagged | Toggle |

**Reference Dataset Table:**

| Column | Content |
|--------|---------|
| Type | nola (blue) / ledger (amber) / affidavit (purple) / generated notice (green) / other (gray) |
| Content Preview | Truncated text with expand option |
| Association | Association name |
| Statute | 718 / 720 / 617 badge |
| Stage | Workflow stage badge |
| Status | Approved · Corrected · Rejected · Canonical · Drift Flagged |
| Confidence | Progress bar + percentage |
| Correction Count | Number of times this record has been corrected |
| Date | Date stored |
| Actions | Row-level action menu (see below) |

**Row-level actions (per record):**

| Action | Description |
|--------|-------------|
| View | Opens full record preview with all 7 schema layers visible |
| Mark as Canonical | Sets as reference standard for this type + statute + stage |
| Reject Example | Archives record — removes from active comparison use |
| View Differences | Side-by-side diff vs. current statute baseline |
| Apply Correction to System | Propagates this record's correction to similar records (with user confirmation) |
| Promote to Template | Adds to Document Generation template library |
| Compare Against Active Matter | Runs similarity comparison against current active matter |
| Tag by Association | Applies association tag |
| Tag by Statute | Applies statute tag |
| View Learning Impact | Shows: times used in comparisons, correction propagations triggered, matters influenced |

- Pagination: Prev / Next, "Showing X of Y reference points"
- Bulk actions: Select multiple records → apply tag / reject / re-run validation

### 19.13 Reports Page

Placeholder — not yet built. Coming soon.

### 19.14 Matter Intelligence Panel (Highest-Priority Missing UI Component)

The Matter Intelligence Panel is the single most important missing element in the current UI. It is the component that makes CondoClaw's reasoning layer **visible** to the user.

Without it, the dashboard shows "upload and run." With it, the dashboard shows "extract, validate, classify, verify, compare, decide eligibility, schedule next step."

The panel must appear on the Dashboard, below the upload intake area and above the pipeline tracker. It activates after document parsing is complete and populates in real time as the system works.

**The panel must display six components:**

---

**1. Statute Type**

A prominent badge showing the classified governing law for this matter:

| Badge | Color | Meaning |
|-------|-------|---------|
| Chapter 718 — Condominium | Dark green | FL Condominiums Act applies |
| Chapter 720 — HOA | Blue | Homeowners' Associations Act applies |
| Chapter 617 — Non-Profit Corp | Indigo | Applies alongside 718/720 |
| Unclassified — Review Required | Red | System could not determine; user must confirm |

---

**2. Core Matter Variables**

A structured table showing every extracted variable with its source and confidence:

| Variable | Value | Source | Confidence | Status |
|----------|-------|--------|------------|--------|
| Owner Name | Robert Hines | NOLA + Affidavit | High | ✅ Verified |
| Mailing Address | 4201 Palm Ave | NOLA | Medium | ⚠️ Conflict |
| Unit Number | 402 | NOLA + Ledger | High | ✅ Verified |
| Total Owed | $4,120.00 | Ledger | High | ✅ Verified |
| NOLA Date | Jan 14, 2026 | NOLA | High | ✅ Verified |
| Mailing Date | Jan 16, 2026 | Affidavit | High | ✅ Verified |
| Cure Date | Feb 13, 2026 | Calculated | High | ✅ Valid |

Each row is clickable — expanding it shows the raw extracted text, the source document page, and the public record value if available. User can manually edit any value and confirm the correction.

---

**3. Validation Conflicts**

A clearly visible conflict list. Each conflict is shown as a card with:
- The variable name
- The conflicting values and their sources (e.g., "NOLA: $4,500 vs. Ledger: $4,120")
- Severity badge: **Blocking** (red) / **Warning** (amber) / **Informational** (blue)
- A suggested resolution action (button)

If no conflicts: "No conflicts detected — all variables consistent across sources." (green)

---

**4. Eligibility Status**

A large, unambiguous status indicator:

| Status | Display | Pipeline Effect |
|--------|---------|-----------------|
| ✅ Eligible to Proceed | Green banner | CTA button enabled |
| ⚠️ Conditionally Eligible | Amber banner, conflicts listed | CTA enabled with warnings surfaced |
| ❌ Not Eligible to Proceed | Red banner, blocking reason shown | CTA button disabled |

When blocked, the banner shows the exact reason and links to the conflict that caused it.

---

**5. Public Record Verification Result**

A dedicated card showing the agentic web verification result:

```
┌─────────────────────────────────────────────────────┐
│  PUBLIC RECORD VERIFICATION                          │
│  Source: Miami-Dade County Property Appraiser        │
│  ─────────────────────────────────────────────────── │
│  Deed Holder:    Patricia Hines          ⚠️ MISMATCH  │
│  NOLA Owner:     Robert Hines                        │
│  Property Addr:  4201 Palm Ave, Unit 402  ✅ MATCH   │
│  Mailing Addr:   4201 Palm Ave, Unit 402  ✅ MATCH   │
│  Transfer Date:  Feb 3, 2026                         │
│  ─────────────────────────────────────────────────── │
│  🔗 Source: miami-dade.gov/propertysearch            │
└─────────────────────────────────────────────────────┘
```

Includes:
- County / appraiser source name and link
- Deed holder name with match/mismatch indicator vs. NOLA owner
- Property address match/mismatch
- Mailing address match/mismatch
- Ownership transfer date (if recent — flags if transfer occurred after NOLA issuance)
- Direct link to the source record

---

**6. Next Allowed Stage**

Shows exactly where the matter stands in the statutory workflow and what happens next:

```
Current Stage: ✅ NOLA (Input) — Validated
Next Stage:    First Letter (Demand Notice)
Eligible:      ✅ NOW — All conditions met
Action:        Generate First Letter → Chapter 718 compliant
```

Or, if a waiting period is active:

```
Current Stage: ✅ First Letter — Sent Jan 16, 2026
Next Stage:    Second Letter (Intent to Lien)
Eligible:      ⏳ April 20, 2026 — 12 days remaining
               Cure period expires April 19 (30 days, Ch. 718)
Action:        Scheduled reminder created for April 19
```

---

**Implementation note:** This panel is the primary output of three backend systems working together — the Intake Validation Engine (§6), the Workflow Engine (§7), and the Agentic Web Verification layer (§4.3). It is the surface where all of that reasoning becomes visible to the user. It should be built as a single panel that these three systems write to, not as three separate UI elements.

---

## 20. Interaction & Action Definitions

### 20.1 Purpose

Every interactive element in CondoClaw must have a defined system action. No button, link, row action, or input exists for appearance only. This section is the authoritative reference for what every clickable element does, what it triggers in the system, and what it writes to the Matter Object.

**Rule:** If an element does not have a defined system action in this section, it must not be built.

---

### 20.2 Global Elements (Persistent Across All Pages)

---

#### Search Bar (Top Navigation)

| Property | Definition |
|----------|-----------|
| **Function** | Full-text search across the entire system |
| **Searches** | Matters (by ID, association, owner name) · Unit Owners · Documents (by filename, type, status) |
| **Results** | Grouped by type: Matters / Owners / Documents |
| **On result click** | Navigates to that object's primary module (matter → Dashboard, owner → Unit Owners, document → Documents) |
| **Writes to Matter** | Nothing — read-only search |

---

#### AI Concierge Input + Send

| Property | Definition |
|----------|-----------|
| **Function** | Submit a message or command to the AI Concierge |
| **On send** | Sends message + full Matter Object context to AI agent · AI responds with reasoning, action, or confirmation |
| **Can trigger** | Document generation · Intake validation · Variable update (with confirmation) · Deadline scheduling · Web verification search · Page navigation |
| **Writes to Matter** | Depends on action: generated documents, updated variables, scheduled events, logged AI decisions |

---

#### Notification Bell (Top Navigation)

| Property | Definition |
|----------|-----------|
| **Function** | Surface pending system alerts |
| **Alert types** | Deadline approaching · Validation conflict detected · Stage eligibility unlocked · Memory comparison complete |
| **On click** | Opens notification drawer · Each alert links to the relevant matter and module |
| **Writes to Matter** | Nothing — alerts are read from Matter, not written |

---

### 20.3 Dashboard Actions

---

#### Upload Zone — NOLA / Ledger / Mailing Affidavit

| Property | Definition |
|----------|-----------|
| **Function** | Upload a source document to the active matter |
| **On file drop or click** | Accepts file · Validates format · Shows animated parsing progress bar |
| **System actions** | Posts to `/api/parse` · Runs NLP extraction · Populates Core Matter Variables · Runs cross-document validation · Updates Matter Object |
| **On success** | File badge changes to type-specific success label ("Structured Data Extracted" / "Tables Parsed" / "Text Extracted") |
| **On failure** | Shows error state · AI Concierge explains the issue |
| **Writes to Matter** | Document record · Extracted variables · Parsing timestamp |

---

#### RUN AI CONCIERGE (Primary CTA)

| Property | Definition |
|----------|-----------|
| **Function** | Execute full Matter analysis for the current stage |
| **Enabled when** | All three source documents are uploaded and parsed |
| **Disabled when** | Any document is missing · Eligibility status is "Not Eligible to Proceed" |
| **System actions** | Runs Intake Validation Engine · Compares against CondoClaw Memory · Runs statute classification · Determines eligibility · Calculates statutory deadlines · Advances workflow stage if valid · Updates Matter Intelligence Panel |
| **Writes to Matter** | Validation results · Eligibility decision · Statute classification · Confidence scores · Stage update |

---

#### AlphaCondor Review — VERIFY

| Property | Definition |
|----------|-----------|
| **Function** | Confirm that the AI's extracted data is correct |
| **On click** | Stores the extracted data as verified in the Matter Object · Embeds the document in CondoClaw Memory dataset |
| **Writes to Matter** | Verified variable values · Memory reference record · Verification timestamp |

---

#### AlphaCondor Review — CORRECT

| Property | Definition |
|----------|-----------|
| **Function** | Manually correct an extracted value |
| **On click** | Opens editable JSON view of extracted entities |
| **On save** | Overwrites extracted values with corrected values · Logs correction to audit history · Posts correction to `/api/memory/correction` |
| **Writes to Matter** | Corrected variable values · Correction log entry |

---

#### Pipeline Stage Node (1–5)

| Property | Definition |
|----------|-----------|
| **Function** | Show current workflow state — not user-controlled |
| **Behavior** | Updates automatically based on backend validation results · Completed = green checkmark · Active = pulsing indicator · Locked = gray |
| **On active node hover** | Shows tooltip: what is required to complete this stage |
| **On completed node click** | Opens summary of what was done at that stage |
| **Writes to Matter** | Nothing — display only, reads from Matter |

---

### 20.4 Document Generation Actions

---

#### Select Matter (Left Column)

| Property | Definition |
|----------|-----------|
| **Function** | Load a matter into the document generation engine |
| **On click** | Highlights selected row · Loads matter's variable set and current stage into right column · AI Concierge updates its context to the selected matter |
| **Writes to Matter** | Nothing — selection only |

---

#### Generate Draft (Stage Action Button)

| Property | Definition |
|----------|-----------|
| **Function** | Generate the legal document for the current workflow stage |
| **On click** | Pulls all validated Core Matter Variables from Variable Engine · Applies the correct statute-compliant template · Runs baseline compliance check · Compares against CondoClaw Memory · Produces Word document |
| **Behavior if variables missing** | Flags incomplete fields — does not silently leave blanks · AI Concierge explains which variable is missing and where to resolve it |
| **Writes to Matter** | Generated document (versioned) · Document metadata · Generation timestamp · Baseline compliance status |

---

#### Download PDF (Completed Stage)

| Property | Definition |
|----------|-----------|
| **Function** | Download a previously generated document |
| **On click** | Calls `/api/download/{doc_name}` · Returns file |
| **Writes to Matter** | Download event logged to audit history |

---

### 20.5 Documents Module Actions

---

#### Upload New

| Property | Definition |
|----------|-----------|
| **Function** | Upload a document to the matter's repository |
| **System actions** | Stores document · Runs NLP extraction · Updates Variable Engine · Triggers AI validation · Creates version record |
| **Writes to Matter** | Document record · Extracted variables · Version entry |

---

#### Version History

| Property | Definition |
|----------|-----------|
| **Function** | View all prior versions of a document |
| **On click** | Opens version timeline · Shows each version with timestamp, author, and action (generated / uploaded / corrected) |
| **Revert action** | Restores prior version as the active document · Logs revert to audit history |
| **Writes to Matter** | Audit log entry if revert is performed |

---

#### Row Actions — View (👁)

| Property | Definition |
|----------|-----------|
| **Function** | Open document preview |
| **On click** | Opens in-panel document preview · Does not navigate away from current page |

---

#### Row Actions — Download (⬇)

| Property | Definition |
|----------|-----------|
| **Function** | Download document file |
| **On click** | Calls `/api/download/{doc_name}` · Logs download to audit history |

---

#### Row Actions — Flag (🚩)

| Property | Definition |
|----------|-----------|
| **Function** | Mark document for review |
| **On click** | Sets document status to "Flagged" · Sends signal to AI Concierge · AI Concierge surfaces the flag in chat and asks for context · Creates review task in Schedule |
| **Writes to Matter** | Document status update · Flag event in audit log · Schedule task |

---

#### Document Type Filter Dropdown

| Property | Definition |
|----------|-----------|
| **Function** | Filter document table by type |
| **Options** | All Types · Notices · Ledgers · Affidavits · NOLA |
| **Behavior** | Filters table in real time — no page reload |

---

### 20.6 Unit Owners Actions

---

#### Add Owner

| Property | Definition |
|----------|-----------|
| **Function** | Manually create a new unit owner record |
| **System actions** | Creates owner record · Links to association · Triggers public record verification (if address provided) |
| **Writes to Matter** | Owner record · Initial variable values |

---

#### Copy (Owner Row)

| Property | Definition |
|----------|-----------|
| **Function** | Copy owner data to clipboard |
| **On click** | Copies structured owner data (name, address, unit) · Shows "Copied" confirmation flash |

---

#### View (Owner Row — 👁)

| Property | Definition |
|----------|-----------|
| **Function** | Open full owner profile |
| **On click** | Opens owner detail panel showing all variables, associated matters, and verification status |

---

#### Flag (Owner Row — 🚩)

| Property | Definition |
|----------|-----------|
| **Function** | Flag owner record for review |
| **System actions** | Sets owner status to "Flagged" · AI Concierge notified · Creates review task |
| **Writes to Matter** | Owner status update · Audit log entry |

---

### 20.7 Schedule Actions

---

#### Add Event (Manual)

| Property | Definition |
|----------|-----------|
| **Function** | Add a non-statutory deadline or task to the matter timeline |
| **On submit** | Attaches event to Matter timeline · Integrates with compliance engine · AI Concierge becomes aware of the event |
| **Note** | Statute-driven deadlines are auto-generated and cannot be manually added or edited |
| **Writes to Matter** | Manual deadline event |

---

#### Execute Task (Row — Hover Action)

| Property | Definition |
|----------|-----------|
| **Function** | Trigger the action associated with a scheduled task |
| **Behavior** | Routes to the correct module for the task type (e.g., Document Generation for "Generate Second Letter") · Or triggers AI Concierge to execute directly |
| **Writes to Matter** | Task completion status · Action log entry |

---

#### View Compliance Report

| Property | Definition |
|----------|-----------|
| **Function** | Generate a compliance summary for the active matter |
| **System actions** | Analyzes all deadlines against statute · Identifies overdue actions · Flags matters at risk · Outputs formatted report |
| **Writes to Matter** | Compliance report record |

---

### 20.8 CondoClaw Memory Actions

---

#### Upload Training Data

| Property | Definition |
|----------|-----------|
| **Function** | Add reference documents to the Memory dataset |
| **On click** | Opens file picker · Accepts PDF, Word, Excel · Shows spinner during upload |
| **System actions** | Stores document · Runs NLP extraction · Populates all 7 schema layers · Embeds in vector store · Updates all dataset metrics · Posts to `/api/memory/upload` |
| **Writes to Memory** | Full schema record (all 7 layers) · Updated metrics |

---

#### Export Dataset

| Property | Definition |
|----------|-----------|
| **Function** | Export the full Memory dataset for external use or backup |
| **On click** | Packages all records with full schema · Downloads as structured JSON/CSV |
| **Writes to Matter** | Nothing — export only |

---

#### Re-run Validation (Header Action)

| Property | Definition |
|----------|-----------|
| **Function** | Re-apply the current validation engine and statute rules against all records |
| **Use case** | After NLP model update or statute rule change |
| **System actions** | Iterates all records · Recomputes Layer 3 (Validation) · Updates statute_compliance_score · Flags new conflicts · Updates all metrics |
| **Writes to Memory** | Updated validation layer per record · Updated metrics |

---

#### View Memory Item (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Preview a stored memory record — all 7 schema layers visible |
| **On click** | Opens full record panel: Document layer (raw text + structured output) · Variable layer (all variables with source and confidence) · Validation layer (conflicts, compliance score) · Outcome layer · Correction layer (change log) · Context layer · Performance layer |

---

#### Mark as Canonical (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Designate this record as the reference standard for its type + statute + stage |
| **System actions** | Sets `canonical = true` · Prioritizes in all future similarity comparisons of the same type · Shown with "Canonical" badge in table |
| **Writes to Memory** | `canonical` flag on record |

---

#### Reject Example (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Remove a record from active use in comparisons |
| **System actions** | Sets `rejected = true` · Record archived, not deleted · Removed from similarity scoring · AI Concierge no longer references it |
| **Writes to Memory** | `rejected` flag · Rejection reason (if provided) |

---

#### View Differences (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Compare this record against the current statute baseline |
| **On click** | Opens side-by-side diff view — record text vs. baseline-generated version · Deviations highlighted · Compliance score shown |

---

#### Apply Correction to System (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Propagate this record's correction to all similar records in the dataset |
| **System actions** | Identifies records with the same `original_value` for the same field + type + statute · Shows count of affected records · Requires user confirmation before applying |
| **Writes to Memory** | Correction layer updated on all affected records · Bulk correction event logged |

---

#### Promote to Template (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Elevate a high-confidence canonical record to an official document generation template |
| **System actions** | Adds record to Document Generation template library · Available as a selectable template in the generation engine · Tagged with statute, stage, and association |
| **Writes to Memory** | `promoted_to_template = true` flag |

---

#### Compare Against Active Matter (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Run a live similarity comparison between this record and the current active matter |
| **System actions** | Loads active matter variables and document text · Runs similarity scoring · Returns: match percentage, section-by-section comparison, specific flags |
| **Writes to Memory** | Comparison event logged |

---

#### Tag by Association / Tag by Statute (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | Apply a context tag to the record for filtering |
| **On click** | Dropdown — select association or statute value · Tag appended to `tags` array in Context Layer |
| **Writes to Memory** | Updated `tags` field |

---

#### View Learning Impact (Row Action)

| Property | Definition |
|----------|-----------|
| **Function** | See how this record has influenced the system |
| **Shows** | Times used in comparisons · Times flagged as a reference · Correction propagations triggered · Matters where this record was cited |

---

#### Filter Bar Interactions

| Filter | System Behavior |
|--------|----------------|
| Association dropdown | Filters table to records where `association_name` matches · Persists across pagination |
| Statute toggle | Filters by `statute_type` field in Context Layer |
| Outcome filter | Filters by `approved_by_user` / `corrected_by_user` / `rejected` in Outcome Layer |
| Confidence slider | Filters by `confidence_score` range in Performance Layer |
| Canonical Only toggle | Shows only records where `canonical = true` |
| Drift Flagged toggle | Shows only records where `drift_flag = true` |

---

### 20.9 Matter Intelligence Panel Actions

---

#### Variable Row (Click to Expand)

| Property | Definition |
|----------|-----------|
| **Function** | Expand a Core Matter Variable to see its full detail |
| **Shows** | Raw extracted text · Source document page · Public record value (if available) · Conflict explanation (if flagged) |

---

#### Variable Row — Edit

| Property | Definition |
|----------|-----------|
| **Function** | Manually correct an extracted variable value |
| **On save** | Updates Variable Engine · Logs correction to audit history · Triggers re-validation · AI Concierge confirms the update |
| **Writes to Matter** | Corrected variable value · Correction log entry |

---

#### Conflict Card — Resolve Action

| Property | Definition |
|----------|-----------|
| **Function** | Accept a suggested resolution for a detected conflict |
| **On click** | Applies the suggested value to the Variable Engine · Updates eligibility status · Re-runs dependent validation checks |
| **Writes to Matter** | Resolved variable value · Conflict resolution log |

---

#### Eligibility Status Banner — Override

| Property | Definition |
|----------|-----------|
| **Function** | Manually override a "Not Eligible to Proceed" decision |
| **Requires** | Explicit user confirmation with acknowledgment text |
| **System actions** | Logs override with user identity and timestamp · Allows pipeline to proceed · AI Concierge flags the override in all subsequent outputs |
| **Writes to Matter** | Override record in audit history |

---

## 21. Product Intelligence Gap — PRD vs. Current UI

### 21.1 The Core Problem

The current UI is a polished shell for Stage 1 intake. The PRD describes a much deeper system. The UI team built the visible frame first — the layout, the panels, the pipeline tracker — and it looks good. But the product logic described in Sections 5 through 8 of this document has not yet been surfaced in the interface.

The result is a gap between what the system **says it does** and what the user can actually **see it doing**.

> The UI currently shows "upload and run."
> The PRD requires the UI to show "extract, validate, classify, verify, compare, decide eligibility, schedule, generate baseline, compare to memory, then draft."

That gap is the reason the product feels incomplete even though the screen looks good. Closing this gap is the highest-priority product work.

### 21.2 The Five Missing Intelligence Layers

**Missing Layer 1: Matter Data & Validation (Most Critical)**

The PRD specifies Core Matter Variables (§5), Intake Validation (§6), and an Eligibility Decision. None of this is visible in the current UI. The user cannot see:
- What variables were extracted and from which document
- Whether the NOLA and ledger agree on the amount owed
- Whether the matter is actually eligible to proceed
- What the specific conflict is, if one exists

The system is doing this work silently — or not at all — and the user has no visibility into it. The **Matter Intelligence Panel** (§9.14) is the fix.

**Missing Layer 2: Multi-Stage Statutory Workflow**

The PRD (§7) now specifies a 4-stage lifecycle: NOLA → First Letter → Second Letter → Claim of Lien, governed by statute-driven timing, with blocked transitions and scheduled reminders. The current pipeline tracker shows 5 generic processing steps, not a legal lifecycle. The user cannot see:
- Which statute governs this matter (718 vs. 720)
- What stage the matter is legally in
- When they are eligible to move to the next stage
- What happens if they try to move too early

**Missing Layer 3: Public Record Verification Experience**

The PRD (§4.3) describes agentic browsing of county property appraiser sites — deed lookup, owner name comparison, mailing address match, transfer date detection, and source links returned. This is one of the most valuable things CondoClaw does. The current UI has no dedicated area for this result. The user cannot see:
- The verified deed holder name vs. the NOLA owner
- Whether the mailing address matches the county record
- Whether ownership transferred after the NOLA was issued
- A link to the actual county record

**Missing Layer 4: CondoClaw Memory as a Living Connection**

The PRD (§4.4) describes Memory as the institutional knowledge engine — similarity scores, pass rates, flagged patterns, prior approved comparisons. The current UI has a Memory page with metrics, but there is no visible connection between Memory and the active matter. The user cannot see:
- Which prior approved NOLAs this matter was compared against
- What the similarity score was
- What was flagged as inconsistent with prior approved examples
- Whether this matter's affidavit matches the pattern of prior verified affidavits

**Missing Layer 5: Baseline Statutory Engine as a Differentiator**

The PRD (§8) specifies that CondoClaw must generate its own statute-compliant baseline and be capable of telling the user that their historical examples are wrong. This is a major product differentiator. The current UI does not surface:
- Whether a generated document was built from statute (baseline) or training data
- Whether there is a conflict between baseline and training data
- Substantial compliance status
- The specific statutory clause that is present, missing, or incorrect

### 21.3 What This Means for the Team

The next sprint should not add more styling or more pages. It should make the system's reasoning visible.

**Priority order:**

| Priority | What to Build | Why |
|----------|--------------|-----|
| 1 | Matter Intelligence Panel (§9.14) | Connects all backend intelligence to the user in one place |
| 2 | Statute Classification badge | Tells user which rules apply — gates everything downstream |
| 3 | Validation Conflict cards | Shows exactly what is wrong and what the user must fix |
| 4 | Public Record Verification result card | Surfaces the most unique and high-value capability |
| 5 | Memory comparison panel (active matter) | Connects Memory page to the active workflow |
| 6 | Baseline vs. training data status | Exposes the compliance differentiator |

### 21.4 The Guiding Principle

> "The current UI is only showing Stage 1 intake. The PRD requires the dashboard to visibly express the system's intelligence: statute type, core variables, validation conflicts, eligibility to proceed, public-record verification results, memory comparisons, and multi-stage workflow scheduling. Right now the shell is there, but the reasoning layer is still missing from the interface."

Every new UI element going forward must answer: **does this make the system's intelligence more visible to the user?** If it does not, it is lower priority than building the Matter Intelligence Panel.

---

## 22. Branding

- **Name:** CondoClaw
- **Tagline:** AI Concierge for Condos & HOAs
- **Logo:** Gold condor with lobster-style claw — bold, simple, visible
- **Tone:** Professional, modern, slightly fun. Not "legal software."

---

## 23. Technical Architecture

### 23.1 Frontend
- **Framework:** React + Vite (JSX)
- **Styling:** Tailwind CSS v4
- **Font:** Public Sans
- **Icons:** lucide-react
- **Animation:** motion/react
- **Pages:** Dashboard, Document Generation, Associations, Unit Owners, Schedule, Documents, CondoClaw Memory, Reports

### 23.2 Backend
- **Server:** FastAPI (Python)
- **Database:** SQLite (matters, owners, memory, corrections)
- **API endpoints:** `/api/chat`, `/api/parse`, `/api/memory/stats`, `/api/memory/upload`, `/api/memory/correction`, `/api/unit-owners`

### 23.3 AI Agent Layer
- **Agent Framework:** PydanticAI (`from pydantic_ai import Agent`)
- **Primary LLM:** GPT-5.4 via OpenAI Responses API (complex reasoning, document analysis)
- **Fallback LLM:** gpt-5-mini (short summaries, UI acknowledgments, low-latency steps)
- **Alternative:** Claude (Anthropic) — open to using Claude models, especially for legal document drafting
- **Web Search:** DuckDuckGo (`from duckduckgo_search import DDGS`)

### 23.4 Agentic Web Layer (Critical)
| Library | Purpose |
|---------|---------|
| `duckduckgo_search` | Web search (public records, statutes, HOA rules) |
| `playwright` | Browser automation — navigate property appraiser sites |
| `beautifulsoup4` / `lxml` | HTML parsing and structured data extraction |

### 23.5 Document Processing
| Library | Purpose |
|---------|---------|
| `pdfplumber` | PDF text extraction (primary) |
| `fitz` (PyMuPDF) | PDF rendering and page parsing |
| `pytesseract` | OCR for scanned documents |
| `pandas` | Ledger table parsing and analysis |
| `openpyxl` | Excel output generation |
| `python-docx` | Word document generation |

### 23.6 NLP & Similarity
| Library | Purpose |
|---------|---------|
| `spacy` | Entity extraction (names, addresses, dates, amounts, unit numbers) |
| `sentence_transformers` | Semantic similarity comparison against CondoClaw Memory |
| `chromadb` or `faiss` | Vector store for CondoClaw Memory dataset |

### 23.7 Future State
- **LangGraph** — stateful, long-running workflows; durable execution; persisted thread-scoped memory; human-in-the-loop control across sessions

---

### 23.8 API Endpoint Specification

All endpoints use `Content-Type: application/json`. Authentication is bearer token (JWT). All responses include `{ "status": "success" | "error", "data": {}, "message": "" }` envelope.

#### Document Intake & Parsing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/parse` | Upload and parse NOLA, Ledger, and/or Affidavit. Triggers OCR + Core Matter Variable extraction. |
| `GET` | `/api/matters/{matter_id}/variables` | Return all Core Matter Variables for a matter with source, confidence, and conflict flags. |
| `PUT` | `/api/matters/{matter_id}/variables/{variable_name}` | Override a Core Matter Variable. Body: `{ value, reason }`. Logs to audit trail. |

#### Matter Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/matters` | Create a new matter. Body: `{ association_id, unit_owner_id }`. |
| `GET` | `/api/matters` | List all matters with status, stage, and association. Supports filter/search. |
| `GET` | `/api/matters/{matter_id}` | Full matter detail: variables, stage, eligibility, documents, ledger versions. |
| `PATCH` | `/api/matters/{matter_id}/state` | Advance or update matter state. Body: `{ new_state, reason }`. Enforced by state machine. |
| `GET` | `/api/matters/{matter_id}/audit` | Full audit trail for a matter. |

#### Validation & Eligibility

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/matters/{matter_id}/validate` | Run the Intake Validation & Eligibility Engine. Returns `{ status: Eligible|Conditional|Blocked, conflicts: [] }`. |
| `POST` | `/api/matters/{matter_id}/validate/override` | Override an eligibility block. Body: `{ reason, acknowledgment }`. Admin only. |

#### Document Generation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/matters/{matter_id}/documents/generate` | Generate a stage document. Body: `{ document_type: "first_letter"|"second_letter"|"claim_of_lien" }`. Requires pre-generation ledger gate to pass. |
| `GET` | `/api/matters/{matter_id}/documents` | List all generated documents with version, stage, and approval status. |
| `GET` | `/api/matters/{matter_id}/documents/{doc_id}` | Download a specific generated document. |
| `POST` | `/api/matters/{matter_id}/documents/{doc_id}/approve` | Approve a generated document draft. Advances matter state. |

#### Ledger

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/matters/{matter_id}/ledger` | Return the current live ledger state (calculated, not versioned). |
| `GET` | `/api/matters/{matter_id}/ledger/versions` | List all versioned ledger snapshots. |
| `GET` | `/api/matters/{matter_id}/ledger/versions/{version_id}` | Download a specific versioned ledger. |
| `POST` | `/api/matters/{matter_id}/ledger/approve` | Approve the current ledger state, creating a versioned snapshot. |
| `POST` | `/api/matters/{matter_id}/ledger/reconcile` | Run Payment Detection & Auto-Reconciliation. Returns change report. |

#### Associations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/associations` | Create a new association record. |
| `GET` | `/api/associations` | List all associations with status and matter count. |
| `GET` | `/api/associations/{association_id}` | Full association detail: financial rules, documents, SunBiz data. |
| `PUT` | `/api/associations/{association_id}` | Update association data (financial rules, contacts, notes). |
| `POST` | `/api/associations/{association_id}/sunbiz` | Trigger SunBiz entity search. Returns up to 5 matches. |
| `POST` | `/api/associations/{association_id}/sunbiz/confirm` | Confirm selected SunBiz match and write to association record. |
| `POST` | `/api/associations/{association_id}/documents` | Upload governing documents (Declaration, Bylaws, Amendments). Triggers OCR. |

#### Unit Owners

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/unit-owners` | List all unit owners with matter count and status. |
| `POST` | `/api/unit-owners` | Create a new unit owner record. |
| `GET` | `/api/unit-owners/{owner_id}` | Full owner detail with linked matters. |

#### AI Concierge

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send a message to the AI Concierge. Body: `{ matter_id, message, session_id }`. Returns `{ reply, suggested_actions: [] }`. |
| `GET` | `/api/chat/{session_id}/history` | Retrieve prior conversation turns for a session. |

#### Memory & Learning

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/memory/stats` | Return dataset metrics (examples, confidence, learning state). |
| `POST` | `/api/memory/upload` | Upload an approved prior document to the Memory dataset. |
| `POST` | `/api/memory/correction` | Submit a correction event to the learning loop. |
| `POST` | `/api/memory/gold-standard` | Mark a document as Gold Standard. |

#### Payoff

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/matters/{matter_id}/payoff/initiate` | Begin payoff workflow. Runs pre-payoff ledger verification gate. Returns current balance and verification prompt. |
| `POST` | `/api/matters/{matter_id}/payoff/reconcile` | Submit updated ledger or payment entry before payoff generation. Runs reconciliation. |
| `POST` | `/api/matters/{matter_id}/payoff/generate` | Generate payoff / estoppel document draft from verified state. |
| `POST` | `/api/matters/{matter_id}/payoff/{payoff_id}/approve` | Approve payoff for delivery. Creates Frozen Payoff Snapshot. |
| `GET` | `/api/matters/{matter_id}/payoff` | List all payoff documents for a matter (versions, status, snapshot IDs). |
| `GET` | `/api/matters/{matter_id}/payoff/{payoff_id}` | Download a specific payoff document. |

---

### 23.9 Database Schema

**SQLite tables (MVP). All tables include `created_at`, `updated_at` timestamps.**

#### `associations`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `name` | TEXT | Association name |
| `statute_type` | TEXT | `718` / `720` / `617` / `UNKNOWN` |
| `status` | TEXT | `empty` / `partial` / `configured` / `verified` / `needs_review` |
| `interest_rate` | REAL | Extracted from Declaration |
| `late_fee` | REAL | |
| `grace_period_days` | INTEGER | |
| `sunbiz_entity_id` | TEXT | Nullable |
| `sunbiz_synced` | BOOLEAN | |
| `sunbiz_sync_date` | TEXT | ISO timestamp |

#### `unit_owners`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `association_id` | TEXT | FK → associations |
| `name` | TEXT | |
| `unit_number` | TEXT | |
| `property_address` | TEXT | |
| `mailing_address` | TEXT | |
| `email` | TEXT | Nullable |
| `phone` | TEXT | Nullable |

#### `matters`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `association_id` | TEXT | FK → associations |
| `unit_owner_id` | TEXT | FK → unit_owners |
| `state` | TEXT | State machine state (e.g., `NOLI_SENT`) |
| `statute_type` | TEXT | Locked at `STATUTE_DETERMINED` |
| `eligibility_status` | TEXT | `eligible` / `conditional` / `blocked` |
| `current_ledger_version_id` | TEXT | FK → ledger_versions |
| `case_number` | TEXT | Internal reference |

#### `matter_variables`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `matter_id` | TEXT | FK → matters |
| `variable_name` | TEXT | e.g., `total_amount_owed` |
| `value` | TEXT | Stored as text; parsed at use |
| `source_document` | TEXT | `nola` / `ledger` / `affidavit` / `public_record` / `user` |
| `confidence` | REAL | 0.0 – 1.0 |
| `conflict_flag` | BOOLEAN | |
| `overridden_by` | TEXT | User ID if overridden; null otherwise |
| `override_reason` | TEXT | Nullable |

#### `documents`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `matter_id` | TEXT | FK → matters |
| `document_type` | TEXT | `nola` / `first_letter` / `second_letter` / `claim_of_lien` / `governing_doc` |
| `source` | TEXT | `uploaded` / `generated` |
| `version` | INTEGER | |
| `file_path` | TEXT | Server file path |
| `file_hash` | TEXT | SHA-256 for integrity |
| `approved` | BOOLEAN | |
| `approved_by` | TEXT | User ID; nullable |
| `ledger_version_id` | TEXT | FK → ledger_versions; for generated docs |

#### `ledger_versions`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `matter_id` | TEXT | FK → matters |
| `version_label` | TEXT | e.g., `Ledger_v2_First_Letter` |
| `version_number` | INTEGER | |
| `trigger_event` | TEXT | e.g., `stage_advance` / `payment_detected` / `user_correction` |
| `snapshot_data` | TEXT | JSON blob of financial state at snapshot time |
| `file_path` | TEXT | Excel file path |
| `approved` | BOOLEAN | |
| `approved_by` | TEXT | Nullable |

#### `audit_events`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `matter_id` | TEXT | FK → matters; nullable (for association-level events) |
| `association_id` | TEXT | FK → associations; nullable |
| `event_type` | TEXT | e.g., `document_uploaded`, `variable_overridden`, `state_advanced` |
| `actor_user_id` | TEXT | |
| `payload` | TEXT | JSON blob — all relevant fields for the event |
| `timestamp` | TEXT | ISO 8601 UTC |

#### `memory_dataset`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `association_id` | TEXT | FK → associations; nullable (firm-wide if null) |
| `document_type` | TEXT | |
| `learning_state` | TEXT | `raw` / `reviewed` / `approved` / `canonical` / `flagged` / `archived` |
| `embedding_id` | TEXT | ChromaDB / FAISS vector ID |
| `file_path` | TEXT | |
| `is_gold_standard` | BOOLEAN | |
| `confidence_score` | REAL | |
| `learning_eligible` | BOOLEAN | `false` if any Banned Learning Source condition applies (§18.9.1) |

#### `payoff_snapshots`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `matter_id` | TEXT | FK → matters |
| `payoff_document_id` | TEXT | FK → documents |
| `ledger_version_id` | TEXT | FK → ledger_versions — version used for payoff calculation |
| `snapshot_label` | TEXT | e.g., `Snapshot_Payoff_CC8921_20260401` |
| `statute_type` | TEXT | `718` / `720` — locked at generation |
| `payoff_issue_date` | TEXT | ISO date |
| `payoff_expiry_date` | TEXT | Issue date + 30 days |
| `balance_at_issue` | REAL | Total balance as of issue date |
| `preparation_fee` | REAL | Nullable |
| `variables_snapshot` | TEXT | JSON blob — all Core Matter Variables at issue |
| `declaration_rules_snapshot` | TEXT | JSON blob — interest rate, late fee, grace period at issue |
| `approved_by` | TEXT | User ID |
| `is_amended` | BOOLEAN | `true` if this supersedes a prior payoff |
| `supersedes_snapshot_id` | TEXT | FK → payoff_snapshots; nullable |

---

### 23.10 Developer Implementation Sequence

Build order is designed to unlock each capability before it is needed by the next. Do not skip steps — later phases depend on earlier foundations being solid.

**Phase 1 — Foundation (Build First)**
1. Database setup — create all tables (§23.9), run migrations
2. `POST /api/parse` — OCR pipeline: accept NOLA/Ledger/Affidavit, extract raw text, store `documents` record
3. Core Matter Variables layer — NLP extraction into `matter_variables` table with confidence scores
4. Matter creation flow — `POST /api/matters`, link to association and owner
5. `GET /api/matters/{id}/variables` — return variable panel data to frontend

**Phase 2 — Validation & State Machine**
6. Statute classification engine — auto-determine Chapter 718 vs 720 at intake; lock to matter
7. Intake Validation & Eligibility Engine — cross-document consistency checks; `POST /api/matters/{id}/validate`
8. Matter state machine — enforce 16-state lifecycle; `PATCH /api/matters/{id}/state` with gate logic
9. Timing engine — calculate statutory deadlines; write to schedules

**Phase 3 — Ledger Engine**
10. Baseline ledger generation — deterministic calculations from variables; produce Excel via openpyxl
11. Ledger versioning — create snapshots at trigger points; `GET /api/matters/{id}/ledger/versions`
12. Pre-generation ledger verification gate (§16.11) — block document generation if ledger is not approved
13. Payment Detection & Auto-Reconciliation (§12.15) — detect changes in re-uploaded ledgers

**Phase 4 — Document Generation**
14. Document generation engine — statute-aware templates; pull from approved ledger version; `POST /api/matters/{id}/documents/generate`
15. Document approval flow — user confirms draft; advances state machine; `POST /api/matters/{id}/documents/{id}/approve`
16. Compliance Certification generation at lien stage

**Phase 5 — AI Concierge & Memory**
17. PydanticAI agent setup — connect `POST /api/chat`; tool access to matter variables, ledger state, audit trail
18. AI Concierge proactive guidance — surface warnings, deadlines, eligibility status to chat
19. CondoClaw Memory — ChromaDB/FAISS vector store; `POST /api/memory/upload`; similarity comparison
20. Alpha Learning Loop — feedback and correction ingestion; confidence score updates

**Phase 6 — Associations & External**
21. Associations module — full CRUD, OCR of governing documents, financial rules extraction
22. SunBiz integration — Playwright scrape + entity matching flow (§17.9)
23. Agentic public records verification — Playwright county property appraiser lookup

---

## 24. Known Issues / Immediate Backlog

### 24.1 New Matter Intake — NOT WORKING (Priority 1)
The Dashboard file upload boxes (NOLA, Ledger, Affidavit) post to `/api/parse` but the endpoint is either missing or not returning the expected `{ status: 'success', parsedData: { summary, details, similarity, entities } }` response. The pipeline does not advance. **Fix this first.**

### 24.2 API/Agent Integration — NOT CONNECTED
The AIConcierge chat posts to `/api/chat` but the PydanticAI agent with tools is not yet implemented. Currently using mock responses.

### 24.3 CondoClaw Memory — STUB ONLY
The memory page shows UI but the ChromaDB/FAISS vector store backend is not built yet.

### 24.4 Agentic Web Verification — NOT BUILT
Playwright-based browser automation for public property appraiser lookup does not exist yet. Currently no owner verification capability.

### 24.5 Core Matter Variables Layer — NOT BUILT
The extraction, normalization, validation, and storage pipeline for Core Matter Variables does not exist yet. The Matter Data Panel is not implemented. All generated outputs currently reference raw parsed text rather than a canonical variable store.

### 24.6 Intake Validation & Eligibility Engine — NOT BUILT
The cross-document validation engine does not exist yet. There is no automated check comparing NOLA vs. ledger vs. affidavit vs. public records. The pipeline currently advances regardless of document consistency. The Validation Summary card and eligibility gate are not implemented.

### 24.7 Multi-Stage Statutory Workflow Engine — NOT BUILT
The statute classification, stage-gating, timing enforcement, and scheduling engine do not exist yet. The system does not automatically determine whether a matter is Chapter 718 or 720, does not enforce waiting periods between stages, and does not block premature stage advancement. The current Document Generation page shows a static 4-step timeline but it is not connected to any workflow logic.

### 24.8 Baseline Document Engine — NOT BUILT
The statute-compliant baseline ledger and notice generation engine does not exist yet. The system has no deterministic calculation layer and no statutory compliance checker. Currently all outputs depend on raw parsed content with no statutory validation.

### 24.9 Matter Intelligence Panel — NOT BUILT (Priority 2)
The Matter Intelligence Panel (§9.14) does not exist in the UI. The dashboard has no Statute Type badge, no Core Matter Variables table, no Validation Conflict cards, no Eligibility Status banner, no Public Record Verification result card, and no Next Allowed Stage indicator. This is the highest-priority UI addition because it is the surface through which all backend intelligence becomes visible to the user. **Build this immediately after fixing the `/api/parse` endpoint.**

---

## 25. Navigation / Pages

| Page | Route Key | UI Status | Backend Status | PRD Section |
|------|-----------|-----------|----------------|-------------|
| Dashboard | `dashboard` | Done — intake upload works, pipeline tracker works | `/api/parse` broken — pipeline does not advance | §9 |
| Document Generation | `document-gen` | Done — matter list, 4-step legal workflow, CondoClaw Intelligence panel | No backend connection | §9, §10 |
| Associations | `associations` | Not built — placeholder only | Not built | §14 |
| Unit Owners | `unit-owners` | Done — table, search, stats cards, copy/view/flag | `/api/unit-owners` returns mock data | §4 |
| Schedule | `schedule` | Done — deadline list, priority indicators, summary cards | Static mock data | §9.5, §16 |
| Documents | `documents` | Done — repository table, filters, download | `/api/download` not functional | §12 |
| CondoClaw Memory | `memory` | Done — metrics cards, dataset table, upload button | ChromaDB/FAISS not connected | §18 |
| Reports | `reports` | Not built — placeholder only | Not built | §27 |

---

## 26. MVP Scope

The MVP focuses on:
1. Upload 3 documents (NOLA, Ledger, Mailing Affidavit)
2. NLP extraction of all key fields into Core Matter Variables
3. Matter Data Panel — display variables with source, confidence, and conflict flags
4. Cross-document intake validation — NOLA vs. ledger vs. affidavit vs. public records
5. Statute classification — system determines Chapter 718 or 720 at intake
6. Stage-gated 4-step workflow (NOLA → First Letter → Second Letter → Claim of Lien)
7. Timing enforcement — statutory deadlines calculated, reminders created, premature advancement blocked
8. Agentic web verification (owner lookup via public property appraiser)
9. Baseline ledger generation (deterministic, code-based calculations)
10. Generate statute-compliant draft documents from Core Matter Variables for the current stage
11. Compare baseline against CondoClaw Memory and surface conflicts via AI Concierge
12. AI Concierge chat explanation throughout

---

## 27. Success Criteria

- A property manager can upload a NOLA, ledger, and mailing affidavit, and the AI extracts all key fields into the Core Matter Variables layer automatically
- The AI Concierge can answer "What is the total balance owed?" from the parsed ledger
- The AI autonomously browses the county property appraiser site and returns verified owner data with source links
- A statutory notice draft is generated that matches the approved template with correct owner data
- The system flags when a new document deviates from prior approved examples
- The system generates a baseline ledger from raw inputs with deterministic calculations, even if the uploaded ledger is incomplete
- The generated statutory notice satisfies substantial compliance with FL Chapter 718/720 independently, before consulting CondoClaw Memory
- When training data conflicts with the statutory baseline, the AI Concierge flags the conflict, explains it, and offers the corrected version
- The user can correct a mistake in chat and that correction improves future results
- The system correctly classifies a matter as Chapter 718 or Chapter 720 at intake and applies the correct workflow rules
- The system enforces timing between stages — a user cannot generate a Stage 2 document before the Stage 1 cure period has elapsed
- Statutory deadlines are automatically calculated and appear in the Schedule view linked to the correct matter and stage
- The user always knows the next required action and exactly when they are eligible to take it

---

## 28. Dual-Pipeline Architecture

### 28.1 The Core Distinction

CondoClaw must maintain two completely separate pipeline concepts that must never be conflated — in the data model, the UI, the workflow engine, or the codebase.

**Processing Pipeline** — the internal AI/system workflow used to transform uploaded documents into validated outputs. This is what the system is doing right now.

**Legal Stage Timeline** — the external legal lifecycle of the matter governed by statute and firm policy. This is where the matter legally stands.

These are not the same. A matter may run through the full Processing Pipeline multiple times within a single Legal Stage — for example, when a new ledger is uploaded mid-stage, the system re-processes it without the matter advancing legally.

---

### 28.2 Processing Pipeline

The Processing Pipeline represents the AI's internal sequence of operations on raw inputs. It is triggered by uploads, user actions, and system events. It may complete and re-run multiple times within one legal stage.

```
[1] Intake Documents
       ↓
[2] Extract & Normalize
       ↓
[3] Validate & Reconcile
       ↓
[4] Verify Ownership / Rules
       ↓
[5] Generate Draft
```

| Step | Description |
|------|-------------|
| Intake Documents | Accept NOLA, Ledger, Affidavit, Governing Docs. Store raw files. Begin OCR. |
| Extract & Normalize | Run NLP/OCR extraction on all documents. Populate Core Matter Variables. |
| Validate & Reconcile | Cross-document consistency checks. Detect conflicts, flag discrepancies. Classify as Eligible / Conditional / Blocked. |
| Verify Ownership / Rules | Agentic public record lookup. SunBiz entity match. Governing document rule extraction. |
| Generate Draft | Build statute-aware document from validated variables. Apply baseline + Memory templates. Surface for user approval. |

**Processing Pipeline characteristics:**
- Stateless relative to the Legal Stage — completing Processing does not advance the matter legally
- May be re-triggered by any new document upload without altering the matter's legal state
- Each run is logged with a unique processing run ID and timestamp
- The user sees the Processing Pipeline as the "AI is working" state; they see the Legal Stage Timeline as the "matter is here legally" state

---

### 28.3 Legal Stage Timeline

The Legal Stage Timeline reflects the legal reality of the matter — what notices have been sent, what periods are running, and what the matter's current legal posture is.

```
[1] NOLA / Pre-Lien Notice
       ↓
[2] Waiting Period  ← timer is actively running
       ↓
[3] Letter 1 (First Demand)
       ↓
[4] Letter 2 (Second Demand / Intent to Lien)
       ↓
[5] Claim of Lien
       ↓
[6] Foreclosure Referral  ← future
```

| Stage | Legal Significance | System Behavior |
|-------|--------------------|----------------|
| NOLA / Pre-Lien Notice | Statutory notice issued; cure period begins | Statute-specific cure period timer starts |
| Waiting Period | Owner has statutory right to cure | System blocks Stage 3 until period expires |
| Letter 1 | First formal demand following NOLA | May or may not be statutorily required depending on statute + firm policy |
| Letter 2 | Final pre-lien demand / intent notice | Required under most firm workflows before lien recording |
| Claim of Lien | Recorded against title in county public records | Frozen Evidence Snapshot (§30) is mandatory before filing |
| Foreclosure Referral | Escalation to litigation *(future)* | Not in MVP scope |

**Legal Stage Timeline characteristics:**
- Advances only when a legal action is completed and confirmed (notice sent, period elapsed, document filed)
- Each advance creates an immutable audit event and triggers a Frozen Evidence Snapshot (§30)
- Cannot be manually skipped without an explicit admin override with audit acknowledgment
- Is fully governed by the Effective Workflow Resolution Engine (§29)

---

### 28.4 How They Interact

```
Legal Stage: NOLI Sent → Waiting Period Active
                              ↓
    [New ledger uploaded → Payment detected]
                              ↓
    Processing Pipeline runs: Extract → Validate → Reconcile
                              ↓
    Variables updated · Ledger versioned · AI Concierge flags change
                              ↓
    Legal Stage: still "Waiting Period Active"  ← no change
                              ↓
    [Waiting period expires]
                              ↓
    Processing Pipeline runs: Verify Ownership → Generate Letter 1 Draft
                              ↓
    User approves draft → confirms mailing
                              ↓
    Legal Stage advances: Letter 1 Sent
```

The Processing Pipeline is a service called by the Legal Stage Timeline — not a substitute for it.

---

### 28.5 UI Implementation

The UI must expose both pipelines simultaneously but distinguish them visually:

**Processing Pipeline indicator** (displayed during active AI work):
```
AI Processing: [●●●○○] Extract & Normalize — Running
```

**Legal Stage Timeline** (permanently visible on every matter view):
```
NOLA ✅  →  Waiting Period ⏳ (12 days remaining)  →  Letter 1 🔒  →  Letter 2 🔒  →  Lien 🔒
```

The Legal Stage Timeline must be visible at all times — it is the master status of the matter. The Processing Pipeline indicator appears only when active, and disappears when complete.

---

## 29. Effective Workflow Resolution Engine

### 29.1 The Problem This Solves

The system must not assume a single universal sequence for all matters. Chapter 718 and Chapter 720 have different statutory mechanics. Firms have different internal letter policies. Associations have different governing document provisions. Counties have different filing requirements.

The Effective Workflow Resolution Engine resolves these layers into a single deterministic, matter-specific action sequence before any document is generated.

**The engine answers:** for this specific matter, at this specific firm, for this specific association, in this specific county — exactly which steps are mandatory, optional, or not applicable, and in what order?

---

### 29.2 Input Layers

For each matter, the engine consumes five input layers:

| Layer | Source | Examples |
|-------|--------|---------|
| Locked Statute Type | §10 classification result | Ch. 718 / Ch. 720 / Ch. 617 |
| Association Governing Documents | Declaration, Bylaws, Amendments | Late fee grace period, interest rate, attorney fee entitlement |
| County Filing Profile | §29.5 | Recording fees, formatting requirements, submission method |
| Firm Workflow Policy | Admin-configured per firm | How many internal letters, whether Letter 1 is optional |
| Matter-Specific Facts | Core Matter Variables (§7) | Amount owed, NOLA date, existing payments |

---

### 29.3 Output — The Effective Workflow

The engine produces a matter-specific, ordered action sequence. For each step, it assigns one of:

| Classification | Meaning |
|---------------|---------|
| `MANDATORY` | Required by statute — cannot be skipped or removed |
| `MANDATORY_CONDITIONAL` | Required only if specific facts are met (e.g., amount exceeds threshold) |
| `OPTIONAL_FIRM` | Firm has configured this step; user may skip with acknowledgment |
| `NOT_APPLICABLE` | Not required or relevant for this matter (e.g., no foreclosure referral if matter resolves) |
| `BLOCKED` | Cannot proceed — prerequisite condition not met |

**Example resolved workflow for a Ch. 720 HOA matter:**

```
Step 1 — NOLI [MANDATORY — §720.3085]
Step 2 — 45-day waiting period [MANDATORY — §720.3085]
Step 3 — Internal Demand Letter [OPTIONAL_FIRM — firm policy: enabled]
Step 4 — Final Pre-Lien Notice [OPTIONAL_FIRM — firm policy: enabled]
Step 5 — Claim of Lien [MANDATORY — after steps 1-2 satisfied]
Step 6 — Foreclosure Referral [NOT_APPLICABLE — MVP scope]
```

**Critical distinction:** The system must never label an internal firm letter as a statutory prerequisite, and never label a statutory requirement as optional. The distinction must be visible to the user in the UI.

---

### 29.4 Resolution Rules

The engine applies rules in strict priority order:

1. **Statute overrides everything.** If Ch. 718 requires 30 days, no firm policy can reduce it.
2. **Association governing documents may add requirements** beyond the statute (e.g., additional notice to registered agent) but cannot remove statutory requirements.
3. **Firm workflow policy applies within the statutory envelope.** The firm may choose to add optional internal letters; it cannot remove mandatory statutory steps.
4. **County Filing Profile applies at the lien recording step.** Local formatting and submission rules are mandatory but do not affect the pre-lien letter sequence.
5. **Matter-specific facts may activate or deactivate conditional steps** (e.g., waiver of notice, amount threshold).

---

### 29.5 County Filing Profile

Each Florida county where the firm operates must have a County Filing Profile stored in the system. The profile governs what is required at the Claim of Lien recording step.

**County Filing Profile fields:**

| Field | Example |
|-------|---------|
| `county_name` | Miami-Dade / Broward / Palm Beach |
| `recording_office_name` | Clerk of the Circuit Court |
| `recording_fee_schedule` | First page: $10.00, additional pages: $8.50 each |
| `accepted_document_format` | PDF / original paper |
| `submission_method` | E-recording (eFiling portal) / In-person / Mail |
| `cover_page_required` | Yes / No |
| `local_formatting_requirements` | Notes on margins, font, page size |
| `portal_url` | County e-recording URL (read-only reference) |
| `notes` | Any county-specific quirks relevant to lien filing |

The AI Concierge must reference the active County Filing Profile when the matter reaches the lien stage:
> "This lien is being filed in Broward County. The recording fee for a 2-page lien is $18.50. E-recording is required. Would you like me to prepare the cover page?"

---

### 29.6 AI Concierge Behavior

At the start of every matter, the AI Concierge must surface the resolved workflow:
> "I've resolved the effective workflow for this matter. Chapter 718 applies. The firm's letter policy is active. 3 steps are mandatory; 2 are optional per your firm settings. Here's the full sequence: [list]. Would you like me to walk you through it?"

If a step the user is attempting is classified as `NOT_APPLICABLE` or `BLOCKED`:
> "The [step] is not required for this matter under the resolved workflow. The next required action is [step]. Reason: [explanation]."

---

## 30. Frozen Evidence Snapshot

### 30.1 Why This Is Non-Negotiable

A live system that keeps changing after a legal document was created is dangerous in disputes. If an owner contests a lien six months after filing and the platform's live matter state has since changed — new payments, new ledger versions, updated ownership data — the firm must be able to produce an exact copy of what existed at the moment of filing.

The Frozen Evidence Snapshot ensures this is always possible.

---

### 30.2 Trigger Points

A Frozen Evidence Snapshot must be created automatically before any of the following actions is finalized:

| Trigger | Snapshot Label |
|---------|---------------|
| NOLI / Pre-Lien Notice approved for mailing | `Snapshot_NOLI_[matter_id]_[date]` |
| First Letter approved for mailing | `Snapshot_Letter1_[matter_id]_[date]` |
| Second Letter approved for mailing | `Snapshot_Letter2_[matter_id]_[date]` |
| Claim of Lien approved for filing | `Snapshot_Lien_[matter_id]_[date]` |
| Foreclosure Referral package finalized | `Snapshot_Foreclosure_[matter_id]_[date]` |

Snapshot creation is automatic — it does not require user action. It cannot be skipped or deleted.

---

### 30.3 Snapshot Contents

Every Frozen Evidence Snapshot must contain the following, each stored as an immutable file or JSON record:

| Component | Contents |
|-----------|---------|
| Frozen Ledger Version | The exact approved Excel ledger file used — linked by `ledger_version_id` |
| Frozen Core Matter Variables | All 13+ variables with value, source, confidence, last confirmed timestamp, and confirming user |
| Frozen Ownership Verification | The public record result used — owner name, address, deed date, parcel, source URL |
| Frozen Statute Text/Version | The statute version used at the time (date-stamped reference to Ch. 718 or 720) |
| Frozen Fee & Cost Set | Attorneys' fees, recording fees, late fees, interest — as applied at the moment of generation |
| Frozen Document Output | The exact generated document file (PDF + Word), unmodified |
| Frozen Mailing Package | The mailing metadata set at the time the notice was sent (§31) |
| Snapshot Timestamp | UTC ISO 8601 |
| Snapshot Author | User who triggered the finalizing action |

---

### 30.4 Immutability Rules

- A snapshot is write-once. It cannot be edited, updated, or deleted after creation — by any user including Admin.
- If a matter is re-processed after a snapshot (e.g., new ledger uploaded), the new processing does not alter the prior snapshot.
- All downstream proof, audit records, dispute responses, and compliance certifications must reference the relevant frozen snapshot, not the live matter state.
- The AI Concierge must be able to reconstruct the state of any matter at any prior snapshot point on demand.

---

### 30.5 UI Access

The matter file must expose a **Snapshots** tab listing all frozen evidence snapshots in chronological order. Each snapshot must:
- Show its label, trigger event, and timestamp
- Allow download of the full snapshot bundle as a ZIP
- Allow the AI Concierge to explain what it contains
- Be clearly marked as "Immutable — cannot be edited"

---

### 30.6 Relationship to Ledger Versioning

The ledger versioning system (§12.5) and the Frozen Evidence Snapshot are complementary:
- Ledger versions track the ledger's own evolution (payment applied, correction made)
- Frozen Evidence Snapshots bind a specific ledger version — plus all other relevant state — to a specific legal action
- A single ledger version may be referenced by only one snapshot (the one created when that version was used for generation)

---

## 31. Mailing & Service Proof Engine

### 31.1 Why This Is a First-Class Subsystem

In Florida condominium and HOA collection law, proper service of notice is not a formality — it is a legal prerequisite. A lien can be challenged and invalidated if the required notice was not properly served. CondoClaw must treat mailing and service proof as a first-class subsystem, not an afterthought.

---

### 31.2 What Is Tracked Per Notice

For every generated notice or lien-related communication, the system must capture and store the following:

| Field | Description |
|-------|-------------|
| `intended_recipients` | All parties who must be served (owner, registered agent if applicable) |
| `addresses_used` | Exact addresses used for mailing |
| `address_source` | Where each address came from (NOLA / Public Record / User Entry / SunBiz) |
| `address_confidence` | Confidence level of the address at time of mailing |
| `mailing_method` | Certified Mail / First Class / Both (per statute requirements) |
| `certified_tracking_number` | USPS tracking number(s) |
| `send_date` | Date mailed |
| `send_confirmed_by` | User who confirmed mailing |
| `return_status` | Delivered / Returned Undeliverable / Unclaimed / Unknown |
| `return_date` | Date return received, if applicable |
| `return_notes` | Reason for return (address unknown, refused, etc.) |
| `affidavit_generated` | Whether a proof-of-mailing affidavit was generated |
| `affidavit_version_id` | Link to the specific generated affidavit document |
| `snapshot_id` | Link to the Frozen Evidence Snapshot (§30) this mailing is part of |

---

### 31.3 Stage Advancement Gate

No legal stage that depends on service may advance until the required proof metadata is captured or explicitly overridden with audit acknowledgment.

| Stage Transition | Required Before Advancing |
|-----------------|--------------------------|
| NOLI Sent → Waiting Period Active | Mailing method confirmed, send date entered, tracking number captured |
| Letter 1 Sent → Letter 2 Eligible | Same as above |
| Letter 2 Sent → Lien Eligible | Same as above |
| Lien Filed | Recording confirmation or file number required |

If mailing proof is not captured and the user attempts to advance:
> "Before advancing this matter, please confirm the mailing details for the [document name]. Enter the tracking number, send date, and mailing method to proceed."

---

### 31.4 Return Mail Handling

If mail is returned undeliverable, the system must:
1. Flag the matter with a `RETURN_MAIL` status indicator
2. Block further stage advancement pending resolution
3. Surface address verification options via AI Concierge:
   > "Certified mail for matter #CC-8921 was returned undeliverable on [date]. I can re-verify the address against current public records. Would you like me to do that now, or would you like to manually enter a corrected address?"
4. Log the return event in the audit trail with all available return metadata
5. If a corrected address is used, create a new mailing record — the old (failed) mailing record is preserved, not overwritten

---

### 31.5 Mailing Affidavit Generation

The system must generate a Mailing Affidavit for every notice, bound to the Frozen Evidence Snapshot for that notice. The affidavit must include:
- Date of mailing
- Name and address of recipient
- Address used (with source)
- Mailing method and tracking number
- Name of person who mailed it
- Statement of compliance with applicable statute

The affidavit is generated from the frozen snapshot — not from the live matter state — so it will always match the document it accompanies.

---

### 31.6 AI Concierge Behavior

**After document is approved and ready to mail:**
> "The First Letter for matter #CC-8921 is ready to mail. Please send via Certified Mail and First Class Mail to: [address from verified source]. Once sent, enter the tracking number here so I can start the statutory waiting period and schedule the next step."

**After tracking number entered:**
> "Tracking number confirmed. The 45-day statutory waiting period begins today, [date]. I've scheduled a reminder for [date] when Letter 2 becomes eligible. I'll alert you if the mail is returned."

**On return mail detected:**
> "Certified mail for [Owner] at [address] was marked undeliverable on [date]. This may affect the validity of service. I recommend re-verifying the address before proceeding."

---

## 32. Workflow Runtime Requirements & Event Architecture

### 32.1 Why This Matters

Matters may remain active for weeks or months. During that time, new payments arrive, ledgers are updated, ownership changes, governing documents are amended, and statutory deadlines expire. A system that stores state in a database row and processes it on-demand is insufficient.

CondoClaw's workflow engine must be implemented as a durable, event-driven orchestration system.

---

### 32.2 Workflow Runtime Requirements

The workflow engine must satisfy all of the following:

| Requirement | Description |
|-------------|-------------|
| **Deterministic execution** | Given the same inputs and events, the workflow must always produce the same state |
| **Durable workflow history** | Full event history must be persisted — no state exists only in memory |
| **Idempotent external actions** | Duplicate events (e.g., double-upload) must not cause duplicate processing |
| **Retriable activities** | OCR, public record lookups, and SunBiz queries must retry on failure without re-running the whole workflow |
| **Human approval gates** | Workflow must pause and wait — indefinitely if necessary — for user confirmation at every required approval point |
| **Long-running timers** | Statutory waiting periods (30 days, 45 days) must be implemented as durable timers, not polling loops |
| **Message deduplication** | For uploads, approvals, and payment events — ensure each is processed exactly once |
| **Cancellation and override** | Admin must be able to cancel, pause, or override a running workflow with full audit trail |

**Technology note:** LangGraph (§23.7) is the recommended implementation path for durable, stateful, human-in-the-loop workflows. Temporal is an alternative if multi-service orchestration is required at scale.

---

### 32.3 Domain Event Architecture

CondoClaw must be modeled around explicit domain events. Every significant state change is an event — not a database mutation. Events are immutable, append-only, and form the authoritative history of the matter.

**Core domain events:**

| Event | Triggered By |
|-------|-------------|
| `DocumentUploaded` | User uploads NOLA, Ledger, Affidavit, or Governing Doc |
| `OCRCompleted` | OCR pipeline finishes processing a document |
| `VariablesExtracted` | Core Matter Variables populated from extraction |
| `ValidationCompleted` | Intake Validation & Eligibility Engine finishes |
| `OwnershipVerified` | Public record lookup returns a confirmed result |
| `RulesExtracted` | Association governing document rules extracted and stored |
| `StatuteDetermined` | Association classification confirmed; statute locked |
| `LedgerReconciled` | Payment Detection & Reconciliation Engine completes a run |
| `PaymentDetected` | New payment or credit identified in an updated ledger |
| `StageEligibilityReached` | Statutory waiting period elapsed; next stage is now unlocked |
| `DraftGenerated` | A document draft has been produced and is awaiting approval |
| `DraftApproved` | User confirmed a generated draft |
| `DraftRejected` | User rejected a generated draft (triggers learning signal) |
| `MailSent` | User confirmed a notice was mailed; tracking number captured |
| `AffidavitGenerated` | Mailing affidavit produced and bound to frozen snapshot |
| `MailReturned` | Return mail detected; matter flagged |
| `LienFiled` | Claim of Lien recording confirmed; filing details captured |
| `FrozenSnapshotCreated` | Immutable evidence snapshot created for a legal action |
| `MatterClosed` | Matter marked resolved — paid, settled, or lien released |
| `EligibilityOverridden` | Admin overrode a validation block (logged with reason) |
| `PayoffRequested` | User initiates a payoff / estoppel generation for the matter |
| `PayoffLedgerVerified` | Pre-payoff ledger verification completed (new upload, payment entered, or no-change confirmed) |
| `PayoffGenerated` | Payoff / estoppel document draft produced and awaiting user approval |
| `PayoffApproved` | User approved payoff for delivery |
| `PayoffSnapshotCreated` | Frozen Payoff Snapshot created and bound to the approved payoff document |
| `VariableOverridden` | A Core Matter Variable was corrected via the Owner File or Matter Data Panel |

---

### 32.4 Event-Driven Benefits for CondoClaw

| Benefit | Impact |
|---------|--------|
| Full audit trail by default | Every event is inherently an audit record — no separate logging layer needed |
| Replay capability | Any matter's history can be replayed to reconstruct state at any point in time |
| Frozen snapshot accuracy | A snapshot is just a projection of events up to a moment in time — inherently reliable |
| Retry safety | If a step fails mid-workflow, replaying from the last successful event is safe |
| Learning system accuracy | The Alpha Learning Loop (§18.11) fires only on `DraftApproved` and `DraftRejected` — never on intermediate events |
| Long-running matter support | Timers and waiting periods are native to event-driven workflows — no polling required |

---

### 32.5 Event Consumption Rules

- Events must be consumed in order per matter (ordered by timestamp)
- Events are never deleted — only superseded by later events
- The `EligibilityOverridden` event type carries special audit weight — it must always include the overriding user, timestamp, reason, and the original blocking event ID
- The `FrozenSnapshotCreated` event is the canonical reference point for all legal actions — any dispute, export, or audit query resolves against this event and its payload

---

## 33. Payoff Generation Engine

### 33.1 Core Principle

A payoff must be a first-class workflow in CondoClaw — not a variant of another document type. It can be triggered at any point in the matter's lifecycle, independent of what legal stage the matter is currently in. It is always generated from the current legal and financial state of the matter, after mandatory ledger verification.

> **The system must never generate a payoff from a stale ledger.**

A payoff output is separate from the NOLA, First Letter, Second Letter, and Claim of Lien workflows. It does not advance the matter state machine. It is a point-in-time financial and legal certification.

---

### 33.2 Statutory Logic

The system must determine the governing statute for the matter before generating any payoff output.

| Statute | Governing Document | Payoff / Estoppel Type |
|---------|-------------------|----------------------|
| Chapter 718 | Florida Condominiums Act | Estoppel Certificate (§718.116(8)) |
| Chapter 720 | Homeowners' Associations Act | Estoppel Certificate (§720.30851) |
| Chapter 617 overlay | Florida Not For Profit Corporation Act | Applies as corporate-governance overlay; does not replace 718/720 payoff logic |

The system must use the statute-specific rule set locked to the matter (§10). Template content, required fields, statutory citations, and effective period rules must match the governing chapter.

---

### 33.3 Payoff Request Workflow

When a user initiates a payoff request, the system must execute the following steps in order:

1. **Check statute lock** — confirm the matter's statute type is locked (`STATUTE_DETERMINED` state or later). If not, block and prompt: "Statute type must be confirmed before a payoff can be generated."

2. **Run pre-payoff ledger verification** — trigger the same pre-generation gate as §16.11, but scoped to payoff. The system must prompt:

```
┌─────────────────────────────────────────────────────────┐
│  Payoff Ledger Verification                              │
│                                                          │
│  Last ledger update: [N] days ago                        │
│  Current balance: $[X]                                   │
│                                                          │
│  Before generating the payoff, confirm the current       │
│  financial state:                                        │
│                                                          │
│  [Upload Updated Ledger]                                 │
│  [Enter Payment / Credit Manually]                       │
│  [Confirm No Changes Since Last Ledger]                  │
└─────────────────────────────────────────────────────────┘
```

3. **Re-run payment detection and reconciliation** — if a new ledger is uploaded or a payment is entered, run the full reconciliation engine (§12.15) before proceeding. Create a new versioned ledger snapshot.

4. **Recalculate all amounts due as of payoff issue date** — include all accrued interest, late fees, assessments, attorney fees, and costs as of the date the payoff is being issued. Apply the stale balance classification rules (§16.11.8) before accepting the current state.

5. **Generate payoff / estoppel document** from the frozen, current matter state.

6. **Create Frozen Payoff Snapshot** (§33.6) — bind all state used in generation to an immutable record.

---

### 33.4 Payoff Output Requirements

The generated payoff / estoppel certificate must include all fields applicable under the governing statute. The following fields are required by one or both chapters:

| Field | Chapter 718 | Chapter 720 | Notes |
|-------|------------|------------|-------|
| Date of issuance | ✓ | ✓ | System date at time of generation |
| Owner name(s) as reflected in association records | ✓ | ✓ | From verified Core Matter Variables |
| Unit / parcel designation and address | ✓ | ✓ | Full legal description |
| Attorney contact information | ✓ | ✓ | If matter is in collections / turned over |
| Itemized list of all sums currently owed | ✓ | ✓ | From approved current ledger |
| Itemized list of sums scheduled to become due during the effective period | ✓ | ✓ | From Time-Awareness Engine (§16) |
| Transfer / resale / capital contribution fees | Conditional | Conditional | If applicable under governing documents |
| Additional statutory required fields | Per §718.116(8) | Per §720.30851 | Statute-specific language generated automatically |
| Effective period of the certificate | ✓ | ✓ | 30 days for Ch. 718; 30 days for Ch. 720 |
| Preparation and delivery fee | Conditional | Conditional | If permitted by statute and governing documents |

**Amounts in the payoff are calculated as of the payoff issue date**, not as of the last ledger upload date. The Time-Awareness Engine (§16) must accrue interest and fees to the exact issue date before the payoff is finalized.

---

### 33.5 Amended Payoff Rule

If the association's financial data changes after a payoff is issued but before the effective period expires, the system must support amended payoff generation. An amended payoff:

- Is generated as a new document version, not a replacement
- References the original payoff version it supersedes
- Creates a new Frozen Payoff Snapshot
- AI Concierge must surface a warning: "An amended payoff may be required. The balance changed by $[X] after the original payoff was issued on [date]. Would you like me to generate an amended payoff?"

---

### 33.6 Frozen Payoff Snapshot

Every payoff output must be bound to an immutable snapshot. This snapshot is created automatically after the user approves the payoff for delivery. It cannot be deleted or edited.

**Snapshot contents:**

| Component | Contents |
|-----------|---------|
| Ledger version used | Exact ledger snapshot ID used to calculate amounts |
| Core Matter Variables | All variables with provenance, as of payoff issue date |
| Statute type used | 718 / 720 — locked |
| Declaration rules used | Interest rate, late fee, grace period — with source page citation |
| Payoff issue date | Date the certificate is issued |
| Payoff effective period | Start date and expiration date |
| Generated document version | PDF + Word, unmodified |
| Preparation fee charged | If applicable |

**Snapshot label convention:** `Snapshot_Payoff_[matter_id]_[YYYYMMDD]`

> Cross-reference: The Frozen Payoff Snapshot follows the same immutability rules as all Frozen Evidence Snapshots (§30). It appears in the matter's Snapshots tab alongside all other snapshots.

---

### 33.7 Live Ledger Dependency — Enforcement Rules

| Scenario | System Behavior |
|----------|----------------|
| Ledger is current (within staleness window, no changes detected) | Payoff proceeds after user confirmation |
| Ledger is stale — usable (aging but no material changes) | AI Concierge warns; user must confirm before payoff generation |
| Ledger is stale — must regenerate (payment detected, new assessment, material accrual) | Generation **blocked** until new ledger is uploaded and reconciled |
| User attempts to generate payoff with no approved ledger version | Hard block: "No approved ledger exists for this matter. Please upload and approve a ledger before generating a payoff." |
| Payoff generated for a matter in `DRAFT` state | Hard block: "Payoff cannot be generated until the matter has been fully configured and validated." |

---

### 33.8 Learning Behavior

If the firm has uploaded prior payoff / estoppel examples to CondoClaw Memory (§18), the system may adapt formatting, section structure, and phrasing to match firm-specific practice.

**Learning rules specific to payoffs:**
- User-provided examples may refine style, layout, and language — but may not override any statutory required field or calculated amount
- Payoff documents generated from stale ledgers are excluded from the learning dataset (per §18.9.1 Banned Learning Sources)
- Payoff examples tied to matters later reclassified under a different statute are excluded from learning
- The Effective Period calculation is always statute-driven, never overrideable by a training example

---

### 33.9 AI Concierge Behavior

**On payoff initiation:**
> "This matter is governed by Chapter [718/720]. I'll generate the payoff / estoppel certificate under [statute cite]. Before I proceed, has there been any payment, credit, or adjustment since the last ledger update on [date]?"

**On stale ledger detected:**
> "The current ledger is [N] days old. Before generating a payoff, I need to confirm the current balance. Please upload an updated ledger or confirm no changes have occurred."

**On payment detected during pre-payoff reconciliation:**
> "A payment of $[X] was detected in the updated ledger, posted [date]. The updated balance is $[Y]. The payoff will use this reconciled balance as of [payoff issue date]. Shall I proceed?"

**On effective period and amended payoff:**
> "This payoff certificate is effective for 30 days from [issue date], expiring on [expiry date]. If the balance changes during this period — for example, if a new assessment is posted — an amended payoff may be required. I'll monitor the matter and alert you if that happens."

**On mismatch between live ledger and last generated document:**
> "The current calculated balance ($[X]) differs from the balance used in the last generated [document type] ($[Y]). The payoff will use today's calculated balance. The difference is $[delta] — this reflects [explanation: e.g., accrued interest since last generation]. Would you like me to explain the breakdown?"

---

### 33.10 UI Requirements

The payoff workflow must be accessible as a standalone action on every active matter, regardless of current legal stage.

**Entry point:** "Generate Payoff / Estoppel" button — visible on the Matter detail page, not gated by stage

**Payoff panel (step-by-step wizard):**
1. Statute confirmation banner (auto-shown, cannot be skipped)
2. Ledger verification prompt (§33.3, Step 2)
3. Itemized amounts preview — all line items, issue date, effective period
4. Payoff document preview (editable before approval)
5. Approval and snapshot creation step

**After generation:**
- Payoff document added to the matter's Documents tab
- Frozen Payoff Snapshot added to the matter's Snapshots tab
- AI Concierge confirms effective period and next steps

---

## 34. Owner File — Reusable Fields Panel

### 34.1 Core Principle

Stable matter variables must not be buried inside individual documents. They must be visible, copyable, editable, and traceable from a persistent Owner File that functions as the canonical workspace for every field that recurs across the ledger, NOLA, mailing affidavit, declaration, payoff, letters, lien, and court-facing outputs.

The Owner File is not a form — it is a live, sourced data layer. Every field displayed in the Owner File is the same field stored in Core Matter Variables (§7). The Owner File is the primary UI surface for that data.

---

### 34.2 Required Reusable Fields

The Owner File must display, at minimum:

| Field | Notes |
|-------|-------|
| Owner Name | As verified across NOLA, affidavit, and public records |
| Property Address | Unit address — distinct from mailing address |
| Mailing Address | Where all legal notices are sent |
| Unit Number | From NOLA and ledger — must be consistent |
| Legal Description | Parcel / lot description from county public records |
| Association Name | Full legal name, matched to SunBiz if available |
| Statute Type | Chapter 618 / 720, or both if Chapter 617 overlay applies |
| Attorney Contact | Firm name, attorney name, phone, address — if matter is in collections |
| Current Balance Due | From the most recently approved ledger version |
| Ledger Version in Use | Label of the current approved ledger snapshot |
| Declaration Rule Source | Document name, page, and section if interest / fees are declaration-driven |

---

### 34.3 Field Actions

Every field in the Owner File must support the following actions:

| Action | Behavior |
|--------|---------|
| **Copy** | One-click copy to clipboard. Works for single values (e.g., "Copy Owner Name") and compound values (e.g., "Copy Mailing Address" as formatted block) |
| **Edit** | Opens inline edit mode. Change requires confirmation. Triggers audit log entry and re-validation. |
| **View Source** | Expands a provenance drawer showing: source document, extraction anchor (page/line), confidence score, extraction timestamp |
| **View History** | Shows all prior values for this field across the matter's history — original extracted value, any corrections, who made them, and when |

**Copy examples available:**
- Copy Owner Name
- Copy Mailing Address (formatted for notice)
- Copy Property Description (for document header)
- Copy Legal Description (for lien / court filing)
- Copy Balance Due as of [date]
- Copy Full Matter Header (multi-field block: owner, address, unit, association, balance)

---

### 34.4 Field Provenance Display

For each reusable field, the UI must show:

```
Owner Name:  Patricia Hines
  Source:     Public Record (County Property Appraiser)
  Page/Line:  Parcel lookup — retrieved 2026-04-01
  Confidence: 0.97 [High]
  Confirmed:  2026-04-01 09:14 UTC  by jsmith@firm.com
  Frozen in:  Snapshot_NOLI_CC8921_20260401
              Snapshot_Letter1_CC8921_20260419
```

If a field has been frozen into one or more evidence snapshots, the Owner File must display all snapshot references. The field cannot be silently edited — any correction creates a new matter event and the frozen snapshots are preserved as-is.

---

### 34.5 System Behavior on Field Correction

When a reusable field is corrected in the Owner File:

1. The canonical variable store (Core Matter Variables, §7) is updated immediately
2. A `VariableOverridden` event is logged in the audit trail with: field name, original value, new value, user, timestamp, reason (required)
3. The AI Concierge surfaces impact analysis:
   > "I've updated the Mailing Address from '4021 Palm Ave' to '4201 Palm Ave'. This field is used in 2 pending documents. The Second Letter draft and the Payoff template reference this address — they should be regenerated before sending. Would you like me to flag them for review?"
4. Documents that were generated using the old value are flagged in the Documents tab with a `Variable Updated` warning — they are not automatically regenerated, but the user is clearly prompted to do so
5. Frozen snapshots that contain the old value are **not altered** — they are preserved as accurate records of what was used at that point in time

---

### 34.6 Frozen Field Rules

A field that has been frozen into an evidence snapshot (§30) is marked `Frozen` in the Owner File. The following rules apply:

- A `Frozen` field cannot be edited via the normal Edit action
- To correct a frozen field, the user must use the AI Concierge to initiate a correction event — which creates a new matter variable record without modifying the snapshot
- The correction event is logged with: original frozen value, corrected value, snapshot(s) affected, user, timestamp, reason
- The AI Concierge must explain the implication: "This field is frozen in [snapshot name]. Correcting it will not alter the snapshot — the snapshot is a permanent record of what was used at the time of [action]. However, all future document generation will use the corrected value."

---

### 34.7 Owner File vs. Matter Data Panel

The Owner File (§34) and the Matter Data Panel (§7.6) display overlapping data but serve different purposes:

| | Owner File | Matter Data Panel |
|--|-----------|------------------|
| **Primary purpose** | Operational workspace — copy, edit, reuse fields across documents | Validation surface — review extraction results, resolve conflicts, confirm variables |
| **When used** | Throughout the matter lifecycle, for document preparation | At intake and after any document upload, to review and validate extraction |
| **Key actions** | Copy, Edit, View Source, View History | Review conflict, Confirm value, Override value |
| **Scope** | All stable matter fields (owner, property, financial, legal) | All Core Matter Variables including dynamic ones (balances, dates) |

Both panels read from and write to the same underlying Core Matter Variables store. A change in one is immediately reflected in the other.

---

### 34.8 AI Concierge Behavior

**On matter creation (first time Owner File is populated):**
> "I've extracted the owner information from the uploaded documents. Owner Name, Property Address, and Legal Description have high confidence. Mailing Address is medium confidence — the NOLA and affidavit show slightly different formats. Please confirm the correct mailing address before proceeding."

**When user copies a field:**
> *(No prompt — silent copy. AI Concierge available if user asks for clarification about the value.)*

**When user edits a field:**
> "You're updating [field name] from '[old value]' to '[new value]'. This field is currently used in [N] documents. The change will be logged and future generations will use the new value. Documents already generated will be flagged for review. Confirm?"

**When a frozen field edit is attempted:**
> "This field is frozen in [snapshot name] from [date]. I can create a correction record that will apply going forward, without altering the snapshot. The snapshot will remain as an accurate record of what was filed. Would you like to proceed with a correction?"

---

### 34.9 UI Requirements

**Location:** Owner File is a tab on the Unit Owner detail page. It is also accessible from the Matter detail page via a sidebar panel labeled "Owner & Matter Fields."

**Layout:**
- Fields grouped into: Identity & Property / Financial / Legal / Attorney & Contact
- Each group is collapsible
- Field count badge per group (e.g., "Identity & Property — 5 fields, 1 conflict")
- A global "Copy Full Header" button at the top of the panel — copies the full formatted matter header block

**Status indicators per field:**
- 🟢 `Verified` — confirmed by user or public record
- 🟡 `Pending` — extracted but not yet confirmed
- 🔴 `Conflict` — value differs across sources; user action required
- 🔒 `Frozen` — locked into one or more evidence snapshots

---

## 35. Document Storage, Versioning & File Integrity

### 35.1 Core Principle

> **No document is ever lost.**

All documents generated or uploaded in a matter must be permanently stored, fully versioned, traceable, and never deleted or overwritten. The system maintains two simultaneous truths:

- **Historical record** — everything that was created, in the order it was created, including incorrect and superseded versions
- **Current active version** — the version that should be used now for sending, filing, or legal reliance

This is not a nice-to-have. In legal practice, mistakes happen, documents get sent, and the firm must be able to prove exactly what happened — including what was wrong. The system must preserve that history unconditionally.

---

### 35.2 Document Storage Structure

Each matter must organize all documents into the following hierarchy:

```
Matter
  └── Documents
        ├── Source Documents
        │     ├── NOLA (uploaded)
        │     ├── Original Ledger (PDF)
        │     └── Mailing Affidavit
        │
        ├── Generated Documents
        │     ├── First Letter (all versions)
        │     ├── Second Letter (all versions)
        │     ├── Claim of Lien (all versions)
        │     ├── Payoff / Estoppel (all versions)
        │     └── Third-Party Authorization (all versions)
        │
        ├── Ledger Files
        │     └── Excel Ledger Versions (Ledger_v1 through Ledger_vN)
        │
        └── Archived / Superseded
              ├── Old document versions (all types)
              └── Documents flagged as incorrect
```

Every folder is permanent. Nothing is deleted from any folder. Superseded documents move to Archived / Superseded but remain fully accessible. Source documents are never modified after upload — they are the original evidentiary record.

---

### 35.3 Document Versioning Rules

Every time a document is generated, edited, regenerated, or corrected, a new version is created. The prior version is preserved exactly as it was.

**Versioning is automatic and non-optional.**

**Version label convention:**

```
First_Letter_v1   ← Initial generation
First_Letter_v2   ← Corrected (variable update)
First_Letter_v3   ← Post-payment regeneration
```

**What triggers a new version:**

| Trigger | Version Behavior |
|---------|----------------|
| Document generated for the first time | v1 created |
| User edits and saves a draft | New version created from edited state |
| Regeneration after ledger update | New version created; prior version preserved |
| Regeneration after variable correction | New version created; prior version preserved |
| Regeneration after statute reclassification | New version created; all prior versions flagged with statute conflict warning |
| User explicitly marks prior version as superseded | Status updated; version record unchanged |

**Version numbers never reset.** If a matter has 5 versions of the First Letter and a new one is generated, it is v6 — not v1 again.

---

### 35.4 Document Status Labels

Every version of every document must carry exactly one status at all times.

| Status | Meaning | Used For |
|--------|---------|---------|
| `Active` | This is the current, correct version | Sending, filing, legal reliance, generation references |
| `Draft` | Generated but not yet approved by user | Internal review only — cannot be sent or filed |
| `Superseded` | A newer version exists and has been made Active | Preserved for history; not for current use |
| `Flagged` | System or user detected a potential issue | Requires review before use; AI Concierge surfaces the flag |
| `Incorrect` | User explicitly marked this version as wrong | Preserved permanently; labeled clearly; excluded from all generation references |

**Rules:**
- Only one version per document type per matter may hold `Active` status at a time
- Making a new version `Active` automatically moves the prior `Active` version to `Superseded`
- `Incorrect` is a user-initiated status; the system never auto-marks a document as incorrect
- `Flagged` is set by the system (e.g., variable updated after generation, stale ledger); user must resolve or acknowledge

---

### 35.5 Active vs. Historical Separation

**Active document:** The single version of a document type that is currently valid for legal use — sending, filing, and document references. Always clearly identified in the UI with an `Active` badge.

**Historical documents:** All other versions — superseded, flagged, incorrect, and prior drafts. Stored permanently. Accessible at any time. Cannot be deleted by any user. Must be clearly labeled with their status.

> **Even incorrect documents must remain stored.** A document that was sent in error is still evidence of what occurred. Deleting it would destroy the firm's ability to defend against a challenge. The system must preserve it and label it `Incorrect` — not remove it.

**Access rule:** Historical documents are accessible via the matter's document history view. The primary action panel always shows only the `Active` version.

---

### 35.6 Ledger–Document Link

Every generated document must store a permanent reference to the exact ledger state that produced it.

**Required fields stored on every generated document:**

| Field | Value |
|-------|-------|
| `ledger_version_id` | ID of the specific versioned ledger snapshot used |
| `ledger_version_label` | Human-readable label (e.g., `Ledger_v3_Post-Payment`) |
| `balance_used` | Total balance at time of generation |
| `balance_date` | Date the balance was confirmed as current |
| `generated_at` | UTC timestamp |
| `generated_by` | User who triggered generation |
| `snapshot_id` | Frozen Evidence Snapshot (§30) this document is bound to, if finalized |

**UI display example:**
```
First Letter v2
  Status:         Active
  Generated:      2026-04-15 by jsmith@firm.com
  Ledger Used:    Ledger_v3_Post-Payment (approved 2026-04-14)
  Balance Used:   $4,062.18
  Snapshot:       Snapshot_Letter1_CC8921_20260415
```

If a document was generated from a ledger version that has since been superseded by a newer version with material changes, the document must be automatically flagged:
> "This document was generated from Ledger v3. A newer ledger version (v4) exists with a different balance. This document may be outdated."

---

### 35.7 Payoff & Third-Party Documents

These document types follow all standard versioning rules and receive additional tracked fields.

**Payoff / Estoppel documents:**
- Multiple versions allowed across the matter lifetime
- Each version stores: ledger version used, payoff issue date, effective period, statute type, and whether it supersedes a prior payoff
- A Frozen Payoff Snapshot (§33.6) is created when a payoff version is approved — it permanently binds all state used in that version
- Amended payoffs reference the original payoff version they supersede via `supersedes_snapshot_id`

**Third-Party Authorization forms:**
- Stored in the matter document system, linked to the third-party record
- Versioned: a new authorization is a new version — the old one moves to `Superseded`
- The active authorization governs all actions taken on the matter on behalf of that third party
- Revoked authorizations must be marked `Superseded` immediately and logged with the reason

---

### 35.8 UI Requirements

**Documents tab on every matter must display:**

For each document type, the primary row shows the `Active` version. A "Show all versions" toggle expands to show the full version history.

**Per-document row (Active):**

| Field | Display |
|-------|---------|
| Document type | First Letter |
| Version | v3 |
| Status | `Active` badge (green) |
| Date created | 2026-04-15 |
| Ledger version used | Ledger_v3_Post-Payment |
| Actions | View · Download · Compare Versions · Show History |

**Per-document row (historical, expanded):**

| Field | Display |
|-------|---------|
| Version | v2 |
| Status | `Superseded` badge (grey) |
| Date created | 2026-04-01 |
| Reason for supersession | Post-payment regeneration |
| Actions | View · Download · Compare with Active |

---

### 35.9 Version Comparison

The user must be able to compare any two versions of the same document type side by side.

**Access:** "Compare Versions" button on any document row.

**Comparison view shows:**
- Full text of both versions rendered side by side
- Changed amounts highlighted in amber
- Changed names or addresses highlighted in amber
- Added or removed language highlighted in green / red
- Ledger version and balance used, shown per version at the top
- Statute version used, shown per version
- Summary panel: "3 changes detected — 1 amount, 1 address, 1 statutory language update"

**Comparison is available between any two versions** — not just consecutive ones. The user may compare v1 vs v4 directly.

---

### 35.10 AI Concierge Behavior

**When a new version is generated:**
> "A new version of the First Letter (v3) has been generated using the updated ledger (Ledger_v3_Post-Payment). The balance changed from $4,562.18 to $4,062.18. The prior version (v2) has been moved to Superseded. Would you like to review the changes before approving v3?"

**When user attempts to send or use an outdated version:**
> "This document is outdated. First Letter v3 is the current active version, generated on [date] with balance $4,062.18. First Letter v2 used an older balance. Would you like to proceed with v3 instead?"

**When a document is flagged due to upstream variable change:**
> "The Mailing Address was updated after this document was generated. First Letter v2 contains the old address. You should regenerate before sending. I can do that now — would you like me to?"

**When user marks a document as Incorrect:**
> "First Letter v1 has been marked as Incorrect and moved to the Archived section. It remains permanently stored and accessible for reference. The current Active version is v3."

---

### 35.11 Audit Trail Integration

Every document lifecycle event must be logged in the audit trail (§17.10):

| Event | Logged Fields |
|-------|--------------|
| Document uploaded (source) | File name · File hash · Upload timestamp · User · Matter |
| Document generated | Document type · Version · Ledger version ID · Balance used · Statute type · User · Timestamp |
| Document version approved | Version · User · Timestamp |
| Document sent / mailed | Version · Recipient · Address · Mailing method · Tracking number · Timestamp |
| Document marked Superseded | Prior version · New Active version · Reason · User · Timestamp |
| Document marked Incorrect | Version · Reason · User · Timestamp |
| Version comparison viewed | Versions compared · User · Timestamp |
| Document downloaded | Version · User · Timestamp |

---

### 35.12 File Integrity Rules

To ensure stored documents are exactly what was generated and have not been altered:

- Every stored document file is hashed at write time (SHA-256) and the hash is stored in the `documents` table (`file_hash` column)
- On every download or display, the file hash is recomputed and compared — a mismatch triggers an integrity alert and blocks the download
- Document files are stored in a write-once directory structure — no process may overwrite an existing file path
- A new version always writes to a new file path; the prior version's file path is never reused
- File deletion is not permitted at the storage layer; status changes (`Superseded`, `Incorrect`) exist only at the metadata layer

---

### 35.13 Compliance & Legal Protection

| Protection | Mechanism |
|-----------|----------|
| **Full communication history** | Every document ever generated is preserved — the firm can produce what was sent and what was created but not sent |
| **Dispute defensibility** | If an owner contests an amount, address, or notice, the firm can produce the exact document sent, the exact ledger it was based on, and the exact ownership data used at that moment |
| **Error accountability** | If a document was sent in error, the firm can show exactly what happened — when the incorrect version was generated, when it was corrected, and what changed — without gaps |

> **One-line definition:** CondoClaw maintains a permanent, versioned legal record of every document ever generated, while clearly identifying the correct, current version.

---

## 36. Unit Owner Financial Dashboard — Live Balance Engine

### 36.1 Core Principle

> **The dashboard is the live financial truth of the matter, always aligned with the current ledger state.**

Each Unit Owner must have a real-time financial dashboard that displays the current balance owed, broken down into clear categories, continuously updated based on: uploaded ledgers, time-based accrual (interest and assessments), fees and costs, payments and credits, and system reconciliation events.

The dashboard is not a report. It is not a snapshot. It is the live, continuously calculated financial state of the matter — the same numbers that appear in the ledger, in the generated documents, and in the payoff output. These three surfaces must always agree. If they ever diverge, the system must detect and surface the discrepancy.

---

### 36.2 Top Panel — Summary View

The top of the financial dashboard must display a clear, prominent summary at all times:

| Field | Description |
|-------|-------------|
| **Total Amount Owed** | Current calculated balance — large, prominent display |
| **Last Updated** | Date and time the balance was last recalculated |
| **Ledger Version in Use** | Label of the current approved ledger snapshot (e.g., `Ledger_v3_Post-Payment`) |
| **Next Action** | What the matter is currently eligible for (e.g., "Eligible for Second Letter — Apr 20") |
| **Balance Trend** | Visual indicator: ↑ increase since last update / ↓ decrease (payment applied) / — no change |

---

### 36.3 Financial Breakdown — Required Categories

The dashboard must break the total balance into structured, itemized categories. Every category must be individually clickable (see §36.5 Drill-Down View).

**Required categories:**

| Category | Description |
|----------|-------------|
| Unpaid Assessments | Regular recurring assessments not yet paid |
| Special Assessments | Named special assessments — each tracked separately (see §36.4) |
| Interest | Accrued interest calculated per the declaration rate and Time-Awareness Engine (§16) |
| Late Fees | Late fees per the declaration rules, itemized by occurrence |
| Attorneys' Fees | Stage-based attorney fees applied per §15 |
| Costs | Mailing, recording, administrative costs per §15 |
| Credits / Payments | All credits and payments applied — shown as negative values |
| Adjustments | Manual adjustments, write-offs, corrections — each labeled with reason |

**Display format:**

```
Total Balance:       $4,120.00
─────────────────────────────────
  Unpaid Assessments    $2,500.00
  Special Assessments     $800.00   ▸ (2 items)
  Interest                $220.00
  Late Fees               $100.00
  Attorneys' Fees         $350.00
  Costs                   $150.00
─────────────────────────────────
  Credits / Payments       $0.00
  Adjustments              $0.00
─────────────────────────────────
  TOTAL                 $4,120.00
```

Every line item is clickable. Clicking any category opens the Drill-Down View for that category.

---

### 36.4 Special Assessments — Multi-Assessment Structure

Special assessments must not be collapsed into a single field. Each special assessment is a distinct financial obligation with its own name, authorization, schedule, and payment history.

**Structure:**

```
Special Assessments — $1,400.00 total outstanding
  │
  ├── Roof Replacement Reserve (2023)
  │     Authorized:    Board Resolution 2023-04
  │     Total:         $1,200.00
  │     Paid:            $400.00
  │     Remaining:       $800.00
  │     Payment plan:   Monthly $100.00 through 12/2024
  │
  └── Hurricane Repair Fund (2024)
        Authorized:    Board Resolution 2024-09
        Total:           $600.00
        Paid:              $0.00
        Remaining:       $600.00
        Payment plan:   None — lump sum due 06/2024
```

**System rules:**
- Each special assessment is created as a separate record, never merged with other assessments
- If the ledger contains a line item that appears to be a special assessment but is not labeled with a name, the system flags it: "Unidentified special assessment detected — review recommended"
- The total for the Special Assessments category is the sum of all individual outstanding balances
- Payments are applied to the specific assessment they reference — not pooled across assessments

---

### 36.5 Association File Integration — Special Assessment Backing Documents

Each special assessment record must link to the Association file, where supporting authorization documents are stored.

**Documents stored in the Association file per special assessment:**
- Board meeting minutes authorizing the assessment
- Written approval document (resolution, notice to owners)
- Assessment breakdown and per-unit calculation
- Payment schedule (if applicable)
- Any amendments or modifications

**Behavior when user clicks a special assessment:**

The drill-down view for a special assessment includes:
1. Full financial detail (see §36.5 Drill-Down View)
2. A **Supporting Documents** panel showing all linked association documents
3. Options: View Document · Verify Legitimacy · Link New Document

**AI Concierge behavior when a new special assessment is detected in an uploaded ledger:**
> "A new line item labeled 'Special Assessment — Pool Renovation' was detected in the updated ledger. I don't have a matching authorization document in the Association file. Would you like to link a supporting document, or flag this for review?"

---

### 36.6 Drill-Down View — Click-Through Detail

When a user clicks any category in the financial breakdown, the system opens a full detail view for that category.

**The drill-down view must show, for every line item in the category:**

| Field | Description |
|-------|-------------|
| Line item description | Name or type of the charge |
| Amount | Dollar amount |
| Date | Date the charge was posted or accrued |
| Source | Where the value came from: `Ledger` / `System Calculation` / `Declaration Rule` / `User Entry` |
| Calculation logic | For interest: rate applied, base balance, period. For fees: rule invoked, trigger event. |
| Confidence | Confidence level of the source value |
| Document reference | Which document or ledger line this came from (page, line) |

**Example — Interest drill-down:**

```
Interest — $220.00

  Line 1:  $120.00   Jan 2026   Daily accrual @ 18% annual on $2,400.00 base
                                Source: Declaration (§4.2 Interest Provision)
                                Rate: 18.00% per annum = $1.18/day × 102 days

  Line 2:   $60.00   Feb 2026   Daily accrual @ 18% annual on $2,400.00 base
                                (payment applied Feb 15 — base reduced to $1,900.00 from that date)

  Line 3:   $40.00   Mar 2026   Daily accrual @ 18% annual on $1,900.00 base
                                × 38 days through today's date
```

---

### 36.7 Real-Time Update Behavior

The dashboard must automatically recalculate and refresh whenever any of the following events occur:

| Trigger Event | Dashboard Response |
|--------------|-------------------|
| New ledger uploaded | Full reconciliation run; all categories updated from new ledger |
| Payment detected | Credits / Payments updated; total balance reduced; balance trend shows ↓ |
| Interest accrues (daily) | Interest category updated by the Time-Awareness Engine (§16) |
| New assessment period begins | Unpaid Assessments increases; AI Concierge notifies |
| Fee applied at stage transition | Attorneys' Fees or Costs category updated; new version flagged |
| Reconciliation run completes (§12.15) | All categories validated; any discrepancies surfaced |
| Manual adjustment entered | Adjustments category updated; reason logged |

**The dashboard never shows stale data silently.** If the dashboard cannot be updated due to a pending reconciliation or unresolved conflict, it must display a clear indicator: "Balance pending — reconciliation in progress" or "Balance may be outdated — conflict detected."

---

### 36.8 Dashboard–Ledger–Document Synchronization Rule

> **The dashboard, the Excel ledger, and all generated documents must always show the same numbers. This is a hard constraint.**

If the dashboard total and the current approved ledger version total differ by any amount, the system must:
1. Flag the discrepancy immediately
2. Block document generation until the discrepancy is resolved
3. Surface the AI Concierge message: "The dashboard balance ($X) does not match the current ledger version ($Y). A $[delta] discrepancy exists. I cannot generate documents until this is resolved. Would you like me to run a reconciliation?"

The approved ledger version is the source of truth. If a discrepancy exists between the dashboard's live calculation and the ledger, the ledger takes precedence until a new reconciliation run is approved.

---

### 36.9 Owner File Integration

Inside the Unit Owner file, the Financial Dashboard is surfaced as a dedicated tab:

**Financial Dashboard Tab:**
- Summary view (§36.2 Top Panel)
- Full category breakdown (§36.3)
- Special Assessments expanded view (§36.4)
- Last reconciliation run date and result
- Links to current ledger version and all prior versions
- Quick action: "Generate Payoff" / "Update Ledger" / "Run Reconciliation"

This tab sits alongside the Reusable Fields Panel (§34) in the Unit Owner file. Together they form the complete operational workspace for a matter:
- Owner File / Reusable Fields Panel (§34) = stable identity and property data
- Financial Dashboard (§36) = live financial state

---

### 36.10 Edge Cases

| Edge Case | System Behavior |
|-----------|----------------|
| Multiple special assessments with same name | Differentiate by date or board resolution reference; flag for user to confirm they are distinct |
| Special assessment in ledger with no authorization document | Flag: "Special assessment details unclear — supporting documents recommended before legal reliance" |
| Ledger line item cannot be categorized | Displayed in `Adjustments` with flag: "Uncategorized — review source ledger" |
| Conflicting data between ledger and association documents | Flag discrepancy with both values and sources; block special assessment from appearing in generated documents until resolved |
| Interest calculated in ledger differs from system calculation | Surface both values; AI Concierge explains the difference and asks which to use; user confirms; selection logged |
| Balance is zero or negative | AI Concierge: "This matter appears to be paid in full or has a credit balance. Would you like to mark it as resolved?" |
| Dashboard balance diverges from last generated document balance | System flags the divergence; AI Concierge surfaces the delta and recommends document regeneration |

---

### 36.11 AI Concierge Behavior

**On interest accrual:**
> "Interest increased by $42.00 since the last update (12 days at 18% annual on $2,100.00 base). Current total balance: $4,162.00."

**On new special assessment detected:**
> "A new special assessment ('Pool Renovation — $600.00') was detected in the updated ledger. I don't see a supporting authorization document in the Association file. Review recommended before including this in a legal notice."

**On payment applied:**
> "A payment of $500.00 was applied on 04/15/2026. Balance updated from $4,620.00 to $4,120.00. The Interest category has been recalculated from the new base balance."

**On balance divergence from generated document:**
> "The current balance ($4,120.00) differs from the balance used in the last generated Second Letter ($4,562.18) by $442.18. The Second Letter should be regenerated before sending. Shall I prepare an updated version?"

**On zero balance:**
> "The current balance is $0.00. This matter may be fully resolved. Would you like to mark it as Closed, or generate a Release of Lien if one has been recorded?"

---

### 36.12 UI Requirements

**Financial Dashboard visual requirements:**

- Total balance displayed in large, prominent type — visually dominant on the page
- Balance trend indicator next to the total (↑ / ↓ / —) with the delta amount and date of last change
- Each breakdown category displayed as a clickable row — clicking opens the drill-down view
- Special Assessments displayed as an expandable section showing each named assessment
- "Last updated" timestamp always visible near the total
- A "Recalculate" button that manually triggers a reconciliation run
- If any category has a pending flag or conflict, display a warning badge next to that row
- Ledger version in use displayed as a labeled badge linked to the full ledger document

**Color conventions (consistent with §17.5 confidence tier colors):**
- Balance increases: amber indicator
- Balance decreases (payment): green indicator
- Pending / unresolved: amber warning badge
- Blocked / conflict: red warning badge

---

## 37. Special Assessment Management & Compliance Engine

### 37.1 Core Principle

> **Each special assessment is its own legal and financial event and must be treated as a separate, traceable entity.**

A special assessment is not a fee. It is an authorized financial obligation levied on unit owners by the association, governed by the declaration and statute, requiring specific notice, documentation, and in some cases an owner vote. The system must manage each special assessment as an independent record — never merged, never approximated, never treated as a generic line item.

This section makes CondoClaw a **governance validation system**, not just a financial tracker. The system must check not only what is owed, but whether the assessment was properly authorized.

---

### 37.2 Association-Level Special Assessment Structure

Each association maintains a Special Assessments registry — a collection of individual assessment records, each with its own folder, data, documents, and compliance status.

```
Association
  └── Special Assessments
        ├── Roof Replacement Reserve (2023)
        │     Status: Active | Compliance: Verified
        │
        ├── Structural Repairs (2024)
        │     Status: Active | Compliance: Incomplete — Minutes Missing
        │
        └── Hurricane Damage Fund (2025)
              Status: Active | Compliance: Flagged — Vote Required
```

Each assessment record is created at the association level and flows down to any unit owner matter where that assessment appears in the ledger. If a new assessment is detected in a ledger upload and no matching record exists at the association level, the system flags it and prompts the user to create or link the record.

---

### 37.3 Required Data Per Special Assessment

Each special assessment record must store the following:

**Core fields:**

| Field | Description |
|-------|-------------|
| Name / Title | Descriptive name (e.g., "Roof Replacement Reserve — Phase 1") |
| Purpose | Written description of what the assessment funds |
| Total Amount Authorized | Total levy amount approved |
| Per-Unit Amount | Amount per unit (if uniform), or per-unit schedule (if variable) |
| Date Approved | Date the board or owners approved the assessment |
| Effective Date | Date assessments began accruing |
| Payment Structure | Lump Sum / Monthly Installments / Custom Schedule |
| Installment Amount | If installment-based, amount per period |
| Loan Information | If the assessment is funded by a loan — lender, loan amount, repayment terms |
| Compliance Status | `Verified` / `Incomplete` / `Flagged` / `Invalid` |
| Declaration Authorization Basis | Section of the declaration that authorizes this assessment type |

**Document folder (required per assessment):**

| Document | Required | Notes |
|----------|---------|-------|
| Notice of Special Assessment | Yes | Sent to all unit owners |
| Board Meeting Minutes | Yes | Minutes from the meeting where the assessment was authorized |
| Proof of Vote / Approval | Conditional | Required if declaration mandates owner vote |
| Description of Purpose | Yes | Written purpose and scope |
| Payment Schedule / Breakdown | Yes | Per-unit amounts and due dates |
| Loan Documents | Conditional | Required if assessment is financed |
| Amendments / Updates | As applicable | Any subsequent modifications to the original assessment |

If any required document is missing, the assessment's compliance status is automatically set to `Incomplete` and the AI Concierge surfaces the gap.

---

### 37.4 Compliance Validation Engine

This is what elevates CondoClaw from a financial system to a governance validation system. For every special assessment, the engine must validate that the assessment was properly authorized under the declaration and applicable statute.

**Validation checks:**

| Check | Source | Fail Behavior |
|-------|--------|--------------|
| Proper notice given to all unit owners | Notice of Special Assessment document | `Flagged` — "Notice of Special Assessment document not found or undated" |
| Board meeting minutes recorded | Minutes document | `Incomplete` — "Board meeting minutes missing for this assessment" |
| Vote conducted (if required by declaration) | Proof of Vote / Minutes | `Flagged` — "Declaration requires owner vote for this assessment type. No vote record found" |
| Declaration authorizes this assessment type | Extracted declaration rules (§13) | `Flagged` — "Declaration does not appear to authorize assessments for this purpose without owner vote" |
| Amount or structure does not violate declaration | Declaration + governing docs | `Flagged` — "Assessment amount exceeds per-unit cap specified in Section [X] of the Declaration" |
| Statutory notice requirements satisfied | Ch. 718 or 720 rules | `Flagged` — "Ch. [718/720] requires [X] days notice. Assessment notice was [Y] days before effective date" |

**Compliance Status values:**

| Status | Meaning |
|--------|---------|
| `Verified` | All required documents present; declaration and statute validation passed |
| `Incomplete` | Required documents are missing; validation cannot be completed |
| `Flagged` | Documents are present but validation found a potential compliance issue |
| `Invalid` | A critical compliance failure was detected; assessment cannot be relied upon without resolution |

`Invalid` assessments are **not deleted** — they remain stored and labeled. The AI Concierge explains the issue and the user must resolve it explicitly.

---

### 37.5 Declaration Cross-Check (Critical)

The Compliance Validation Engine must read the association's declaration via OCR (§13) and extract the rules governing special assessments before validating any individual assessment.

**Extracted declaration rules for special assessments:**

| Rule | What Is Extracted |
|------|-----------------|
| Assessment authority | Who has authority to levy — board alone, or owner vote required |
| Vote threshold | If owner vote required: percentage needed (e.g., two-thirds of voting interests) |
| Notice requirement | Minimum advance notice in days before assessment is effective |
| Per-unit cap | Maximum per-unit assessment the board may impose without owner vote |
| Purpose restrictions | Whether assessments are limited to specific categories (capital improvements, emergency repairs, etc.) |
| Loan authorization | Whether the board may finance an assessment via a loan |

**Cross-check logic:**

For each special assessment, the engine compares:
- The assessment's authorization documents → against → the extracted declaration rules
- The assessment's notice dates → against → the declaration notice requirement
- The assessment's per-unit amount → against → the declaration per-unit cap
- The assessment's purpose → against → the declaration's permitted assessment purposes
- Whether a vote was conducted → against → the declaration's voting requirements for this assessment type

If the declaration has not been uploaded or OCR extraction is incomplete, the system cannot run the cross-check and flags the assessment as `Incomplete` with the message: "Declaration not yet uploaded. Compliance validation requires the full association declaration."

---

### 37.6 Ledger Integration

Each special assessment must generate its own distinct set of line items in the ledger. Special assessments must never be merged into a single number — not in the ledger, not in the dashboard, and not in any generated document.

**Ledger behavior per special assessment:**

| Field | Behavior |
|-------|---------|
| Original amount | The authorized per-unit amount at the time the assessment was levied |
| Payments applied | Each payment is recorded against the specific assessment it was applied to |
| Remaining balance | Calculated per assessment independently |
| Accrual date | When the assessment began accruing |
| Ledger line label | Must include the assessment name — not a generic "Special Assessment" label |

**Example ledger lines:**

```
2023-03-01   Special Assessment — Roof Replacement Phase 1    $1,200.00
2023-06-15   Payment — Roof Replacement Phase 1                -$400.00
2024-01-10   Special Assessment — Structural Repairs            $600.00
             ────────────────────────────────────────────────────────
             Special Assessments Outstanding:                  $1,400.00
               Roof Replacement Phase 1:                         $800.00
               Structural Repairs:                               $600.00
```

If a ledger upload contains a special assessment line item that does not match any existing association-level assessment record, the system flags it as an unmatched line item and prompts the user to link it or create a new record.

---

### 37.7 Payment Application Logic

Payments applied toward a unit owner's balance must be allocable to a specific special assessment — not pooled across all assessments.

**Payment allocation behavior:**

| Scenario | System Behavior |
|----------|----------------|
| Payment explicitly references an assessment | Applied to that specific assessment's remaining balance |
| Payment is a general payment with no reference | AI Concierge prompts: "This payment of $[X] is unallocated. Should it be applied to a specific special assessment, or distributed per the declaration's payment application order?" |
| Payment exceeds the remaining balance of one assessment | Excess applied to next assessment in order (oldest first), unless user specifies otherwise |
| Payment instruction in declaration specifies allocation order | Declaration-specified order is applied automatically; user confirmation required if non-standard allocation is requested |

**Per-assessment tracking (always maintained):**
- Original authorized amount
- Total payments received to date
- Remaining balance
- Last payment date and amount
- Payment history — every payment applied, with date, amount, and source

---

### 37.8 Unit Owner Dashboard Integration

The Financial Dashboard (§36) must display special assessments as an expandable, multi-assessment panel — never as a single aggregated number.

**Dashboard display:**

```
Special Assessments — $1,400.00 outstanding   ▸ expand
  │
  ├── Roof Replacement Phase 1 (2023)
  │     Remaining: $800.00   Compliance: ✅ Verified
  │     [View Details]  [View Documents]
  │
  └── Structural Repairs (2024)
        Remaining: $600.00   Compliance: ⚠️ Incomplete
        [View Details]  [View Documents]  [Resolve Issue]
```

**Clicking an assessment opens a detail panel with:**
- Full payment breakdown and history
- Installment schedule (if applicable)
- Compliance status and validation results
- Supporting documents panel
- Link to association-level assessment record

**Compliance status is always visible** on the dashboard for each assessment. An `Incomplete` or `Flagged` compliance status must be clearly indicated — using an amber or red badge — so the user always knows before generating a legal document that relies on this assessment.

---

### 37.9 AI Concierge Behavior

**On new assessment detected in ledger upload:**
> "A line item labeled 'Special Assessment — Pool Renovation' was detected in the updated ledger. I don't have a matching special assessment record in the Association file. Would you like me to create a new record, or link this to an existing one?"

**On missing required document:**
> "The 'Structural Repairs (2024)' special assessment is missing Board Meeting Minutes. This document is required to verify that the assessment was properly authorized. Please upload the minutes to complete compliance validation."

**On declaration violation detected:**
> "The 'Hurricane Damage Fund' assessment of $1,200 per unit may exceed the board's unilateral authority under Section 4.3 of the Declaration, which caps board-imposed assessments at $500 per unit without an owner vote. A vote record was not found. This assessment has been flagged. It should not be included in a legal notice until the compliance issue is resolved."

**On statute notice violation:**
> "The Notice of Special Assessment for 'Roof Replacement Phase 1' was sent on March 1, 2023, and the assessment became effective March 15, 2023 — only 14 days' notice. Chapter 720 requires a minimum of 14 days' written notice. This is borderline compliant. Consider verifying the exact mailing and effective dates."

**On loan-based assessment detected:**
> "The 'Structural Repairs (2024)' assessment appears to be financed via a loan. Loan documents have not been uploaded. Statutory rules for loan-financed assessments under Chapter [718/720] may require additional disclosure to unit owners. Review recommended before including this assessment in a legal notice."

---

### 37.10 Special Assessment in Generated Documents

When a special assessment is referenced in any generated document (First Letter, Second Letter, Claim of Lien, Payoff), the system must:

1. **Use the assessment-level record** — not the raw ledger line item — as the authoritative source for the amount, name, and effective date
2. **Check compliance status before generation** — if the assessment is `Flagged` or `Invalid`, the AI Concierge must surface a warning:
   > "The 'Structural Repairs' special assessment has an unresolved compliance flag. Including it in the [document type] may expose this claim to challenge. Would you like to proceed anyway, or resolve the flag first?"
3. **Display the assessment name specifically** in the document — not a generic "special assessment" label
4. **Link the Frozen Evidence Snapshot (§30)** to the specific assessment record used — so the exact compliance state at time of generation is preserved

---

### 37.11 Edge Cases

| Edge Case | System Behavior |
|-----------|----------------|
| Two assessments with the same name in different years | Differentiate by year or board resolution ID; system warns if names are identical and asks user to confirm they are distinct records |
| Multiple overlapping active assessments (owner has balance on 3 at once) | Keep all three separate; total outstanding displayed as sum but never merged into one line |
| Loan-financed assessment with complex repayment schedule | Store full loan terms; AI Concierge flags if loan term affects the per-unit amounts displayed to owners |
| Assessment partially paid through a bulk HOA payment (not unit-specific) | AI Concierge flags the ambiguity; prompts user to confirm how the bulk payment should be allocated |
| Association uploads amended assessment (reduced amount) | New version of the assessment record created; original preserved; AI Concierge notifies that affected unit owner balances must be recalculated |
| Assessment flagged as Invalid | Preserved in system; excluded from generation; labeled `Invalid` in dashboard and ledger; AI Concierge: "This assessment has been flagged as invalid. It will not be included in legal documents until resolved. Would you like to review the compliance issue?" |
| No declaration uploaded for the association | Compliance validation cannot run; all assessments set to `Incomplete` with message: "Declaration required to validate special assessment authority" |

---

### 37.12 Database Additions

Two new tables support this section. Both follow the same immutability and audit rules as all other tables in §23.9.

#### `special_assessments` (association-level)
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `association_id` | TEXT | FK → associations |
| `name` | TEXT | Full assessment name |
| `purpose` | TEXT | Written description |
| `total_amount_authorized` | REAL | Total levy amount |
| `per_unit_amount` | REAL | Nullable if variable per unit |
| `date_approved` | TEXT | ISO date |
| `effective_date` | TEXT | ISO date |
| `payment_structure` | TEXT | `lump_sum` / `installment` / `custom` |
| `installment_amount` | REAL | Nullable |
| `loan_financed` | BOOLEAN | |
| `loan_terms` | TEXT | JSON blob; nullable |
| `compliance_status` | TEXT | `verified` / `incomplete` / `flagged` / `invalid` |
| `declaration_authority_section` | TEXT | Section of declaration authorizing this type |
| `declaration_vote_required` | BOOLEAN | Extracted from declaration cross-check |
| `vote_conducted` | BOOLEAN | Based on uploaded proof of vote |

#### `special_assessment_unit_balances`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT (UUID) | Primary key |
| `special_assessment_id` | TEXT | FK → special_assessments |
| `matter_id` | TEXT | FK → matters |
| `original_amount` | REAL | Per-unit amount for this owner |
| `total_paid` | REAL | Running sum of all payments applied |
| `remaining_balance` | REAL | `original_amount` minus `total_paid` |
| `last_payment_date` | TEXT | ISO date; nullable |
| `payment_history` | TEXT | JSON array of payment events |

---

### 37.13 API Additions

New endpoints for the Special Assessment Management system:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/associations/{id}/special-assessments` | Create a new special assessment record |
| `GET` | `/api/associations/{id}/special-assessments` | List all special assessments for an association |
| `GET` | `/api/associations/{id}/special-assessments/{sa_id}` | Full detail including compliance status and documents |
| `PUT` | `/api/associations/{id}/special-assessments/{sa_id}` | Update assessment record (creates new version) |
| `POST` | `/api/associations/{id}/special-assessments/{sa_id}/validate` | Run compliance validation against declaration and statute |
| `POST` | `/api/associations/{id}/special-assessments/{sa_id}/documents` | Upload a supporting document to an assessment record |
| `GET` | `/api/matters/{matter_id}/special-assessments` | List all special assessments relevant to a matter with per-unit balances |
| `POST` | `/api/matters/{matter_id}/special-assessments/{sa_id}/payment` | Apply a payment to a specific assessment |

---

## 38. Document Naming, Saving & Export Engine

### 38.1 Core Principle

> **A user should understand a document without opening it.**

All documents generated or uploaded must follow a consistent, human-readable, and system-structured naming convention. The filename is the document's identity in the real world — in email attachments, court filings, Clio, shared drives, and printed cover sheets. CondoClaw must generate this name automatically, every time, with no manual input required from the user.

---

### 38.2 Standard Naming Convention

**Format:**

```
[AssociationName]_[UnitOwnerLastName]_[UnitIdentifier]_[DocumentType]_[YYYY-MM-DD].[ext]
```

**Rules:**
- All spaces replaced with underscores
- All special characters removed (no commas, periods except before extension, slashes, or apostrophes)
- Association name truncated to 30 characters if longer — truncation uses the first 30 characters of the normalized name
- Unit identifier uses unit number if available; falls back to abbreviated property address if not
- Date is the generation date (YYYY-MM-DD), not the matter creation date
- **No version number in filename** — version is inferred from the date. Multiple generations on the same date are distinguished by timestamp if needed.
- Document type uses concise labels: `FirstDemand` (not `FirstDemandLetter`), `Ledger`, `ClaimOfLien`, `Payoff`

**Examples:**

```
PalmBeachCondo_Doe_Unit12A_FirstDemand_2026-03-20.docx
PalmBeachCondo_Doe_Unit12A_Ledger_2026-04-01.xlsx
PalmBeachCondo_Doe_Unit12A_ClaimOfLien_2026-04-15.pdf
PalmBeachCondo_Doe_Unit12A_Payoff_2026-04-20.pdf
PalmBeachCondo_Doe_Unit12A_NOLAOriginal_Uploaded_2026-03-01.pdf
```

**Required fields — always present:**

| Field | Source | Notes |
|-------|--------|-------|
| Association Name | Association record (normalized) | First 30 chars, underscored |
| Unit Owner Last Name | Core Matter Variables — Owner Name | Last name only for brevity |
| Unit Identifier | Unit number from Core Matter Variables | Falls back to abbreviated address |
| Document Type | Standardized type label (§38.3) | Concise: FirstDemand, Ledger, etc. |
| Date | Generation date (YYYY-MM-DD) | ISO format |

**Optional future fields (Phase 2):**
- `_718` or `_720` statute suffix
- `_CC[MatterID]` matter ID suffix for firms with high volume

---

### 38.3 Document Type Vocabulary

A fixed, standardized set of document type labels must be used in all filenames. No freeform naming is permitted. This prevents naming chaos across firms and makes external compatibility reliable.

| Document Type | Filename Token | Extension |
|---------------|---------------|-----------|
| NOLA / Pre-Lien Notice (generated) | `NOLA` | `.pdf` |
| NOLA (uploaded original) | `NOLAOriginal` | `.pdf` |
| First Demand Letter | `FirstDemandLetter` | `.pdf` |
| Second Demand Letter | `SecondDemandLetter` | `.pdf` |
| Claim of Lien | `ClaimOfLien` | `.pdf` |
| Payoff / Estoppel Certificate | `Payoff` | `.pdf` |
| Mailing Affidavit (uploaded) | `MailingAffidavit` | `.pdf` |
| Mailing Affidavit (generated) | `MailingAffidavitGenerated` | `.pdf` |
| Ledger (Excel) | `Ledger` | `.xlsx` |
| Ledger (PDF export) | `LedgerPDF` | `.pdf` |
| Third-Party Authorization | `ThirdPartyAuth` | `.pdf` |
| Compliance Certification | `ComplianceCert` | `.pdf` |
| Frozen Evidence Snapshot Bundle | `EvidenceBundle` | `.zip` |

This vocabulary is enforced at generation and upload. If a user uploads a document and the system cannot determine its type, it is stored as `Unclassified` and the AI Concierge prompts the user to classify it.

---

### 38.4 File Format Rules

**PDF — primary legal format for all legal documents:**
- All generated legal documents (NOLA, letters, lien, payoff, affidavit, compliance certification) are exported as PDF
- PDF output must be: clean, print-ready, court-ready, with consistent margins and no rendering artifacts
- Font embedding required — document must display and print identically across all systems
- PDF files must be generated from the same template every time — no browser-print-to-PDF workarounds

**Excel (.xlsx) — ledger only:**
- The baseline ledger is always exported as `.xlsx` with full formatting per §12.7 (Excel Visual Formatting Specification)
- A PDF export of the ledger is available as a separate file (`LedgerPDF`) for court filing or email sharing
- The `.xlsx` file is structured, formula-driven, and editable — it is not a locked read-only file

**ZIP — frozen evidence snapshot bundles:**
- When the user downloads a Frozen Evidence Snapshot (§30) or Frozen Payoff Snapshot (§33.6), all components are packaged as a `.zip` archive
- The ZIP filename follows the same convention: `PalmBeachCondo_Doe_Unit12A_EvidenceBundle_Lien_v1_2026-04-15.zip`

---

### 38.5 Automatic Save Behavior

When any document is generated, the system must automatically:

1. **Generate the filename** using the naming convention (§38.2) — no manual input required from the user
2. **Store the file** in the correct folder within the matter's document structure (§35.2)
3. **Assign the version number** — v1 for the first generation of a document type; incremented automatically on every subsequent generation
4. **Record the file hash** (SHA-256) and store it in the `documents` table — for integrity verification (§35.12)
5. **Log the event** in the audit trail — document type, version, filename, ledger version used, user, timestamp

The user never names a document manually. The user never chooses where to save it. The system handles all of this automatically at generation time.

---

### 38.6 Version Increment Triggers

A new version is created — and the filename version number is incremented — whenever any of the following occurs:

| Trigger | Version Behavior |
|---------|----------------|
| Document generated for the first time | `_v1` |
| User edits and approves a draft | `_v2` (or next available) |
| Regeneration after ledger update | New version — new filename with new date and version number |
| Regeneration after Core Matter Variable correction | New version |
| Regeneration after statute reclassification | New version — all prior versions retain their original names |
| New payoff requested after prior payoff exists | New version with new date |

**Prior versions are never renamed.** Their original filename is their permanent identity. A new version receives a new filename. Both exist simultaneously in the matter file.

---

### 38.7 Folder Structure (System View)

Inside each matter, the document system organizes all files as follows:

```
Matter File
  └── Documents
        ├── Generated/
        │     ├── PalmBeachCondo_Doe_Unit12A_NOLA_v1_2026-03-01.pdf
        │     ├── PalmBeachCondo_Doe_Unit12A_FirstDemandLetter_v1_2026-03-20.pdf
        │     ├── PalmBeachCondo_Doe_Unit12A_FirstDemandLetter_v2_2026-04-01.pdf
        │     ├── PalmBeachCondo_Doe_Unit12A_SecondDemandLetter_v1_2026-04-20.pdf
        │     ├── PalmBeachCondo_Doe_Unit12A_ClaimOfLien_v1_2026-05-01.pdf
        │     └── PalmBeachCondo_Doe_Unit12A_Payoff_v1_2026-05-10.pdf
        │
        ├── Ledger/
        │     ├── PalmBeachCondo_Doe_Unit12A_Ledger_v1_2026-03-01.xlsx
        │     ├── PalmBeachCondo_Doe_Unit12A_Ledger_v2_2026-03-20.xlsx
        │     └── PalmBeachCondo_Doe_Unit12A_Ledger_v3_2026-04-01.xlsx
        │
        ├── SourceDocuments/
        │     ├── PalmBeachCondo_Doe_Unit12A_NOLAOriginal_Uploaded_2026-03-01.pdf
        │     └── PalmBeachCondo_Doe_Unit12A_MailingAffidavit_Uploaded_2026-03-15.pdf
        │
        ├── Authorizations/
        │     └── PalmBeachCondo_Doe_Unit12A_ThirdPartyAuth_v1_2026-03-01.pdf
        │
        └── Archived/
              └── [superseded and incorrect versions]
```

---

### 38.8 Print Functionality

Users must be able to print directly from the system without downloading first, and must also be able to download a print-ready PDF for external printing.

**Print requirements:**
- Consistent top/bottom/side margins (minimum 1 inch on all sides)
- No system UI chrome in printed output — only the document content
- Page numbers included in multi-page documents
- Document type and matter reference in the footer of every page
- Letterhead placeholder in the header (firm logo and name — future Phase 2 feature)

**Print actions available:**
- Print from browser (triggers browser print dialog with pre-configured margins)
- Download PDF → print externally (court-filing or office printing)
- Download PDF package (all documents for a matter stage in a single download)

---

### 38.9 UI Requirements

**Documents tab display per document row:**

| Column | Display |
|--------|---------|
| Filename | Full filename as generated (e.g., `PalmBeachCondo_Doe_Unit12A_FirstDemandLetter_v2_2026-04-01.pdf`) |
| Document Type | Standardized label badge |
| Version | `v2` |
| Status | `Active` / `Superseded` / `Draft` / `Flagged` / `Incorrect` badge |
| Date | Generation date |
| Actions | View · Download · Print · Copy Name · Compare Versions |

**"Copy Name" action:**
- One-click copies the full filename to clipboard
- Use case: pasting into email subject line, court filing system, or Clio matter file

**Download behavior:**
- Single document: downloads the file with its system-generated name — the downloaded filename matches the stored filename exactly
- Bulk download (all documents for a stage): downloads a ZIP archive with the `EvidenceBundle` naming convention

---

### 38.10 External Compatibility

All documents must be immediately usable outside CondoClaw without renaming or reformatting.

| External Use Case | Requirement |
|------------------|-------------|
| Email attachment | Filename is descriptive and professional — readable by recipient without opening |
| Court filing (e-filing or in-person) | PDF is court-ready; filename includes association, owner, document type |
| Sharing with third parties (title companies, attorneys, lenders) | Filename identifies matter without requiring explanation |
| Clio or other case management systems | Consistent naming allows import with predictable structure; version number prevents duplicate confusion |
| Printed production package | All documents print with correct formatting and no system artifacts |

---

### 38.11 AI Concierge Behavior

**On document generation and save:**
> "First Demand Letter v1 has been generated and saved as `PalmBeachCondo_Doe_Unit12A_FirstDemandLetter_v1_2026-03-20.pdf`. It is ready to review, download, or print."

**On new version generated:**
> "A new version of the First Demand Letter has been saved as `PalmBeachCondo_Doe_Unit12A_FirstDemandLetter_v2_2026-04-01.pdf`. The prior version (v1) has been moved to Superseded and is still accessible in the Archived folder."

**On ledger update:**
> "The ledger has been updated and saved as `PalmBeachCondo_Doe_Unit12A_Ledger_v3_2026-04-01.xlsx`. A PDF export is also available. This version is now linked to the current matter state."

**On unclassified upload:**
> "The uploaded document could not be automatically classified. Please select the document type so I can assign the correct filename and store it in the right folder."

---

### 38.12 Naming Edge Cases

| Edge Case | System Behavior |
|-----------|----------------|
| Association name contains special characters (e.g., "Palm & Beach HOA") | Normalize: remove `&`, replace spaces with underscores → `Palm_Beach_HOA` |
| Owner name contains suffix or prefix (e.g., "John A. Doe Jr.") | Use last name only, strip suffix → `Doe` |
| Two owners on same unit (joint ownership) | Use first listed owner's last name + `_Et_Al` → `Doe_Et_Al` |
| Unit identifier is a building/floor/unit combo (e.g., "Bldg B, Unit 4") | Normalize to `BlgB_Unit4` |
| Same document type generated twice on the same date | Version number distinguishes them — v1 and v2 even if same date |
| Filename exceeds 255 characters | Truncate association name further; preserve document type, version, and date — never truncate those fields |

---

## §39 Ground Truth Variable Schema, Statute Compliance Matrix & Training Data Pipeline

### 39.1 Purpose

This section defines the canonical variable schema, statute-specific compliance requirements, and the ground truth collection process that precedes any model training. Every generated document — First Demand Letter, Audit Ledger, or future legal filing — must be traceable to a verified, human-approved variable record. The ground truth corpus is the foundation of the Alpha Learning Loop.

---

### 39.2 Entity Classification: Condominium vs HOA

CondoClaw must auto-detect whether an uploaded matter concerns a **Condominium** (governed by **F.S. Chapter 718**) or a **Homeowners Association** (governed by **F.S. Chapter 720**). This classification drives every downstream document, compliance check, and statutory citation.

**Detection Priority (in order):**

| Priority | Method | Example Signal |
|----------|--------|----------------|
| 1 | Explicit field in parsed entities (`statute_type = "718"` or `"720"`) | NOLA cites "718.116" |
| 2 | `entity_type` field extracted by NLP (`"Condominium"` or `"HOA"`) | Document header |
| 3 | Keyword frequency scan on raw document text | "unit owner" → condo; "parcel owner" → HOA |
| 4 | Default fallback | Assume 718 (Condominium) if ambiguous |

**Classification is immutable once human-verified.** A reviewer must confirm the classification on every matter before any document is generated for production use. If classification is wrong, all downstream documents are invalid.

---

### 39.3 Statute Compliance Matrix

#### Chapter 718 — Florida Condominium Act

| Requirement | Section | Detail |
|-------------|---------|--------|
| Pre-lien notice required | F.S. 718.116(6)(b) | 45-day cure notice before lien filing |
| Assessment lien authority | F.S. 718.116(5)(a) | Association may file Claim of Lien |
| Interest rate | F.S. 718.116(3) | 18% per annum on unpaid assessments |
| Attorney fees authorized | F.S. 718.116(6)(a) | Reasonable fees recoverable |
| Foreclosure after lien | F.S. 718.116(6)(b) | May foreclose in same manner as mortgage |
| First mortgagee safe harbor | F.S. 718.116(1)(b) | Limited liability for first mortgagee |
| Entity label | — | "unit" (not lot or parcel) |

**Mandatory verbatim statutory language — 718:**
> Pursuant to Section 718.116(6)(b), Florida Statutes, you are hereby notified that the assessments referenced herein are now delinquent. The Association is entitled to collect all unpaid assessments, together with interest accruing at the rate of eighteen percent (18%) per annum, late charges, reasonable attorneys fees, and costs of collection as provided under Section 718.116(6)(a), Florida Statutes.

#### Chapter 720 — Florida Homeowners Association Act

| Requirement | Section | Detail |
|-------------|---------|--------|
| Pre-lien notice required | F.S. 720.3085(3)(a) | 45-day cure notice before lien recording |
| Assessment lien authority | F.S. 720.3085(1) | Association may record Claim of Lien |
| Interest rate | F.S. 720.3085(3) | 18% per annum on unpaid assessments |
| Attorney fees authorized | F.S. 720.3085(3)(a) | Reasonable fees recoverable |
| Foreclosure after lien | F.S. 720.3085 | May foreclose in same manner as mortgage |
| First mortgagee safe harbor | F.S. 720.3085(3)(c)1 | 12 months or 1% of original mortgage balance |
| Entity label | — | "parcel" or "lot" (not unit) |

**Mandatory verbatim statutory language — 720:**
> Pursuant to Section 720.3085(3)(a), Florida Statutes, you are hereby notified that the assessments referenced herein are now delinquent. The Association is entitled to collect all unpaid assessments, together with interest accruing at the rate of eighteen percent (18%) per annum, late charges, reasonable attorneys fees, and costs of collection as provided under Section 720.3085(3)(a), Florida Statutes.

---

### 39.4 Canonical Matter Variable Schema

Every matter in CondoClaw resolves to the following variable set. These are the ground-truth fields that feed every generated document, every compliance check, and every training record.

#### Identity Variables

| Variable | Type | Description |
|----------|------|-------------|
| `matter_id` | string | System-assigned matter ID (e.g. #CC-8921) |
| `entity_type` | enum | Condominium or HOA |
| `statute_type` | enum | 718 or 720 |

#### Association Variables

| Variable | Type | Description |
|----------|------|-------------|
| `association_name` | string | Full legal name of the association |
| `association_address` | string | Association mailing address |
| `county` | string | County where property is located |

#### Owner / Unit Variables

| Variable | Type | Description |
|----------|------|-------------|
| `owner_name` | string | Full legal name of the unit/parcel owner |
| `unit_number` | string | Unit, lot, or parcel identifier |
| `property_address` | string | Street address of the delinquent unit/parcel |
| `mailing_address` | string | Owner mailing address (may differ from unit) |

#### Financial Variables

| Variable | Type | Description |
|----------|------|-------------|
| `monthly_assessment` | decimal | Regular monthly assessment amount |
| `special_assessment` | decimal | Special assessment amount if applicable |
| `principal_balance` | decimal | Unpaid assessments only — no fees or interest |
| `late_fees` | decimal | Total late charges assessed |
| `interest_accrued` | decimal | Interest at 18% per annum (Florida default) |
| `attorney_fees` | decimal | Attorney fees if authorized by governing documents |
| `other_charges` | decimal | Any other authorized charges |
| `total_amount_owed` | decimal | Grand total: principal + fees + interest + attorney |
| `monthly_interest_rate` | decimal | Daily/monthly rate derived from 18% annual |

#### NOLA / Notice Variables

| Variable | Type | Description |
|----------|------|-------------|
| `nola_date` | date | Date NOLA/pre-lien letter was issued |
| `due_date` | date | Date payment must be received |
| `cure_period_days` | integer | Days to cure before lien (45 is FL default) |
| `nola_reference_number` | string | Reference or account number on the NOLA |

#### Ledger Variables

| Variable | Type | Description |
|----------|------|-------------|
| `oldest_unpaid_date` | date | Date of oldest unpaid line item |
| `ledger_through_date` | date | Last date covered by the ledger |
| `months_delinquent` | integer | Number of months behind |
| `assessment_start_date` | date | When the delinquency period began |

#### Mailing / Affidavit Variables

| Variable | Type | Description |
|----------|------|-------------|
| `mailing_date` | date | Date the NOLA was mailed |
| `mailing_method` | string | Certified mail / first class / hand delivery |
| `certified_mail_number` | string | USPS tracking or certified mail number |
| `affiant_name` | string | Person who signed the mailing affidavit |
| `notary_name` | string | Notary public who notarized the affidavit |
| `notary_expiration` | date | Notary commission expiration date |
| `notary_county` | string | County where affidavit was notarized |
| `document_mailed` | string | Description of what was mailed |

#### Statute-Specific Computed Variables

| Variable | Type | Description |
|----------|------|-------------|
| `lien_section` | string | Resolved: F.S. 718.116 or F.S. 720.3085 |
| `notice_section` | string | Resolved: 718.116(6)(b) or 720.3085(3)(a) |
| `interest_section` | string | Resolved: 718.116(3) or 720.3085(3) |
| `safe_harbor_applies` | boolean | Whether first mortgagee safe harbor is relevant |

#### Ground Truth / Training Variables

| Variable | Type | Description |
|----------|------|-------------|
| `ground_truth_verified` | boolean | Human reviewed and approved all fields |
| `verified_by` | string | Attorney or paralegal who verified |
| `verified_date` | date | Date of verification |
| `source_nola_file` | string | Filename of the NOLA document used |
| `source_ledger_file` | string | Filename of the ledger document used |
| `source_affidavit_file` | string | Filename of the mailing affidavit used |

---

### 39.5 Comprehensive Audit Ledger — Required Sheets and Fields

The generated Excel Audit Ledger must contain three sheets:

#### Sheet 1: Matter Summary
All canonical variables from §39.4 organized into labeled sections with dark header rows:
- Matter Identity / Entity Classification / Association / Owner-Unit / Financial Summary / NOLA-Notice / Mailing-Affidavit / Ground Truth Status

#### Sheet 2: Ledger Detail
One row per transaction:

| Column | Description |
|--------|-------------|
| # | Line number |
| Date | Transaction date (MM/DD/YYYY) |
| Description | Plain-language description |
| Type | Regular Assessment / Special Assessment / Late Fee / Interest / Attorney Fee / Payment Received / NSF / Credit / Other |
| Charges ($) | Debit amount |
| Credits ($) | Payment or credit amount |
| Running Balance ($) | Cumulative balance after this line |
| Notes | Any annotation |

**Compliance rule:** The ledger must show a continuous running balance with no gaps. Every charge must have a type. Every payment must be credited with the exact date received.

#### Sheet 3: Compliance Checklist
Auto-populated per statute with YES / PENDING / VERIFY status:

**Chapter 718 checklist items:**
- NOLA sent per F.S. 718.116(6)(b)
- 45-day cure period stated
- Total amount specifically stated per 718.116(6)(b)(1)
- Interest rate disclosed (18% per annum)
- Late charges authorized by governing documents
- Attorney fees authorized per 718.116(6)(a)
- Mailing affidavit obtained
- Notary seal on affidavit
- Certified mail number on file
- Ledger period covers full delinquency
- First mortgagee safe harbor reviewed per 718.116(1)(b)

**Chapter 720 checklist items:**
- Pre-lien letter sent per F.S. 720.3085(3)(a)
- 45-day cure period stated
- Total amount specifically stated
- Interest rate disclosed (18% per annum)
- Late charges authorized by governing documents
- Attorney fees authorized per 720.3085(3)(a)
- Mailing affidavit obtained
- Notary seal on affidavit
- Certified mail number on file
- Ledger period covers full delinquency
- Safe harbor language included per 720.3085(3)(c)
- First mortgagee safe harbor reviewed per 720.3085(3)(c)1

---

### 39.6 Ground Truth Quality Requirements

A document set is eligible for the training corpus only when all of the following are true:

| Requirement | Check |
|-------------|-------|
| Entity type confirmed (718 or 720) | `entity_type` verified by human reviewer |
| All identity variables populated | `owner_name`, `unit_number`, `association_name` non-null |
| All financial variables populated | `total_amount_owed` > 0, `principal_balance` > 0 |
| NOLA variables present | `nola_date`, `cure_period_days` non-null |
| Ledger spans delinquency | `oldest_unpaid_date` through `ledger_through_date` covers full period |
| Mailing affidavit complete | `mailing_date`, `certified_mail_number`, `affiant_name`, `notary_name` non-null |
| Human verification complete | `ground_truth_verified = True`, `verified_by` and `verified_date` set |
| Generated documents match variables | Every field in the First Demand Letter traces back to a variable exactly |

**A record that fails any check above must not be added to the training corpus.**

---

### 39.7 Training Data Pipeline (Pre-Training Ground Truth Collection)

Before CondoClaw can be trained on new customer documents, the following pipeline must be completed for every record:

```
Step 1: Upload
  NOLA + Ledger + Affidavit uploaded to the system
        ↓
Step 2: AI Parse
  All three documents parsed; all 52 variables extracted
        ↓
Step 3: Human Review (AlphaCondor Review)
  Attorney or paralegal reviews every extracted variable
  Corrects any mis-extracted values using the CORRECT button
        ↓
Step 4: Statute Classification Confirmed
  Reviewer explicitly confirms 718 or 720 on the dashboard
        ↓
Step 5: Generate First Demand Letter + Audit Ledger
  Documents generated using verified variables only
        ↓
Step 6: Human Approval
  Reviewer reads both documents and approves by clicking VERIFY
  Sets ground_truth_verified = True in the database
        ↓
Step 7: Record Added to Training Corpus
  Stored in SQLite uploads + generated_files tables
  Eligible for export as a training pair
        ↓
Step 8: Export at Training Time
  All verified records exported as structured JSON pairs:
  { input_variables } → { output_document_text }
```

**Banned Training Sources (per Alpha Learning Loop rules, §18):**
1. Unverified AI-generated output (ground_truth_verified = False)
2. Records missing any required variable from the canonical schema
3. Records from dismissed, reversed, or settled matters
4. Records where entity_type is ambiguous or unresolved
5. Duplicate matters (same owner + unit + same delinquency period)
6. Records where the statute classification was corrected after document generation without re-generating
7. Records from matters where a human did not personally verify the financial balance against the source ledger

---

### 39.8 Statute Auto-Detection Implementation Rules

The system implements a three-tier detection cascade in this exact order:

**Tier 1 — Explicit field:** If parsed entities contain `statute_type = "718"` or `"720"`, that value is used immediately.

**Tier 2 — Entity type field:** If `entity_type` is populated:
- "Condominium" → statute 718
- "HOA", "Homeowners Association", "Homeowner" → statute 720

**Tier 3 — Keyword frequency scan on raw text:**
- Condo signals: "condominium", "condo", "718", "718.116", "unit owner"
- HOA signals: "homeowners", "hoa", "720", "720.3085", "parcel owner", "lot owner"
- Higher count wins; ties default to 718

**The detected statute must always be displayed to the user before document generation.** The user must be able to override it with one click if auto-detection is wrong. An override triggers re-generation of all documents.

---

### 39.9 Integration with Other Sections

| Section | How §39 Integrates |
|---------|--------------------|
| §8 Intake Eligibility | Variable completeness check is part of the intake gate |
| §10 Processing Pipeline | Variables drive every pipeline stage transition |
| §17 Document Generation | All generated documents consume only verified variables |
| §18 Alpha Learning Loop | Only ground_truth_verified = True records enter training |
| §27 AI Concierge | Concierge displays variable state and flags missing fields |
| §35 Frozen Evidence Snapshot | Variables are frozen at snapshot time and cannot be changed |
| §36 Unit Owner Financial Dashboard | Surfaces variable values in real time |
| §38 Document Naming | Naming convention consumes association_name, owner_name, unit_number from variables |

---

## §40 Independent Arithmetic Verification Engine — "No Garbage In, No Garbage Out"

**Version:** 1.0
**Date:** March 21, 2026

---

### 40.1 Core Principle

> **CondoClaw never trusts the face value of any uploaded document.**

Management software ledgers, HOA accounting systems, and property management platforms all produce their own running totals. Those totals may contain:
- Data entry errors by property managers
- Software rounding bugs in third-party systems
- Incorrect interest calculation methods (lump-sum instead of per-installment)
- Payments applied to the wrong installments
- Late fees that were waived in the system but not reflected correctly
- Charges that do not match what the governing documents authorize

If CondoClaw reads the "Total Due" line from an uploaded ledger and uses it directly in a demand letter or lien filing, that number has not been independently verified. A court may reject a lien based on an incorrect stated balance. An attorney may be held liable for filing an incorrect amount. This is the "garbage in, garbage out" problem.

**CondoClaw solves this by treating every uploaded ledger as raw input — not as a source of truth.** The system extracts the underlying transaction line items, re-derives every total independently, applies Florida statute interest rules per installment, and only then produces a verified ground truth balance. The management system's stated total is preserved alongside our independent calculation so that any discrepancy is immediately visible.

---

### 40.2 What "Independent Verification" Means

When a ledger is uploaded, CondoClaw performs two parallel computations:

**Track A — Ledger Face Value (what they say)**
Extract the stated balance from the last row of the ledger running balance column. This is what the management software computed. It is recorded but never used directly in any legal filing.

**Track B — CondoClaw Independent Calculation (our numbers)**
From the raw transaction line items (date, description, charge, credit), CondoClaw independently calculates:
1. **Gross Charges** — sum of all charge rows, by type
2. **Gross Credits** — sum of all payment and waiver rows
3. **Net Balance** — gross charges minus gross credits
4. **Per-Installment Interest** — for each unpaid installment, compute simple interest at 18% per annum from that installment's due date to today (F.S. §718.116(3) / §720.3085(3))
5. **Late Fees** — max($25, 5% of installment) per unpaid installment
6. **Ground Truth Total Due** — net balance + interest + late fees + attorney fees

**The Ground Truth Total Due (Track B) is the only number that flows into demand letters, lien filings, and legal documents.**

---

### 40.3 Variance Analysis

After both tracks are computed, the system calculates the variance:

```
Variance = CC Net Balance − Ledger Stated Balance
```

| Flag | Threshold | Meaning | Action |
|------|-----------|---------|--------|
| GREEN | less than $0.02 | Match within rounding tolerance | Proceed normally |
| YELLOW | $0.02 to $49.99 | Discrepancy requiring review | Flag for attorney review before filing |
| RED | $50.00 or more | Significant discrepancy | Do NOT use ledger balance in any filing. Escalate. |

A RED flag does not mean the matter cannot proceed — it means the attorney must understand the discrepancy source before filing anything. CondoClaw surfaces the per-row reconciliation so the attorney can identify exactly which transaction caused the divergence.

---

### 40.4 Row-Level Balance Integrity Check

Beyond the total variance, CondoClaw re-derives the running balance after every transaction row and compares it against the running balance the management system printed on that row. If any row shows a discrepancy, it is flagged individually with the row number, date, description, stated balance, CC-calculated balance, and the variance amount.

This catches cases where an individual transaction was recorded correctly but a prior correction was applied elsewhere without being reflected in the running balance column.

---

### 40.5 Zero-Balance Baseline Detection — Where Delinquency Actually Starts

Every ledger contains history. Some of that history is paid. An owner may have been current for years before becoming delinquent. A prior collection matter may have been resolved and the account brought to zero. CondoClaw must distinguish between paid history and active delinquency — the two must never be mixed.

**The Rule:** CondoClaw walks every transaction in chronological order, maintaining a running balance. It finds the LAST point in the ledger where the running balance was at or below zero (zero balance or credit balance). That row is the "clean slate" — the owner was current at that moment. Everything after that point is the active delinquency period.

```
Transaction History:
  10/01/2024  Regular Assessment    +$458.00  Balance: $458.00
  10/15/2024  Payment Received      -$458.00  Balance: $0.00   ← zero
  11/01/2024  Regular Assessment    +$458.00  Balance: $458.00
  11/15/2024  Payment Received      -$458.00  Balance: $0.00   ← LAST ZERO (baseline)
  12/01/2024  Regular Assessment    +$458.00  Balance: $458.00  ← delinquency starts here
  01/01/2025  Regular Assessment    +$458.00  Balance: $916.00
  02/01/2025  Regular Assessment    +$458.00  Balance: $1,374.00

CondoClaw excludes rows 1-4 (paid history).
Delinquency analysis begins at row 5 (12/01/2024).
Interest accrues on each of the 3 unpaid assessments from their own due dates.
```

**Why this matters for interest calculation:**
If CondoClaw used the full ledger from the first transaction, it would calculate interest from 10/01/2024 on assessments that were fully paid by 10/15/2024. That would be wrong — and potentially fraudulent. The zero-balance baseline ensures interest accrues only on amounts that are actually outstanding.

**The result fields exposed by the engine:**

| Field | Meaning |
|-------|---------|
| `baseline_idx` | Index of the last zero-balance row (-1 if balance never reached zero) |
| `baseline_date` | Date of the last zero-balance row |
| `baseline_balance` | Running balance at the baseline (0.00 or negative for credits) |
| `delinquency_start` | Date of the first transaction after the baseline |
| `prior_rows_excluded` | Number of paid-history rows excluded from the analysis |
| `active_rows` | Number of rows in the active delinquency period |

**Edge case — balance never reaches zero:**
If `baseline_idx = -1`, the ledger shows a balance that was never fully paid off. In this case the entire ledger is the delinquency period. The AI Concierge flags this for review: it may mean the owner has been chronically delinquent for the entire history, or that prior payments are missing from the ledger.

**Edge case — ledger starts mid-delinquency:**
If the first ledger row already shows a "Previous Balance" with no prior zero point, CondoClaw uses the full ledger. The AI Concierge notes: "No clean-slate date found in this ledger. The delinquency period may predate the records provided. Request a complete ledger history from the management company."

---

### 40.5 Per-Installment Interest — Why This Matters

Florida Statute §718.116(3) (Condominiums) and §720.3085(3) (HOAs) provide that interest accrues at 18% per annum on each delinquent installment from the date it became due. The statute does not say interest accrues from the NOLA date on the total balance. It accrues from each installment's own due date.

**Wrong — lump-sum from NOLA date (what most systems do):**
```
Total Balance x 18% x (today - NOLA date) / 365
```
This understates interest on early installments and misstates the statute.

**Correct — per-installment from each due date (what CondoClaw does):**
```
For each unpaid installment i:
  Interest_i = Amount_i x (0.18 / 365) x days_since_due_date_i
Total Interest = sum of all Interest_i
```

CondoClaw uses `decimal.Decimal` with `ROUND_HALF_UP` for all interest calculations to eliminate floating-point rounding errors. Every computed interest amount is traceable to its source installment and due date.

---

### 40.6 Payment Application Order

When payments are received, Florida statute and common law require they be applied in this order:
1. **Interest** — accrued interest is satisfied first
2. **Late Fees** — authorized late charges
3. **Attorney Fees** — if authorized and accrued
4. **Principal** — remaining applied to oldest unpaid assessments (FIFO)

CondoClaw applies payments in this order. A payment that appears to reduce the principal may, under this allocation, actually satisfy interest first — changing which installments remain unpaid and how interest continues to accrue. The system recalculates the full waterfall on every run.

---

### 40.7 Output — "CC Verification" Excel Sheet

Every ground truth Excel export includes a dedicated **"CC Verification"** sheet containing:

| Section | Contents |
|---------|----------|
| Principle | Plain-language statement of the independent verification methodology |
| Ledger Face Value | What the management system stated |
| CC Independent Calculation | Gross charges, gross credits, net balance |
| Per-Installment Interest Engine | Principal per installment, days, formula, interest amount |
| Variance Analysis | Variance dollar amount, flag (GREEN/YELLOW/RED), assessment |
| Charge Breakdown by Type | Assessments, special assessments, fees by category |
| Row-Level Balance Errors | Any rows where running balance diverges from our recalculation |
| Ground Truth Balance | The number that flows into all legal documents |

---

### 40.8 API Response

The `/api/generate/ground-truth` endpoint returns a `verification` block in every response:

```json
{
  "verification": {
    "ledger_stated_balance":  5368.00,
    "cc_net_balance":         5368.00,
    "cc_total_due":           5561.34,
    "variance":               0.00,
    "variance_flag":          "GREEN",
    "variance_label":         "Match within rounding tolerance",
    "balance_error_count":    0,
    "ground_truth_balance":   5561.34
  }
}
```

The frontend must display `variance_flag` as a color-coded badge. If `variance_flag` is RED, the Generate Document buttons must be disabled until an attorney explicitly overrides the block.

---

### 40.9 Integration with Other Sections

| Section | How §40 Integrates |
|---------|--------------------|
| §17 Document Generation | Only `ground_truth_balance` flows into generated documents — never `ledger_stated_balance` |
| §18 Alpha Learning Loop | Only records where `variance_flag = GREEN` are eligible for training data export without manual review |
| §27 AI Concierge | Concierge displays the verification result and explains any variance in plain language |
| §35 Frozen Evidence Snapshot | The verification result is frozen alongside the ground truth |
| §36 Unit Owner Financial Dashboard | Dashboard shows CC Total Due, not ledger face value |
| §39 Variable Engine | `ground_truth_verified` is set to True only after attorney reviews and accepts the verification result |

---

### 40.10 What Triggers a Manual Review Requirement

The following conditions automatically require attorney review before any document can be generated:

- `variance_flag = RED` (variance of $50 or more)
- `balance_error_count > 0` (any row-level running balance discrepancy)
- Interest calculation method on the ledger cannot be determined
- Any charge type present that is not authorized by the governing documents
- Payments applied out of statutory order by the management system

In these cases, the AI Concierge surfaces the specific issue, explains the discrepancy, and requests the attorney make a decision. The decision (accept CC calculation / reject / investigate further) is logged in the Matter Object as an AI Decision with a human override record.

---

## §41 IQ-225 Demand Letter Math Engine — Implementation Specification

**Version:** 1.0
**Date:** March 21, 2026

---

### 41.1 Overview

The IQ-225 engine produces the nine-row Florida-statute demand letter table that appears in every First Demand Letter. It uses `decimal.Decimal` with `ROUND_HALF_UP` exclusively — no floats — and derives every row from raw source documents rather than from any computed total on the NOLA or ledger face.

---

### 41.2 The Nine-Row Demand Letter Table

Florida Statute §718.116 demand letters must state each charge category separately. The IQ-225 engine produces exactly these nine rows:

| # | Label | Source |
|---|-------|--------|
| 1 | Maintenance due including [Through Date] | NOLA line items (homeowner assessment category) + new months accrued |
| 2 | Special assessments due including [Through Date] | NOLA line items (special assessment category) |
| 3 | Late fees, if applicable | NOLA line items (delinquent fee category) + new months accrued |
| 4 | Other charges | NOLA line items (all uncategorized positive charges) |
| 5 | Certified mail charges | Attorney-entered at letter generation |
| 6 | Other costs | Attorney-entered at letter generation |
| 7 | Attorney's fees | Attorney-entered at letter generation |
| 8 | Partial Payment | Cash payments received after NOLA date (shown as negative) |
| 9 | **TOTAL OUTSTANDING** | Sum of rows 1–7 minus row 8 |

---

### 41.3 Ground Truth Calculation Methodology — Five Steps

```
Step 1: Parse NOLA PDF for gross charges by category (Decimal, ROUND_HALF_UP)
Step 2: Add new monthly assessments accrued from (NOLA month+1) through through_date
Step 3: Add late fees ($25/month) for each month actually past due
Step 4: Add attorney-entered charges (certified mail, other costs, attorney fees)
Step 5: Subtract CASH payments only (Payment Received type — waivers excluded)
```

**Critical rule:** Waived charges, write-offs, and management system credits that are not actual cash received are excluded from the payment deduction. Only `Payment Received` transaction type rows reduce the balance.

---

### 41.4 NOLA PDF Line-Item Parser

The parser (`_parse_nola_line_items`) reads each line of the extracted NOLA text and applies these filters in order:

**Filter 1 — No dollar amount:** Skip lines containing no `$X,XXX.XX` or trailing decimal pattern.

**Filter 2 — Total/summary rows:** Skip lines whose description contains: `total`, `balance due`, `amount due`, `previous balance`, `grand total`. These are computed totals, not individual charges.

**Filter 3 — Body-text paragraphs:** Skip lines where the description portion is longer than 60 characters OR contains any of: `please`, `remit`, `to avoid`, `action and expense`, `collection agent`. CINC NOLA PDFs embed a paragraph like *"please remit payment in full of $6,427.00"* — this is body text, not a charge line.

**Categorization order (critical — must check in this sequence):**
1. `delinquent fee`, `late fee`, `late charge` → **late_fees** *(must be checked FIRST — CINC labels these "Assessment - Homeowner (Delinquent Fee)" which would otherwise match the homeowner check)*
2. `homeowner`, `assessment - homeowner`, `regular assessment`, `monthly assessment` → **maintenance**
3. `special assessment`, `special asmt` → **special_assessments**
4. `legal fee`, `attorney fee`, `attorney's fee`, `atty fee` → **skipped** (superseded by attorney override)
5. All other positive charges → **other_charges**

---

### 41.5 Monthly Assessment Derivation

The monthly assessment rate is derived from ledger transaction history, not from the NOLA regex. The NOLA PDF from CINC Systems lists "Assessment - Homeowner 2025 $3,211.32" as the first homeowner line — this is the cumulative past balance, not the monthly rate.

**Correct method:** Find all `Regular Assessment` transaction rows in the ledger with a positive charge. Take the statistical mode (most common value). That is the monthly assessment rate used for computing new months accrued.

---

### 41.6 Through-Date Rule

The demand letter "through date" is always the **first day of the next calendar month** from the date the letter is generated.

```python
# Example: generated on March 21, 2026 → through_date = April 1, 2026
if today.month == 12:
    through_date = date(today.year + 1, 1, 1)
else:
    through_date = date(today.year, today.month + 1, 1)
```

This is not derived from `cure_days + today`. It is a fixed calendar anchor so the letter states the assessment balance "including [Month 1, Year]" which tells the owner the precise date through which charges are included.

---

### 41.7 Excel as Source of Truth

The ground truth Excel export (`_build_ground_truth_excel`) contains a **Statement of Account** sheet with the same nine rows. The values in the Excel sheet come from the same `_compute_demand_letter_table()` call as the demand letter — the same `Decimal` values, formatted identically. The Excel sheet is the auditable source of truth for every number in the letter.

The `TOTAL OUTSTANDING` row is bold, left-bordered, and highlighted yellow so it is unambiguous.

---

### 41.8 Verified Target Values — Segovia Condo / Pacheco / Unit 308

As of March 21, 2026, the IQ-225 engine produces these exact values for this matter (5/5 consecutive runs confirmed):

| Row | Value |
|-----|-------|
| Maintenance due including April 1, 2026 | $5,043.32 |
| Special assessments due including April 1, 2026 | $2,100.00 |
| Late fees, if applicable | $75.00 |
| Other charges | $607.68 |
| Certified mail charges | $40.00 |
| Other costs | $16.00 |
| Attorney's fees | $400.00 |
| Partial Payment | ($2,000.00) |
| **TOTAL OUTSTANDING** | **$6,282.00** |

---

## Section 42 — Ground Truth Architecture: NOLA + Ledger as Foundational Inputs

**Version added:** March 22, 2026

---

### 42.1 The Two-Document Ground Truth Principle

Every matter in CondoClaw is built on exactly two foundational inputs:

1. **The NOLA (Notice of Late Assessment)** — the legally certified opening balance. This is the number both parties have formally acknowledged. It is not derived, not calculated, not inferred. It is the legally issued starting point.
2. **The Association Ledger** — the full transaction history showing how the balance was built and what happened after the NOLA date.

Together, these two documents create a closed, auditable system:
- The NOLA answers: *"What did the owner owe as of date X, per the association's official notice?"*
- The Ledger answers: *"What charges and payments make up that balance, and what happened after?"*

**Everything else in the system — demand letters, liens, payoff calculations, foreclosure math — is derivative of these two documents.** Without both, outputs cannot be defended in court. With both reconciled, every number carries a clear chain of custody.

> A first demand letter that does not derive from the NOLA lacks legal validity. A first letter inconsistent with the NOLA is repugnant — it is objectionable because it creates a conflict between the only legally issued notice and the attorney's representation of the amount owed. Courts can and do reduce or dismiss claims where the demand letter is not anchored to the NOLA.

---

### 42.2 The Four-Sheet Excel Architecture

When a ledger and NOLA are uploaded for a matter, the system generates an Excel workbook with the following sheet structure:

| Sheet | Purpose | Editable |
|-------|---------|----------|
| **NOLA-Ledger** (Sheet 1) | Primary calculation sheet. NOLA as locked opening row. All post-NOLA charges by category. 45-day forward projection. Direct input for demand letter. | No (locked opening row) |
| **Association Ledger** (Sheet 2) | Structured, standardized version of the uploaded management company ledger. Reconciliation reference only — never used for output generation. | No |
| **NOLA Validation** (Sheet 3) | Side-by-side comparison of NOLA figures vs. Association Ledger figures. Flags discrepancies with color coding. Displays Good/Bad NOLA determination. | No |
| **Statement of Account** (Sheet 4) | Final demand letter summary table. Nine-row format. Feeds directly into Word document generation. | No |

**Sheet 1 is always the NOLA-Ledger.** This is intentional — it is the first thing any reviewer sees, it is anchored to the legally controlling document, and it makes the calculation chain immediately transparent.

---

### 42.3 Association Ledger Sheet — Purpose and Structure

The Association Ledger sheet is generated by parsing and structuring the uploaded management company ledger (PDF or Excel). Its purpose is **reconciliation reference only** — it is the dataset against which the NOLA is validated.

**What it does:**
- Transposes raw ledger entries into a standardized columnar format
- Normalizes charge types (maintenance, late fees, special assessments, other)
- Standardizes dates to MM/DD/YYYY
- Strips management company formatting artifacts
- Computes a running balance from the structured data

**What it does NOT do:**
- It does not generate any output
- It does not control any calculation
- It is not the source of truth — the NOLA is

**Column structure (standardized):**

| # | Date | Description | Type | Assessments ($) | Interest ($) | Late Fees ($) | Atty Fees ($) | Other ($) | Credits ($) | Running Balance ($) | Notes |

This matches the ledger format shown in the verified Quintana 215 and Palacios examples.

---

### 42.4 NOLA Validation — Good NOLA / Bad NOLA Logic

After the Association Ledger sheet is generated, the system compares the NOLA balance against the ledger-derived balance. This comparison produces one of three outcomes:

#### Outcome 1: Good NOLA ✅
The NOLA balance is within the rounding tolerance of the ledger-derived balance. Proceed to NOLA-Ledger generation automatically.

#### Outcome 2: Bad NOLA — Minor Variance ⚠️
The NOLA balance differs from the ledger-derived balance by more than rounding but less than the material threshold. User is warned but may proceed after acknowledgment.

#### Outcome 3: Bad NOLA — Material Discrepancy 🔴
The NOLA balance differs from the ledger-derived balance by more than the material threshold. Hard flag. User must explicitly acknowledge the discrepancy and confirm override before any output is generated. The override and user identity are logged.

---

### 42.5 Variance Tolerance Framework

**Legal basis for these thresholds (researched March 22, 2026):**

Florida law contains **no explicit dollar tolerance or rounding safe harbor** for HOA/condo collection ledger-vs-NOLA discrepancies. Key authorities:

- **F.S. 718.116(8) (Estoppel):** Any amount overstated in an estoppel certificate is legally waived against a good-faith buyer or lender. No de minimis floor. Any excess — even $1 — is waived.
- **F.S. 718.116(3) (Payment Application):** Payments must be applied in strict statutory order. Failure to follow the order produces a voidable ledger balance (*Rajabi v. Villas at Lakeside Condominium Association*, 306 So.3d 400, Fla. 5th DCA 2020).
- **First Equitable Realty III v. Grandview Palace** (Fla. 3d DCA 2021): Courts have no equitable discretion to reduce what the statute mandates — but equally, the association cannot recover amounts not supportable by the ledger and notice.
- **FCCPA (F.S. 559.72(9)):** Prohibits claiming amounts not legitimately owed. Requires actual knowledge of illegitimacy — inadvertent errors at small dollar amounts are harder to establish as violations, but are not immune.
- **FDCPA (15 U.S.C. 1692k(c)):** Bona fide error defense is available for inadvertent errors — but only if the collector maintains **documented reasonable procedures** to avoid errors. Vague assertions are insufficient (*Washington federal court, 2023*).
- **GAAP 5% materiality rule:** Does NOT apply to individual collection demand letters. Materiality thresholds are designed for financial statement presentation, not debt collection enforcement. Courts have not applied GAAP materiality to NOLA accuracy.
- **Industry practice:** Title professionals treat any variance as legally significant. One legal commentary notes: "If a published delinquency list is a penny off, the list is untrue." No published industry dollar tolerance exists for HOA payoff reconciliation.

**The CondoClaw tolerance thresholds:**

| Variance | Status | Color | Action Required |
|----------|--------|-------|-----------------|
| ≤ $1.00 | Rounding | Green ✅ | None. Standard ROUND_HALF_UP accounting precision. |
| $1.01 – $50.00 | Minor Variance | Yellow ⚠️ | Warning displayed. User must acknowledge before proceeding. Logged. |
| > $50.00 | Material Discrepancy | Red 🔴 | Hard flag: "Bad NOLA — Materially inconsistent with ledger." User must explicitly override. Override logged with timestamp and user identity. |

**Why $1.00 as the rounding floor:**
Standard accounting uses ROUND_HALF_UP to the nearest cent. Across multiple line items, rounding can accumulate to ±$1.00. This is defensible as pure arithmetic precision, not a substantive error.

**Why $50.00 as the material threshold:**
Below $50, an inadvertent error has a credible FDCPA bona fide error defense if documented reasonable procedures exist (which CondoClaw's logging provides). Above $50, the discrepancy is large enough that a Florida court would scrutinize it and a homeowner's attorney would use it as a basis for challenging the demand. The $50 threshold is conservative — it protects the association from generating demand letters with defensible errors while not flagging every minor timing difference.

**Important:** The "Bad NOLA" flag is **not a hard stop.** The attorney may have valid reasons to proceed — for example, the NOLA may predate a subsequent payment that reduced the ledger balance, or the management company ledger may itself contain errors. The user decides. The system flags, logs, and requires acknowledgment. It does not override the attorney's judgment.

---

### 42.6 NOLA-Ledger Sheet (Sheet 1) — Structure

The NOLA-Ledger sheet is the primary calculation output. It is the direct input for demand letter generation.

**Structure:**

| Row | Content | Locked |
|-----|---------|--------|
| Row 1 | Column headers | Yes |
| Row 2 | **NOLA opening balance** — "Balance per Notice of Late Assessment (NOLA) — [Month Year]" with Type = "Previous Balance" and the NOLA amount in the Assessments column. Note: "NOLA ground truth opening balance — do not modify." | Yes — do not modify |
| Rows 3–N | Post-NOLA charges by category (assessments, late fees, special assessments, other), one row per month or charge event | No |
| Rows N+1 to N+45 | **45-day forward projection** — future assessments and ongoing charges projected forward from letter generation date | Calculated |
| Last row | Running balance = total amount owed | Calculated |

**The 45-day forward projection** is required for a valid first demand letter under Florida law. It includes:
- Future monthly assessment installments accruing within the 45-day cure window
- Any additional late fees that will accrue if unpaid
- The projection dates and amounts must be explicit so the owner knows precisely what they owe through the cure period

---

### 42.7 Lifecycle Awareness — Current Scope and Future Stages

The NOLA-Ledger sheet is designed with the full enforcement lifecycle in mind. Each stage is a separate section within the sheet (or a separate sheet in future versions):

| Stage | Status | Trigger Document |
|-------|--------|-----------------|
| First Demand Letter | **Current scope** | NOLA |
| Second Demand Letter | Future | First demand + continued nonpayment |
| Claim of Lien | Future | Second demand + continued nonpayment |
| Foreclosure | Future | Lien + continued nonpayment |
| Payoff Calculation | Future | Any stage — owner seeks to pay in full |

The architecture is built to accommodate all stages without redesigning the sheet structure. Each stage adds rows below the previous stage's totals with a clearly labeled section header (e.g., "First Demand," "Second Demand," as shown in the Quintana and Palacios calculation examples).

---

### 42.8 Conditional Failure Rule

If a first demand letter cannot be generated from the NOLA:

1. The system flags the specific reason (e.g., NOLA amount not parseable, NOLA date missing, ledger has no matching unit, material Bad NOLA not overridden)
2. The matter is placed in **"Requires Review"** status
3. No letter is generated
4. The matter is returned to the queue for correction or client return

This prevents the system from generating any letter that is not anchored to a validated NOLA, protecting both the attorney and the association from a legally defective demand.

---

### 42.9 Summary Logic Flow

```
Upload Ledger (PDF or Excel)
        ↓
Parse → "Association Ledger" sheet
        (structured, standardized, read-only reference)
        ↓
Upload / Detect NOLA
        ↓
Compare NOLA balance vs. Association Ledger balance
   ├─ ≤ $1.00 variance  → ✅ Good NOLA (Green)
   ├─ $1.01–$50.00      → ⚠️  Minor Variance (Yellow) — user acknowledges
   └─ > $50.00          → 🔴 Bad NOLA (Red) — user must explicitly override
        ↓
NOLA accepted (validated or overridden)
NOLA becomes the controlling dataset
        ↓
Generate "NOLA-Ledger" (Sheet 1)
   ├─ Row 1: NOLA opening balance (locked — do not modify)
   ├─ Rows 2–N: Post-NOLA charges by category
   └─ 45-day forward projection
        ↓
Generate Statement of Account (Sheet 4)
        ↓
First Demand Letter generated from Statement of Account
   └─ Cannot generate → Flag + "Requires Review" + Return to client
```

> **Core principle:** The NOLA and the ledger are the two foundational inputs. Without both, nothing else is valid. With both reconciled, every downstream output is defensible.

---

## 43. Claude Paralegal Review — Two-Step Process with General Impressions

### 43.1 Problem Statement

Currently, when a document is uploaded, the Claude review says "Claude, review the document" but does not provide its initial findings or general impressions to the user. The review output jumps straight to technical reconciliation data without first giving the user a plain-language summary of what the documents contain and what stands out.

Claude should behave like a **paralegal who just received documents from the client** — immediately providing general impressions before diving into detailed analysis.

### 43.2 Step 1 — Upload Review (Paralegal First Impressions)

When documents are uploaded and Claude performs its Step 1 review, the AI Concierge must display **general impressions first**, before any technical reconciliation. This is the "paralegal opens the envelope" moment.

**Required general impressions (displayed in the AI Concierge chat):**

1. **What was received:** "I've reviewed a NOLA dated [date] and a ledger from [association/management company] for unit [number], owner [name]."
2. **First impression of the account:** "This appears to be a [straightforward / complex / unusual] delinquency. The owner has been delinquent since approximately [date], with a balance of $[amount]."
3. **Document quality assessment:** "The NOLA is [clear and complete / missing key fields / potentially problematic]. The ledger is [well-organized / messy / has gaps]."
4. **Red flags or notable items:** Any items that immediately stand out — unusually large balances, very old delinquencies, multiple payment reversals, unusual charge types, etc.
5. **What to watch for:** "When we generate the NOLA-Ledger, I'll be watching for [specific concerns based on what was observed]."

This general impression appears **before** the detailed NOLA balance / ledger reconciliation / flags / warnings output that currently exists.

### 43.3 Step 2 — Post-NOLA Generation Review (Claude Comments on Output)

After the NOLA-Ledger is generated, Claude should come back with a second review that includes:

1. **Summary of what was generated:** "The NOLA-Ledger has been generated with [X] pre-NOLA transactions and [Y] post-NOLA transactions."
2. **Consistency check results:** Whether the Statement of Account (Sheet 1) numbers match the NOLA-Ledger (Sheet 2) numbers.
3. **Anything an opposing attorney would flag:** Specific issues, row by row if needed.
4. **Recommendations:** What the attorney should double-check before sending.

This is the existing post-generation review behavior, but it must explicitly confirm **cross-sheet consistency** (Statement of Account vs. NOLA-Ledger vs. Demand Letter).

### 43.4 Implementation Notes

- The `/api/claude-review` endpoint response must include a `general_impressions` field (plain-language string) in addition to the existing `message` field
- The frontend `condoclaw:claude_review` event handler must display `general_impressions` first, then the detailed analysis
- The Claude system prompt (`_CLAUDE_REVIEW_SYSTEM_PROMPT`) must be updated to request general impressions as part of the JSON response
- Add `"general_impressions": "..."` to the Claude review JSON schema

---

## 44. Parsing Guard — Disable Generate While Documents Are Still Processing

### 44.1 Problem Statement

The user can currently click "Generate Ledger" or "Generate First Letter" while a document is still being parsed by the AI. This leads to incomplete data being used for generation, producing incorrect outputs.

### 44.2 Required Behavior

- The **Generate Ledger**, **Generate First Letter**, and **Run Ground Truth Pipeline** buttons must be **disabled** (grayed out, non-clickable) while any upload is in `parsing` status.
- A tooltip or label should indicate: "Waiting for document parsing to complete..."
- The buttons re-enable only after all uploads have completed (status = `completed` or `error`).

### 44.3 Speed Optimization

The document parsing + Claude review pipeline should be optimized to reduce wait time:
- Research and implement faster text extraction methods for PDFs and Excel files
- Consider running Claude review in parallel with (not sequentially after) AI entity extraction
- Cache extracted text to avoid re-reading files when Claude review is triggered
- Set aggressive timeouts on AI calls to prevent the user from waiting indefinitely

### 44.4 Implementation Notes

- In `Dashboard.jsx`, compute an `isAnyParsing` flag: `Object.values(uploads).some(u => u.status === 'parsing')`
- Pass `isAnyParsing` to the `disabled` prop of all generate buttons
- Add visual feedback (pulsing indicator, progress text) so the user knows parsing is still in progress

---

## 45. Consistent Field Evaluation — 14 Fields Across NOLA and Ledger

### 45.1 Problem Statement

The NOLA evaluation currently uses 12 fields while the ledger evaluation uses 13 fields. This inconsistency means the system is not evaluating both documents against the same criteria, which can cause missed discrepancies and inconsistent outputs.

### 45.2 Required: 14 Standardized Evaluation Fields

Both the NOLA and the Ledger must be evaluated against the same **14 fields**. The 14th field is **"Unknown / Unclassified"** — a catch-all for anything that appears in the documents that the system does not anticipate.

**The 14 standardized fields:**

| # | Field | Description |
|---|-------|-------------|
| 1 | Regular Assessment | Monthly/quarterly maintenance assessments |
| 2 | Special Assessment | One-time or non-recurring special assessments |
| 3 | Interest | Interest accrued on delinquent balances (typically 18% p.a.) |
| 4 | Late Fee | Administrative late fees per declaration |
| 5 | Attorney Fee | Attorney's fees and legal costs |
| 6 | Collection Cost | Non-attorney collection costs (filing fees, service fees, etc.) |
| 7 | Water/Utility | Water bills, utility charges passed through to unit |
| 8 | Insurance | Insurance charges, HO6 compliance charges |
| 9 | Fines/Violations | Fines for rule violations, compliance penalties |
| 10 | Payment Received | Payments from unit owner (applied per §718.116(3) hierarchy) |
| 11 | Credit/Waiver | Waivers, adjustments, non-payment credits |
| 12 | Previous Balance / Balance Forward | Opening balances carried from prior periods |
| 13 | Projected Assessment | Forward-projected assessments (45-day cure window) |
| 14 | Unknown / Unclassified | **Anything that does not fit fields 1–13.** Items the system was not designed to anticipate. These are flagged for attorney review. |

### 45.3 The "Unknown" Field — Things We Know That We Don't Know

> **"There are known unknowns — things we know that we do not know."**

The Unknown field exists because:
- Associations invent creative charge descriptions that don't fit standard categories
- Management companies use non-standard naming conventions
- Ledgers from different software platforms categorize charges differently
- New types of charges (e.g., EV charging fees, amenity surcharges) may appear that the system has never seen

**Rules for the Unknown field:**
- Any line item that cannot be confidently mapped to fields 1–13 goes to Unknown
- Unknown items are **always flagged for attorney review** in the Compliance Checklist
- Unknown items are included in the running balance but shown separately in the Summary Block
- Claude's review must specifically call out Unknown items and suggest potential classifications
- The system should learn from attorney corrections: if an Unknown item is reclassified by the attorney, that mapping should inform future classification

### 45.4 Implementation Notes

**Backend (`backend.py`):**
- Update `TYPE_MAP` and `TYPE_BUCKET_AR` to include all 14 types
- Add `"Collection Cost"`, `"Water/Utility"`, `"Insurance"`, `"Fines/Violations"`, `"Previous Balance"`, `"Projected Assessment"`, and `"Unknown"` to both maps
- Add an "Unknown ($)" column (Column N) to the NOLA-Ledger sheet (Sheet 2), making it 14 columns (A–N)
- Update the `_make_split_row()` function to handle the new column
- Update `_CLAUDE_REVIEW_SYSTEM_PROMPT` to include all 14 types in the categorization instruction

**NOLA-Ledger Sheet 2 updated columns (14 total, A–N):**

| Col | Header |
|-----|--------|
| A | # |
| B | Date |
| C | Description |
| D | Type |
| E | Assessments ($) |
| F | Interest ($) |
| G | Late Fees ($) |
| H | Atty Fees ($) |
| I | Collection Costs ($) |
| J | Other/Misc ($) |
| K | Payments ($) |
| L | Credits ($) |
| M | Running Balance ($) |
| N | Notes |

The Unknown field is tracked in the **Type** column (D) with value "Unknown" and charges placed in the **Other/Misc ($)** column (J), with a note in column N flagging it for review.

**Claude review prompt:**
- Update the type enumeration to include all 14 types
- Add instruction: "If a line item does not clearly fit any of the first 13 categories, classify it as 'Unknown' and explain in the notes what it appears to be and suggest a possible classification."

---

## 46. Dynamic Download Filenames — Association Name + Unit Owner

### 46.1 Problem Statement

The UI header currently shows a hardcoded "Pine Ridge Delinquency" label for the active matter. Downloaded documents should be named dynamically based on the actual association name and unit owner name, not a generic or hardcoded label.

### 46.2 Required Filename Format

**Active Matter Analysis label (UI header):**
```
Active Matter Analysis: [Association Name] — [Owner Name], Unit [Number]
```

Example: `Active Matter Analysis: Pine Ridge HOA — Smith, Unit 402`

This label must update dynamically as documents are uploaded and entities are extracted.

**Download filenames** (already partially implemented in backend — verify consistency):
```
[AssocName]_[OwnerLastName]_[Unit]_[DocType]_[YYYY-MM-DD].[ext]
```

### 46.3 Implementation Notes

**Frontend (`Dashboard.jsx`):**
- Replace the hardcoded `#CC-8921: Pine Ridge Delinquency` with a dynamic label derived from `extractedData`
- Compute: `associationName` from merged entities `association_name`
- Compute: `ownerName` from merged entities `owner_name`
- Compute: `unitNumber` from merged entities `unit_number`
- Display: `{associationName} — {ownerName}, Unit {unitNumber}` or fallback to `New Matter` if no data extracted yet

---

## 47. Statement of Account / NOLA-Ledger / Demand Letter Consistency

### 47.1 Problem Statement

The Statement of Account (Excel Sheet 1) is generating different numbers than the NOLA-Ledger (Sheet 2). Since the First Demand Letter pulls from these same numbers, all three must be consistent. If the Statement of Account says one thing and the NOLA-Ledger says another, the demand letter becomes internally inconsistent and legally objectionable.

### 47.2 Core Rule

> **The Statement of Account (Sheet 1), the NOLA-Ledger (Sheet 2), and the First Demand Letter must all reflect the exact same numbers. Zero tolerance for discrepancy.**

### 47.3 Required Consistency Checks

1. **Sheet 1 Total Due** must equal **Sheet 2 TOTALS row Running Balance**
2. **Sheet 1 itemized categories** (assessments, interest, late fees, etc.) must equal the corresponding **Sheet 2 TOTALS row category sums**
3. **First Demand Letter total amount due** must equal **Sheet 1 Total Due**
4. **First Demand Letter itemized breakdown** must equal **Sheet 1 itemized categories**

### 47.4 Implementation

- After building Sheet 1 and Sheet 2 data, add a cross-validation step that compares totals
- If any discrepancy > $0.00, log an error and either:
  - Auto-correct Sheet 1 to match Sheet 2 (Sheet 2 / NOLA-Ledger is the source of truth)
  - Or block generation and flag for review
- The demand letter generator must pull its numbers from the same data source as Sheet 1 (which itself must match Sheet 2)
- Add a row to the Compliance Checklist: "Statement of Account consistent with NOLA-Ledger" with ✓ / ✗ status

### 47.5 Claude Post-Generation Review

Claude's Step 2 post-generation review must explicitly check and report on cross-sheet consistency. The review output must include:
- "Sheet 1 total: $X.XX | Sheet 2 total: $Y.YY | Match: Yes/No"
- Any category-level discrepancies
- Whether the demand letter total matches both sheets
