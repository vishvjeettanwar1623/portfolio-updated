import { ProjectLiveSandbox } from "@/components/ui/ProjectLiveSandbox";
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
  Github,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";

interface TechLogo {
  name: string;
  icon: string;
  invert?: boolean;
}

const TECH_LOGOS: Record<string, TechLogo> = {
  TypeScript: {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  JavaScript: {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  Solidity: {
    name: "Solidity",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg",
    invert: true,
  },
  React: {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  Python: {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  FastAPI: {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  },
  Flutter: {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  Dart: {
    name: "Dart",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  },
  Firebase: {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  },
  HTML: {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  AI: {
    name: "AI / LLM",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  IPFS: {
    name: "IPFS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png",
  },
  Pinata: {
    name: "Pinata Cloud",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png",
  },
  Rust: {
    name: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    invert: true,
  },
  Tauri: {
    name: "Tauri",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg",
  },
  Git: {
    name: "Git Core",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  Markdown: {
    name: "Obsidian",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg",
    invert: true,
  },
  "Story Protocol": {
    name: "Story Protocol",
    icon: "/assets/skills/smart-contract.png",
  },
};

export interface Project {
  id: string;
  num: string;
  name: string;
  category: string;
  tagline: string;
  image: string;
  domainUrl: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    id: "eternal",
    num: "01",
    name: "Eternal",
    category: "ON-CHAIN ARENA",
    tagline: "Real-Time Auto-Battler with AI Code Grading",
    image: "/assets/Projects/eternal.png",
    domainUrl: "eternal.onchain.app",
    description:
      "A competitive 1v1 on-chain auto-battler where players stake crypto tokens, solve real-time algorithmic coding challenges, and have their solutions evaluated on-chain by autonomous AI validator nodes for instant automated payouts.",
    highlights: [
      "Zero-latency WebSockets match engine",
      "Solidity smart contract escrow & staking vaults",
      "AST-based AI code grading oracle",
      "Instant automated EVM contract settlement",
    ],
    techStack: ["TypeScript", "Solidity", "JavaScript", "AI"],
  },
  {
    id: "data-roots",
    num: "02",
    name: "Data Roots",
    category: "DECENTRALIZED P2P",
    tagline: "Sovereign Peer-to-Peer Data Monetization Protocol",
    image: "/assets/Projects/data_roots.webp",
    domainUrl: "data-roots.vercel.app",
    description:
      "A decentralized P2P data marketplace empowering users to encrypt, control, share, and monetize personal telemetry and structured datasets with Solidity smart contracts and IPFS storage.",
    highlights: [
      "Client-side AES-GCM file encryption pipeline",
      "Decentralized storage via Pinata & IPFS nodes",
      "Programmable access licensing smart contracts",
      "Live production deployment with Web3 wallet auth",
    ],
    techStack: ["JavaScript", "Solidity", "IPFS", "Pinata"],
    codeUrl: "https://github.com/vishvjeettanwar1623/Data-Roots",
    liveUrl: "https://data-roots.vercel.app",
  },
  {
    id: "promp-ip",
    num: "03",
    name: "Promp-IP",
    category: "IP ASSET PROTOCOL",
    tagline: "AI Prompt Ownership & Programmable Licensing Marketplace",
    image: "/assets/Projects/promp-ip.webp",
    domainUrl: "promp-ip.protocol.xyz",
    description:
      "An intellectual property licensing marketplace powered by Story Protocol, converting high-performance prompt engineering pipelines into verifiable, royalty-earning programmable IP assets.",
    highlights: [
      "Story Protocol programmable IP asset registration",
      "Automated on-chain royalty distribution contracts",
      "Cryptographic prompt hashing & verification",
      "Interactive marketplace explorer with React & Web3",
    ],
    techStack: ["React", "TypeScript", "Solidity", "Story Protocol"],
  },
  {
    id: "questfi",
    num: "04",
    name: "Questfi",
    category: "WEB3 ESCROW",
    tagline: "Transparent Web3 Bounty & Milestone Protocol",
    image: "/assets/Projects/questfi.webp",
    domainUrl: "questfi.network",
    description:
      "A modern decentralized task and bounty platform connecting open-source developers with verified organizations through automated smart contract milestone escrows.",
    highlights: [
      "Smart contract milestone escrow vault architecture",
      "Proof-of-work submission & review dashboard",
      "Gas-efficient token transfer logic on EVM",
      "Real-time task tracking with instant notifications",
    ],
    techStack: ["JavaScript", "Solidity", "React"],
  },
  {
    id: "profile-auditor",
    num: "05",
    name: "Profile Auditor",
    category: "AI AUDIT ENGINE",
    tagline: "Autonomous Developer Activity Verification Engine",
    image: "/assets/Projects/profile-auditor.png",
    domainUrl: "auditor.dev/verify",
    description:
      "An automated verification engine that extracts resume credentials and cross-examines them against online developer activity across GitHub, LeetCode, and public repositories.",
    highlights: [
      "FastAPI asynchronous worker architecture",
      "Multi-platform developer data aggregation scrapers",
      "NLP resume entity extraction & claim matching",
      "Comprehensive verification report generator",
    ],
    techStack: ["Python", "JavaScript", "FastAPI"],
  },
  {
    id: "pdf-chatbot",
    num: "06",
    name: "PDF-Chatbot",
    category: "NEURAL RAG",
    tagline: "Interactive AI Document Tutor & Quiz Generator",
    image: "/assets/Projects/pdf-chatbot.webp",
    domainUrl: "pdfchatbot.app",
    description:
      "A document intelligence application that parses academic textbooks, generates localized vector embeddings, and creates interactive Q&A sessions with dynamic practice quizzes.",
    highlights: [
      "Cross-platform Flutter & Dart mobile experience",
      "Vector embedding search for semantic document recall",
      "Dynamic multi-choice & conceptual quiz generation",
      "Firebase real-time sync with offline state support",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "AI"],
  },
  {
    id: "playback-extension",
    num: "07",
    name: "Playback Extension",
    category: "BROWSER ACCELERATOR",
    tagline: "High-Velocity Media Controller with Granular Multipliers",
    image: "/assets/Projects/playback-extension.png",
    domainUrl: "chrome.store/playback-ext",
    description:
      "A high-performance browser extension unlocking granular playback speeds up to 16x on video platforms beyond native player limits, with real-time pitch-preserved audio.",
    highlights: [
      "Granular speed multiplier scaling from 0.1x to 16.0x",
      "Pitch-preserving real-time audio processing",
      "Zero-overhead DOM injection architecture",
      "Customizable quick-access hotkey triggers",
    ],
    techStack: ["JavaScript", "HTML"],
  },
  {
    id: "lagline",
    num: "08",
    name: "LagLine",
    category: "NATIVE DESKTOP",
    tagline: "Ultra-Lightweight Multi-Repo Git Workspace Monitor",
    image: "/assets/Projects/lagline.jpg",
    domainUrl: "lagline.desktop.dev",
    description:
      "A native desktop application built with Rust and Tauri that continuously monitors workspace folders for uncommitted changes, unpushed branches, and sync lag in real-time.",
    highlights: [
      "Rust & Tauri native architecture with <15MB RAM footprint",
      "Kernel file-watcher for instant Git status detection",
      "Multi-repository dashboard with one-click branch sync",
      "Keyboard-centric UI built with React and Tailwind",
    ],
    techStack: ["Rust", "Tauri", "React", "Git"],
  },
  {
    id: "vaxis",
    num: "09",
    name: "Vaxis",
    category: "AI KNOWLEDGE GRAPH",
    tagline: "Codebase Semantic Knowledge Graph for Obsidian",
    image: "/assets/Projects/vaxis.jpg",
    domainUrl: "vaxis.memory.ai",
    description:
      "Local-first developer memory engine that converts codebase AST structures into a semantic bi-directional wikilink knowledge graph inside Obsidian for local AI reasoning.",
    highlights: [
      "AST code parser converting files into semantic nodes",
      "Bi-directional Obsidian wikilink generator",
      "Local vector search for privacy-preserving code queries",
      "Interactive architectural relationship visualizer",
    ],
    techStack: ["TypeScript", "React", "AI", "Markdown"],
  },
  {
    id: "focusguard",
    num: "10",
    name: "FocusGuard",
    category: "AI WORKFLOW AGENT",
    tagline: "Context-Aware Intelligent Workflow Guardian",
    image: "/assets/Projects/focus-guard.jpg",
    domainUrl: "focusguard.io",
    description:
      "An intelligent browser companion that analyzes active development context and dynamically restricts distracting sites only when deep work is detected.",
    highlights: [
      "Intelligent workflow context detection algorithms",
      "Dynamic distraction blocking based on active tasks",
      "Daily productivity analytics & focus streak tracker",
      "Lightweight privacy-preserving local computation",
    ],
    techStack: ["JavaScript", "AI", "HTML"],
  },
  {
    id: "egoarena",
    num: "11",
    name: "EgoArena",
    category: "AI COMBAT SIMULATOR",
    tagline: "Psychological Persona & Combat Simulator",
    image: "/assets/Projects/ego-arena.jpg",
    domainUrl: "egoarena.battle.ai",
    description:
      "A psychological stress-test simulator that extracts personality traits, generates custom combat Character Cards, and orchestrates tactical 1v1 AI arena battles.",
    highlights: [
      "Dynamic character stat generation from personality traits",
      "LLM-driven tactical battle simulation engine",
      "Live turn-by-turn combat commentary and strategy logs",
      "Animated card deck UI with 3D tilt effects",
    ],
    techStack: ["React", "TypeScript", "AI"],
  },
];

// Rolling Letter-by-Letter Typography Component
function RollingTypography({ text, isHovered }: { text: string; isHovered: boolean }) {
  return (
    <div className="relative inline-flex overflow-hidden py-1">
      {/* Primary Letters */}
      <div className="flex">
        {text.split("").map((char, index) => (
          <motion.span
            key={`char-primary-${index}`}
            animate={{
              y: isHovered ? "-120%" : "0%",
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.02,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Duplicate Letters sliding in from bottom */}
      <div className="absolute inset-0 flex">
        {text.split("").map((char, index) => (
          <motion.span
            key={`char-duplicate-${index}`}
            initial={{ y: "120%", opacity: 0 }}
            animate={{
              y: isHovered ? "0%" : "120%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.02,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block text-foreground font-bold"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// Futuristic Text Decrypt / Scramble on Hover Component
function DecryptText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " " || letter === "—" || letter === "-") return letter;
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className="font-mono">{displayText}</span>;
}

// 3D Perspective Card Component with Cursor Tilt & Aperture Reveal
function InteractivePerspectiveCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-2xl bg-neutral-950 border border-foreground/20 overflow-hidden shadow-2xl group/viewport cursor-pointer"
    >
      {/* Browser Top Window Strip */}
      <div className="w-full px-4 py-2.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center px-3 py-0.5 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-white/70 truncate max-w-[220px]">
          <span>https://{project.domainUrl}</span>
        </div>

        <div className="w-6" />
      </div>

      {/* Viewport Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-[360px] overflow-hidden bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center group-hover/viewport:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Light Sweep Glint on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover/viewport:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

        {/* Corner HUD Brackets */}
        <div className="absolute top-4 left-4 text-white/50 font-mono text-sm pointer-events-none select-none">
          +
        </div>
        <div className="absolute top-4 right-4 text-white/50 font-mono text-sm pointer-events-none select-none">
          +
        </div>
        <div className="absolute bottom-4 left-4 text-white/50 font-mono text-sm pointer-events-none select-none">
          +
        </div>
        <div className="absolute bottom-4 right-4 text-white/50 font-mono text-sm pointer-events-none select-none">
          +
        </div>

        {/* Floating Project Tag */}
        <div className="absolute bottom-4 left-4 flex items-center pointer-events-none z-10">
          <span className="text-xs font-mono font-bold text-white bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-lg">
            {project.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Individual Interactive Project Row with Parallax Watermark, Decrypt Text & Laser Sweep
function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<"sandbox" | "card">("sandbox");
  const rowRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full border-b border-foreground/15 transition-all duration-500 relative group/row overflow-hidden ${
        isExpanded
          ? "bg-foreground/[0.04] dark:bg-foreground/[0.06] shadow-lg"
          : "hover:bg-foreground/[0.02] dark:hover:bg-foreground/[0.03]"
      }`}
    >
      {/* Background Watermark Number on Left Side with Parallax Hover Shift */}
      <motion.div
        animate={{
          x: isHovered ? 12 : 0,
          opacity: isHovered ? 0.08 : 0.035,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-3 sm:left-6 top-0 h-[76px] sm:h-[96px] md:h-[112px] flex items-center text-7xl sm:text-8xl md:text-9xl font-mono font-black select-none z-0 tracking-tighter"
      >
        {project.num}
      </motion.div>

      {/* Interactive Cursor-Tracking Radial Spotlight */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-radial from-foreground/[0.06] to-transparent blur-2xl z-0"
      />

      {/* Laser Accent Light on Left Edge */}
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "5px" : isHovered ? "4px" : "0px",
          opacity: isExpanded || isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute left-0 top-0 bottom-0 bg-foreground shadow-[0_0_16px_rgba(255,255,255,0.9)] z-20"
      />

      {/* Laser Bottom Shimmer Streak on Hover */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-foreground to-transparent origin-left z-20"
      />

        {/* Row Header Bar with Rolling Typography & Decrypt Tagline */}
      <div
        onClick={onToggle}
        className="w-full py-7 sm:py-9 md:py-11 px-4 sm:px-8 flex items-center justify-between cursor-pointer select-none relative z-10"
      >
        {/* Left: Rolling Title & Decrypt Tagline */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-6 flex-1 min-w-0">
          <motion.div
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-[family-name:var(--font-audiowide)] text-foreground truncate inline-block"
          >
            <RollingTypography text={project.name} isHovered={isHovered} />
          </motion.div>

          <motion.span
            animate={{
              x: isHovered ? 10 : 0,
              opacity: isHovered ? 0.95 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="text-xs sm:text-sm font-mono uppercase tracking-wider text-foreground truncate hidden sm:inline-block"
          >
            — <DecryptText text={project.tagline} isHovered={isHovered} />
          </motion.span>
        </div>

        {/* Right: Category Badge & Tactile Chevron Indicator */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 ml-4">
          <motion.span
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-mono uppercase tracking-widest text-foreground/70 bg-foreground/5 border border-foreground/10 px-3.5 py-1.5 rounded-full hidden md:inline-block group-hover/row:border-foreground/30 group-hover/row:bg-foreground/10 transition-colors"
          >
            {project.category}
          </motion.span>

          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
              scale: isHovered ? 1.15 : 1,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-colors duration-300 shadow-sm ${
              isExpanded
                ? "bg-foreground text-background border-foreground shadow-md"
                : "bg-foreground/5 text-foreground border-foreground/15 group-hover/row:bg-foreground group-hover/row:text-background group-hover/row:border-foreground"
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Studio Drawer */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-foreground/10 bg-foreground/[0.015] dark:bg-foreground/[0.035] relative z-10"
          >
            <div className="p-6 sm:p-10 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: 3D Perspective Card (6 Cols) */}
              <div className="lg:col-span-6">
                <InteractivePerspectiveCard project={project} />
              </div>

              {/* Right Column: Engineering Breakdown & Action Hub (6 Cols) */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-foreground/70 font-bold">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-foreground/85 leading-relaxed font-light mb-6">
                    {project.description}
                  </p>

                  {/* Key Highlights with Micro-Stagger */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 font-light transition-transform"
                      >
                        <span className="text-foreground font-mono text-sm mt-0.5">
                          ✦
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Matrix with Float Bob */}
                <div className="pt-5 border-t border-foreground/10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/50 mb-3 block">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((techKey, i) => {
                      const tech = TECH_LOGOS[techKey] || {
                        name: techKey,
                      };
                      return (
                        <motion.div
                          key={techKey}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -3, 0],
                          }}
                          transition={{
                            opacity: { duration: 0.3, delay: 0.2 + i * 0.04 },
                            scale: { duration: 0.3, delay: 0.2 + i * 0.04 },
                            y: {
                              duration: 3 + (i % 3) * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          whileHover={{ scale: 1.15, y: -4 }}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground text-xs font-mono font-medium hover:bg-foreground/10 hover:border-foreground/30 transition-colors shadow-sm cursor-pointer"
                        >
                          {tech.icon && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className={`w-3.5 h-3.5 object-contain ${
                                tech.invert ? "invert dark:invert-0" : ""
                              }`}
                            />
                          )}
                          <span>{tech.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Tactile Magnetic Action Launchers */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-xs uppercase tracking-widest transition-all shadow-md group/launch"
                      >
                        <span>Launch Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/launch:translate-x-1 group-hover/launch:-translate-y-1 transition-transform" />
                      </motion.a>
                    )}

                    {project.codeUrl && (
                      <motion.a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/15 font-bold text-xs uppercase tracking-widest transition-all shadow-sm group/code"
                      >
                        <Github className="w-4 h-4 group-hover/code:rotate-12 transition-transform" />
                        <span>View Source Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { playSound } = useSound();

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      playSound("close");
    } else {
      playSound("expand");
    }
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionWrapper
      id="projects"
      className="bg-transparent py-24 md:py-40 overflow-visible relative"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header with On-Scroll Kinetic Reveal */}
        <div className="mb-14 text-center w-full">
          <SplitTextReveal text="Work Portfolio" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[2px] sm:tracking-[4px] md:tracking-[6px] text-foreground font-[family-name:var(--font-audiowide)] drop-shadow-md whitespace-nowrap" />
        </div>

        {/* Master Project Rows Table */}
        <div className="w-full border-t border-foreground/20 flex flex-col">
          {projects.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={idx}
              isExpanded={expandedId === project.id}
              onToggle={() => toggleExpand(project.id)}
            />
          ))}
        </div>

        {/* Master GitHub Explorer Card at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 w-full rounded-2xl bg-foreground/5 border border-foreground/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-foreground/10 border border-foreground/15 flex items-center justify-center flex-shrink-0">
              <Github className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-audiowide)] text-foreground">
                Looking for more repositories?
              </h4>
              <p className="text-xs sm:text-sm text-foreground/70 font-light">
                Explore 30+ open-source smart contracts, agent frameworks, and tooling on GitHub.
              </p>
            </div>
          </div>

          <motion.a
            href="https://github.com/vishvjeettanwar1623"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex-shrink-0 group/gh"
          >
            <span>Visit GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default ProjectsSection;




