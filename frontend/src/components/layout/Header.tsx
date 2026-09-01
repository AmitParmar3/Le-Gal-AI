"use client";

import React from "react";
import Link from "next/link";
import { Sun, Moon, Home, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/constants/theme";

interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  latencyMs?: number;
  onOpenQualityModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  latencyMs = 38,
  onOpenQualityModal,
}) => {
  return (
    <header className="h-12 border-b border-borderSubtle bg-bgSurface flex items-center justify-between px-4 select-none transition-colors">
      {/* Left Brand Anchor */}
      <div className="flex items-center space-x-3">
        <Link
          href="/"
          className="flex items-center space-x-2 text-left font-mono text-xs tracking-[0.15em] font-semibold text-textPrimary uppercase hover:text-textMuted transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-textMuted" />
          <span>{BRAND_CONFIG.name} // LEGAL AUDIT ENGINE</span>
        </Link>
      </div>

      {/* Center Environment & Security Badge */}
      <div className="hidden md:flex items-center">
        <span className="flex items-center space-x-1.5 bg-accentRiskHigh text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 border border-borderAccent">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{BRAND_CONFIG.containerStatus}</span>
        </span>
      </div>

      {/* Right Controls & Theme Switcher */}
      <div className="flex items-center space-x-4 text-xs font-mono">
        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="flex items-center space-x-2 bg-bgBase hover:bg-bgSurfaceActive text-textPrimary border border-borderSubtle px-3 py-1 uppercase tracking-wider transition-colors cursor-pointer font-medium"
          title="Toggle Light / Dark Mode"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>LIGHT MODE</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>DARK MODE</span>
            </>
          )}
        </button>

        {/* Quality Gates Modal Trigger */}
        <button
          onClick={onOpenQualityModal}
          className="text-textMuted hover:text-textPrimary transition-colors uppercase tracking-wide cursor-pointer hidden sm:inline-block font-medium"
        >
          GATES: <span className="text-textPrimary font-semibold">PASSED</span>
        </button>

        {/* Latency Metric */}
        <div className="flex items-center space-x-2 bg-bgBase px-2.5 py-1 border border-borderSubtle">
          <span className="w-2 h-2 rounded-none bg-emerald-500 inline-block animate-pulse"></span>
          <span className="text-textMuted text-[11px] uppercase">
            QDRANT: <span className="text-textPrimary font-semibold">{latencyMs}ms</span>
          </span>
        </div>
      </div>
    </header>
  );
};
