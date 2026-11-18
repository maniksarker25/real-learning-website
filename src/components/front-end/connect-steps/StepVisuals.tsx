"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  Check,
  HeartPulse,
  Headphones,
  Lightbulb,
  SendHorizontal,
  MonitorCog,
  User,
  Award,
  MessageSquare,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared app-window frame (dark bezel like the hero video frame)      */
/* ------------------------------------------------------------------ */
export function AppWindow({
  crumbs,
  children,
}: {
  crumbs: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full rounded-[26px] bg-gradient-to-b from-zinc-700/70 via-zinc-800 to-zinc-900 p-[1px] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]">
      <div className="rounded-[25px] bg-[#1c1c1f] p-2 sm:p-2.5">
        <div className="overflow-hidden rounded-[18px] bg-[#141416] ring-1 ring-white/[0.06]">
          {/* Top bar */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <div className="flex min-w-0 items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500">
              {crumbs.map((c, i) => (
                <React.Fragment key={c}>
                  {i > 0 && <span>/</span>}
                  <span
                    className={`truncate ${
                      i === crumbs.length - 1 ? "font-medium text-zinc-200" : ""
                    }`}
                  >
                    {c}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 – Create your account                                         */
/* ------------------------------------------------------------------ */
export function AccountVisual() {
  return (
    <AppWindow crumbs={["Real Learning", "Get started"]}>
      <p className="text-sm font-semibold text-white">How will you use Real Learning?</p>
      <p className="mt-1 text-xs text-zinc-500">You can switch or add a workspace later.</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="relative rounded-xl border border-orange-500/60 bg-orange-500/[0.08] p-3.5 sm:p-4">
          <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
            <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
          </span>
          <User className="h-5 w-5 text-orange-400" />
          <p className="mt-3 text-sm font-semibold text-white">For myself</p>
          <p className="mt-0.5 text-[11px] leading-snug text-zinc-400">Practice and grow at my own pace</p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-4">
          <Building2 className="h-5 w-5 text-zinc-400" />
          <p className="mt-3 text-sm font-semibold text-zinc-200">For my team</p>
          <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">Seats, classes and reporting</p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <div>
          <p className="mb-1 text-[11px] text-zinc-500">Full name</p>
          <div className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-2 text-xs text-zinc-200">
            Jordan Lee
          </div>
        </div>
        <div>
          <p className="mb-1 text-[11px] text-zinc-500">Work email</p>
          <div className="rounded-lg border border-orange-500/40 bg-black/40 px-3 py-2 text-xs text-zinc-200">
            jordan@company.com<span className="ml-0.5 animate-pulse text-orange-400">|</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-orange-500 py-2.5 text-center text-xs font-semibold text-black">
        Create free account
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 – Shape your path                                             */
/* ------------------------------------------------------------------ */
const TRACKS = [
  { name: "Customer Service", icon: MessageSquare, active: true },
  { name: "Technical Support", icon: Headphones },
  { name: "IT Specialist", icon: MonitorCog },
  { name: "Healthcare Support", icon: HeartPulse },
];

export function PathVisual() {
  return (
    <AppWindow crumbs={["Onboarding", "Your path"]}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Pick a career track</p>
        <span className="text-[11px] text-zinc-500">Step 2 of 3</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {TRACKS.map(({ name, icon: Icon, active }) => (
          <div
            key={name}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 ${
              active
                ? "border-orange-500/60 bg-orange-500/[0.08]"
                : "border-white/[0.08] bg-white/[0.02]"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                active ? "bg-orange-500/20 text-orange-400" : "bg-white/[0.05] text-zinc-400"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className={`text-xs font-medium leading-tight ${active ? "text-white" : "text-zinc-300"}`}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs font-medium text-zinc-300">Weekly pace</p>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-black/40 p-1 ring-1 ring-white/[0.06]">
        {["Casual", "Regular", "Accelerated"].map((p) => (
          <div
            key={p}
            className={`rounded-lg py-2 text-center text-[11px] font-medium ${
              p === "Regular" ? "bg-white text-black" : "text-zinc-400"
            }`}
          >
            {p}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
        <p className="text-[11px] uppercase tracking-wider text-zinc-500">Your plan</p>
        <p className="mt-1 text-xs text-zinc-200">
          3 sessions a week · focus on <span className="text-orange-400">de-escalation</span> and{" "}
          <span className="text-orange-400">clear follow-ups</span>
        </p>
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 – Chat simulation with Patricia                               */
/* ------------------------------------------------------------------ */
function PatriciaAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full bg-orange-500/15 ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/patricia/normal.png"
        alt="Patricia"
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
      />
    </span>
  );
}

export function PracticeVisual() {
  return (
    <AppWindow crumbs={["Practice", "Billing escalation"]}>
      {/* chat header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2.5">
          <PatriciaAvatar size={36} />
          <div>
            <p className="text-sm font-semibold text-white">Patricia</p>
            <p className="text-[11px] text-zinc-500">Playing: frustrated customer</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Text simulation
        </span>
      </div>

      {/* conversation */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-end gap-2">
          <PatriciaAvatar size={22} />
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.05] px-3 py-2 text-[11px] leading-relaxed text-zinc-300">
            I&apos;ve been charged twice this month and nobody has called me back.
          </div>
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-orange-500/15 px-3 py-2 text-[11px] leading-relaxed text-orange-100">
          I&apos;m sorry, that&apos;s frustrating. Let me pull up both charges right now.
        </div>
        <div className="flex items-end gap-2">
          <PatriciaAvatar size={22} />
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.05] px-3 py-2 text-[11px] leading-relaxed text-zinc-300">
            Fine. But I want this fixed today, not next week.
          </div>
        </div>
        {/* typing indicator */}
        <div className="flex items-end gap-2">
          <PatriciaAvatar size={22} />
          <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white/[0.05] px-3 py-2.5">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* coach tip */}
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-orange-500/25 bg-orange-500/[0.06] px-3 py-2">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
        <p className="text-[11px] leading-snug text-zinc-300">
          Good empathy. Now give a clear time frame.
        </p>
      </div>

      {/* message input */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 py-1.5 pl-3 pr-1.5">
        <span className="flex-1 truncate text-[11px] text-zinc-500">Type your reply...</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-black">
          <SendHorizontal className="h-3.5 w-3.5" />
        </span>
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 – Track and prove progress                                    */
/* ------------------------------------------------------------------ */
const SKILLS = [
  { name: "Empathy", value: 88 },
  { name: "Problem solving", value: 74 },
  { name: "Clarity", value: 91 },
  { name: "Composure", value: 67 },
];

export function ProgressVisual() {
  const score = 82;
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <AppWindow crumbs={["Dashboard", "Progress"]}>
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#f97316"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - score / 100)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-white">{score}</span>
            <span className="text-[9px] uppercase tracking-wider text-zinc-500">Score</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Readiness this week</p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-400">
            Up <span className="text-emerald-400">+9 pts</span> since your first session
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {SKILLS.map((s) => (
          <div key={s.name}>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-zinc-300">{s.name}</span>
              <span className="font-mono text-zinc-500">{s.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-orange-500/30 bg-orange-500/[0.06] p-3">
        <Award className="h-5 w-5 shrink-0 text-orange-400" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white">Customer Service · Level 2</p>
          <p className="truncate text-[11px] text-zinc-400">Shareable credential ready to send</p>
        </div>
      </div>
    </AppWindow>
  );
}
