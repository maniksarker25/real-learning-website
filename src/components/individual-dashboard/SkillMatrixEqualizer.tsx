"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { Badge, Card, CardHeader, ProgressBar } from "@/components/dashboard/ui";

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
 * Skill levels against a target benchmark.
 * Vertical columns from md up, simple horizontal bars on small screens.
 */
export const SkillMatrixEqualizer = memo(function SkillMatrixEqualizer({
  skills = DEFAULT_SKILLS,
  className,
  title,
  subtitle,
}: SkillMatrixEqualizerProps) {
  const benchmark = skills[0]?.benchmark ?? 80;

  return (
    <Card className={className}>
      {(title || subtitle) && (
        <CardHeader title={title} description={subtitle} action={<Badge>Target {benchmark}%</Badge>} />
      )}

      {/* md+: columns */}
      <div className="hidden items-end gap-4 md:flex">
        {skills.map((s) => {
          const target = s.benchmark ?? 80;
          const reached = s.level >= target;
          return (
            <div key={s.id} className="flex min-w-0 flex-1 flex-col items-center">
              <span className="text-xl font-semibold tabular-nums text-white">{s.level}%</span>
              <div className="relative mt-3 h-52 w-full max-w-[68px] overflow-hidden rounded-2xl bg-white/[0.05]">
                <span
                  aria-hidden
                  className="absolute inset-x-0 z-10 border-t border-dashed border-white/30"
                  style={{ bottom: `${target}%` }}
                />
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-2xl transition-[height] duration-500",
                    reached ? "bg-emerald-500" : "bg-orange-500",
                  )}
                  style={{ height: `${Math.max(6, Math.min(100, s.level))}%` }}
                />
              </div>
              <span className="mt-3 text-center text-sm leading-tight text-zinc-300">{s.name}</span>
              {s.delta && <span className="mt-0.5 text-sm text-emerald-400">{s.delta}</span>}
            </div>
          );
        })}
      </div>

      {/* mobile: rows */}
      <ul className="space-y-4 md:hidden">
        {skills.map((s) => (
          <li key={s.id}>
            <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
              <span className="text-zinc-300">{s.name}</span>
              <span className="tabular-nums text-white">
                {s.level}%{s.delta && <span className="ml-2 text-emerald-400">{s.delta}</span>}
              </span>
            </div>
            <ProgressBar value={s.level} label={s.name} className="h-2" />
          </li>
        ))}
      </ul>

      <p className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
        <span className="w-5 border-t border-dashed border-white/40" />
        Dashed line marks the {benchmark}% target
      </p>
    </Card>
  );
});
