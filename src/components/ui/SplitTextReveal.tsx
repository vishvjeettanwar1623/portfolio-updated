"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  enableVelocitySkew?: boolean;
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0.1,
  as: Component = "h2",
  enableVelocitySkew = true,
}: SplitTextRevealProps) {
  const words = text.split(" ");

  // Scroll Velocity Skew Calculation
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 250,
  });

  const skewY = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    enableVelocitySkew ? [-2.5, 0, 2.5] : [0, 0, 0]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: "115%",
      rotateX: 45,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 220,
        damping: 24,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      style={{ skewY }}
      className="inline-block perspective-[1000px] will-change-transform"
    >
      <Component className={className}>
        <motion.span
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1 -my-1">
              <motion.span
                variants={wordVariants}
                className="inline-block transform-gpu will-change-transform"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Component>
    </motion.div>
  );
}

export default SplitTextReveal;

