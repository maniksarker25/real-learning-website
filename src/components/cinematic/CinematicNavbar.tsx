"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Unbounded } from "next/font/google";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useAccount } from "@/context/AccountContext";

const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

const LINKS = [
  { label: "Meet Patricia", href: "/#meet-patricia" },
  { label: "How to start", href: "/#connect-with-us" },
  { label: "Try the demo", href: "/demo" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5" aria-label="Real Learning home">
      <span className="relative block h-9 w-9 overflow-hidden rounded-lg bg-white">
        <Image src="/icons/brand-mark.png" alt="" fill sizes="36px" className="object-contain p-0.5" priority />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">
        Real Learning
      </span>
    </Link>
  );
}

export default function CinematicNavbar() {
  const pathname = usePathname();
  const { session } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only re-render when crossing the threshold, not on every scroll event
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + Esc to close while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Smooth-scroll for on-page sections when already on the home page
  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setOpen(false);
      if (href.startsWith("/#") && pathname === "/") {
        const el = document.getElementById(href.slice(2));
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href.slice(1));
        }
      }
    },
    [pathname],
  );

  const dashboardHref =
    session.accountType === "organization" ? "/organization-dashboard" : "/user-dashboard";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex h-14 w-full max-w-7xl items-center justify-between rounded-2xl px-3 transition-[background-color,border-color,backdrop-filter] duration-300 sm:h-16 sm:px-4 ${
            scrolled || open
              ? "border border-white/[0.08] bg-[#121212]/80 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo onClick={() => setOpen(false)} />

          {/* desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {LINKS.map((l) => {
              const active = !l.href.startsWith("/#") && pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-2">
            {session.accountType ? (
              <Link
                href={dashboardHref}
                className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 sm:inline-flex"
              >
                Dashboard
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full px-4 py-2 text-sm text-zinc-300 transition-colors hover:text-white sm:inline-flex"
                >
                  Log in
                </Link>
                <Link
                  href="/get-started"
                  className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 sm:inline-flex"
                >
                  Get started free
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] bg-[#121212] px-6 pb-8 pt-28 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col" aria-label="Mobile">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  tabIndex={open ? 0 : -1}
                  className={`${display.className} flex items-center justify-between border-b border-white/[0.06] py-4 text-2xl uppercase text-white`}
                >
                  {l.label}
                  <ArrowUpRight className="h-5 w-5 text-zinc-500" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid grid-cols-2 gap-2">
            {session.accountType ? (
              <Link
                href={dashboardHref}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="col-span-2 rounded-full bg-white py-3.5 text-center text-base font-medium text-black"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="rounded-full border border-white/15 py-3.5 text-center text-base text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="rounded-full bg-white py-3.5 text-center text-base font-medium text-black"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
