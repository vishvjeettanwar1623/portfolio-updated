import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
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
    headline: "Academic Inception & Web3 Foundations",
    status: "FOUNDATION",
    timeframe: "Aug 2024 — Dec 2024",
    tagline: "B.Tech CSE Commencement Â· 9.29 SGPA Â· HackQuest Advocate",
    summary:
      "Commenced Bachelor of Technology in Computer Science & Engineering at JSS University Noida, built first smart contract protocols, and joined global developer advocacy programs.",
    highlights: [
      {
        title: "B.Tech CSE Commencement — JSS University Noida",
        subtext: "Began rigorous engineering curriculum in systems programming, calculus, and algorithms.",
        metric: "CSE Dept",
      },
      {
        title: "Academic SGPA 9.29 (Semester 1)",
        subtext: "Top departmental ranking in first semester engineering examinations.",
        metric: "9.29 SGPA",
      },
      {
        title: "Joined HackQuest as Student Developer Advocate",
        subtext: "Conducted peer co-learning sessions and onboarded student developers to Web3 builders ecosystem.",
        metric: "Advocate",
      },
      {
        title: "Solidity & Decentralized Protocol Research",
        subtext: "Authored foundational smart contracts for escrow custody and on-chain verification.",
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
    tagline: "McKinsey Forward Â· AIR 30 ACPC Â· 3D Games Internship Â· 9.45 SGPA",
    summary:
      "Selected for McKinsey's global executive fellowship, scored AIR 30 in national algorithmic programming, finished a 3D modeling engineering internship, and podiumed at Web3 hackathons.",
    highlights: [
      {
        title: "McKinsey & Company Forward Learning Program",
        subtext: "Global executive training in strategic problem framing, digital business, and team leadership.",
        metric: "Fellow",
      },
      {
        title: "AIR 30 — ACPC AlgoHour 3.0",
        subtext: "Top 30 national finish solving complex dynamic programming and graph algorithm challenges.",
        metric: "AIR 30",
      },
      {
        title: "Google Cloud Arcade Champion Badge",
        subtext: "Architected enterprise cloud services, security policies, and automated Kubernetes pipelines.",
        metric: "Champion",
      },
      {
        title: "3D Modelling Internship — GauravGo Games",
        subtext: "Designed hard-surface 3D assets, environmental props, and spatial geometry in Blender.",
        metric: "3D Games",
      },
      {
        title: "3rd Position — EduChain Delhi Regional Hackathon",
        subtext: "Constructed decentralized verifiable credential issuance smart contracts on EVM.",
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
    headline: "Data Intelligence & Prize Podiums",
    status: "CURRENT ERA",
    timeframe: "Jan 2026 — Present",
    tagline: "Google Certified Â· National Big Code Finals Â· Monad Blitz Prize",
    summary:
      "Enterprise data intelligence pipelines, competitive algorithmic optimization, maintaining a 9.35 SGPA, and claiming high-throughput EVM smart contract podium wins.",
    highlights: [
      {
        title: "Google Data Analytics Professional Certification",
        subtext: "Mastered end-to-end data pipelines, SQL querying, R statistical modeling, and Tableau visualization suites.",
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
        subtext: "Engineered real-time high-concurrency smart contracts on Monad EVM testnet with instant automated escrow payouts.",
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
    left: {
      x: "-42%",
      y: 8,
      scale: 0.85,
      rotateY: 24,
      rotateZ: -1.5,
