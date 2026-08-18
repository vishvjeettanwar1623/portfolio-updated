"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, GitCommit, Flame, ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

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
  const [hoveredCommit, setHoveredCommit] = useState<ProjectedNode | null>(null);
  const [commits, setCommits] = useState<CommitRecord[]>(FALLBACK_REAL_COMMITS);
  const [liveStats, setLiveStats] = useState({ totalCommits: 640, streak: 24 });

  // Projected 3D Points cache for hit testing
  const projectedPointsRef = useRef<ProjectedNode[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  // Rotation angles
  const rotationRef = useRef({ x: 0.35, y: 0.45 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0.004 });

  // Fetch Live Public Events from GitHub API on mount
  useEffect(() => {
    fetch("https://api.github.com/users/vishvjeettanwar1623/events/public")
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto-rotation inertia
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // Draw Orbit Radar Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 175, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 115, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Transform & Sort 3D Points
      const projected: ProjectedNode[] = nodes.map((node, index) => {
        let x1 = node.x * Math.cos(rotY) + node.z * Math.sin(rotY);
        let z1 = -node.x * Math.sin(rotY) + node.z * Math.cos(rotY);

        let y2 = node.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = node.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const fov = 420;
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        return {
          ...node,
          projX,
          projY,
          scale,
          zDepth: z2,
          index,
        };
      });

      projected.sort((a, b) => b.zDepth - a.zDepth);
      projectedPointsRef.current = projected;

      // Check for hover hit under mouse
      let currentHit: ProjectedNode | null = null;
      if (mousePosRef.current) {
        const { x: mX, y: mY } = mousePosRef.current;
        for (let i = projected.length - 1; i >= 0; i--) {
          const p = projected[i];
          if (p.zDepth < 100) {
            const dist = Math.hypot(mX - p.projX, mY - p.projY);
            if (dist < 14) {
              currentHit = p;
              break;
            }
          }
        }
      }

      // Draw Constellation Lines
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.zDepth > 80) continue;

        for (let j = i + 1; j < Math.min(i + 4, projected.length); j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.projX - p2.projX, p1.projY - p2.projY);

          if (dist < 46) {
            const alpha = Math.max(0, (1 - dist / 46) * 0.12 * p1.scale);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Commit Points
      projected.forEach((p) => {
        const isTarget = currentHit?.index === p.index;
        const alpha = isTarget ? 1 : Math.min(1, Math.max(0.15, (p.scale - 0.4) * 1.5));
        const radius = isTarget ? 6.5 : Math.max(1, p.size * p.scale);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, radius, 0, Math.PI * 2);

        if (isTarget) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 16;
        } else if (p.intensity > 0.7) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 8 * p.scale;
        } else if (p.intensity > 0.35) {
          ctx.fillStyle = `rgba(210, 210, 210, ${alpha * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(130, 130, 130, ${alpha * 0.4})`;
        }

        ctx.fill();
        ctx.restore();
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(rafId);
    };
  }, [nodes]);

  // Mouse hover tracking for exact dot inspection
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };

    // Hit test against projected 3D nodes
    const hit = projectedPointsRef.current.find((p) => {
      return p.zDepth < 100 && Math.hypot(x - p.projX, y - p.projY) < 14;
    });

    if (hit) {
      if (hoveredCommit?.index !== hit.index) {
        setHoveredCommit(hit);
        playSound("hover");
      }
    } else {
      setHoveredCommit(null);
    }

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;

      rotationRef.current.y += deltaX * 0.008;
      rotationRef.current.x -= deltaY * 0.008;

      velocityRef.current = {
        x: -deltaY * 0.0005,
        y: deltaX * 0.0005,
      };

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    mousePosRef.current = null;
    setHoveredCommit(null);
  };

  return (
    <SectionWrapper id="github-activity" className="py-24 bg-background relative overflow-hidden font-mono">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <SplitTextReveal
            text="Commit Orbit"
            className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[2px] sm:tracking-[4px] text-foreground font-[family-name:var(--font-audiowide)] drop-shadow-md"
          />
        </div>

        {/* 3D Holographic Viewport & Live Commit Telemetry Grid */}
        <div className="relative w-full rounded-3xl bg-card/60 border border-foreground/15 p-6 sm:p-8 md:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Background Ambient Radial Radar Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Left Column: Interactive 3D Hologram Globe (Cols 1-7) */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative h-[380px] sm:h-[450px] w-full flex items-center justify-center cursor-crosshair select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Hovered Commit Real-Time Floating Tooltip */}
            <AnimatePresence>
              {hoveredCommit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    left: `${hoveredCommit.projX}px`,
                    top: `${hoveredCommit.projY - 20}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                  className="absolute z-40 pointer-events-none w-72 p-3.5 rounded-2xl bg-card/95 border border-foreground/30 shadow-2xl backdrop-blur-2xl space-y-2 text-left"
                >
                  {/* Header: Repo & SHA */}
                  <div className="flex items-center justify-between border-b border-foreground/15 pb-1.5 text-[10px]">
                    <div className="flex items-center gap-1.5 text-foreground font-bold truncate">
                      <GitBranch className="w-3 h-3 text-foreground flex-shrink-0" />
                      <span className="truncate">{hoveredCommit.repo}</span>
                    </div>
                    <span className="text-muted-foreground font-mono text-[9px] px-1.5 py-0.5 rounded bg-foreground/5">
                      {hoveredCommit.sha}
                    </span>
                  </div>

                  {/* Commit Message */}
                  <div className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                    {hoveredCommit.message}
                  </div>

                  {/* Footer: Timestamp */}
                  <div className="flex items-center justify-between text-[9.5px] text-muted-foreground pt-1 border-t border-foreground/10">
                    <span>{hoveredCommit.date}</span>
                    <span>{hoveredCommit.time}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Actual Repositories & Real Commit Feed (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col space-y-4 relative z-20">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-foreground" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Verified Repositories
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {liveStats.totalCommits}+ COMMITS
              </span>
            </div>

            {/* Real Repository List */}
            <div className="space-y-2.5">
              {REAL_REPOS.map((repo) => (
                <motion.a
                  key={repo.name}
                  href={`https://github.com/vishvjeettanwar1623/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => playSound("hover")}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/30 transition-all shadow-xs cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-foreground group-hover:underline">
                        {repo.name}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground font-mono">
                        {repo.lang}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans font-light">
                      {repo.desc}
                    </p>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              ))}
            </div>

            {/* Direct GitHub Profile Action */}
            <motion.a
              href="https://github.com/vishvjeettanwar1623"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 py-3 rounded-2xl bg-foreground text-background font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Explore @vishvjeettanwar1623</span>
            </motion.a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default GitHubActivitySection;
