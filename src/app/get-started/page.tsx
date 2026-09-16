"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { ImageConstants } from "@/constant/image.index";

const SHOWCASE_SLIDES = [
  {
    id: "scenarios",
    title: "Practice workplace scenarios with zero risk",
    description:
      "Step into high-stakes customer resolutions, tech support cases, and team negotiations with adaptive voice AI.",
    image: "/images/step-career.jpg",
  },
  {
    id: "feedback",
    title: "Verifiable skill progress with instant neural feedback",
    description:
      "Get evaluated on empathy, tone, active listening, and precision with real-time audio analytics.",
    image: "/images/teck.jpg",
  },
  {
    id: "enterprise",
    title: "Onboard and upskill high-performing teams faster",
    description:
      "Empower organizations to assign realistic career tracks, track participant progress, and certify skills.",
    image: "/images/specialist.jpg",
  },
];

export default function GetStartedPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"individual" | "organization">("individual");

  const currentSlide = SHOWCASE_SLIDES[currentSlideIndex];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === SHOWCASE_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 text-slate-900 font-sans flex flex-col justify-center p-4 sm:p-6 lg:p-10 selection:bg-orange-500 selection:text-white">
      {/* Top Back Link */}
      <div className="max-w-6xl w-full mx-auto mb-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Real Learning</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        
        {/* ============================================================ */}
        {/* LEFT SIDE: Website Representation Showcase Card (Silky Smooth) */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 bg-stone-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] border border-white/[0.06] relative overflow-hidden min-h-[440px] lg:min-h-[540px]">
          
          {/* Top Visual Image Preview */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-stone-900 border border-white/[0.08] shadow-inner">
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          </div>

          {/* Text Content */}
          <div className="mt-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {currentSlide.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed max-w-md font-normal">
              {currentSlide.description}
            </p>
          </div>

          {/* Bottom Slider Controls */}
          <div className="pt-6 flex items-center justify-between border-t border-white/[0.06] mt-6">
            <div className="flex items-center gap-1.5">
              {SHOWCASE_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? "w-6 bg-orange-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/[0.08]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/[0.08]"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT SIDE: Clean Account Selection (Silky Borders) */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-white border border-stone-200/80 p-1 flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                  <Image
                    src={ImageConstants.brandLogo.src}
                    alt="Real Learning Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl tracking-tight text-stone-900">
                  Real Learning
                </span>
              </div>

              <h1 className="text-2xl font-bold text-stone-950 tracking-tight">
                Get started with Real Learning
              </h1>
              <p className="text-xs text-stone-500 font-normal">
                Choose your account type to begin practicing.
              </p>
            </div>

            {/* Account Option Cards */}
            <div className="space-y-2.5">
              {/* Option 1: Individual */}
              <div
                onClick={() => setSelectedPlan("individual")}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedPlan === "individual"
                    ? "bg-white border-orange-500 shadow-sm ring-1 ring-orange-500"
                    : "bg-white/80 border-stone-200/80 hover:border-stone-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900">
                        Personal Learner
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Independent simulation practice
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                    Free
                  </span>
                </div>
              </div>

              {/* Option 2: Organization */}
              <div
                onClick={() => setSelectedPlan("organization")}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedPlan === "organization"
                    ? "bg-white border-orange-500 shadow-sm ring-1 ring-orange-500"
                    : "bg-white/80 border-stone-200/80 hover:border-stone-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900">
                        Organization / Team
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Assign career tracks &amp; monitor results
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                    Pilot
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Highlights */}
            <div className="bg-white/70 border border-stone-200/70 rounded-xl p-3.5 space-y-2 text-left shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="text-[11px] font-medium text-stone-700 uppercase tracking-wider">
                {selectedPlan === "individual"
                  ? "Included with Personal Account"
                  : "Included with Organization Plan"}
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {selectedPlan === "individual" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Realistic workplace simulations &amp; feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Real-time voice AI evaluation &amp; tone scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>No card required</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Dedicated team seats &amp; admin dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Custom scenario assignments &amp; cohort metrics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Team performance reports</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Primary Action Button */}
            <Link
              href={
                selectedPlan === "individual"
                  ? "/onboarding/individual"
                  : "/onboarding/organization"
              }
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              <span>
                {selectedPlan === "individual"
                  ? "Continue as Individual"
                  : "Continue as Organization"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Footer */}
            <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-200/60">
              <span>Already have an account? </span>
              <Link
                href="/login"
                className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                Log in
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
