import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
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
      opacity: 0.45,
      zIndex: 10,
      filter: "blur(1.5px) brightness(0.9)",
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 26,
        mass: 0.9,
      },
    },
    right: {
      x: "42%",
      y: 8,
      scale: 0.85,
      rotateY: -24,
      rotateZ: 1.5,
      opacity: 0.45,
      zIndex: 10,
      filter: "blur(1.5px) brightness(0.9)",
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 26,
        mass: 0.9,
      },
    },
    hidden: {
      x: "0%",
      y: 15,
      scale: 0.7,
      rotateY: 0,
      rotateZ: 0,
      opacity: 0,
      zIndex: 0,
      filter: "blur(6px)",
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  const currentVariant = isCenter ? "center" : isLeft ? "left" : isRight ? "right" : "hidden";

  return (
    <motion.div
      variants={cardVariants}
      animate={currentVariant}
      whileHover={
        !isCenter
          ? {
              scale: 0.88,
              opacity: 0.75,
              filter: "blur(0px) brightness(1)",
              transition: { duration: 0.25 },
            }
          : undefined
      }
      onClick={() => {
        if (!isCenter) onSelect();
      }}
      className={`absolute w-full max-w-4xl h-full rounded-3xl bg-card border border-foreground/20 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-3xl overflow-hidden flex flex-col justify-between transition-colors duration-500 cursor-pointer ${
        !isCenter ? "hover:border-foreground/45" : ""
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isCenter && isCardHovered ? rotateX : 0,
          rotateY: isCenter && isCardHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full flex flex-col justify-between relative"
      >
        {/* Top Subtle Shimmer Strip */}
        <div className="absolute -top-6 sm:-top-8 md:-top-10 -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent group-hover:via-foreground transition-all duration-500 z-20" />

        {/* Cursor Radial Spotlight Glow on Hover */}
        {isCenter && (
          <motion.div
            style={{
              left: spotlightLeft,
              top: spotlightTop,
            }}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-radial from-foreground/[0.07] to-transparent blur-2xl z-0"
          />
        )}

        {/* Header Information Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-foreground/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                {slide.timeframe}
              </span>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-xs font-mono font-bold text-foreground uppercase">
                {slide.status}
              </span>
            </div>

            <ScrambleHeadline
              text={slide.headline}
              isCenter={isCenter}
            />
          </div>

          {/* Animated Year */}
          <ScrambleYear year={slide.year} isCenter={isCenter} />
        </div>

        {/* 2-Column Split: Milestones & Certificate Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 flex-1">
          {/* Left Column: Narrative & Highlights (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm text-foreground/85 font-light leading-relaxed">
              {slide.summary}
            </p>

            <div className="space-y-1.5">
              {slide.highlights.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="p-2.5 rounded-xl bg-foreground/[0.02] hover:bg-foreground/[0.05] border border-foreground/10 hover:border-foreground/30 transition-all flex items-center justify-between gap-2.5 cursor-pointer group/item"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="text-foreground font-mono text-xs mt-0.5 select-none group-hover/item:scale-125 transition-transform">
                      ✦
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-foreground tracking-tight truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-light truncate">
                        {item.subtext}
                      </div>
                    </div>
                  </div>

                  {item.metric && (
                    <span className="px-2 py-0.5 rounded-lg bg-foreground/5 text-[10px] font-mono text-foreground font-bold flex-shrink-0 group-hover/item:bg-foreground group-hover/item:text-background transition-colors">
                      {item.metric}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Proof Showcase (5 Cols) */}
          <div className="md:col-span-5 flex flex-col space-y-3">
            {/* Featured Image with Animated Holographic Laser Scanline */}
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(activeProof);
              }}
              whileHover={{ scale: 1.035, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/img relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-neutral-900 border border-foreground/15 hover:border-foreground/45 shadow-lg cursor-pointer"
            >
              <Image
                src={slide.proofs[selectedProofIndex]?.src || slide.proofs[0].src}
                alt={slide.proofs[selectedProofIndex]?.alt || slide.proofs[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-center group-hover/img:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Animated Vertical Holographic Scanline Beam */}
              <motion.div
                animate={{
                  y: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                }}
                className="pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              />

              {/* Corner HUD Brackets */}
              <div className="absolute top-2 left-2 text-white/80 font-mono text-xs select-none">
                +
              </div>
              <div className="absolute top-2 right-2 text-white/80 font-mono text-xs select-none">
                +
              </div>
              <div className="absolute bottom-2 left-2 text-white/80 font-mono text-xs select-none">
                +
              </div>
              <div className="absolute bottom-2 right-2 text-white/80 font-mono text-xs select-none">
                +
              </div>

              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2.5 pointer-events-none">
                <span className="text-[9px] font-mono text-neutral-400">
                  {slide.proofs[selectedProofIndex]?.category || slide.proofs[0].category}
                </span>
                <span className="text-[11px] font-bold text-white truncate">
                  {slide.proofs[selectedProofIndex]?.alt || slide.proofs[0].alt}
                </span>
              </div>
            </motion.div>

            {/* 4 Thumbnail Switchers with Magnetic Hover */}
            <div className="grid grid-cols-4 gap-2">
              {slide.proofs.map((proof, pIdx) => {
                const isSelected = pIdx === selectedProofIndex;
                return (
                  <motion.button
                    key={pIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProofIndex(pIdx);
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-11 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-foreground ring-2 ring-foreground/40 scale-105"
                        : "border-foreground/15 opacity-60 hover:opacity-100 hover:border-foreground/30"
                    }`}
                  >
                    <Image
                      src={proof.src}
                      alt={proof.alt}
                      fill
                      sizes="15vw"
                      className="object-cover"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at 2026
  const [selectedProofModal, setSelectedProofModal] = useState<CredentialProof | null>(null);

  const { playSound } = useSound();

  const handlePrev = () => {
    playSound("switch");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  };

  const handleNext = () => {
    playSound("switch");
    setCurrentIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  };

  return (
    <SectionWrapper
      id="experience"
      className="bg-transparent py-24 md:py-40 overflow-visible relative"
    >
      {/* Lightbox Modal for Certificate Inspection */}
      <AnimatePresence>
        {selectedProofModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProofModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-3xl overflow-hidden border border-foreground/20 bg-card shadow-2xl p-2 cursor-default flex flex-col"
            >
              <div className="relative w-full h-[62vh] rounded-2xl overflow-hidden bg-neutral-900">
                <Image
                  src={selectedProofModal.src}
                  alt={selectedProofModal.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                    {selectedProofModal.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-foreground font-mono">
                    {selectedProofModal.alt}
                  </h4>
                </div>

                <button
                  onClick={() => setSelectedProofModal(null)}
                  className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header with Clean Arrow Controllers */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <SplitTextReveal text="My Journey" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[2px] sm:tracking-[4px] md:tracking-[6px] text-foreground font-[family-name:var(--font-audiowide)] drop-shadow-md whitespace-nowrap" />

          {/* Clean Arrow Controllers */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/15 flex items-center justify-center text-foreground transition-colors cursor-pointer"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/15 flex items-center justify-center text-foreground transition-colors cursor-pointer"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* 3D Perspective Stage Deck */}
        <div
          className="relative w-full h-[580px] sm:h-[520px] md:h-[480px] flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          {SLIDES.map((slide, idx) => {
            const offset = idx - currentIndex;
            const isCenter = offset === 0;
            const isLeft = offset === -1 || (currentIndex === 0 && idx === SLIDES.length - 1);
            const isRight = offset === 1 || (currentIndex === SLIDES.length - 1 && idx === 0);

            return (
              <CarouselSlideCard
                key={slide.id}
                slide={slide}
                isCenter={isCenter}
                isLeft={isLeft}
                isRight={isRight}
                onSelect={() => setCurrentIndex(idx)}
                onImageClick={(proof) => setSelectedProofModal(proof)}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ExperienceSection;

