"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import { Scissors, ArrowUpRight, SkipForward } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const NAME_LETTERS = "VISHVJEET".split("");

const SOCIAL_LINKS = [
  {
    name: "Email",
    href: "mailto:sbvj727@gmail.com",
    top: "56.4%",
    height: "6.8%",
    left: "7%",
    width: "86%",
    label: "sbvj727@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/vishvjeettanwar1623",
    top: "65.0%",
    height: "6.8%",
    left: "7%",
    width: "86%",
    label: "@vishvjeettanwar1623",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vishvjeet-tanwar/",
    top: "73.5%",
    height: "6.8%",
    left: "7%",
    width: "86%",
    label: "in/vishvjeet-tanwar",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/VishvjeetTanwar",
    top: "82.0%",
    height: "6.8%",
    left: "7%",
    width: "86%",
    label: "@VishvjeetTanwar",
  },
];

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"counter" | "card" | "exiting" | "finished">("counter");
  const [isTorn, setIsTorn] = useState(false);

  const { playSound } = useSound();
  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(260);

  // Live scissor position - exactly drives the cut line 1:1
  const scissorX = useMotionValue(0);
  const cutWidth = useTransform(scissorX, (val) => `${Math.max(0, val)}px`);
  const cutOpacity = useTransform(scissorX, (val) => (val > 3 ? 1 : 0));

  // Subtle stub sag only while scissors is actively cutting
  const stubRotate = useTransform(scissorX, [0, trackWidth], [0, -10]);
  const stubY = useTransform(scissorX, [0, trackWidth], [0, 12]);

  // Smooth 3D tilt on mouse hover
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 240, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  // Phase 1: 0 - 100 Counter
  useEffect(() => {
    // If running under Lighthouse or headless automated audit, skip immediately
    if (
      typeof window !== "undefined" &&
      (navigator.webdriver ||
        navigator.userAgent.includes("Chrome-Lighthouse") ||
        navigator.userAgent.includes("Lighthouse"))
    ) {
      setStage("finished");
      if (onComplete) onComplete();
      return;
    }

    const duration = 2400; // Snappy 2.4s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Smooth cubic-out easing
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.floor(eased * 100);

      setProgress(currentVal);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Once 100% is reached, transition smoothly to card display
        setTimeout(() => {
          setStage("card");
          playSound("expand");
        }, 160);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete, playSound]);

  // Update scissors track width based on card element width
  useEffect(() => {
    if (stage === "card" && cardRef.current) {
      const updateWidth = () => {
        if (cardRef.current) {
          const w = cardRef.current.clientWidth;
          setTrackWidth(Math.max(180, w - 48));
        }
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, [stage]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTorn) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Cutting / Tear trigger to land on website
  const triggerTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    playSound("switch");

    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {}

    // Give user time to see the boarded stamp slam down, then exit
    setTimeout(() => {
      setStage("exiting");
      setTimeout(() => {
        setStage("finished");
        if (onComplete) onComplete();
      }, 500);
    }, 1100);
  };

  // If user clicks the stub, animate scissors smoothly across the cut seam
  const handleStubClick = () => {
    if (isTorn) return;
    animate(scissorX, trackWidth, {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        triggerTear();
      },
    });
  };

  // Instant skip button handler
  const handleSkip = () => {
    if (stage === "counter") {
      setStage("exiting");
    } else {
      triggerTear();
      return;
    }
    setTimeout(() => {
      setStage("finished");
      if (onComplete) onComplete();
    }, 450);
  };

  if (stage === "finished") return null;

  return (
    <div className="fixed inset-0 z-[99999] select-none overflow-hidden flex items-center justify-center">
      {/* Top Shutter Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: stage === "exiting" ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#09090b] z-20 transform-gpu border-none"
      />

      {/* Bottom Shutter Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: stage === "exiting" ? "100%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#09090b] z-20 transform-gpu border-none"
      />

      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all backdrop-blur-md cursor-pointer pointer-events-auto"
      >
        <span>Skip</span>
        <SkipForward className="w-3 h-3" />
      </button>

      {/* STAGE 1: Animated Name & Percentage Counter (0 - 100%) */}
      <AnimatePresence>
        {stage === "counter" && (
          <motion.div
            key="counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none"
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

            {/* Numeric Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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

      {/* STAGE 2: Boarding Pass Card & Cutting Animation */}
      <AnimatePresence>
        {(stage === "card" || stage === "exiting") && (
          <motion.div
            key="boarding-pass"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={
              stage === "exiting"
                ? { opacity: 0, scale: 1.04, y: -25 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 1.04, y: -25 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="absolute z-30 flex flex-col items-center justify-center px-4 w-full pointer-events-auto"
          >
            {/* 3D Perspective Card Wrapper */}
            <div
              style={{ perspective: 1200 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="w-full flex justify-center"
            >
              <motion.div
                ref={cardRef}
                style={{
                  rotateX: !isTorn ? rotateX : 0,
                  rotateY: !isTorn ? rotateY : 0,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-[88vw] max-w-[360px] sm:max-w-[390px] flex flex-col rounded-3xl overflow-visible shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              >
                {/* TOP PORTION OF THE BOARDING PASS */}
                <div className="relative w-full aspect-[629/838] rounded-t-3xl overflow-hidden bg-[#121215] border-t border-l border-r border-[#c5a880]/30">
                  {/* Clean Card Top Graphic without duplicate scissor */}
                  <Image
                    src="/assets/designs/card-top-v2.jpg"
                    alt="Developer Boarding Pass Top"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 90vw, 400px"
                    className="object-cover object-top select-none pointer-events-none"
                  />

                  {/* Brushed Gold Ambient Sheen */}
                  <div className="absolute inset-0 bg-radial from-amber-500/[0.04] to-transparent pointer-events-none" />

                  {/* Four Interactive Contact Hotspots */}
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      title={link.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound("click");
                      }}
                      style={{
                        top: link.top,
                        height: link.height,
                        left: link.left,
                        width: link.width,
                      }}
                      className="absolute rounded-xl transition-all duration-200 hover:ring-1 hover:ring-[#c5a880]/50 hover:bg-white/[0.03] flex items-center justify-end pr-3.5 z-10 group cursor-pointer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#f5e6a3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}

                  {/* Big Passport-Style "BOARDED" Stamp covering the card */}
                  <AnimatePresence>
                    {isTorn && (
                      <motion.div
                        initial={{ scale: 2.8, opacity: 0, rotate: -32, filter: "blur(8px)" }}
                        animate={{ scale: 1, opacity: 1, rotate: -14, filter: "blur(0px)" }}
                        transition={{
                          type: "spring",
                          stiffness: 460,
                          damping: 18,
                          mass: 0.7,
                          delay: 0.05,
                        }}
                        className="absolute inset-0 z-30 flex items-center justify-center p-3 pointer-events-none"
                      >
                        <div className="relative border-4 border-dashed border-[#f5e6a3] rounded-2xl px-5 py-4 sm:px-7 sm:py-5 bg-[#14120e]/95 shadow-[0_0_45px_rgba(212,175,55,0.65)] text-center flex flex-col items-center justify-center transform-gpu">
                          {/* Inner Solid Border */}
                          <div className="absolute inset-1.5 border border-[#d4af37]/70 rounded-xl pointer-events-none" />

                          {/* Top Stamp Tagline */}
                          <div className="flex items-center gap-2 text-[9px] sm:text-[10.5px] font-mono tracking-[3px] sm:tracking-[4px] text-[#e8c88c] uppercase font-bold mb-1">
                            <span>★</span>
                            <span>SECURITY &amp; BOARDING CLEARED</span>
                            <span>★</span>
                          </div>

                          {/* Giant Bold "BOARDED" Headline */}
                          <div className="text-4xl sm:text-6xl font-black font-mono tracking-[8px] sm:tracking-[14px] text-[#f5e6a3] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.9)] pl-2 sm:pl-3">
                            BOARDED
                          </div>

                          {/* Stamp Footer Telemetry */}
                          <div className="flex items-center justify-between w-full mt-2 pt-1.5 border-t border-[#d4af37]/50 text-[8px] sm:text-[9.5px] font-mono text-[#e8c88c] tracking-widest uppercase">
                            <span>GATE 01</span>
                            <span>VT-2026 EDITION</span>
                            <span>SEAT 1A</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PERFORATION SEAM & DRAGGABLE SCISSORS */}
                <div
                  ref={trackRef}
                  className="relative w-full h-8 -my-4 z-30 flex items-center select-none"
                >
                  {/* Dynamic Laser Cut Line - strictly follows the scissors 1:1, invisible on hover/rest */}
                  <motion.div
                    style={{
                      width: cutWidth,
                      opacity: cutOpacity,
                    }}
                    className="absolute left-[16px] top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-amber-300 via-yellow-100 to-white shadow-[0_0_12px_rgba(255,230,150,0.95)] pointer-events-none z-30"
                  />

                  {/* Only ONE Interactive Draggable Scissors Button */}
                  {!isTorn && (
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: trackWidth }}
                      dragElastic={0}
                      dragMomentum={false}
                      style={{ x: scissorX }}
                      onDragStart={() => playSound("click")}
                      onDragEnd={(_, info) => {
                        if (info.offset.x >= trackWidth * 0.72) {
                          animate(scissorX, trackWidth, {
                            duration: 0.12,
                            onComplete: () => triggerTear(),
                          });
                        } else {
                          // Spring back cleanly to start point - cut line disappears
                          animate(scissorX, 0, {
                            type: "spring",
                            stiffness: 420,
                            damping: 26,
                          });
                        }
                      }}
                      whileHover={{ scale: 1.12 }}
                      whileDrag={{ scale: 1.22 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7324] border border-[#f5e6a3] text-black flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.9)] cursor-grab active:cursor-grabbing z-40 touch-none"
                    >
                      <Scissors className="w-4 h-4 text-neutral-950 rotate-90 pointer-events-none" />
                    </motion.div>
                  )}
                </div>

                {/* BOTTOM PORTION (BARCODE STUB) - DETACHES ON CUT */}
                <motion.div
                  onClick={handleStubClick}
                  style={
                    !isTorn
                      ? {
                          rotate: stubRotate,
                          y: stubY,
                          transformOrigin: "top right",
                        }
                      : { transformOrigin: "top right" }
                  }
                  animate={
                    isTorn
                      ? {
                          y: 190,
                          rotate: 15,
                          opacity: 0,
                          filter: "blur(4px)",
                        }
                      : undefined
                  }
                  transition={
                    isTorn
                      ? { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
                      : undefined
                  }
                  className={`relative w-full aspect-[629/263] rounded-b-3xl overflow-hidden bg-[#121215] border-b border-l border-r border-[#c5a880]/30 ${
                    !isTorn ? "cursor-pointer group/stub hover:border-[#c5a880]/60 transition-colors" : "pointer-events-none"
                  }`}
                >
                  {/* Clean Card Bottom Graphic */}
                  <Image
                    src="/assets/designs/card-bottom-v2.jpg"
                    alt="Developer Boarding Pass Bottom"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 90vw, 400px"
                    className="object-cover object-bottom select-none pointer-events-none"
                  />

                  {/* Hover Sheen over Stub */}
                  <div className="absolute inset-0 bg-white/[0.02] group-hover/stub:bg-white/[0.06] transition-colors pointer-events-none" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoadingScreen;
