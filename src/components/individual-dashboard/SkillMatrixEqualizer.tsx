"use client";

import React, { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Trophy, Info } from "lucide-react";

export interface SkillEqualizerItem {
  id: string;
  name: string;
  level: number;
  benchmark?: number;
  category?: string;
  delta?: string;
}

interface SkillMatrixEqualizerProps {
  skills?: SkillEqualizerItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

const DEFAULT_SKILLS: SkillEqualizerItem[] = [
  { id: "s1", name: "Communication", level: 52, benchmark: 80, category: "Core", delta: "+18%" },
  { id: "s2", name: "Empathy", level: 46, benchmark: 80, category: "Tone", delta: "+12%" },
  { id: "s3", name: "Problem Solving", level: 38, benchmark: 80, category: "Diagnostics", delta: "+8%" },
  { id: "s4", name: "Active Listening", level: 58, benchmark: 80, category: "Comprehension", delta: "+22%" },
  { id: "s5", name: "De-escalation", level: 42, benchmark: 80, category: "Conflict", delta: "+16%" },
  { id: "s6", name: "Clarity & Tone", level: 60, benchmark: 80, category: "Clarity", delta: "+25%" },
  { id: "s7", name: "Resolution Speed", level: 34, benchmark: 80, category: "Efficiency", delta: "+10%" },
];

/**
 * Component that renders the glowing LED Dot Matrix inside a pill
 */
const LedDotMatrix = memo(function LedDotMatrix({
  level,
  isHovered,
}: {
  level: number;
  isHovered: boolean;
}) {
  // Determine number of rows based on level (4 columns across, 3 to 7 rows depending on height)
  const rows = Math.max(3, Math.min(8, Math.round((level / 100) * 10)));
  const cols = 4;

  return (
    <div className="w-full h-full p-1.5 flex flex-col justify-center items-center gap-1">
      {Array.from({ length: rows }).map((_, rIdx) => {
        const isCenterRow = rIdx >= Math.floor(rows / 2) - 1 && rIdx <= Math.floor(rows / 2) + 1;

        return (
          <div key={rIdx} className="flex items-center justify-center gap-1 w-full">
            {Array.from({ length: cols }).map((_, cIdx) => {
              const isCenterCol = cIdx === 1 || cIdx === 2;
              const isCore = isCenterRow && isCenterCol;
              const isNearCore = (isCenterRow && !isCenterCol) || (!isCenterRow && isCenterCol);

              return (
                <span
                  key={cIdx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isCore
                      ? "bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.95)]"
                      : isNearCore
                      ? "bg-white/70 shadow-[0_0_3px_1px_rgba(255,255,255,0.6)]"
                      : "bg-white/30",
                    isHovered && "scale-110"
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export const SkillMatrixEqualizer = memo(function SkillMatrixEqualizer({
  skills = DEFAULT_SKILLS,
  className,
  title,
  subtitle,
}: SkillMatrixEqualizerProps) {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative rounded-3xl p-5 sm:p-7 md:p-8 overflow-hidden shadow-sm",
        "bg-[#2B47EE] border border-blue-400/40 text-white",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          radial-gradient(ellipse at 50% 0%, rgba(68, 100, 255, 0.5) 0%, rgba(35, 62, 230, 0.95) 100%)
        `,
        backgroundSize: "20px 20px, 20px 20px, 100% 100%",
      }}
    >
      {/* Optional Top Bar if Title/Subtitle provided */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10 relative z-10">
          <div>
            {title && (
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{title}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-blue-100/70 mt-0.5">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-semibold bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-blue-100">
            <span>Target Benchmark: 80%</span>
          </div>
        </div>
      )}

      {/* Equalizer Columns Row */}
      <div className="relative z-10">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-end">
          {skills.map((skill) => {
            const isHovered = hoveredSkillId === skill.id;
            const benchmark = skill.benchmark || 80;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* 1. Top Percentage Display */}
                <div className="text-sm sm:text-base md:text-xl font-black text-white font-mono tracking-tight mb-2 sm:mb-3 transition-colors group-hover:text-amber-200">
                  {skill.level}%
                </div>

                {/* 2. Vertical Capsule Chamber */}
                <div className="w-full max-w-[58px] sm:max-w-[68px] md:max-w-[76px] h-[170px] sm:h-[195px] md:h-[215px] rounded-2xl sm:rounded-3xl bg-[#182894]/85 border border-white/15 relative flex flex-col justify-end p-1 overflow-hidden backdrop-blur-xs shadow-inner">
                  {/* Dashed Benchmark Line (at benchmark% from bottom = 100 - benchmark% from top) */}
                  <div
                    className="absolute left-0 right-0 border-t border-dashed border-white/35 z-20 pointer-events-none flex items-center justify-end pr-1"
                    style={{ bottom: `${benchmark}%` }}
                  >
                    <span className="text-[8px] font-mono text-white/50 -mt-3.5 pr-0.5 select-none font-semibold hidden sm:inline-block">
                      {benchmark}%
                    </span>
                  </div>

                  {/* Active LED Pill (grows from bottom) */}
                  <div
                    className={cn(
                      "w-full rounded-xl sm:rounded-2xl bg-[#0D0F18] border border-white/20 relative z-10 overflow-hidden flex flex-col justify-center items-center transition-all duration-300",
                      isHovered
                        ? "border-amber-300/80 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                        : "shadow-md"
                    )}
                    style={{
                      height: `${Math.max(20, Math.min(100, skill.level))}%`,
                      minHeight: "44px",
                    }}
                  >
                    {/* Glowing LED Grid inside */}
                    <LedDotMatrix level={skill.level} isHovered={isHovered} />
                  </div>
                </div>

                {/* 3. Bottom Skill Label */}
                <div className="mt-2.5 sm:mt-3.5 text-center">
                  <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/95 group-hover:text-white leading-tight block tracking-tight">
                    {skill.name}
                  </span>
                  {skill.delta && (
                    <span className="text-[9px] font-mono text-emerald-300 font-bold hidden sm:inline-block mt-0.5">
                      {skill.delta}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
