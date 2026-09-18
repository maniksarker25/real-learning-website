"use client";

import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  FileText,
  Zap,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { ClassModule, QuizQuestion } from "@/types/individual";
import { cn } from "@/lib/utils";

interface IndClassesScreenProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const IndClassesScreen = memo(function IndClassesScreen({
  onLaunchPracticeSimulator,
}: IndClassesScreenProps) {
  const { session } = useAccount();
  const activeGoal = session.goal || "Customer Service";

  // Step 2 Loading Screen State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(15);
    setLoadingStage(0);

    const timer1 = setTimeout(() => {
      setLoadingProgress(55);
      setLoadingStage(1);
    }, 350);

    const timer2 = setTimeout(() => {
      setLoadingProgress(85);
      setLoadingStage(2);
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
  const [selectedClassId, setSelectedClassId] = useState<string>("class-1");
  const [activeTab, setActiveTab] = useState<"lessons" | "quiz">("lessons");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Quiz Engine State
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(1);

  const sampleClasses: ClassModule[] = useMemo(
    () => [
      {
        id: "class-1",
        title: `Customer Communication & De-escalation Mastery`,
        category: "Customer Service & Empathy",
        description:
          "Learn key de-escalation strategies, active listening techniques, and professional phrasing for tough workplace scenarios.",
        estimatedDuration: "45 mins",
        progress: 67,
        isCompleted: false,
        lessons: [
          {
            id: "l1",
            title: "Lesson 1: Understanding Customer Psychology Under Stress",
            duration: "10 mins",
            content:
              "When customers encounter unexpected product failures or delay issues, their emotional response precedes logic. De-escalation begins by validating their emotional state without admitting unverified fault.",
            example:
              "Customer: 'This service breakdown lost me hours of work!' \nRight approach: 'I completely understand how frustrating that delay is, and I am stepping in right now to resolve this for you.'",
            exercisePrompt:
              "Practice rephrasing: 'That's our policy' to an empathetic, customer-centric response.",
            isCompleted: true,
          },
          {
            id: "l2",
            title: "Lesson 2: Active Listening & Echo Statements",
            duration: "12 mins",
            content:
              "Active listening requires repeating key facts stated by the user to demonstrate comprehension before offering solutions.",
            example:
              "Echo Statement: 'If I understand correctly, you need your shipment rerouted to the Chicago branch by 3 PM today, correct?'",
            exercisePrompt:
              "Identify the 2 core facts in the user's grievance before responding.",
            isCompleted: true,
          },
          {
            id: "l3",
            title: "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
            duration: "12 mins",
            content:
              "Avoid negative absolute words ('can't', 'impossible', 'no'). Frame constraints around what CAN be done immediately.",
            example:
              "Instead of: 'We can't refund this after 30 days.' \nUse: 'What I can do right now is apply full account credit towards your next invoice.'",
            exercisePrompt:
              "Transform negative policy statements into positive action options.",
            isCompleted: true,
          },
          {
            id: "l4",
            title: "Lesson 4: Establishing Control & Action Agreements",
            duration: "11 mins",
            content:
              "Guide the conversation to action steps with explicit timelines and direct follow-up commitments.",
            example:
              "Action Agreement: 'I will personally inspect your account status and update you by 2 PM via email.'",
            exercisePrompt: "Draft an action agreement with clear timestamps.",
            isCompleted: false,
          },
        ],
        quiz: [
          {
            id: "q1",
            question:
              "What is the primary goal of an echo statement during customer de-escalation?",
            options: [
              "To argue against customer claims",
              "To demonstrate active listening and verify core facts",
              "To delay providing a solution",
              "To transfer the customer to another agent",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Echo statements confirm understanding and show the customer their issue has been heard accurately.",
          },
          {
            id: "q2",
            question:
              "Which of the following phrases represents positive framing?",
            options: [
              "We cannot help you with that request.",
              "That is strictly against our policy.",
              "What I can do right now is issue account credit for your next order.",
              "You should have read the terms earlier.",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Positive framing focuses on actionable options available right now rather than negative policy walls.",
          },
          {
            id: "q3",
            question:
              "When a customer is emotionally elevated, what should be addressed first?",
            options: [
              "Technical product architecture",
              "Validating their frustration before diving into logistics",
              "Billing escalation forms",
              "Interrupting them to give instant advice",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Emotional validation calms hostility so the customer can process logical solutions.",
          },
        ],
      },
    ],
    [],
  );

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
      <div className="min-h-[400px] bg-white rounded-xl border border-stone-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden space-y-6">
        {/* Step Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Step 2: Preparing Class Modules</span>
        </div>

        {/* Visual Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
          <BookOpen className="w-8 h-8" />
        </div>

        {/* Heading & Subtext */}
        <div className="max-w-md space-y-1">
          <h3 className="text-lg font-bold text-stone-900 tracking-tight">
            Loading Curriculum
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Compiling lessons and evaluations for <strong className="text-stone-800 font-semibold">{activeGoal}</strong>.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500">Progress</span>
            <span className="text-stone-800 font-bold">{loadingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full border border-stone-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Skip Link */}
        <button
          onClick={() => setIsLoading(false)}
          className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer transition-colors"
        >
          Skip & enter class immediately
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>Class Fundamentals</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Learn core techniques, complete the knowledge check, or jump straight to practice.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
            }
            className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Skip to Simulator →</span>
          </button>
        </div>
      </div>

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

        {/* TAB 1: LESSON READER */}
        {activeTab === "lessons" && (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Lesson Navigation Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="text-xs text-stone-500 font-mono">
                Lesson {activeLessonIndex + 1} of {currentClass.lessons.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={() =>
                    setActiveLessonIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="px-3 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 disabled:opacity-40 text-xs text-stone-700 border border-stone-200 cursor-pointer font-medium"
                >
                  Previous
                </button>
                <button
                  disabled={
                    activeLessonIndex === currentClass.lessons.length - 1
                  }
                  onClick={() =>
                    setActiveLessonIndex((prev) =>
                      Math.min(currentClass.lessons.length - 1, prev + 1),
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-xs text-white cursor-pointer font-semibold"
                >
                  Next Lesson
                </button>
              </div>
            </div>

            {/* Current Lesson Body */}
            {currentClass.lessons[activeLessonIndex] && (
              <div className="space-y-3.5">
                <h4 className="text-sm sm:text-base font-bold text-stone-900">
                  {currentClass.lessons[activeLessonIndex].title}
                </h4>

                <div className="p-4 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 leading-relaxed">
                  {currentClass.lessons[activeLessonIndex].content}
                </div>

                {/* Example Box */}
                <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-900 flex items-center gap-1">
                    <span>Workplace Example</span>
                  </span>
                  <div className="whitespace-pre-line text-stone-800 font-mono text-xs">
                    {currentClass.lessons[activeLessonIndex].example}
                  </div>
                </div>

                {/* Exercise Box */}
                <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Knowledge Check Exercise</span>
                  </span>
                  <p className="text-stone-700">
                    {currentClass.lessons[activeLessonIndex].exercisePrompt}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUIZ EVALUATION */}
        {activeTab === "quiz" && (
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
                    {calculatedQuizScore}%
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {calculatedQuizScore >= 80
                      ? "Great job! You demonstrate strong conceptual understanding."
                      : "Review the lesson materials and retake the quiz to improve your score."}
                  </p>
                </div>

                <button
                  onClick={handleRetakeQuiz}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
                  <span>Retake</span>
                </button>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {currentClass.quiz.map((q, qIdx) => {
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
                            onClick={() => handleSelectOption(q.id, optIdx)}
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
                  onClick={handleQuizSubmit}
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Submit Quiz</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </button>
              </div>
            ) : (
              /* Practice Layer Banner after Quiz Submission */
              <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-bold uppercase mb-1">
                    <span>STEP 3: PRACTICE SIMULATOR</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Apply What You Learned in the Simulator
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Launch the roleplay simulation to practice customer communication with AI feedback.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onLaunchPracticeSimulator &&
                    onLaunchPracticeSimulator("sim-1")
                  }
                  className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Practice Layer Card visible on Lessons tab as well */}
      {activeTab === "lessons" && (
        <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-900">
              Ready to practice in a realistic scenario?
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter the practice simulator for this class.
            </p>
          </div>
          <button
            onClick={() =>
              onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
            }
            className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Open Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>
      )}
    </div>
  );
});
