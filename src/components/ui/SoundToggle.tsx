"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export function SoundToggle({ className = "" }: { className?: string }) {
  const { isSoundEnabled, toggleSound, playSound } = useSound();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen for Menu open/close to hide sound toggle
  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsMenuOpen(Boolean(customEvent.detail?.isOpen));
    };
    window.addEventListener("portfolio_menu_toggle", handleMenuToggle);
    return () => window.removeEventListener("portfolio_menu_toggle", handleMenuToggle);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => {
        toggleSound();
      }}
      onMouseEnter={() => {
        playSound("hover");
      }}
      whileTap={{ scale: 0.94 }}
      animate={{
        opacity: isMenuOpen ? 0 : 1,
        y: isMenuOpen ? 15 : 0,
        pointerEvents: isMenuOpen ? "none" : "auto",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      title={isSoundEnabled ? "Click to mute sound" : "Click to enable sound"}
      aria-label={isSoundEnabled ? "Click to mute sound" : "Click to enable sound"}
      className={`sound-toggle-btn fixed bottom-8 right-6 sm:bottom-10 sm:right-8 z-20 cursor-pointer flex items-center justify-center gap-3 sm:gap-4 font-mono text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase select-none [writing-mode:vertical-rl] rotate-180 bg-transparent border-none p-0 shadow-none outline-none ${className}`}
    >
      {/* Static SOUND Text */}
      <span className="text-muted-foreground/70 font-semibold tracking-widest">
        SOUND
      </span>

      {/* Snappy Sliding State for ON / OFF */}
      <div className="relative min-w-[36px] sm:min-w-[42px] h-6 flex items-center justify-center overflow-visible">
        <span
          className={`font-black whitespace-nowrap absolute select-none transition-colors ${
            isSoundEnabled
              ? "text-foreground opacity-100"
              : "text-muted-foreground/45"
          }`}
        >
          {isSoundEnabled ? "ON" : "OFF"}
        </span>
      </div>
    </motion.button>
  );
}

export default SoundToggle;

