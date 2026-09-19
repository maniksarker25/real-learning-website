"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Zap,
  Building2,
  Crown,
  Shield,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrgRole } from "@/types/account";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";

export default memo(function OrgDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, logout, switchWorkspace } = useAccount();
  const isOwner = session.orgRole !== "admin";

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  interface OrgNavItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: string;
    badge?: string;
  }

  const navItems = useMemo(() => {
    const items: OrgNavItem[] = [
      {
        href: "/organization-dashboard",
        label: "Overview",
        icon: LayoutDashboard,
      },
    ];

    // Only Owner can see and manage Admins
    if (isOwner) {
      items.push({
        href: "/organization-dashboard/admins",
        label: "Admins",
        icon: Shield,
        count: "3",
        badge: "Leadership",
      });
    }

    items.push(
      {
        href: "/organization-dashboard/members",
        label: "Members",
        icon: Users,
        count: "1.2k",
      },
      {
        href: "/organization-dashboard/simulations",
        label: "Simulations",
        icon: BookOpen,
        count: "6",
      },
      {
        href: "/organization-dashboard/settings",
        label: "Settings",
        icon: Settings,
        badge: isOwner ? "Owner" : "Admin View",
      },
    );

    return items;
  }, [isOwner]);

  return (
    <div className="h-screen w-full max-w-full bg-[#FBF9F5] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Top Application Bar */}
      <header className="shrink-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 px-3 sm:px-4 md:px-5 lg:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Org Badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden shadow-sm">
              <Image
                src={ImageConstants.brandLogo.src}
                alt="Brand Logo"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </div>
            <span className="hidden sm:inline text-sm sm:text-base font-extrabold tracking-wider text-stone-950 uppercase font-sans">
              REAL{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                LEARNING
              </span>
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 border border-orange-200 text-orange-900 max-w-[120px] sm:max-w-[160px] md:max-w-none truncate">
            <Building2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-bold truncate">
              {session.orgName || "Acme Corp"}
            </span>
            <span className="hidden md:inline text-[10px] text-orange-700 font-mono">
              Workspace
            </span>
          </span>
        </div>

        {/* Right Header: Role Indicator, Switcher & Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {isOwner ? (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Owner</span>
            </div>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin</span>
            </div>
          )}

          <button
            onClick={() => {
              switchWorkspace("personal");
              router.push("/user-dashboard");
            }}
            className="inline-flex items-center gap-1.5 p-2 sm:px-2.5 md:px-3 sm:py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Return to your personal learning dashboard"
          >
            <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="hidden sm:inline">Personal</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 border-l border-stone-200 pl-2 sm:pl-2.5 md:pl-3">
            <NotificationDropdown />

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2 sm:px-2.5 md:px-3 sm:py-1.5 rounded-full border border-stone-200 transition-colors cursor-pointer"
              title="Logout from Organization Workspace"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Bleed Application Body */}
      <div className="flex-1 min-w-0 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Mobile Navigation Header Bar (Replaces horizontal scroll with a crisp, visible mobile tab grid) */}
        <div className="md:hidden bg-[#FCFAF6] border-b border-stone-200 px-2.5 py-2 shrink-0 z-30 shadow-xs">
          <nav
            className={cn(
              "grid gap-1 bg-white p-1 rounded-2xl border border-stone-200 shadow-xs",
              navItems.length === 5 ? "grid-cols-5" : "grid-cols-4",
            )}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href.includes("simulations") &&
                  pathname.includes("classes")) ||
                (item.href.includes("members") &&
                  pathname.includes("participants"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all cursor-pointer text-center select-none",
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 mb-0.5 shrink-0 transition-transform",
                      isActive ? "text-orange-400 scale-105" : "text-stone-400",
                    )}
                  />
                  <span className="text-[10px] font-semibold tracking-tight truncate w-full">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Left Sidebar Navigation: Sleek Rail on md (tablet 768-1023px), Full Sidebar on lg (desktop 1024px+) */}
        <aside className="hidden md:flex md:w-20 lg:w-60 h-full bg-[#FCFAF6] border-r border-stone-200 p-2.5 lg:p-4 flex-col justify-between shrink-0 overflow-y-auto transition-all duration-150">
          <div className="w-full space-y-3 lg:space-y-4">
            {/* Workspace Organization Profile Header */}
            <div className="flex items-center md:flex-col lg:flex-row gap-2.5 lg:gap-3 p-2 lg:p-3 rounded-2xl bg-white border border-stone-200 shadow-sm text-center lg:text-left">
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border mx-auto lg:mx-0",
                  isOwner
                    ? "bg-amber-100 border-amber-200 text-amber-800"
                    : "bg-blue-100 border-blue-200 text-blue-800",
                )}
                title={session.orgName || "Acme Corp"}
              >
                {isOwner ? (
                  <Crown className="w-4 h-4 text-amber-700" />
                ) : (
                  <Shield className="w-4 h-4 text-blue-700" />
                )}
              </div>
              <div className="truncate hidden lg:block">
                <div className="text-xs font-bold text-stone-900 leading-none truncate">
                  {session.orgName || "Acme Corp"}
                </div>
                <div className="text-[10px] font-mono leading-tight mt-1 flex items-center gap-1">
                  <span
                    className={cn(
                      "font-semibold",
                      isOwner ? "text-amber-700" : "text-blue-700",
                    )}
                  >
                    {isOwner ? "Organization Owner" : "Invited Org Admin"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Tab List */}
            <div className="flex flex-col gap-1 w-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href.includes("simulations") &&
                    pathname.includes("classes")) ||
                  (item.href.includes("members") &&
                    pathname.includes("participants"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    className={cn(
                      "rounded-xl font-semibold transition-colors cursor-pointer w-full text-center lg:text-left relative group",
                      // md (tablet): vertical stack centered icon + small label
                      "md:flex md:flex-col md:items-center md:justify-center md:py-2.5 md:px-1",
                      // lg (desktop): horizontal row space-between
                      "lg:flex-row lg:justify-between lg:py-2.5 lg:px-3.5",
                      isActive
                        ? "bg-orange-100/90 text-orange-950 border border-orange-300 font-bold"
                        : "text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-transparent",
                    )}
                  >
                    <div className="flex items-center md:flex-col lg:flex-row gap-2.5 md:gap-1 lg:gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform group-hover:scale-105",
                          isActive ? "text-orange-600" : "text-stone-400",
                        )}
                      />
                      <span className="text-[10px] lg:text-xs tracking-tight truncate">
                        {item.label}
                      </span>
                    </div>

                    {/* Count badge (cleanly shown on desktop) */}
                    {item.count && (
                      <span
                        className={cn(
                          "font-mono rounded-full hidden lg:inline-block text-[10px] px-2 py-0.5",
                          isActive
                            ? "bg-orange-200 text-orange-900 font-bold"
                            : "bg-stone-100 text-stone-500",
                        )}
                      >
                        {item.count}
                      </span>
                    )}

                    {/* Role badge */}
                    {item.badge && !item.count && (
                      <span
                        className={cn(
                          "font-mono font-bold rounded",
                          "hidden lg:inline-block text-[9px] px-1.5 py-0.5",
                          isOwner
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar Seat Quota Widget */}
          <div className="bg-white rounded-2xl p-2 lg:p-3.5 border border-stone-200 mt-auto text-xs space-y-2 shadow-sm text-center lg:text-left">
            {/* Tablet View (md): Compact Seat Stat */}
            <div className="md:flex md:flex-col md:items-center lg:hidden space-y-1 text-center py-1">
              <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                Seats
              </div>
              <div className="text-[11px] font-mono font-extrabold text-stone-800">
                18/{session.seats || "25"}
              </div>
              <div className="w-10 h-1 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 mx-auto">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-[72%]" />
              </div>
            </div>

            {/* Desktop View (lg): Full Card */}
            <div className="hidden lg:block space-y-2">
              <div className="flex items-center justify-between text-stone-600">
                <span className="font-semibold text-stone-700">
                  Allocated Seats
                </span>
                <span className="text-stone-900 font-mono font-bold">
                  18 / {session.seats || "25"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-[72%]" />
              </div>
              <div className="text-[10px] text-stone-400 font-mono text-center flex items-center justify-center gap-1">
                <span>{isOwner ? "Owner Managed" : "Admin Pilot View"}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-5 md:p-5 lg:p-8 bg-[#FBF9F5] overflow-y-auto overflow-x-hidden">
          <div className="space-y-4 md:space-y-5 max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
});
