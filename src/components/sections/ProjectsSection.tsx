"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Github, ArrowUpRight } from "lucide-react";

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
    name: "AI",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  IPFS: {
    name: "IPFS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png",
  },
  Pinata: {
    name: "Pinata",
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
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  Markdown: {
    name: "Markdown / Obsidian",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg",
    invert: true,
  },
  "Story Protocol": {
    name: "Story Protocol",
    icon: "/assets/skills/smart-contract.png",
  },
  Web3: {
    name: "Web3",
    icon: "/assets/skills/smart-contract.png",
  },
};

const allProjects = [
  {
    id: "01",
    name: "Eternal",
    image: "/assets/Projects/eternal.png",
    description:
      "Eternal is a real-time, on-chain auto-battler where two players stake tokens, solve live coding challenges, and have their code graded by AI for on-chain resolution.",
    techStack: ["TypeScript", "Solidity", "JavaScript", "AI"],
  },
  {
    id: "02",
    name: "Data Roots",
    image: "/assets/Projects/data_roots.png",
    description:
      "Data Roots is a blockchain application allowing secure, decentralized data storage and sharing via IPFS and Solidity smart contracts.",
    techStack: ["JavaScript", "Solidity", "IPFS", "Pinata"],
  },
  {
    id: "03",
    name: "Promp-IP",
    image: "/assets/Projects/promp-ip.png",
    description:
      "AI Prompt Ownership & Licensing Marketplace powered by Story Protocol for intellectual property management and smart contracts.",
    techStack: ["React", "TypeScript", "Solidity", "Story Protocol"],
  },
  {
    id: "04",
    name: "Questfi",
    image: "/assets/Projects/questfi.png",
    description:
      "A modern bounty platform enabling users to create, manage, and complete tasks with transparent blockchain-based payments.",
    techStack: ["JavaScript", "Solidity", "React"],
  },
  {
    id: "05",
    name: "Profile Auditor",
    image: "/assets/Projects/profile-auditor.png",
    description:
      "An application that verifies resume claims against online developer activity across GitHub, Leetcode, and public repositories.",
    techStack: ["Python", "JavaScript", "FastAPI"],
  },
  {
    id: "06",
    name: "PDF-Chatbot",
    image: "/assets/Projects/pdf-chatbot.png",
    description:
      "An AI PDF teacher providing document-specific quizzes and interactive question-answering generated directly from uploaded files.",
    techStack: ["Flutter", "Dart", "Firebase"],
  },
  {
    id: "07",
    name: "Playback Extension",
    image: "/assets/Projects/playback-extension.png",
    description:
      "Custom YouTube playback speed extension offering high-velocity playback speeds beyond the standard 2x limit.",
    techStack: ["JavaScript", "HTML"],
  },
  {
    id: "08",
    name: "LagLine",
    image: "/assets/Projects/lagline.jpg",
    description:
      "LagLine is a desktop app (Tauri + Rust + React) scanning your workspace for Git repos, uncommitted changes, and diverged branches in real-time.",
    techStack: ["Rust", "Tauri", "React", "Git"],
  },
  {
    id: "09",
    name: "Vaxis",
    image: "/assets/Projects/vaxis.jpg",
    description:
      "Local-first developer memory & AI context engine converting codebase structure into a semantic wikilink graph inside Obsidian.",
    techStack: ["TypeScript", "React", "AI", "Markdown"],
  },
  {
    id: "10",
    name: "FocusGuard",
    image: "/assets/Projects/focus-guard.jpg",
    description:
      "AI browser snapshot monitor that understands workflow context and blocks un-productive site distractions automatically.",
    techStack: ["JavaScript", "AI", "HTML"],
  },
  {
    id: "11",
    name: "EgoArena",
    image: "/assets/Projects/ego-arena.jpg",
    description:
      "Psychological stress-test game creating personalized Character Cards and simulating high-stakes 1v1 AI arena battles.",
    techStack: ["React", "TypeScript", "AI"],
  },
  {
    id: "12",
    isGithub: true,
    name: "Visit my GitHub for more projects",
  },
];

const col1 = [allProjects[0], allProjects[3], allProjects[6], allProjects[9]];
const col2 = [allProjects[1], allProjects[4], allProjects[7], allProjects[10]];
const col3 = [allProjects[2], allProjects[5], allProjects[8], allProjects[11]];

function ProjectGridCard({ project }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  if (project.isGithub) {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative w-full rounded-3xl bg-white/80 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-xl border border-black/10 dark:border-white/15 hover:border-black/30 dark:hover:border-white/40 p-8 flex flex-col items-center justify-center text-center overflow-hidden group shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] min-h-[380px] cursor-pointer"
      >
        {/* Dynamic Interactive Spotlight Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0,0,0,0.05), transparent 40%)`,
          }}
        />

        <div className="absolute -top-24 -right-24 w-60 h-60 bg-black/[0.03] dark:bg-white/[0.05] rounded-full blur-3xl pointer-events-none group-hover:bg-black/[0.06] dark:group-hover:bg-white/[0.12] transition-all duration-500" />

        <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 font-[family-name:var(--font-audiowide)] drop-shadow-sm">
          Visit my GitHub for more projects
        </h3>

        <div className="relative z-10 my-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
          <Github className="w-14 h-14 text-neutral-900 dark:text-white" />
        </div>

        <a
          href="https://github.com/vishvjeettanwar1623"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs tracking-wider uppercase transition-colors shadow-lg mt-2 pointer-events-auto"
        >
          <span>See more on GitHub</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group relative w-full rounded-3xl bg-white dark:bg-neutral-900/70 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/35 transition-all duration-500 overflow-hidden shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col cursor-pointer"
    >
      {/* Dynamic Specular Spotlight Sheen Following Cursor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: `radial-gradient(500px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0,0,0,0.05), transparent 40%)`,
        }}
      />

      {/* Featured Project Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-neutral-100 dark:bg-black/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent dark:from-neutral-950 dark:via-neutral-950/30" />
      </div>

      {/* Card Details */}
      <div className="p-6 md:p-7 flex flex-col flex-1 justify-between bg-white dark:bg-neutral-950/90 relative z-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] tracking-wide mb-3 transition-colors drop-shadow-sm">
            {project.name}
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-white/75 leading-relaxed mb-6 font-light">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Logos */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-black/10 dark:border-white/10">
          {project.techStack?.map((techKey: string) => {
            const tech = TECH_LOGOS[techKey] || {
              name: techKey,
              icon: "/assets/skills/smart-contract.png",
            };

            return (
              <div
                key={techKey}
                title={tech.name}
                className="w-10 h-10 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={`w-full h-full object-contain ${
                    tech.invert ? "invert" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth Springs for luxurious inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Ultra-Dynamic 3D Parallax Scroll Transformations
  const y1 = useTransform(smoothProgress, [0, 0.5, 1], [80, 0, -220]);
  const rotateX1 = useTransform(smoothProgress, [0, 0.5, 1], [16, 0, -10]);
  const rotateY1 = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -5]);
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  const y2 = useTransform(smoothProgress, [0, 0.5, 1], [120, 0, -420]);
  const rotateX2 = useTransform(smoothProgress, [0, 0.5, 1], [22, 0, -8]);
  const scale2 = useTransform(smoothProgress, [0, 0.5, 1], [0.88, 1.04, 0.98]);

  const y3 = useTransform(smoothProgress, [0, 0.5, 1], [90, 0, -180]);
  const rotateX3 = useTransform(smoothProgress, [0, 0.5, 1], [16, 0, -10]);
  const rotateY3 = useTransform(smoothProgress, [0, 0.5, 1], [-10, 0, 5]);
  const scale3 = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <SectionWrapper
      id="projects"
      className="bg-transparent py-16 md:py-28 overflow-hidden"
    >
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-normal uppercase tracking-[3px] md:tracking-[6px] mb-4 text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] drop-shadow-sm"
          >
            Work Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-neutral-700 dark:text-white/85 text-base md:text-lg font-light"
          >
            Real projects built and shipped. Scroll to experience 3D depth.
          </motion.p>
        </div>

        {/* 3D Perspective Column Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start [perspective:1200px]">
          {/* Column 1 (Left 3D Tilt) */}
          <motion.div
            style={{
              y: y1,
              rotateX: rotateX1,
              rotateY: rotateY1,
              scale: scale1,
            }}
            className="flex flex-col gap-6 md:gap-10 transform-gpu"
          >
            {col1.map((project) => (
              <ProjectGridCard key={`col1-${project.id}`} project={project} />
            ))}
          </motion.div>

          {/* Column 2 (Middle - High Velocity 3D Float Forward) */}
          <motion.div
            style={{
              y: y2,
              rotateX: rotateX2,
              scale: scale2,
            }}
            className="flex flex-col gap-6 md:gap-10 transform-gpu z-10"
          >
            {col2.map((project) => (
              <ProjectGridCard key={`col2-${project.id}`} project={project} />
            ))}
          </motion.div>

          {/* Column 3 (Right 3D Tilt) */}
          <motion.div
            style={{
              y: y3,
              rotateX: rotateX3,
              rotateY: rotateY3,
              scale: scale3,
            }}
            className="flex flex-col gap-6 md:gap-10 transform-gpu"
          >
            {col3.map((project) => (
              <ProjectGridCard key={`col3-${project.id || 'gh'}`} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
