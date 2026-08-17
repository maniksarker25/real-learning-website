"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Lock } from "lucide-react";
import type { SimulationScenario } from "../types";

interface SimulationHeaderProps {
  scenarios: SimulationScenario[];
  activeScenarioIndex: number;
  onSelectScenario: (index: number) => void;
  onReplay: () => void;
}

export const SimulationHeader = memo(function SimulationHeader({
  scenarios,
  activeScenarioIndex,
  onSelectScenario,
  onReplay,
}: SimulationHeaderProps) {
  const currentScenario = scenarios[activeScenarioIndex];

  return (
    <div className="border-b border-white/10 bg-[#16161e]/90">
      {/* Top macOS window title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* macOS Window Control Dots */}
          <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-xs" />
          </div>

          {currentScenario && (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${currentScenario.accentClass} border ${currentScenario.accentBorder} truncate`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span
                className={`text-[11px] font-mono font-medium ${currentScenario.accentText} truncate`}
              >
                {currentScenario.title} · {currentScenario.skill}
              </span>
              <span className="hidden sm:inline text-[10px] text-white/40 font-mono ml-1">
                {currentScenario.career}
              </span>
            </motion.div>
          )}
        </div>

        {/* Center macOS Search / URL Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-white/50 shadow-inner">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>reallearning.app/simulation/live</span>
        </div>

        <button
          type="button"
          onClick={onReplay}
          className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 border border-white/10 shrink-0 font-mono"
          title="Replay Simulation"
          aria-label="Replay simulation"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Replay</span>
        </button>
      </div>

      {/* Scenario navigation tabs */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-0 overflow-x-auto no-scrollbar">
        <div role="tablist" className="flex items-center gap-1">
          {scenarios.map((s, i) => {
            const isActive = activeScenarioIndex === i;
            return (
              <button
                key={s.id || s.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectScenario(i)}
                className={`relative px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {s.title}
                {isActive && (
                  <motion.div
                    layoutId="simulation-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden md:block pb-2 text-[10px] text-white/40 font-mono italic pr-1 select-none">
          macOS Preview Window
        </div>
      </div>
    </div>
  );
});
