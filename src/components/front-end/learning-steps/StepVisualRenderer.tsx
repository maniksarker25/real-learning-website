"use client";

import React from "react";
import { CareerTrackVisual } from "./CareerTrackVisual";
import { IncidentSimulationVisual } from "./IncidentSimulationVisual";
import { AdaptiveAiAudioVisual } from "./AdaptiveAiAudioVisual";
import { MultiSkillScorecardVisual } from "./MultiSkillScorecardVisual";
import { VerifiedCredentialVisual } from "./VerifiedCredentialVisual";

export function StepVisualRenderer({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "step-01":
      return <CareerTrackVisual />;
    case "step-02":
      return <IncidentSimulationVisual />;
    case "step-03":
      return <AdaptiveAiAudioVisual />;
    case "step-04":
      return <MultiSkillScorecardVisual />;
    case "step-05":
      return <VerifiedCredentialVisual />;
    default:
      return null;
  }
}
