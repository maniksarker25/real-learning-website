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
    router.push("/get-started");
  }, [logout, router]);

  const navItems = useMemo(() => {
    const items = [
      { href: "/organization-dashboard", label: "Overview", icon: LayoutDashboard },
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
      }
    );

    return items;
  }, [isOwner]);

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-[#0d0e15]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Org Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center group-hover:border-orange-400/60 transition-colors">
              <Zap className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
              REAL{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                LEARNING
              </span>
            </span>
          </Link>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 border border-orange-400/30 text-orange-300">
            <Building2 className="w-3 h-3 text-orange-400" />
            <span>{session.orgName || "Acme Corp"} Workspace</span>
          </span>
        </div>

        {/* Right Header: Role Indicator & Logout */}
        <div className="flex items-center gap-3">
          {isOwner ? (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Organization Owner</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Organization Admin</span>
              </div>
              <button
                onClick={() => {
                  switchWorkspace("personal");
                  router.push("/user-dashboard");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-orange-500/20 text-orange-300 hover:text-white border border-orange-400/30 text-xs font-bold transition-colors cursor-pointer"
                title="Return to your personal learning dashboard"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Personal Learning</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors cursor-pointer"
              title="Logout from Organization Workspace"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Bleed Layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#0d0e14]/95 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-row md:flex-col justify-between shrink-0 gap-4">
          <div className="w-full space-y-4">
            {/* Organization Workspace Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-md font-black",
                  isOwner
                    ? "bg-gradient-to-br from-amber-500 to-orange-500 text-black"
                    : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                )}
              >
                {isOwner ? "👑" : "🛡️"}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white leading-none truncate">
                  {session.orgName || "Acme Corp"}
                </div>
                <div className="text-[10px] text-white/50 font-mono leading-tight mt-1 flex items-center gap-1">
                  <span className={cn(isOwner ? "text-amber-400 font-semibold" : "text-blue-400 font-semibold")}>
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
                  (item.href.includes("simulations") && pathname.includes("classes")) ||
                  (item.href.includes("members") && pathname.includes("participants"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors cursor-pointer w-full text-left",
                      isActive
                        ? "bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-300 border border-orange-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive ? "text-orange-400" : "text-white/40"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span
                        className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded-full hidden md:inline-block",
                          isActive
                            ? "bg-orange-500/30 text-orange-200"
                            : "bg-white/5 text-white/40"
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.badge && !item.count && (
                      <span
                        className={cn(
                          "text-[9px] font-mono px-1.5 py-0.5 rounded hidden md:inline-block",
                          isOwner
                            ? "bg-amber-500/10 text-amber-300 border border-amber-400/30"
                            : "bg-blue-500/10 text-blue-300 border border-blue-400/30"
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
          <div className="hidden md:block bg-black/60 rounded-2xl p-3.5 border border-white/10 mt-auto text-xs space-y-2">
            <div className="flex items-center justify-between text-white/60">
              <span>Allocated Seats</span>
              <span className="text-orange-400 font-mono font-bold">
                18 / {session.seats || "25"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full w-[72%]" />
            </div>
            <div className="text-[10px] text-white/40 font-mono text-center flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>{isOwner ? "Owner Managed" : "Admin Pilot View"}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#07080c] overflow-y-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
});

