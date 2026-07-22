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

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

const signika = Signika({
  subsets: ["latin"],
  variable: "--font-signika",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-tektur",
});

const syneMono = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-syne-mono",
});

const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wallpoet",
});

const bungeeOutline = Bungee_Outline({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-outline",
});

export const metadata: Metadata = {
  title: "Vishvjeet | Portfolio",
  description: "Designer & Builder building things that matter.",
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      var theme = (saved === 'light' || saved === 'dark') ? saved : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`scroll-smooth ${noto.variable} ${signika.variable} ${dmSans.variable} ${greatVibes.variable} ${audiowide.variable} ${tektur.variable} ${syneMono.variable} ${wallpoet.variable} ${bungeeOutline.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          {MAINTENANCE_MODE ? <NotFound /> : children}
        </ThemeProvider>
      </body>
    </html>
  );
}
