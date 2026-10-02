import React, { memo } from "react";
import { ArrowRight } from "lucide-react";

interface ClassPracticePromptCardProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const ClassPracticePromptCard = memo(function ClassPracticePromptCard({
  onLaunchPracticeSimulator,
}: ClassPracticePromptCardProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-stone-900">
          Ready to practice in a realistic scenario?
        </h4>
        <p className="text-xs text-stone-500 mt-0.5">
          Enter the practice simulator for this class.
        </p>
      </div>
      <button
        onClick={() =>
          onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
        }
        className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
      >
        <span>Open Simulator</span>
        <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
      </button>
    </div>
  );
});
