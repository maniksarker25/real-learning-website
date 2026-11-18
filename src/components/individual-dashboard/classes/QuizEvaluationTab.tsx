import React, { memo } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlobCard, Button, PatriciaPose } from "@/components/dashboard/ui";
import { QuizQuestion } from "./types";

interface QuizEvaluationTabProps {
  quiz: QuizQuestion[];
  quizAnswers: { [qId: string]: number };
  onSelectOption: (qId: string, optionIdx: number) => void;
  quizSubmitted: boolean;
  onSubmitQuiz: () => void;
  onRetakeQuiz: () => void;
  quizAttempts: number;
  calculatedScore: number;
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const QuizEvaluationTab = memo(function QuizEvaluationTab({
  quiz,
  quizAnswers,
  onSelectOption,
  quizSubmitted,
  onSubmitQuiz,
  onRetakeQuiz,
  quizAttempts,
  calculatedScore,
  onLaunchPracticeSimulator,
}: QuizEvaluationTabProps) {
  const passed = calculatedScore >= 80;

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-xl font-semibold tracking-[-0.01em] text-white">Quick quiz</h4>
          <p className="mt-1 text-sm text-zinc-400">Check what you learned before you practice.</p>
        </div>
        <span className="shrink-0 text-sm text-zinc-500">Attempt {quizAttempts}</span>
      </div>

      {quizSubmitted && (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-zinc-500">Your score</p>
            <p className={cn("text-4xl font-semibold tabular-nums", passed ? "text-emerald-400" : "text-white")}>
              {calculatedScore}%
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {passed ? "Great job. You've got the key ideas." : "Look back over the lessons and try again."}
            </p>
          </div>
          <Button variant="outline" onClick={onRetakeQuiz}>
            <RotateCcw className="h-4 w-4" />
            Retake
          </Button>
        </div>
      )}

      <ol className="space-y-4">
        {quiz.map((q, qIdx) => {
          const selectedOption = quizAnswers[q.id];
          return (
            <li key={q.id} className="rounded-2xl border border-white/[0.06] p-4 sm:p-5">
              <p className="flex gap-3 text-base font-medium text-white">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-sm text-zinc-300">
                  {qIdx + 1}
                </span>
                <span className="pt-0.5">{q.question}</span>
              </p>

              <div className="mt-4 grid gap-2 sm:pl-10" role="radiogroup" aria-label={`Question ${qIdx + 1}`}>
                {q.options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = q.correctAnswerIndex === optIdx;
                  const showRight = quizSubmitted && isCorrect;
                  const showWrong = quizSubmitted && isSelected && !isCorrect;
                  return (
                    <button
                      key={optionText}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onSelectOption(q.id, optIdx)}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors",
                        showRight
                          ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                          : showWrong
                            ? "border-rose-500/50 bg-rose-500/10 text-white"
                            : isSelected
                              ? "border-orange-500 bg-orange-500 text-black"
                              : "border-white/[0.08] text-zinc-300 hover:border-white/25 hover:text-white",
                      )}
                    >
                      <span>{optionText}</span>
                      {showRight && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />}
                      {showWrong && <XCircle className="h-5 w-5 shrink-0 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:pl-10">
                  <span className="font-medium text-white">Why: </span>
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!quizSubmitted ? (
        <Button variant="white" size="lg" className="mt-6 w-full" onClick={onSubmitQuiz}>
          Submit answers
          <ArrowRight className="h-5 w-5" />
        </Button>
      ) : (
        <BlobCard tone="orange" className="mt-6 sm:pr-44">
          <h4 className="text-xl font-semibold tracking-[-0.01em]">Now practice it with Patricia</h4>
          <p className="mt-2 max-w-md text-base text-white/85">
            Use what you learned in a text chat with an upset customer.
          </p>
          <Button variant="white" size="lg" className="mt-5" onClick={() => onLaunchPracticeSimulator?.("sim-1")}>
            Start practice
            <ArrowRight className="h-5 w-5" />
          </Button>
          <PatriciaPose pose="pointing" className="absolute bottom-0 right-6 hidden h-44 w-32 -scale-x-100 sm:block" sizes="128px" />
        </BlobCard>
      )}
    </div>
  );
});
