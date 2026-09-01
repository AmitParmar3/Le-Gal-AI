"use client";

import React, { useState } from "react";
import { UploadCloud, CheckSquare, Square, Play } from "lucide-react";

interface DropzoneProps {
  onStartAudit: (topics: string[]) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onStartAudit }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Uncapped Liability & Indemnification",
    "Data Privacy & GDPR Retention Limits",
    "Termination Penalties & Cure Window",
  ]);

  const allTopics = [
    "Uncapped Liability & Indemnification",
    "Data Privacy & GDPR Retention Limits",
    "Intellectual Property Transfer Rights",
    "Termination Penalties & Cure Window",
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      <div className="border-b border-borderSubtle pb-4">
        <h1 className="font-serif text-2xl font-semibold text-textPrimary tracking-wide">
          CONTRACT AUDIT INGESTION WORKSPACE
        </h1>
        <p className="font-mono text-xs text-textMuted mt-1">
          Upload unstructured native PDF legal contracts (MSAs, SOWs, NDAs) for Parent-Child vector analysis.
        </p>
      </div>

      {/* Dropzone Box */}
      <div className="border border-dashed border-borderAccent bg-bgBase p-12 text-center flex flex-col items-center justify-center space-y-4 hover:border-textMuted transition-colors cursor-pointer group">
        <div className="w-12 h-12 bg-bgSurface border border-borderSubtle flex items-center justify-center text-textMuted group-hover:text-textPrimary transition-colors">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="font-serif text-lg text-textPrimary">
            DRAG & DROP CONTRACT PDF HERE OR CLICK TO BROWSE
          </p>
          <p className="font-mono text-[11px] text-textMuted uppercase">
            Supported formats: PDF, DOCX (Max 50MB) — Parent context window: 2000c / Child search: 400c
          </p>
        </div>
      </div>

      {/* Target Policy Topics Configuration Grid */}
      <div className="space-y-4 bg-bgSurface border border-borderSubtle p-6">
        <h3 className="font-mono text-xs text-textMuted uppercase tracking-wider">
          AUDIT TARGET TOPICS & COMPLIANCE RULES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTopics.map((topic) => {
            const isChecked = selectedTopics.includes(topic);
            return (
              <div
                key={topic}
                onClick={() => toggleTopic(topic)}
                className="flex items-center space-x-3 cursor-pointer p-2 border border-transparent hover:border-borderSubtle select-none"
              >
                <button className="text-textPrimary hover:text-white transition-colors">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-borderAccent fill-bgBase" />
                  ) : (
                    <Square className="w-4 h-4 text-textMuted" />
                  )}
                </button>
                <span className="font-mono text-xs text-textPrimary">{topic}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution CTA Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onStartAudit(selectedTopics)}
          className="flex items-center space-x-3 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-textPrimary font-mono text-xs uppercase tracking-wider py-3.5 px-6 transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>[ INITIATE MULTI-AGENT COMPLIANCE AUDIT ]</span>
        </button>
      </div>
    </div>
  );
};

