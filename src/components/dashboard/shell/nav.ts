import { BarChart3, Compass, LayoutDashboard, Settings, Target, type LucideIcon } from "lucide-react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const USER_NAV: DashboardNavItem[] = [
  { href: "/user-dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/user-dashboard/practice", label: "Practice", icon: Compass },
  { href: "/user-dashboard/progress", label: "Progress", icon: BarChart3 },
  { href: "/user-dashboard/goals", label: "Goals", icon: Target },
  { href: "/user-dashboard/settings", label: "Settings", icon: Settings },
];

export const PRACTICE_HREF = "/user-dashboard/practice";
