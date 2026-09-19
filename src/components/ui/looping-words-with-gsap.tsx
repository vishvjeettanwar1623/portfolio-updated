"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LoopingWordsProps {
  words: string[];
  className?: string;
  fontFamily?: string;
}

export const LoopingWords: React.FC<LoopingWordsProps> = ({
  words = ["EXTRAORDINARY", "DECENTRALIZED", "IMMERSIVE", "FUTURE-PROOF", "IMPACTFUL", "CREATIVE"],
  className = "",
  fontFamily,
}) => {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [boxWidth, setBoxWidth] = useState<number | string>("auto");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    if (textRef.current) {
      setBoxWidth(textRef.current.offsetWidth + 20);
    }
  }, [index]);

  return (
    <div className={`inline-flex items-center justify-center relative flex-shrink-0 align-middle ${className}`}>
      <div
        className="relative inline-flex items-center justify-center h-10 sm:h-12 md:h-14 px-3.5 transition-all duration-300 ease-out"
        style={{ minWidth: typeof boxWidth === "number" ? `${boxWidth}px` : "auto" }}
      >
        {/* Dynamic HUD Corner Brackets */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neutral-900 dark:border-white pointer-events-none" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neutral-900 dark:border-white pointer-events-none" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neutral-900 dark:border-white pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neutral-900 dark:border-white pointer-events-none" />

        {/* Animated Single Word with Elastic Spring Entry */}
        <div className="overflow-hidden flex items-center justify-center py-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              ref={textRef}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                y: { type: "spring", stiffness: 280, damping: 20, mass: 0.8 },
                opacity: { duration: 0.25 },
              }}
              className="m-0 text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-black uppercase tracking-wider text-neutral-900 dark:text-white select-none whitespace-nowrap leading-none"
              style={{ fontFamily: fontFamily || "inherit" }}
            >
              {words[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoopingWords;





