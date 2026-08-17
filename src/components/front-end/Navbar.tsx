"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center group-hover:border-orange-400/60 transition-colors">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white uppercase font-sans">
            REAL{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              LEARNING
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a
            href="#explore-careers"
            className="hover:text-white transition-colors"
          >
            Careers
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#feedback-section"
            className="hover:text-white transition-colors"
          >
            Feedback & Growth
          </a>
          <a
            href="#organizations"
            className="hover:text-white transition-colors"
          >
            Organizations
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2 cursor-pointer">
            Login
          </button>
          <a
            href="#start-simulation"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80"
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
          <a
            href="#explore-careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-white/80 hover:text-white py-2"
          >
            Careers
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-white/80 hover:text-white py-2"
          >
            How It Works
          </a>
          <a
            href="#feedback-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-white/80 hover:text-white py-2"
          >
            Feedback & Growth
          </a>
          <a
            href="#organizations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-white/80 hover:text-white py-2"
          >
            Organizations
          </a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button className="w-full text-center py-2.5 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full">
              Login
            </button>
            <a
              href="#start-simulation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-black bg-white rounded-full"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
