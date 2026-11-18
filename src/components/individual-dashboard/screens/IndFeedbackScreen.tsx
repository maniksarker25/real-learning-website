"use client";

import React, { memo, useCallback } from "react";
import { ArrowRight, Check, RotateCcw, TrendingUp, Zap, BookOpen, type LucideIcon } from "lucide-react";
import { SimulationFeedback } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { RecentSimulationsTable } from "../RecentSimulationsTable";
import {
  Badge,
  BlobCard,
  Button,
  Card,
  CardHeader,
  PageHeader,
  PatriciaPose,
  ProgressBar,
  SectionTitle,
} from "@/components/dashboard/ui";

interface IndFeedbackScreenProps {
  onNavigateToTab?: (tabId: string) => void;
}

const SKILL_GROWTH = [
  { skill: "Active listening", newScore: 92, delta: "+18%" },
  { skill: "De-escalation", newScore: 94, delta: "+16%" },
  { skill: "Positive framing", newScore: 95, delta: "+25%" },
  { skill: "Action agreements", newScore: 89, delta: "+24%" },
];

export const IndFeedbackScreen = memo(function IndFeedbackScreen({
  onNavigateToTab,
}: IndFeedbackScreenProps) {
  const router = useRouter();

  const contextValue: ReturnType<typeof useLearningLoop> | null = useLearningLoop();
  const fallbackFeedback: SimulationFeedback = {
    scenarioId: "sim-1",
    scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
    overallScore: 92,
    skillScores: {
      communication: 95,
      empathy: 94,
      problemSolving: 90,
      activeListening: 92,
      conflictResolution: 89,
    },
    positiveHighlights: [
      "Immediate Emotional Validation: Validated caller frustration within 10s before policies.",
      "Positive Framing: Used 'What I can do right now...' rather than negative walls.",
      "Action Agreement: Set a clear follow-up email timestamp.",
    ],
    improvementPoints: [
      "Speed of Agreement: State resolution credit ~30s earlier.",
      "Summarizing Facts: Confirm order invoice # before confirming credit amount.",
    ],
    keyMoments: [
      {
        timestamp: "00:15",
        note: "Validated frustration with empathy. Strong tone control.",
        quality: "good",
      },
      {
        timestamp: "01:20",
        note: "Framed available credit options positively.",
        quality: "good",
      },
      {
        timestamp: "02:10",
        note: "Missed chance: State invoice verification earlier for protocol accuracy.",
        quality: "improve",
      },
    ],
    recommendedLessons: [
      "Lesson 4: Establishing Action Agreements",
      "Lesson 3: Non-Confrontational Phrasing",
    ],
    recommendedSimulations: [
      "L1 Diagnostics Under SLA Pressure",
      "Live Chat Resolution",
    ],
  };

  const feedbackData: SimulationFeedback = contextValue?.feedback || fallbackFeedback;

  const handlePracticeAgain = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("repeat_skill");
    }
    if (onNavigateToTab) {
      onNavigateToTab("simulations");
    } else {
      router.push("/user-dashboard/simulations");
    }
  }, [contextValue, onNavigateToTab, router]);

  const handleGoToLesson = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("next_class");
    }
    if (onNavigateToTab) {
      onNavigateToTab("classes");
    } else {
      router.push("/user-dashboard/classes");
    }
  }, [contextValue, onNavigateToTab, router]);

  const handleTryHarderSimulation = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("harder_simulation");
    }
    if (onNavigateToTab) {
      onNavigateToTab("simulations");
    } else {
      router.push("/user-dashboard/simulations");
    }
  }, [contextValue, onNavigateToTab, router]);

  const skills = [
    { name: "Communication and clarity", score: feedbackData.skillScores.communication },
    { name: "Empathy and tone", score: feedbackData.skillScores.empathy },
    { name: "Active listening", score: feedbackData.skillScores.activeListening },
    { name: "Problem solving", score: feedbackData.skillScores.problemSolving },
    { name: "Conflict resolution", score: feedbackData.skillScores.conflictResolution },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Step 4 · Feedback"
        title="How it went"
        description={feedbackData.scenarioTitle}
        actions={
          <Button variant="outline" onClick={handlePracticeAgain}>
            <RotateCcw className="h-4 w-4" />
            Practice again
          </Button>
        }
      />

      {/* score + skills */}
      <div className="grid gap-3 lg:grid-cols-12">
        <BlobCard tone="green" className="flex flex-col lg:col-span-4">
          <p className="text-sm font-medium text-white/80">Overall score</p>
          <p className="mt-4 text-6xl font-semibold tracking-[-0.03em] tabular-nums">{feedbackData.overallScore}%</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/90">
            <TrendingUp className="h-4 w-4" />
            Strong performance
          </p>
          <PatriciaPose pose="thumbs-up" className="mt-auto h-36 w-24 self-end" sizes="96px" />
        </BlobCard>

        <Card className="lg:col-span-8">
          <CardHeader title="Skill scores" description="How Patricia rated each skill in this conversation." />
          <ul className="space-y-4">
            {skills.map((sk) => (
              <li key={sk.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-300">{sk.name}</span>
                  <span className="font-medium text-white tabular-nums">{sk.score}%</span>
                </div>
                <ProgressBar value={sk.score} label={sk.name} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* strengths vs growth */}
      <div className="grid gap-3 md:grid-cols-2">
        <PointsCard title="What you did well" tone="good" points={feedbackData.positiveHighlights} />
        <PointsCard title="What to work on" tone="improve" points={feedbackData.improvementPoints} />
      </div>

      {/* key moments */}
      <Card>
        <CardHeader title="Key moments" description="Moments in the conversation that made a difference." />
        <ol className="relative space-y-5 border-l border-white/[0.08] pl-6">
          {feedbackData.keyMoments.map((moment, idx) => {
            const good = moment.quality === "good";
            return (
              <li key={idx} className="relative">
                <span
                  className={cn(
                    "absolute -left-[31px] top-1 h-3 w-3 rounded-full ring-4 ring-[#181818]",
                    good ? "bg-emerald-400" : "bg-amber-400",
                  )}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-zinc-500 tabular-nums">{moment.timestamp}</span>
                  <Badge tone={good ? "green" : "amber"}>{good ? "Effective reply" : "Coaching note"}</Badge>
                </div>
                <p className="mt-1.5 text-base leading-relaxed text-zinc-200">{moment.note}</p>
              </li>
            );
          })}
        </ol>
      </Card>

      {/* growth */}
      <section>
        <SectionTitle title="Skill growth" action={<Badge tone="green">+15.4% overall</Badge>} />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SKILL_GROWTH.map((item) => (
            <Card key={item.skill} className="p-5">
              <p className="text-sm text-zinc-400">{item.skill}</p>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-semibold tracking-[-0.02em] text-white tabular-nums">{item.newScore}%</span>
                <span className="text-sm text-emerald-400">{item.delta}</span>
              </div>
              <ProgressBar value={item.newScore} className="mt-3" barClassName="bg-emerald-400" label={item.skill} />
            </Card>
          ))}
        </div>
      </section>

      {/* next step */}
      <section>
        <SectionTitle title="What's next" action={<Badge tone="green">Passed · {feedbackData.overallScore}%</Badge>} />
        <div className="grid gap-3 md:grid-cols-3">
          <NextStepCard
            recommended
            icon={BookOpen}
            title="Take the next class"
            text="Advanced technical diagnostics and incident escalations."
            cta="Start next class"
            onClick={handleGoToLesson}
          />
          <NextStepCard
            icon={RotateCcw}
            title="Practice this again"
            text="Work on your resolution timing and aim for 95% or higher."
            cta="Retry scenario"
            onClick={handlePracticeAgain}
          />
          <NextStepCard
            icon={Zap}
            title="Try a harder scenario"
            text="A level 2 escalation with several upset stakeholders."
            cta="Harder scenario"
            onClick={handleTryHarderSimulation}
          />
        </div>
      </section>

      <RecentSimulationsTable onLaunchSimulation={() => router.push("/user-dashboard/simulations")} />
    </div>
  );
});

function PointsCard({ title, tone, points }: { title: string; tone: "good" | "improve"; points: string[] }) {
  return (
    <Card>
      <CardHeader title={title} />
      <ul className="space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-zinc-300">
            <span
              className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                tone === "good" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400",
              )}
            >
              {tone === "good" ? <Check className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
            </span>
            {point}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function NextStepCard({
  icon: Icon,
  title,
  text,
  cta,
  onClick,
  recommended,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  cta: string;
  onClick: () => void;
  recommended?: boolean;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            recommended ? "bg-white/20 text-white" : "bg-orange-500/15 text-orange-400",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {recommended && <span className="rounded-full bg-black/25 px-2.5 py-1 text-xs font-medium">Recommended</span>}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
      <p className={cn("mt-1 text-sm", recommended ? "text-white/80" : "text-zinc-400")}>{text}</p>
      <Button variant={recommended ? "white" : "outline"} onClick={onClick} className="mt-6 w-full">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </>
  );

  return recommended ? (
    <BlobCard tone="orange" className="flex flex-col p-6 sm:p-6 [&>button]:mt-auto">
      {body}
    </BlobCard>
  ) : (
    <Card className="flex flex-col [&>button]:mt-auto">{body}</Card>
  );
}
