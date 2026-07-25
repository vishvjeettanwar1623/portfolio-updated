"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipFadeTextProps {
  words: string[];
  className?: string;
  duration?: number;
  interval?: number;
}

export function FlipFadeText({
  words,
  className,
  duration = 0.6,
  interval = 4500,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words || words.length === 0) return null;

  const currentText = words[index];
  const characters = Array.from(currentText);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      rotateX: 90,
      filter: "blur(4px)",
      transition: {
        duration: duration * 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative inline-block overflow-hidden py-2 select-none w-full text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex whitespace-nowrap justify-center items-center perspective-1000 transform-gpu w-full max-w-full overflow-hidden"
        >
          {characters.map((char, charIdx) => (
            <motion.span
              key={`${index}-${charIdx}`}
              variants={charVariants}
              className={cn(
                "inline-block transform-gpu origin-center whitespace-pre",
                className
              )}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
