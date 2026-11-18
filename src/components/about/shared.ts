import { Unbounded } from "next/font/google";

export const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

/** Soft "blob" mesh: three colour blobs over a base colour */
export const blob = (base: string, a: string, b: string, c: string) =>
  [
    `radial-gradient(45% 55% at 18% 28%, ${a} 0%, transparent 70%)`,
    `radial-gradient(50% 60% at 85% 15%, ${b} 0%, transparent 70%)`,
    `radial-gradient(60% 55% at 65% 95%, ${c} 0%, transparent 72%)`,
    base,
  ].join(", ");

/** Static film-grain texture (inline SVG, no image request, no JS) */
export const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
