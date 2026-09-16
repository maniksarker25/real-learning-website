import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/front-end/Navbar";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import FooterCTA from "@/components/front-end/FooterCTA";

export const metadata: Metadata = {
  title: "Contact Us · Real Learning & Northstar Labs",
  description:
    "Get in touch with the Real Learning team for enterprise workplace pilots, university curriculum access, learner assistance, or research collaboration.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="overflow-x-clip">
        {/* 1. Hero Section */}
        <ContactHero />

        {/* 2. Form & Direct Communication Channels */}
        <ContactFormSection />

        {/* 3. Common Questions & FAQ */}
        <ContactFAQ />

        {/* 4. Global Footer CTA */}
        <FooterCTA />
      </main>
    </div>
  );
}
