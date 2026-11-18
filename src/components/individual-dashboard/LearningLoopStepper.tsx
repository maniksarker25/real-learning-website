"use client";

import React, { memo, useCallback } from "react";
import { BookOpen, Check, Compass, Lock, MessageSquare, Zap } from "lucide-react";
import { LearningLoopStep } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { usePathname, useRouter } from "next/navigation";

interface LearningLoopStepperProps {
  currentStep?: LearningLoopStep;
  onSelectStep?: (step: LearningLoopStep) => void;
  activePathTitle?: string;
}

const STEPS: {
  id: LearningLoopStep;
  label: string;
  subLabel: string;
  route: string;
  icon: React.ElementType;
}[] = [
  {
    id: "pathfinder",
    label: "Pick a path",
    subLabel: "Where you are",
    route: "/user-dashboard/pathfinder",
    icon: Compass,
  },
  {
    id: "class",
    label: "Learn",
    subLabel: "Short lessons",
    route: "/user-dashboard/classes",
    icon: BookOpen,
  },
  {
    id: "simulator",
    label: "Practice",
    subLabel: "Chat with Patricia",
    route: "/user-dashboard/simulations",
    icon: Zap,
  },
  {
    id: "feedback",
    label: "Feedback",
    subLabel: "What to improve",
    route: "/user-dashboard/feedback",
    icon: MessageSquare,
  },
];

export const LearningLoopStepper = memo(function LearningLoopStepper({
  currentStep: propCurrentStep,
  onSelectStep: propOnSelectStep,
  activePathTitle: propActivePathTitle,
}: LearningLoopStepperProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Try consuming LearningLoopContext if available
  const contextValue: ReturnType<typeof useLearningLoop> | null = useLearningLoop();

  // Derive active step from contextValue or route
  const derivedStepFromRoute: LearningLoopStep | null = React.useMemo(() => {
    if (pathname.includes("/user-dashboard/pathfinder")) return "pathfinder";
    if (pathname.includes("/user-dashboard/classes")) return "class";
    if (pathname.includes("/user-dashboard/simulations")) return "simulator";
    if (pathname.includes("/user-dashboard/feedback")) return "feedback";
    return null;
  }, [pathname]);

  const activeStep: LearningLoopStep =
    propCurrentStep ||
    (pathname === "/user-dashboard/practice" || pathname === "/user-dashboard"
      ? contextValue?.currentStep || "pathfinder"
      : derivedStepFromRoute || contextValue?.currentStep || "pathfinder");

  const activePathTitle =
    propActivePathTitle ||
    contextValue?.activePath?.title ||
    "Customer service and communication";

  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === activeStep)
  );
  const maxUnlockedStepIndex = contextValue?.maxUnlockedStepIndex ?? 0;

  const handleStepClick = useCallback(
    (step: (typeof STEPS)[number], idx: number) => {
      // Prevent navigation if step is locked
      const isUnlocked = contextValue
        ? contextValue.isStepUnlocked(step.id)
        : idx <= maxUnlockedStepIndex;

      if (!isUnlocked) {
        return;
      }

      if (propOnSelectStep) {
        propOnSelectStep(step.id);
        return;
      }

      if (contextValue) {
        contextValue.setStep(step.id);
      }

      if (pathname !== "/user-dashboard/practice") {
        router.push("/user-dashboard/practice");
      }
    },
    [propOnSelectStep, contextValue, maxUnlockedStepIndex, pathname, router]
  );

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#181818] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-sm text-zinc-400">
          Path: <span className="font-medium text-white">{activePathTitle}</span>
        </p>
        <p className="text-sm text-zinc-500">
          Step {currentStepIndex + 1} of {STEPS.length}
        </p>
      </div>

      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === step.id;
          // Passed = before the current step, or marked completed in context
          const isPassed =
            idx < currentStepIndex ||
            (contextValue ? contextValue.isStepCompleted(step.id) && !isCurrent : false);
          const isLocked = !isCurrent && !isPassed;

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => !isLocked && handleStepClick(step, idx)}
                disabled={isLocked}
                aria-current={isCurrent ? "step" : undefined}
                title={isLocked ? `Locked: finish step ${idx} first` : step.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors",
                  isCurrent && "bg-orange-500 text-black",
                  isPassed && "bg-white/[0.04] text-white hover:bg-white/[0.07]",
                  isLocked && "cursor-not-allowed text-zinc-600",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    isCurrent ? "bg-black/15" : isPassed ? "bg-orange-500/15 text-orange-400" : "bg-white/[0.04]",
                  )}
                >
                  {isPassed ? <Check className="h-4 w-4" /> : isLocked ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{step.label}</span>
                  <span className={cn("block truncate text-sm", isCurrent ? "text-black/65" : "text-zinc-500")}>
                    {isLocked ? "Locked" : step.subLabel}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
});
