import type { Metadata } from "next";
import DemoExperience from "@/components/demo/DemoExperience";

export const metadata: Metadata = {
  title: "Try a simulation | Real Learning",
  description:
    "Practice a real workplace situation with Patricia, your AI coach, and get instant feedback. No sign-up needed.",
};

export default function DemoPage() {
  return <DemoExperience />;
}
