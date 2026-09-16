"use client";

import React, { useMemo, memo } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";

export const FooterNavGrid = memo(function FooterNavGrid() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const platformLinks = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Career Simulation Tracks", href: "/#explore-careers" },
    { label: "Patricia AI Life GPS", href: "/#patricia-experience" },
    { label: "Feedback & Telemetry", href: "/#feedback-section" },
    { label: "Try 5-Min Simulation", href: "/get-started" },
  ];

  const organizationLinks = [
    { label: "Enterprise Workspace", href: "/onboarding/organization" },
    { label: "University Curriculum Access", href: "/contact" },
    { label: "Custom Scenario Authoring", href: "/contact" },
    { label: "Leadership Diagnostics", href: "/contact" },
    { label: "Enterprise Security & Privacy", href: "/contact" },
  ];

  const companyLinks = [
    { label: "About Real Learning", href: "/about" },
    { label: "Northstar Labs Hub", href: "/about" },
    { label: "Contact & Direct Inquiries", href: "/contact" },
    { label: "Learner Support Desk", href: "/contact" },
    { label: "Research Collaborations", href: "/contact" },
  ];

  return (
    <div className="border-t border-stone-200/80 bg-[#faf9f6] text-stone-900">
      {/* Top Main Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Studio Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center overflow-hidden shadow-xs">
                <Image
                  src={ImageConstants.brandLogo.src}
                  alt="Real Learning Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-extrabold tracking-wider text-stone-950 uppercase font-sans">
                REAL{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                  LEARNING
                </span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm font-normal">
              High-fidelity workplace simulations and personalized AI GPS guidance engineered to build job-ready confidence before day one.
            </p>

            <div className="space-y-2 pt-1 text-xs font-mono">
              <div className="flex items-center gap-2 text-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Northstar Labs · Systems Operational</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>San Francisco, CA & Distributed Simulation Fleet</span>
              </div>
            </div>
          </div>

          {/* Col 2: Platform Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
              Simulation Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-stone-950 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Organizations (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
              For Organizations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
              {organizationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-stone-950 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Inquiries (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-stone-950 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Copyright Bar */}
      <div className="border-t border-stone-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Real Learning Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-stone-600">
            <Link href="/about" className="hover:text-stone-950 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-stone-950 transition-colors">
              Contact Us
            </Link>
            <Link href="/onboarding/organization" className="hover:text-stone-950 transition-colors">
              Enterprise Access
            </Link>
            <Link href="/contact" className="hover:text-stone-950 transition-colors">
              Privacy & Security
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
