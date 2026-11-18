"use client";

import { useCallback, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { Button, ProgressBar } from "../ui";
import { AppShell } from "./AppShell";
import { PRACTICE_HREF, USER_NAV } from "./nav";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

/** Learner dashboard frame. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const { session, logout, switchWorkspace } = useAccount();
  const { setStep } = useLearningLoop();
  const pathname = usePathname();
  const router = useRouter();

  const isMember = !!session.orgName && session.orgRole === "member";
  const streakDays = 7;

  const isActive = useCallback(
    (href: string) => (href === "/user-dashboard" ? pathname === href : pathname.startsWith(href)),
    [pathname],
  );

  // Opening "Practice" from the nav always starts at the path finder step
  const onNavigate = useCallback((href: string) => href === PRACTICE_HREF && setStep("pathfinder"), [setStep]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  const handleSelectWorkspace = useCallback(
    (workspaceId: string, role?: string) => {
      switchWorkspace(workspaceId);
      router.push(role === "admin" ? "/organization-dashboard" : "/user-dashboard");
    },
    [switchWorkspace, router],
  );

  return (
    <AppShell
      nav={USER_NAV}
      isActive={isActive}
      onNavigate={onNavigate}
      onLogout={handleLogout}
      profileHref="/user-dashboard/settings"
      user={{
        name: session.name || "Sarah Jenkins",
        subtitle: isMember ? `${session.orgName} member` : session.goal || "Customer Service",
        avatarUrl: session.avatarUrl,
      }}
      topLeft={<WorkspaceSwitcher orgName={session.orgName} isMember={isMember} onSelect={handleSelectWorkspace} />}
      sidebarWidget={
        <>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-400">Streak</span>
            <span className="text-sm font-medium text-white">{streakDays} days</span>
          </div>
          <ProgressBar value={Math.min(streakDays, 10)} max={10} className="mt-3" label="Streak toward 10 days" />
          <p className="mt-2 text-xs text-zinc-500">{Math.max(10 - streakDays, 0)} more to hit 10</p>
        </>
      }
      banner={
        isMember && (
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#181818] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">You&apos;re practicing with {session.orgName}</p>
                <p className="text-sm text-zinc-500">Your sessions and progress are shared with your organization.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleSelectWorkspace("personal")}>
              Switch to personal
            </Button>
          </div>
        )
      }
    >
      {children}
    </AppShell>
  );
}
