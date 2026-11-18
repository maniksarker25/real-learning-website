import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Accessible on/off switch. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-orange-500" : "bg-white/[0.12]",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

/** Settings row: title + description on the left, control on the right. */
export function SettingRow({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-base font-medium text-white">{title}</p>
        {description && <p className="mt-0.5 text-sm text-zinc-500">{description}</p>}
      </div>
      {children}
    </div>
  );
}
