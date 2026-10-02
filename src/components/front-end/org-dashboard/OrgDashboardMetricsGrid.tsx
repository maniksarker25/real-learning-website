"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { METRICS } from "./mockData";

export const OrgDashboardMetricsGrid = memo(
  function OrgDashboardMetricsGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {METRICS.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-[#11121a] rounded-lg p-3.5 border border-white/10 hover:bg-white/[0.02] transition-colors"
          >
            <div className="mb-1.5">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider font-mono">
                {m.label}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {m.value}
            </div>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-white/80 font-medium">{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);
