"use client";

import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import { useAccount } from "@/context/AccountContext";
import { Badge, Segmented } from "@/components/dashboard/ui";
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
    <div className="space-y-6">
      <ClassesHeader
        onLaunchPracticeSimulator={onLaunchPracticeSimulator}
      />

      <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#181818]">
        <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <Badge tone="orange">{currentClass.category}</Badge>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">{currentClass.title}</h3>
          </div>
          <Segmented
            label="Class sections"
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { value: "lessons", label: `Lessons (${currentClass.lessons.length})` },
              { value: "quiz", label: `Quiz (${currentClass.quiz.length})` },
            ]}
          />
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
