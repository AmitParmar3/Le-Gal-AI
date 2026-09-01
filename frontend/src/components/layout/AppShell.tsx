"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LandingHero } from "../Landing/LandingHero";
import { Dropzone } from "../Audit/Dropzone";
import { DocumentViewer } from "../Audit/DocumentViewer";
import { RiskHeader } from "../Audit/RiskHeader";
import { ClauseCard, Clause } from "../Audit/ClauseCard";
import { QualityModal } from "../Audit/QualityModal";

const sampleClauses: Clause[] = [
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

export const AppShell: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [view, setView] = useState<"landing" | "ingestion" | "audit">("landing");
  const [activeDocId, setActiveDocId] = useState("legals-audit-9942a-2026");
  const [qualityModalOpen, setQualityModalOpen] = useState(false);
  const [highlightedClause, setHighlightedClause] = useState<string | undefined>("CL-12.2");

  // Sync theme class on <html> and <body> elements
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-bgBase text-textPrimary overflow-hidden font-sans transition-colors duration-200">
      {/* Top Utility Bar */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateHome={() => setView("landing")}
        latencyMs={38}
        onOpenQualityModal={() => setQualityModalOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar (shown in ingestion & audit views) */}
        {view !== "landing" && (
          <Sidebar
            onIngestClick={() => setView("ingestion")}
            activeDocId={activeDocId}
            onSelectDoc={(id) => {
              setActiveDocId(id);
              setView("audit");
            }}
          />
        )}

        {/* Central Workspace Canvas */}
        <main className="flex-1 overflow-y-auto bg-bgBase">
          {view === "landing" ? (
            <LandingHero onStartAudit={() => setView("ingestion")} />
          ) : view === "ingestion" ? (
            <Dropzone onStartAudit={() => setView("audit")} />
          ) : (
            <div className="h-[calc(100vh-3rem)] p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
              {/* Left Pane: PDF Document Inspector (7 cols) */}
              <div className="lg:col-span-7 h-full">
                <DocumentViewer
                  fileName="MSA_Vendor_Acme_2026.pdf"
                  currentPage={14}
                  totalPages={18}
                  highlightedClauseId={highlightedClause}
                />
              </div>

              {/* Right Pane: Compliance Findings & Redline Studio (5 cols) */}
              <div className="lg:col-span-5 h-full overflow-y-auto space-y-4 pr-1">
                {/* Executive Risk Score Overview Block */}
                <RiskHeader
                  score={0.82}
                  status="FLAGGED_HIGH_RISK"
                  executiveSummary="The submitted contract contains critical liability exposure in Section 12.2. Third-party IP indemnification obligations are uncapped, violating corporate risk policies. Data retention timelines in Section 8.1 conflict with standard 7-year retention schedules."
                />

                {/* Flagged Clauses Section Header */}
                <div className="flex items-center justify-between font-mono text-xs text-textMuted border-b border-borderSubtle pb-2 pt-2">
                  <span className="uppercase tracking-wider">
                    FLAGGED CLAUSES ({sampleClauses.length} POLICY ISSUES)
                  </span>
                  <span className="text-[10px] bg-bgSurface px-2 py-0.5 border border-borderSubtle">
                    STRICT COMPLIANCE
                  </span>
                </div>

                {/* Clause Accordion Cards */}
                <div className="space-y-3">
                  {sampleClauses.map((clause) => (
                    <ClauseCard
                      key={clause.clause_id}
                      clause={clause}
                      onSelectClause={(id) => setHighlightedClause(id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quality Gate Diagnostic Modal */}
      <QualityModal
        isOpen={qualityModalOpen}
        onClose={() => setQualityModalOpen(false)}
      />
    </div>
  );
};
