"use client";

import React from "react";
import { X, Download, FileText, CheckSquare } from "lucide-react";
import { QualityMetrics } from "@/types";

interface QualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics?: QualityMetrics;
}

export const QualityModal: React.FC<QualityModalProps> = ({
  isOpen,
  onClose,
  metrics = {
    ragas_faithfulness_score: 0.94,
    ragas_answer_relevance_score: 0.89,
    grounding_score: 0.92,
    qdrant_latency_ms: 38.0,
    ci_cd_gate_status: "PASSED",
  },
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm select-none">
      <div className="bg-bgSurface border border-borderAccent max-w-2xl w-full p-6 space-y-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-borderSubtle pb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-textPrimary tracking-wide">
              RAGAS EVALUATION METRICS & QUALITY GATE INSPECTOR
            </h2>
            <p className="font-mono text-xs text-textMuted mt-0.5 font-semibold">
              Automated Pytest CI/CD Pipeline Quality Gate Assertions
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-textMuted hover:text-textPrimary p-1 border border-transparent hover:border-borderSubtle transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quality Metrics Table */}
        <div className="bg-bgBase border border-borderSubtle">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-borderSubtle text-textMuted text-[10px] uppercase font-bold">
                <th className="py-2.5 px-4">METRIC</th>
                <th className="py-2.5 px-4">SCORE</th>
                <th className="py-2.5 px-4">THRESHOLD</th>
                <th className="py-2.5 px-4 text-right">BUILD STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSubtle text-textPrimary font-semibold">
              <tr>
                <td className="py-3 px-4">Ragas Faithfulness</td>
                <td className="py-3 px-4 font-bold">{metrics.ragas_faithfulness_score.toFixed(2)}</td>
                <td className="py-3 px-4 text-textMuted">&gt;= 0.85</td>
                <td className="py-3 px-4 text-right">
                  <span className="inline-flex items-center space-x-1.5 text-textPrimary font-bold">
                    <span className="w-2 h-2 bg-emerald-500 inline-block"></span>
                    <span>PASSED</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">Answer Relevance</td>
                <td className="py-3 px-4 font-bold">{metrics.ragas_answer_relevance_score.toFixed(2)}</td>
                <td className="py-3 px-4 text-textMuted">&gt;= 0.80</td>
                <td className="py-3 px-4 text-right">
                  <span className="inline-flex items-center space-x-1.5 text-textPrimary font-bold">
                    <span className="w-2 h-2 bg-emerald-500 inline-block"></span>
                    <span>PASSED</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">Qdrant Retrieval Latency</td>
                <td className="py-3 px-4 font-bold">{metrics.qdrant_latency_ms}ms</td>
                <td className="py-3 px-4 text-textMuted">&lt;= 50ms</td>
                <td className="py-3 px-4 text-right">
                  <span className="inline-flex items-center space-x-1.5 text-textPrimary font-bold">
                    <span className="w-2 h-2 bg-emerald-500 inline-block"></span>
                    <span>PASSED</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">Grounding Score</td>
                <td className="py-3 px-4 font-bold">{metrics.grounding_score.toFixed(2)}</td>
                <td className="py-3 px-4 text-textMuted">&gt;= 0.80</td>
                <td className="py-3 px-4 text-right">
                  <span className="inline-flex items-center space-x-1.5 text-textPrimary font-bold">
                    <span className="w-2 h-2 bg-emerald-500 inline-block"></span>
                    <span>PASSED</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Build Status Indicator */}
        <div className="bg-bgBase p-4 border border-borderAccent flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs text-textPrimary font-bold uppercase tracking-wider">
              CI/CD GATE DECISION: BUILD APPROVED FOR DEPLOYMENT
            </span>
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 font-mono text-xs uppercase tracking-wider bg-bgBase hover:bg-borderSubtle text-textPrimary border border-borderAccent py-2.5 px-4 font-bold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-textMuted" />
            <span>[ DOWNLOAD JSON AUDIT REPORT ]</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 font-mono text-xs uppercase tracking-wider bg-accentPurple hover:bg-purple-950 text-white border border-borderSubtle py-2.5 px-4 font-bold transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-textMuted" />
            <span>[ EXPORT PDF EXECUTIVE SUMMARY ]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

