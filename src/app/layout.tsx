import React from "react";
import type { Metadata } from "next";
import {
  Noto_Sans,
  Signika,
  DM_Sans,
  Great_Vibes,
  Audiowide,
  Tektur,
  Syne_Mono,
  Wallpoet,
  Bungee_Outline,
} from "next/font/google";
import "./globals.css";
import { MAINTENANCE_MODE } from "@/config/maintenance";
import { NotFound } from "@/components/ui/ghost-404-page";
import { SITE_CONFIG } from "@/config/site";

import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import { SeasonProvider } from "@/context/SeasonContext";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

const signika = Signika({
  subsets: ["latin"],
  variable: "--font-signika",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-tektur",
  display: "swap",
});

const syneMono = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-syne-mono",
  display: "swap",
});

const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wallpoet",
  display: "swap",
});

const bungeeOutline = Bungee_Outline({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-outline",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} · ${SITE_CONFIG.role}`,
    template: `%s · ${SITE_CONFIG.name.split(" ")[0]}`,
  },
  description:
    "Full-Stack & Web3 Developer building high-performance decentralized protocols, kinetic frontends, and scalable systems.",
  keywords: [
    SITE_CONFIG.name,
    SITE_CONFIG.name.split(" ")[0],
    "Full-Stack Developer",
    "Web3 Developer",
    "Smart Contracts",
    "Solidity",
    "Next.js",
    "React",
    "TypeScript",
    "Creative Developer",
    "Portfolio",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    title: `${SITE_CONFIG.name} · ${SITE_CONFIG.role}`,
    description:
      "Full-Stack & Web3 Developer building high-performance decentralized protocols and kinetic frontends.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
