"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Target, CheckCircle2, Sparkles, Zap, BookOpen } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";

export const IndGoalsScreen = memo(function IndGoalsScreen() {
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
        description: "Master de-escalation, active listening, and conflict resolution.",
        milestones: ["De-escalation Tactics", "Empathy & Active Listening", "Omnichannel Live Support"],
      },
      {
        id: "Tech Support",
        label: "Tech Support & L1 Helpdesk",
        description: "Diagnose hardware/software issues and manage support SLAs.",
        milestones: ["L1 Diagnostics & Triage", "Remote Desktop Guidance", "Ticket Escalation"],
      },
      {
        id: "IT Specialist",
        label: "IT Specialist & System Admin",
        description: "Manage enterprise networks, IAM security, and incident response.",
        milestones: ["IAM Access Control", "Network Security Protocols", "Incident Response"],
      },
      {
        id: "Healthcare Support",
        label: "Healthcare Support & Patient Care",
        description: "Conduct patient intake triage, clinical communication, and HIPAA compliance.",
        milestones: ["Empathetic Patient Intake", "Triage & Emergency Escalation", "Compliant Record Keeping"],
      },
    ],
    []
  );

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
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span>Target Goals & Skill Milestones</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Select your career target goal to customize your classes and simulation recommendations.
          </p>
        </div>

        {isSaved && (
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal Saved!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goalOptions.map((g) => {
          const isSelected = activeGoal === g.id;
          return (
            <button
              key={g.id}
              onClick={() => handleSelectGoal(g.id)}
              className={cn(
                "p-5 rounded-2xl border text-left transition-colors cursor-pointer space-y-3",
                isSelected
                  ? "bg-orange-500/10 border-orange-400 text-white shadow-lg"
                  : "bg-[#12131c]/90 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-white">
                  {g.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {g.description}
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase">
                  Included Milestones
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.milestones.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-orange-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
