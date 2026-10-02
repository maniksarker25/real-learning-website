"use client";

import React, { memo } from "react";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationLoadingOverlayProps {
  feedbackStage: number;
}

export const SimulationLoadingOverlay = memo(function SimulationLoadingOverlay({
  feedbackStage,
}: SimulationLoadingOverlayProps) {
  return (
    <div className="bg-white rounded-xl p-8 sm:p-10 border border-amber-200 text-center space-y-5 max-w-lg mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
        <Sparkles
          className="w-7 h-7 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-stone-900">
          Analyzing Simulation Performance...
        </h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          Evaluating dialogue cadence, empathy, and coaching rubrics.
        </p>
      </div>

      {/* Step-by-Step Stages */}
      <div className="bg-[#FAF8F5] rounded-xl p-4 border border-stone-200 space-y-2.5 text-left max-w-md mx-auto text-xs">
        <div
          className={cn(
            "flex items-center gap-2 transition-colors",
            feedbackStage >= 1
              ? "text-emerald-800 font-semibold"
              : "text-stone-400"
          )}
        >
          {feedbackStage > 1 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          ) : (
            <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
          )}
          <span>Transcribing conversation turns & tone...</span>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 transition-colors",
            feedbackStage >= 2
              ? "text-emerald-800 font-semibold"
              : "text-stone-400"
          )}
        >
          {feedbackStage > 2 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          ) : feedbackStage === 2 ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
          )}
          <span>Scoring Empathy & Conflict Resolution...</span>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 transition-colors",
            feedbackStage >= 3
              ? "text-emerald-800 font-semibold"
              : "text-stone-400"
          )}
        >
          {feedbackStage === 3 ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
          )}
          <span>Synthesizing coaching takeaways...</span>
        </div>
      </div>
    </div>
  );
});
