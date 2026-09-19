import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const nunitoSansHeading = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Real Learning",
  description: "Real Learning - Practice in Realistic Workplace Situations",
  icons: {
    icon: "/icons/brand-logo.png",
    shortcut: "/icons/brand-logo.png",
    apple: "/icons/brand-logo.png",
  },
};

import { AccountProvider } from "@/context/AccountContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "overflow-x-hidden",
        "max-w-full",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        nunitoSansHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden max-w-full">
        <AccountProvider>{children}</AccountProvider>
      </body>
    </html>
  );
}
