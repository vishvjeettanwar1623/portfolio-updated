"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CHARS = ["v", "i", "s", "h", "v", "j", "e", "e", "t", ".", "m", "e"];

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isFlippedIn, setIsFlippedIn] = useState(false);
  const [isLifting, setIsLifting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 12 chars * 0.11s delay + 0.8s anim = ~2.2s
    const flipTimer = setTimeout(() => {
      setIsFlippedIn(true);
    }, 2200);

    return () => clearTimeout(flipTimer);
  }, []);

  useEffect(() => {
    if (isFlippedIn) {
      // Hold for 550ms so user appreciates completed title before curtain lifts
      const liftTimer = setTimeout(() => {
        setIsLifting(true);
      }, 550);
      return () => clearTimeout(liftTimer);
    }
  }, [isFlippedIn]);

  useEffect(() => {
    if (isLifting) {
      // 1.8s theatrical upward curtain lift
      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 1850);
      return () => clearTimeout(finishTimer);
    }
  }, [isLifting, onComplete]);

  if (isFinished) return null;

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: isLifting ? "-100%" : "0%" }}
      transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#000000] flex items-center justify-center pointer-events-none select-none overflow-hidden transform-gpu [will-change:transform]"
    >
      {/* 3D Block Turning Container */}
      <div className="relative z-10 flex items-center font-surgena font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tighter lowercase transform-gpu">
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 [perspective:1200px] transform-gpu">
          {CHARS.map((char, idx) => (
            <motion.div
              key={idx}
              initial={{
                rotateX: -180,
                opacity: 0,
                scale: 0.7,
                y: -30,
              }}
              animate={{
                rotateX: 0,
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: idx * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative inline-flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-2 rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/25 shadow-2xl transform-gpu [transform-style:preserve-3d] origin-center [will-change:transform,opacity]"
            >
              <span className="relative z-10 drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)]">
                {char === "." ? <span className="text-white/80">{char}</span> : char}
              </span>
              <div className="absolute inset-x-0 top-0 h-px bg-white/35 rounded-t-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
