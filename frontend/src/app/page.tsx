"use client";

import React from "react";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingMetrics } from "@/components/landing/LandingMetrics";
import { LandingPillars } from "@/components/landing/LandingPillars";

export default function LandingPage() {
  const handleReviewRoiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("impact-metrics");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto snap-y snap-mandatory select-none overscroll-y-contain scroll-smooth">
      {/* SECTION 1: Full Viewport Landing Hero */}
      <section className="h-[calc(100vh-3rem)] snap-start snap-always flex flex-col justify-center items-center px-6 sm:px-10 max-w-7xl mx-auto">
        <LandingHero onReviewRoiClick={handleReviewRoiClick} />
      </section>

      {/* SECTION 2: Full Viewport ROI Review & Pillars */}
      <section
        id="impact-metrics"
        className="h-[calc(100vh-3rem)] snap-start snap-always flex flex-col justify-between items-center px-6 sm:px-10 max-w-7xl mx-auto py-8 border-t border-borderSubtle"
      >
        <LandingMetrics />
        <LandingPillars />
      </section>
    </div>
  );
}
