"use client";

import React, { memo } from "react";
import { X, ShieldCheck, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserItem } from "./types";

interface UserDetailsModalProps {
  user: UserItem | null;
  onClose: () => void;
}

export const UserDetailsModal = memo(function UserDetailsModal({
  user,
  onClose,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-stone-100 pb-5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-stone-200 shadow-sm shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-stone-900">
                {user.name}
              </h3>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                  user.role === "owner"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : user.role === "admin"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-stone-100 text-stone-700 border-stone-200"
                )}
              >
                {user.role.toUpperCase()}
              </span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                  user.trackColor
                )}
              >
                {user.track}
              </span>
            </div>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              {user.email}
            </div>
          </div>
        </div>

        {/* Overall Score & Competencies */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50/50 rounded-2xl p-4 border border-orange-200 text-center flex flex-col justify-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
              OVERALL SCORE
            </span>
            <div className="text-4xl font-extrabold text-stone-900 font-mono">
              {user.score}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">
              Evaluated via Simulations
            </span>
          </div>

          <div className="sm:col-span-8 bg-[#FCFAF6] rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Evaluated Skill Competencies</span>
            </span>

            {user.skillsBreakdown && (
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>Communication Tone</span>
                    <span className="text-orange-600 font-bold">
                      {user.skillsBreakdown.communication}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${user.skillsBreakdown.communication}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>De-escalation & Conflict</span>
                    <span className="text-emerald-700 font-bold">
                      {user.skillsBreakdown.deEscalation}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${user.skillsBreakdown.deEscalation}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>Technical Triage & Diagnostics</span>
                    <span className="text-purple-700 font-bold">
                      {user.skillsBreakdown.diagnostics}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${user.skillsBreakdown.diagnostics}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completed Classes & Simulations History */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>Completed Classes & Simulation History</span>
          </h4>

          <div className="space-y-2">
            {user.completedClassesHistory && user.completedClassesHistory.length > 0 ? (
              user.completedClassesHistory.map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs shadow-xs"
                >
                  <div>
                    <div className="font-bold text-stone-900">{item.title}</div>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                      Completed: {item.date}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Score: {item.score}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-xs text-stone-500 text-center bg-stone-50 rounded-xl border border-stone-200">
                No completed simulations yet.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
          >
            Close Profile Details
          </button>
        </div>
      </div>
    </div>
  );
});
