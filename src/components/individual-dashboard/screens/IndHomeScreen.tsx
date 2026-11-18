"use client";

import { memo } from "react";
import { ArrowRight, BookOpen, CheckCircle2, MessageSquare, Target, TrendingUp, Zap } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { cn } from "@/lib/utils";
import {
  BlobCard,
  Button,
  Card,
  PageHeader,
  PatriciaPose,
  StatGrid,
  StatTile,
} from "@/components/dashboard/ui";
import { RecentSimulationsTable } from "../RecentSimulationsTable";

interface IndHomeScreenProps {
  onNavigateToTab: (tabId: string) => void;
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

/** The four stages of the learning loop, in order. */
const STAGES = [
  { step: "pathfinder", tab: "pathfinder", label: "Pick a path" },
  { step: "class", tab: "classes", label: "Learn" },
  { step: "simulator", tab: "simulations", label: "Practice" },
  { step: "feedback", tab: "feedback", label: "Feedback" },
] as const;

export const IndHomeScreen = memo(function IndHomeScreen({ onNavigateToTab, onLaunchSimulation }: IndHomeScreenProps) {
  const { session } = useAccount();
  const { activePath, currentStep } = useLearningLoop();

  const firstName = (session.name || "Sarah Jenkins").split(" ")[0];
  const pathTitle = activePath?.title || "Technical Support Specialist";
  // skill_progress / next_step are not listed, they belong to the feedback stage
  const found = STAGES.findIndex((s) => s.step === currentStep);
  const activeIndex = found === -1 ? 3 : found;
  const current = STAGES[activeIndex];

  const startSimulation = () => {
    onLaunchSimulation?.("Handling an Upset Customer Requesting Immediate Refund");
    onNavigateToTab("simulations");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Home"
        title={`Welcome back, ${firstName}`}
        description={`Goal: ${session.goal || "Customer Service"}. Learn, practice with Patricia, then review your feedback.`}
        actions={
          <Button variant="outline" onClick={() => onNavigateToTab("goals")}>
            <Target className="h-4 w-4" />
            My goals
          </Button>
        }
      />

      {/* continue card */}
      <BlobCard tone="orange" className="sm:pr-56">
        <p className="text-sm font-medium text-white/80">Continue where you left off</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">{pathTitle}</h2>

        <ol className="mt-6 grid max-w-xl grid-cols-4 gap-2">
          {STAGES.map((s, i) => (
            <li key={s.step}>
              <div className={cn("h-1 rounded-full", i <= activeIndex ? "bg-white" : "bg-white/25")} />
              <p className={cn("mt-2 text-xs sm:text-sm", i === activeIndex ? "font-medium text-white" : "text-white/60")}>
                {s.label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-wrap gap-2">
          <Button variant="white" size="lg" onClick={() => onNavigateToTab(current.tab)}>
            Continue: {current.label}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            onClick={() => onNavigateToTab("pathfinder")}
            className="border border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            Change path
          </Button>
        </div>

        <PatriciaPose pose="pointing" className="absolute bottom-0 right-6 hidden h-60 w-44 -scale-x-100 sm:block" sizes="176px" />
      </BlobCard>

      <StatGrid>
        <StatTile label="Classes" value="3" note="1 in progress" icon={BookOpen} />
        <StatTile label="Simulations" value="5" note="3 completed" icon={Zap} />
        <StatTile label="Quiz average" value="92.5%" note="Your best yet" icon={CheckCircle2} noteTone="positive" />
        <StatTile label="Simulation average" value="89%" note="+14.2% this month" icon={TrendingUp} noteTone="positive" />
      </StatGrid>

      {/* quick actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <QuickAction
          icon={Zap}
          title="Start a simulation"
          text="Handle an upset customer asking for a refund."
          onClick={startSimulation}
        />
        <QuickAction
          icon={MessageSquare}
          title="Review feedback"
          text="See what Patricia noticed in your last session."
          onClick={() => onNavigateToTab("feedback")}
        />
      </div>

      <RecentSimulationsTable onLaunchSimulation={onLaunchSimulation} />
    </div>
  );
});

function QuickAction({
  icon: Icon,
  title,
  text,
  onClick,
}: {
  icon: typeof Zap;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <Card as="article" className="p-0">
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center gap-4 rounded-3xl p-5 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-medium text-white">{title}</span>
          <span className="block text-sm text-zinc-500">{text}</span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-zinc-600 transition-colors group-hover:text-white" />
      </button>
    </Card>
  );
}
