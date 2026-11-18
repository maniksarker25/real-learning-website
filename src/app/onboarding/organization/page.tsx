"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { display } from "@/components/about/shared";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

const SEAT_OPTIONS = [
  { value: "10", label: "10 seats", desc: "Starter team" },
  { value: "25", label: "25 seats", desc: "Recommended" },
  { value: "50", label: "50 seats", desc: "Growing team" },
  { value: "100+", label: "100+ seats", desc: "Large organization" },
];

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/70 focus:outline-none";

export default function OrganizationOnboardingPage() {
  const { loginAsOrganization } = useAccount();

  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState("25");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    [loginAsOrganization, orgName, email, seats],
  );

  return (
    <main className="flex min-h-dvh flex-col bg-[#121212] px-4 py-5 font-sans text-white selection:bg-orange-500 selection:text-white sm:px-6 lg:px-10">
      {/* top bar */}
      <div className="mx-auto mb-5 flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/get-started"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 py-2 pl-2.5 pr-4 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
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

        <div className="flex flex-col justify-center rounded-[28px] border border-white/[0.06] bg-[#181818] px-5 py-8 sm:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="relative block h-9 w-9 overflow-hidden rounded-lg bg-white">
                <Image src="/icons/brand-mark.png" alt="" fill sizes="36px" className="object-contain p-0.5" />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.01em]">Real Learning</span>
            </div>

            {submitted ? (
              /* ---------------- success ---------------- */
              <div className="pt-react-idle mt-8 flex flex-col items-start">
                <div className="relative h-48 w-32">
                  <div className="pt-react-bounce pt-idle relative h-full w-full">
                    <Image
                      src="/images/patricia/pose-thumbs-up.png"
                      alt="Patricia giving a thumbs up"
                      fill
                      sizes="128px"
                      className="object-contain object-bottom"
                    />
                  </div>
                  <span className="pt-fx absolute -right-6 top-0 block h-10 w-10">
                    <span className="pt-fx-float relative block h-full w-full">
                      <Image src="/images/patricia/fx-sparkles.png" alt="" fill sizes="40px" className="object-contain" />
                    </span>
                  </span>
                </div>
                <h1 className={`${display.className} mt-6 text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
                  Workspace ready
                </h1>
                <p className="mt-3 text-base text-zinc-400">
                  <span className="text-white">{orgName || "Your team"}</span> is set up with{" "}
                  <span className="text-white">{seats} seats</span>. Next, invite your team and create
                  your first class.
                </p>
                <Link
                  href="/organization-dashboard"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-4 text-base font-semibold text-black transition-colors hover:bg-orange-400"
                >
                  Open team dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              /* ---------------- form ---------------- */
              <>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div className="pb-1">
                    <h1 className={`${display.className} text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
                      Set up your team
                    </h1>
                    <p className="mt-3 text-base text-zinc-400">Create a workspace in under a minute.</p>
                  </div>
                  <div aria-hidden className="relative h-24 w-16 shrink-0 sm:h-28 sm:w-[72px]">
                    <div className="pt-idle relative h-full w-full">
                      <Image
                        src="/images/patricia/pose-cross-arms.png"
                        alt=""
                        fill
                        sizes="72px"
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">Organization name</span>
                    <input
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">Work email</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className={inputCls}
                    />
                  </label>

                  <div>
                    <p className="mb-3 text-sm font-medium text-white">How many people?</p>
                    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Team size">
                      {SEAT_OPTIONS.map((o) => {
                        const active = seats === o.value;
                        return (
                          <button
                            key={o.value}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setSeats(o.value)}
                            className={`relative rounded-xl border px-4 py-3 text-left transition-colors ${
                              active
                                ? "border-orange-500 bg-orange-500 text-black"
                                : "border-white/[0.08] text-white hover:border-white/25"
                            }`}
                          >
                            <span className="block text-base font-semibold">{o.label}</span>
                            <span className={`block text-sm ${active ? "text-black/70" : "text-zinc-500"}`}>
                              {o.desc}
                            </span>
                            {active && (
                              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-60"
                  >
                    {isLoading ? "Creating workspace..." : "Create workspace"}
                    {!isLoading && <ArrowRight className="h-5 w-5" />}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-500">
                  Just for yourself?{" "}
                  <Link href="/onboarding/individual" className="font-medium text-white hover:text-orange-400">
                    Join as an individual
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
