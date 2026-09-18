"use client";

import React, { useState, useCallback, useMemo, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Menu,
  X,
  ArrowRight,
  User,
  Building2,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";

export default memo(function Navbar() {
  const { session, logout } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
  }, [logout, closeMobileMenu]);

  // Navigation Links for public showcase
  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Careers", href: "/#explore-careers" },
      { label: "Feedback & Growth", href: "/#feedback-section" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    [],
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#") || href.startsWith("#")) {
        const targetId = href.replace(/^\/?#/, "");
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          const elem = document.getElementById(targetId);
          if (elem) {
            e.preventDefault();
            closeMobileMenu();
            elem.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", `#${targetId}`);
          }
        }
      } else if (href === "/") {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          e.preventDefault();
          closeMobileMenu();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.history.pushState(null, "", "/");
        }
      }
    },
    [closeMobileMenu],
  );

  return (
    <>
      <header className="sticky px-2 top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Active Session Type Indicator */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-white border border-white/20 p-1 flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden shadow-sm">
                <Image
                  src={ImageConstants.brandLogo.src}
                  alt="Brand Logo"
                  width={100}
                  height={100}
                  className="object-contain cursor-pointer"
                />
              </div>
              <span className="text-lg font-extrabold tracking-wider text-white uppercase font-sans">
                REAL{" "}
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  LEARNING
                </span>
              </span>
            </Link>

            {session.accountType === "individual" && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-orange-500/10 border border-orange-400/30 text-orange-300">
                <User className="w-3 h-3 text-orange-400" />
                <span>Individual</span>
              </span>
            )}

            {session.accountType === "organization" && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-orange-500/10 border border-orange-400/30 text-orange-300">
                <Building2 className="w-3 h-3 text-orange-400" />
                <span>Org Workspace</span>
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session.accountType ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    session.accountType === "organization"
                      ? "/organization-dashboard"
                      : "/user-dashboard"
                  }
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white font-semibold transition-all cursor-pointer shadow-sm group"
                  title="Go to your Dashboard"
                >
                  {session.accountType === "individual" ? (
                    <User className="w-3.5 h-3.5 text-orange-400" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  )}
                  <span className="font-semibold max-w-[130px] truncate">
                    {session.accountType === "individual"
                      ? session.name || "Dashboard"
                      : session.orgName || "Org Dashboard"}
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10 transition-colors cursor-pointer"
                  title="Logout / Switch Account"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-5 py-2.5 text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button Trigger */}
          <div className="relative md:hidden z-[1000]">
            {isRippling && (
              <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-ping pointer-events-none" />
            )}
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:text-orange-300 transition-all cursor-pointer shadow-lg backdrop-blur-md active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-orange-400" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Expanding Circular Wave Reveal Full-Screen Overlay Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{
                  clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                  opacity: 0,
                }}
                animate={{
                  clipPath: "circle(170% at calc(100% - 2.5rem) 2.5rem)",
                  opacity: 1,
                }}
                exit={{
                  clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                  opacity: 0,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="fixed inset-0 z-[999] bg-[#090a0f]/98 backdrop-blur-3xl md:hidden flex flex-col justify-between px-6 pt-24 pb-8 shadow-2xl overflow-y-auto w-screen h-screen top-0 left-0"
              >
                {/* Close Button at top right of portal overlay */}
                <button
                  onClick={closeMobileMenu}
                  className="absolute top-5 right-6 z-[1000] p-2.5 rounded-xl bg-white/10 border border-white/20 text-orange-400 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-md active:scale-95 md:hidden"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Ambient Radiant Radial Glow behind list */}
                <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-tr from-orange-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6 max-w-md mx-auto w-full">
                  {/* Session Profile Banner if logged in */}
                  {session.accountType && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between text-xs text-white"
                    >
                      <div className="flex items-center gap-2.5">
                        {session.accountType === "individual" ? (
                          <User className="w-4 h-4 text-orange-400" />
                        ) : (
                          <Building2 className="w-4 h-4 text-orange-400" />
                        )}
                        <span className="font-bold tracking-wide">
                          {session.accountType === "individual"
                            ? session.name || "Individual Account"
                            : session.orgName || "Organization Workspace"}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30">
                        {session.accountType}
                      </span>
                    </motion.div>
                  )}

                  {/* Navigation Links with Stagger Reveal */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-1 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-orange-400" />
                      <span>Navigation Menu</span>
                    </div>

                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="group flex items-center justify-between text-xl font-bold text-white/90 hover:text-orange-400 py-3 px-3.5 rounded-xl hover:bg-white/5 transition-all border-b border-white/5 cursor-pointer"
                        >
                          <span className="tracking-wide">{link.label}</span>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10 pt-6 border-t border-white/10 flex flex-col gap-3 max-w-md mx-auto w-full"
                >
                  {session.accountType ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href={
                          session.accountType === "organization"
                            ? "/organization-dashboard"
                            : "/user-dashboard"
                        }
                        onClick={closeMobileMenu}
                        className="w-full text-center py-3 text-xs font-extrabold text-black bg-white hover:bg-white/90 rounded-full transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
                      >
                        <span>Go to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center py-3 text-xs font-bold text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-full hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout / Switch Account</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="w-full text-center py-3 text-sm font-semibold text-white bg-white/5 border border-white/15 rounded-full hover:bg-white/10 transition-all block"
                      >
                        Login
                      </Link>
                      <Link
                        href="/get-started"
                        onClick={closeMobileMenu}
                        className="w-full text-center py-3 text-xs font-extrabold text-black bg-white hover:bg-white/90 rounded-full transition-all block shadow-xl active:scale-95"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
});
