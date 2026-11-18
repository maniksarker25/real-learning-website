import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The signature "○ Label" eyebrow used across the site. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium text-zinc-400", className)}>
      <span className="h-2 w-2 rounded-full border border-current" />
      {children}
    </span>
  );
}

type Tone = "neutral" | "orange" | "green" | "amber" | "rose" | "blue";

const TONES: Record<Tone, string> = {
  neutral: "bg-white/[0.06] text-zinc-300",
  orange: "bg-orange-500/15 text-orange-300",
  green: "bg-emerald-500/15 text-emerald-300",
  amber: "bg-amber-500/15 text-amber-300",
  rose: "bg-rose-500/15 text-rose-300",
  blue: "bg-sky-500/15 text-sky-300",
};

/** Small status pill. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
