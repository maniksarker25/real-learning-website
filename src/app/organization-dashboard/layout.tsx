"use client";

import type { ReactNode } from "react";
import { OrgDashboardShell } from "@/components/dashboard/shell";

export default function OrgDashboardLayout({ children }: { children: ReactNode }) {
  return <OrgDashboardShell>{children}</OrgDashboardShell>;
}
