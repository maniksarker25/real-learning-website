import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One KPI: label, big number, small note underneath. */
export function StatTile({
  label,
  value,
  note,
  icon: Icon,
  noteTone = "neutral",
  className,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: LucideIcon;
  noteTone?: "neutral" | "positive";
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-white/[0.06] bg-[#181818] p-5", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-zinc-400">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-zinc-500" />}
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white tabular-nums">{value}</div>
      {note && (
        <p className={cn("mt-1 text-sm", noteTone === "positive" ? "text-emerald-400" : "text-zinc-500")}>{note}</p>
      )}
    </div>
  );
}

/** Responsive 2 → 4 column wrapper for stat tiles. */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>{children}</div>;
}
