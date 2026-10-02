"use client";

import React, { memo } from "react";
import { Sparkles, RotateCcw, TrendingUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimulationScenario } from "@/types/individual";

interface SimulationCompletedViewProps {
  scenario: SimulationScenario;
  onPracticeAgain: (scenario: SimulationScenario) => void;
  onBackToList: () => void;
}

export const SimulationCompletedView = memo(function SimulationCompletedView({
  scenario,
  onPracticeAgain,
  onBackToList,
}: SimulationCompletedViewProps) {
  const skillBreakdowns = [
    { name: "Communication & Clarity", score: 95, color: "bg-orange-500" },
    { name: "Empathy & Tone", score: 96, color: "bg-emerald-500" },
    { name: "Active Listening", score: 93, color: "bg-rose-500" },
    { name: "Problem Solving", score: 92, color: "bg-purple-500" },
    { name: "Conflict Resolution", score: 94, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>SIMULATION FEEDBACK</span>
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            Simulation Result & Evaluation
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Scenario: {scenario.title}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPracticeAgain(scenario)}
            className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span>Practice Again</span>
          </button>
          <button
            type="button"
            onClick={onBackToList}
            className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Overall Score & Skill Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 rounded-xl p-5 border border-amber-200/70 text-center flex flex-col justify-center space-y-2">
          <span className="text-[10px] font-mono font-semibold uppercase text-stone-500">
            Overall Score
          </span>
          <div className="text-4xl sm:text-5xl font-black text-stone-900 font-mono">
            94%
          </div>
          <div className="inline-flex items-center justify-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mx-auto">
            <TrendingUp className="w-3 h-3 text-emerald-700" />
            <span>High Performance</span>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-stone-200 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Skill Level Breakdown</span>
          </h3>

          <div className="space-y-2.5">
            {skillBreakdowns.map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-800">{sk.name}</span>
                  <span className="font-mono text-stone-900 font-bold">
                    {sk.score}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div
                    className={cn("h-full rounded-full", sk.color)}
                    style={{ width: `${sk.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
