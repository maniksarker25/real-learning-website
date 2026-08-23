"use client";

import React, { useCallback } from "react";
import { IndSimulationsScreen } from "@/components/individual-dashboard/screens/IndSimulationsScreen";
import { useRouter } from "next/navigation";

export default function UserSimulationsPage() {
  const router = useRouter();

  const handleNavigateToTab = useCallback(
    (tabId: string) => {
      if (tabId === "dashboard") router.push("/user-dashboard");
      else router.push(`/user-dashboard/${tabId}`);
    },
    [router]
  );

  return <IndSimulationsScreen onNavigateToTab={handleNavigateToTab} />;
}
