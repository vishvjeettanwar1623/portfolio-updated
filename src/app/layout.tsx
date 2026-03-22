import React from "react";
import type { Metadata } from "next";
import { Noto_Sans, Signika, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

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
      className={`scroll-smooth ${noto.variable} ${signika.variable} ${dmSans.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
