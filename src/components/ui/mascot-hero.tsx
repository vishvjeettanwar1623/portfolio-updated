"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import TrueFocus from "./TrueFocus";
import ButtonWithIcon from "./button-with-icon";
import { MagneticImage } from "./morphing-cursor";
import { GlassRain } from "./GlassRain";
import { useTheme } from "@/context/ThemeContext";

interface MascotHeroProps {
  name?: string;
  badge?: string;
  mascotSrc?: string;
  animationDelay?: number;
}

export function MascotHero({
  name = "Vishvjeet Singh Tanwar",
  badge = "Full-stack & Web3 Developer",
  mascotSrc = "/assets/Mascot Image.png?v=2",
  animationDelay = 0.2,
}: MascotHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const baseDelay = animationDelay > 0 ? animationDelay : 0;

  const handleExploreClick = () => {
    const target = document.getElementById("projects");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background select-none"
    >
      {/* 1. ATMOSPHERIC BACKGROUND WITH SUBTLE GLASS LIGHT STREAKS */}
      <GlassRain className="opacity-70" />

      {/* Stage Radial Spotlight */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-0 transition-opacity duration-500",
          isDark
            ? "bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08)_0%,rgba(9,9,11,0.98)_70%)]"
            : "bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.04)_0%,rgba(255,255,255,0.98)_70%)]"
        )}
      />

      {/* 2. HERO MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full h-screen flex items-center justify-between px-6 sm:px-12 md:px-16 pointer-events-none overflow-hidden">
        
        {/* LEFT COLUMN: STAIR-STEPPED SURGENA TYPOGRAPHY */}
        <div className="z-30 flex flex-col justify-center pointer-events-none max-w-[45vw] text-left">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: baseDelay + 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "Surgena, sans-serif" }}
            className="text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] tracking-tighter leading-[0.85] text-[#8e8e93] dark:text-[#737373] drop-shadow-sm"
          >
            Vishvjeet
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: baseDelay + 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "Surgena, sans-serif" }}
            className="pl-[1.5vw] sm:pl-[2vw] text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] tracking-tighter leading-[0.85] text-[#8e8e93] dark:text-[#737373] drop-shadow-sm"
          >
            Singh
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: baseDelay + 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "Surgena, sans-serif" }}
            className="pl-[3vw] sm:pl-[4vw] text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] tracking-tighter leading-[0.85] text-[#8e8e93] dark:text-[#737373] drop-shadow-sm"
          >
            Tanwar
          </motion.div>
        </div>

        {/* CENTER COLUMN: 3D INTERACTIVE MASCOT WITH NATURAL BOTTOM FOOTING */}
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.4,
            delay: baseDelay + 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 h-[68vh] md:h-[80vh] aspect-[3/4] md:aspect-[4/5] pointer-events-auto flex items-end justify-center"
        >
          <MagneticImage
            baseImageSrc={mascotSrc}
            hoverImageSrc="/assets/mascot image 2.png"
            alt="Vishvjeet Tanwar Mascot"
            lensSize={240}
            className="w-full h-full flex items-end justify-center pointer-events-auto"
            imageClassName="object-contain select-none max-h-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* RIGHT COLUMN: TRUEFOCUS ON ROLE */}
        <div className="z-30 flex flex-col items-end text-right pointer-events-auto max-w-[42vw]">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: baseDelay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider uppercase font-mono"
          >
            <TrueFocus
              sentence="FULL-STACK WEB3"
              manualMode={false}
              blurAmount={4}
              borderColor={isDark ? "#ffffff" : "#000000"}
              glowColor={isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.25)"}
              animationDuration={0.7}
              pauseBetweenAnimations={1.6}
            />
          </motion.div>
        </div>

      </div>

      {/* 3. SIGNATURE BUTTON WITH ICON (SHIFTED 10px UP & 10px LEFT) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: baseDelay + 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[50px] sm:bottom-[58px] md:bottom-[74px] right-[50px] sm:right-[74px] md:right-[90px] lg:right-[106px] z-30 pointer-events-auto shadow-[0_6px_30px_rgba(255,255,255,0.2)] rounded-full"
      >
        <ButtonWithIcon
          label="EXPLORE WORKS"
          onClick={handleExploreClick}
        />
      </motion.div>
    </div>
  );
}

export default MascotHero;
