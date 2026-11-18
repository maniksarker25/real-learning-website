import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Unbounded } from "next/font/google";
import { cn } from "../../lib/utils";

// Display font used only for the card titles
const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

type BentoCard = {
  tag: string;
  title: string;
  text: string;
  href: string;
  image: string;
  alt: string;
  blob: string;
  featured?: boolean;
};

/** Build a soft "blob" mesh: three colour blobs over a base colour */
const blob = (base: string, a: string, b: string, c: string) =>
  [
    `radial-gradient(45% 55% at 18% 28%, ${a} 0%, transparent 70%)`,
    `radial-gradient(50% 60% at 85% 15%, ${b} 0%, transparent 70%)`,
    `radial-gradient(60% 55% at 65% 95%, ${c} 0%, transparent 72%)`,
    base,
  ].join(", ");

const CARDS: BentoCard[] = [
  {
    tag: "01",
    title: "Create your account",
    text: "Free for you or your whole team. Ready in a minute.",
    href: "/get-started",
    image: "/images/patricia/pose-wave.png",
    alt: "Patricia waving hello",
    blob: blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  },
  {
    tag: "02",
    title: "Pick your path",
    text: "Choose a career track and pace. We build your plan.",
    href: "/onboarding/individual",
    image: "/images/patricia/pose-thinking.png",
    alt: "Patricia thinking",
    blob: blob("#4c1d95", "#a78bfa", "#ec4899", "#1e1b4b"),
  },
  {
    tag: "03",
    title: "Practice with Patricia",
    text: "Chat through real work moments with your AI coach.",
    href: "/demo",
    image: "/images/patricia/pose-pointing.png",
    alt: "Patricia pointing and smiling",
    blob: blob("#1e40af", "#60a5fa", "#f97316", "#172554"),
    featured: true,
  },
  {
    tag: "04",
    title: "Track your growth",
    text: "Get scored every session and share your progress.",
    href: "/get-started",
    image: "/images/patricia/pose-thumbs-up.png",
    alt: "Patricia giving a thumbs up",
    blob: blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  },
  {
    tag: "For teams",
    title: "Bring your team",
    text: "Seats, classes and reporting in one workspace.",
    href: "/onboarding/organization",
    image: "/images/patricia/pose-cross-arms.png",
    alt: "Patricia standing confidently",
    blob: blob("#92400e", "#fbbf24", "#ef4444", "#3b1503"),
  },
  {
    tag: "Support",
    title: "Talk to us",
    text: "Questions before you start? We will help you set up.",
    href: "/contact",
    image: "/images/patricia/happy.png",
    alt: "Patricia smiling",
    blob: blob("#075985", "#22d3ee", "#a3e635", "#082f49"),
  },
];

// Static film-grain texture (inline SVG, no image request, no JS)
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Card({ card }: { card: BentoCard }) {
  const f = card.featured;
  return (
    <Link
      href={card.href}
      className={`group relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-2xl border p-5 transition-colors duration-500 hover:border-transparent sm:min-h-[360px] sm:p-6 ${f ? "border-none" : "border-white/[0.06] bg-[#181818]"
        }`}
    >
      {/* blob gradient (fades in on hover) */}
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500",
          card?.href === "/demo" ? "opacity-100" : "group-hover:opacity-100"

        )}
        style={{ background: card.blob }}
      />

      {/* grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
      />

      {/* tag */}
      <span
        className={`inline-flex text-2xl opacity-20 items-center gap-2 font-medium transition-colors duration-500 group-hover:text-white/85 ${f ? "text-black/80" : "text-zinc-400"
          }`}
      >
        {card.tag}
      </span>

      {/* arrow */}
      <span
        className={`absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-white group-hover:text-black ${f ? "bg-black text-white" : "bg-white/[0.06] text-zinc-400"
          }`}
      >
        <ArrowUpRight className="h-12 w-12" />
      </span>

      {/* visual */}
      <div className="relative my-4 flex flex-1 items-center justify-center">
        <div className="relative h-36 w-36 sm:h-40 sm:w-40">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      </div>

      {/* title + text */}
      <div>
        <h3
          className={`${display.className} text-xl font-semibold uppercase leading-[1.15] tracking-[-0.01em] transition-colors duration-500 group-hover:text-white sm:text-[22px] ${f ? "text-black" : "text-white"
            }`}
        >
          {card.title}
        </h3>
        <p
          className={`mt-2 max-w-[34ch] text-sm leading-snug transition-colors duration-500 group-hover:text-white/80 ${f ? "text-black/75" : "text-zinc-400"
            }`}
        >
          {card.text}
        </p>
      </div>
    </Link>
  );
}

export default function ConnectBentoGrid() {
  return (
    <section
      id="connect-with-us"
      className="w-full bg-[#121212] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Getting started is simple
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Four steps for you, plus options for teams.
            </p>
          </div>
          <Link
            href="/get-started"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200 sm:self-auto"
          >
            Get started free
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
