"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface RainStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  glow: boolean;
}

export function GlassRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive deflection
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseActive = false;

    // Create rain streaks
    const streakCount = Math.min(80, Math.floor(width / 18));
    const streaks: RainStreak[] = [];

    const createStreak = (initialY = false): RainStreak => {
      return {
        x: Math.random() * width,
        y: initialY ? Math.random() * height : -Math.random() * 100 - 50,
        length: Math.random() * 40 + 25,
        speed: Math.random() * 3.5 + 2.5,
        opacity: Math.random() * 0.4 + 0.15,
        width: Math.random() < 0.2 ? 1.5 : 1,
        glow: Math.random() < 0.15,
      };
    };

    for (let i = 0; i < streakCount; i++) {
      streaks.push(createStreak(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const baseR = isDark ? 255 : 30;
      const baseG = isDark ? 255 : 30;
      const baseB = isDark ? 255 : 30;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];

        // Cursor deflection & proximity illumination
        let dx = s.x - mouseX;
        let dy = s.y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let deflectionX = 0;

        if (isMouseActive && dist < 140) {
          const force = (1 - dist / 140) * 8;
          deflectionX = (dx / dist) * force;
        }

        s.x += deflectionX;
        s.y += s.speed;

        // Draw falling glass rain streak with gradient trail
        const grad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y);
        grad.addColorStop(0, `rgba(${baseR}, ${baseG}, ${baseB}, 0)`);
        grad.addColorStop(
          0.8,
          `rgba(${baseR}, ${baseG}, ${baseB}, ${s.opacity * (s.glow ? 1.4 : 0.8)})`
        );
        grad.addColorStop(1, `rgba(${baseR}, ${baseG}, ${baseB}, ${s.opacity * 1.2})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.moveTo(s.x, s.y - s.length);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Delicate drop impact glint
        if (s.glow) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${s.opacity * 0.9})`;
          ctx.fill();
        }

        // Reset if reached bottom
        if (s.y - s.length > height) {
          streaks[i] = createStreak(false);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}

export default GlassRain;
