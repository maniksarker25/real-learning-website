import React, { memo } from "react";
import { BookOpen, Sparkles } from "lucide-react";

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
    <div className="min-h-[400px] bg-white rounded-xl border border-stone-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden space-y-6">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Step 2: Preparing Class Modules</span>
      </div>

      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
        <BookOpen className="w-8 h-8" />
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-lg font-bold text-stone-900 tracking-tight">
          Loading Curriculum
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed">
          Compiling lessons and evaluations for{" "}
          <strong className="text-stone-800 font-semibold">{activeGoal}</strong>
          .
        </p>
      </div>

      <div className="w-full max-w-md space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-500">Progress</span>
          <span className="text-stone-800 font-bold">{loadingProgress}%</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full border border-stone-200 overflow-hidden">
          <div
            className="h-full bg-orange-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>

      <button
        onClick={onSkip}
        className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer transition-colors"
      >
        Skip & enter class immediately
      </button>
    </div>
  );
});
