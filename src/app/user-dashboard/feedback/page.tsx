"use client";

import React, { useCallback } from "react";
import { IndFeedbackScreen } from "@/components/individual-dashboard/screens/IndFeedbackScreen";
import { useRouter } from "next/navigation";

export default function UserFeedbackPage() {
  const router = useRouter();

  const handleNavigateToTab = useCallback(
    (tabId: string) => {
      if (tabId === "dashboard") router.push("/user-dashboard");
      else router.push(`/user-dashboard/${tabId}`);
    },
    [router]
  );

  return <IndFeedbackScreen onNavigateToTab={handleNavigateToTab} />;
}
