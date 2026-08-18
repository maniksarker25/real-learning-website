"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Building2,
  Mail,
  Info,
  CheckCircle2,
} from "lucide-react";
import { ContactModal } from "./footer/ContactModal";
import { AboutModal } from "./footer/AboutModal";
import { OrgAccessModal } from "./footer/OrgAccessModal";
import { FooterNavGrid } from "./footer/FooterNavGrid";

export default memo(function FooterCTA() {
  // Modal states for footer actions
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOrgAccessOpen, setIsOrgAccessOpen] = useState(false);

  // useCallback handlers for performance optimization
  const handleOpenContact = useCallback(() => setIsContactOpen(true), []);
  const handleCloseContact = useCallback(() => setIsContactOpen(false), []);

  const handleOpenAbout = useCallback(() => setIsAboutOpen(true), []);
  const handleCloseAbout = useCallback(() => setIsAboutOpen(false), []);

  const handleOpenOrgAccess = useCallback(() => setIsOrgAccessOpen(true), []);
  const handleCloseOrgAccess = useCallback(() => setIsOrgAccessOpen(false), []);

  // useMemo for trust signals array
  const trustSignals = useMemo(
    () => ["Instant AI Scoring", "No Installation Required", "Free to Start"],
    [],
  );

  return (
    <footer className="relative w-full bg-black text-slate-100 font-sans border-t border-white/10 overflow-hidden select-none">
      {/* Background Grid & Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(167,139,250,0.5) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.2) 0%, rgba(244, 63, 94, 0.12) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Final Banner Section */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-6"
        >
          <Zap className="h-3.5 w-3.5 text-orange-400" />
          <span>START PRACTICE TODAY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Ready to Practice{" "}
          <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
            Your Future?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-xl mx-auto"
        >
          Step into AI-powered workplace simulations and build job-ready skills
          before day one.
        </motion.p>

        {/* Action Buttons Hub (Get Started, Get Access for Organization, Contact Us, About Us) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* 1. Primary Get Started Button */}
          <a
            href="#start-simulation"
            className="group bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* 2. Get Access for Organization Button */}
          <button
            onClick={handleOpenOrgAccess}
            className="group bg-gradient-to-r from-orange-500/20 to-rose-500/20 hover:from-orange-500/30 hover:to-rose-500/30 border border-orange-400/40 text-orange-200 rounded-full px-7 h-12 text-sm font-bold inline-flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-orange-400" />
            <span>Get Access for Organization</span>
          </button>

          {/* 3. Contact Us Button */}
          <button
            onClick={handleOpenContact}
            className="bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full px-6 h-12 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-rose-400" />
            <span>Contact Us</span>
          </button>

          {/* 4. About Us Button */}
          <button
            onClick={handleOpenAbout}
            className="bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white rounded-full px-6 h-12 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Info className="w-4 h-4 text-orange-400" />
            <span>About Us</span>
          </button>
        </motion.div>

        {/* Trust Signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/50">
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {signal}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Grid */}
      <FooterNavGrid
        onOpenContact={handleOpenContact}
        onOpenAbout={handleOpenAbout}
        onOpenOrgAccess={handleOpenOrgAccess}
      />

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      <AboutModal isOpen={isAboutOpen} onClose={handleCloseAbout} />
      <OrgAccessModal isOpen={isOrgAccessOpen} onClose={handleCloseOrgAccess} />
    </footer>
  );
});
