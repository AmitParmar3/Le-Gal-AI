"use client";

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface RiskHeaderProps {
  score: number;
  status: string;
  executiveSummary: string;
}

export const RiskHeader: React.FC<RiskHeaderProps> = ({
  score = 0.82,
  status = "FLAGGED_HIGH_RISK",
  executiveSummary,
}) => {
  const isHighRisk = score >= 0.7;
  const isMediumRisk = score >= 0.3 && score < 0.7;

  return (
    <div className="border border-borderSubtle bg-bgBase p-5 space-y-4 shadow-sm select-none">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider font-bold">
            EXECUTIVE RISK ASSESSMENT OVERVIEW
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-4xl font-bold text-textPrimary">
              {score.toFixed(2)}
            </span>
            <span className="font-mono text-xs text-textMuted font-bold">/ 1.00</span>
          </div>
        </div>

        {/* Severity Badge */}
        <div>
          {isHighRisk ? (
            <div className="flex items-center space-x-2 bg-accentRiskHigh border border-borderAccent text-white font-mono text-xs uppercase px-3 py-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-red-200" />
              <span>FLAGGED: HIGH RISK EXPOSURE</span>
            </div>
          ) : isMediumRisk ? (
            <div className="flex items-center space-x-2 bg-amber-950 border border-borderAccent text-amber-200 font-mono text-xs uppercase px-3 py-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>FLAGGED: MEDIUM RISK EXPOSURE</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-950 border border-emerald-800 text-emerald-200 font-mono text-xs uppercase px-3 py-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>COMPLIANCE AUDIT PASSED</span>
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary Paragraph */}
      <div className="border-t border-borderSubtle pt-3">
        <p className="font-serif text-sm text-textPrimary leading-relaxed font-medium">
          {executiveSummary ||
            "The submitted contract contains critical liability exposure in Section 12.2. Third-party IP indemnification obligations are uncapped, violating corporate risk policies."}
        </p>
      </div>
    </div>
  );
};

