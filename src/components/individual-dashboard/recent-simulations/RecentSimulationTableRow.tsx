import React, { memo } from "react";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecentSimulationItem } from "./types";

interface RecentSimulationTableRowProps {
  simulation: RecentSimulationItem;
  onSelectFeedback: (sim: RecentSimulationItem) => void;
}

export const RecentSimulationTableRow = memo(function RecentSimulationTableRow({
  simulation,
  onSelectFeedback,
}: RecentSimulationTableRowProps) {
  const getTrackBadgeClass = (track: RecentSimulationItem["careerTrack"]) => {
    switch (track) {
      case "Customer Service":
        return "bg-orange-50 text-orange-900 border-orange-200";
      case "Tech Support":
        return "bg-emerald-50 text-emerald-900 border-emerald-200";
      case "IT Specialist":
        return "bg-rose-50 text-rose-900 border-rose-200";
      case "Healthcare Support":
        return "bg-purple-50 text-purple-900 border-purple-200";
      default:
        return "bg-stone-50 text-stone-900 border-stone-200";
    }
  };

  return (
    <tr className="hover:bg-stone-50/70 transition-colors group">
      {/* Scenario Title & AI Persona */}
      <td className="py-3.5 px-4">
        <div className="space-y-0.5 max-w-sm">
          <div className="font-bold text-stone-900 text-xs group-hover:text-orange-700 transition-colors">
            {simulation.scenarioTitle}
          </div>
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <span>AI Persona:</span>
            <span className="text-stone-800 font-medium">
              {simulation.aiPersona.name}
            </span>
            <span className="text-[10px] text-stone-400">
              ({simulation.aiPersona.role})
            </span>
          </div>
        </div>
      </td>

      {/* Career Track */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
            getTrackBadgeClass(simulation.careerTrack),
          )}
        >
          {simulation.careerTrack}
        </span>
      </td>

      {/* Score */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-black text-stone-900">
            {simulation.score}%
          </span>
          <span
            className={cn(
              "text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border",
              simulation.scoreGrade === "Mastery"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200",
            )}
          >
            {simulation.scoreGrade}
          </span>
        </div>
      </td>

      {/* Date & Duration */}
      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs">
        <div className="text-stone-800 font-medium">{simulation.date}</div>
        <div className="text-[10px] text-stone-400">{simulation.duration}</div>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{simulation.status}</span>
        </span>
      </td>

      {/* Feedback Button */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <button
          onClick={() => onSelectFeedback(simulation)}
          className="inline-flex items-center gap-1.5 text-xs text-orange-800 hover:text-white bg-orange-50 hover:bg-orange-600 border border-orange-200 hover:border-orange-600 px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-orange-600 group-hover:text-white" />
          <span>Feedback</span>
        </button>
      </td>
    </tr>
  );
});
