"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Zap, DollarSign, Database, GitBranch, CheckCircle2, Lock } from "lucide-react";

interface LandingHeroProps {
  onStartAudit: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartAudit }) => {
  const scrollToRoi = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("impact-metrics");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 select-none">
      {/* Above-The-Fold Hero Banner (Full Screen Viewport Height) */}
      <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center space-y-8 max-w-5xl mx-auto py-12">
        <div className="inline-flex items-center space-x-2 bg-bgSurface border border-borderAccent px-4 py-2 font-mono text-xs sm:text-sm text-textPrimary uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-accentRiskHigh" />
          <span>PRODUCTION SPECIFICATION V1.0.0 // ENTERPRISE GRADE</span>
        </div>

        {/* Major Headline - Playfair Display Typography */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-textPrimary leading-[1.1]">
          Enterprise Multi-Agent Legal Audit Engine
        </h1>

        {/* Subtitle / Description */}
        <p className="font-sans text-xl sm:text-2xl text-textMuted leading-relaxed max-w-4xl mx-auto font-normal">
          Automate complex contract audits, evaluate policy compliance, and compute deterministic risk metrics within seconds using Parent-Child vector retrieval and LangGraph multi-agent state machines.
        </p>

        {/* Primary CTA Action Area */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <button
            onClick={onStartAudit}
            className="w-full sm:w-auto flex items-center justify-center space-x-4 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-white font-mono text-base uppercase tracking-wider py-4 px-10 transition-all cursor-pointer shadow-lg hover:shadow-xl group"
          >
            <span className="font-bold">[ INITIATE COMPLIANCE AUDIT WORKSPACE ]</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToRoi}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-bgSurface hover:bg-bgSurfaceActive border border-borderSubtle text-textPrimary font-mono text-sm uppercase tracking-wider py-4.5 px-8 transition-colors cursor-pointer"
          >
            <span>REVIEW ROI & METRICS</span>
          </button>
        </div>
      </div>

      {/* Below-The-Fold ROI & Architectural Metrics Section */}
      <div className="space-y-24 pt-16 pb-24 border-t border-borderSubtle">
        {/* Quantifiable Impact Grid (Section 1.3 - JPMC/Deloitte Style High Impact Cards) */}
        <div id="impact-metrics" className="space-y-8 scroll-mt-20">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-textPrimary uppercase tracking-wide">
              BUSINESS IMPACT & QUANTIFIABLE ROI
            </h2>
            <p className="font-mono text-xs sm:text-sm text-textMuted uppercase tracking-widest">
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
              <div className="font-mono text-xs sm:text-sm text-textMuted pt-2 border-t border-borderSubtle">
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
              <div className="font-mono text-xs sm:text-sm text-textMuted pt-2 border-t border-borderSubtle">
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
              <div className="font-mono text-xs sm:text-sm text-textMuted pt-2 border-t border-borderSubtle">
                Deterministic Traceability <span className="text-textPrimary font-bold ml-1">(Zero Hallucination)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Architectural Pillars */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-textPrimary uppercase tracking-wide">
              TECHNICAL ARCHITECTURE & QUALITY GATES
            </h2>
            <p className="font-mono text-xs sm:text-sm text-textMuted uppercase tracking-widest">
              Containerized Engine • Podman Rootless Architecture • Ragas CI/CD Assertions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bgSurface border border-borderSubtle p-8 space-y-4">
              <div className="w-12 h-12 bg-bgBase border border-borderSubtle flex items-center justify-center text-textPrimary">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-textPrimary">
                1. Parent-Child Vector RAG
              </h3>
              <p className="font-sans text-sm text-textMuted leading-relaxed">
                Splits unstructured native PDF contracts into 400-character child search vectors linked to 2,000-character parent context blocks inside Qdrant for complete legal clause preservation.
              </p>
            </div>

            <div className="bg-bgSurface border border-borderSubtle p-8 space-y-4">
              <div className="w-12 h-12 bg-bgBase border border-borderSubtle flex items-center justify-center text-textPrimary">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-textPrimary">
                2. LangGraph Multi-Agent Engine
              </h3>
              <p className="font-sans text-sm text-textMuted leading-relaxed">
                Orchestrates specialized Retrieval Router, Clause Auditor Agent, and Grounding Evaluator nodes to detect uncapped liability, GDPR violations, and generate automated redlines.
              </p>
            </div>

            <div className="bg-bgSurface border border-borderSubtle p-8 space-y-4">
              <div className="w-12 h-12 bg-bgBase border border-borderSubtle flex items-center justify-center text-textPrimary">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-textPrimary">
                3. Ragas CI/CD Quality Gate
              </h3>
              <p className="font-sans text-sm text-textMuted leading-relaxed">
                Continuous Pytest assertions enforcing strict quality thresholds: Ragas Faithfulness (&ge; 0.85), Answer Relevance (&ge; 0.80), and Qdrant Lookup Latency (&le; 50ms).
              </p>
            </div>
          </div>
        </div>

        {/* Clean Small Bottom CTA */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={onStartAudit}
            className="inline-flex items-center space-x-3 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-white font-mono text-xs uppercase tracking-wider py-3.5 px-6 transition-all cursor-pointer shadow-md group"
          >
            <span>LET'S GET STARTED</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
