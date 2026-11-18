import React, { memo } from "react";
import { Card, PatriciaPose, ProgressBar } from "@/components/dashboard/ui";

interface ClassesLoadingViewProps {
  activeGoal: string;
  loadingProgress: number;
  onSkip: () => void;
}

export const ClassesLoadingView = memo(function ClassesLoadingView({
  activeGoal,
  loadingProgress,
  onSkip,
}: ClassesLoadingViewProps) {
  return (
    <Card className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center sm:p-12">
      <PatriciaPose pose="thinking" className="h-36 w-24" sizes="96px" />
      <h3 className="mt-6 text-xl font-semibold text-white">Preparing your class</h3>
      <p className="mt-2 max-w-sm text-base text-zinc-400">
        Getting lessons and a quick quiz ready for <span className="text-white">{activeGoal}</span>.
      </p>

      <div className="mt-8 w-full max-w-sm">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-zinc-500">Loading</span>
          <span className="text-white tabular-nums">{loadingProgress}%</span>
        </div>
        <ProgressBar value={loadingProgress} label="Loading class" className="h-2" />
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="mt-6 text-sm text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
      >
        Skip and open the class
      </button>
    </Card>
  );
});
