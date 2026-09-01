import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from main import run_audit
from src.config import FAITHFULNESS_THRESHOLD, GROUNDING_THRESHOLD


def test_rag_retrieval_faithfulness():
    """Ensures LLM / Auditor output strictly reflects contract text without hallucination."""
    sample_pdf = "data/sample_contract.pdf"
    if not os.path.exists(sample_pdf):
        from data.generate_sample import create_sample_contract_pdf
        create_sample_contract_pdf(sample_pdf)

    report = run_audit(sample_pdf)
    metrics = report.get("quality_metrics", {})

    faithfulness = metrics.get("ragas_faithfulness_score", 0.0)
    assert faithfulness >= FAITHFULNESS_THRESHOLD, (
        f"CRITICAL: RAG Faithfulness dropped to {faithfulness} (Threshold: {FAITHFULNESS_THRESHOLD}). Build rejected."
    )


def test_grounding_accuracy():
    """Ensures risk evaluation scores conform deterministically to policy rules."""
    sample_pdf = "data/sample_contract.pdf"
    if not os.path.exists(sample_pdf):
        from data.generate_sample import create_sample_contract_pdf
        create_sample_contract_pdf(sample_pdf)

    report = run_audit(sample_pdf)
    metrics = report.get("quality_metrics", {})

    grounding_score = metrics.get("grounding_score", 0.0)
    assert grounding_score >= GROUNDING_THRESHOLD, (
        f"CRITICAL: Grounding accuracy dropped to {grounding_score} (Threshold: {GROUNDING_THRESHOLD}). Build rejected."
    )


def test_qdrant_retrieval_latency():
    """Ensures vector store queries execute within acceptable latency budget (<= 50ms)."""
    sample_pdf = "data/sample_contract.pdf"
    if not os.path.exists(sample_pdf):
        from data.generate_sample import create_sample_contract_pdf
        create_sample_contract_pdf(sample_pdf)

    report = run_audit(sample_pdf)
    metrics = report.get("quality_metrics", {})

    latency_ms = metrics.get("qdrant_latency_ms", 999.0)
    assert latency_ms <= 50.0, (
        f"CRITICAL: Qdrant retrieval latency exceeded budget at {latency_ms}ms (Threshold: 50.0ms)."
    )


def test_ci_cd_quality_gate():
    """End-to-end assertion validating JSON output payload structure and CI/CD status."""
    sample_pdf = "data/sample_contract.pdf"
    if not os.path.exists(sample_pdf):
        from data.generate_sample import create_sample_contract_pdf
        create_sample_contract_pdf(sample_pdf)

    report = run_audit(sample_pdf)

    assert "audit_id" in report
    assert "document_metadata" in report
    assert "overall_risk_score" in report
    assert "flagged_clauses" in report
    assert report["quality_metrics"]["ci_cd_gate_status"] == "PASSED"

