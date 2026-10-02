import React, { memo } from "react";
import { Sparkles, TrendingUp } from "lucide-react";

interface OrgSimulationsHeaderProps {
  averageScore?: string;
}

export const OrgSimulationsHeader = memo(function OrgSimulationsHeader({
  averageScore = "92.2%",
}: OrgSimulationsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs text-orange-900 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>MEMBER SIMULATION LOGS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2">
          <span>Completed AI Workplace Simulations</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5 max-w-xl">
          Live feed and detailed score evaluations of real-time AI simulations
          recently completed by your team members across all 4 career tracks.
        </p>
      </div>

      <div className="flex items-center gap-3 bg-[#FCFAF6] p-3 rounded-2xl border border-stone-200 shrink-0">
        <div className="text-right">
          <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
            Avg Team Score
          </div>
          <div className="text-xl font-black text-emerald-700 font-mono">
            {averageScore}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
});
