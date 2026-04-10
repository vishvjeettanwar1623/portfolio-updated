import React from "react";
import type { Metadata } from "next";
import { Noto_Sans, Signika, DM_Sans, Great_Vibes, Audiowide, Tektur, Syne_Mono, Wallpoet } from "next/font/google";
import "./globals.css";
import { MAINTENANCE_MODE } from "@/config/maintenance";
import { NotFound } from "@/components/ui/ghost-404-page";

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

export const metadata: Metadata = {
  title: "Vishvjeet | Portfolio",
  description: "Designer & Builder building things that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      data-theme="dark" 
      className={`scroll-smooth ${noto.variable} ${signika.variable} ${dmSans.variable} ${greatVibes.variable} ${audiowide.variable} ${tektur.variable} ${syneMono.variable} ${wallpoet.variable}`}
    >
      <body className="antialiased">
        {MAINTENANCE_MODE ? (
          <NotFound />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
