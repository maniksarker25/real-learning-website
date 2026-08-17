"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SimulationScenario } from "../types";

interface SimulationCompleteProps {
  scenario: SimulationScenario;
  showScores: boolean;
  showIdeal: boolean;
}

export const SimulationComplete = memo(function SimulationComplete({
  scenario,
  showScores,
  showIdeal,
}: SimulationCompleteProps) {
  const [activeTab, setActiveTab] = useState<"scores" | "ideal">("scores");

  // Switch tab to 'ideal' when showIdeal becomes true
  useEffect(() => {
    if (showIdeal) {
      setActiveTab("ideal");
    } else {
      setActiveTab("scores");
    }
  }, [showIdeal]);

  const memoizedScores = useMemo(() => scenario.scores, [scenario.scores]);

  return (
    <div className="flex flex-col h-full max-h-[428px] bg-white/[0.015]">
      {/* Panel View Switcher Tabs (Fixed height header) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("scores")}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition cursor-pointer ${
              activeTab === "scores"
                ? "bg-white/10 text-white shadow-xs"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Scores
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ideal")}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition cursor-pointer ${
              activeTab === "ideal"
                ? "bg-white/10 text-white shadow-xs"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Ideal Response
          </button>
        </div>

        <span className="text-[10px] text-white/30 font-mono">
          {activeTab === "scores" ? `${scenario.overall}/100` : "Analysis"}
        </span>
      </div>

      {/* Content Container (Fixed Height + Inner Scroll) */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "scores" ? (
            <motion.div
              key={`tab-scores-${scenario.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-3">
                Skill Evaluation
              </div>

              {showScores ? (
                <div className="space-y-2.5">
                  {memoizedScores.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60 font-medium text-[11px]">
                          {s.label}
                        </span>
                        <span className="text-white font-bold text-[11px]">
                          {s.score}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.score}%` }}
                          transition={{
                            delay: i * 0.06 + 0.08,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          className={`h-full ${s.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mt-3 pt-3 border-t border-white/[0.06] text-center"
                  >
                    <div className="text-2xl font-black bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                      {scenario.overall}
                    </div>
                    <div className="text-[10px] text-white/40 mt-0.5 font-medium">
                      Overall Performance Score
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-3 opacity-20" aria-hidden="true">
                  {memoizedScores.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{s.label}</span>
                        <span className="text-white">—</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`tab-ideal-${scenario.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-2">
                Response Comparison
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-3">
                  <div className="text-[9px] text-rose-300/80 uppercase tracking-wider mb-1 font-bold">
                    Your Response
                  </div>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {scenario.yourResponse}
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-3">
                  <div className="text-[9px] text-emerald-300/90 uppercase tracking-wider mb-1 font-bold">
                    Ideal Response
                  </div>
                  <div className="text-xs text-white/90 leading-relaxed">
                    {scenario.idealResponse}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
