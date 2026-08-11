"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export function GravityToggle({
  onToggle,
  isActive,
  className = "",
}: {
  onToggle: () => void;
  isActive: boolean;
  className?: string;
}) {
  const { playSound } = useSound();

  return (
    <motion.button
      type="button"
      onClick={() => {
        onToggle();
      }}
      onMouseEnter={() => {
        playSound("hover");
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle Physics Gravity Mode (Key: G)"
      aria-label="Toggle Physics Gravity Mode"
      className={`fixed bottom-8 left-6 sm:bottom-10 sm:left-8 z-40 cursor-pointer flex items-center gap-2 font-mono text-xs select-none p-1.5 px-3 rounded-full bg-card/85 border border-foreground/15 backdrop-blur-xl shadow-md hover:border-foreground/40 transition-colors ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-foreground inline-block animate-pulse" />
      <span className="text-[10px] sm:text-[11px] font-bold text-foreground tracking-wider uppercase">
        GRAVITY
      </span>
      <span className="text-[9px] px-1.5 py-0.5 rounded bg-foreground/10 text-muted-foreground font-mono">
        [G]
      </span>
    </motion.button>
  );
}

export default GravityToggle;
