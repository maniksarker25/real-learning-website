import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { blob as mesh, NOISE } from "@/components/about/shared";

/** Base surface: every dashboard block sits on one of these. */
export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  return (
    <Tag className={cn("rounded-3xl border border-white/[0.06] bg-[#181818] p-5 sm:p-6", className)}>
      {children}
    </Tag>
  );
}

/** Title row inside a card: title on the left, optional action on the right. */
export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex flex-wrap items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold tracking-[-0.01em] text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export type BlobTone = "orange" | "blue" | "green" | "rose" | "violet";

/** Blob mesh presets (same recipe as the marketing site). */
export const BLOBS: Record<BlobTone, string> = {
  orange: mesh("#c2410c", "#fb923c", "#f43f5e", "#7c2d12"),
  blue: mesh("#1e40af", "#60a5fa", "#a78bfa", "#172554"),
  green: mesh("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  rose: mesh("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  violet: mesh("#5b21b6", "#a78bfa", "#f472b6", "#2e1065"),
};

/** Grain overlay used on top of blob surfaces. */
export function Grain({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light", className)}
      style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
    />
  );
}

/** Colourful hero surface: blob mesh + grain, white text. */
export function BlobCard({
  tone = "orange",
  children,
  className,
}: {
  tone?: BlobTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-3xl p-6 text-white sm:p-8", className)}>
      <span aria-hidden className="absolute inset-0 -z-20" style={{ background: BLOBS[tone] }} />
      <Grain />
      {children}
    </div>
  );
}
