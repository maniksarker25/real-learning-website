import React, { memo } from "react";
import { X, ShieldCheck, MessageSquare, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompletedSimulationItem } from "./types";

interface OrgSimulationTranscriptModalProps {
  simulation: CompletedSimulationItem;
  onClose: () => void;
}

export const OrgSimulationTranscriptModal = memo(
  function OrgSimulationTranscriptModal({
    simulation,
    onClose,
  }: OrgSimulationTranscriptModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                  simulation.trackColor,
                )}
              >
                {simulation.careerTrack}
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {simulation.completedAt} • Duration: {simulation.duration}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900">
              {simulation.scenarioTitle}
            </h3>
          </div>

          {/* Member & Score Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50/50 rounded-2xl p-4 border border-orange-200 text-center flex flex-col justify-center space-y-1">
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
                OVERALL AI SCORE
              </span>
              <div className="text-4xl font-extrabold text-stone-900 font-mono">
                {simulation.overallScore}%
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">
                Verified Simulation
              </span>
            </div>

            <div className="sm:col-span-8 bg-[#FCFAF6] rounded-2xl p-4 border border-stone-200 space-y-2.5">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Participant Performance</span>
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={simulation.member.avatar}
                  alt={simulation.member.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="font-bold text-stone-900 text-xs">
                    {simulation.member.name}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {simulation.member.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-center">
                <div className="bg-white border border-stone-200 p-2 rounded-xl">
                  <div className="text-[9px] text-stone-500 font-mono font-bold">
                    EMPATHY
                  </div>
                  <div className="font-bold text-orange-600 text-xs">
                    {simulation.skills.empathy}%
                  </div>
                </div>
                <div className="bg-white border border-stone-200 p-2 rounded-xl">
                  <div className="text-[9px] text-stone-500 font-mono font-bold">
                    OWNERSHIP
                  </div>
                  <div className="font-bold text-emerald-700 text-xs">
                    {simulation.skills.ownership}%
                  </div>
                </div>
                <div className="bg-white border border-stone-200 p-2 rounded-xl">
                  <div className="text-[9px] text-stone-500 font-mono font-bold">
                    RESOLUTION
                  </div>
                  <div className="font-bold text-blue-700 text-xs">
                    {simulation.skills.resolution}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue Transcript */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>Simulation Dialogue Transcript</span>
            </h4>

            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {simulation.dialoguePreview.map((turn, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed max-w-[85%]",
                    turn.role === "user"
                      ? "bg-orange-50 border border-orange-200 text-stone-900 ml-auto"
                      : "bg-stone-100 border border-stone-200 text-stone-800 mr-auto",
                  )}
                >
                  <div className="text-[9px] font-mono font-bold mb-1 opacity-70 uppercase">
                    {turn.role === "user"
                      ? `${simulation.member.name} (Member)`
                      : `${simulation.aiCharacterName} (AI Character)`}
                  </div>
                  {turn.text}
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Highlights */}
          <div className="space-y-2 bg-[#FCFAF6] p-4 rounded-2xl border border-stone-200 text-xs">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Rubric Feedback Highlights</span>
            </h4>
            <ul className="space-y-1 text-stone-600 list-disc list-inside">
              {simulation.feedbackHighlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
            >
              Close Transcript
            </button>
          </div>
        </div>
      </div>
    );
  },
);
