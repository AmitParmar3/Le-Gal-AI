"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dropzone } from "@/components/audit/Dropzone";
import { DocumentViewer } from "@/components/audit/DocumentViewer";
import { RiskHeader } from "@/components/audit/RiskHeader";
import { ClauseCard } from "@/components/audit/ClauseCard";
import { MOCK_FLAGGED_CLAUSES, MOCK_SAMPLE_REPORT } from "@/services/mockData";

export default function WorkspacePage() {
  const [view, setView] = useState<"ingestion" | "audit">("audit");
  const [activeDocId, setActiveDocId] = useState(MOCK_SAMPLE_REPORT.audit_id);
  const [highlightedClause, setHighlightedClause] = useState<string | undefined>("CL-12.2");
  const [isDocExpanded, setIsDocExpanded] = useState(false);

  const handleStartAudit = (topics: string[]) => {
    setView("audit");
  };

  return (
    <div className="flex min-h-[calc(100vh-3rem)] max-h-screen overflow-hidden select-none bg-bgBase">
      {/* Draggable Sidebar Navigation */}
      <Sidebar
        onIngestClick={() => setView("ingestion")}
        activeDocId={activeDocId}
        onSelectDoc={(id) => {
          setActiveDocId(id);
          setView("audit");
        }}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 overflow-hidden p-4 bg-bgBase">
        {view === "ingestion" ? (
          <Dropzone onStartAudit={handleStartAudit} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start h-full">
            {/* Left Pane: PDF Document Inspector (7 cols default, 12 cols when expanded) */}
            <div
              className={`transition-all duration-300 h-full ${
                isDocExpanded ? "lg:col-span-12" : "lg:col-span-7"
              }`}
            >
              <DocumentViewer
                fileName={MOCK_SAMPLE_REPORT.document_metadata.file_name}
                currentPage={14}
                totalPages={MOCK_SAMPLE_REPORT.document_metadata.total_pages}
                highlightedClauseId={highlightedClause}
                isExpanded={isDocExpanded}
                onToggleExpand={() => setIsDocExpanded(!isDocExpanded)}
              />
            </div>

            {/* Right Pane: Redline Studio (Sticky RiskHeader + Scrollable Flagged Clauses) */}
            {!isDocExpanded && (
              <div className="lg:col-span-5 flex flex-col h-[calc(100vh-5rem)] overflow-hidden space-y-4">
                {/* FIXED STICKY TOP BLOCK: Executive Risk Overview */}
                <div className="flex-shrink-0">
                  <RiskHeader
                    score={MOCK_SAMPLE_REPORT.overall_risk_score}
                    status={MOCK_SAMPLE_REPORT.compliance_status}
                    executiveSummary={MOCK_SAMPLE_REPORT.executive_summary}
                  />
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between font-mono text-xs text-textMuted border-b border-borderSubtle pb-2 pt-1 flex-shrink-0">
                  <span className="uppercase tracking-wider font-bold">
                    FLAGGED CLAUSES ({MOCK_FLAGGED_CLAUSES.length} POLICY ISSUES)
                  </span>
                  <span className="text-[10px] bg-bgSurface px-2 py-0.5 border border-borderSubtle font-bold">
                    STRICT COMPLIANCE
                  </span>
                </div>

                {/* SCROLLABLE BOTTOM CONTAINER: Flagged Clause Cards */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {MOCK_FLAGGED_CLAUSES.map((clause) => (
                    <ClauseCard
                      key={clause.clause_id}
                      clause={clause}
                      onSelectClause={(id) => setHighlightedClause(id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
