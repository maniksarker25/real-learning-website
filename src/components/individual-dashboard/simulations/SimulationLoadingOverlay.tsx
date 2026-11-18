"use client";

import { memo } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, PatriciaPose } from "@/components/dashboard/ui";

interface SimulationLoadingOverlayProps {
  feedbackStage: number;
}

const STAGES = ["Reading your replies", "Scoring empathy and problem solving", "Writing your coaching tips"];

export const SimulationLoadingOverlay = memo(function SimulationLoadingOverlay({
  feedbackStage,
}: SimulationLoadingOverlayProps) {
  return (
    <Card className="mx-auto my-6 max-w-lg text-center">
      <PatriciaPose pose="thinking" className="mx-auto h-32 w-24" sizes="96px" />
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-white">Preparing your feedback</h3>
      <p className="mt-1 text-sm text-zinc-400">Patricia is reviewing how the conversation went.</p>

      <ol className="mx-auto mt-6 max-w-sm space-y-3 text-left" aria-live="polite">
        {STAGES.map((label, i) => {
          const step = i + 1;
          const done = feedbackStage > step;
          const active = feedbackStage === step;
          return (
            <li key={label} className={cn("flex items-center gap-3 text-sm", done || active ? "text-white" : "text-zinc-600")}>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-orange-500 text-black" : "border border-white/10",
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-orange-400" />
                ) : null}
              </span>
              {label}
            </li>
          );
        })}
      </ol>
    </Card>
  );
});
