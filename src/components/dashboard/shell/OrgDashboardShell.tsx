"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Building2, Crown, LayoutDashboard, Settings, Shield, User, Users, Zap } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { Badge, Button, ProgressBar } from "../ui";
import { AppShell } from "./AppShell";
import type { DashboardNavItem } from "./nav";

const ORG_BASE = "/organization-dashboard";

/** Organization (owner / admin) dashboard frame. */
export function OrgDashboardShell({ children }: { children: ReactNode }) {
  const { session, logout, switchWorkspace } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const isOwner = session.orgRole !== "admin";
  const seatsTotal = parseInt(session.seats || "25", 10) || 25;
  const seatsUsed = 18;

  // Only the owner can manage admins
  const nav = useMemo<DashboardNavItem[]>(
    () => [
      { href: ORG_BASE, label: "Overview", icon: LayoutDashboard },
      ...(isOwner ? [{ href: `${ORG_BASE}/admins`, label: "Admins", icon: Shield }] : []),
      { href: `${ORG_BASE}/members`, label: "Members", icon: Users },
      { href: `${ORG_BASE}/simulations`, label: "Simulations", icon: Zap },
      { href: `${ORG_BASE}/settings`, label: "Settings", icon: Settings },
    ],
    [isOwner],
  );

  // /classes and /participants are aliases of simulations and members
  const isActive = useCallback(
    (href: string) =>
      pathname === href ||
      (href.endsWith("/simulations") && pathname.startsWith(`${ORG_BASE}/classes`)) ||
      (href.endsWith("/members") && pathname.startsWith(`${ORG_BASE}/participants`)),
    [pathname],
  );

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  const goPersonal = useCallback(() => {
    switchWorkspace("personal");
    router.push("/user-dashboard");
  }, [switchWorkspace, router]);

  const orgName = session.orgName || "Acme Corp";

  return (
    <AppShell
      nav={nav}
      isActive={isActive}
      onLogout={handleLogout}
      profileHref={`${ORG_BASE}/settings`}
      user={{ name: orgName, subtitle: isOwner ? "Owner" : "Admin", avatarUrl: session.avatarUrl }}
      topLeft={
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-9 min-w-0 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-zinc-200">
            <Building2 className="h-4 w-4 shrink-0 text-orange-400" />
            <span className="truncate">{orgName}</span>
          </span>
          <Badge tone={isOwner ? "amber" : "blue"} className="hidden sm:inline-flex">
            {isOwner ? <Crown className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
            {isOwner ? "Owner" : "Admin"}
          </Badge>
        </div>
      }
      topRight={
        <Button variant="ghost" size="sm" onClick={goPersonal} className="hidden sm:inline-flex">
          <User className="h-4 w-4" />
          Personal
        </Button>
      }
      sidebarWidget={
        <>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-400">Seats used</span>
            <span className="text-sm font-medium text-white">
              {seatsUsed} / {seatsTotal}
            </span>
          </div>
          <ProgressBar value={seatsUsed} max={seatsTotal} className="mt-3" label="Seats used" />
          <p className="mt-2 text-xs text-zinc-500">{Math.max(seatsTotal - seatsUsed, 0)} seats left</p>
        </>
      }
    >
      {children}
    </AppShell>
  );
}
