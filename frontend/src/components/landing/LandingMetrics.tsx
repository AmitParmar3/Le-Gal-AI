"use client";

import React from "react";
import { Zap, DollarSign, CheckCircle2 } from "lucide-react";

export const LandingMetrics: React.FC = () => {
  return (
    <div id="impact-metrics" className="space-y-8 scroll-mt-20">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-textPrimary uppercase tracking-wide">
          BUSINESS IMPACT & QUANTIFIABLE ROI
        </h2>
        <p className="font-mono text-xs sm:text-sm text-textMuted uppercase tracking-widest font-semibold">
          Benchmarked Against Manual Legal Review Workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-bgSurface border border-borderSubtle p-8 space-y-3 relative overflow-hidden transition-all hover:border-borderAccent">
          <div className="flex items-center justify-between text-textMuted">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold">
              AUDIT LATENCY REDUCTION
            </span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="font-serif text-4xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            15–30 Sec
          </div>
          <div className="font-sans text-sm sm:text-base text-textMuted pt-2 border-t border-borderSubtle font-medium">
            Manual Review: 4–8 Hours <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">(~99% Faster)</span>
          </div>
        </div>

        <div className="bg-bgSurface border border-borderSubtle p-8 space-y-3 relative overflow-hidden transition-all hover:border-borderAccent">
          <div className="flex items-center justify-between text-textMuted">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold">
              COST PER DOCUMENT AUDIT
            </span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="font-serif text-4xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            ~$0.50 <span className="text-xl text-textMuted font-mono font-normal">/ file</span>
          </div>
          <div className="font-sans text-sm sm:text-base text-textMuted pt-2 border-t border-borderSubtle font-medium">
            Legal Counsel: $300–$600 <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">(99.8% Cost Savings)</span>
          </div>
        </div>

        <div className="bg-bgSurface border border-borderSubtle p-8 space-y-3 relative overflow-hidden transition-all hover:border-borderAccent">
          <div className="flex items-center justify-between text-textMuted">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold">
              RULE REASONING CONSISTENCY
            </span>
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="font-serif text-4xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            100%
          </div>
          <div className="font-sans text-sm sm:text-base text-textMuted pt-2 border-t border-borderSubtle font-medium">
            Deterministic Traceability <span className="text-textPrimary font-bold ml-1">(Zero Hallucination)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
