"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

      {/* Kinetic Morphing Sun / Moon SVG */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /* Sun Mode: Crisp SVG Sun with Radiating Rays & Solar Glow */
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5.5 h-5.5 text-amber-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.7)]"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </motion.div>
        ) : (
          /* Moon Mode: Crescent Silhouette with Twinkling Stars */
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-neutral-900 drop-shadow-sm"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.15" />
            </svg>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="absolute top-0 right-0 text-[9px] text-neutral-800 leading-none select-none font-bold"
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0.8], opacity: 0.8 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="absolute bottom-0 left-0 text-[7px] text-neutral-700 leading-none select-none"
            >
              ✦
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
