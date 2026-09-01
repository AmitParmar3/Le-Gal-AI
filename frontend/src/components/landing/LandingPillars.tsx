"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Database, GitBranch, Lock } from "lucide-react";

export const LandingPillars: React.FC = () => {
  return (
    <div className="space-y-10 border-t border-borderSubtle pt-10">
      <div className="text-center space-y-3">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-textPrimary uppercase tracking-wide">
          TECHNICAL ARCHITECTURE & QUALITY GATES
        </h2>
        <p className="font-mono text-xs sm:text-sm text-textMuted uppercase tracking-widest font-semibold">
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
          <p className="font-sans text-sm sm:text-base text-textMuted leading-relaxed font-medium">
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
          <p className="font-sans text-sm sm:text-base text-textMuted leading-relaxed font-medium">
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
          <p className="font-sans text-sm sm:text-base text-textMuted leading-relaxed font-medium">
            Continuous Pytest assertions enforcing strict quality thresholds: Ragas Faithfulness (&ge; 0.85), Answer Relevance (&ge; 0.80), and Qdrant Lookup Latency (&le; 50ms).
          </p>
        </div>
      </div>

      {/* Clean Small Bottom CTA */}
      <div className="pt-8 flex justify-center">
        <Link
          href="/workspace"
          className="inline-flex items-center space-x-3 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-white font-mono text-xs uppercase tracking-wider py-3.5 px-6 transition-all cursor-pointer shadow-md group"
        >
          <span>LET'S GET STARTED</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
