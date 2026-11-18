import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import { BlobCard, Button, PatriciaPose } from "@/components/dashboard/ui";

interface ClassPracticePromptCardProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}

export const ClassPracticePromptCard = memo(function ClassPracticePromptCard({
  onLaunchPracticeSimulator,
}: ClassPracticePromptCardProps) {
  return (
    <BlobCard tone="orange" className="sm:pr-48">
      <h3 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">Ready to try it for real?</h3>
      <p className="mt-2 max-w-md text-base text-white/85">
        Practice this lesson in a text chat with Patricia and get feedback right after.
      </p>
      <Button variant="white" size="lg" className="mt-6" onClick={() => onLaunchPracticeSimulator?.("sim-1")}>
        Start practice
        <ArrowRight className="h-5 w-5" />
      </Button>
      <PatriciaPose pose="thumbs-up" className="absolute bottom-0 right-6 hidden h-48 w-36 sm:block" sizes="144px" />
    </BlobCard>
  );
});
