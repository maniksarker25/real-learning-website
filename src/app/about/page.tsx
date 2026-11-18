import type { Metadata } from "next";
import CinematicNavbar from "@/components/cinematic/CinematicNavbar";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutValues } from "@/components/about/AboutValues";
import FooterCTA from "@/components/front-end/FooterCTA";

export const metadata: Metadata = {
  title: "About | Real Learning",
  description:
    "Real Learning helps people practice real workplace conversations with Patricia, an AI coach who reacts like a real person and gives feedback you can use.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#121212] font-sans text-white selection:bg-orange-500 selection:text-white">
      <CinematicNavbar />
      <main className="overflow-x-clip">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <FooterCTA />
      </main>
    </div>
  );
}
