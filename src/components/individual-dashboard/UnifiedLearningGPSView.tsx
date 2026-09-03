"use client";

import React, { memo, useCallback } from "react";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { LearningLoopStepper } from "./LearningLoopStepper";
import { IndPathfinderScreen } from "./screens/IndPathfinderScreen";
import { IndClassesScreen } from "./screens/IndClassesScreen";
import { IndSimulationsScreen } from "./screens/IndSimulationsScreen";
import { IndFeedbackScreen } from "./screens/IndFeedbackScreen";
import { CareerPath, LearningLoopStep } from "@/types/individual";

export const UnifiedLearningGPSView = memo(function UnifiedLearningGPSView() {
  const {
    currentStep,
    setStep,
    activePath,
    selectCareerPath,
    startClass,
    launchPracticeSimulator,
    chooseNextStep,
  } = useLearningLoop();

  const handleSelectPath = useCallback(
    (path: CareerPath) => {
      selectCareerPath(path);
    },
    [selectCareerPath]
  );

  const handleStartClass = useCallback(
    (classId: string) => {
      startClass(classId);
    },
    [startClass]
  );

  const handleLaunchPracticeSimulator = useCallback(
    (scenarioId?: string) => {
      launchPracticeSimulator(scenarioId || "sim-1");
    },
    [launchPracticeSimulator]
  );

  const handleNavigateFromSimOrFeedback = useCallback(
    (tabId: string) => {
      if (tabId === "pathfinder") setStep("pathfinder");
      else if (tabId === "classes") setStep("class");
      else if (tabId === "simulations") setStep("simulator");
      else if (tabId === "feedback" || tabId === "progress") setStep("feedback");
      else setStep("pathfinder");
    },
    [setStep]
  );

  const handleStepperSelect = useCallback(
    (step: LearningLoopStep) => {
      setStep(step);
    },
    [setStep]
  );

  return (
    <div className="space-y-6">
      {/* Dynamic Step Container */}
      <div className="transition-all duration-300">
        {currentStep === "pathfinder" && (
          <IndPathfinderScreen
            onSelectPath={handleSelectPath}
            onStartClass={handleStartClass}
          />
        )}

        {currentStep === "class" && (
          <IndClassesScreen
            onLaunchPracticeSimulator={handleLaunchPracticeSimulator}
          />
        )}

        {currentStep === "simulator" && (
          <IndSimulationsScreen
            onNavigateToTab={handleNavigateFromSimOrFeedback}
          />
        )}

        {(currentStep === "feedback" ||
          currentStep === "skill_progress" ||
          currentStep === "next_step") && (
          <IndFeedbackScreen
            onNavigateToTab={handleNavigateFromSimOrFeedback}
          />
        )}
      </div>
    </div>
  );
});
