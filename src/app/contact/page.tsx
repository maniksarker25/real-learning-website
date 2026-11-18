import type { Metadata } from "next";
import CinematicNavbar from "@/components/cinematic/CinematicNavbar";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import FooterCTA from "@/components/front-end/FooterCTA";

export const metadata: Metadata = {
  title: "Contact | Real Learning",
  description:
    "Questions about Real Learning, training a team, or partnerships? Send the Real Learning team a message.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#121212] font-sans text-white selection:bg-orange-500 selection:text-white">
      <CinematicNavbar />
      <main className="overflow-x-clip">
        <ContactHero />
        <ContactFormSection />
        <ContactFAQ />
        <FooterCTA />
      </main>
    </div>
  );
}
