"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import TrueFocus from "./TrueFocus";
import ButtonWithIcon from "./button-with-icon";
import ShinyText from "./ShinyText";
import SubtleParticleDust from "./SubtleParticleDust";
import { MagneticImage } from "./morphing-cursor";
import { LiquidEther } from "./LiquidEther";

import { useTheme } from "@/context/ThemeContext";

interface MascotHeroProps {
  name?: string;
  badge?: string;
  mascotSrc?: string;
  animationDelay?: number;
}

export function MascotHero({
  name = "Vishvjeet Singh Tanwar",
  badge = "Designer & Developer",
  mascotSrc = "/assets/Mascot Image.png?v=2",
  animationDelay = 0.2,
}: MascotHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Defer WebGL fluid canvas initialization until AFTER intro loading screen & curtain lift complete completely!
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCanvasReady(true);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  const surgenaFontClass = "font-surgena";
  const baseDelay = animationDelay > 0 ? animationDelay : 0;

  const mascotDelay = baseDelay;
  const nameDelay1 = baseDelay + 0.1;
  const nameDelay2 = baseDelay + 0.25;
  const nameDelay3 = baseDelay + 0.4;
  const roleDelay = baseDelay + 0.6;
  const buttonDelay = baseDelay + 0.85;

  const shinyTextColor = isDark ? "#666666" : "#777777";
  const shinyTextShine = isDark ? "#ffffff" : "#000000";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background transition-colors duration-400"
    >
      {/* Liquid Ether Interactive WebGL Fluid Background (Deferred until intro completes) */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-75">
        {isCanvasReady && (
          <LiquidEther
            colors={isDark ? ["#ffffff", "#888888", "#222222"] : ["#000000", "#666666", "#cccccc"]}
            mouseForce={25}
            cursorSize={120}
            isViscous={false}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2.0}
          />
        )}
      </div>

      {/* Ultra-subtle Particle Dust Background */}
      <SubtleParticleDust />

      {/* Radial Stage Spotlight Behind Mascot */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-0 transition-opacity duration-500",
          isDark
            ? "bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0)_65%)]"
            : "bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.05)_0%,rgba(255,255,255,0)_65%)]"
        )}
      />

      <div className="relative z-10 w-full h-screen flex flex-col items-center overflow-hidden pointer-events-none">
        {/* Central Mascot Standout */}
        <motion.div
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: mascotDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute bottom-0 z-20 w-auto h-[65vh] md:h-[75vh] aspect-[3/4] md:aspect-[4/5] pointer-events-none flex items-center justify-center"
        >
          <MagneticImage
            baseImageSrc={mascotSrc}
            hoverImageSrc="/assets/mascot image 2.png"
            alt="Mascot"
            lensSize={220}
            className="w-full h-full flex items-center justify-center pointer-events-auto"
            imageClassName="object-contain select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          />
        </motion.div>

        {/* Left Side: Large Staired Typography filling the left hero area */}
        <div className="absolute top-[32%] md:top-[34%] left-[3vw] md:left-[4vw] z-30 flex flex-col pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, x: "-60px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              delay: nameDelay1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ShinyText
              text="Vishvjeet"
              className={cn(
                "text-[11vw] md:text-[7.2vw] font-bold whitespace-nowrap tracking-tighter leading-[0.85] mb-2 md:mb-3 cursor-default pointer-events-auto drop-shadow-xl",
                surgenaFontClass
              )}
              speed={3}
              color={shinyTextColor}
              shineColor={shinyTextShine}
              spread={100}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: "-60px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              delay: nameDelay2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="ml-[5vw] md:ml-[6vw]"
          >
            <ShinyText
              text="Singh"
              className={cn(
                "text-[11vw] md:text-[7.2vw] font-bold whitespace-nowrap tracking-tighter leading-[0.85] mb-2 md:mb-3 cursor-default pointer-events-auto drop-shadow-xl",
                surgenaFontClass
              )}
              speed={3}
              color={shinyTextColor}
              shineColor={shinyTextShine}
              spread={100}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: "-60px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              delay: nameDelay3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="ml-[10vw] md:ml-[12vw]"
          >
            <ShinyText
              text="Tanwar"
              className={cn(
                "text-[11vw] md:text-[7.2vw] font-bold whitespace-nowrap tracking-tighter leading-[0.85] cursor-default pointer-events-auto drop-shadow-xl",
                surgenaFontClass
              )}
              speed={3}
              color={shinyTextColor}
              shineColor={shinyTextShine}
              spread={100}
            />
          </motion.div>
        </div>

        {/* Middle Right: Role (DESIGNER DEVELOPER) */}
        <div className="absolute top-[48%] right-[4vw] md:right-[6vw] z-30 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: roleDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto flex flex-col items-center justify-center"
          >
            <TrueFocus
              sentence="DESIGNER DEVELOPER"
              manualMode={false}
              blurAmount={3}
              borderColor={isDark ? "#ffffff" : "#000000"}
              glowColor="transparent"
              animationDuration={0.75}
              pauseBetweenAnimations={3.2}
            />
          </motion.div>
        </div>

        {/* Bottom Right: Action Button (EXPLORE WORKS) */}
        <div className="absolute bottom-[15%] right-[10vw] md:right-[15vw] z-30 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: buttonDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto"
          >
            <ButtonWithIcon
              label="EXPLORE WORKS"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
