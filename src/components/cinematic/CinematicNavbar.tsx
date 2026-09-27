"use client";

import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useAccount } from "@/context/AccountContext";

interface CinematicNavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const CinematicNavbar = memo(function CinematicNavbar({
  onNavigateSection,
}: CinematicNavbarProps) {
  const { session } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTabs = [
    { label: "Overview", id: "hero-top" },
    { label: "Why Real Learning", id: "why-youre-here" },
    { label: "Patricia AI", id: "patricia-experience" },
  ];

  const handleTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (id === "hero-top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-xs"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo / Minimal Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg p-1 flex items-center justify-center bg-black/5 border border-black/10 backdrop-blur-md group-hover:border-orange-600/50 transition-all duration-300">
              <Image
                src="/icons/brand-logo.png"
                alt="Real Learning Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-sans leading-tight text-slate-900">
                REAL <span className="text-orange-600">LEARNING</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-serif hidden sm:inline-block text-slate-500">
                by Scorched Souls
              </span>
            </div>
          </Link>

          {/* Clean Minimal Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md">
            {navTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleTabClick(e, tab.id)}
                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-slate-700 hover:text-slate-950 hover:bg-black/5 transition-all duration-200 cursor-pointer"
              >
                {tab.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session.accountType ? (
              <Link
                href={
                  session.accountType === "organization"
                    ? "/organization-dashboard"
                    : "/user-dashboard"
                }
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-600/30 text-xs font-semibold text-orange-700 hover:bg-orange-600/20 transition-all cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-medium px-3 py-1.5 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Log In
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                >
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 rounded-xl border bg-black/5 border-black/10 text-slate-900 hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] sm:top-[70px] z-50 bg-white/98 backdrop-blur-2xl border-b border-slate-200/90 p-5 md:hidden shadow-2xl flex flex-col gap-3.5"
          >
            <div className="flex flex-col gap-1 pb-3 border-b border-slate-200">
              {navTabs.map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {tab.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
