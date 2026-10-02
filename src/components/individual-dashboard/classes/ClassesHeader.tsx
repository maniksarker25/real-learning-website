import React, { memo } from "react";

interface ClassesHeaderProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const ClassesHeader = memo(function ClassesHeader({
  onLaunchPracticeSimulator,
}: ClassesHeaderProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <span>Class Fundamentals</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Learn core techniques, complete the knowledge check, or jump straight
          to practice.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() =>
            onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
          }
          className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Skip to Simulator →</span>
        </button>
      </div>
    </div>
  );
});
