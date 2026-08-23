"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  maxRotation?: number; // degrees, default 8
  scaleOnHover?: number; // default 1.02
  className?: string;
  glareOpacity?: number; // default 0.12
}

export function TiltCard({
  children,
  maxRotation = 8,
  scaleOnHover = 1.02,
  glareOpacity = 0.12,
  className = "",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxRotation, maxRotation]);
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseRelativeX = (e.clientX - rect.left) / rect.width;
    const mouseRelativeY = (e.clientY - rect.top) / rect.height;

    x.set(mouseRelativeX);
    y.set(mouseRelativeY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative overflow-visible ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full h-full transform-gpu will-change-transform rounded-2xl"
      >
        {children}

        {/* Dynamic Specular Glare Reflection Layer */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(500px circle at ${gx} ${gy}, rgba(255, 255, 255, ${glareOpacity}), transparent 70%)`
            ),
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 z-30"
        />
      </motion.div>
    </div>
  );
}

export default TiltCard;
