"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useAccount } from "@/context/AccountContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
} from "lucide-react";
import { ImageConstants } from "@/constant/image.index";

interface TrackOption {
  id: string;
  title: string;
  image: string;
  description: string;
}

const CAREER_TRACKS: TrackOption[] = [
  {
    id: "customer-service",
    title: "Customer Service",
    image: "/images/specialist.jpg",
    description: "De-escalation, conflict resolution, and customer empathy dialogues.",
  },
  {
    id: "tech-support",
    title: "Technical Support",
    image: "/images/teck.jpg",
    description: "System troubleshooting, outage incident calls, and diagnostic workflows.",
  },
  {
    id: "it-specialist",
    title: "IT Specialist",
    image: "/images/step-career.jpg",
    description: "Security access, cloud incidents, and internal stakeholder requests.",
  },
  {
    id: "healthcare-support",
    title: "Healthcare Support",
    image: "/images/healthcare.jpg",
    description: "Patient inquiries, clinical routing, and physician communication.",
  },
];

const PRACTICE_PACING = [
  { id: "casual", label: "Casual", time: "10 min/day" },
  { id: "regular", label: "Regular", time: "20 min/day" },
  { id: "intensive", label: "Accelerated", time: "45 min/day" },
];

export default function IndividualOnboardingPage() {
  const { loginAsIndividual } = useAccount();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("customer-service");
  const [name, setName] = useState("Sarah Jenkins");
  const [email, setEmail] = useState("sarah.jenkins@reallearning.ai");
  const [selectedPacing, setSelectedPacing] = useState("regular");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTrack = useMemo(
    () => CAREER_TRACKS.find((t) => t.id === selectedTrackId) || CAREER_TRACKS[0],
    [selectedTrackId]
  );

  const handleCompleteSetup = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginAsIndividual({
        name: name || "Sarah Jenkins",
        goal: selectedTrack.title,
        email: email || "sarah.jenkins@reallearning.ai",
      });
      setCurrentStep(3);
      setIsSubmitting(false);
    }, 450);
  }, [loginAsIndividual, name, selectedTrack.title, email]);

  return (
    <main className="min-h-screen bg-orange-50 text-slate-900 font-sans flex flex-col justify-between p-4 sm:p-6 lg:p-10 selection:bg-orange-500 selection:text-white">
      {/* Header Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-2 border-b border-stone-200/60">
        <Link
          href="/get-started"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>

        {/* Brand Logo & Name */}
        <div className="inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white border border-stone-200/80 p-0.5 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <Image
              src={ImageConstants.brandLogo.src}
              alt="Real Learning Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-sm tracking-tight text-stone-900">
            Real Learning
          </span>
        </div>

        {/* Step Indicator */}
        <div className="text-xs font-medium text-stone-500">
          Step {currentStep} of 3
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-5xl w-full mx-auto my-auto py-8">
        
        {/* ============================================================ */}
        {/* STEP 1: SELECT CAREER SIMULATION TRACK */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                Select your simulation track
              </h1>
              <p className="text-xs text-stone-500">
                Choose a track to focus your initial workplace simulation scenarios.
              </p>
            </div>

            {/* 4 Clean Visual Track Cards (Silky Smooth Borders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {CAREER_TRACKS.map((track) => {
                const isSelected = selectedTrackId === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between bg-white text-left ${
                      isSelected
                        ? "border-orange-500 shadow-md ring-1 ring-orange-500"
                        : "border-stone-200/80 hover:border-stone-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)]"
                    }`}
                  >
                    {/* Top Image Preview */}
                    <div className="relative w-full h-36 bg-stone-900 overflow-hidden">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 right-2.5">
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                        {track.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-normal">
                        {track.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 1 Actions */}
            <div className="flex items-center justify-end pt-4 border-t border-stone-200/60">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] cursor-pointer flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: PROFILE & PRACTICE PACING */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-stone-950 tracking-tight">
                Learner Profile
              </h1>
              <p className="text-xs text-stone-500">
                Set your name and daily practice commitment.
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] space-y-4 text-left">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-white border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Pacing */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-stone-700">
                  Daily Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRACTICE_PACING.map((pace) => {
                    const isSelected = selectedPacing === pace.id;
                    return (
                      <div
                        key={pace.id}
                        onClick={() => setSelectedPacing(pace.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-orange-50/80 border-orange-500 ring-1 ring-orange-500"
                            : "bg-white border-stone-200/80 hover:border-stone-300"
                        }`}
                      >
                        <div className="text-xs font-semibold text-stone-900">
                          {pace.label}
                        </div>
                        <div className="text-[10px] text-orange-600 font-medium mt-0.5">
                          {pace.time}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteSetup}
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Setting up..." : "Complete Setup"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: CONFIRMATION & LAUNCH */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="max-w-sm mx-auto space-y-6">
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 text-center space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200/80 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-stone-950">
                  Ready to Practice!
                </h2>
                <p className="text-xs text-stone-500 font-normal">
                  Your simulation sandbox for <strong className="text-stone-900">{selectedTrack.title}</strong> is active.
                </p>
              </div>

              <Link
                href="/user-dashboard"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto flex items-center justify-between py-2 border-t border-stone-200/60 text-xs text-stone-500">
        <span>Real Learning &copy; 2026</span>
        <Link href="/login" className="hover:text-stone-900 font-medium">
          Sign in
        </Link>
      </footer>
    </main>
  );
}
