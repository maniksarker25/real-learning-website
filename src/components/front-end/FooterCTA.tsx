import Link from "next/link";
import Image from "next/image";
import { Unbounded } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

/** Soft "blob" mesh: three colour blobs over a base colour */
const BLOB = [
  "radial-gradient(45% 60% at 12% 20%, #fb923c 0%, transparent 70%)",
  "radial-gradient(40% 55% at 88% 12%, #3b82f6 0%, transparent 70%)",
  "radial-gradient(55% 60% at 70% 100%, #f43f5e 0%, transparent 72%)",
  "radial-gradient(35% 45% at 35% 95%, #7c2d12 0%, transparent 70%)",
  "#c2410c",
].join(", ");

// Static film-grain texture (inline SVG, no image request, no JS)
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Meet Patricia", href: "/#meet-patricia" },
      { label: "Individuals & teams", href: "/#join" },
      { label: "How to start", href: "/#connect-with-us" },
      { label: "Try the demo", href: "/demo" },
      { label: "Get started free", href: "/get-started" },
    ],
  },
  {
    title: "For teams",
    links: [
      { label: "Team workspace", href: "/onboarding/organization" },
      { label: "Talk to our team", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Log in", href: "/login" },
    ],
  },
];

export default function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#121212] text-white">
      {/* ---------------- CTA card ---------------- */}
      <div className="mx-auto w-full max-w-7xl px-3 pt-8 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-9 text-white sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20"
            style={{ background: BLOB }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
          />

          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <span className="h-2 w-2 rounded-full border border-white/70" />
                Free to start
              </p>
              <h2
                className={`${display.className} mt-4 text-[28px] uppercase leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-[48px]`}
              >
                Practice today.
                <br />
                Ready on day one.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                Rehearse real work conversations with Patricia and get feedback
                you can act on.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Get started free
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/80"
                >
                  Try the demo
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/75">
                Training a team?{" "}
                <Link
                  href="/onboarding/organization"
                  className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  Set up a workspace
                </Link>
              </p>
            </div>

            {/* Patricia */}
            <div className="relative mx-auto hidden h-[260px] w-[190px] sm:block lg:h-[300px] lg:w-[220px]">
              <span className="absolute bottom-1 left-1/2 h-3 w-36 -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" />
              <div className="pt-idle relative h-full w-full">
                <Image
                  src="/images/patricia/pose-wave.png"
                  alt="Patricia waving"
                  fill
                  sizes="220px"
                  className="object-contain object-bottom"
                />
                <span className="pt-fx-float absolute -right-2 top-3 block h-11 w-11">
                  <Image src="/images/patricia/fx-sparkles.png" alt="" fill sizes="44px" className="object-contain" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Links ---------------- */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Real Learning home">
              <span className="relative block h-9 w-9 overflow-hidden rounded-lg bg-white">
                <Image src="/icons/brand-mark.png" alt="" fill sizes="36px" className="object-contain p-0.5" />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.01em]">Real Learning</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Workplace practice with an AI coach, for people and teams who want
              to be ready.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Real Learning. All rights reserved.</p>
          <p>Practice · Simulate · Get ready</p>
        </div>
      </div>

      {/* ---------------- Oversized wordmark ---------------- */}
      <div aria-hidden className="overflow-hidden px-3 sm:px-6">
        <p
          className={`${display.className} mx-auto max-w-7xl select-none whitespace-nowrap text-center text-[8.6vw] uppercase leading-[0.85] tracking-[-0.04em] text-white/[0.06] xl:text-[116px]`}
        >
          Real Learning
        </p>
      </div>
    </footer>
  );
}
