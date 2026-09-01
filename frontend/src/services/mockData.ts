import { Clause, AuditHistoryItem, AuditReport } from "@/types";

export const MOCK_AUDIT_HISTORY: AuditHistoryItem[] = [
  {
    id: "legals-audit-9942a-2026",
    fileName: "MSA_Vendor_Acme_2026.pdf",
    timestamp: "Aug 31, 2026 - 14:02",
    riskScore: 0.82,
  },
  {
    id: "legals-audit-8812b-2026",
    fileName: "SOW_Cloud_Migration_v4.pdf",
    timestamp: "Aug 29, 2026 - 09:45",
    riskScore: 0.35,
  },
  {
    id: "legals-audit-7711c-2026",
    fileName: "NDA_Mutual_Enterprise.pdf",
    timestamp: "Aug 25, 2026 - 11:15",
    riskScore: 0.12,
  },
];

export const MOCK_FLAGGED_CLAUSES: Clause[] = [
  {
    clause_id: "CL-12.2",
    category: "Liability & Indemnity",
    severity: "HIGH",
    page_number: 14,
    exact_text:
      "Vendor agrees to defend, indemnify, and hold harmless Customer without limitation against any third-party IP claims, regulatory fines, or damages arising out of performance of the Services. This indemnification obligation is uncapped and unlimited in duration and scope.",
    policy_violation: "Uncapped Third-Party Indemnification and Unlimited Scope Exposure",
    recommended_redline:
      "Vendor indemnification obligations under Section 12.2 shall be capped at two times (2x) the total fees paid under this Agreement in the preceding 12 months.",
  },
  {
    clause_id: "CL-8.1",
    category: "Data Privacy & Governance",
    severity: "MEDIUM",
    page_number: 9,
    exact_text:
      "Customer data shall be retained, archived, and backed up by Vendor for a period of ten (10) years following contract termination. Customer agrees that data purging requests shall be subject to administrative processing fees.",
    policy_violation: "Exceeds Standard 7-Year Statutory Data Retention Window",
    recommended_redline:
      "Customer data shall be securely purged within ninety (90) days following contract termination without administrative fees.",
  },
  {
    clause_id: "CL-5.3",
    category: "Termination & Default",
    severity: "MEDIUM",
    page_number: 5,
    exact_text:
      "In the event of early termination by Customer for convenience, Customer shall pay an immediate early termination penalty equal to 100% of all remaining unpaid contract value without cure period.",
    policy_violation: "Unreasonable Termination Penalty without Standard 30-Day Cure Period",
    recommended_redline:
      "Either party may terminate upon thirty (30) days written notice with a standard thirty-day cure period for material breach.",
  },
];

export const MOCK_SAMPLE_REPORT: AuditReport = {
  audit_id: "legals-audit-9942a-2026",
  document_metadata: {
    file_name: "MSA_Vendor_Acme_2026.pdf",
    total_pages: 18,
    ingested_chunks: 74,
  },
  overall_risk_score: 0.82,
  compliance_status: "FLAGGED_HIGH_RISK",
  executive_summary:
    "The submitted contract contains critical liability exposure in Section 12.2. Third-party IP indemnification obligations are uncapped, violating corporate risk policies. Data retention timelines in Section 8.1 conflict with standard 7-year retention schedules.",
  flagged_clauses: MOCK_FLAGGED_CLAUSES,
  quality_metrics: {
    ragas_faithfulness_score: 0.94,
    ragas_answer_relevance_score: 0.89,
    grounding_score: 0.92,
    qdrant_latency_ms: 38.0,
    ci_cd_gate_status: "PASSED",
  },
};

