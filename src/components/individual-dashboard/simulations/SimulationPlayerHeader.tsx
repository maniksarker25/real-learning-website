"use client";

import React, { memo } from "react";
import {
  Bot,
  Clock,
  MessageSquare,
  Maximize2,
  Minimize2,
  RefreshCw,
  X,
} from "lucide-react";
import { SimulationScenario } from "@/types/individual";

interface SimulationPlayerHeaderProps {
  scenario: SimulationScenario;
  formattedTime: string;
  turnCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const SimulationPlayerHeader = memo(function SimulationPlayerHeader({
  scenario,
  formattedTime,
  turnCount,
  isFullscreen,
  onToggleFullscreen,
  onReset,
  onClose,
}: SimulationPlayerHeaderProps) {
  return (
    <>
      <div className="px-4 py-3 bg-[#FCFAF6] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left Character Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                {scenario.characterName}
              </h3>
              <span className="text-[10px] font-mono font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                {scenario.characterRole}
              </span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                {scenario.difficulty}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 truncate mt-0.5">
              {scenario.title}
            </p>
          </div>
        </div>

        {/* Center Timer & Turns */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-stone-600 bg-stone-100/80 px-3 py-1 rounded-full border border-stone-200">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{formattedTime}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
            <span>{turnCount} Turns</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-200 transition-colors cursor-pointer text-xs"
            title={isFullscreen ? "Exit Fullscreen" : "Full Screen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-200 transition-colors cursor-pointer text-xs"
            title="Reset Simulation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-200 transition-colors cursor-pointer text-xs"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Skills Tested Bar */}
      <div className="px-4 py-1.5 bg-[#FAF8F5] border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
        <span className="text-stone-500 font-mono font-semibold shrink-0">
          Skills Tested:
        </span>
        {scenario.expectedSkills.map((sk) => (
          <span
            key={sk}
            className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 font-mono whitespace-nowrap shrink-0"
          >
            {sk}
          </span>
        ))}
      </div>
    </>
  );
});
