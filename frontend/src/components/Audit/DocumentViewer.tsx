"use client";

import React from "react";
import { FileText, Eye } from "lucide-react";

interface DocumentViewerProps {
  fileName?: string;
  currentPage?: number;
  totalPages?: number;
  highlightedClauseId?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileName = "sample_contract.pdf",
  currentPage = 14,
  totalPages = 18,
  highlightedClauseId,
}) => {
  return (
    <div className="border border-borderSubtle bg-bgSurface h-full flex flex-col justify-between select-none">
      {/* Top Toolbar */}
      <div className="h-10 bg-bgBase border-b border-borderSubtle px-4 flex items-center justify-between text-xs font-mono text-textMuted">
        <div className="flex items-center space-x-2">
          <FileText className="w-3.5 h-3.5" />
          <span className="text-textPrimary font-medium">{fileName}</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>PAGE {currentPage} OF {totalPages}</span>
          <div className="flex items-center space-x-1 text-emerald-400">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* PDF Document Viewer Canvas */}
      <div className="p-6 overflow-y-auto space-y-6 font-serif text-sm leading-relaxed text-textPrimary h-[calc(100vh-12rem)]">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-borderSubtle pb-2 mb-4">
            SECTION 12. LIMITATION OF LIABILITY & INDEMNIFICATION
          </h2>
          <p className="text-textMuted mb-4">
            12.1 General Liability Cap. Except for breaches of confidentiality under Section 9 or indemnification obligations specified in Section 12.2 below, neither party’s aggregate cumulative liability arising out of or related to this Agreement shall exceed the total fees paid or payable by Customer to Vendor under the applicable Statement of Work in the twelve (12) months preceding the claim.
          </p>

          {/* High Risk Highlighted Block (Section 12.2) */}
          <div className="bg-[#581825]/40 border-l-4 border-l-accentRiskHigh p-4 my-4 space-y-1">
            <div className="font-mono text-[10px] text-red-300 font-bold uppercase tracking-wider">
              FLAGGED HIGH RISK [CL-12.2]
            </div>
            <p className="font-serif text-textPrimary text-base font-medium">
              12.2 Third-Party Indemnification. Vendor agrees to defend, indemnify, and hold harmless Customer, its affiliates, and their respective officers, directors, and employees without limitation against any and all third-party IP claims, liabilities, losses, damages, and costs arising out of performance of the Services. This indemnification obligation is uncapped and unlimited in duration and scope.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-borderSubtle pb-2 mb-4">
            SECTION 8. DATA PRIVACY & GOVERNANCE
          </h2>

          {/* Medium Risk Highlighted Block (Section 8.1) */}
          <div className="bg-[#4A3525]/40 border-l-4 border-l-borderAccent p-4 my-4 space-y-1">
            <div className="font-mono text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              FLAGGED MEDIUM RISK [CL-8.1]
            </div>
            <p className="font-serif text-textPrimary text-base font-medium">
              8.1 Customer Data Retention. Customer data shall be retained, archived, and backed up by Vendor for a period of ten (10) years following contract termination. Customer agrees that data purging requests prior to the ten-year retention window shall be subject to administrative processing fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

