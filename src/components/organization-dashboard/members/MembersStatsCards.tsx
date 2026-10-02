"use client";

import React, { memo } from "react";

interface MembersStatsCardsProps {
  totalMembersCount: number;
}

export const MembersStatsCards = memo(function MembersStatsCards({
  totalMembersCount,
}: MembersStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
      {/* Primary Average Score Card */}
      <div className="lg:col-span-7 bg-stone-900 text-white rounded-xl p-5 sm:p-6 border border-stone-800 hover:bg-stone-900/95 transition-colors flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono">
              Avg Simulation Score
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/60">
              +3.8% Cycle
            </span>
          </div>

          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono mt-1">
            91.4%
          </div>

          <p className="text-xs text-stone-400 mt-2">
            Evaluated across real-time simulations, customer de-escalations, and
            technical diagnostics.
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
            <span>
              Top: <strong className="text-white font-bold">98%</strong>
            </span>
            <span className="text-stone-700">•</span>
            <span>
              Median: <strong className="text-white font-bold">88%</strong>
            </span>
            <span className="text-stone-700">•</span>
            <span>
              Passing: <strong className="text-white font-bold">100%</strong>
            </span>
          </div>

          <div className="w-full sm:w-28 h-1.5 bg-stone-800 rounded-full overflow-hidden border border-stone-700/60">
            <div className="h-full bg-emerald-500 rounded-full w-[91%]" />
          </div>
        </div>
      </div>

      {/* Child Small Metric Cards */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
        {/* Child Card 1: Total Enrolled */}
        <div className="bg-white rounded-xl p-4 sm:p-4.5 border border-stone-200 hover:bg-stone-50/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
              Total Enrolled Learners
            </span>
            <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              100% Utilization
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-mono">
            {totalMembersCount}
          </div>
          <div className="text-xs text-stone-500 font-medium mt-1">
            Active learner participants in workspace
          </div>
        </div>

        {/* Child Card 2: Active Career Tracks */}
        <div className="bg-white rounded-xl p-4 sm:p-4.5 border border-stone-200 hover:bg-stone-50/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
              Active Career Tracks
            </span>
            <span className="text-xs font-mono font-medium text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              Assigned
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            4 Tracks
          </div>
          <div className="text-xs text-stone-500 font-medium mt-1">
            Customer Service, Tech Support, IT & Healthcare
          </div>
        </div>
      </div>
    </div>
  );
});
