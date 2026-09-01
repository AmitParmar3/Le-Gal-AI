"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, FileText, ChevronUp, GripVertical } from "lucide-react";
import { MOCK_AUDIT_HISTORY } from "@/services/mockData";

interface SidebarProps {
  onIngestClick: () => void;
  activeDocId?: string;
  onSelectDoc: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onIngestClick,
  activeDocId = "legals-audit-9942a-2026",
  onSelectDoc,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(256); // default 256px (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.max(180, Math.min(480, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}px` }}
      className="relative border-r border-borderSubtle bg-bgSurface flex flex-col justify-between h-[calc(100vh-3rem)] select-none flex-shrink-0 transition-width"
    >
      {/* Upper Navigation Block */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Primary Action Button */}
        <button
          onClick={onIngestClick}
          className="w-full flex items-center justify-center space-x-2 bg-[#2A2724] hover:bg-borderAccent text-white border border-borderAccent py-2.5 px-3 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer font-bold shadow-sm"
        >
          <Plus className="w-4 h-4 text-textMuted" />
          <span className="truncate">[+ INGEST NEW CONTRACT]</span>
        </button>

        {/* Audit History List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-textMuted uppercase tracking-wider px-1 font-bold">
            <span>RECENT AUDITS</span>
            <span>{MOCK_AUDIT_HISTORY.length} FILES</span>
          </div>

          <div className="space-y-1">
            {MOCK_AUDIT_HISTORY.map((item) => {
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
                      <span className="font-serif text-xs font-bold text-textPrimary truncate">
                        {item.fileName}
                      </span>
                    </div>
                    {item.riskScore >= 0.7 && (
                      <span className="font-mono text-[10px] bg-accentRiskHigh text-white px-1 py-0.5 ml-1 flex-shrink-0 font-bold">
                        {item.riskScore.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-textMuted pl-5 font-semibold">
                    {item.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Policy Selector (Chevron pointing UP) */}
      <div className="p-4 border-t border-borderSubtle bg-bgBase flex-shrink-0">
        <div className="text-[10px] font-mono text-textMuted uppercase tracking-wider mb-1.5 font-bold">
          ACTIVE POLICY STANDARD
        </div>
        <div className="w-full flex items-center justify-between bg-bgSurface border border-borderSubtle px-3 py-2 text-xs font-mono text-textPrimary hover:border-borderAccent cursor-pointer transition-colors font-semibold shadow-sm">
          <span className="truncate text-[11px]">STRICT_ENTERPRISE (v2.4)</span>
          <ChevronUp className="w-3.5 h-3.5 text-textMuted ml-1 flex-shrink-0" />
        </div>
      </div>

      {/* Draggable Sidebar Resizer Handle */}
      <div
        onMouseDown={startResizing}
        className={`absolute top-0 right-0 bottom-0 w-2 cursor-col-resize hover:bg-borderAccent/50 flex items-center justify-center transition-colors group ${
          isResizing ? "bg-borderAccent" : "bg-transparent"
        }`}
        title="Drag to resize sidebar width"
      >
        <GripVertical className="w-3 h-3 text-textMuted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </aside>
  );
};
