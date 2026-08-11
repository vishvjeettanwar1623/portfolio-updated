"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Matter from "matter-js";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";

interface GravityPillData {
  text: string;
  category: "tech" | "project" | "milestone";
  width: number;
  height: number;
}

const PILLS: GravityPillData[] = [
  { text: "Rust", category: "tech", width: 85, height: 42 },
  { text: "Solidity", category: "tech", width: 100, height: 42 },
  { text: "TypeScript", category: "tech", width: 125, height: 42 },
  { text: "Python", category: "tech", width: 95, height: 42 },
  { text: "Next.js 15", category: "tech", width: 110, height: 42 },
  { text: "React 19", category: "tech", width: 100, height: 42 },
  { text: "FastAPI", category: "tech", width: 95, height: 42 },
  { text: "Node.js", category: "tech", width: 95, height: 42 },
  { text: "Tailwind CSS", category: "tech", width: 130, height: 42 },
  { text: "Tauri Native", category: "tech", width: 125, height: 42 },
  { text: "IPFS Storage", category: "tech", width: 130, height: 42 },
  { text: "Smart Contracts", category: "tech", width: 155, height: 42 },
  { text: "Obsidian Graphs", category: "tech", width: 150, height: 42 },
  { text: "Docker", category: "tech", width: 90, height: 42 },
  
  { text: "Eternal Vault", category: "project", width: 140, height: 46 },
  { text: "QuestFi", category: "project", width: 100, height: 46 },
  { text: "Promp-IP", category: "project", width: 110, height: 46 },
  { text: "LagLine Desktop", category: "project", width: 160, height: 46 },
  { text: "Profile Auditor", category: "project", width: 150, height: 46 },
  { text: "PDF-Chatbot", category: "project", width: 135, height: 46 },
  { text: "EgoArena", category: "project", width: 115, height: 46 },
  { text: "Vaxis Memory", category: "project", width: 145, height: 46 },

  { text: "🏆 Monad Blitz Winner", category: "milestone", width: 195, height: 46 },
  { text: "⚡ ACPC AIR 30", category: "milestone", width: 145, height: 46 },
  { text: "✦ McKinsey Forward", category: "milestone", width: 180, height: 46 },
  { text: "☁ Google Champion", category: "milestone", width: 175, height: 46 },
  { text: "🥇 EduChain Winner", category: "milestone", width: 175, height: 46 },
];

export function GravitySandbox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { playSound } = useSound();
  const isDark = theme === "dark";

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<{ body: Matter.Body; data: GravityPillData }[]>([]);

  // Keyboard shortcut (ESC or G to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && (e.key === "Escape" || e.key.toLowerCase() === "g")) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Sound triggers
  useEffect(() => {
    if (isOpen) {
      playSound("expand");
    } else {
      playSound("close");
    }
  }, [isOpen, playSound]);

  useEffect(() => {
    if (!isOpen) return;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner, Composite } = Matter;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // 1. Initialize Engine & World
    const engine = Engine.create({
      gravity: { x: 0, y: 0.95, scale: 0.001 },
    });
    engineRef.current = engine;
    const world = engine.world;

    // 2. Boundaries (Walls & Floor)
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
      friction: 0.2,
      restitution: 0.5,
    };

    const wallThickness = 120;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width * 2, wallThickness, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);

    World.add(world, [ground, ceiling, leftWall, rightWall]);

    // 3. Create Physics Pills
    const bodies: { body: Matter.Body; data: GravityPillData }[] = [];

    PILLS.forEach((pill, idx) => {
      // Staggered horizontal drop distribution across top area
      const x = Math.random() * (width - 240) + 120;
      const y = -60 - idx * 45;
      const angle = (Math.random() - 0.5) * 0.6;

      const body = Bodies.rectangle(x, y, pill.width, pill.height, {
        chamfer: { radius: 18 },
        density: 0.002,
        friction: 0.15,
        frictionAir: 0.012,
        restitution: 0.62, // Bouncy & tactile
        angle: angle,
      });

      // Initial slight random angular velocity for natural tumble
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      bodies.push({ body, data: pill });
      World.add(world, body);
    });

    bodiesRef.current = bodies;

    // 4. Mouse Constraint for Grabbing & Flinging
    const mouse = Mouse.create(canvas);
    // Adjust mouse pixel ratio for retina screens
    mouse.pixelRatio = dpr;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    // 5. Start Physics Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 6. Custom Retina Render Loop
    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Each Pill
      bodies.forEach(({ body, data }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const w = data.width;
        const h = data.height;
        const radius = 16;

        // Pill Surface Fill & Border (Theme-aware Monochrome)
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, radius);

        if (isDark) {
          ctx.fillStyle = data.category === "milestone" ? "#1c1917" : "#141417";
          ctx.fill();
          ctx.strokeStyle = data.category === "milestone" ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.18)";
          ctx.lineWidth = data.category === "milestone" ? 1.5 : 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = data.category === "milestone" ? "#f4f4f5" : "#ffffff";
          ctx.fill();
          ctx.strokeStyle = data.category === "milestone" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)";
          ctx.lineWidth = data.category === "milestone" ? 1.5 : 1;
          ctx.stroke();
        }

        // Pill Typography
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${data.category === "milestone" ? "bold" : "600"} 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = isDark ? "#f4f4f5" : "#09090b";
        ctx.fillText(data.text, 0, 1);

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [isOpen, isDark]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-2xl overflow-hidden select-none"
        >
          {/* Physics 2D Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />

          {/* Top Floating Control Bar */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 sm:gap-4 p-2 px-4 sm:px-6 rounded-full bg-card/90 border border-foreground/20 backdrop-blur-xl shadow-2xl font-mono text-xs select-none"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground animate-ping inline-block" />
              <span className="font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                GRAVITY COLLAPSE
              </span>
            </div>

            <span className="text-muted-foreground/40 hidden sm:inline">|</span>

            <span className="text-muted-foreground hidden sm:inline text-[11px]">
              GRAB & FLING BADGES
            </span>

            <span className="text-muted-foreground/40">|</span>

            {/* Restore Universe Button */}
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-1.5 rounded-full bg-foreground text-background font-bold text-[11px] tracking-wider uppercase transition-transform cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span>RESTORE UNIVERSE</span>
              <span className="opacity-60 text-[9px] hidden sm:inline">[ESC]</span>
            </motion.button>
          </motion.div>

          {/* Bottom Helper Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center"
          >
            <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase opacity-70">
              PHYSICS SIMULATION BY MATTER.JS · TOSS ANYWHERE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GravitySandbox;
