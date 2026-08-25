"use client";

import React, { useCallback } from "react";
import { RecentSimulationsTable } from "@/components/individual-dashboard/RecentSimulationsTable";
import { useRouter } from "next/navigation";

export default function UserFeedbackPage() {
  const router = useRouter();

  const handleLaunchSimulation = useCallback(
    (scenarioTitle: string) => {
      router.push("/user-dashboard/simulations");
    },
    [router]
  );

  return <RecentSimulationsTable onLaunchSimulation={handleLaunchSimulation} />;
}

