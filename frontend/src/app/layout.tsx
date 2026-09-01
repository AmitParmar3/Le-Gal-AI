"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { QualityModal } from "@/components/audit/QualityModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [qualityModalOpen, setQualityModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.classList.remove("light");
      body.classList.remove("light");
    } else {
      root.classList.add("light");
      body.classList.add("light");
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <html lang="en" className="light">
      <head>
        <title>LE GALS // Enterprise Legal Audit Engine</title>
        <meta
          name="description"
          content="Automated compliance audit engine evaluating complex legal contracts and risk metrics"
        />
      </head>
      <body className="bg-bgBase text-textPrimary antialiased min-h-screen flex flex-col font-sans transition-colors duration-200">
        {/* Global Utility Header */}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenQualityModal={() => setQualityModalOpen(true)}
        />

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-x-hidden">{children}</div>

        {/* RAG Diagnostics & Quality Gate Modal */}
        <QualityModal
          isOpen={qualityModalOpen}
          onClose={() => setQualityModalOpen(false)}
        />
      </body>
    </html>
  );
}

