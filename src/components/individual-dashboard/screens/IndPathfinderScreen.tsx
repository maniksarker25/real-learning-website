"use client";

import React, { memo, useState, useCallback } from "react";
import { ArrowRight, BookOpen, Check, Loader2, Zap } from "lucide-react";
import { CareerPath } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLearningLoop, DEFAULT_CAREER_PATHS } from "@/context/LearningLoopContext";
import {
  BLOBS,
  Badge,
  Button,
  Card,
  Grain,
  PatriciaFace,
  SectionTitle,
  type BlobTone,
  type PatriciaFaceName,
} from "@/components/dashboard/ui";

interface IndPathfinderScreenProps {
  onSelectPath?: (path: CareerPath) => void;
  onStartClass?: (classId: string) => void;
}

/** Patricia's mood + blob colour per career path (falls back to orange). */
const PATH_LOOK: Record<string, { face: PatriciaFaceName; tone: BlobTone }> = {
  "path-cust-service": { face: "angry", tone: "orange" },
  "path-tech-support": { face: "surprised", tone: "blue" },
  "path-it-specialist": { face: "confused", tone: "violet" },
  "path-healthcare-support": { face: "sad", tone: "green" },
};

const BASELINE = [
  { label: "Current level", value: "Entry-level specialist", note: "Strong communication base" },
  { label: "Strongest skill", value: "Empathy and tone", note: "Shown in your baseline" },
  { label: "Next to grow", value: "Structured troubleshooting", note: "In demand for support roles" },
];

export const IndPathfinderScreen = memo(function IndPathfinderScreen({
  onSelectPath,
  onStartClass,
}: IndPathfinderScreenProps) {
  const router = useRouter();

  const contextValue: ReturnType<typeof useLearningLoop> | null = useLearningLoop();
  const careerPaths: CareerPath[] = DEFAULT_CAREER_PATHS;

  const [selectedPath, setSelectedPath] = useState<CareerPath>(careerPaths[0]);
  const [isStarting, setIsStarting] = useState(false);
  const [startingPathId, setStartingPathId] = useState<string | null>(null);

  const handleSelectCard = useCallback((path: CareerPath) => {
    setSelectedPath(path);
  }, []);

  const handleLaunchPath = useCallback(
    (targetPath?: CareerPath) => {
      const pathToStart = targetPath || selectedPath;
      setStartingPathId(pathToStart.id);
      setIsStarting(true);

      setTimeout(() => {
        if (onSelectPath) {
          onSelectPath(pathToStart);
        } else if (contextValue) {
          contextValue.selectCareerPath(pathToStart);
        }

        if (onStartClass) {
          onStartClass(pathToStart.startingClassId);
        } else if (contextValue) {
          contextValue.startClass(pathToStart.startingClassId);
          router.push("/user-dashboard/classes");
        } else {
          router.push("/user-dashboard/classes");
        }
      }, 600);
    },
    [onSelectPath, onStartClass, selectedPath, contextValue, router]
  );

  return (
    <div className="space-y-8">
      {/* 1. where am I */}
      <section>
        <SectionTitle title="Where you are now" />
        <div className="grid gap-3 md:grid-cols-3">
          {BASELINE.map((b) => (
            <Card key={b.label} className="p-5">
              <p className="text-sm text-zinc-500">{b.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{b.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{b.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. career tracks */}
      <section>
        <SectionTitle
          title="Choose a career track"
          action={<span className="hidden text-sm text-zinc-500 sm:inline">Tap a card, then start</span>}
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" role="radiogroup" aria-label="Career tracks">
          {careerPaths.map((path) => {
            const isSelected = selectedPath.id === path.id;
            const isThisPathStarting = isStarting && (startingPathId === path.id || isSelected);
            const look = PATH_LOOK[path.id] ?? { face: "happy" as const, tone: "orange" as const };
            const choose = () => (isSelected ? handleLaunchPath(path) : handleSelectCard(path));

            return (
              <div
                key={path.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={choose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    choose();
                  }
                }}
                className={cn(
                  "relative isolate flex cursor-pointer flex-col overflow-hidden rounded-3xl border p-5 transition-colors",
                  isSelected ? "border-transparent text-white" : "border-white/[0.06] bg-[#181818] hover:bg-[#1c1c1c]",
                )}
              >
                {isSelected && (
                  <>
                    <span aria-hidden className="absolute inset-0 -z-20" style={{ background: BLOBS[look.tone] }} />
                    <Grain />
                  </>
                )}

                <div className="flex items-start justify-between gap-3">
                  <PatriciaFace face={look.face} size={48} />
                  {isSelected ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <Badge tone="green">{path.matchScore}% match</Badge>
                  )}
                </div>

                <p className={cn("mt-5 text-sm", isSelected ? "text-white/75" : "text-zinc-500")}>{path.category}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.01em]">{path.title}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", isSelected ? "text-white/85" : "text-zinc-400")}>
                  {path.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {path.coreSkills.map((sk) => (
                    <span
                      key={sk}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs",
                        isSelected ? "bg-black/20 text-white" : "bg-white/[0.06] text-zinc-300",
                      )}
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className={cn("mt-auto pt-5", isSelected ? "text-white/75" : "text-zinc-500")}>
                  <p className="mb-3 flex justify-between gap-2 text-sm">
                    <span>Typical salary</span>
                    <span className={isSelected ? "text-white" : "text-zinc-300"}>{path.avgSalaryRange}</span>
                  </p>
                  <Button
                    variant={isSelected ? "white" : "outline"}
                    className="w-full"
                    disabled={isStarting}
                    onClick={(e) => {
                      e.stopPropagation();
                      choose();
                    }}
                  >
                    {isThisPathStarting ? (
                      <>
                        Starting
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : isSelected ? (
                      <>
                        Start track
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Select track"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. what to do first */}
      <section>
        <SectionTitle title="Your first two steps" />
        <Card>
          <div className="grid gap-3 md:grid-cols-2">
            <FirstStep
              icon={BookOpen}
              step="1. Learn"
              title="Customer communication and de-escalation"
              text="Active listening, tone control and positive framing."
            />
            <FirstStep
              icon={Zap}
              step="2. Practice"
              title="Handle an upset customer's refund"
              text="Calm an upset customer in a text chat with Patricia."
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              Selected: <span className="text-white">{selectedPath.title}</span>
            </p>
            <Button size="lg" onClick={() => handleLaunchPath()} disabled={isStarting}>
              {isStarting ? "Starting" : "Start the first class"}
              {isStarting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
});

function FirstStep({
  icon: Icon,
  step,
  title,
  text,
}: {
  icon: typeof Zap;
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/[0.03] p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-zinc-500">{step}</p>
        <p className="mt-0.5 text-base font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-zinc-400">{text}</p>
      </div>
    </div>
  );
}
