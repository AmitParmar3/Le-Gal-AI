"use client";

import React from "react";
import { Plus, FileText, ChevronDown, ShieldAlert } from "lucide-react";

interface AuditHistoryItem {
  id: str;
  fileName: str;
  timestamp: str;
  riskScore: number;
  active?: boolean;
}

interface SidebarProps {
  onIngestClick: () => void;
  activeDocId?: str;
  onSelectDoc: (id: str) => void;
}

const mockHistory: AuditHistoryItem[] = [
  {
    id: "legals-audit-9942a-2026",
    fileName: "MSA_Vendor_Acme_2026.pdf",
    timestamp: "Aug 31, 2026 - 14:02",
    riskScore: 0.82,
    active: true,
  },
  {
    id: "legals-audit-8812b-2026",
    fileName: "SOW_Cloud_Migration_v4.pdf",
    timestamp: "Aug 29, 2026 - 09:45",
    riskScore: 0.35,
    active: false,
  },
  {
    id: "legals-audit-7711c-2026",
    fileName: "NDA_Mutual_Enterprise.pdf",
    timestamp: "Aug 25, 2026 - 11:15",
    riskScore: 0.12,
    active: false,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  onIngestClick,
  activeDocId = "legals-audit-9942a-2026",
  onSelectDoc,
}) => {
  return (
    <aside className="w-64 border-r border-borderSubtle bg-bgSurface flex flex-col justify-between h-[calc(100vh-3rem)] select-none">
      {/* Upper Navigation Block */}
      <div className="p-4 space-y-6">
        {/* Primary Action Button */}
        <button
          onClick={onIngestClick}
          className="w-full flex items-center justify-center space-x-2 bg-[#2A2724] hover:bg-borderAccent text-textPrimary border border-borderAccent py-2.5 px-3 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-textMuted" />
          <span>[+ INGEST NEW CONTRACT]</span>
        </button>

        {/* Audit History List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-textMuted uppercase tracking-wider px-1">
            <span>RECENT AUDITS</span>
            <span>{mockHistory.length} FILES</span>
          </div>

          <div className="space-y-1">
            {mockHistory.map((item) => {
              const isActive = item.id === activeDocId;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectDoc(item.id)}
                  className={`p-3 border cursor-pointer transition-all ${
                    isActive
                      ? "border-l-2 border-l-accentPurple border-borderSubtle bg-bgSurfaceActive"
                      : "border-transparent hover:bg-bgSurfaceActive hover:border-borderSubtle"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-textMuted flex-shrink-0" />
                      <span className="font-serif text-xs font-medium text-textPrimary truncate">
                        {item.fileName}
                      </span>
                    </div>
                    {item.riskScore >= 0.7 && (
                      <span className="font-mono text-[10px] bg-accentRiskHigh text-textPrimary px-1 py-0.5 ml-1 flex-shrink-0">
                        {item.riskScore.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-textMuted pl-5">
                    {item.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Policy Selector */}
      <div className="p-4 border-t border-borderSubtle bg-bgBase">
        <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider mb-1.5">
          ACTIVE POLICY STANDARD
        </div>
        <div className="w-full flex items-center justify-between bg-bgSurface border border-borderSubtle px-3 py-2 text-xs font-mono text-textPrimary hover:border-borderAccent cursor-pointer transition-colors">
          <span className="truncate text-[11px]">STRICT_ENTERPRISE (v2.4)</span>
          <ChevronDown className="w-3.5 h-3.5 text-textMuted ml-1 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};

