import { cn } from "@/lib/utils";

/** Pill tabs / chip selector. Solid orange when active, never a gradient. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "h-9 rounded-full px-4 text-sm font-medium transition-colors",
              active ? "bg-white text-black" : "border border-white/[0.08] text-zinc-400 hover:border-white/25 hover:text-white",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
