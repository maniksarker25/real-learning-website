import React, { memo } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { Button, ProgressBar } from "@/components/dashboard/ui";
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

  const isFirst = activeLessonIndex === 0;
  const isLast = activeLessonIndex === lessons.length - 1;

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="shrink-0 text-sm text-zinc-500">
          Lesson {activeLessonIndex + 1} of {lessons.length}
        </span>
        <ProgressBar value={activeLessonIndex + 1} max={lessons.length} label="Lesson progress" />
      </div>

      <article className="max-w-3xl">
        <h4 className="text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">{currentLesson.title}</h4>
        <p className="mt-4 text-base leading-relaxed text-zinc-300">{currentLesson.content}</p>

        <div className="mt-6 rounded-2xl bg-white/[0.03] p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-orange-400">
            <MessageSquareQuote className="h-4 w-4" />
            Example at work
          </p>
          <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-zinc-200">{currentLesson.example}</p>
        </div>

        <div className="mt-3 rounded-2xl bg-white/[0.03] p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Try this
          </p>
          <p className="mt-2 text-base leading-relaxed text-zinc-200">{currentLesson.exercisePrompt}</p>
        </div>
      </article>

      <div className="mt-8 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-5">
        <Button variant="outline" disabled={isFirst} onClick={() => onSelectLessonIndex(Math.max(0, activeLessonIndex - 1))}>
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="white"
          disabled={isLast}
          onClick={() => onSelectLessonIndex(Math.min(lessons.length - 1, activeLessonIndex + 1))}
        >
          Next lesson
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});
