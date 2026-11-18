"use client";

import { memo } from "react";
import { BookOpen } from "lucide-react";
import { Button, PageHeader } from "@/components/dashboard/ui";

interface SimulationActiveBannerProps {
  scenarioTitle: string;
  careerTrackTitle?: string;
  onReviewClass?: () => void;
}

export const SimulationActiveBanner = memo(function SimulationActiveBanner({
  scenarioTitle,
  careerTrackTitle,
  onReviewClass,
}: SimulationActiveBannerProps) {
  return (
    <PageHeader
      eyebrow="Step 3 · Practice"
      title={scenarioTitle}
      description={`A text simulation for ${careerTrackTitle || "your career track"}. Reply in your own words.`}
      actions={
        onReviewClass && (
          <Button variant="outline" onClick={onReviewClass}>
            <BookOpen className="h-4 w-4" />
            Review class
          </Button>
        )
      }
    />
  );
});
