"use client";

import React, { useState, useCallback } from "react";
import { useAccount } from "@/context/AccountContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ImageConstants } from "@/constant/image.index";

const SHOWCASE_SLIDES = [
  {
    id: "scenarios",
    title: "Practice workplace scenarios with zero risk",
    description:
      "Step into high-stakes customer resolutions, tech support cases, and team negotiations with adaptive AI.",
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

export default function LoginPage() {
  const { loginAsIndividual, loginAsOrganization } = useAccount();
  const router = useRouter();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currentSlide = SHOWCASE_SLIDES[currentSlideIndex];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === SHOWCASE_SLIDES.length - 1 ? 0 : prev + 1,
    );
  };

  const handleLoginSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        if (
          email.toLowerCase().includes("owner") ||
          email.toLowerCase().includes("acme") ||
          email.toLowerCase().includes("org")
        ) {
          loginAsOrganization({
            orgName: "Acme Corp",
            email: email || "owner@acmecorp.com",
            seats: "25",
            orgRole: "owner",
          });
          router.push("/");
        } else {
          loginAsIndividual({
            name: email
              ? email
                  .split("@")[0]
                  .replace(".", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "Sarah Jenkins",
            goal: "Customer Service",
            email: email || "sarah.jenkins@reallearning.ai",
          });
          router.push("/");
        }
      }, 500);
    },
    [email, loginAsIndividual, loginAsOrganization, router],
  );

  const handleQuickDemoFill = useCallback((role: "learner" | "owner") => {
    if (role === "owner") {
      setEmail("owner@acmecorp.com");
      setPassword("password123");
    } else {
      setEmail("sarah.jenkins@reallearning.ai");
      setPassword("password123");
    }
  }, []);

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
        {/* RIGHT SIDE: Ultra-Clean Email & Password Form (Silky Borders) */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6">
          <div className="w-full max-w-sm mx-auto space-y-6">
            {/* Brand Logo & Title */}
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
                Log in to your account
              </h1>
            </div>

            {/* Quick Demo Pre-fill */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <span className="font-normal">Quick fill:</span>
              <button
                type="button"
                onClick={() => handleQuickDemoFill("learner")}
                className="px-2.5 py-0.5 rounded-full bg-white border border-stone-200/90 hover:border-orange-500/80 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                Demo Learner
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill("owner")}
                className="px-2.5 py-0.5 rounded-full bg-white border border-stone-200/90 hover:border-orange-500/80 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                Demo Org
              </button>
            </div>

            {/* Clean Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Email address
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

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-medium text-stone-700">Password</label>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Demo Mode: Enter any password or click a quick-fill option above.",
                      )
                    }
                    className="text-xs text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white border border-stone-200/90 rounded-xl px-3.5 pr-10 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer p-0.5"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors shadow-[0_2px_10px_-2px_rgba(234,88,12,0.3)] cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? "Signing in..." : "Continue"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-200/60">
              <span>Don&apos;t have an account? </span>
              <Link
                href="/get-started"
                className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
