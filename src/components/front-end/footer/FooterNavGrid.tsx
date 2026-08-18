"use client";

import React, { useMemo, memo } from "react";
import Link from "next/link";
import { Zap, Building2, Mail, Info, ChevronRight } from "lucide-react";

interface FooterNavGridProps {
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onOpenOrgAccess: () => void;
}

export const FooterNavGrid = memo(function FooterNavGrid({
  onOpenContact,
  onOpenAbout,
  onOpenOrgAccess,
}: FooterNavGridProps) {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const platformLinks = useMemo(
    () => [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Career Simulation Tracks", href: "#explore-careers" },
      { label: "AI Feedback & Growth", href: "#feedback-section" },
      { label: "Progress Analytics", href: "#track-progress" },
    ],
    []
  );

  return (
    <>
      {/* Structured Multi-Column Footer Grid */}
      <div className="border-t border-white/10 bg-[#07080c] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                REAL{" "}
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  LEARNING
                </span>
              </span>
            </Link>

            <p className="text-xs text-white/60 leading-relaxed">
              Empowering learners and organizations with AI-driven workplace
              simulations to practice real career situations before day one.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform Online • v2.4</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Organizations & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Organizations
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <button
                  onClick={onOpenOrgAccess}
                  className="hover:text-orange-300 transition-colors flex items-center gap-1.5 text-orange-400 font-medium text-left cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Get Access to Organization</span>
                </button>
              </li>
              <li>
                <a
                  href="#organizations"
                  className="hover:text-white transition-colors"
                >
                  Enterprise Dashboard Preview
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOrgAccess}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Request University Access
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Actions & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenContact}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>Contact Us</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>

              <button
                onClick={onOpenAbout}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-orange-400" />
                  <span>About Real Learning</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="font-bold text-white tracking-wider uppercase">
              REAL LEARNING
            </span>
            <span>© {currentYear} Real Learning Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-white/60">
            <button
              onClick={onOpenAbout}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Support
            </button>
            <button
              onClick={onOpenOrgAccess}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Organization Access
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
