"use client";

import type { ReactNode } from "react";
import { LearningLoopProvider } from "@/context/LearningLoopContext";
import { DashboardShell } from "@/components/dashboard/shell";

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LearningLoopProvider>
      <DashboardShell>{children}</DashboardShell>
    </LearningLoopProvider>
  );
}
