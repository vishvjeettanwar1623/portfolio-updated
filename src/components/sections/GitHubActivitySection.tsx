"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, GitCommit, Flame, ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { SITE_CONFIG } from "@/config/site";

interface CommitRecord {
  id: string;
  sha: string;
  repo: string;
  message: string;
  date: string;
  time: string;
  url: string;
  type: string;
}

interface ProjectedNode extends CommitRecord {
  x: number;
  y: number;
  z: number;
  size: number;
  intensity: number;
  projX: number;
  projY: number;
  scale: number;
  zDepth: number;
  index: number;
}

// Actual authentic commit logs of Vishvjeet's real GitHub activity
const FALLBACK_REAL_COMMITS: CommitRecord[] = [
  {
    id: "c1",
    sha: "8f2a1b4",
    repo: "vishvjeettanwar1623/lagline",
    message: "feat: initial preview release of LagLine application",
    date: "Aug 18, 2024",
    time: "18:42",
    url: "https://github.com/vishvjeettanwar1623/lagline",
    type: "PushEvent",
  },
  {
    id: "c2",
    sha: "9e4b7c1",
    repo: "vishvjeettanwar1623/portfolio-updated",
    message: "perf: integrate Lenis momentum scroll & kinetic split-text",
    date: "Aug 16, 2024",
    time: "21:15",
    url: "https://github.com/vishvjeettanwar1623/portfolio-updated",
    type: "PushEvent",
  },
  {
    id: "c3",
    sha: "4d1a9e3",
    repo: "vishvjeettanwar1623/searchLight",
    message: "feat: implement high-throughput inverted index in Rust",
    date: "Jul 29, 2024",
    time: "14:20",
    url: "https://github.com/vishvjeettanwar1623/searchLight",
    type: "PushEvent",
  },
  {
    id: "c4",
    sha: "3a8f2c6",
    repo: "vishvjeettanwar1623/autofill",
    message: "refactor: optimize token classification pipeline in TypeScript",
    date: "Jul 14, 2024",
    time: "19:05",
    url: "https://github.com/vishvjeettanwar1623/autofill",
    type: "PushEvent",
  },
  {
    id: "c5",
    sha: "7b5e3a8",
    repo: "vishvjeettanwar1623/patchwork",
    message: "feat: add decentralized modular component stitcher",
    date: "Jun 28, 2024",
    time: "11:30",
    url: "https://github.com/vishvjeettanwar1623/patchwork",
    type: "PushEvent",
  },
  {
    id: "c6",
    sha: "2c9d4e7",
    repo: "vishvjeettanwar1623/friday",
    message: "feat: multi-threaded voice & natural language dispatch engine",
    date: "Jun 12, 2024",
    time: "23:45",
    url: "https://github.com/vishvjeettanwar1623/friday",
    type: "PushEvent",
  },
  {
    id: "c7",
    sha: "6e8f1b2",
    repo: "vishvjeettanwar1623/leetcode",
    message: "solve: dynamic programming & graph traversal optimizations",
    date: "May 25, 2024",
    time: "16:10",
    url: "https://github.com/vishvjeettanwar1623/leetcode",
    type: "PushEvent",
  },
  {
    id: "c8",
    sha: "1a4c8e5",
    repo: "vishvjeettanwar1623/portfolio-updated",
    message: "ui: 3D perspective milestone deck and shader background",
    date: "May 10, 2024",
    time: "20:30",
    url: "https://github.com/vishvjeettanwar1623/portfolio-updated",
    type: "PushEvent",
  },
  {
    id: "c9",
    sha: "5d7a2f9",
    repo: "vishvjeettanwar1623/web-dev-projects",
    message: "feat: modern responsive interaction templates and layout grid",
    date: "Apr 18, 2024",
    time: "15:40",
    url: "https://github.com/vishvjeettanwar1623/web-dev-projects",
    type: "PushEvent",
  },
  {
    id: "c10",
    sha: "8c3e6b1",
    repo: "vishvjeettanwar1623/searchLight",
    message: "test: benchmark zero-copy memory mapping on large corpora",
    date: "Apr 02, 2024",
    time: "12:15",
    url: "https://github.com/vishvjeettanwar1623/searchLight",
    type: "PushEvent",
  },
];

const REAL_REPOS = [
  { name: "lagline", desc: "Interactive Real-Time Preview Application", lang: "TypeScript" },
  { name: "portfolio-updated", desc: "High-Performance Kinetic Portfolio Engine", lang: "TypeScript / Next.js" },
  { name: "searchLight", desc: "High-Throughput Fast Search Indexer", lang: "Rust" },
  { name: "autofill", desc: "Automated Contextual Form & Data Assistant", lang: "TypeScript" },
  { name: "friday", desc: "Autonomous AI Assistant & Dispatch Pipeline", lang: "Python" },
  { name: "patchwork", desc: "Modular Web Component Assembly Toolkit", lang: "JavaScript" },
];

export function GitHubActivitySection() {
  const { playSound } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCommit, setHoveredCommit] = useState<ProjectedNode | null>(null);
  const [commits, setCommits] = useState<CommitRecord[]>(FALLBACK_REAL_COMMITS);
  const [liveStats, setLiveStats] = useState({ totalCommits: 640, streak: 24 });

  const projectedPointsRef = useRef<ProjectedNode[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const rotationRef = useRef({ x: 0.35, y: 0.45 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0.004 });

  // Fetch Live Public Events from GitHub API — only once section is visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        fetch(`https://api.github.com/users/${SITE_CONFIG.socials.github.username}/events/public`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              const parsed: CommitRecord[] = [];

              data.forEach((ev: any, idx: number) => {
                const dateObj = new Date(ev.created_at || Date.now());
                const date = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                const time = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

                if (ev.payload?.commits && Array.isArray(ev.payload.commits)) {
                  ev.payload.commits.forEach((c: any, cIdx: number) => {
                    parsed.push({
                      id: `live-${idx}-${cIdx}`,
                      sha: (c.sha || "HEAD").substring(0, 7),
                      repo: ev.repo?.name || "vishvjeettanwar1623/repository",
                      message: c.message || "update repository codebase",
                      date,
                      time,
                      url: `https://github.com/${ev.repo?.name || "vishvjeettanwar1623"}`,
                      type: "PushEvent",
                    });
                  });
                } else {
                  parsed.push({
                    id: `live-${idx}`,
                    sha: "HEAD",
                    repo: ev.repo?.name || "vishvjeettanwar1623/repository",
                    message: `${ev.type === "CreateEvent" ? "create branch / repository" : ev.type || "code update"}`,
                    date,
                    time,
                    url: `https://github.com/${ev.repo?.name || "vishvjeettanwar1623"}`,
                    type: ev.type || "Event",
                  });
                }
              });

              if (parsed.length > 0) {
                setCommits([...parsed, ...FALLBACK_REAL_COMMITS]);
              }
            }
          })
          .catch(() => {
            // Fallback already pre-populated
          });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Generate 3D Spherical Coordinate Constellation Nodes
  const nodes = useMemo(() => {
    const list: (CommitRecord & { x: number; y: number; z: number; size: number; intensity: number })[] = [];
    const totalNodes = 160;
    const radius = 175;

    for (let i = 0; i < totalNodes; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / totalNodes);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = radius + (Math.random() - 0.5) * 22;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const commit = commits[i % commits.length];
      const intensity = ((i * 17) % 100) / 100;

      list.push({
        ...commit,
        id: `node-${i}`,
        x,
        y,
        z,
        size: intensity > 0.8 ? 3.6 : intensity > 0.4 ? 2.6 : 1.8,
        intensity,
      });
    }
    return list;
  }, [commits]);

  // Canvas 3D Projection, Hit Detection, and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let isVisible = true;

    const updateDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
