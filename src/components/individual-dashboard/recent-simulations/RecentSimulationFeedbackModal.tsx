import { memo, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, BlobCard, Button, Modal, PatriciaPose, ProgressBar } from "@/components/dashboard/ui";
import { RecentSimulationItem } from "./types";

interface RecentSimulationFeedbackModalProps {
  simulation: RecentSimulationItem;
  onClose: () => void;
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

function Block({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/[0.06] bg-black/20 p-5", className)}>
      <h3 className="mb-4 text-base font-medium text-white">{title}</h3>
      {children}
    </div>
  );
}

function Bullets({ items, dot }: { items: string[]; dot: string }) {
  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={p} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
          <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", dot)} />
          {p}
        </li>
      ))}
    </ul>
  );
}

export const RecentSimulationFeedbackModal = memo(function RecentSimulationFeedbackModal({
  simulation: sim,
  onClose,
  onLaunchSimulation,
}: RecentSimulationFeedbackModalProps) {
  const handleRetake = () => {
    onClose();
    onLaunchSimulation?.(sim.scenarioTitle);
  };

  const skills = [
    { name: "Communication & clarity", score: sim.skills.communication },
    { name: "Empathy & tone", score: sim.skills.empathy },
    { name: "Active listening", score: sim.skills.activeListening },
    { name: "Problem solving", score: sim.skills.problemSolving },
    { name: "Conflict resolution", score: sim.skills.conflictResolution },
  ];

  return (
    <Modal open onClose={onClose} title="Session feedback" className="max-w-4xl">
      <p className="-mt-3 mb-6 text-sm text-zinc-400">{sim.scenarioTitle}</p>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* score */}
        <BlobCard tone={sim.score >= 90 ? "green" : "orange"} className="lg:col-span-5">
          <p className="text-sm font-medium text-white/80">Overall score</p>
          <p className="mt-2 text-6xl font-semibold tracking-[-0.03em] tabular-nums">{sim.score}%</p>
          <p className="mt-2 text-sm text-white/80">
            {sim.scoreGrade} · {sim.duration}
          </p>
          <PatriciaPose pose="thumbs-up" className="absolute bottom-0 right-4 h-36 w-24" sizes="96px" />
        </BlobCard>

        {/* skills */}
        <Block title="Skill breakdown" className="lg:col-span-7">
          <ul className="space-y-3.5">
            {skills.map((s) => (
              <li key={s.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-zinc-300">{s.name}</span>
                  <span className="tabular-nums text-white">{s.score}%</span>
                </div>
                <ProgressBar value={s.score} label={s.name} />
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Block title="What you did well">
          <Bullets items={sim.positiveHighlights} dot="bg-emerald-400" />
        </Block>
        <Block title="What to improve">
          <Bullets items={sim.improvementPoints} dot="bg-orange-400" />
        </Block>
      </div>

      <Block title="Key moments" className="mt-4">
        <ol className="space-y-3">
          {sim.keyMoments.map((m, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-12 shrink-0 pt-0.5 text-sm tabular-nums text-zinc-500">{m.timestamp}</span>
              <div className="min-w-0">
                <Badge tone={m.quality === "good" ? "green" : "orange"}>
                  {m.quality === "good" ? "Worked well" : "Try differently"}
                </Badge>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{m.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Recommended next" className="mt-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {sim.recommendedLessons.map((lesson) => (
            <Link
              key={lesson}
              href="/user-dashboard/classes"
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] p-4 transition-colors hover:border-white/20"
            >
              <span className="text-sm text-zinc-200">{lesson}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </Block>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleRetake}>
          <RotateCcw className="h-4 w-4" />
          Practice again
        </Button>
      </div>
    </Modal>
  );
});
