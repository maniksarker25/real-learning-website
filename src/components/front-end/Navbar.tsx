"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Menu,
  X,
  ArrowRight,
  User,
  Building2,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";

export default memo(function Navbar() {
  const { session, logout } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
  }, [logout, closeMobileMenu]);

  // Dynamic Navigation Links based on active Account Session
  const navLinks = useMemo(() => {
    if (session.accountType === "individual") {
      return [
        { label: "Dashboard", href: "/user-dashboard" },
        { label: "Classes", href: "/user-dashboard/classes" },
        { label: "Simulations", href: "/user-dashboard/simulations" },
        { label: "Progress", href: "/user-dashboard/progress" },
        { label: "Goals", href: "/user-dashboard/goals" },
      ];
    }
    if (session.accountType === "organization") {
      return [
        { label: "Overview", href: "/organization-dashboard" },
        { label: "Participants", href: "/organization-dashboard/participants" },
        { label: "Simulation", href: "/organization-dashboard/classes" },
        { label: "Settings", href: "/organization-dashboard/settings" },
      ];
    }
    return [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Careers", href: "/#explore-careers" },
      { label: "Feedback & Growth", href: "/#feedback-section" },
      { label: "Organizations", href: "/#organizations" },
    ];
  }, [session.accountType]);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {session.accountType ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                {session.accountType === "individual" ? (
                  <User className="w-3.5 h-3.5 text-orange-400" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                )}
                <span className="font-semibold max-w-[130px] truncate">
                  {session.accountType === "individual"
                    ? session.name || "Individual"
                    : session.orgName || "Organization"}
                </span>
              </div>
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4"
        >
          {session.accountType && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-white mb-2">
              <div className="flex items-center gap-2">
                {session.accountType === "individual" ? (
                  <User className="w-4 h-4 text-orange-400" />
                ) : (
                  <Building2 className="w-4 h-4 text-orange-400" />
                )}
                <span className="font-bold">
                  {session.accountType === "individual"
                    ? session.name || "Individual Account"
                    : session.orgName || "Organization Workspace"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-orange-500/20 text-orange-300">
                {session.accountType}
              </span>
            </div>
          )}

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="block text-sm font-medium text-white/80 hover:text-white py-2"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {session.accountType ? (
              <button
                onClick={handleLogout}
                className="w-full text-center py-2.5 text-xs font-bold text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-full hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout / Switch Account</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  onClick={closeMobileMenu}
                  className="w-full text-center py-2.5 text-xs font-bold text-black bg-white rounded-full hover:bg-white/90 transition-colors block"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
});
