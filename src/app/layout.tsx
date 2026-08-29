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
    siteName: "Vishvjeet Singh Tanwar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishvjeet Singh Tanwar · Full-Stack & Web3 Developer",
    description:
      "Full-Stack & Web3 Developer building high-performance decentralized protocols and kinetic frontends.",
    creator: "@vishvjeet_me",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://vishvjeet.me/#person",
      name: "Vishvjeet Singh Tanwar",
      url: "https://vishvjeet.me",
      jobTitle: "Full-Stack & Web3 Developer",
      sameAs: [
        "https://github.com/vishvjeet-tanwar",
        "https://linkedin.com/in/vishvjeet-tanwar",
        "https://twitter.com/vishvjeet_me",
      ],
      knowsAbout: [
        "Full-Stack Development",
        "Web3 Development",
        "Smart Contracts",
        "Solidity",
        "Next.js",
        "React",
        "TypeScript",
        "Creative Web Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://vishvjeet.me/#website",
      url: "https://vishvjeet.me",
      name: "Vishvjeet Singh Tanwar Portfolio",
      publisher: {
        "@id": "https://vishvjeet.me/#person",
      },
    },
  ],
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
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
      data-theme="dark"
      suppressHydrationWarning
      className={`dark ${noto.variable} ${signika.variable} ${dmSans.variable} ${greatVibes.variable} ${audiowide.variable} ${tektur.variable} ${syneMono.variable} ${wallpoet.variable} ${bungeeOutline.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/assets/mascot-image.webp" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              {MAINTENANCE_MODE ? <NotFound /> : children}
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
