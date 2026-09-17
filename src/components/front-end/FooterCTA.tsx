"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ImageConstants } from "@/constant/image.index";
import { FooterNavGrid } from "./footer/FooterNavGrid";

export default memo(function FooterCTA() {
  return (
    <footer className="relative w-full bg-orange-50 text-slate-100 font-sans select-none">
      {/* Outer Banner Wrapper */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24">
        <div className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] bg-[#F7F6F3] border border-black/5 py-16 sm:py-24 md:py-28 px-6 sm:px-12 flex flex-col items-center justify-center text-center min-h-[380px] sm:min-h-[440px]">
          {/* Static CTA Background Image */}
          <Image
            src={ImageConstants.ctaBg}
            alt="CTA Background"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center pointer-events-none select-none"
            priority
          />

          {/* Center Main Content */}
          <div className="relative z-10 max-w-xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight text-neutral-900 leading-tight"
            >
              Ready to Practice Your Future?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base md:text-lg text-neutral-600 font-normal leading-relaxed max-w-lg mx-auto"
            >
              Step into AI-powered workplace simulations and build job-ready
              skills before day one.
            </motion.p>

            {/* Simple Clean CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              {/* Primary Pill Button */}
              <Link
                href="/get-started"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-neutral-900 text-sm font-semibold border border-neutral-200/90 hover:bg-neutral-50 hover:border-neutral-300 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Secondary Clean Pill Button */}
              <Link
                href="/onboarding/organization"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/70 backdrop-blur-sm text-neutral-700 text-sm font-semibold border border-neutral-300/80 hover:bg-white hover:text-neutral-900 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-neutral-500" />
                <span>For Organizations</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Grid with Agency Aesthetic */}
      <FooterNavGrid />
    </footer>
  );
});
