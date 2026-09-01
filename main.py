import os
import sys
import json
import argparse
import time
from typing import Dict, Any

from src.config import (
    DEFAULT_AUDIT_PROFILE,
    DEFAULT_QUERY_TOPICS,
)
from src.rag_pipeline import parse_pdf, parent_child_chunking, ContractVectorStore
from src.agent_graph import create_audit_graph


def run_audit(
    pdf_path: str,
    audit_profile: str = DEFAULT_AUDIT_PROFILE,
    query_topics: list = None
) -> Dict[str, Any]:
    """
    Main orchestration function running the Le Gals audit engine:
    PDF parsing -> Parent-Child indexing -> LangGraph Multi-Agent Audit -> Quality Gate Report
    """
    if query_topics is None:
        query_topics = DEFAULT_QUERY_TOPICS

    print(f"\n=======================================================")
    print(f" LE GALS // ENTERPRISE LEGAL & POLICY AUDIT ENGINE")
    print(f"=======================================================")
    print(f"Target Contract : {pdf_path}")
    print(f"Audit Profile   : {audit_profile}")
    print(f"Query Topics    : {len(query_topics)} policy areas")
    print(f"-------------------------------------------------------")

    print("[1/4] Parsing PDF legal document...")
    pages_content = parse_pdf(pdf_path)
    total_pages = len(pages_content)
    print(f"      Parsed {total_pages} page(s) successfully.")

    print("[2/4] Executing Parent-Child chunking & indexing into Qdrant...")
    chunks = parent_child_chunking(pages_content)
    vector_store = ContractVectorStore()
    indexed_count = vector_store.index_chunks(chunks)
    print(f"      Indexed {indexed_count} child search vectors ({len(chunks)} context blocks).")

    print("[3/4] Running LangGraph Multi-Agent Audit State Machine...")
    audit_graph = create_audit_graph()

    initial_state = {
        "contract_file_path": pdf_path,
        "audit_profile": audit_profile,
        "query_topics": query_topics,
        "vector_store": vector_store
    }

    final_state = audit_graph.invoke(initial_state)
    print("      Multi-Agent audit execution completed.")

    print("[4/4] Generating JSON Audit Output and Quality Report...")
    file_basename = os.path.basename(pdf_path)

    output_payload = {
        "audit_id": f"legals-audit-{int(time.time())}",
        "document_metadata": {
            "file_name": file_basename,
            "total_pages": total_pages,
            "ingested_chunks": indexed_count
        },
        "overall_risk_score": final_state.get("overall_risk_score"),
        "compliance_status": final_state.get("compliance_status"),
        "executive_summary": final_state.get("executive_summary"),
        "flagged_clauses": final_state.get("flagged_clauses", []),
        "quality_metrics": final_state.get("quality_metrics", {})
    }

    os.makedirs("output", exist_ok=True)
    json_path = os.path.join("output", "audit_report.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, indent=2)

    md_path = os.path.join("output", "audit_summary.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# LE GALS EXECUTIVE AUDIT REPORT\n\n")
        f.write(f"**Document:** `{file_basename}`  \n")
        f.write(f"**Risk Score:** `{output_payload['overall_risk_score']:.2f}` / `1.00`  \n")
        f.write(f"**Compliance Status:** `{output_payload['compliance_status']}`  \n\n")
        f.write(f"## Executive Summary\n{output_payload['executive_summary']}\n\n")
        f.write(f"## Flagged Clauses\n")
        for clause in output_payload["flagged_clauses"]:
            f.write(f"### [{clause.get('severity')}] {clause.get('clause_id')} - {clause.get('category')}\n")
            f.write(f"- **Page:** {clause.get('page_number')}\n")
            f.write(f"- **Policy Violation:** {clause.get('policy_violation')}\n")
            f.write(f"- **Exact Text:** *\"{clause.get('exact_text')}\"*\n")
            f.write(f"- **Recommended Redline:** `{clause.get('recommended_redline')}`\n\n")

    print(f"\n=======================================================")
    print(f" AUDIT COMPLETE: {output_payload['compliance_status']}")
    print(f" Overall Risk Score : {output_payload['overall_risk_score']:.2f}")
    print(f" Flagged Clauses    : {len(output_payload['flagged_clauses'])}")
    print(f" Faithfulness Score : {output_payload['quality_metrics'].get('ragas_faithfulness_score')}")
    print(f" CI/CD Quality Gate : {output_payload['quality_metrics'].get('ci_cd_gate_status')}")
    print(f" Report Saved To    : {json_path}")
    print(f"=======================================================\n")

    return output_payload


def main():
    parser = argparse.ArgumentParser(description="Le Gals Multi-Agent Contract Audit Engine")
    parser.add_argument("--contract", type=str, default="data/sample_contract.pdf", help="Path to target contract PDF")
    parser.add_argument("--profile", type=str, default=DEFAULT_AUDIT_PROFILE, help="Audit policy profile")
    args = parser.parse_args()

    if not os.path.exists(args.contract):
        print(f"Target contract PDF '{args.contract}' not found. Generating sample PDF...")
        from data.generate_sample import create_sample_contract_pdf
        create_sample_contract_pdf(args.contract)

    run_audit(args.contract, audit_profile=args.profile)


if __name__ == "__main__":
    main()

