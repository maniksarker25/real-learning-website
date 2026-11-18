import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Badge, Button } from "@/components/dashboard/ui";
import { RecentSimulationItem } from "./types";

interface RecentSimulationTableRowProps {
  simulation: RecentSimulationItem;
  onSelectFeedback: (sim: RecentSimulationItem) => void;
}

const TRACK_TONE = {
  "Customer Service": "orange",
  "Tech Support": "green",
  "IT Specialist": "rose",
  "Healthcare Support": "blue",
} as const;

export function TrackBadge({ track }: { track: RecentSimulationItem["careerTrack"] }) {
  return <Badge tone={TRACK_TONE[track] ?? "neutral"}>{track}</Badge>;
}

function Score({ sim }: { sim: RecentSimulationItem }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="text-lg font-semibold tabular-nums text-white">{sim.score}%</span>
      <span className={sim.scoreGrade === "Mastery" ? "text-sm text-emerald-400" : "text-sm text-zinc-500"}>
        {sim.scoreGrade}
      </span>
    </span>
  );
}

/** Desktop table row. */
export const RecentSimulationTableRow = memo(function RecentSimulationTableRow({
  simulation: sim,
  onSelectFeedback,
}: RecentSimulationTableRowProps) {
  return (
    <tr className="transition-colors hover:bg-white/2">
      <td className="px-5 py-4">
        <p className="max-w-sm text-[15px] font-medium text-white">{sim.scenarioTitle}</p>
        <p className="mt-0.5 text-sm text-zinc-500">
          with {sim.aiPersona.name} · {sim.aiPersona.role}
        </p>
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <TrackBadge track={sim.careerTrack} />
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <Score sim={sim} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm">
        <p className="text-zinc-300">{sim.date}</p>
        <p className="text-zinc-500">{sim.duration}</p>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-right">
        <Button size="sm" variant="outline" onClick={() => onSelectFeedback(sim)}>
          Feedback
          <ArrowRight className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
});

/** Mobile stacked card for the same data. */
export const RecentSimulationCard = memo(function RecentSimulationCard({
  simulation: sim,
  onSelectFeedback,
}: RecentSimulationTableRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectFeedback(sim)}
      className="block w-full p-5 text-left transition-colors hover:bg-white/2"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] font-medium text-white">{sim.scenarioTitle}</p>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500" />
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        {sim.date} · {sim.duration}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <TrackBadge track={sim.careerTrack} />
        <Score sim={sim} />
      </div>
    </button>
  );
});
