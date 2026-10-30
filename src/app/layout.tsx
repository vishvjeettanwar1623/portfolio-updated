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

import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
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
  metadataBase: new URL("https://vishvjeet.me"),
  title: {
    default: "Vishvjeet Singh Tanwar · Full-Stack & Web3 Developer",
    template: "%s · Vishvjeet",
  },
  description:
    "Full-Stack & Web3 Developer building high-performance decentralized protocols, kinetic frontends, and scalable systems.",
  keywords: [
    "Vishvjeet Singh Tanwar",
    "Vishvjeet",
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
  authors: [{ name: "Vishvjeet Singh Tanwar", url: "https://vishvjeet.me" }],
  creator: "Vishvjeet Singh Tanwar",
  openGraph: {
    title: "Vishvjeet Singh Tanwar · Full-Stack & Web3 Developer",
    description:
      "Full-Stack & Web3 Developer building high-performance decentralized protocols and kinetic frontends.",
    url: "https://vishvjeet.me",
