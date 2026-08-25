"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  MessageSquare,
  BarChart3,
  Target,
  Settings,
  Search,
  Bell,
  LogOut,
  User,
  Flame,
  Building2,
  ChevronDown,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";

export default memo(function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, logout, switchWorkspace } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  const isEnrolledInOrg = !!session.orgName && session.orgRole === "member";

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  const handleSelectWorkspace = useCallback(
    (workspaceId: string, role?: string) => {
      switchWorkspace(workspaceId);
      setIsWorkspaceMenuOpen(false);
      if (role === "admin") {
        router.push("/organization-dashboard");
      } else {
        router.push("/user-dashboard");
      }
    },
    [switchWorkspace, router]
  );

  const navItems = useMemo(
    () => [
      { href: "/user-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/user-dashboard/classes", label: "Classes", icon: BookOpen, count: "3" },
      { href: "/user-dashboard/simulations", label: "Simulations", icon: Zap, count: "3" },
      { href: "/user-dashboard/progress", label: "Progress", icon: BarChart3 },
      { href: "/user-dashboard/goals", label: "Goals", icon: Target },
      { href: "/user-dashboard/settings", label: "Profile / Settings", icon: Settings },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-50 bg-[#0d0e15]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Active Session Indicator */}
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

          {/* Active Context Tag */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              {isEnrolledInOrg ? (
                <>
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-bold">{session.orgName}</span>
                  <span className="text-[10px] text-orange-300 font-mono bg-orange-500/20 px-1.5 py-0.2 rounded">
                    Member
                  </span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>Personal Learning</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-white/40 ml-0.5" />
            </button>

            {/* Workspace Switcher Menu Dropdown */}
            {isWorkspaceMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 z-50 bg-[#0e0f17] border border-white/15 rounded-2xl p-2.5 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-mono text-white/40 px-2 py-1 uppercase font-bold">
                  Switch Workspace / Organization
                </div>

                {/* Personal Learning Space */}
                <button
                  onClick={() => handleSelectWorkspace("personal")}
                  className={cn(
                    "w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer",
                    !isEnrolledInOrg
                      ? "bg-orange-500/15 border border-orange-400/40 text-white font-bold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Personal Learning Space</div>
                      <div className="text-[10px] text-white/40 font-mono">Independent Practice</div>
                    </div>
                  </div>
                  {!isEnrolledInOrg && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                </button>

                {/* Organization Memberships (Admin or Member) */}
                <div className="pt-1.5 border-t border-white/10 space-y-1">
                  <div className="text-[10px] font-mono text-white/40 px-2 py-0.5 uppercase">
                    Your Organizations
                  </div>

                  {/* Organization where user is Admin */}
                  <button
                    onClick={() => handleSelectWorkspace("ws-globex-admin", "admin")}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-white/70 hover:bg-blue-500/10 hover:text-white border border-transparent hover:border-blue-400/30 transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>Globex Global</span>
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono px-1.5 py-0.2 rounded font-bold">
                            Admin
                          </span>
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">Manage Workspace & Members</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400 transition-colors" />
                  </button>

                  {/* Organization where user is Member */}
                  <button
                    onClick={() => handleSelectWorkspace("ws-initech-member", "member")}
                    className={cn(
                      "w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer",
                      session.orgName === "Initech Learning"
                        ? "bg-purple-500/15 border border-purple-400/40 text-white font-bold"
                        : "text-white/70 hover:bg-purple-500/10 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>Initech Learning</span>
                          <span className="text-[9px] bg-purple-500/20 text-purple-300 font-mono px-1.5 py-0.2 rounded font-bold">
                            Member
                          </span>
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">Assigned Simulations Track</div>
                      </div>
                    </div>
                    {session.orgName === "Initech Learning" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-36 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search lessons & simulations..."
              className="w-full bg-black/60 border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <NotificationDropdown />

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors cursor-pointer"
              title="Logout from Account"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Bleed Application Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 bg-[#0d0e14]/95 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-row md:flex-col justify-between shrink-0 gap-4">
          <div className="w-full space-y-4">
            {/* Learner Profile Card Header */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white leading-none truncate">
                  {session.name || "Hosain Ali"}
                </div>
                <div className="text-[10px] text-orange-300 font-mono leading-tight mt-1 truncate">
                  {isEnrolledInOrg
                    ? `${session.orgName} (Member)`
                    : session.goal || "Customer Service"}
                </div>
              </div>
            </div>

            {/* Sidebar Tab List */}
            <div className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
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
                      <Icon className={cn("w-4 h-4", isActive ? "text-orange-400" : "text-white/40")} />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span
                        className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded-full hidden md:inline-block",
                          isActive ? "bg-orange-500/30 text-orange-200" : "bg-white/5 text-white/40"
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar Goal Progress Widget */}
          <div className="hidden md:block bg-black/60 rounded-2xl p-3.5 border border-white/10 mt-auto text-xs space-y-2">
            <div className="flex items-center justify-between text-white/60">
              <span className="flex items-center gap-1.5 text-orange-400">
                <Flame className="w-3.5 h-3.5" />
                <span>Streak</span>
              </span>
              <span className="text-white font-mono font-bold">7 Days 🔥</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full w-[75%]" />
            </div>
            <div className="text-[10px] text-white/40 font-mono text-center">
              Learning Loop Active
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#07080c] overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-5">
            {/* Organization Member Banner if in Member mode */}
            {isEnrolledInOrg && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span>Enrolled in {session.orgName} Track</span>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
                        Organization Member
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60">
                      Your completed simulations and progress are tracked and submitted directly to your organization.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectWorkspace("personal")}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer shrink-0"
                >
                  Switch to Personal Learning
                </button>
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
});
