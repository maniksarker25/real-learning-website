"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  Target,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Flame,
  Award,
  TrendingUp,
  Sparkles,
  Sliders,
  Check,
  AlertCircle,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { cn } from "@/lib/utils";
import {
  VictorianCornerFlourish,
  EngravedSeal,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";

interface MilestoneItem {
  id: string;
  title: string;
  category: "Habit" | "Simulation" | "Class" | "Personal";
  targetDate: string;
  completed: boolean;
}

export const IndGoalsScreen = memo(function IndGoalsScreen() {
  const { session } = useAccount();

  let loopContext: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    loopContext = useLearningLoop();
  } catch {
    loopContext = null;
  }

  const activePathTitle =
    loopContext?.activePath?.title || session.goal || "Customer Service";

  // Target Settings State
  const [targetScore, setTargetScore] = useState<number>(90);
  const [targetWeeklyHours, setTargetWeeklyHours] = useState<number>(5);
  const [targetDateString, setTargetDateString] = useState<string>("2026-10-31");
  const [studyNote, setStudyNote] = useState<string>(
    "Focus on active listening & emotional validation before offering technical solutions."
  );
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);
  const [newGoalText, setNewGoalText] = useState<string>("");
  const [newGoalCategory, setNewGoalCategory] = useState<
    "Habit" | "Simulation" | "Class" | "Personal"
  >("Personal");

  // Milestone action items
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    {
      id: "m-1",
      title: "Complete 4 interactive AI simulations with 88%+ score",
      category: "Simulation",
      targetDate: "This Week",
      completed: true,
    },
    {
      id: "m-2",
      title: "Finish Lesson 4: Active Listening & Non-Confrontational Phrasing",
      category: "Class",
      targetDate: "In 3 Days",
      completed: true,
    },
    {
      id: "m-3",
      title: "Score 92%+ on Handling Upset Refund Request scenario",
      category: "Simulation",
      targetDate: "This Sunday",
      completed: false,
    },
    {
      id: "m-4",
      title: "Maintain 5-day continuous learning streak",
      category: "Habit",
      targetDate: "Ongoing",
      completed: false,
    },
    {
      id: "m-5",
      title: "Pass Final Readiness Capstone Assessment",
      category: "Personal",
      targetDate: "Target Horizon",
      completed: false,
    },
  ]);

  // Weekly Practice Days Completed (M T W T F S S)
  const [weeklyDays, setWeeklyDays] = useState<{ day: string; done: boolean }[]>([
    { day: "Mon", done: true },
    { day: "Tue", done: true },
    { day: "Wed", done: true },
    { day: "Thu", done: false },
    { day: "Fri", done: false },
    { day: "Sat", done: false },
    { day: "Sun", done: false },
  ]);

  const toggleMilestone = useCallback((id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleAddMilestone = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newGoalText.trim()) return;

      const newItem: MilestoneItem = {
        id: `m-${Date.now()}`,
        title: newGoalText.trim(),
        category: newGoalCategory,
        targetDate: "Upcoming",
        completed: false,
      };

      setMilestones((prev) => [newItem, ...prev]);
      setNewGoalText("");
    },
    [newGoalText, newGoalCategory]
  );

  const toggleDay = useCallback((index: number) => {
    setWeeklyDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, done: !d.done } : d))
    );
  }, []);

  const handleSaveNote = useCallback(() => {
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  }, []);

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round(
    (completedCount / (milestones.length || 1)) * 100
  );
  const activeDaysCount = weeklyDays.filter((d) => d.done).length;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 relative overflow-hidden shadow-sm">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block pointer-events-none"
        />
        <EngravedSeal
          size={90}
          className="absolute -right-6 -bottom-6 text-stone-900/5 pointer-events-none hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  Goals & Action Roadmap
                </h1>
                <StarburstRosette size={14} className="text-orange-500/70" />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Set personal performance targets, manage weekly habit goals, and track milestone commitments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Track:
            </span>
            <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900">
              {activePathTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Target Objectives & Habit Tracking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Target 1: Minimum Score Threshold */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 tracking-wider">
              Target Simulation Score
            </span>
            <Award className="w-4 h-4 text-orange-500" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-stone-900">
              {targetScore}%
            </span>
            <span className="text-xs text-emerald-700 font-semibold font-mono">
              (Industry Ready: 85%+)
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-mono text-stone-500 flex justify-between">
              <span>Adjust Target Threshold</span>
              <span className="font-bold text-stone-800">{targetScore}%</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[85, 90, 95].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setTargetScore(score)}
                  className={cn(
                    "py-1 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer",
                    targetScore === score
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-300"
                  )}
                >
                  {score}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target 2: Weekly Practice Commitment */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 tracking-wider">
              Weekly Practice Goal
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-stone-900">
              {targetWeeklyHours}h
            </span>
            <span className="text-xs text-stone-500 font-mono">
              / week ({targetWeeklyHours * 60} mins)
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-mono text-stone-500 flex justify-between">
              <span>Target Pace</span>
              <span className="font-bold text-stone-800">{targetWeeklyHours} hrs</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[3, 5, 8].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setTargetWeeklyHours(hours)}
                  className={cn(
                    "py-1 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer",
                    targetWeeklyHours === hours
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-300"
                  )}
                >
                  {hours}h/wk
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target 3: Weekly Practice Habit Days */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 tracking-wider">
              Habit Tracker ({activeDaysCount}/7 Days)
            </span>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>

          <div className="flex items-center justify-between gap-1 pt-1">
            {weeklyDays.map((item, idx) => (
              <button
                key={item.day}
                type="button"
                onClick={() => toggleDay(idx)}
                title={`Click to toggle ${item.day}`}
                className={cn(
                  "flex-1 py-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1",
                  item.done
                    ? "bg-orange-50 border-orange-300 text-orange-900 font-bold shadow-xs"
                    : "bg-[#FAF8F5] border-stone-200 text-stone-400 hover:border-stone-300"
                )}
              >
                <span className="text-[10px] font-mono font-semibold">{item.day}</span>
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-stone-300" />
                )}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-stone-500 font-medium">
            {activeDaysCount >= 4
              ? "🔥 Excellent pace! You are hitting your consistency target."
              : "Complete 1 practice session today to keep your streak alive."}
          </p>
        </div>
      </div>

      {/* Action Milestones Checklist & Add Goal Section */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-stone-900">
                Action Milestones & Learning Targets
              </h2>
              <StarburstRosette size={13} className="text-orange-500/70" />
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Check off items as you complete them or add personal study commitments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
              {completedCount} of {milestones.length} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Add New Custom Milestone Form */}
        <form
          onSubmit={handleAddMilestone}
          className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200/80 flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="Add a new goal or milestone (e.g. Master handling hostile tone quiz)..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <select
            value={newGoalCategory}
            onChange={(e) =>
              setNewGoalCategory(
                e.target.value as "Habit" | "Simulation" | "Class" | "Personal"
              )
            }
            className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-700 font-mono focus:outline-none"
          >
            <option value="Personal">Personal</option>
            <option value="Simulation">Simulation</option>
            <option value="Class">Class</option>
            <option value="Habit">Habit</option>
          </select>

          <button
            type="submit"
            disabled={!newGoalText.trim()}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Target</span>
          </button>
        </form>

        {/* Milestones List */}
        <div className="space-y-2">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={cn(
                "p-3 rounded-xl border flex items-center justify-between gap-3 transition-all",
                m.completed
                  ? "bg-emerald-50/30 border-emerald-200/80 text-stone-500"
                  : "bg-white border-stone-200 hover:border-stone-300 text-stone-800"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleMilestone(m.id)}
                  className="cursor-pointer text-stone-400 hover:text-stone-700 transition-colors shrink-0"
                >
                  {m.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300 hover:text-stone-500" />
                  )}
                </button>

                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-xs font-semibold leading-snug",
                      m.completed
                        ? "line-through text-stone-400 font-normal"
                        : "text-stone-900"
                    )}
                  >
                    {m.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {m.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      Due: {m.targetDate}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => deleteMilestone(m.id)}
                title="Remove milestone"
                className="p-1 rounded text-stone-300 hover:text-red-600 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Strategy Note */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Personal Study & Technique Focus Note
            </h3>
          </div>
          {isNoteSaved && (
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Note Saved
            </span>
          )}
        </div>

        <div className="space-y-2">
          <textarea
            value={studyNote}
            onChange={(e) => setStudyNote(e.target.value)}
            rows={2}
            placeholder="Write a technique reminder or personal goal for this week..."
            className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-900"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Save Strategy Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
