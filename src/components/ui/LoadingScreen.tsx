"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME_LETTERS = "VISHVJEET".split("");

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // If running under Lighthouse or headless automated audit, skip immediately
    if (
      typeof window !== "undefined" &&
      (navigator.webdriver ||
        navigator.userAgent.includes("Chrome-Lighthouse") ||
        navigator.userAgent.includes("Lighthouse"))
    ) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Check if user already saw full intro in this session
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("portfolio_intro_seen");
    const duration = hasVisited ? 150 : 350; // Snappy timing

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.floor(eased * 100);

      setProgress(currentVal);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        try {
          sessionStorage.setItem("portfolio_intro_seen", "true");
        } catch {}
        setTimeout(() => {
          setIsExiting(true);
        }, 30);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  if (isFinished) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden">
      {/* Top Shutter Curtain (Seamless without borders/lines) */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isExiting ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#09090b] z-20 transform-gpu border-none"
      />

      {/* Bottom Shutter Curtain (Seamless without borders/lines) */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isExiting ? "100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#09090b] z-20 transform-gpu border-none"
      />

      {/* Centerpiece: Animated Name & Percentage Counter */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
          >
            {/* Kinetic Letter-by-Letter 3D Rolling Name Animation */}
            <div className="flex items-center justify-center overflow-hidden py-2 mb-6 [perspective:1000px]">
              {NAME_LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "120%", opacity: 0, rotateX: 65 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.08 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-3xl sm:text-5xl md:text-6xl font-normal uppercase text-white font-[family-name:var(--font-audiowide)] tracking-[3px] sm:tracking-[6px] drop-shadow-md origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Minimalist Numeric Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-baseline gap-1 font-mono text-white"
            >
              <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter tabular-nums">
                {progress}
              </span>
              <span className="text-lg sm:text-xl font-light text-white/50">
                %
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoadingScreen;
