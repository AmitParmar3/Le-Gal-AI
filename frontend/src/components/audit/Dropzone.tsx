"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckSquare, Square, Play, Loader2, CheckCircle2, FileText } from "lucide-react";

interface DropzoneProps {
  onStartAudit: (topics: string[], file?: File | null) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onStartAudit }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Uncapped Liability & Indemnification",
    "Data Privacy & GDPR Retention Limits",
    "Termination Penalties & Cure Window",
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "[1/4] Parsing PDF document structure and pages (pypdf)...",
    "[2/4] Executing Parent-Child chunking (2000c/400c) & Qdrant indexing...",
    "[3/4] Running LangGraph Multi-Agent Audit State Machine (Auditor Agent)...",
    "[4/4] Asserting Ragas Quality Gates (Faithfulness >= 0.85, Latency <= 50ms)...",
  ];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInitiateAudit = () => {
    setIsProcessing(true);
    setCurrentStep(0);

    setTimeout(() => setCurrentStep(1), 600);
    setTimeout(() => setCurrentStep(2), 1200);
    setTimeout(() => setCurrentStep(3), 1800);
    setTimeout(() => {
      setIsProcessing(false);
      onStartAudit(selectedTopics, selectedFile);
    }, 2400);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8 select-none">
      {/* Workspace Header */}
      <div className="border-b border-borderSubtle pb-4">
        <h1 className="font-serif text-2xl font-bold text-textPrimary tracking-wide">
          CONTRACT AUDIT INGESTION WORKSPACE
        </h1>
        <p className="font-mono text-xs text-textMuted mt-1 font-semibold">
          Upload unstructured native PDF legal contracts (MSAs, SOWs, NDAs) for Parent-Child vector analysis.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {isProcessing ? (
        /* Agent Processing Console */
        <div className="border border-borderAccent bg-bgSurface p-8 space-y-6 shadow-md">
          <div className="flex items-center space-x-3 border-b border-borderSubtle pb-4">
            <Loader2 className="w-5 h-5 text-accentRiskHigh animate-spin" />
            <h3 className="font-mono text-sm font-bold text-textPrimary uppercase tracking-wider">
              MULTI-AGENT AUDIT PIPELINE IN PROGRESS...
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {steps.map((stepText, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 border ${
                    isCompleted
                      ? "border-emerald-800 bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                      : isCurrent
                      ? "border-borderAccent bg-bgBase text-textPrimary font-bold animate-pulse"
                      : "border-borderSubtle bg-bgSurface text-textMuted opacity-50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-current inline-block flex-shrink-0"></span>
                  )}
                  <span>{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Dropzone Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-borderAccent bg-bgBase p-12 text-center flex flex-col items-center justify-center space-y-4 hover:border-textMuted transition-colors cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 bg-bgSurface border border-borderSubtle flex items-center justify-center text-textMuted group-hover:text-textPrimary transition-colors">
              {selectedFile ? (
                <FileText className="w-6 h-6 text-emerald-600" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div className="space-y-1">
              <p className="font-serif text-lg font-bold text-textPrimary uppercase">
                {selectedFile ? `SELECTED: ${selectedFile.name}` : "DRAG & DROP CONTRACT PDF HERE OR CLICK TO BROWSE"}
              </p>
              <p className="font-mono text-[11px] text-textMuted uppercase font-semibold">
                Supported formats: PDF, DOCX (Max 50MB) — Parent context window: 2000c / Child search: 400c
              </p>
            </div>
          </div>

          {/* Target Policy Topics Grid */}
          <div className="space-y-4 bg-bgSurface border border-borderSubtle p-6 shadow-sm">
            <h3 className="font-mono text-xs text-textMuted uppercase tracking-wider font-bold">
              AUDIT TARGET TOPICS & COMPLIANCE RULES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allTopics.map((topic) => {
                const isChecked = selectedTopics.includes(topic);
                return (
                  <div
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className="flex items-center space-x-3 cursor-pointer p-2 border border-transparent hover:border-borderSubtle"
                  >
                    <button className="text-textPrimary hover:text-white transition-colors">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-borderAccent fill-bgBase" />
                      ) : (
                        <Square className="w-4 h-4 text-textMuted" />
                      )}
                    </button>
                    <span className="font-mono text-xs text-textPrimary font-semibold">{topic}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution CTA Button */}
          <div className="flex justify-end">
            <button
              onClick={handleInitiateAudit}
              className="flex items-center space-x-3 bg-accentRiskHigh hover:bg-red-900 border border-borderAccent text-white font-mono text-xs uppercase tracking-wider py-3.5 px-6 transition-colors cursor-pointer shadow-md font-bold"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>[ INITIATE MULTI-AGENT COMPLIANCE AUDIT ]</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
