import React, { memo } from "react";
import { Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompletedSimulationItem } from "./types";

interface OrgSimulationCardProps {
  simulation: CompletedSimulationItem;
  onViewTranscript: (sim: CompletedSimulationItem) => void;
}

export const OrgSimulationCard = memo(function OrgSimulationCard({
  simulation,
  onViewTranscript,
}: OrgSimulationCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors group">
      {/* Top Section */}
      <div className="space-y-3">
        {/* Track Badge & Score */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold border font-mono",
              simulation.trackColor,
            )}
          >
            {simulation.careerTrack}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-400 font-mono">
              {simulation.completedAt}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
              Score: {simulation.overallScore}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug group-hover:text-orange-600 transition-colors">
          {simulation.scenarioTitle}
        </h3>

        {/* Key Member Response Quote */}
        <div className="p-3.5 rounded-xl bg-[#FCFAF6] border border-stone-200 space-y-1.5 text-xs">
          <div className="text-[10px] font-mono uppercase text-orange-700 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>KEY MEMBER RESPONSE</span>
          </div>
          <p className="text-stone-700 italic text-xs leading-relaxed">
            {simulation.highlightQuote}
          </p>
        </div>

        {/* Evaluated Competency Bar Breakdown */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>
              Empathy:{" "}
              <strong className="text-stone-800">
                {simulation.skills.empathy}%
              </strong>
            </span>
            <span>
              Ownership:{" "}
              <strong className="text-stone-800">
                {simulation.skills.ownership}%
              </strong>
            </span>
            <span>
              Problem Solving:{" "}
              <strong className="text-stone-800">
                {simulation.skills.problemSolving}%
              </strong>
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full"
              style={{ width: `${simulation.overallScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        {/* Member Profile */}
        <div className="flex items-center gap-2.5 truncate">
          <img
            src={simulation.member.avatar}
            alt={simulation.member.name}
            className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div className="truncate">
            <div className="font-bold text-stone-900 text-xs truncate">
              {simulation.member.name}
            </div>
            <div className="text-[10px] text-stone-500 font-mono truncate">
              {simulation.member.email}
            </div>
          </div>
        </div>

        {/* View Transcript Button */}
        <button
          onClick={() => onViewTranscript(simulation)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <Eye className="w-3.5 h-3.5 text-orange-600" />
          <span>Transcript</span>
        </button>
      </div>
    </div>
  );
});
