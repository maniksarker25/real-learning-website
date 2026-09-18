import React from "react";
import { cn } from "@/lib/utils";

/**
 * Delicate Victorian / antique engraved corner flourish
 */
export function VictorianCornerFlourish({
  className,
  position = "top-right",
}: {
  className?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}) {
  const rotation =
    position === "top-right"
      ? "rotate-0"
      : position === "bottom-right"
      ? "rotate-90"
      : position === "bottom-left"
      ? "rotate-180"
      : "-rotate-90";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-7 h-7 pointer-events-none text-stone-300 select-none",
        rotation,
        className,
      )}
      aria-hidden="true"
    >
      <path
        d="M44 4H20C12 4 4 12 4 20V44"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M40 8H24C16 8 8 16 8 24V40"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="4" r="1.75" fill="currentColor" />
      <circle cx="4" cy="44" r="1.75" fill="currentColor" />
      <path
        d="M20 12C14 12 12 14 12 20C12 24 16 28 20 28C24 28 28 24 28 20C28 14 24 12 20 12Z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="20" cy="20" r="1.75" fill="currentColor" />
    </svg>
  );
}

/**
 * Victorian Engraved Guilloche Circular Seal / Badge
 */
export function EngravedSeal({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none text-amber-600/70", className)}
      aria-hidden="true"
    >
      {/* Outer scalloped ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="32"
        cy="32"
        r="23"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1.5 1.5"
      />

      {/* Central 8-pointed engraved star */}
      <path
        d="M32 14L34.5 26.5L47 24L37.5 32L47 40L34.5 37.5L32 50L29.5 37.5L17 40L26.5 32L17 24L29.5 26.5L32 14Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      {/* 4 cardinal accent dots */}
      <circle cx="32" cy="7.5" r="1" fill="currentColor" />
      <circle cx="32" cy="56.5" r="1" fill="currentColor" />
      <circle cx="7.5" cy="32" r="1" fill="currentColor" />
      <circle cx="56.5" cy="32" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Botanical Laurel Wreath Emblem
 */
export function LaurelEmblem({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none text-stone-400", className)}
      aria-hidden="true"
    >
      {/* Left branch */}
      <path
        d="M16 28C10 26 6 20 6 13C6 9 8 5 10 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M7 21C5 20 4 18 5 16C6 16 8 18 7 21Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M6 14C4 13 3 11 4 9C5 9 7 11 6 14Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M8 8C7 7 6 5 7 3C8 3 10 5 8 8Z"
        fill="currentColor"
        fillOpacity="0.7"
      />

      {/* Right branch */}
      <path
        d="M16 28C22 26 26 20 26 13C26 9 24 5 22 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M25 21C27 20 28 18 27 16C26 16 24 18 25 21Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M26 14C28 13 29 11 28 9C27 9 25 11 26 14Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M24 8C25 7 26 5 25 3C24 3 22 5 24 8Z"
        fill="currentColor"
        fillOpacity="0.7"
      />

      {/* Central star */}
      <path
        d="M16 11L17 14L20 14.5L17.5 16.5L18.5 19.5L16 17.5L13.5 19.5L14.5 16.5L12 14.5L15 14L16 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Starburst Rosette Micro-Badge
 */
export function StarburstRosette({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
      <path
        d="M12 3V21M3 12H21M5.64 5.64L18.36 18.36M5.64 18.36L18.36 5.64"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
