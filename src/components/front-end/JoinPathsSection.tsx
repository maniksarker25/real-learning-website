import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { blob, display, NOISE } from "@/components/about/shared";

type Path = {
  tag: string;
  title: string;
  text: string;
  points: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: string;
  imageAlt: string;
  /** "orange" = solid brand card, otherwise a blob gradient string */
  surface: "orange" | string;
  /** Show Patricia pointing at the secondary button instead of the corner pose */
  pointAtSecondary?: boolean;
};

/**
 * Patricia (flipped pointing pose) with her fingertip lined up to the
 * vertical centre of the button next to her. Fingertip sits at 40.1% of the
 * image height on its edge, measured from pose-pointing.png (192x309).
 */
const POINT_H = 150;
const POINT_W = Math.round((192 / 309) * POINT_H);
const FINGER_Y = 0.401;

function PointingPatricia() {
  return (
    <span aria-hidden className="relative ml-1 hidden h-12 shrink-0 sm:block" style={{ width: POINT_W }}>
      <span
        className="pt-poke absolute left-0 block"
        style={{ width: POINT_W, height: POINT_H, top: 24 - FINGER_Y * POINT_H }}
      >
        <Image
          src="/images/patricia/pose-pointing.png"
          alt=""
          fill
          sizes={`${POINT_W}px`}
          className="-scale-x-100 object-contain"
        />
      </span>
    </span>
  );
}

const PATHS: Path[] = [
  {
    tag: "For individuals",
    title: "Grow your career",
    text: "Practice the conversations your next job will throw at you.",
    points: ["Pick one of four career tracks", "Practice with Patricia anytime", "See your skills improve"],
    primary: { label: "Join as an individual", href: "/onboarding/individual" },
    secondary: { label: "Try the demo", href: "/demo" },
    image: "/images/patricia/pose-pointing.png",
    imageAlt: "Patricia pointing and smiling",
    surface: "orange",
    pointAtSecondary: true,
  },
  {
    tag: "For organizations",
    title: "Train your team",
    text: "Give everyone a safe place to practice and see who's ready.",
    points: ["Seats for 10 to 100+ people", "Organise people into classes", "Follow progress in one dashboard"],
    primary: { label: "Join as an organization", href: "/onboarding/organization" },
    secondary: { label: "Talk to us", href: "/contact" },
    image: "/images/patricia/pose-cross-arms.png",
    imageAlt: "Patricia standing confidently",
    surface: blob("#1e3a8a", "#60a5fa", "#a78bfa", "#0b1437"),
  },
];

function PathCard({ p }: { p: Path }) {
  const orange = p.surface === "orange";
  return (
    <div
      className={`relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[28px] p-6 sm:p-8 lg:p-10 ${
        orange ? "bg-orange-500 text-black" : "text-white"
      }`}
    >
      {!orange && (
        <span aria-hidden className="absolute inset-0 -z-20" style={{ background: p.surface }} />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
      />

      {/* Patricia (corner pose) */}
      {!p.pointAtSecondary && (
        <div className="pointer-events-none absolute -bottom-2 right-2 hidden h-[260px] w-[170px] sm:block lg:right-6 lg:h-[300px] lg:w-[200px]">
          <Image src={p.image} alt={p.imageAlt} fill sizes="200px" className="object-contain object-bottom" />
        </div>
      )}

      <span
        className={`inline-flex items-center gap-2 text-sm font-medium ${orange ? "text-black/75" : "text-white/80"}`}
      >
        <span className={`h-2 w-2 rounded-full border ${orange ? "border-black/60" : "border-white/70"}`} />
        {p.tag}
      </span>

      <h3 className={`${display.className} mt-6 text-3xl uppercase leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-[44px]`}>
        {p.title}
      </h3>
      <p className={`mt-3 max-w-sm text-base leading-relaxed ${orange ? "text-black/75" : "text-white/80"}`}>
        {p.text}
      </p>

      <ul className="mt-6 space-y-3 sm:max-w-[58%]">
        {p.points.map((pt) => (
          <li key={pt} className="flex items-center gap-3 text-sm font-medium sm:text-base">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                orange ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            {pt}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
        <Link
          href={p.primary.href}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors sm:text-base ${
            orange ? "bg-black text-white hover:bg-zinc-800" : "bg-white text-black hover:bg-zinc-200"
          }`}
        >
          {p.primary.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <div className="flex items-center">
          <Link
            href={p.secondary.href}
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-colors sm:text-base ${
              orange
                ? "border-black/25 text-black hover:border-black/60"
                : "border-white/35 text-white hover:border-white/80"
            }`}
          >
            {p.secondary.label}
          </Link>
          {p.pointAtSecondary && <PointingPatricia />}
        </div>
      </div>
    </div>
  );
}

export default function JoinPathsSection() {
  return (
    <section
      id="join"
      className="w-full bg-[#121212] px-6 py-16 text-white sm:px-10 sm:py-20 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            How will you use Real Learning?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Join on your own or bring your whole team. Both are free to start.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {PATHS.map((p) => (
            <PathCard key={p.tag} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
