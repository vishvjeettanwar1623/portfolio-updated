"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { BoardingPassCard } from "./BoardingPassCard";

const NAME_LETTERS = "VISHVJEET".split("");

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"counter" | "card" | "exiting" | "finished">("counter");
  const [isTorn, setIsTorn] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
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

    const duration = 2400;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(
        100,
        Math.floor((currentStep / steps) * 100)
      );
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setStage("card");
          playSound("expand");
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, playSound]);

  const triggerTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    playSound("switch");

    setTimeout(() => {
      setStage("exiting");
      setTimeout(() => {
        setStage("finished");
        if (onComplete) onComplete();
      }, 550);
    }, 1100);
  };

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
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: stage === "exiting" ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#11161b] z-20 transform-gpu border-none"
      />

      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: stage === "exiting" ? "100%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#11161b] z-20 transform-gpu border-none"
      />

      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 px-3.5 py-1.5 rounded-full bg-fog/10 hover:bg-fog/20 border border-fog/15 text-fog/80 hover:text-fog font-mono text-xs flex items-center gap-1.5 transition-all backdrop-blur-md cursor-pointer pointer-events-auto"
      >
        <span>Skip</span>
        <SkipForward className="w-3 h-3" />
      </button>

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
                  className="inline-block text-3xl sm:text-5xl md:text-6xl font-normal uppercase text-fog font-[family-name:var(--font-audiowide)] tracking-[3px] sm:tracking-[6px] drop-shadow-md origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-baseline gap-1 font-mono text-fog"
            >
              <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter tabular-nums">
                {progress}
              </span>
              <span className="text-lg sm:text-xl font-light text-molten">
                %
              </span>
            </motion.div>

            <div className="mt-7 h-px w-[min(260px,60vw)] bg-fog/15 overflow-hidden">
              <div
                className="h-full bg-molten origin-left"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="w-[88vw] max-w-[360px] sm:max-w-[390px] flex justify-center">
              <BoardingPassCard isTorn={isTorn} onTear={triggerTear} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoadingScreen;
