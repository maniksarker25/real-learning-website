"use client";

import React, { memo, useCallback } from "react";
import { ArrowRight, CheckCircle2, User, Building2 } from "lucide-react";
import { AccountOption, AccountType } from "@/types/account";
import Link from "next/link";

interface AccountSelectionCardProps {
  option: AccountOption;
  onSelect?: (type: AccountType) => void;
}

export const AccountSelectionCard = memo(function AccountSelectionCard({
  option,
  onSelect,
}: AccountSelectionCardProps) {
  const handleClick = useCallback(() => {
    if (onSelect) {
      onSelect(option.id);
    }
  }, [onSelect, option.id]);

  const IconComponent = option.id === "individual" ? User : Building2;

  return (
    <div className="relative group bg-[#0d0e15]/90 backdrop-blur-xl border border-white/10 hover:border-orange-400/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-2xl">
      {/* Accent Glow Top Edge */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent group-hover:via-orange-400/80 transition-colors" />

      <div>
        {/* Top Header Row with Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 group-hover:border-orange-400/60 transition-colors">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-orange-300 bg-orange-500/10 border border-orange-400/20">
            {option.badgeText}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-sans">
          {option.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed font-normal mb-6 min-h-[60px]">
          {option.description}
        </p>

        {/* Experience Flow Chain */}
        <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
            Core Experience Flow
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-medium text-orange-300/90">
            {option.flowSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-400/20">
                  {step}
                </span>
                {idx < option.flowSteps.length - 1 && (
                  <span className="text-white/30 text-[10px]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bullet Features */}
        <ul className="space-y-2.5 mb-8">
          {option.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-xs text-white/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button Link - No Scale or Translate animations per strict requirement */}
      <Link
        href={option.route}
        onClick={handleClick}
        className="w-full py-3.5 px-6 rounded-full bg-white text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer select-none"
      >
        <span>{option.ctaText}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
});
