"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { blob, display, NOISE } from "@/components/about/shared";

type Track = {
  id: string;
  title: string;
  description: string;
  plays: string;
  face: string;
  blob: string;
};

const CAREER_TRACKS: Track[] = [
  {
    id: "customer-service",
    title: "Customer Service",
    description: "De-escalation, conflict resolution and customer empathy.",
    plays: "frustrated customers",
    face: "angry",
    blob: blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  },
  {
    id: "tech-support",
    title: "Technical Support",
    description: "Troubleshooting, outage calls and step-by-step fixes.",
    plays: "stressed employees",
    face: "surprised",
    blob: blob("#1e40af", "#60a5fa", "#f97316", "#172554"),
  },
  {
    id: "it-specialist",
    title: "IT Specialist",
    description: "Security access, cloud incidents and stakeholder requests.",
    plays: "impatient managers",
    face: "confused",
    blob: blob("#4c1d95", "#a78bfa", "#ec4899", "#1e1b4b"),
  },
  {
    id: "healthcare-support",
    title: "Healthcare Support",
    description: "Patient questions, clinical routing and calm reassurance.",
    plays: "anxious patients",
    face: "sad",
    blob: blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  },
];

const PRACTICE_PACING = [
  { id: "casual", label: "Casual", time: "10 min/day" },
  { id: "regular", label: "Regular", time: "20 min/day" },
  { id: "intensive", label: "Accelerated", time: "45 min/day" },
];

const STEPS = ["Career track", "Your profile", "All set"];

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/70 focus:outline-none";

export default function IndividualOnboardingPage() {
  const { loginAsIndividual } = useAccount();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("customer-service");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPacing, setSelectedPacing] = useState("regular");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTrack = useMemo(
    () => CAREER_TRACKS.find((t) => t.id === selectedTrackId) || CAREER_TRACKS[0],
    [selectedTrackId],
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

  const firstName = (name || "there").split(" ")[0];

  return (
    <main className="flex min-h-dvh flex-col bg-[#121212] px-4 py-5 font-sans text-white selection:bg-orange-500 selection:text-white sm:px-6 lg:px-10">
      {/* top bar */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
        <Link
          href={currentStep === 2 ? "#" : "/get-started"}
          onClick={(e) => {
            if (currentStep === 2) {
              e.preventDefault();
              setCurrentStep(1);
            }
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 py-2 pl-2.5 pr-4 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <Link href="/" className="flex items-center gap-2.5" aria-label="Real Learning home">
          <span className="relative block h-8 w-8 overflow-hidden rounded-lg bg-white">
            <Image src="/icons/brand-mark.png" alt="" fill sizes="32px" className="object-contain p-0.5" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">Real Learning</span>
        </Link>
      </header>

      {/* progress */}
      <div className="mx-auto mt-8 w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-2">
          {STEPS.map((label, i) => (
            <div key={label}>
              <span
                className={`block h-1.5 rounded-full transition-colors duration-300 ${
                  i < currentStep ? "bg-orange-500" : "bg-white/10"
                }`}
              />
              <span
                className={`mt-2 block text-xs sm:text-sm ${i + 1 === currentStep ? "text-white" : "text-zinc-500"}`}
              >
                {i + 1}. {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col py-8 sm:py-10">
        {/* ---------------- Step 1: track ---------------- */}
        {currentStep === 1 && (
          <div className="pt-react-idle">
            <h1 className={`${display.className} text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
              Pick your career track
            </h1>
            <p className="mt-3 text-base text-zinc-400 sm:text-lg">
              Patricia will play the people you&apos;ll meet in this job.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Career track">
              {CAREER_TRACKS.map((t) => {
                const active = t.id === selectedTrackId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelectedTrackId(t.id)}
                    className={`group relative isolate flex items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 sm:p-6 ${
                      active ? "border-transparent" : "border-white/[0.06] bg-[#181818] hover:border-white/20"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 -z-10 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
                      style={{ background: t.blob }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
                      style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
                    />
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full bg-orange-200 ring-2 ring-white/10">
                      <Image src={`/images/patricia/${t.face}.png`} alt="" fill sizes="56px" className="object-cover object-top" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`${display.className} block text-lg uppercase leading-[1.15] sm:text-xl`}>
                        {t.title}
                      </span>
                      <span className={`mt-1.5 block text-sm sm:text-[15px] ${active ? "text-white/85" : "text-zinc-400"}`}>
                        {t.description}
                      </span>
                      <span className={`mt-3 block text-sm ${active ? "text-white/75" : "text-zinc-500"}`}>
                        Patricia plays {t.plays}
                      </span>
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-white bg-white text-black" : "border-white/20"
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-medium text-black transition-colors hover:bg-zinc-200 sm:w-auto"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- Step 2: profile ---------------- */}
        {currentStep === 2 && (
          <div className="pt-react-idle grid grid-cols-1 gap-3 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-[28px] border border-white/[0.06] bg-[#181818] p-6 sm:p-8">
              <h1 className={`${display.className} text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
                Your profile
              </h1>
              <p className="mt-3 text-base text-zinc-400">A few details and you&apos;re ready to practice.</p>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Full name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls}
                  />
                </label>

                <div>
                  <p className="mb-3 text-sm font-medium text-white">How much do you want to practice?</p>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Practice pace">
                    {PRACTICE_PACING.map((p) => {
                      const active = p.id === selectedPacing;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSelectedPacing(p.id)}
                          className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                            active
                              ? "border-orange-500 bg-orange-500 text-black"
                              : "border-white/[0.08] text-white hover:border-white/25"
                          }`}
                        >
                          <span className="block text-sm font-semibold sm:text-base">{p.label}</span>
                          <span className={`block text-xs sm:text-sm ${active ? "text-black/70" : "text-zinc-500"}`}>
                            {p.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-base text-white transition-colors hover:border-white/40"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteSetup}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-60"
                >
                  {isSubmitting ? "Creating your account..." : "Create my account"}
                  {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* summary */}
            <div className="relative isolate hidden flex-col overflow-hidden rounded-[28px] p-8 lg:flex">
              <span aria-hidden className="absolute inset-0 -z-20" style={{ background: selectedTrack.blob }} />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
                style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
              />
              <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <span className="h-2 w-2 rounded-full border border-white/70" />
                Your track
              </span>
              <p className={`${display.className} mt-4 text-2xl uppercase leading-[1.1]`}>{selectedTrack.title}</p>
              <p className="mt-2 text-sm text-white/80">Patricia plays {selectedTrack.plays}.</p>
              <div className="relative mt-auto h-64 w-full">
                <span className="absolute bottom-0 left-1/2 h-3 w-36 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md" />
                <div className="pt-idle relative h-full w-full">
                  <Image
                    src="/images/patricia/pose-thinking.png"
                    alt="Patricia"
                    fill
                    sizes="220px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Step 3: done ---------------- */}
        {currentStep === 3 && (
          <div className="pt-react-idle mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
            <div className="relative h-56 w-40 sm:h-64 sm:w-44">
              <div className="pt-react-bounce pt-idle relative h-full w-full">
                <Image
                  src="/images/patricia/pose-thumbs-up.png"
                  alt="Patricia giving a thumbs up"
                  fill
                  priority
                  sizes="176px"
                  className="object-contain object-bottom"
                />
              </div>
              <span className="pt-fx absolute -right-6 top-0 block h-12 w-12">
                <span className="pt-fx-float relative block h-full w-full">
                  <Image src="/images/patricia/fx-sparkles.png" alt="" fill sizes="48px" className="object-contain" />
                </span>
              </span>
            </div>

            <h1 className={`${display.className} mt-8 text-3xl uppercase leading-[1.08] tracking-[-0.01em] sm:text-4xl`}>
              You&apos;re all set, {firstName}!
            </h1>
            <p className="mt-3 max-w-md text-base text-zinc-400 sm:text-lg">
              Your <span className="text-white">{selectedTrack.title}</span> practice space is ready.
              Patricia is waiting for you.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/user-dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-base font-semibold text-black transition-colors hover:bg-orange-400"
              >
                Open my dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-base text-white transition-colors hover:border-white/40"
              >
                Try a quick simulation
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-white/[0.06] pt-4 text-sm text-zinc-500">
        <span>© {new Date().getFullYear()} Real Learning</span>
        <Link href="/login" className="font-medium text-zinc-300 hover:text-white">
          Log in instead
        </Link>
      </footer>
    </main>
  );
}
