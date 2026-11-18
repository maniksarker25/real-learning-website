"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Building2, Check, User } from "lucide-react";
import { display } from "@/components/about/shared";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

type Plan = "individual" | "organization";

const PLANS: {
  id: Plan;
  icon: typeof User;
  title: string;
  text: string;
  badge: string;
  includes: string[];
  cta: string;
  href: string;
}[] = [
  {
    id: "individual",
    icon: User,
    title: "For myself",
    text: "Practice and grow at your own pace",
    badge: "Free",
    includes: ["Realistic workplace simulations", "Feedback after every session", "No card required"],
    cta: "Continue as an individual",
    href: "/onboarding/individual",
  },
  {
    id: "organization",
    icon: Building2,
    title: "For my team",
    text: "Seats, classes and team progress",
    badge: "Teams",
    includes: ["Team seats and an admin dashboard", "Assign scenarios to classes", "Team progress reports"],
    cta: "Continue as an organization",
    href: "/onboarding/organization",
  },
];

/** Small avatar visual: one Patricia for individuals, a stacked "team" for organizations */
function PlanVisual({ plan, active, icon: Icon }: { plan: Plan; active: boolean; icon: typeof User }) {
  const ring = active ? "ring-orange-500" : "ring-[#181818]";
  const face = (src: string, cls = "") => (
    <span className={`relative block h-9 w-9 overflow-hidden rounded-full bg-orange-200 ring-2 ${ring} ${cls}`}>
      <Image src={`/images/patricia/${src}.png`} alt="" fill sizes="36px" className="object-cover object-top" />
    </span>
  );

  if (plan === "individual") {
    return (
      <span className="relative flex h-11 w-[76px] shrink-0 items-center">
        <span className="relative block h-11 w-11 overflow-hidden rounded-full bg-orange-200 ring-2 ring-black/10">
          <Image src="/images/patricia/happy.png" alt="" fill sizes="44px" className="object-cover object-top" />
        </span>
        <span
          className={`absolute bottom-0 right-1 flex h-5 w-5 items-center justify-center rounded-full ${
            active ? "bg-black text-white" : "bg-zinc-700 text-zinc-200"
          }`}
        >
          <Icon className="h-3 w-3" />
        </span>
      </span>
    );
  }

  return (
    <span className="relative flex h-11 w-[76px] shrink-0 items-center">
      <span className="flex -space-x-4">
        {face("normal")}
        {face("excited")}
        {face("thinking")}
      </span>
      <span
        className={`absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full ${
          active ? "bg-black text-white" : "bg-zinc-700 text-zinc-200"
        }`}
      >
        <Icon className="h-3 w-3" />
      </span>
    </span>
  );
}

export default function GetStartedPage() {
  const [plan, setPlan] = useState<Plan>("individual");

  const selected = PLANS.find((p) => p.id === plan)!;

  return (
    <main className="flex min-h-dvh flex-col bg-[#121212] px-4 py-5 font-sans text-white selection:bg-orange-500 selection:text-white sm:px-6 lg:px-10">
      {/* top bar */}
      <div className="mx-auto mb-5 flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 py-2 pl-2.5 pr-4 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            <span className="hidden sm:inline">Back to </span>home
          </span>
        </Link>
        <p className="text-sm text-zinc-500">
          Have an account?{" "}
          <Link href="/login" className="font-medium text-white hover:text-orange-400">
            Log in
          </Link>
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
        <AuthShowcase />

        {/* ---------------- account selection ---------------- */}
        <div className="flex flex-col justify-center rounded-[28px] border border-white/[0.06] bg-[#181818] px-5 py-8 sm:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="relative block h-9 w-9 overflow-hidden rounded-lg bg-white">
                <Image src="/icons/brand-mark.png" alt="" fill sizes="36px" className="object-contain p-0.5" />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.01em]">Real Learning</span>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="pb-1">
                <h1 className={`${display.className} text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
                  Get started
                </h1>
                <p className="mt-3 text-base text-zinc-400">How will you use Real Learning?</p>
              </div>
              {/* small waving Patricia */}
              <div aria-hidden className="relative h-24 w-16 shrink-0 sm:h-28 sm:w-[72px]">
                <div className="pt-idle relative h-full w-full">
                  <Image src="/images/patricia/pose-wave.png" alt="" fill sizes="72px" className="object-contain object-bottom" />
                </div>
                <span className="pt-fx-float absolute -right-3 -top-1 block h-7 w-7">
                  <Image src="/images/patricia/fx-sparkles.png" alt="" fill sizes="28px" className="object-contain" />
                </span>
              </div>
            </div>

            {/* plan options */}
            <div className="mt-8 space-y-3" role="radiogroup" aria-label="Account type">
              {PLANS.map((p) => {
                const active = plan === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setPlan(p.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                      active
                        ? "border-orange-500 bg-orange-500 text-black"
                        : "border-white/[0.08] bg-black/20 text-white hover:border-white/25"
                    }`}
                  >
                    <PlanVisual plan={p.id} active={active} icon={Icon} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold">{p.title}</span>
                      <span className={`block text-sm ${active ? "text-black/70" : "text-zinc-400"}`}>
                        {p.text}
                      </span>
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        active ? "bg-black/15 text-black" : "bg-white/[0.06] text-zinc-300"
                      }`}
                    >
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* includes */}
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 p-5">
              <span aria-hidden className="absolute right-4 top-4 block h-9 w-9 opacity-90">
                <Image
                  src={plan === "individual" ? "/images/patricia/fx-sparkles.png" : "/images/patricia/fx-speech.png"}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </span>
              <p className="text-sm font-medium text-white">What&apos;s included</p>
              <ul className="mt-3 space-y-2.5">
                {selected.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300 sm:text-[15px]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-black">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={selected.href}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-medium text-black transition-colors hover:bg-zinc-200"
            >
              {selected.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>

            <p className="mt-5 text-center text-sm text-zinc-500">
              Not ready yet?{" "}
              <Link href="/demo" className="font-medium text-white hover:text-orange-400">
                Try the demo first
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
