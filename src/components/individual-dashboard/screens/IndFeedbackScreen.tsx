"use client";

import React, { memo, useCallback } from "react";
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SimulationFeedback } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { RecentSimulationsTable } from "../RecentSimulationsTable";

import {
  VictorianCornerFlourish,
  EngravedSeal,
  LaurelEmblem,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";

interface IndFeedbackScreenProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const IndFeedbackScreen = memo(function IndFeedbackScreen({
  onNavigateToTab,
}: IndFeedbackScreenProps) {
  const router = useRouter();

  let contextValue: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useLearningLoop();
  } catch {
    contextValue = null;
  }
  const fallbackFeedback: SimulationFeedback = {
    scenarioId: "sim-1",
    scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
    overallScore: 92,
    skillScores: {
      communication: 95,
      empathy: 94,
      problemSolving: 90,
      activeListening: 92,
      conflictResolution: 89,
    },
    positiveHighlights: [
      "Immediate Emotional Validation: Validated caller frustration within 10s before policies.",
      "Positive Framing: Used 'What I can do right now...' rather than negative walls.",
      "Action Agreement: Set a clear follow-up email timestamp.",
    ],
    improvementPoints: [
      "Speed of Agreement: State resolution credit ~30s earlier.",
      "Summarizing Facts: Confirm order invoice # before confirming credit amount.",
    ],
    keyMoments: [
      {
        timestamp: "00:15",
        note: "Validated frustration with empathy. Strong tone control.",
        quality: "good",
      },
      {
        timestamp: "01:20",
        note: "Framed available credit options positively.",
        quality: "good",
      },
      {
        timestamp: "02:10",
        note: "Missed chance: State invoice verification earlier for protocol accuracy.",
        quality: "improve",
      },
    ],
    recommendedLessons: [
      "Lesson 4: Establishing Action Agreements",
      "Lesson 3: Non-Confrontational Phrasing",
    ],
    recommendedSimulations: [
      "L1 Diagnostics Under SLA Pressure",
      "Live Chat Resolution",
    ],
  };

  const feedbackData: SimulationFeedback = contextValue?.feedback || fallbackFeedback;

  const handlePracticeAgain = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("repeat_skill");
    }
    if (onNavigateToTab) {
      onNavigateToTab("simulations");
    } else {
      router.push("/user-dashboard/simulations");
    }
  }, [contextValue, onNavigateToTab, router]);

  const handleGoToLesson = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("next_class");
    }
    if (onNavigateToTab) {
      onNavigateToTab("classes");
    } else {
      router.push("/user-dashboard/classes");
    }
  }, [contextValue, onNavigateToTab, router]);

  const handleTryHarderSimulation = useCallback(() => {
    if (contextValue) {
      contextValue.chooseNextStep("harder_simulation");
    }
    if (onNavigateToTab) {
      onNavigateToTab("simulations");
    } else {
      router.push("/user-dashboard/simulations");
    }
  }, [contextValue, onNavigateToTab, router]);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block"
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>AI PERFORMANCE EVALUATION</span>
          </div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Simulation Result & Evaluation
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Scenario: {feedbackData.scenarioTitle}
          </p>
        </div>

        <button
          onClick={handlePracticeAgain}
          className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 relative z-10"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
          <span>Practice Again</span>
        </button>
      </div>

      {/* Overall Score & Skill Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Overall Score Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 rounded-xl p-5 border border-amber-200/70 text-center flex flex-col justify-center space-y-2 relative overflow-hidden">
          <EngravedSeal
            size={76}
            className="absolute -right-3 -bottom-3 text-amber-600/15 pointer-events-none"
          />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-stone-500 relative z-10">
            Overall Simulation Score
          </span>
          <div className="text-4xl sm:text-5xl font-black text-stone-900 font-mono tracking-tight relative z-10">
            {feedbackData.overallScore}%
          </div>
          <div className="inline-flex items-center justify-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mx-auto relative z-10">
            <TrendingUp className="w-3 h-3 text-emerald-700" />
            <span>High Performance</span>
          </div>
        </div>

        {/* Right: Evaluated Skill Radar Scores */}
        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-stone-200 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Skill Level Evaluation</span>
          </h3>

          <div className="space-y-2.5">
            {[
              { name: "Communication & Clarity", score: feedbackData.skillScores.communication, color: "bg-orange-500" },
              { name: "Empathy & Tone", score: feedbackData.skillScores.empathy, color: "bg-emerald-500" },
              { name: "Active Listening", score: feedbackData.skillScores.activeListening, color: "bg-amber-500" },
              { name: "Problem Solving", score: feedbackData.skillScores.problemSolving, color: "bg-indigo-500" },
              { name: "Conflict Resolution", score: feedbackData.skillScores.conflictResolution, color: "bg-rose-500" },
            ].map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-800">{sk.name}</span>
                  <span className="font-mono text-stone-900 font-bold">{sk.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div
                    className={cn("h-full rounded-full", sk.color)}
                    style={{ width: `${sk.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What You Did Well vs What to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Positive Highlights */}
        <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200 space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Strengths & Good Practices</span>
          </h3>
          <ul className="space-y-2">
            {feedbackData.positiveHighlights.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Points */}
        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200 space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Opportunities for Growth</span>
          </h3>
          <ul className="space-y-2">
            {feedbackData.improvementPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Dialogue Moments Timeline */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-amber-600" />
          <span>Key Conversation Moments</span>
        </h3>

        <div className="space-y-2.5">
          {feedbackData.keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className={cn(
                "p-3 rounded-lg border text-xs space-y-0.5 leading-relaxed",
                moment.quality === "good"
                  ? "bg-emerald-50/40 border-emerald-200 text-stone-800"
                  : "bg-amber-50/40 border-amber-200 text-stone-800"
              )}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-stone-600">Timestamp {moment.timestamp}</span>
                <span className={moment.quality === "good" ? "text-emerald-800 font-bold" : "text-amber-800 font-bold"}>
                  {moment.quality === "good" ? "Effective Response" : "Coaching Note"}
                </span>
              </div>
              <p>{moment.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demonstrated Skill Progress Growth Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 space-y-3.5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Demonstrated Skill Growth
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            +15.4% Gain
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { skill: "Active Listening", oldScore: 74, newScore: 92, delta: "+18%" },
            { skill: "De-escalation", oldScore: 78, newScore: 94, delta: "+16%" },
            { skill: "Positive Framing", oldScore: 70, newScore: 95, delta: "+25%" },
            { skill: "Action Agreements", oldScore: 65, newScore: 89, delta: "+24%" },
          ].map((item) => (
            <div key={item.skill} className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200 space-y-0.5">
              <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
                {item.skill}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-stone-900 font-mono">{item.newScore}%</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700">{item.delta}</span>
              </div>
              <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${item.newScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CORE STEP 6: WHAT SHOULD I DO NEXT? (RL AI Decision Engine) */}
      <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 sm:p-5 border border-amber-200/70 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-900 tracking-wider">
                GPS GUIDANCE
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                Next Recommended Step
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Mastery Approved (Score: 92%)
          </span>
        </div>

        {/* 3 AI Next Step Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card A: Next Class (Recommended) */}
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-300 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                  RECOMMENDED
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-semibold">Option 1</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                Advance to Next Class
              </h4>
              <p className="text-xs text-stone-600">
                Class: Advanced Technical Diagnostics & Incident Escalations
              </p>
            </div>
            <button
              onClick={handleGoToLesson}
              className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Take Next Class</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>

          {/* Card B: Repeat Skill */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-stone-500">Option 2</span>
              <h4 className="text-sm font-bold text-stone-900">
                Practice Scenario Again
              </h4>
              <p className="text-xs text-stone-500">
                Improve your resolution timing and target a 95%+ score.
              </p>
            </div>
            <button
              onClick={handlePracticeAgain}
              className="w-full py-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Scenario</span>
            </button>
          </div>

          {/* Card C: Harder Simulation */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-stone-500">Option 3</span>
              <h4 className="text-sm font-bold text-stone-900">
                Try Harder Scenario
              </h4>
              <p className="text-xs text-stone-500">
                Level 2 SLA Escalation with multiple angry stakeholders.
              </p>
            </div>
            <button
              onClick={handleTryHarderSimulation}
              className="w-full py-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Harder Scenario</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Historical Simulation Records Table */}
      <div className="pt-2">
        <RecentSimulationsTable
          onLaunchSimulation={() => router.push("/user-dashboard/simulations")}
        />
      </div>
    </div>
  );
});
