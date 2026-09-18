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
  Compass,
  X,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";
import {
  LearningLoopProvider,
  useLearningLoop,
} from "@/context/LearningLoopContext";

function UserDashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { session, logout, switchWorkspace } = useAccount();
  const { setStep } = useLearningLoop();
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
    [switchWorkspace, router],
  );

  interface NavItem {
    href: string;
    label: string;
    shortLabel?: string;
    icon: React.ElementType;
    count?: string;
  }

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: "/user-dashboard",
        label: "Dashboard",
        shortLabel: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/user-dashboard/practice",
        label: "Learning GPS",
        shortLabel: "GPS",
        icon: Compass,
      },
      {
        href: "/user-dashboard/progress",
        label: "Progress",
        shortLabel: "Progress",
        icon: BarChart3,
      },
      {
        href: "/user-dashboard/goals",
        label: "Goals",
        shortLabel: "Goals",
        icon: Target,
      },
      {
        href: "/user-dashboard/settings",
        label: "Settings",
        shortLabel: "Settings",
        icon: Settings,
      },
    ],
    [],
  );

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const content = (
    <div className="h-screen bg-[#FBF9F5] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Top Application Header */}
      <header className="shrink-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {isMobileSearchOpen ? (
          /* Mobile Search Overlay Bar */
          <div className="flex items-center gap-2 w-full animate-in fade-in duration-200">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons & simulations..."
                className="w-full bg-stone-50 border border-stone-200 rounded-full pl-9 pr-8 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer shrink-0"
              title="Close Search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Brand Logo & Active Session Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
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

              {/* Active Context Tag (Responsive Width) */}
              <div className="relative min-w-0">
                <button
                  onClick={() => setIsWorkspaceMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 transition-colors cursor-pointer max-w-[140px] xs:max-w-[180px] sm:max-w-none"
                >
                  {isEnrolledInOrg ? (
                    <>
                      <Building2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="font-bold text-stone-900 truncate">
                        {session.orgName}
                      </span>
                      <span className="hidden xs:inline text-[9px] text-orange-700 font-mono bg-orange-100 border border-orange-200 px-1.5 py-0.2 rounded font-bold shrink-0">
                        Member
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="font-medium text-stone-800 truncate">
                        Personal
                      </span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 text-stone-400 shrink-0 ml-0.5" />
                </button>

                {/* Workspace Switcher Menu Dropdown */}
                {isWorkspaceMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 max-w-[90vw] z-50 bg-white border border-stone-200 rounded-2xl p-2.5 shadow-md space-y-1.5 animate-in fade-in slide-in-from-top-2">
                    <div className="text-[10px] font-mono text-stone-400 px-2 py-1 uppercase font-bold">
                      Switch Workspace / Organization
                    </div>

                    {/* Personal Learning Space */}
                    <button
                      onClick={() => handleSelectWorkspace("personal")}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer",
                        !isEnrolledInOrg
                          ? "bg-orange-50 border border-orange-300 text-stone-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-950",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 text-xs">
                            Personal Learning Space
                          </div>
                          <div className="text-[10px] text-stone-500 font-mono">
                            Independent Practice
                          </div>
                        </div>
                      </div>
                      {!isEnrolledInOrg && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                      )}
                    </button>

                    {/* Organization Memberships (Admin or Member) */}
                    <div className="pt-1.5 border-t border-stone-100 space-y-1">
                      <div className="text-[10px] font-mono text-stone-400 px-2 py-0.5 uppercase">
                        Your Organizations
                      </div>

                      {/* Organization where user is Admin */}
                      <button
                        onClick={() =>
                          handleSelectWorkspace("ws-globex-admin", "admin")
                        }
                        className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-stone-700 hover:bg-blue-50 hover:text-blue-900 border border-transparent transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                              <span>Globex Global</span>
                              <span className="text-[9px] bg-blue-100 text-blue-800 border border-blue-200 font-mono px-1.5 py-0.2 rounded font-bold">
                                Admin
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500 font-mono">
                              Manage Workspace & Members
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-blue-600 transition-colors" />
                      </button>

                      {/* Organization where user is Member */}
                      <button
                        onClick={() =>
                          handleSelectWorkspace("ws-initech-member", "member")
                        }
                        className={cn(
                          "w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer",
                          session.orgName === "Initech Learning"
                            ? "bg-purple-50 border border-purple-300 text-purple-950 font-bold"
                            : "text-stone-700 hover:bg-purple-50 hover:text-purple-950",
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                              <span>Initech Learning</span>
                              <span className="text-[9px] bg-purple-100 text-purple-800 border border-purple-200 font-mono px-1.5 py-0.2 rounded font-bold">
                                Member
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500 font-mono">
                              Assigned Simulations Track
                            </div>
                          </div>
                        </div>
                        {session.orgName === "Initech Learning" && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile Search Toggle Button */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Desktop Search Bar */}
              <div className="hidden md:block relative w-44 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons & simulations..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-full pl-9 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 border-l border-stone-200 pl-2 sm:pl-3">
                <NotificationDropdown />

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2 sm:px-3 sm:py-1.5 rounded-full border border-stone-200 transition-colors cursor-pointer"
                  title="Logout from Account"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Full-Bleed Application Body */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Mobile Navigation Header Bar (Replaces horizontal scroll with a crisp, visible 5-tab grid) */}
        <div className="md:hidden bg-[#FCFAF6] border-b border-stone-200 px-2.5 py-2 shrink-0 z-30 shadow-xs">
          <nav className="grid grid-cols-5 gap-1 bg-white p-1 rounded-2xl border border-stone-200 shadow-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (item.href === "/user-dashboard/practice") {
                      setStep("pathfinder");
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all cursor-pointer text-center select-none",
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 mb-0.5 shrink-0 transition-transform",
                      isActive ? "text-orange-400 scale-105" : "text-stone-400"
                    )}
                  />
                  <span className="text-[10px] font-semibold tracking-tight truncate w-full">
                    {item.shortLabel || item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Left Sidebar Navigation */}
        <aside className="hidden md:flex w-60 h-full bg-[#FCFAF6] border-r border-stone-200 p-4 flex-col justify-between shrink-0 overflow-y-auto">
          <div className="w-full space-y-4">
            {/* Learner Profile Card Header */}
            <Link
              href="/user-dashboard/settings"
              className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 transition-colors cursor-pointer group"
              title="View & Edit Profile / Subscription"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-xs shrink-0 overflow-hidden">
                {session.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.avatarUrl}
                    alt={session.name || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="truncate flex-1">
                <div className="text-xs font-bold text-stone-900 leading-none truncate group-hover:text-orange-600 transition-colors">
                  {session.name || "Hosain Ali"}
                </div>
                <div className="text-[10px] text-orange-700 font-mono leading-tight mt-1 truncate font-medium">
                  {isEnrolledInOrg
                    ? `${session.orgName} (Member)`
                    : session.goal || "Customer Service"}
                </div>
              </div>
            </Link>

            {/* Sidebar Tab List */}
            <div className="flex flex-col gap-1 w-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/user-dashboard/practice") {
                        setStep("pathfinder");
                      }
                    }}
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
                          "text-[10px] font-mono px-2 py-0.5 rounded-full inline-block",
                          isActive
                            ? "bg-orange-200 text-orange-900 font-bold"
                            : "bg-stone-100 text-stone-500",
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
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200 mt-auto text-xs space-y-2">
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5 text-orange-600 font-semibold">
                <span>Streak</span>
              </span>
              <span className="text-stone-900 font-mono font-bold">7 Days 🔥</span>
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-[75%]" />
            </div>
            <div className="text-[10px] text-stone-400 font-mono text-center">
              Learning Loop Active
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#FBF9F5] overflow-y-auto">
          <div className="space-y-5 max-w-6xl mx-auto">
            {/* Organization Member Banner if in Member mode */}
            {isEnrolledInOrg && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-purple-50/50 to-white border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-xs flex items-center gap-2">
                      <span>Enrolled in {session.orgName} Track</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-mono font-bold">
                        Organization Member
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Your completed simulations and progress are tracked and
                      submitted directly to your organization.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectWorkspace("personal")}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer shrink-0"
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

  return content;
}

export default memo(function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LearningLoopProvider>
      <UserDashboardLayoutInner>{children}</UserDashboardLayoutInner>
    </LearningLoopProvider>
  );
});
