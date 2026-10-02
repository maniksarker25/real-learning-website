"use client";

import React, { memo } from "react";
import { X, ShieldCheck, BookOpen } from "lucide-react";
import { MemberUserItem } from "./types";

interface MemberDetailsModalProps {
  member: MemberUserItem | null;
  onClose: () => void;
}

export const MemberDetailsModal = memo(function MemberDetailsModal({
  member,
  onClose,
}: MemberDetailsModalProps) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xl p-6 sm:p-7 space-y-5 text-left max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Avatar & Details */}
        <div className="flex items-center gap-3.5 border-b border-stone-100 pb-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900 leading-tight">
                {member.name}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-stone-700 bg-stone-100 border border-stone-200">
                {member.track}
              </span>
            </div>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              {member.email}
            </div>
          </div>
        </div>

        {/* Overall Score & Skill Competencies Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          <div className="sm:col-span-4 bg-stone-50 rounded-xl p-4 border border-stone-200 text-center flex flex-col justify-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
              OVERALL SCORE
            </span>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              {member.score}
            </div>
            <span className="text-[10px] text-emerald-800 font-bold">
              Evaluated via Simulations
            </span>
          </div>

          <div className="sm:col-span-8 bg-stone-50/60 rounded-xl p-4 border border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Evaluated Skill Competencies</span>
            </span>

            {member.skillsBreakdown && (
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>Communication Tone</span>
                    <span className="text-orange-600 font-bold">
                      {member.skillsBreakdown.communication}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${member.skillsBreakdown.communication}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>De-escalation & Conflict</span>
                    <span className="text-emerald-700 font-bold">
                      {member.skillsBreakdown.deEscalation}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${member.skillsBreakdown.deEscalation}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
                    <span>Technical Triage & Diagnostics</span>
                    <span className="text-purple-700 font-bold">
                      {member.skillsBreakdown.diagnostics}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${member.skillsBreakdown.diagnostics}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completed Classes & Simulations History */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>Completed Classes & Simulation History</span>
          </h4>

          <div className="space-y-2">
            {member.completedClassesHistory &&
            member.completedClassesHistory.length > 0 ? (
              member.completedClassesHistory.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-stone-900">{item.title}</div>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                      Completed: {item.date}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Score: {item.score}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-stone-500 text-center bg-stone-50 rounded-lg border border-stone-200">
                No completed simulations yet.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
});
