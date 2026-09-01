"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/constants/theme";

interface LandingHeroProps {
  onReviewRoiClick: (e: React.MouseEvent) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onReviewRoiClick }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-8 max-w-5xl mx-auto py-10 px-6 select-none">
      {/* Specification Badge */}
      <div className="inline-flex items-center space-x-2 bg-bgSurface border border-borderAccent px-4 py-2 font-mono text-xs sm:text-sm text-textPrimary uppercase tracking-widest shadow-sm">
        <ShieldCheck className="w-4 h-4 text-accentRiskHigh" />
        <span className="font-semibold">SPECIFICATION {BRAND_CONFIG.specVersion} // ENTERPRISE GRADE</span>
      </div>

      {/* Major Headline - JPMC Baskerville Serif Typography */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-textPrimary leading-[1.15]">
        {BRAND_CONFIG.tagline}
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-xl sm:text-2xl text-textMuted leading-relaxed max-w-4xl mx-auto font-medium">
        Automate complex contract audits, evaluate policy compliance, and compute deterministic risk metrics within seconds using Parent-Child vector retrieval and LangGraph multi-agent state machines.
      </p>

      {/* Centered Vertical Stack CTA Action Area */}
      <div className="pt-6 flex flex-col items-center justify-center space-y-4 w-full max-w-2xl mx-auto">
        {/* Primary CTA Button (Single Line, Elongated, Unwrapped) */}
        <Link
          href="/workspace"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-4 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-white font-mono text-base uppercase tracking-wider py-4 px-10 whitespace-nowrap transition-all shadow-lg hover:shadow-xl group"
        >
          <span className="font-bold whitespace-nowrap">[ INITIATE COMPLIANCE AUDIT WORKSPACE ]</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Link>

        {/* Secondary CTA Button (Centered directly below) */}
        <button
          onClick={onReviewRoiClick}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-bgSurface hover:bg-bgSurfaceActive border border-borderSubtle text-textPrimary font-mono text-sm uppercase tracking-wider py-3.5 px-10 whitespace-nowrap transition-colors cursor-pointer font-semibold shadow-sm"
        >
          <span>REVIEW ROI & METRICS</span>
        </button>
      </div>
    </div>
  );
};
