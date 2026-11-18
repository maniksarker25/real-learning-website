"use client";

import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "../ui";
import { MobileNav } from "./MobileNav";
import { NotificationsMenu } from "./NotificationsMenu";
import type { DashboardNavItem } from "./nav";
import { BrandMark, Sidebar, UserAvatar } from "./Sidebar";

/**
 * Generic dark app frame shared by the learner and organization dashboards:
 * sidebar (desktop), top bar, scrollable page area, bottom tab bar (mobile).
 */
export function AppShell({
  nav,
  isActive,
  onNavigate,
  user,
  profileHref,
  sidebarWidget,
  topLeft,
  topRight,
  banner,
  onLogout,
  children,
}: {
  nav: DashboardNavItem[];
  isActive: (href: string) => boolean;
  onNavigate?: (href: string) => void;
  user: { name: string; subtitle: string; avatarUrl?: string };
  profileHref: string;
  sidebarWidget?: ReactNode;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  banner?: ReactNode;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#121212] font-sans text-white selection:bg-orange-500 selection:text-white">
      <Sidebar
        items={nav}
        isActive={isActive}
        onNavigate={onNavigate}
        user={user}
        profileHref={profileHref}
        widget={sidebarWidget}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark className="md:hidden [&>span:last-child]:hidden sm:[&>span:last-child]:inline" />
            {topLeft}
          </div>
          <div className="flex items-center gap-2">
            {topRight}
            <NotificationsMenu />
            <Button variant="outline" size="sm" onClick={onLogout} aria-label="Log out" className="px-2.5 sm:px-3.5">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
            <span className="md:hidden">
              <UserAvatar src={user.avatarUrl} name={user.name} size={36} />
            </span>
          </div>
        </header>

        <main data-lenis-prevent className="flex-1 overflow-y-auto pb-28 md:pb-12">
          <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
            {banner}
            {children}
          </div>
        </main>
      </div>

      <MobileNav items={nav} isActive={isActive} onNavigate={onNavigate} />
    </div>
  );
}
