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
      "Immediate Emotional Validation: You validated the caller's frustration within the first 10 seconds before discussing policies.",
      "Positive Framing: Used 'What I can do right now...' instead of 'We can't...'.",
      "Explicit Action Agreement: Set a clear 2 PM email update follow-up timestamp.",
    ],
    improvementPoints: [
      "Speed of Agreement: State the specific resolution credit option ~30 seconds earlier in the interaction.",
      "Summarizing Facts: Confirm order invoice # before confirming the credit amount.",
    ],
    keyMoments: [
      {
        timestamp: "00:15",
        note: "Customer expressed anger over 5-day delay. You responded with empathy ('I completely understand how frustrating that delay is...'). Excellent tone control.",
        quality: "good",
      },
      {
        timestamp: "01:20",
        note: "Customer demanded immediate refund. You framed available credit options positively ('What I can do right now...').",
        quality: "good",
      },
      {
        timestamp: "02:10",
        note: "Opportunity missed: State invoice verification earlier to lock in protocol accuracy.",
        quality: "improve",
      },
    ],
    recommendedLessons: [
      "Lesson 4: Establishing Control & Action Agreements",
      "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
    ],
    recommendedSimulations: [
      "L1 Network Diagnostics Under High SLA Pressure",
      "Omnichannel Live Chat Resolution",
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>FEEDBACK = UNDERSTAND YOUR PERFORMANCE</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Simulation Result & AI Evaluation
          </h2>
          <p className="text-xs text-white/60">
            Scenario: {feedbackData.scenarioTitle}
          </p>
        </div>

        <button
          onClick={handlePracticeAgain}
          className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
          <span>Practice Again</span>
        </button>
      </div>

      {/* Overall Score & Skill Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Overall Score Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-orange-500/15 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-orange-400/30 shadow-xl text-center flex flex-col justify-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300">
            Overall Simulation Score
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold text-white font-mono tracking-tight">
            {feedbackData.overallScore}%
          </div>
          <div className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 max-w-xs mx-auto">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Workplace Performance</span>
          </div>
        </div>

        {/* Right: Evaluated Skill Radar Scores */}
        <div className="lg:col-span-8 bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Skill Level Evaluation Breakdown</span>
          </h3>

          <div className="space-y-3">
            {[
              { name: "Communication & Clarity", score: feedbackData.skillScores.communication, color: "bg-orange-500" },
              { name: "Empathy & Tone", score: feedbackData.skillScores.empathy, color: "bg-emerald-500" },
              { name: "Active Listening", score: feedbackData.skillScores.activeListening, color: "bg-rose-500" },
              { name: "Problem Solving & Logic", score: feedbackData.skillScores.problemSolving, color: "bg-purple-500" },
              { name: "Conflict Resolution", score: feedbackData.skillScores.conflictResolution, color: "bg-amber-500" },
            ].map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{sk.name}</span>
                  <span className="font-mono text-orange-400 font-bold">{sk.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Positive Highlights */}
        <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-emerald-500/30 shadow-lg space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>What You Did Well</span>
          </h3>
          <ul className="space-y-2.5">
            {feedbackData.positiveHighlights.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Points */}
        <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-orange-400/30 shadow-lg space-y-3">
          <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>What You Could Improve</span>
          </h3>
          <ul className="space-y-2.5">
            {feedbackData.improvementPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Dialogue Moments Timeline */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-400" />
          <span>Key Conversation Moments & AI Analysis</span>
        </h3>

        <div className="space-y-3">
          {feedbackData.keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 rounded-xl border text-xs space-y-1 leading-relaxed",
                moment.quality === "good"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-white/90"
                  : "bg-orange-500/10 border-orange-400/30 text-white/90"
              )}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-orange-300">Timestamp {moment.timestamp}</span>
                <span className={moment.quality === "good" ? "text-emerald-400 font-bold" : "text-orange-400 font-bold"}>
                  {moment.quality === "good" ? "Effective Response" : "Improvement Opportunity"}
                </span>
              </div>
              <p>{moment.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demonstrated Skill Progress Growth Banner */}
      <div className="bg-gradient-to-br from-emerald-500/15 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-emerald-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Demonstrated Skill Level Progress
              </h3>
              <p className="text-xs text-white/60">
                RL AI updated your demonstrated workplace skills based on your Class + Simulator performance.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            +15.4% Skill Level Gain
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { skill: "Active Listening", oldScore: 74, newScore: 92, delta: "+18%" },
            { skill: "De-escalation", oldScore: 78, newScore: 94, delta: "+16%" },
            { skill: "Positive Framing", oldScore: 70, newScore: 95, delta: "+25%" },
            { skill: "Action Agreements", oldScore: 65, newScore: 89, delta: "+24%" },
          ].map((item) => (
            <div key={item.skill} className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-white/50 uppercase">
                {item.skill}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white font-mono">{item.newScore}%</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{item.delta}</span>
              </div>
              <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-1">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${item.newScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CORE STEP 6: WHAT SHOULD I DO NEXT? (RL AI Decision Engine) */}
      <div className="bg-gradient-to-br from-orange-500/20 via-[#161726] to-[#0e0f18] rounded-2xl p-6 border border-orange-400/50 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 shadow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-orange-300 tracking-wider">
                RL LEARNING GPS • AUTOMATED GUIDANCE
              </span>
              <h3 className="text-lg font-black text-white">
                WHAT SHOULD I DO NEXT?
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Decision: Pathway Mastery Approved (Score: 92%)
          </span>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">
          Based on your high demonstrated score in <span className="text-white font-bold">{feedbackData.scenarioTitle}</span>, RL AI has updated your learning roadmap:
        </p>

        {/* 3 AI Next Step Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card A: Next Class (Recommended) */}
          <div className="bg-gradient-to-br from-orange-500/20 via-[#18192a] to-[#0f101b] p-5 rounded-2xl border border-orange-400 shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-400/30">
                  RECOMMENDED
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Option 1</span>
              </div>
              <h4 className="text-base font-extrabold text-white">
                Advance to Next Class
              </h4>
              <p className="text-xs text-white/60">
                Class: Advanced Technical Diagnostics & Incident Escalations
              </p>
            </div>
            <button
              onClick={handleGoToLesson}
              className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Take Next Class</span>
              <ArrowRight className="w-4 h-4 text-orange-500" />
            </button>
          </div>

          {/* Card B: Try Harder Simulation */}
          <div className="bg-black/50 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-400/30">
                  CHALLENGE
                </span>
                <span className="text-[10px] font-mono text-white/40">Option 2</span>
              </div>
              <h4 className="text-base font-extrabold text-white">
                Try Harder Simulation
              </h4>
              <p className="text-xs text-white/60">
                Simulation: L1 Network Diagnostics under High SLA Pressure
              </p>
            </div>
            <button
              onClick={handleTryHarderSimulation}
              className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Try Harder Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card C: Practice / Repeat Skill */}
          <div className="bg-black/50 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                  REFINE
                </span>
                <span className="text-[10px] font-mono text-white/40">Option 3</span>
              </div>
              <h4 className="text-base font-extrabold text-white">
                Repeat & Perfect Skill
              </h4>
              <p className="text-xs text-white/60">
                Re-take current simulator scenario with AI real-time hints enabled
              </p>
            </div>
            <button
              onClick={handlePracticeAgain}
              className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Repeat Simulation</span>
              <RotateCcw className="w-3.5 h-3.5" />
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
