"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Building2, Eye, EyeOff, User } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { display } from "@/components/about/shared";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/70 focus:outline-none";

export default function LoginPage() {
  const { loginAsIndividual, loginAsOrganization } = useAccount();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Demo login (unchanged behaviour): org-like emails go to the org dashboard
  const handleLoginSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        const lower = email.toLowerCase();
        if (lower.includes("owner") || lower.includes("acme") || lower.includes("org")) {
          loginAsOrganization({
            orgName: "Acme Corp",
            email: email || "owner@acmecorp.com",
            seats: "25",
            orgRole: "owner",
          });
          router.push("/organization-dashboard");
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
          router.push("/user-dashboard");
        }
      }, 500);
    },
    [email, loginAsIndividual, loginAsOrganization, router],
  );

  const quickFill = useCallback((role: "learner" | "owner") => {
    setEmail(role === "owner" ? "owner@acmecorp.com" : "sarah.jenkins@reallearning.ai");
    setPassword("password123");
  }, []);

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
          New here?{" "}
          <Link href="/get-started" className="font-medium text-white hover:text-orange-400">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
        <AuthShowcase />

        {/* ---------------- form ---------------- */}
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
                  Welcome back
                </h1>
                <p className="mt-3 text-base text-zinc-400">Log in to keep practicing.</p>
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

            {/* demo quick fill */}
            <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
              <p className="text-sm text-zinc-400">Exploring? Fill in a demo account:</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickFill("learner")}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-3 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:border-orange-500/60 hover:text-white"
                >
                  <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-orange-200">
                    <Image src="/images/patricia/happy.png" alt="" fill sizes="32px" className="object-cover object-top" />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-zinc-500" />
                    Learner
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => quickFill("owner")}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-3 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:border-orange-500/60 hover:text-white"
                >
                  <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-orange-200">
                    <Image src="/images/patricia/normal.png" alt="" fill sizes="32px" className="object-cover object-top" />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                    Organization
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputCls}
                />
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Demo mode: enter any password, or use a demo account above.")}
                    className="text-sm text-zinc-400 transition-colors hover:text-orange-400"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                    className={`${inputCls} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition-colors hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded accent-orange-500"
                />
                Remember this device
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Log in"}
                {!isLoading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="/get-started" className="font-medium text-white hover:text-orange-400">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
