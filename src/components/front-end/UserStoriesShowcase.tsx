"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface UserStory {
  id: string;
  category: string;
  tagColor: string;
  image: string;
  customerMessage: string;
  author: string;
}

const USER_STORIES: UserStory[] = [
  {
    id: "story-1",
    category: "Customer Service",
    tagColor: "bg-orange-500/20 text-orange-200 border-orange-400/30",
    image: "/images/stories/story-1.jpg",
    customerMessage:
      '"We saved $120K and cut new team ramp time from 6 weeks to 10 days."',
    author: "David Chen",
  },
  {
    id: "story-2",
    category: "Tech Support",
    tagColor: "bg-blue-500/20 text-blue-200 border-blue-400/30",
    image: "/images/stories/story-2.jpg",
    customerMessage:
      '"With Real Learning, we get lightning-fast results on objection handling."',
    author: "Jessica Miller",
  },
  {
    id: "story-3",
    category: "IT Specialist",
    tagColor: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30",
    image: "/images/stories/story-3.jpg",
    customerMessage:
      '"It\'s enterprise-ready and makes leadership simulation effortless."',
    author: "Niraj Singh",
  },
  {
    id: "story-4",
    category: "Healthcare Support",
    tagColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
    image: "/images/stories/story-4.jpg",
    customerMessage:
      '"What used to take 4 hours of supervisor coaching now takes 25 minutes."',
    author: "Rosalie Cutugno",
  },
  {
    id: "story-5",
    category: "Customer Service",
    tagColor: "bg-amber-500/20 text-amber-200 border-amber-400/30",
    image: "/images/stories/story-5.jpg",
    customerMessage:
      '"Our learners walked into real client calls with verified confidence."',
    author: "Marcus Vance",
  },
];

// Duplicated array for seamless, mathematically continuous infinite loop
const MARQUEE_STORIES = [...USER_STORIES, ...USER_STORIES];

export default memo(function UserStoriesShowcase() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-orange-50 text-slate-900 font-sans overflow-hidden select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/80 border border-orange-200/90 text-xs font-semibold text-orange-400 uppercase tracking-wider shadow-sm">
            <span>CUSTOMER STORIES</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-neutral-900 leading-[1.18] max-w-3xl">
            Why do training, marketing and sales leaders{" "}
            <span className="text-orange-400">trust Real Learning?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-normal max-w-2xl leading-relaxed">
            Discover how forward-thinking organizations use AI workplace
            simulations to build verified skills and accelerate career
            readiness.
          </p>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Track (Right to Left) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex items-center gap-5 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {MARQUEE_STORIES.map((story, index) => (
            <div
              key={`${story.id}-${index}`}
              className="shrink-0 w-[280px] sm:w-[320px] md:w-[350px] h-[450px] sm:h-[480px] md:h-[500px] rounded-[24px] sm:rounded-[28px] overflow-hidden relative shadow-md border border-black/[0.08] hover:border-black/20 hover:shadow-xl transition-all duration-200 select-none group"
            >
              {/* Background Portrait Photo */}
              <Image
                src={story.image}
                alt={story.author}
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-cover object-center pointer-events-none select-none"
              />

              {/* Realistic Contrast Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

              {/* Top Row: Career Category Pill Tag */}
              <div className="absolute top-5 left-5 z-10 pointer-events-none">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${story.tagColor}`}
                >
                  {story.category}
                </span>
              </div>

              {/* Bottom Customer Message & Author Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 space-y-2 pointer-events-none">
                {/* Customer Message Quote */}
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg leading-snug drop-shadow-sm line-clamp-3">
                  {story.customerMessage}
                </h3>

                {/* Author Info (Without Role) */}
                <div className="text-xs text-white/80 font-medium">
                  <span>{story.author}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
