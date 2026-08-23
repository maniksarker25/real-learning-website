"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Navbar from "@/components/front-end/Navbar";
import {
  User,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  PlayCircle,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";

export default memo(function IndividualOnboardingPage() {
  const { loginAsIndividual } = useAccount();
  const [name, setName] = useState("Hosain Ali");
  const [selectedGoal, setSelectedGoal] = useState("customer-service");
  const [submitted, setSubmitted] = useState(false);

  const goalOptions = useMemo(
    () => [
      { id: "customer-service", label: "Customer Service" },
      { id: "tech-support", label: "Tech Support" },
      { id: "it-specialist", label: "IT Specialist" },
      { id: "healthcare-support", label: "Healthcare Support" },
    ],
    [],
  );

  const flowSteps = useMemo(
    () => [
      { icon: Target, title: "1. Goal", desc: "Select your career target" },
      {
        icon: BookOpen,
        title: "2. Classes",
        desc: "Master essential concepts",
      },
      {
        icon: PlayCircle,
        title: "3. Simulations",
        desc: "Apply skills in AI workplace",
      },
      {
        icon: Sparkles,
        title: "4. Feedback",
        desc: "Receive real-time AI scoring",
      },
      {
        icon: BarChart3,
        title: "5. Progress",
        desc: "Track performance growth",
      },
    ],
    [],
  );

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const selectedObj = goalOptions.find((g) => g.id === selectedGoal);
    loginAsIndividual({ name, goal: selectedObj?.label || selectedGoal });
    setSubmitted(true);
  }, [loginAsIndividual, name, selectedGoal, goalOptions]);

  return (
    <main className="bg-black text-slate-100 min-h-screen font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />

      <section className="relative flex-1 px-4 sm:px-6 lg:px-8 py-12 overflow-hidden flex flex-col justify-center">
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

        <div className="relative max-w-4xl mx-auto w-full space-y-8">
          {/* Top Eyebrow & Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium">
              <User className="h-3.5 w-3.5 text-orange-400" />
              <span>INDIVIDUAL LEARNER ONBOARDING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Personal Learning{" "}
              <span className="bg-linear-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                Setup
              </span>
            </h1>
            <p className="text-sm text-white/70 max-w-lg mx-auto">
              Start at your own pace. Define your personal goal to jump directly
              into classes and realistic AI simulations.
            </p>
          </div>

          {/* Individual Core Experience Flow Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {flowSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="p-3 rounded-2xl bg-[#0d0e15] border border-white/10 text-center space-y-1.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 mx-auto">
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-white/50">{step.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="bg-[#0d0e15] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Welcome to Real Learning, {name || "Learner"}!
                </h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  Your individual profile has been initialized for{" "}
                  <span className="text-orange-300 font-semibold">
                    {goalOptions.find((g) => g.id === selectedGoal)?.label}
                  </span>
                  .
                </p>
                <div className="pt-4 flex justify-center">
                  <Link
                    href="/user-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Enter Learner Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    Select Your Primary Learning Goal
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {goalOptions.map((goal) => (
                      <button
                        type="button"
                        key={goal.id}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          selectedGoal === goal.id
                            ? "bg-orange-500/10 border-orange-400 text-white"
                            : "bg-black/40 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span>{goal.label}</span>
                        {selectedGoal === goal.id && (
                          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Create Individual Account & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
});
