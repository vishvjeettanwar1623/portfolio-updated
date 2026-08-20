"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface KineticParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower) to 0.2 (faster)
  direction?: "y" | "x" | "rotate" | "scale";
  range?: [number, number];
  className?: string;
}

export function KineticParallax({
  children,
  speed = 0.1,
  direction = "y",
  range = [-50 * speed, 50 * speed],
  className = "",
}: KineticParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const transformY = useTransform(smoothProgress, [0, 1], [-60 * speed, 60 * speed]);
  const transformX = useTransform(smoothProgress, [0, 1], [-40 * speed, 40 * speed]);
  const transformRotate = useTransform(smoothProgress, [0, 1], [-6 * speed, 6 * speed]);
  const transformScale = useTransform(smoothProgress, [0, 0.5, 1], [1 - 0.05 * speed, 1, 1 + 0.05 * speed]);

  const styleMap = {
    y: { y: transformY },
    x: { x: transformX },
    rotate: { rotate: transformRotate },
    scale: { scale: transformScale },
  };

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={styleMap[direction]} className="w-full h-full transform-gpu will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export default KineticParallax;
