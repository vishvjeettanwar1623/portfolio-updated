"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import {
  Award,
  Sparkles,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import Image from "next/image";

interface CredentialProof {
  src: string;
  alt: string;
  category: string;
}

interface MilestoneSlide {
  id: string;
  year: number;
  headline: string;
  status: string;
  timeframe: string;
  tagline: string;
  summary: string;
  highlights: {
    title: string;
    subtext: string;
    metric?: string;
  }[];
  proofs: CredentialProof[];
  icon: React.ReactNode;
}

const SLIDES: MilestoneSlide[] = [
  {
    id: "slide-2024",
    year: 2024,
    headline: "Computer Science & Web3 Foundations",
    status: "FOUNDATION",
    timeframe: "Aug 2024 — Dec 2024",
    tagline: "B.Tech CSE Commencement · 9.29 SGPA · HackQuest Advocate",
    summary:
      "Started my B.Tech in Computer Science & Engineering at JSS University Noida, built my first Solidity smart contracts, and joined developer advocacy programs.",
    highlights: [
      {
        title: "B.Tech CSE Commencement — JSS University Noida",
        subtext: "Coursework in systems programming, discrete mathematics, and algorithms.",
        metric: "CSE Dept",
      },
      {
        title: "Academic SGPA 9.29 (Semester 1)",
        subtext: "Top departmental ranking in first semester engineering examinations.",
        metric: "9.29 SGPA",
      },
      {
        title: "Joined HackQuest as Student Developer Advocate",
        subtext: "Hosted peer workshops and onboarded student developers to Web3 tooling.",
        metric: "Advocate",
      },
      {
        title: "Solidity & Decentralized Protocol Research",
        subtext: "Built smart contracts for escrow custody and on-chain verification.",
        metric: "Smart Contracts",
      },
    ],
    proofs: [
      { src: "/assets/experience/2nd-sem.png", alt: "Semester 1 Result (9.29 SGPA)", category: "Academics" },
      { src: "/assets/experience/hackquest.png", alt: "HackQuest Advocate Badge", category: "Community" },
      { src: "/assets/experience/college.jpg", alt: "JSS University Noida ID", category: "University" },
      { src: "/assets/experience/blockchain.png", alt: "Blockchain Research Foundations", category: "Research" },
    ],
    icon: <GraduationCap className="w-5 h-5 text-foreground" />,
  },
  {
    id: "slide-2025",
    year: 2025,
    headline: "Leadership, Hackathons & 3D Internship",
    status: "COMPLETED",
    timeframe: "Jan 2025 — Dec 2025",
    tagline: "McKinsey Forward · AIR 30 ACPC · 3D Games Internship · 9.45 SGPA",
    summary:
      "Completed McKinsey's Forward program, placed AIR 30 in national competitive programming, finished a 3D modeling internship, and won prizes at Web3 hackathons.",
    highlights: [
      {
        title: "McKinsey & Company Forward Learning Program",
        subtext: "Structured problem-solving, digital business strategy, and communication.",
        metric: "Fellow",
      },
      {
        title: "AIR 30 — ACPC AlgoHour 3.0",
        subtext: "Top 30 national finish solving dynamic programming and graph algorithm challenges.",
        metric: "AIR 30",
      },
      {
        title: "Google Cloud Arcade Champion Badge",
        subtext: "Completed Google Cloud labs covering IAM security, cloud architecture, and Kubernetes deployments.",
        metric: "Champion",
      },
      {
        title: "3D Modelling Internship — GauravGo Games",
        subtext: "Designed hard-surface 3D assets, environmental props, and spatial geometry in Blender.",
        metric: "3D Games",
      },
      {
        title: "3rd Position — EduChain Delhi Regional Hackathon",
        subtext: "Built smart contracts for decentralized credential issuance on EVM.",
        metric: "Podium 3rd",
      },
      {
        title: "Academic SGPA 9.45 (Semester 2)",
        subtext: "Dean's Honor List recognition for academic excellence in foundational computing.",
        metric: "9.45 SGPA",
      },
    ],
    proofs: [
      { src: "/assets/experience/forward.jpg", alt: "McKinsey Forward Certificate", category: "Fellowship" },
      { src: "/assets/experience/google-arcade.png", alt: "Google Arcade Champion", category: "Cloud" },
      { src: "/assets/experience/algohour.jpg", alt: "ACPC AlgoHour 3.0 AIR 30", category: "National Rank" },
      { src: "/assets/experience/internship.jpg", alt: "GauravGo Games 3D Internship", category: "Internship" },
    ],
    icon: <Sparkles className="w-5 h-5 text-foreground" />,
  },
  {
    id: "slide-2026",
    year: 2026,
    headline: "Data Analytics & Monad Ecosystem",
    status: "CURRENT ERA",
    timeframe: "Jan 2026 — Present",
    tagline: "Google Certified · National Big Code Finals · Monad Blitz Prize",
    summary:
      "Earned Google's Data Analytics certificate, reached the Big Code national finals, maintained a 9.35 SGPA, and won prizes building on Monad.",
    highlights: [
      {
        title: "Google Data Analytics Professional Certification",
        subtext: "Hands-on training in SQL querying, R statistical modeling, data cleaning, and Tableau dashboards.",
        metric: "Google Cert",
      },
      {
        title: "Google Big Code Qualifiers National Finalist",
        subtext: "Ranked among top algorithmic problem solvers nationwide under timed competitive rounds.",
        metric: "Finalist",
      },
      {
        title: "Academic SGPA 9.35 (Semester 3)",
        subtext: "Departmental top standing in Data Structures, Discrete Math, and Computer Organization at JSS University.",
        metric: "9.35 SGPA",
      },
      {
        title: "$100 Prize Winner — Monad Blitz V3",
        subtext: "Built real-time high-concurrency smart contracts on Monad EVM testnet with automated escrow payouts.",
        metric: "$100 Prize",
      },
    ],
    proofs: [
      { src: "/assets/experience/google-data-analytics.jpg", alt: "Google Data Analytics Certificate", category: "Certification" },
      { src: "/assets/experience/big-code.png", alt: "Google Big Code Qualifiers", category: "Competition" },
      { src: "/assets/experience/3rd-sem.png", alt: "Semester 3 Result (9.35 SGPA)", category: "Academics" },
      { src: "/assets/achievements/monad.jpg", alt: "Monad Blitz V3 Winner", category: "Hackathon" },
    ],
    icon: <Award className="w-5 h-5 text-foreground" />,
  },
];

// Scramble Decryption for Headline (Runs ONLY once on shift to active card)
function ScrambleHeadline({ text, isCenter }: { text: string; isCenter: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#_0123456789";

  useEffect(() => {
    if (!isCenter) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 1.5;
    }, 22);

    return () => clearInterval(interval);
  }, [text, isCenter]);

  return (
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-audiowide)] min-h-[2.4rem] flex items-center">
      {displayText}
    </h3>
  );
}

// Scramble Decryption for Year (Runs ONLY once on shift to active card)
function ScrambleYear({ year, isCenter }: { year: number; isCenter: boolean }) {
  const [displayYear, setDisplayYear] = useState(year.toString());
  const digits = "0123456789";

  useEffect(() => {
    if (!isCenter) {
      setDisplayYear(year.toString());
      return;
    }

    const yearStr = year.toString();
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayYear(
        yearStr
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return yearStr[index];
            }
            return digits[Math.floor(Math.random() * digits.length)];
          })
          .join("")
      );

      if (iteration >= yearStr.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [year, isCenter]);

  return (
    <div className="text-3xl sm:text-5xl font-mono font-black text-foreground tracking-tight self-start sm:self-auto">
      {displayYear}
    </div>
  );
}

// 3D Perspective Card Component
function CarouselSlideCard({
  slide,
  isCenter,
  isLeft,
  isRight,
  onSelect,
  onImageClick,
}: {
  slide: MilestoneSlide;
  isCenter: boolean;
  isLeft: boolean;
  isRight: boolean;
  onSelect: () => void;
  onImageClick: (proof: CredentialProof) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedProofIndex, setSelectedProofIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Mouse Parallax Coordinates for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 220 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 220 });

  const rotateX = useTransform(smoothY, [-180, 180], [6, -6]);
  const rotateY = useTransform(smoothX, [-280, 280], [-6, 6]);
  const spotlightLeft = useTransform(smoothX, (v) => v + 350);
  const spotlightTop = useTransform(smoothY, (v) => v + 200);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCenter || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeProof = slide.proofs[selectedProofIndex] || slide.proofs[0];

  // 3D Perspective Card Position Transform
  const cardVariants = {
    center: {
      x: "0%",
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 30,
      filter: "blur(0px) brightness(1)",
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 26,
        mass: 0.9,
      },
    },
