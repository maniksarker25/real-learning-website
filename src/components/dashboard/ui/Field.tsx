import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/70 focus:outline-none";

/** Label + control + optional hint. */
export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium text-white">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-sm text-zinc-500">{hint}</span>}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputClass, "min-h-28 resize-y leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputClass, "appearance-none bg-[#141414] pr-10", className)} {...props}>
      {children}
    </select>
  );
}
