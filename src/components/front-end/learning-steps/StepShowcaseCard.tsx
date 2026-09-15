"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { ShowcaseStep } from "./types";
import { RenderHeadline } from "./RenderHeadline";
import { StepVisualRenderer } from "./StepVisualRenderer";

interface StepShowcaseCardProps {
  step: ShowcaseStep;
  isCurrent: boolean;
  onSelect: () => void;
}

export function StepShowcaseCard({
  step,
  isCurrent,
  onSelect,
}: StepShowcaseCardProps) {
  return (
    <div
      onClick={() => {
        if (!isCurrent) onSelect();
      }}
      className={`snap-start w-[88vw] sm:w-[80vw] lg:w-[980px] shrink-0 rounded-[28px] overflow-hidden bg-[#0c0c10] border flex flex-col transition-all duration-300 ${
        isCurrent
          ? "border-black/20 opacity-100 scale-100"
          : "border-black/[0.08] opacity-75 hover:opacity-90 scale-[0.99] cursor-pointer"
      }`}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] flex-1 w-full lg:h-[500px]">
        {/* Left Panel: Step Details, Headline & Metrics */}
        <div
          className={`relative ${step.bgClass} p-6 sm:p-8 lg:p-11 flex flex-col justify-between shrink-0 lg:shrink lg:h-full overflow-hidden`}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.75) 1.2px, transparent 1.2px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-white/90">
              <span>{step.tag}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-black/25 border border-white/15 text-[10px] font-mono text-white/80">
                {step.stepNumber} OF 05
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white/95 leading-[1.2] max-w-md tracking-tight">
              <RenderHeadline
                text={step.title}
                highlights={step.highlightWords}
              />
            </h3>
          </div>

          <div className="relative z-10 space-y-6 sm:space-y-8 pt-6 sm:pt-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {step.metrics.map((m, mIdx) => (
                <div key={mIdx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <a
                href={step.ctaHref}
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-950 font-bold text-xs sm:text-sm hover:bg-white/95 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <span>{step.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel: Adaptive Simulation Visual */}
        <div className="relative bg-[#0c0c10] flex-1 flex flex-col items-stretch justify-center overflow-hidden p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-white/10">
          <StepVisualRenderer stepId={step.id} />
        </div>
      </div>
    </div>
  );
}
