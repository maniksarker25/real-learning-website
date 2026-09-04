"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Class Fundamentals & Knowledge Checks</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5 max-w-xl">
            Study key principles and take the quiz before entering the
            simulator, or skip directly to the practice layer.
          </p>
        </div>

        {/* Quick Action Buttons: Skip Class or Jump to Simulator */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() =>
              onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
            }
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Skip Class & Start Simulation</span>
          </button>
        </div>
      </div>

      {/* Main Class Card & Reader Frame */}
      <div className="bg-[#12131c]/90 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        {/* Class Title Bar */}
        <div className="p-5 bg-black/40 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-500/10 text-orange-300 border border-orange-400/20">
              {currentClass.category}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              {currentClass.title}
            </h3>
          </div>

          {/* Sub Tab Switcher: Lessons vs Quiz */}
          <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("lessons")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5",
                activeTab === "lessons"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  : "text-white/60 hover:text-white",
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lessons ({currentClass.lessons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5",
                activeTab === "quiz"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  : "text-white/60 hover:text-white",
              )}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz ({currentClass.quiz.length} Qs)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LESSON READER */}
        {activeTab === "lessons" && (
          <div className="p-6 space-y-6">
            {/* Lesson Navigation Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="text-xs text-white/50 font-mono">
                Lesson {activeLessonIndex + 1} of {currentClass.lessons.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={() =>
                    setActiveLessonIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="px-3 py-1 rounded-lg bg-white/5 disabled:opacity-30 text-xs text-white border border-white/10 cursor-pointer"
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
                  className="px-3 py-1 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-extrabold cursor-pointer"
                >
                  Next Lesson
                </button>
              </div>
            </div>

            {/* Current Lesson Body */}
            {currentClass.lessons[activeLessonIndex] && (
              <div className="space-y-5">
                <h4 className="text-lg font-bold text-white">
                  {currentClass.lessons[activeLessonIndex].title}
                </h4>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-white/80 leading-relaxed">
                  {currentClass.lessons[activeLessonIndex].content}
                </div>

                {/* Example Box */}
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-400/30 text-xs space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-orange-400 flex items-center gap-1">
                    <span>Real Workplace Example</span>
                  </span>
                  <div className="whitespace-pre-line text-white/90 font-mono text-[11px]">
                    {currentClass.lessons[activeLessonIndex].example}
                  </div>
                </div>

                {/* Exercise Box */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Knowledge Check Exercise</span>
                  </span>
                  <p className="text-white/80">
                    {currentClass.lessons[activeLessonIndex].exercisePrompt}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUIZ EVALUATION */}
        {activeTab === "quiz" && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  Understanding Check Quiz
                </h4>
                <p className="text-xs text-white/60">
                  Measure your conceptual understanding before starting
                  practical simulations.
                </p>
              </div>

              <div className="text-xs font-mono text-white/60">
                Attempt #{quizAttempts}
              </div>
            </div>

            {/* Quiz Submitted Score Banner */}
            {quizSubmitted && (
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/50">
                    QUIZ EVALUATION SCORE
                  </span>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {calculatedQuizScore}%
                  </div>
                  <p className="text-xs text-white/70 mt-0.5">
                    {calculatedQuizScore >= 80
                      ? "Great job! You demonstrate strong conceptual understanding."
                      : "Review the lesson materials and retake the quiz to improve your score."}
                  </p>
                </div>

                <button
                  onClick={handleRetakeQuiz}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {currentClass.quiz.map((q, qIdx) => {
                const selectedOption = quizAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        {q.question}
                      </h5>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 gap-2 pl-9">
                      {q.options.map((optionText, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        const isCorrect = q.correctAnswerIndex === optIdx;
                        return (
                          <button
                            key={optionText}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={cn(
                              "p-3 rounded-xl border text-left text-xs font-medium transition-colors cursor-pointer flex items-center justify-between",
                              isSelected
                                ? "bg-orange-500/10 border-orange-400 text-white"
                                : "bg-black/40 border-white/10 text-white/70 hover:border-white/20 hover:text-white",
                              quizSubmitted &&
                                isCorrect &&
                                "bg-emerald-500/20 border-emerald-500 text-emerald-300",
                              quizSubmitted &&
                                isSelected &&
                                !isCorrect &&
                                "bg-rose-500/20 border-rose-500 text-rose-300",
                            )}
                          >
                            <span>{optionText}</span>
                            {quizSubmitted && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {quizSubmitted && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation when submitted */}
                    {quizSubmitted && (
                      <div className="ml-9 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70">
                        <span className="font-bold text-orange-400">
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
              <div className="pt-2">
                <button
                  onClick={handleQuizSubmit}
                  className="w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Quiz & Evaluate Understanding</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Practice Layer Banner after Quiz Submission */
              <div className="bg-gradient-to-br from-rose-500/20 via-[#161726] to-[#0e0f18] rounded-2xl p-6 border border-rose-400/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-mono font-bold uppercase mb-2">
                    <span>STEP 3: PRACTICE LAYER (SIMULATOR)</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white">
                    Apply What You Learned in the Simulator
                  </h4>
                  <p className="text-xs text-white/70 mt-1 max-w-xl">
                    The simulator is NOT a separate feature—it is your practice
                    layer for what you just learned. Enter the realistic
                    tech-support scenario now to demonstrate your skills.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onLaunchPracticeSimulator &&
                    onLaunchPracticeSimulator("sim-1")
                  }
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-xs font-black transition-all shadow-lg hover:shadow-rose-500/20 cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <span>Launch Practice Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Practice Layer Card visible on Lessons tab as well */}
      {activeTab === "lessons" && (
        <div className="bg-gradient-to-br from-orange-500/10 via-[#12131c] to-[#0git config --local --listd0e14] rounded-2xl p-5 border border-orange-400/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-white">
              Ready to test your active listening in a realistic situation?
            </h4>
            <p className="text-xs text-white/60 mt-0.5">
              Jump straight into the practice simulator for this class.
            </p>
          </div>
          <button
            onClick={() =>
              onLaunchPracticeSimulator && onLaunchPracticeSimulator("sim-1")
            }
            className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Practice Simulator Layer</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </button>
        </div>
      )}
    </div>
  );
});
