"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Eye, Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

interface DocumentViewerProps {
  fileName?: string;
  currentPage?: number;
  totalPages?: number;
  highlightedClauseId?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileName = "MSA_Vendor_Acme_2026.pdf",
  currentPage = 14,
  totalPages = 18,
  highlightedClauseId = "CL-12.2",
  isExpanded = false,
  onToggleExpand,
}) => {
  const [activePage, setActivePage] = useState(currentPage);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page5Ref = useRef<HTMLDivElement>(null);
  const page8Ref = useRef<HTMLDivElement>(null);
  const page14Ref = useRef<HTMLDivElement>(null);
  const page18Ref = useRef<HTMLDivElement>(null);

  const clause12Ref = useRef<HTMLDivElement>(null);
  const clause8Ref = useRef<HTMLDivElement>(null);
  const clause5Ref = useRef<HTMLDivElement>(null);

  const scrollToElement = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (targetRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const target = targetRef.current;
      const targetTop = target.offsetTop - container.offsetTop - 15;

      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (highlightedClauseId === "CL-12.2") {
      setActivePage(14);
      scrollToElement(clause12Ref);
    } else if (highlightedClauseId === "CL-8.1") {
      setActivePage(9);
      scrollToElement(clause8Ref);
    } else if (highlightedClauseId === "CL-5.3") {
      setActivePage(5);
      scrollToElement(clause5Ref);
    }
  }, [highlightedClauseId]);

  const handlePageJump = (page: number) => {
    setActivePage(page);
    if (page === 1) scrollToElement(page1Ref);
    else if (page <= 5) scrollToElement(page5Ref);
    else if (page <= 9) scrollToElement(page8Ref);
    else if (page <= 15) scrollToElement(page14Ref);
    else scrollToElement(page18Ref);
  };

  return (
    <div className="border border-borderSubtle bg-bgSurface h-[calc(100vh-5rem)] flex flex-col justify-between select-none shadow-sm overflow-hidden">
      {/* Top PDF Toolbar */}
      <div className="h-11 bg-bgBase border-b border-borderSubtle px-4 flex items-center justify-between text-xs font-mono text-textMuted flex-shrink-0">
        <div className="flex items-center space-x-3">
          <FileText className="w-4 h-4 text-textMuted" />
          <span className="text-textPrimary font-bold text-sm">{fileName}</span>
        </div>

        {/* Page Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-bgSurface px-2 py-1 border border-borderSubtle">
            <button
              onClick={() => handlePageJump(Math.max(1, activePage - 1))}
              className="text-textMuted hover:text-textPrimary cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-textPrimary">
              PAGE {activePage} OF {totalPages}
            </span>
            <button
              onClick={() => handlePageJump(Math.min(totalPages, activePage + 1))}
              className="text-textMuted hover:text-textPrimary cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold hidden sm:flex">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">SYNCHRONIZED</span>
          </div>

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="flex items-center space-x-1 bg-bgSurface hover:bg-bgSurfaceActive text-textPrimary border border-borderSubtle px-2.5 py-1 uppercase text-[11px] font-bold transition-colors cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-textMuted" />
                  <span>[ SPLIT VIEW ]</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-textMuted" />
                  <span>[ EXPAND VIEW ]</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* PDF Scrollable Multi-Page Document Canvas (STRICT ASCENDING ORDER: 1 -> 5 -> 9 -> 14 -> 18) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-8 overflow-y-auto space-y-12 font-serif text-base leading-relaxed text-textPrimary scroll-smooth"
        style={{ maxHeight: "calc(100vh - 8rem)" }}
      >
        {/* PAGE 1 */}
        <div ref={page1Ref} className="space-y-4 border-b border-borderSubtle pb-10">
          <div className="flex justify-between items-center text-xs font-mono text-textMuted border-b border-borderSubtle pb-2 font-bold">
            <span>MASTER SERVICES AGREEMENT // REF: MSA-2026-LEG-9942</span>
            <span>PAGE 1 OF {totalPages}</span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wide text-center py-4 text-textPrimary">
            MASTER SERVICES AGREEMENT
          </h1>
          <p className="text-textMuted leading-relaxed font-medium">
            This Master Services Agreement ("Agreement") is entered into as of the Effective Date by and between Customer Inc., a Delaware corporation, and Vendor Operations LLC, a Delaware limited liability company.
          </p>
          <h3 className="font-bold text-lg pt-2 text-textPrimary">SECTION 1. DEFINITIONS & INTERPRETATION</h3>
          <p className="text-textMuted leading-relaxed font-medium">
            1.1 "Affiliate" means any entity that directly or indirectly controls, is controlled by, or is under common control with a Party. "Deliverables" means all work product, software code, legal audit reports, and documentation specified under applicable Statements of Work.
          </p>
        </div>

        {/* PAGE 5 */}
        <div ref={page5Ref} className="space-y-4 border-b border-borderSubtle pb-10">
          <div className="flex justify-between items-center text-xs font-mono text-textMuted border-b border-borderSubtle pb-2 font-bold">
            <span>MASTER SERVICES AGREEMENT // REF: MSA-2026-LEG-9942</span>
            <span>PAGE 5 OF {totalPages}</span>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-textPrimary">
            SECTION 5. TERMINATION & DEFAULT
          </h2>
          <p className="text-textMuted leading-relaxed font-medium">
            5.1 Term. This Agreement shall commence on the Effective Date and continue for an initial term of three (3) years unless terminated earlier in accordance with Section 5.2 or Section 5.3.
          </p>
          <p className="text-textMuted leading-relaxed font-medium">
            5.2 Termination for Cause. Either party may terminate this Agreement upon thirty (30) days written notice if the other party breaches any material term.
          </p>

          {/* Medium Risk Highlighted Block (Section 5.3) */}
          <div
            ref={clause5Ref}
            className={`p-5 my-4 space-y-2 transition-all duration-300 ${
              highlightedClauseId === "CL-5.3"
                ? "bg-amber-500/35 border-l-4 border-l-amber-600 shadow-md ring-2 ring-amber-600"
                : "bg-amber-500/10 border-l-4 border-l-amber-600"
            }`}
          >
            <div className="font-mono text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
              FLAGGED MEDIUM RISK [CL-5.3]
            </div>
            <p className="font-serif text-textPrimary text-base font-semibold leading-relaxed">
              5.3 Early Termination Penalty. In the event of early termination by Customer for convenience, Customer shall pay an immediate early termination penalty equal to 100% of all remaining unpaid contract value without cure period.
            </p>
          </div>
        </div>

        {/* PAGE 9 */}
        <div ref={page8Ref} className="space-y-4 border-b border-borderSubtle pb-10">
          <div className="flex justify-between items-center text-xs font-mono text-textMuted border-b border-borderSubtle pb-2 font-bold">
            <span>MASTER SERVICES AGREEMENT // REF: MSA-2026-LEG-9942</span>
            <span>PAGE 9 OF {totalPages}</span>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-textPrimary">
            SECTION 8. DATA PRIVACY & GOVERNANCE
          </h2>
          <p className="text-textMuted leading-relaxed font-medium">
            8.0 Compliance with Applicable Data Protection Laws. Vendor agrees to maintain administrative, physical, and technical safeguards designed to protect Customer Personal Data against unauthorized access, destruction, or disclosure.
          </p>

          {/* Medium Risk Highlighted Block (Section 8.1) */}
          <div
            ref={clause8Ref}
            className={`p-5 my-4 space-y-2 transition-all duration-300 ${
              highlightedClauseId === "CL-8.1"
                ? "bg-amber-500/35 border-l-4 border-l-amber-600 shadow-md ring-2 ring-amber-600"
                : "bg-amber-500/10 border-l-4 border-l-amber-600"
            }`}
          >
            <div className="font-mono text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
              FLAGGED MEDIUM RISK [CL-8.1]
            </div>
            <p className="font-serif text-textPrimary text-base font-semibold leading-relaxed">
              8.1 Customer Data Retention. Customer data shall be retained, archived, and backed up by Vendor for a period of ten (10) years following contract termination. Customer agrees that data purging requests prior to the ten-year retention window shall be subject to administrative processing fees.
            </p>
          </div>
        </div>

        {/* PAGE 14 */}
        <div ref={page14Ref} className="space-y-4 border-b border-borderSubtle pb-10">
          <div className="flex justify-between items-center text-xs font-mono text-textMuted border-b border-borderSubtle pb-2 font-bold">
            <span>MASTER SERVICES AGREEMENT // REF: MSA-2026-LEG-9942</span>
            <span>PAGE 14 OF {totalPages}</span>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-textPrimary">
            SECTION 12. LIMITATION OF LIABILITY & INDEMNIFICATION
          </h2>
          <p className="text-textMuted leading-relaxed font-medium">
            12.1 General Liability Cap. Except for breaches of confidentiality under Section 9 or indemnification obligations specified in Section 12.2 below, neither party’s aggregate cumulative liability arising out of or related to this Agreement shall exceed the total fees paid or payable by Customer to Vendor under the applicable Statement of Work in the twelve (12) months preceding the claim.
          </p>

          {/* High Risk Highlighted Block (Section 12.2) */}
          <div
            ref={clause12Ref}
            className={`p-5 my-4 space-y-2 transition-all duration-300 ${
              highlightedClauseId === "CL-12.2"
                ? "bg-accentRiskHigh/30 border-l-4 border-l-accentRiskHigh shadow-md ring-2 ring-accentRiskHigh"
                : "bg-accentRiskHigh/10 border-l-4 border-l-accentRiskHigh"
            }`}
          >
            <div className="font-mono text-xs text-red-700 dark:text-red-300 font-bold uppercase tracking-wider">
              FLAGGED HIGH RISK [CL-12.2]
            </div>
            <p className="font-serif text-textPrimary text-base font-semibold leading-relaxed">
              12.2 Third-Party Indemnification. Vendor agrees to defend, indemnify, and hold harmless Customer, its affiliates, and their respective officers, directors, and employees without limitation against any and all third-party IP claims, liabilities, losses, damages, and costs arising out of performance of the Services. This indemnification obligation is uncapped and unlimited in duration and scope.
            </p>
          </div>
        </div>

        {/* PAGE 18 */}
        <div ref={page18Ref} className="space-y-4 pt-2">
          <div className="flex justify-between items-center text-xs font-mono text-textMuted border-b border-borderSubtle pb-2 font-bold">
            <span>MASTER SERVICES AGREEMENT // REF: MSA-2026-LEG-9942</span>
            <span>PAGE 18 OF {totalPages}</span>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-textPrimary">
            SECTION 18. GOVERNING LAW & EXECUTION
          </h2>
          <p className="text-textMuted leading-relaxed font-medium">
            18.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware without giving effect to any choice of law principles.
          </p>
          <p className="text-textMuted leading-relaxed font-medium">
            IN WITNESS WHEREOF, the parties hereto have executed this Master Services Agreement by their duly authorized representatives.
          </p>
        </div>
      </div>
    </div>
  );
};
