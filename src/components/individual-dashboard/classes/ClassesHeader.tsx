import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button, SectionTitle } from "@/components/dashboard/ui";

interface ClassesHeaderProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const ClassesHeader = memo(function ClassesHeader({ onLaunchPracticeSimulator }: ClassesHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <SectionTitle title="Learn the basics" className="mb-1" />
        <p className="text-sm text-zinc-400">Read the short lessons, take the quiz, or jump straight to practice.</p>
      </div>
      <Button variant="outline" onClick={() => onLaunchPracticeSimulator?.("sim-1")}>
        Skip to practice
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
});
