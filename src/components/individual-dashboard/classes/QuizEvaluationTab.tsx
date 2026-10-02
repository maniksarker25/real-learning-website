import React, { memo } from "react";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-900">
            Knowledge Evaluation
          </h4>
          <p className="text-xs text-stone-500">
            Test your understanding before entering the simulator.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-500">
          Attempt #{quizAttempts}
        </div>
      </div>

      {/* Quiz Submitted Score Banner */}
      {quizSubmitted && (
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-stone-500">
              Quiz Score
            </span>
            <div className="text-2xl font-black text-stone-900 font-mono">
              {calculatedScore}%
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              {calculatedScore >= 80
                ? "Great job! You demonstrate strong conceptual understanding."
                : "Review the lesson materials and retake the quiz to improve your score."}
            </p>
          </div>

          <button
            onClick={onRetakeQuiz}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
            <span>Retake</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {quiz.map((q, qIdx) => {
          const selectedOption = quizAnswers[q.id];
          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded bg-white border border-stone-200 flex items-center justify-center text-stone-800 font-mono text-xs font-bold shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                  {q.question}
                </h5>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2 pl-7">
                {q.options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = q.correctAnswerIndex === optIdx;
                  return (
                    <button
                      key={optionText}
                      onClick={() => onSelectOption(q.id, optIdx)}
                      className={cn(
                        "p-2.5 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer flex items-center justify-between",
                        isSelected
                          ? "bg-amber-50 border-amber-300 text-stone-900 font-semibold"
                          : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50",
                        quizSubmitted &&
                          isCorrect &&
                          "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold",
                        quizSubmitted &&
                          isSelected &&
                          !isCorrect &&
                          "bg-rose-50 border-rose-300 text-rose-950 font-semibold",
                      )}
                    >
                      <span>{optionText}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      )}
                      {quizSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {quizSubmitted && (
                <div className="ml-7 p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-600">
                  <span className="font-bold text-stone-800">
                    Explanation:{" "}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Quiz Button */}
      {!quizSubmitted ? (
        <div className="pt-1">
          <button
            onClick={onSubmitQuiz}
            className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Submit Quiz</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      ) : (
        /* Simulator CTA Banner */
        <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-bold uppercase mb-1">
              <span>STEP 3: PRACTICE SIMULATOR</span>
            </div>
            <h4 className="text-sm font-bold text-stone-900">
              Apply What You Learned in the Simulator
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Launch the roleplay simulation to practice customer communication
              with AI feedback.
            </p>
          </div>
          <button
            onClick={() =>
              onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
            }
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Launch Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>
      )}
    </div>
  );
});
