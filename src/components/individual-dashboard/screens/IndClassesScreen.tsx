"use client";

import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import { FileText, HelpCircle } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import {
  IndClassesScreenProps,
  getSampleClasses,
  ClassesLoadingView,
  ClassesHeader,
  LessonReaderTab,
  QuizEvaluationTab,
  ClassPracticePromptCard,
} from "../classes";

export const IndClassesScreen = memo(function IndClassesScreen({
  onLaunchPracticeSimulator,
}: IndClassesScreenProps) {
  const { session } = useAccount();
  const activeGoal = session.goal || "Customer Service";

  // Step 2 Loading Screen State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(15);

    const timer1 = setTimeout(() => {
      setLoadingProgress(55);
    }, 350);

    const timer2 = setTimeout(() => {
      setLoadingProgress(85);
    }, 750);

    const timer3 = setTimeout(() => {
      setLoadingProgress(100);
    }, 1050);

    const timer4 = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Selected Class & Quiz State
  const [selectedClassId] = useState<string>("class-1");
  const [activeTab, setActiveTab] = useState<"lessons" | "quiz">("lessons");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Quiz Engine State
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(1);

  const sampleClasses = useMemo(() => getSampleClasses(), []);

  const currentClass = useMemo(
    () =>
      sampleClasses.find((c) => c.id === selectedClassId) || sampleClasses[0],
    [sampleClasses, selectedClassId],
  );

  const handleSelectOption = useCallback(
    (qId: string, optionIdx: number) => {
      if (quizSubmitted) return;
      setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    },
    [quizSubmitted],
  );

  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true);
  }, []);

  const handleRetakeQuiz = useCallback(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizAttempts((prev) => prev + 1);
  }, []);

  const calculatedQuizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    let correct = 0;
    currentClass.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / currentClass.quiz.length) * 100);
  }, [quizSubmitted, currentClass.quiz, quizAnswers]);

  if (isLoading) {
    return (
      <ClassesLoadingView
        activeGoal={activeGoal}
        loadingProgress={loadingProgress}
        onSkip={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className="space-y-5">
      <ClassesHeader
        onLaunchPracticeSimulator={onLaunchPracticeSimulator}
      />

      {/* Main Class Card & Reader Frame */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {/* Class Title Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50/50">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100/70 text-amber-900 border border-amber-200">
              {currentClass.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">
              {currentClass.title}
            </h3>
          </div>

          {/* Sub Tab Switcher: Lessons vs Quiz */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200 shrink-0">
            <button
              onClick={() => setActiveTab("lessons")}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5",
                activeTab === "lessons"
                  ? "bg-stone-900 text-white font-bold"
                  : "text-stone-600 hover:text-stone-950",
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lessons ({currentClass.lessons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5",
                activeTab === "quiz"
                  ? "bg-stone-900 text-white font-bold"
                  : "text-stone-600 hover:text-stone-950",
              )}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz ({currentClass.quiz.length} Qs)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Lesson Reader */}
        {activeTab === "lessons" && (
          <LessonReaderTab
            lessons={currentClass.lessons}
            activeLessonIndex={activeLessonIndex}
            onSelectLessonIndex={setActiveLessonIndex}
          />
        )}

        {/* Tab 2: Quiz Evaluation */}
        {activeTab === "quiz" && (
          <QuizEvaluationTab
            quiz={currentClass.quiz}
            quizAnswers={quizAnswers}
            onSelectOption={handleSelectOption}
            quizSubmitted={quizSubmitted}
            onSubmitQuiz={handleQuizSubmit}
            onRetakeQuiz={handleRetakeQuiz}
            quizAttempts={quizAttempts}
            calculatedScore={calculatedQuizScore}
            onLaunchPracticeSimulator={onLaunchPracticeSimulator}
          />
        )}
      </div>

      {/* Practice Layer Card visible on Lessons tab */}
      {activeTab === "lessons" && (
        <ClassPracticePromptCard
          onLaunchPracticeSimulator={onLaunchPracticeSimulator}
        />
      )}
    </div>
  );
});
