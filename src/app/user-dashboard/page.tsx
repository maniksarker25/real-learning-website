"use client";

import React, { useCallback } from "react";
import { IndHomeScreen } from "@/components/individual-dashboard/screens/IndHomeScreen";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const router = useRouter();

  const handleNavigateToTab = useCallback(
    (tabId: string) => {
      if (tabId === "dashboard") router.push("/user-dashboard");
      else router.push(`/user-dashboard/${tabId}`);
    },
    [router]
  );

  return <IndHomeScreen onNavigateToTab={handleNavigateToTab} />;
}
