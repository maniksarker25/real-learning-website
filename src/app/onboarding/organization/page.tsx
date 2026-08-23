"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Navbar from "@/components/front-end/Navbar";
import { Building2, CheckCircle2, ArrowRight, Layers, ShieldCheck, Users, LineChart } from "lucide-react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";

export default memo(function OrganizationOnboardingPage() {
  const { loginAsOrganization } = useAccount();
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState("25");
  const [submitted, setSubmitted] = useState(false);

  const seatPackages = useMemo(
    () => [
      { value: "10", label: "10 Seats (Starter Pilot)" },
      { value: "25", label: "25 Seats (Team Pilot)" },
      { value: "50", label: "50 Seats (Growth Pilot)" },
      { value: "100+", label: "100+ Enterprise Seats" },
    ],
    []
  );

  const flowSteps = useMemo(
    () => [
      { icon: Layers, title: "1. Plan/Pilot", desc: "Define pilot scope & seats" },
      { icon: ShieldCheck, title: "2. Admin", desc: "Workspace setup" },
      { icon: Users, title: "3. Users", desc: "Invite team members" },
      { icon: Building2, title: "4. Classes + Sims", desc: "Assign custom programs" },
      { icon: LineChart, title: "5. Results", desc: "Track progress & metrics" },
    ],
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsOrganization({ orgName, email, seats });
      setSubmitted(true);
    },
    [loginAsOrganization, orgName, email, seats]
  );

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
              <Building2 className="h-3.5 w-3.5 text-orange-400" />
              <span>ORGANIZATION PILOT ONBOARDING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Organization Program{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                Setup
              </span>
            </h1>
            <p className="text-sm text-white/70 max-w-lg mx-auto">
              Launch learning programs for your team. Start with a fixed seat pilot to assign classes, workplace simulations, and monitor progress.
            </p>
          </div>

          {/* Organization Experience Flow Cards */}
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
                  <div className="text-xs font-bold text-white">{step.title}</div>
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
                  Organization Workspace Initialized!
                </h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  Pilot reserved for <span className="text-orange-300 font-semibold">{orgName}</span> with <span className="text-orange-300 font-semibold">{seats} Seats</span>. Confirmation & onboarding keys sent to <span className="text-white font-mono">{email}</span>.
                </p>
                <div className="pt-4 flex justify-center">
                  <Link
                    href="/organization-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Enter Organization Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-2">
                      Organization / Team Name
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Acme Corp / Learning Team"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-2">
                      Admin Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@company.com"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    Pilot Seat Allocation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {seatPackages.map((pkg) => (
                      <button
                        type="button"
                        key={pkg.value}
                        onClick={() => setSeats(pkg.value)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          seats === pkg.value
                            ? "bg-orange-500/10 border-orange-400 text-white"
                            : "bg-black/40 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span>{pkg.label}</span>
                        {seats === pkg.value && (
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
                    <span>Create Organization Pilot & Continue</span>
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
