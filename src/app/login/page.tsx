"use client";

import React, { useState, useCallback } from "react";
import Navbar from "@/components/front-end/Navbar";
import { useAccount } from "@/context/AccountContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Crown,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { loginAsIndividual, loginAsOrganization } = useAccount();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleType, setSelectedRoleType] = useState<"normal_user" | "organization_owner">("normal_user");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMsg(null);

      setTimeout(() => {
        setIsLoading(false);
        if (selectedRoleType === "organization_owner") {
          loginAsOrganization({
            orgName: "Acme Corp",
            email: email || "owner@acmecorp.com",
            seats: "25",
            orgRole: "owner",
          });
          router.push("/organization-dashboard");
        } else {
          loginAsIndividual({
            name: email.split("@")[0] || "Hosain Ali",
            goal: "Customer Service",
          });
          router.push("/user-dashboard");
        }
      }, 700);
    },
    [email, selectedRoleType, loginAsIndividual, loginAsOrganization, router]
  );

  const handleQuickOwnerLogin = useCallback(() => {
    loginAsOrganization({
      orgName: "Acme Corp",
      email: "hosain.owner@acmecorp.com",
      seats: "25",
      orgRole: "owner",
    });
    router.push("/organization-dashboard");
  }, [loginAsOrganization, router]);

  const handleQuickNormalUserLogin = useCallback(() => {
    loginAsIndividual({
      name: "Sarah Jenkins",
      goal: "Customer Service",
    });
    router.push("/user-dashboard");
  }, [loginAsIndividual, router]);

  return (
    <main className="bg-black text-slate-100 min-h-screen font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero / Login Container */}
      <section className="relative flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden flex flex-col justify-center items-center">
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

        {/* Ambient Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.3) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%)",
          }}
        />

        <div className="relative max-w-md w-full mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>WELCOME BACK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              Sign in to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                Real Learning
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-white/60">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="bg-[#12131c]/90 rounded-2xl p-3.5 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-white/40 uppercase text-center font-bold">
              ⚡ Instant Demo Quick-Login
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickOwnerLogin}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 transition-colors cursor-pointer text-center group"
              >
                <Crown className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Org Owner</span>
                <span className="text-[9px] text-white/40 font-mono">Acme Corp</span>
              </button>

              <button
                type="button"
                onClick={handleQuickNormalUserLogin}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-400/30 text-orange-300 transition-colors cursor-pointer text-center group"
              >
                <User className="w-4 h-4 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Normal User</span>
                <span className="text-[9px] text-white/40 font-mono">Personal Learner</span>
              </button>
            </div>
          </div>

          {/* Main Login Card Form */}
          <div className="bg-[#0e0f17]/95 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            {/* Account Type Selector Tab */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/60 border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedRoleType("normal_user")}
                className={cn(
                  "py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  selectedRoleType === "normal_user"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Normal User</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoleType("organization_owner")}
                className={cn(
                  "py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  selectedRoleType === "organization_owner"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Org Owner</span>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Email input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white/80">
                  {selectedRoleType === "organization_owner"
                    ? "Organization Work Email"
                    : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      selectedRoleType === "organization_owner"
                        ? "owner@acmecorp.com"
                        : "sarah.jenkins@example.com"
                    }
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-white/80">Password</label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Demo Mode: You can type any password or use the 1-click quick login above!");
                    }}
                    className="text-[11px] text-orange-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                <span>
                  {isLoading
                    ? "Signing In..."
                    : selectedRoleType === "organization_owner"
                    ? "Sign In to Organization Workspace"
                    : "Sign In to Learning Dashboard"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Bottom Link to Sign Up */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-white/60">
              <span>Don&apos;t have an account yet? </span>
              <Link
                href="/get-started"
                className="font-bold text-orange-400 hover:text-orange-300 hover:underline"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
