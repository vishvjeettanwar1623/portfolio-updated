"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import {
  Github,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from "@/components/ui/progressive-carousel";

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
    image: "/assets/Projects/promp-ip.png",
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
    id: "lagline",
    num: "05",
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
    id: "profile-auditor",
    num: "06",
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
];

export function ProjectsSection() {
  const { playSound } = useSound();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Scroll Progress for Entrance and Exit Parallax & Perspective
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 1,
    restDelta: 0.001,
  });

  // Header: Enters from top -> Sits centered -> Exits upward earlier
  const headerY = useTransform(smoothProgress, [0, 0.38, 0.60, 0.88], ["-70px", "0px", "0px", "-80px"]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.26, 0.62, 0.86], [0, 1, 1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.38, 0.60, 0.88], [0.9, 1, 1, 0.92]);

  // Left Visual Media: Enters with weight from Left -> Stays -> Exits earlier to Left
  const leftX = useTransform(smoothProgress, [0, 0.40, 0.58, 0.88], ["-160px", "0px", "0px", "-160px"]);
  const leftOpacity = useTransform(smoothProgress, [0, 0.26, 0.60, 0.88], [0, 1, 1, 0]);
  const leftRotateY = useTransform(smoothProgress, [0, 0.40, 0.58, 0.88], [14, 0, 0, -12]);

  // Right Deep-Dive Info: Enters with weight from Right -> Stays -> Exits earlier to Right
  const rightX = useTransform(smoothProgress, [0, 0.40, 0.58, 0.88], ["160px", "0px", "0px", "160px"]);
  const rightOpacity = useTransform(smoothProgress, [0, 0.26, 0.60, 0.88], [0, 1, 1, 0]);
  const rightRotateY = useTransform(smoothProgress, [0, 0.40, 0.58, 0.88], [-14, 0, 0, 12]);

  // Bottom Timeline Buttons: Enters with weight from Bottom -> Stays -> Exits earlier to Above
  const bottomY = useTransform(smoothProgress, [0, 0.40, 0.58, 0.88], ["90px", "0px", "0px", "-70px"]);
  const bottomOpacity = useTransform(smoothProgress, [0, 0.26, 0.60, 0.88], [0, 1, 1, 0]);

  // GitHub Explorer: Enters from bottom -> Exits upward
  const githubY = useTransform(smoothProgress, [0.15, 0.46, 0.68, 0.92], ["70px", "0px", "0px", "-50px"]);
  const githubOpacity = useTransform(smoothProgress, [0.15, 0.40, 0.70, 0.92], [0, 1, 1, 0]);

  return (
    <SectionWrapper
      id="projects"
      className="bg-transparent py-20 md:py-32 overflow-visible relative"
    >
      <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 [perspective:1200px]">
        {/* Section Header with On-Scroll Kinetic Reveal */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
          className="mb-12 md:mb-16 text-center w-full"
        >
          <TextStaggerHover
            as="h2"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[2px] sm:tracking-[4px] md:tracking-[6px] text-foreground font-[family-name:var(--font-audiowide)] drop-shadow-md whitespace-nowrap"
          >
            <TextStaggerHoverActive animation="top">
              Work Portfolio
            </TextStaggerHoverActive>
            <TextStaggerHoverHidden animation="bottom">
              Work Portfolio
            </TextStaggerHoverHidden>
          </TextStaggerHover>
        </motion.div>

        {/* PROGRESSIVE CAROUSEL SLIDER */}
        <div className="w-full">
          <ProgressSlider
            duration={5500}
            fastDuration={350}
            activeSlider={projects[0].id}
            className="w-full rounded-2xl md:rounded-3xl border border-foreground/15 bg-neutral-950/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Slide Content Viewport */}
            <SliderContent className="w-full">
              {projects.map((project) => (
                <SliderWrapper key={project.id} value={project.id} className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] md:min-h-[520px] lg:min-h-[560px]">
                    {/* Visual Media Showcase (7 Columns) - Enters from Left, Exits to Left */}
                    <motion.div
                      style={{
                        x: leftX,
                        opacity: leftOpacity,
                        rotateY: leftRotateY,
                        transformStyle: "preserve-3d",
                      }}
                      className="lg:col-span-7 relative h-72 sm:h-96 md:h-[420px] lg:h-full overflow-hidden bg-neutral-900 border-b lg:border-b-0 lg:border-r border-foreground/15 group will-change-transform"
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Top Corner Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                          {project.num} · {project.category}
                        </span>
                      </div>

                      {/* Domain URL Tag */}
                      <div className="absolute bottom-4 left-4 z-10 flex items-center">
                        <span className="text-xs font-mono text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                          https://{project.domainUrl}
                        </span>
                      </div>
                    </motion.div>

                    {/* Engineering & Product Deep-Dive (5 Columns) - Enters from Right, Exits to Right */}
                    <motion.div
                      style={{
                        x: rightX,
                        opacity: rightOpacity,
                        rotateY: rightRotateY,
                        transformStyle: "preserve-3d",
                      }}
                      className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 will-change-transform"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-audiowide)] mb-2">
                          {project.name}
                        </h3>

                        <p className="text-xs sm:text-sm font-mono text-neutral-400 mb-4 leading-relaxed">
                          {project.tagline}
                        </p>

                        <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Highlights Matrix */}
                        <div className="space-y-2 mb-6">
                          {project.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300"
                            >
                              <span className="text-white font-mono mt-0.5">✦</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack & Action Links */}
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((techKey) => {
                            const tech = TECH_LOGOS[techKey] || { name: techKey, icon: "" };
                            return (
                              <span
                                key={techKey}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[11px]"
                              >
                                {tech.icon && (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className={`w-3.5 h-3.5 object-contain ${
                                      tech.invert ? "invert" : ""
                                    }`}
                                  />
                                )}
                                <span>{tech.name}</span>
                              </span>
                            );
                          })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-md cursor-pointer"
                            >
                              <span>Launch</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </motion.a>
                          )}

                          {project.codeUrl && (
                            <motion.a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white border border-white/15 hover:bg-white/20 font-mono font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
                            >
                              <Github className="w-4 h-4" />
                              <span>Source</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </SliderWrapper>
              ))}
            </SliderContent>

            {/* Bottom Progressive Indicator Button Group - Enters from Bottom, Exits to Above */}
            <motion.div
              style={{
                y: bottomY,
                opacity: bottomOpacity,
              }}
              className="w-full will-change-transform"
            >
              <SliderBtnGroup className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-foreground/15 bg-black/60 backdrop-blur-md">
                {projects.map((item, index) => (
                  <SliderBtn
                    key={index}
                    value={item.id}
                    className="text-left cursor-pointer p-3 sm:p-4 border-r border-b sm:border-b-0 border-foreground/15 last:border-r-0 hover:bg-white/5 transition-colors group"
                    progressBarClass="bg-white/20 dark:bg-white/25 h-full"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-white transition-colors">
                        {item.num}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 truncate max-w-[80px]">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold font-[family-name:var(--font-audiowide)] text-white truncate mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-light line-clamp-1 hidden sm:block">
                      {item.tagline}
                    </p>
                  </SliderBtn>
                ))}
              </SliderBtnGroup>
            </motion.div>
          </ProgressSlider>
        </div>

        {/* GitHub Explorer Banner at Bottom */}
        <motion.div
          style={{ y: githubY, opacity: githubOpacity }}
          className="mt-12 md:mt-16 w-full rounded-2xl bg-foreground/5 border border-foreground/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm will-change-transform"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex-shrink-0 group/gh cursor-pointer"
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





