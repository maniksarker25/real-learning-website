import React, { memo } from "react";
import { CheckCircle2 } from "lucide-react";
import { LessonItem } from "./types";

interface LessonReaderTabProps {
  lessons: LessonItem[];
  activeLessonIndex: number;
  onSelectLessonIndex: (index: number) => void;
}

export const LessonReaderTab = memo(function LessonReaderTab({
  lessons,
  activeLessonIndex,
  onSelectLessonIndex,
}: LessonReaderTabProps) {
  const currentLesson = lessons[activeLessonIndex];
  if (!currentLesson) return null;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Lesson Navigation Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="text-xs text-stone-500 font-mono">
          Lesson {activeLessonIndex + 1} of {lessons.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={activeLessonIndex === 0}
            onClick={() =>
              onSelectLessonIndex(Math.max(0, activeLessonIndex - 1))
            }
            className="px-3 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 disabled:opacity-40 text-xs text-stone-700 border border-stone-200 cursor-pointer font-medium"
          >
            Previous
          </button>
          <button
            disabled={activeLessonIndex === lessons.length - 1}
            onClick={() =>
              onSelectLessonIndex(
                Math.min(lessons.length - 1, activeLessonIndex + 1),
              )
            }
            className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-xs text-white cursor-pointer font-semibold"
          >
            Next Lesson
          </button>
        </div>
      </div>

      {/* Lesson Body */}
      <div className="space-y-3.5">
        <h4 className="text-sm sm:text-base font-bold text-stone-900">
          {currentLesson.title}
        </h4>

        <div className="p-4 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 leading-relaxed">
          {currentLesson.content}
        </div>

        {/* Example Box */}
        <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-bold text-amber-900 flex items-center gap-1">
            <span>Workplace Example</span>
          </span>
          <div className="whitespace-pre-line text-stone-800 font-mono text-xs">
            {currentLesson.example}
          </div>
        </div>

        {/* Exercise Box */}
        <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-bold text-emerald-900 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Knowledge Check Exercise</span>
          </span>
          <p className="text-stone-700">{currentLesson.exercisePrompt}</p>
        </div>
      </div>
    </div>
  );
});
