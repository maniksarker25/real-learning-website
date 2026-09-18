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
    <div className="h-screen bg-[#FBF9F5] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Top Application Bar */}
      <header className="shrink-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Org Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden shadow-sm">
              <Image
                src={ImageConstants.brandLogo.src}
                alt="Brand Logo"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </div>
            <span className="text-base font-extrabold tracking-wider text-stone-950 uppercase font-sans">
              REAL{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                LEARNING
              </span>
            </span>
          </Link>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 border border-orange-200 text-orange-900">
            <Building2 className="w-3.5 h-3.5 text-orange-600" />
            <span className="font-bold">{session.orgName || "Acme Corp"}</span>
            <span className="text-[10px] text-orange-700 font-mono">Workspace</span>
          </span>
        </div>

        {/* Right Header: Role Indicator, Switcher & Logout */}
        <div className="flex items-center gap-3">
          {isOwner ? (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Organization Owner</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Organization Admin</span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              switchWorkspace("personal");
              router.push("/user-dashboard");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Return to your personal learning dashboard"
          >
            <User className="w-3.5 h-3.5 text-orange-600" />
            <span className="hidden sm:inline">Personal Learning</span>
          </button>

          <div className="flex items-center gap-2 border-l border-stone-200 pl-3">
            <NotificationDropdown />

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full border border-stone-200 transition-colors cursor-pointer"
              title="Logout from Organization Workspace"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Bleed Application Body */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 h-auto md:h-full bg-[#FCFAF6] border-b md:border-b-0 md:border-r border-stone-200 p-4 flex flex-row md:flex-col justify-between shrink-0 gap-4 overflow-y-auto">
          <div className="w-full space-y-4">
            {/* Organization Workspace Card */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-sm font-black border",
                  isOwner
                    ? "bg-amber-100 border-amber-200 text-amber-800"
                    : "bg-blue-100 border-blue-200 text-blue-800",
                )}
              >
                {isOwner ? <Crown className="w-4 h-4 text-amber-700" /> : <Shield className="w-4 h-4 text-blue-700" />}
              </div>
              <div className="truncate">
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
            <div className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto">
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
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors cursor-pointer w-full text-left",
                      isActive
                        ? "bg-orange-100/90 text-orange-950 border border-orange-300 font-bold"
                        : "text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive ? "text-orange-600" : "text-stone-400",
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span
                        className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded-full hidden md:inline-block",
                          isActive
                            ? "bg-orange-200 text-orange-900 font-bold"
                            : "bg-stone-100 text-stone-500",
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.badge && !item.count && (
                      <span
                        className={cn(
                          "text-[9px] font-mono px-1.5 py-0.5 rounded hidden md:inline-block font-bold",
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
          <div className="hidden md:block bg-white rounded-2xl p-3.5 border border-stone-200 mt-auto text-xs space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-stone-600">
              <span className="font-semibold text-stone-700">Allocated Seats</span>
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
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#FBF9F5] overflow-y-auto">
          <div className="space-y-5 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
});
