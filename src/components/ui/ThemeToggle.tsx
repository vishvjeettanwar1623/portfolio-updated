"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const isDark = theme === "dark";
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound("theme");
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    toggleTheme(e);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.12, rotate: isDark ? 8 : -8 }}
      whileTap={{ scale: 0.88, rotate: isDark ? -15 : 15 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative group flex items-center justify-center w-11 h-11 rounded-full border pointer-events-auto select-none overflow-visible transition-colors duration-500 ${
        isDark
          ? "bg-neutral-900/90 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/40"
          : "bg-white/90 border-black/15 text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:border-black/30"
      } ${className}`}
    >
      {/* Dynamic Ambient Glow Pulse Behind Button */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 ${
          isDark
            ? "bg-gradient-to-r from-amber-300/30 to-amber-100/20"
            : "bg-gradient-to-r from-neutral-400/20 to-neutral-600/30"
        }`}
      />

      {/* Shockwave Burst Ring on Click */}
      <AnimatePresence>
        {clicked && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full border pointer-events-none ${
              isDark ? "border-amber-200/60" : "border-neutral-900/40"
            }`}
          />
        )}
      </AnimatePresence>

      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <motion.div
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 text-amber-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}

export default ThemeToggle;
