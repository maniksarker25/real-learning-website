import React, { memo } from "react";
import {
  X,
  RotateCcw,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RecentSimulationItem } from "./types";

interface RecentSimulationFeedbackModalProps {
  simulation: RecentSimulationItem;
  onClose: () => void;
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

export const RecentSimulationFeedbackModal = memo(
  function RecentSimulationFeedbackModal({
    simulation,
    onClose,
    onLaunchSimulation,
  }: RecentSimulationFeedbackModalProps) {
    const handleRetake = () => {
      const title = simulation.scenarioTitle;
      onClose();
      if (onLaunchSimulation) {
        onLaunchSimulation(title);
      }
    };

    const skillCategories = [
      {
        name: "Communication & Clarity",
        score: simulation.skills.communication,
        color: "bg-orange-500",
      },
      {
        name: "Empathy & Tone",
        score: simulation.skills.empathy,
        color: "bg-emerald-500",
      },
      {
        name: "Active Listening",
        score: simulation.skills.activeListening,
        color: "bg-rose-500",
      },
      {
        name: "Problem Solving & Logic",
        score: simulation.skills.problemSolving,
        color: "bg-purple-500",
      },
      {
        name: "Conflict Resolution",
        score: simulation.skills.conflictResolution,
        color: "bg-amber-500",
      },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/50 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-[#FCFAF6] border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left max-h-[92vh] overflow-y-auto shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs text-orange-900 font-bold mb-1.5">
                <span>FEEDBACK = UNDERSTAND YOUR PERFORMANCE</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900">
                Simulation Result & AI Evaluation
              </h2>
              <p className="text-xs text-stone-600">
                Scenario: {simulation.scenarioTitle}
              </p>
            </div>

            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              <span>Practice Again</span>
            </button>
          </div>

          {/* Overall Score & Skill Scores Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Overall Score Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-amber-500/10 via-white to-orange-50 rounded-2xl p-6 border border-amber-200 text-center flex flex-col justify-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                Overall Simulation Score
              </span>
              <div className="text-5xl sm:text-6xl font-black text-stone-900 font-mono tracking-tight">
                {simulation.score}%
              </div>
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 max-w-xs mx-auto">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>High Workplace Performance</span>
              </div>
            </div>

            {/* Right: Evaluated Skill Breakdown */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Skill Level Evaluation Breakdown</span>
              </h3>

              <div className="space-y-3">
                {skillCategories.map((sk) => (
                  <div key={sk.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-stone-800">{sk.name}</span>
                      <span className="font-mono text-orange-700 font-bold">
                        {sk.score}%
                      </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Positive Highlights */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What You Did Well</span>
              </h3>
              <ul className="space-y-2.5">
                {simulation.positiveHighlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Points */}
            <div className="bg-white rounded-2xl p-5 border border-orange-200 space-y-3">
              <h3 className="text-sm font-bold text-orange-950 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span>What You Could Improve</span>
              </h3>
              <ul className="space-y-2.5">
                {simulation.improvementPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Conversation Moments & AI Analysis */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>Key Conversation Moments & AI Analysis</span>
            </h3>

            <div className="space-y-3">
              {simulation.keyMoments.map((moment, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-xl border text-xs space-y-1 leading-relaxed",
                    moment.quality === "good"
                      ? "bg-emerald-50/70 border-emerald-200 text-stone-800"
                      : "bg-orange-50/70 border-orange-200 text-stone-800",
                  )}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-stone-700">
                      Timestamp {moment.timestamp}
                    </span>
                    <span
                      className={
                        moment.quality === "good"
                          ? "text-emerald-800 font-bold"
                          : "text-orange-800 font-bold"
                      }
                    >
                      {moment.quality === "good"
                        ? "Effective Response"
                        : "Improvement Opportunity"}
                    </span>
                  </div>
                  <p className="text-stone-700">{moment.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Actions to Improve */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span>Recommended Next Actions to Improve</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {simulation.recommendedLessons.map((lesson) => (
                <div
                  key={lesson}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono text-orange-800 uppercase font-bold">
                      Recommended Class Lesson
                    </span>
                    <div className="font-bold text-stone-900 mt-0.5">
                      {lesson}
                    </div>
                  </div>
                  <a
                    href="/user-dashboard/classes"
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-colors cursor-pointer shrink-0"
                  >
                    Review Lesson
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Simulation</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Close Feedback
            </button>
          </div>
        </div>
      </div>
    );
  },
);
