"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Target, CheckCircle2, Sparkles, ArrowRight, BookOpen, Zap } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";

export const IndGoalScreen = memo(function IndGoalScreen() {
  const { session, loginAsIndividual } = useAccount();
  const [activeGoal, setActiveGoal] = useState(
    session.goal || "Customer Service"
  );
  const [isSaved, setIsSaved] = useState(false);

  const goalOptions = useMemo(
    () => [
      {
        id: "Customer Service",
        label: "Customer Service & Communication",
        description: "Master de-escalation, active listening, and conflict resolution in high-pressure scenarios.",
        icon: Target,
        milestones: ["De-escalation Tactics", "Empathy & Active Listening", "Omnichannel Live Support"],
      },
      {
        id: "Tech Support",
        label: "Tech Support & L1 Helpdesk",
        description: "Diagnose hardware/software issues, guide users through step-by-step troubleshooting.",
        icon: Zap,
        milestones: ["L1 Diagnostics & Triage", "Remote Desktop Guidance", "Ticket Resolution & Escalation"],
      },
      {
        id: "IT Specialist",
        label: "IT Specialist & System Admin",
        description: "Manage enterprise networks, Active Directory IAM access, and security incident response.",
        icon: BookOpen,
        milestones: ["IAM & Access Control", "Network Security Protocols", "Incident Response Workflows"],
      },
      {
        id: "Healthcare Support",
        label: "Healthcare Support & Patient Care",
        description: "Conduct patient intake triage, clinical communication, and HIPAA compliant record handling.",
        icon: Sparkles,
        milestones: ["Empathetic Patient Intake", "Triage & Emergency Escalation", "Compliant Record Keeping"],
      },
    ],
    []
  );

  const currentGoalData = useMemo(() => {
    return (
      goalOptions.find((g) => g.id === activeGoal) || goalOptions[0]
    );
  }, [goalOptions, activeGoal]);

  const handleSelectGoal = useCallback(
    (goalId: string) => {
      setActiveGoal(goalId);
      loginAsIndividual({
        name: session.name || "Hosain Ali",
        goal: goalId,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    },
    [loginAsIndividual, session.name]
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span>My Goal & Career Roadmap</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Your personalized learning path is structured around your target career goal.
          </p>
        </div>

        {isSaved && (
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal Updated!</span>
          </div>
        )}
      </div>

      {/* Active Goal Highlight Card */}
      <div className="bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-transparent rounded-2xl p-6 border border-orange-400/30 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-400/30">
            Active Goal Focus
          </span>
          <span className="text-xs text-white/60 font-mono">
            Step 1 of 5
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {currentGoalData.label}
          </h3>
          <p className="text-xs text-white/70 mt-1 max-w-xl">
            {currentGoalData.description}
          </p>
        </div>

        {/* Milestone Checklist */}
        <div className="pt-2">
          <span className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 font-mono">
            Roadmap Skill Milestones
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentGoalData.milestones.map((ms, idx) => (
              <div
                key={ms}
                className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white"
              >
                <CheckCircle2
                  className={cn(
                    "w-4 h-4 shrink-0",
                    idx === 0 ? "text-emerald-400" : "text-white/30"
                  )}
                />
                <span>{ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Career Goal Options */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white">
          Switch or Select Your Career Goal Focus
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goalOptions.map((g) => {
            const isSelected = activeGoal === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleSelectGoal(g.id)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-2",
                  isSelected
                    ? "bg-orange-500/10 border-orange-400 text-white"
                    : "bg-black/40 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {g.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {g.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
