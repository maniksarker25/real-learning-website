"use client";

import React from "react";
import { PERFORMANCE_METRICS, PerformanceMetricKey } from "./types";
import { AnimatedScore } from "./AnimatedScore";
import { RetroDotBar } from "./RetroDotBar";

interface PerformanceMetricsEqualizerProps {
  currentScores: Record<PerformanceMetricKey, number>;
  isCustomerTyping: boolean;
}

export function PerformanceMetricsEqualizer({
  currentScores,
  isCustomerTyping,
}: PerformanceMetricsEqualizerProps) {
  return (
    <div className="w-[94%] sm:w-[95%] lg:w-[96%] max-w-305 mx-auto rounded-[50px] bg-[#3e53f1] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Telemetry Chart Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:120px_120px]" />

      <div className="relative z-10 overflow-x-auto pb-4 scrollbar-none w-full">
        <div className="min-w-[620px] lg:min-w-0 w-full">
          <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 items-end w-full">
            {PERFORMANCE_METRICS.map((metric) => {
              const score = currentScores[metric.key];
              return (
                <div
                  key={metric.key}
                  className="flex flex-col items-center group cursor-default w-full"
                >
                  {/* Top Metric Header: Rolling Spring Score */}
                  <div className="flex flex-col items-center gap-1 mb-4 h-12 justify-end text-center w-full">
                    <AnimatedScore
                      value={score}
                      className="font-mono font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-white"
                    />
                  </div>

                  {/* Vertical Bar Track (Slim Equalizer Column) */}
                  <div className="relative h-48 sm:h-52 w-14 sm:w-16 md:w-18 max-w-[64px] mx-auto flex flex-col justify-end items-center my-1">
                    <RetroDotBar
                      score={score}
                      isTyping={isCustomerTyping}
                    />
                  </div>

                  {/* Bottom Metric Label */}
                  <div className="mt-3 flex flex-col items-center gap-1 w-full text-center px-0.5">
                    <span className="font-bold text-[11px] sm:text-xs md:text-sm text-white leading-tight line-clamp-2 min-h-[2.2rem] flex items-center justify-center">
                      {metric.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
