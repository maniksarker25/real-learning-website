import { memo } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, BlobCard, Button, Modal, PatriciaFace } from "@/components/dashboard/ui";
import { CompletedSimulationItem } from "./types";
import { TRACK_TONE } from "./trackTone";

interface OrgSimulationTranscriptModalProps {
  simulation: CompletedSimulationItem;
  onClose: () => void;
}

export const OrgSimulationTranscriptModal = memo(function OrgSimulationTranscriptModal({
  simulation,
  onClose,
}: OrgSimulationTranscriptModalProps) {
  const { skills, member } = simulation;
  const skillStats: [string, number][] = [
    ["Empathy", skills.empathy],
    ["Ownership", skills.ownership],
    ["Resolution", skills.resolution],
  ];

  return (
    <Modal open onClose={onClose} title={simulation.scenarioTitle}>
      <div className="-mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <Badge tone={TRACK_TONE[simulation.careerTrack]}>{simulation.careerTrack}</Badge>
        <span>
          {simulation.completedAt} · {simulation.duration}
        </span>
      </div>

      {/* score + member */}
      <div className="mt-6 grid gap-3 sm:grid-cols-[200px_1fr]">
        <BlobCard
          tone={simulation.overallScore >= 90 ? "green" : "orange"}
          className="flex flex-col justify-center p-5 sm:p-6"
        >
          <p className="text-sm text-white/80">Overall score</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.03em] tabular-nums">{simulation.overallScore}%</p>
        </BlobCard>

        <div className="rounded-3xl border border-white/[0.06] bg-black/20 p-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="truncate text-base font-medium text-white">{member.name}</p>
              <p className="truncate text-sm text-zinc-500">{member.email}</p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
            {skillStats.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-zinc-500">{label}</dt>
                <dd className="text-lg font-semibold text-white tabular-nums">{value}%</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* transcript (same bubbles as /demo) */}
      <h3 className="mt-8 text-base font-semibold text-white">Transcript</h3>
      <div className="mt-3 max-h-72 space-y-4 overflow-y-auto rounded-2xl bg-black/20 p-4">
        {simulation.dialoguePreview.map((turn, i) => {
          const isAi = turn.role === "ai";
          return (
            <div key={i} className={cn("flex items-end gap-2.5", !isAi && "justify-end")}>
              {isAi && <PatriciaFace face="normal" size={30} />}
              <div className="max-w-[80%]">
                <p className={cn("mb-1 text-xs text-zinc-500", !isAi && "text-right")}>
                  {isAi ? `${simulation.aiCharacterName}, ${simulation.aiCharacterRole}` : member.name}
                </p>
                <p
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base leading-relaxed",
                    isAi ? "rounded-bl-md bg-white/[0.07] text-zinc-100" : "rounded-br-md bg-orange-500 text-black",
                  )}
                >
                  {turn.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* feedback */}
      <h3 className="mt-8 text-base font-semibold text-white">Feedback highlights</h3>
      <ul className="mt-3 space-y-2.5">
        {simulation.feedbackHighlights.map((point, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-black">
              <Check className="h-3 w-3" />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <Button variant="white" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
});
