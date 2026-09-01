"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Clause } from "@/types";

interface ClauseCardProps {
  clause: Clause;
  onSelectClause?: (clauseId: string) => void;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({
  clause,
  onSelectClause,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(clause.recommended_redline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-borderSubtle bg-bgSurface mb-4 select-none shadow-sm">
      {/* Header Bar */}
      <div
        onClick={() => {
          setExpanded(!expanded);
          if (onSelectClause) onSelectClause(clause.clause_id);
        }}
        className="p-3 bg-bgSurface hover:bg-bgSurfaceActive flex items-center justify-between border-b border-borderSubtle cursor-pointer transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="font-mono text-[11px] text-textMuted bg-bgBase px-2 py-0.5 border border-borderSubtle font-semibold">
            {clause.clause_id}
          </span>

          <span
            className={`font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold ${
              clause.severity === "HIGH"
                ? "bg-accentRiskHigh text-white border border-borderAccent"
                : clause.severity === "MEDIUM"
                ? "bg-amber-950 text-amber-200 border border-amber-800"
                : "bg-bgBase text-textMuted border border-borderSubtle"
            }`}
          >
            {clause.severity}
          </span>

          <span className="font-serif text-sm font-bold text-textPrimary">
            {clause.category}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-[11px] text-textMuted font-medium">
            PAGE {clause.page_number}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-textMuted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-textMuted" />
          )}
        </div>
      </div>

      {/* Expanded Body */}
      {expanded && (
        <div className="p-4 space-y-4 bg-bgSurface">
          {/* Policy Violation */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider font-semibold">
              POLICY VIOLATION
            </div>
            <div className="font-mono text-xs text-red-600 dark:text-red-300 bg-bgBase p-2.5 border border-borderSubtle font-medium">
              {clause.policy_violation}
            </div>
          </div>

          {/* Original Text Excerpt */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider font-semibold">
              FLAGGED CLAUSE EXCERPT
            </div>
            <div className="font-serif text-xs sm:text-sm text-textMuted bg-bgBase p-3 border border-borderSubtle italic leading-relaxed font-medium">
              "{clause.exact_text}"
            </div>
          </div>

          {/* Redline Diff Proposal Box */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider font-semibold">
              PROPOSED REDLINE AMENDMENT
            </div>
            <div className="font-mono text-xs bg-bgBase p-3 border border-borderAccent leading-relaxed space-y-2">
              <div className="line-through text-[#8B263E] dark:text-red-400 block font-medium">
                [DELETED]: Vendor agrees to defend, indemnify, and hold harmless Customer without limitation...
              </div>
              <div className="text-textPrimary font-semibold block">
                [PROPOSED]: {clause.recommended_redline}
              </div>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 font-mono text-[11px] uppercase tracking-wider text-textPrimary bg-bgBase hover:bg-borderSubtle border border-borderAccent py-2 px-3 transition-colors cursor-pointer font-semibold"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-textMuted" />
              )}
              <span>{copied ? "COPIED" : "[ COPY REDLINE ]"}</span>
            </button>

            <button
              onClick={() => setAccepted(!accepted)}
              className={`flex items-center space-x-1.5 font-mono text-[11px] uppercase tracking-wider py-2 px-3 transition-colors cursor-pointer border border-borderSubtle font-semibold ${
                accepted
                  ? "bg-emerald-950 text-emerald-200 border-emerald-800"
                  : "bg-accentPurple hover:bg-purple-950 text-white"
              }`}
            >
              <span>{accepted ? "PROPOSAL ACCEPTED" : "[ ACCEPT PROPOSAL ]"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

