import { memo } from "react";
import { MessageSquare } from "lucide-react";
import { Badge, Button, ProgressBar } from "@/components/dashboard/ui";
import { CompletedSimulationItem } from "./types";
import { TRACK_TONE } from "./trackTone";

interface OrgSimulationCardProps {
  simulation: CompletedSimulationItem;
  onViewTranscript: (sim: CompletedSimulationItem) => void;
}

export const OrgSimulationCard = memo(function OrgSimulationCard({ simulation, onViewTranscript }: OrgSimulationCardProps) {
  const { skills } = simulation;
  const skillBars: [string, number][] = [
    ["Empathy", skills.empathy],
    ["Ownership", skills.ownership],
    ["Problem solving", skills.problemSolving],
  ];

  return (
    <article className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#181818] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={TRACK_TONE[simulation.careerTrack]}>{simulation.careerTrack}</Badge>
        <span className="text-sm text-zinc-500">{simulation.completedAt}</span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-white">{simulation.scenarioTitle}</h3>
        <Badge tone={simulation.overallScore >= 90 ? "green" : "amber"} className="text-sm">
          {simulation.overallScore}%
        </Badge>
      </div>

      <blockquote className="mt-4 rounded-2xl bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
        <span className="mb-1 block text-xs text-zinc-500">Key reply</span>
        {simulation.highlightQuote}
      </blockquote>

      <div className="mb-6 mt-5 grid grid-cols-3 gap-3 text-sm">
        {skillBars.map(([label, value]) => (
          <div key={label}>
            <div className="flex items-baseline justify-between gap-1">
              <span className="truncate text-zinc-500">{label}</span>
              <span className="font-medium text-white tabular-nums">{value}</span>
            </div>
            <ProgressBar value={value} className="mt-2" label={`${label} score`} />
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={simulation.member.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{simulation.member.name}</p>
            <p className="truncate text-sm text-zinc-500">{simulation.member.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => onViewTranscript(simulation)}>
          <MessageSquare className="h-4 w-4" />
          Transcript
        </Button>
      </div>
    </article>
  );
});
