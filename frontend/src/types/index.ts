/**
 * LE GALS - Enterprise Legal Audit Engine Types
 * Centralized domain models and interface contracts.
 */

export type SeverityLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Clause {
  clause_id: string;
  category: string;
  severity: SeverityLevel;
  page_number: number;
  exact_text: string;
  policy_violation: string;
  recommended_redline: string;
}

export interface QualityMetrics {
  ragas_faithfulness_score: number;
  ragas_answer_relevance_score: number;
  grounding_score: number;
  qdrant_latency_ms: number;
  ci_cd_gate_status: "PASSED" | "FAILED";
}

export interface DocumentMetadata {
  file_name: string;
  total_pages: number;
  ingested_chunks: number;
}

export interface AuditReport {
  audit_id: string;
  document_metadata: DocumentMetadata;
  overall_risk_score: number;
  compliance_status: "PASSED_COMPLIANCE" | "FLAGGED_MEDIUM_RISK" | "FLAGGED_HIGH_RISK";
  executive_summary: string;
  flagged_clauses: Clause[];
  quality_metrics: QualityMetrics;
}

export interface AuditHistoryItem {
  id: string;
  fileName: string;
  timestamp: string;
  riskScore: number;
}

export type ThemeMode = "dark" | "light";

