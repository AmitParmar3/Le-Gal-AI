PROJECT CHARTER & SYSTEM ARCHITECTURE SPECIFICATION
Project: Enterprise Multi-Agent Legal & Policy Audit Engine
Document Version: 1.0.0
Classification: Internal Confidential / Production Spec
Target Environment: Fedora Linux / Podman Containerized Architecture
1. EXECUTIVE SUMMARY & BUSINESS CASE
1.1 Business Problem
Enterprise legal and procurement operations process thousands of complex commercial agreements annually, including Master Services Agreements (MSAs), Statements of Work (SOWs), and Non-Disclosure Agreements (NDAs). Manual contract audit workflows present three critical challenges:
High Operational Latency: Reviewing an 80-page MSA requires 4 to 8 billable legal hours, creating severe bottlenecks for enterprise sales cycles.
Context Fragmentation: Human reviewers frequently lose track of cross-clause dependencies across lengthy documents (e.g., how an indemnification waiver in Section 4.2 interacts with a general limitation of liability cap in Section 12).
High Costs: External counsel audit fees average $300–$600 per contract, creating prohibitive costs at enterprise scale.
1.2 Solution Overview
Le Gals is an automated compliance audit engine designed to evaluate complex legal contracts, flag policy deviations, and compute deterministic risk metrics within seconds. Leveraging a Parent-Child Retrieval-Augmented Generation (RAG) vector indexing pattern and a LangGraph Multi-Agent State Engine, Le Gals ensures complete legal context preservation while enforcing software engineering quality gates via Ragas unit testing.
1.3 Quantifiable Business Impact
Metric
Manual Review
Le Gals Automated Audit
Improvement
Audit Latency
4–8 Hours
15–30 Seconds
~99% Reduction
Cost per Document
$300–$600
~$0.50 (LLM API Cost)
~99.8% Savings
Rule Consistency
Subjective / Variable
100% Deterministic
Full Traceability

2. PROJECT SCOPE & BOUNDARIES
┌───────────────────────────────────────────────────────────────────────────┐
│                           LE GALS PROJECT SCOPE                           │
├─────────────────────────────────────┬─────────────────────────────────────┤
│ IN-SCOPE DELIVERABLES               │ OUT-OF-SCOPE BOUNDARIES             │
├─────────────────────────────────────┼─────────────────────────────────────┤
│ • Parent-Child RAG PDF Ingestion    │ • Automated Contract Signature/Exec │
│ • Local Podman Qdrant Deployment    │ • Primary CLM Document Storage      │
│ • LangGraph Multi-Agent Execution   │ • Binding Legal Advice/Representation│
│ • Automated Ragas Quality Gates     │ • External User Management Engine   │
│ • Structured JSON & Summary Reports │ • Real-Time Collaborative Redlining │
└─────────────────────────────────────┴─────────────────────────────────────┘

2.1 In-Scope Deliverables
Parent-Child Ingestion Engine: PDF processing splitting text into 400-character child search vectors linked to 2,000-character contextual parent blocks.
Vector DB Deployment: Local containerized deployment of Qdrant running on rootless Podman engine.
LangGraph Multi-Agent Loop: Orchestrated state-machine containing specialized Retrieval, Auditor Agent, and Evaluator Agent nodes.
Continuous Quality Gate: Automated LLM output verification using Ragas integrated into pytest CI/CD suites.
Dual Output Generation: Automated creation of machine-readable JSON payloads and human-readable executive audit reports.
2.2 Out-of-Scope (Explicit Non-Goals)
Contract Execution: Le Gals will not auto-sign or execute contracts.
CLM Replacement: Le Gals does not serve as a primary contract lifecycle management repository or e-signature platform.
Legal Representation: System output serves as an automated internal risk analysis tool, not binding legal counsel.
3. TARGET USERS & PERSONAS
3.1 Primary User Personas
1. In-House Corporate Legal Counsel (Persona: Sarah, General Counsel)
Pain Point: Spends 60%+ of daily hours reviewing standard clauses across repetitive contracts.
Use Case: Uses Le Gals as a Tier-1 AI Legal Assistant to instantly identify high-risk liability clauses, uncapped indemnities, and receive recommended policy redlines.
2. Enterprise Sales Operations & Deal Desk (Persona: Alex, VP of Sales Ops)
Pain Point: Sales deals are stalled for weeks waiting for legal department review.
Use Case: Runs customer-provided MSAs through Le Gals to generate an instant Risk Score. Low-risk contracts are fast-tracked, while high-risk contracts are automatically routed to legal counsel with flagged issue notes.
3. Enterprise Account Managers & Systems Integrators (e.g., Cognizant IT Operations)
Pain Point: Managing continuous compliance across hundreds of active client vendor agreements under strict regulatory frameworks (GDPR, HIPAA, SOC2).
Use Case: Uses Le Gals to run continuous compliance audits across all active enterprise vendor and service contracts.
4. SYSTEM ARCHITECTURE & HIGH-LEVEL DESIGN
┌─────────────────────────────────────────────────────────────────────────┐
 │ 1. INGESTION & VECTOR STORAGE LAYER                                     │
 │                                                                         │
 │  [ Document PDF ] ──► PyPDF Parser ──► Parent-Child Splitter            │
 │                                           (2000c / 400c)                │
 │                                                 │                       │
 │                                                 ▼                       │
 │                                     [ Qdrant DB (Podman) ]              │
 └─────────────────────────────────────────┬───────────────────────────────┘
                                           │
                                           ▼
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ 2. LANGGRAPH MULTI-AGENT STATE MACHINE                                  │
 │                                                                         │
 │       ┌────────────────────────┐           ┌────────────────────────┐   │
 │       │ Retrieval Router Node  │ ────────► │ Clause Auditor Agent   │   │
 │       │ (Fetches Parent Text)  │           │ (Identifies Risk Tags) │   │
 │       └────────────────────────┘           └───────────┬────────────┘   │
 │                                                        │                │
 │                                                        ▼                │
 │                                            ┌────────────────────────┐   │
 │                                            │ Grounding Evaluator    │   │
 │                                            │ (Computes Risk Metric) │   │
 │                                            └────────────────────────┘   │
 └────────────────────────────────────────────────────────┬────────────────┘
                                                          │
                                                          ▼
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ 3. QUALITY GATE & OUTPUT INTERFACE                                      │
 │                                                                         │
 │   [ Ragas Faithfulness Gate ] ──► [ Pytest CI/CD ] ──► [ Audit Output ] │
 └─────────────────────────────────────────────────────────────────────────┘

5. FUNCTIONAL & TECHNICAL REQUIREMENTS
5.1 Functional Requirements (FR)
ID
Requirement Name
Description
Priority
FR-01
PDF Document Parsing
System must parse unstructured native PDF legal contracts up to 50MB.
P0 (Critical)
FR-02
Parent-Child Chunking
System must index 400c child search vectors linked to 2,000c parent context blocks.
P0 (Critical)
FR-03
Vector Storage
System must store child embeddings and parent text payloads inside Qdrant.
P0 (Critical)
FR-04
Risk Clause Audit
Auditor Agent must evaluate retrieved context against target legal policy topics.
P0 (Critical)
FR-05
Structured Redlining
Auditor Agent must output exact text, clause ID, policy violation, and suggested redline.
P0 (Critical)
FR-06
Deterministic Risk Scoring
Evaluator Node must compute an overall document risk score between 0.00 and 1.00.
P1 (High)
FR-07
Automated Evaluation
System must programmatically compute Ragas Faithfulness and Answer Relevance metrics.
P1 (High)
FR-08
Automated Quality Gate
Pytest framework must assert minimum evaluation thresholds before build deployment.
P1 (High)

5.2 Non-Functional Requirements (NFR)
NFR-01 (Latency): Complete end-to-end execution per 50-page document must take $\le 30\text{ seconds}$.
NFR-02 (RAG Precision): Ragas Faithfulness score must remain $\ge 0.85$ to prevent hallucinations.
NFR-03 (Infrastructure Security): Container runtime must run entirely rootless via Podman on Fedora Linux.
NFR-04 (Vector Query Performance): Vector search lookups in Qdrant must execute in $\le 50\text{ms}$ per query.
6. INPUT / OUTPUT SPECIFICATIONS & API CONTRACTS
6.1 Input Specification & Audit Configuration
JSON
{
  "contract_file_path": "data/sample_contract.pdf",
  "audit_profile": "STRICT_ENTERPRISE_COMPLIANCE",
  "query_topics": [
    "uncapped liability and limitation of liability thresholds",
    "data privacy, retention periods, and GDPR compliance",
    "termination penalties, cure periods, and indemnification"
  ],
  "retrieval_params": {
    "top_k": 3,
    "child_chunk_size": 400,
    "parent_chunk_size": 2000
  }
}

6.2 Standard JSON Audit Output Contract
JSON
{
  "audit_id": "legals-audit-9942a-2026",
  "document_metadata": {
    "file_name": "sample_contract.pdf",
    "total_pages": 18,
    "ingested_chunks": 74
  },
  "overall_risk_score": 0.82,
  "compliance_status": "FLAGGED_HIGH_RISK",
  "executive_summary": "The submitted contract contains critical liability exposure in Section 12.2. Third-party IP indemnification obligations are uncapped, violating corporate risk policies. Data retention timelines in Section 8.1 conflict with standard 7-year retention schedules.",
  "flagged_clauses": [
    {
      "clause_id": "CL-12.2",
      "category": "Liability & Indemnity",
      "severity": "HIGH",
      "page_number": 14,
      "exact_text": "Vendor agrees to defend, indemnify, and hold harmless Customer without limitation against any third-party IP claims.",
      "policy_violation": "Uncapped Third-Party Indemnification",
      "recommended_redline": "Vendor indemnification obligations under Section 12.2 shall be capped at two times (2x) the total fees paid under this Agreement in the preceding 12 months."
    },
    {
      "clause_id": "CL-8.1",
      "category": "Data Privacy & Governance",
      "severity": "MEDIUM",
      "page_number": 9,
      "exact_text": "Customer data shall be retained for a period of ten (10) years following contract termination.",
      "policy_violation": "Exceeds Standard 7-Year Retention Window",
      "recommended_redline": "Customer data shall be securely purged within ninety (90) days following contract termination."
    }
  ],
  "quality_metrics": {
    "ragas_faithfulness_score": 0.94,
    "ragas_answer_relevance_score": 0.89,
    "ci_cd_gate_status": "PASSED"
  }
}

7. TECH STACK, INFRASTRUCTURE & PREREQUISITES
Component Layer
Technology
Operational Justification
Operating System
Fedora Linux
Native Podman integration and strict SELinux security boundaries.
Container Engine
Podman
Daemonless, rootless container execution compliant with enterprise IT policies.
Vector Database
Qdrant (v1.9+)
Fast cosine-distance vector search supporting rich JSON payload metadata.
Orchestration
LangGraph & LangChain
State-machine multi-agent framework supporting dynamic execution loops.
LLM Provider
OpenAI API (gpt-4o-mini, text-embedding-3-small)
Fast, structured JSON generation with high context adherence.
Quality Framework
Ragas + Pytest
Programmatic testing of RAG faithfulness and answer relevance.

8. QUALITY ASSURANCE, EVALUATION & CI/CD GATES
┌───────────────────────────────────────────────────────────────────────────┐
│ AUTOMATED PYTEST CI/CD QUALITY GATE                                       │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   [ Run Audit Pipeline ] ──► Compute Ragas Metrics ──► Evaluate Assertions│
│                                                               │           │
│         ┌─────────────────────────────────────────────────────┴──────┐    │
│         ▼                                                            ▼    │
│   Faithfulness ≥ 0.85                                    Faithfulness < 0.85│
│   Relevance ≥ 0.80                                       Relevance < 0.80 │
│         │                                                            │    │
│         ▼                                                            ▼    │
│   [ BUILD PASSED: DEPLOY ]                                   [ BUILD FAILED ]
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘

Automated Assertion Tests (tests/test_audit_quality.py)
Python
def test_rag_retrieval_faithfulness():
    """Ensures LLM output strictly reflects contract text without hallucination."""
    metrics = evaluate_ragas_pipeline()
    assert metrics["faithfulness"] >= 0.85, (
        f"CRITICAL: RAG Faithfulness dropped to {metrics['faithfulness']}. "
        "Build rejected."
    )

def test_grounding_accuracy():
    """Ensures risk evaluation scores conform deterministically to policy rules."""
    metrics = evaluate_grounding_accuracy()
    assert metrics["grounding_score"] >= 0.80, (
        f"CRITICAL: Grounding accuracy dropped to {metrics['grounding_score']}. "
        "Build rejected."
    )

9. SECURITY, COMPLIANCE & RESPONSIBLE AI
Container Isolation: Vector storage operates inside isolated, rootless Podman containers on local ports 6333/6334.
Data Privacy: Contract payloads are processed in memory and indexed locally; vector data is never transmitted to public third-party indexes.
Hallucination Prevention: Parent-Child RAG ensures LLM agents receive full surrounding context (2,000 characters), eliminating missing sentence dependencies.
Deterministic Guardrails: Auditor agents must adhere to strict JSON schema validation; parsing failures trigger automated retry loops within the LangGraph engine.
10. PROJECT MILESTONES & IMPLEMENTATION ROADMAP
┌───────────────────────────────────────────────────────────────────────────┐
│ IMPLEMENTATION ROADMAP                                                    │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│ [Phase 1: Environment & Container Setup]  ◄── CURRENT STATUS              │
│   • Podman setup, Qdrant container startup, virtualenv activation.        │
│                                                                           │
│ [Phase 2: Parent-Child RAG Ingestion Pipeline]                            │
│   • Code src/rag_pipeline.py for document splitting & Qdrant indexing.    │
│                                                                           │
│ [Phase 3: LangGraph Multi-Agent Engine]                                   │
│   • Code src/agent_graph.py with Auditor and Evaluator nodes.             │
│                                                                           │
│ [Phase 4: Main Execution & Automated CI/CD Gates]                         │
│   • Code main.py pipeline script & tests/test_audit_quality.py.            │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘

Here is the complete **Enterprise Frontend Architecture & Design Specification** for **Project Le Gals**, structured as a comprehensive technical deliverable for engineering and design teams.

---

# PROJECT LE GALS — FRONTEND UX/UI ARCHITECTURE SPECIFICATION

**Document Reference:** `LEG-UI-SPEC-2026-V1.0` | **Status:** Approved for Implementation

**Design System Standard:** Academic Legal & Executive Ledger (Minimalist Monochromatic Dark)

**Target Architecture:** Next.js 14 / React 18 / Tailwind CSS / Radix UI Primitives / Lucide Icons

---

## 1. Design System & Brand Identity

### 1.1 Aesthetic Philosophy

The **Le Gals** interface strictly rejects consumer AI SaaS tropes—such as vibrant gradients, floating glassmorphic panels, glowing neon cards, or rounded pill buttons. As an enterprise audit workspace handling high-stakes legal liabilities, the design system projects authority, legal precision, and high-density operational clarity.

* **Flat Surface Hierarchy:** Visual depth is created through distinct surface tones rather than elevation drop-shadows.
* **Zero-Radius Geometry:** Every UI component, container, modal, button, and input field uses a strict `border-radius: 0px`.
* **Purposeful Risk Coloration:** Color is reserved exclusively for semantic audit status (e.g., Deep Oxblood Maroon for high-risk flags; Dark Imperial Purple for active evaluation nodes).

### 1.2 Global Color Palette

| Token Name | Hex Code | Visual Description | UI Application Boundary |
| --- | --- | --- | --- |
| `--bg-base` | `#0A0908` | Deep Onyx Black | Application canvas and primary background |
| `--bg-surface` | `#141210` | Obsidian Flat | Sidebars, panels, card containers, and modal bodies |
| `--bg-surface-active` | `#1E1B18` | Darkened Ember | Active navigation items and focused rows |
| `--border-subtle` | `#2A2724` | Subtle Charcoal | 1px grid lines, panel dividers, and structural borders |
| `--border-accent` | `#4A3525` | Dark Leather Amber | Active system indicators, dropzone borders, primary button outlines |
| `--text-primary` | `#F5F4F0` | Warm Off-White | Primary clause text, modal headers, major scores |
| `--text-muted` | `#A19D94` | Muted Stone Gray | Metadata, labels, line numbers, timestamps, JSON metrics |
| `--accent-risk-high` | `#581825` | Deep Maroon | High-risk clause markers, critical redline alerts, primary triggers |
| `--accent-purple` | `#2D1E36` | Dark Emperor Purple | Agent evaluation nodes, secondary action buttons |

### 1.3 Typography System

* **Primary Serif (Document Titles, Risk Scores, Clause Text):** `EB Garamond` or `Cinzel` (Fallback: `Georgia, serif`). Conveys formal legal publishing weight.
* **Secondary Sans-Serif / Monospace (UI Controls, Metadata, Line Numbers, JSON Metrics):** `Inter` / `JetBrains Mono`. Ensures high-density data readability.

---

## 2. Global Shell Structure Layout

The global shell consists of a **Top Utility Bar**, a **Fixed Navigation Sidebar**, and a **Three-Column Main Workspace Layout**.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP BAR] LE GALS // LEGAL AUDIT ENGINE   |  [FEDORA CONTAINER ACTIVE]  | QDRANT: 38ms   │
├──────────────┬────────────────────────────────────────────┬──────────────────────────────┤
│ SIDEBAR      │ MAIN WORKSPACE                             │ CONTEXT PANEL                │
│              │                                            │                              │
│  [+] INGEST  │  ┌──────────────────────────────────────┐  │ RISK ASSESSMENT OVERVIEW     │
│      CONTRACT│  │ PDF Viewer / Document Inspector        │  │ Score: 0.82 [ HIGH RISK ]    │
│              │  └──────────────────────────────────────┘  │                              │
│  • Recent    │                                            │ FLAGGED CLAUSES              │
│    Audits    │  ┌──────────────────────────────────────┐  │ • Section 12.2 [CRITICAL]    │
│              │  │ Compliance Table / Findings Studio   │  │ • Section 8.1  [WARNING]     │
│  • Policy    │  └──────────────────────────────────────┘  │                              │
└──────────────┴────────────────────────────────────────────┴──────────────────────────────┘

```

### 2.1 Top Utility Bar (`h-12 border-b border-[#2A2724] bg-[#0A0908]`)

* **Left Brand Anchor:** Text Monogram `LE GALS // COMPLIANCE ENGINE` (`JetBrains Mono`, 12px, tracking `0.15em`, color `#F5F4F0`).
* **Center Environment Badge:** Container indicator rendered in a solid dark maroon container (`bg-[#581825]`, text `#F5F4F0`, 11px uppercase monospace): `FEDORA / ROOTLESS CONTAINER ACTIVE`.
* **Right Controls:**
* Text Link: `DOCUMENTATION` (Color `#A19D94`, hover `#F5F4F0`).
* Latency Metric: `QDRANT RETRIEVAL: 38ms` (Monospaced 11px with a green status indicator dot).



### 2.2 Navigation Sidebar (`w-64 border-r border-[#2A2724] bg-[#141210]`)

* **Primary Action Button:** `[+ INGEST NEW CONTRACT]` — Full-width rectangular button, background `#2A2724`, border `1px solid #4A3525`, text `#F5F4F0` uppercase. On hover, background shifts to `#4A3525`.
* **Audit History List:** Vertical stack displaying active and past contracts.
* *Active State:* `border-l-2 border-[#2D1E36]`, background `#1E1B18`. Title: `MSA_Vendor_Acme_2026.pdf` (12px Serif), Timestamp: `Aug 31, 2026 - 14:02` (10px Mono).
* *Inactive State:* Text `#A19D94`, hover shift to `#F5F4F0`.


* **Bottom Policy Selector:** Rectangular dropdown displaying active audit standard: `POLICY: STRICT_ENTERPRISE_COMPLIANCE (v2.4) ▼`.

---

## 3. Screen Specifications

### 3.1 Screen 1: Audit Ingestion Workspace & Upload Modal

When no active document is loaded, the central canvas displays an ingestion interface with audit target configurations.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ INGESTION WORKSPACE                                                      │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │     [ ICON: DOCUMENT ARCHIVE ]                                     │  │
│  │     DRAG & DROP CONTRACT PDF HERE OR CLICK TO BROWSE               │  │
│  │     Supported formats: PDF, DOCX (Max 50MB)                        │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  AUDIT TARGET TOPICS                                                     │
│  [X] Uncapped Liability & Indemnification                                │
│  [X] Data Privacy & GDPR Retention Limits                                │
│  [ ] Intellectual Property Transfer Rights                               │
│  [X] Termination Penalties & Cure Window                                 │
│                                                                          │
│  [ INITIATE MULTI-AGENT COMPLIANCE AUDIT ]                               │
└──────────────────────────────────────────────────────────────────────────┘

```

* **Dropzone Surface:** Border `1px dashed #4A3525`, background `#0A0908`. Primary text in `EB Garamond` 18px (`#F5F4F0`); subtext in `Inter` 11px monospaced (`#A19D94`).
* **Configuration Grid:** Square checkboxes (`#0A0908` fill, `1px solid #4A3525` border, checkmark `#F5F4F0`). Dropdown for vector chunking parameters (Parent Context: `2000c` / Child Search: `400c`).
* **Execution CTA:** Solid Dark Maroon button (`bg-[#581825]`, text `#F5F4F0`, `font-mono`, text-xs, tracking-wider).

### 3.2 Screen 2: Active Document Inspection & Redline Studio

Once parsed, the view switches into a synchronized dual-pane split workspace.

```
┌─────────────────────────────────────────┬────────────────────────────────┐
│ PDF DOCUMENT VIEWER (PAGE 14 OF 18)     │ COMPLIANCE AUDIT ANALYSIS      │
├─────────────────────────────────────────┼────────────────────────────────┤
│ ...Section 12.1 Limitation of Liability.│ RISK ASSESSMENT OVERVIEW       │
│                                         │ Score: 0.82 [ HIGH RISK ]      │
│ ┌─────────────────────────────────────┐ │                                │
│ │ SECTION 12.2 INDEMNIFICATION        │ │ FLAGGED CLAUSES (2 CRITICAL)   │
│ │ Vendor agrees to defend, indemnify  │ │                                │
│ │ and hold harmless Customer without  │ │ ▼ CL-12.2 | High Severity      │
│ │ limitation against any third-party  │ │   Violation: Uncapped IP Scope │
│ │ IP claims...                        │ │   [VIEW REDLINE PROPOSAL]      │
│ └─────────────────────────────────────┘ │                                │
│                                         │ ► CL-8.1 | Medium Severity     │
└─────────────────────────────────────────┴────────────────────────────────┘

```

#### Left Pane: PDF Text Inspector

* **Canvas:** Dark Charcoal background (`#141210`) with `1px solid #2A2724` border wrapper. Text in `EB Garamond` 15px, line-height `1.6`, color `#F5F4F0`.
* **High-Risk Highlights (Section 12.2):** Background `#581825` (30% opacity), left vertical border `3px solid #581825`.
* **Medium-Risk Highlights (Section 8.1):** Background `#4A3525` (30% opacity), left vertical border `3px solid #4A3525`.

#### Right Pane: Compliance Findings & Redline Studio

* **Risk Score Header Block:** Rectangular box (`border: 1px solid #2A2724`, `bg: #0A0908`). Displays overall computed risk score `0.82 / 1.00` in `EB Garamond` 36px bold (`#F5F4F0`). Tagged with rectangular severity badge: `FLAGGED: HIGH RISK EXPOSURE` (`bg-[#581825]`).
* **Clause Accordion Cards:**
* *Container:* `#141210` background, `1px solid #2A2724`.
* *Header:* Clause ID `CL-12.2` (`JetBrains Mono` 11px), Severity Tag `HIGH` (Red text on black fill), Category `Liability & Indemnity` (Serif 13px bold).
* *Redline Diff Box:* Solid `#0A0908` container, monospaced 12px text. Strike-through deleted text in maroon (`text-[#8B263E]`); proposed addition text in warm off-white (`text-[#F5F4F0]` with muted underline): *"Indemnification obligations under Section 12.2 shall be capped at two times (2x) annual contract fees."*
* *Controls:* `[ COPY REDLINE ]` (Outline button `1px solid #4A3525`) and `[ ACCEPT PROPOSAL ]` (Solid Dark Purple button `bg-[#2D1E36]`).



### 3.3 Screen 3: RAG Diagnostics & Quality Gate Modal

Activated via the `QUALITY GATES: PASSED` footer metric, rendering pipeline validation data for technical auditing.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ RAGAS EVALUATION METRICS & QUALITY GATE INSPECTOR                   [X]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  METRIC                          SCORE      THRESHOLD      BUILD STATUS  │
│  ──────────────────────────────────────────────────────────────────────  │
│  Ragas Faithfulness              0.94       >= 0.85        ■ PASSED      │
│  Answer Relevance                0.89       >= 0.80        ■ PASSED      │
│  Qdrant Retrieval Latency        38ms       <= 50ms        ■ PASSED      │
│  Grounding Score                 0.92       >= 0.80        ■ PASSED      │
│                                                                          │
│  CI/CD GATE DECISION: BUILD APPROVED FOR DEPLOYMENT                      │
│                                                                          │
│  [ DOWNLOAD JSON AUDIT REPORT ]         [ EXPORT PDF EXECUTIVE SUMMARY ]  │
└──────────────────────────────────────────────────────────────────────────┘

```

* **Modal Overlay:** Semi-transparent backdrop (`rgba(10, 9, 8, 0.85)`).
* **Modal Surface:** Solid `#141210` background, `1px solid #4A3525` border.
* **Data Table:** Monospaced score alignments. Status indicated by solid square indicator (`■ PASSED`) in warm text `#F5F4F0` (avoiding bright green consumer icons).

---

## 4. Frontend Component Architecture (React / Next.js)

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx         // Status bar, environment badge, latency monitor
│   │   ├── Sidebar.tsx        // Action CTA, historical audit list, policy selector
│   │   └── AppShell.tsx       // 3-Column main layout wrapper
│   ├── Audit/
│   │   ├── Dropzone.tsx       // PDF drag-and-drop file ingestion pane
│   │   ├── DocumentViewer.tsx // Highlighted PDF text canvas & line viewer
│   │   ├── RiskHeader.tsx     // Executive score overview block (0.82 score)
│   │   ├── ClauseCard.tsx     // Accordion redline propose/accept module
│   │   └── QualityModal.tsx   // RAG assertions & CI/CD diagnostics table
│   └── ui/
│       ├── Button.tsx         // Rectangular monochrome buttons (Zero radius)
│       ├── Badge.tsx          // Flat status badges (Maroon, Purple, Dark Amber)
│       └── Accordion.tsx      // Zero-animation structural text expansion

```

