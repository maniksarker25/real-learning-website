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
  Sparkles,
  Compass,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { IndHomeScreen } from "./screens/IndHomeScreen";
import { IndPathfinderScreen } from "./screens/IndPathfinderScreen";
import { IndClassesScreen } from "./screens/IndClassesScreen";
import { IndSimulationsScreen } from "./screens/IndSimulationsScreen";
import { IndFeedbackScreen } from "./screens/IndFeedbackScreen";
import { IndProgressScreen } from "./screens/IndProgressScreen";
import { IndGoalsScreen } from "./screens/IndGoalsScreen";
import { IndSettingsScreen } from "./screens/IndSettingsScreen";
import { LearningLoopStepper } from "./LearningLoopStepper";
import { LearningLoopStep, CareerPath } from "@/types/individual";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";

export type IndTabType =
  | "dashboard"
  | "pathfinder"
  | "classes"
  | "simulations"
  | "feedback"
  | "progress"
  | "goals"
  | "settings";

export default memo(function IndDashboardLayout() {
  const { session, logout } = useAccount();
  const [activeTab, setActiveTab] = useState<IndTabType>("pathfinder");
  const [currentLoopStep, setCurrentLoopStep] =
    useState<LearningLoopStep>("pathfinder");
  const [activePath, setActivePath] = useState<CareerPath | null>(null);
  const [activeSimTitle, setActiveSimTitle] = useState<string | undefined>(
    undefined,
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleNavigateToTab = useCallback((tabId: string) => {
    const tab = tabId as IndTabType;
    setActiveTab(tab);
    if (tab === "pathfinder") setCurrentLoopStep("pathfinder");
    if (tab === "classes") setCurrentLoopStep("class");
    if (tab === "simulations") setCurrentLoopStep("simulator");
    if (tab === "feedback" || tab === "progress")
      setCurrentLoopStep("feedback");
  }, []);

  const handleSelectLoopStep = useCallback((step: LearningLoopStep) => {
    setCurrentLoopStep(step);
    if (step === "pathfinder") setActiveTab("pathfinder");
    if (step === "class") setActiveTab("classes");
    if (step === "simulator") setActiveTab("simulations");
    if (
      step === "feedback" ||
      step === "skill_progress" ||
      step === "next_step"
    ) {
      setActiveTab("feedback");
    }
  }, []);

  const handleSelectCareerPath = useCallback((path: CareerPath) => {
    setActivePath(path);
  }, []);

  const handleStartClassFromPathfinder = useCallback((classId: string) => {
    setCurrentLoopStep("class");
    setActiveTab("classes");
  }, []);

  const handleLaunchPracticeSimulator = useCallback((scenarioId?: string) => {
    setCurrentLoopStep("simulator");
    setActiveTab("simulations");
  }, []);

  const handleLaunchSimulationFromHome = useCallback(
    (scenarioTitle: string) => {
      setActiveSimTitle(scenarioTitle);
      setCurrentLoopStep("simulator");
      setActiveTab("simulations");
    },
    [],
  );

  const navItems = useMemo(
    () => [
      { id: "pathfinder" as const, label: "Pathfinder (GPS)", icon: Compass },
      { id: "classes" as const, label: "1. Class", icon: BookOpen, count: "3" },
      {
        id: "simulations" as const,
        label: "2. Simulator",
        icon: Zap,
        count: "3",
      },
      {
        id: "feedback" as const,
        label: "3. Feedback & GPS",
        icon: MessageSquare,
      },
      { id: "progress" as const, label: "Skills Radar", icon: BarChart3 },
      { id: "dashboard" as const, label: "Overview", icon: LayoutDashboard },
      { id: "goals" as const, label: "Goals", icon: Target },
      { id: "settings" as const, label: "Profile", icon: Settings },
    ],
    [],
  );

  return (
    <div className="h-screen bg-[#07080c] text-slate-100 font-sans flex flex-col overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Top Application Header */}
      <header className="shrink-0 z-50 bg-[#0d0e15]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Active Session Indicator */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-white border border-white/20 p-1 flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden shadow-sm">
              <Image
                src={ImageConstants.brandLogo.src}
                alt="Brand Logo"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </div>
            <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
              REAL{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                LEARNING
              </span>
            </span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 border border-orange-400/30 text-orange-300">
            <User className="w-3 h-3 text-orange-400" />
            <span>{session.name || "Hosain Ali"}</span>
          </span>
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
            <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70">
              <Bell className="w-4 h-4" />
            </div>

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
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 h-auto md:h-full bg-[#0d0e14]/95 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-row md:flex-col justify-between shrink-0 gap-4 overflow-y-auto">
          <div className="w-full space-y-4">
            {/* Learner Profile Card Header */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md overflow-hidden">
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
              <div className="truncate">
                <div className="text-xs font-bold text-white leading-none truncate">
                  {session.name || "Hosain Ali"}
                </div>
                <div className="text-[10px] text-orange-300 font-mono leading-tight mt-1 truncate">
                  {session.goal || "Customer Service"}
                </div>
              </div>
            </div>

            {/* Sidebar Tab List */}
            <div className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors cursor-pointer w-full text-left",
                      isActive
                        ? "bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-300 border border-orange-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive ? "text-orange-400" : "text-white/40",
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
                            : "bg-white/5 text-white/40",
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Goal Progress Widget */}
          <div className="hidden md:block bg-black/60 rounded-2xl p-3.5 border border-white/10 mt-auto text-xs space-y-2">
            <div className="flex items-center justify-between text-white/60">
              <span className="flex items-center gap-1.5 text-orange-400">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#07080c] overflow-y-auto space-y-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Top Stepper displaying active step in 6-stage GPS journey */}
            <LearningLoopStepper
              currentStep={currentLoopStep}
              onSelectStep={handleSelectLoopStep}
              activePathTitle={
                activePath?.title || "Technical Support Specialist"
              }
            />

            {/* Main Screen Router */}
            {activeTab === "pathfinder" && (
              <IndPathfinderScreen
                onSelectPath={handleSelectCareerPath}
                onStartClass={handleStartClassFromPathfinder}
              />
            )}
            {activeTab === "classes" && (
              <IndClassesScreen
                onLaunchPracticeSimulator={handleLaunchPracticeSimulator}
              />
            )}
            {activeTab === "simulations" && (
              <IndSimulationsScreen
                onNavigateToTab={handleNavigateToTab}
                activeScenarioTitle={activeSimTitle}
              />
            )}
            {activeTab === "feedback" && (
              <IndFeedbackScreen onNavigateToTab={handleNavigateToTab} />
            )}
            {activeTab === "dashboard" && (
              <IndHomeScreen
                onNavigateToTab={handleNavigateToTab}
                onLaunchSimulation={handleLaunchSimulationFromHome}
              />
            )}
            {activeTab === "progress" && <IndProgressScreen />}
            {activeTab === "goals" && <IndGoalsScreen />}
            {activeTab === "settings" && <IndSettingsScreen />}
          </div>
        </main>
      </div>
    </div>
  );
});
