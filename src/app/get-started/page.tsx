"use client";

import React, { useMemo } from "react";
import Navbar from "@/components/front-end/Navbar";
import { AccountSelectionHeader } from "@/components/account-selection/AccountSelectionHeader";
import { AccountSelectionCard } from "@/components/account-selection/AccountSelectionCard";
import { AccountOption } from "@/types/account";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function GetStartedPage() {
  const accountOptions: AccountOption[] = useMemo(
    () => [
      {
        id: "individual",
        title: "Individual",
        badgeText: "Personal Learning",
        description:
          "Learn at your own pace, build skills, practice through realistic simulations, and track your progress.",
        ctaText: "Continue as Individual",
        route: "/onboarding/individual",
        flowSteps: ["Goal", "Classes", "Simulations", "Feedback", "Progress"],
        features: [
          "Independent personal learning path without organization requirement",
          "Practice through interactive AI workplace simulations",
          "Real-time feedback & personal progress dashboard",
        ],
      },
      {
        id: "organization",
        title: "Organization",
        badgeText: "Teams & Pilots",
        description:
          "Build learning programs for your team, invite users, assign classes and simulations, and track progress and results.",
        ctaText: "Continue as Organization",
        route: "/onboarding/organization",
        flowSteps: [
          "Plan/Pilot",
          "Admin",
          "Users",
          "Classes + Sims",
          "Results",
        ],
        features: [
          "Fixed seat allocation for teams & initial paid pilots",
          "Assign targeted classes and workplace simulations",
          "Monitor user progress & evaluate team performance results",
        ],
      },
    ],
    []
  );

  return (
    <main className="bg-black text-slate-100 min-h-screen font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Container */}
      <section className="relative flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden flex flex-col justify-center">
        {/* Background Dot Matrix Grid */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage:
              "radial-gradient(100vh at 50% 20%, #000 40%, transparent 85%)",
            maskImage:
              "radial-gradient(100vh at 50% 20%, #000 40%, transparent 85%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(249,115,22,0.5) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Ambient Radial Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.3) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto w-full space-y-10 sm:space-y-12">
          {/* Header Section */}
          <AccountSelectionHeader />

          {/* Account Selection Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {accountOptions.map((option) => (
              <AccountSelectionCard key={option.id} option={option} />
            ))}
          </div>

          {/* Already have an account? Log In */}
          <div className="text-center text-xs text-white/60">
            <span>Already have an account? </span>
            <a
              href="/login"
              className="font-bold text-orange-400 hover:text-orange-300 hover:underline"
            >
              Sign In to Your Account &rarr;
            </a>
          </div>

          {/* Bottom Trust & Vision Footer */}
          <div className="pt-4 text-center border-t border-white/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No organization required for individual learners</span>
            </div>
            <div className="flex items-center gap-2 text-orange-300">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Instant Setup & Free to Start</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
