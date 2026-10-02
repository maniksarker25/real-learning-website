"use client";

import React, { memo } from "react";
import { Zap } from "lucide-react";

interface SimulationActiveBannerProps {
  scenarioTitle: string;
  careerTrackTitle?: string;
  onReviewClass?: () => void;
}

export const SimulationActiveBanner = memo(function SimulationActiveBanner({
  scenarioTitle,
  careerTrackTitle,
  onReviewClass,
}: SimulationActiveBannerProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-semibold mb-1">
          <Zap className="w-3 h-3 text-amber-700" />
          <span>STEP 3: PRACTICE SIMULATOR</span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
          <span>{scenarioTitle}</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Practice scenario for{" "}
          <strong className="text-stone-800 font-semibold">
            {careerTrackTitle || "Your Career Track"}
          </strong>
          .
        </p>
      </div>

      {onReviewClass && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReviewClass}
            className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Review Class
          </button>
        </div>
      )}
    </div>
  );
});
