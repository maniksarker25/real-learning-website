"use client";

import React, { useCallback } from "react";
import { IndHomeScreen } from "@/components/individual-dashboard/screens/IndHomeScreen";
import { useRouter } from "next/navigation";
import { useLearningLoop } from "@/context/LearningLoopContext";

export default function UserDashboardPage() {
  const router = useRouter();
  const { setStep, launchPracticeSimulator } = useLearningLoop();

  const handleNavigateToTab = useCallback(
    (tabId: string) => {
      if (tabId === "dashboard") {
        router.push("/user-dashboard");
      } else if (
        tabId === "practice" ||
        tabId === "pathfinder" ||
        tabId === "classes" ||
        tabId === "simulations" ||
        tabId === "feedback"
      ) {
        if (tabId === "pathfinder") setStep("pathfinder");
        else if (tabId === "classes") setStep("class");
        else if (tabId === "simulations") setStep("simulator");
        else if (tabId === "feedback") setStep("feedback");
        router.push("/user-dashboard/practice");
      } else {
        router.push(`/user-dashboard/${tabId}`);
      }
    },
    [router, setStep]
  );

  const handleLaunchSimulation = useCallback(
    (_scenarioTitle: string) => {
      launchPracticeSimulator("sim-1");
      setStep("simulator");
      router.push("/user-dashboard/practice");
    },
    [launchPracticeSimulator, setStep, router]
  );

  return (
    <IndHomeScreen
      onNavigateToTab={handleNavigateToTab}
      onLaunchSimulation={handleLaunchSimulation}
    />
  );
}
