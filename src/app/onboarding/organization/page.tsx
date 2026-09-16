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
  Building2,
} from "lucide-react";
import { ImageConstants } from "@/constant/image.index";

const SHOWCASE_SLIDES = [
  {
    id: "enterprise",
    title: "Onboard and upskill high-performing teams faster",
    description:
      "Empower organizations to assign realistic career tracks, track participant progress, and certify skills.",
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
    id: "scenarios",
    title: "Practice workplace scenarios with zero risk",
    description:
      "Step into high-stakes customer resolutions, tech support cases, and team negotiations with adaptive AI.",
    image: "/images/specialist.jpg",
  },
];

const SEAT_OPTIONS = [
  { value: "10", label: "10 Seats", desc: "Starter Team" },
  { value: "25", label: "25 Seats", desc: "Recommended" },
  { value: "50", label: "50 Seats", desc: "Growth Tier" },
  { value: "100+", label: "100+ Seats", desc: "Enterprise" },
];

export default function OrganizationOnboardingPage() {
  const { loginAsOrganization } = useAccount();
  const router = useRouter();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [orgName, setOrgName] = useState("Acme Corp");
  const [email, setEmail] = useState("owner@acmecorp.com");
  const [seats, setSeats] = useState("25");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        loginAsOrganization({
          orgName: orgName || "Acme Corp",
          email: email || "owner@acmecorp.com",
          seats,
          orgRole: "owner",
        });
        setSubmitted(true);
      }, 450);
    },
    [loginAsOrganization, orgName, email, seats]
  );

  return (
    <main className="min-h-screen bg-orange-50 text-slate-900 font-sans flex flex-col justify-center p-4 sm:p-6 lg:p-10 selection:bg-orange-500 selection:text-white">
      {/* Top Back Link */}
      <div className="max-w-6xl w-full mx-auto mb-3 flex items-center justify-between">
        <Link
          href="/get-started"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Plans</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        
        {/* ============================================================ */}
        {/* LEFT SIDE: Clean Website Visual Showcase (Silky Smooth) */}
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
        {/* RIGHT SIDE: Organization Workspace Setup Form */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Header: Logo & Title */}
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
                Organization Workspace Setup
              </h1>
              <p className="text-xs text-stone-500 font-normal">
                Set up your team workspace to assign simulations and track results.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 text-center space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200/80 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Workspace Ready for {orgName}!
                </h3>
                <p className="text-xs text-stone-600 font-normal">
                  Allocated <strong className="text-stone-900">{seats} Seats</strong> with admin email <strong className="text-stone-900">{email}</strong>.
                </p>
                <div className="pt-2">
                  <Link
                    href="/organization-dashboard"
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)]"
                  >
                    <span>Enter Organization Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Organization Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-stone-700">
                    Organization / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full bg-white border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-stone-700">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@company.com"
                    className="w-full bg-white border border-stone-200/90 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {/* Seat Allocation */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-stone-700">
                    Team Seat Allocation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SEAT_OPTIONS.map((opt) => {
                      const isSelected = seats === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => setSeats(opt.value)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-orange-50/80 border-orange-500 ring-1 ring-orange-500"
                              : "bg-white border-stone-200/80 hover:border-stone-300"
                          }`}
                        >
                          <div className="text-xs font-semibold text-stone-900">
                            {opt.label}
                          </div>
                          <div className="text-[10px] text-stone-500 mt-0.5">
                            {opt.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    "Initializing workspace..."
                  ) : (
                    <>
                      <span>Create Workspace &amp; Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

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
