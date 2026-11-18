import { cn } from "@/lib/utils";

/** Flat single-colour progress track (no gradients). */
export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]", className)}
    >
      <div className={cn("h-full rounded-full bg-orange-500 transition-[width] duration-500", barClassName)} style={{ width: `${pct}%` }} />
    </div>
  );
}
