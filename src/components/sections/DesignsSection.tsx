"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import GlareHover from "@/components/ui/GlareHover";

const designs = [
  {
    name: "404 Error Redesigned",
    tag: "UX/UI",
    image: "/assets/designs/Design-1.webp",
  },
  {
    name: "Animated & Cartonic Loading Screen",
    tag: "UX/UI",
    image: "/assets/designs/Design-2.webp",
  },
  {
    name: "Game View Page",
    tag: "UX/UI",
    image: "/assets/designs/Design-3.webp",
  },
];

export function DesignsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for 3D Deck Fan-Spread
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // 3D Deck Fan Transformations (Cards start stacked as a deck, then fan outward dynamically on scroll!)
  // Left Card: Slides from center deck out to left with 3D rotation
  const xLeft = useTransform(smoothProgress, [0, 1], ["120px", "0px"]);
  const rotateLeft = useTransform(smoothProgress, [0, 1], [-18, 0]);
  const rotateYLeft = useTransform(smoothProgress, [0, 1], [25, 0]);
  const opacityLeft = useTransform(smoothProgress, [0, 0.4, 1], [0.1, 0.8, 1]);

  // Center Card: Lifts forward out of the deck
  const yCenter = useTransform(smoothProgress, [0, 1], [60, -15]);
  const scaleCenter = useTransform(smoothProgress, [0, 1], [0.85, 1.05]);
  const opacityCenter = useTransform(smoothProgress, [0, 0.4, 1], [0.1, 0.9, 1]);

  // Right Card: Slides from center deck out to right with 3D rotation
  const xRight = useTransform(smoothProgress, [0, 1], ["-120px", "0px"]);
  const rotateRight = useTransform(smoothProgress, [0, 1], [18, 0]);
  const rotateYRight = useTransform(smoothProgress, [0, 1], [-25, 0]);
  const opacityRight = useTransform(smoothProgress, [0, 0.4, 1], [0.1, 0.8, 1]);

  const handleEnter = (index: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setHoveredIndex(index), 60);
  };

  const handleLeave = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setHoveredIndex(null), 80);
  };

  return (
    <SectionWrapper id="designs" className="overflow-visible">
      <div ref={sectionRef} className="relative w-full">
        {/* Centered Heading */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-4 text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] drop-shadow-sm"
          >
            UI Craft
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-700 dark:text-white/85 text-base md:text-lg"
          >
            Concept-driven designs shaped into usable interfaces.
          </motion.p>
        </div>

        <div className="pb-16" onMouseLeave={handleLeave}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 [perspective:1200px]">
            {/* Card 1 (Left Fan-Out) */}
            <motion.div
              onMouseEnter={() => handleEnter(0)}
              onMouseLeave={handleLeave}
              onClick={() => setHoveredIndex(hoveredIndex === 0 ? null : 0)}
              style={{
                zIndex: hoveredIndex === 0 ? 50 : 10,
                x: hoveredIndex === 0 ? 0 : xLeft,
                rotate: hoveredIndex === 0 ? 0 : rotateLeft,
                rotateY: hoveredIndex === 0 ? 0 : rotateYLeft,
                opacity: hoveredIndex !== null && hoveredIndex !== 0 ? 0.5 : opacityLeft,
                scale: hoveredIndex === 0 ? 1.5 : 1,
                filter: hoveredIndex !== null && hoveredIndex !== 0
                  ? "blur(3px) brightness(0.45)"
                  : "blur(0px) brightness(1)",
                willChange: "transform, filter, opacity",
              }}
              transition={{
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-full md:flex-1 cursor-pointer transform-gpu"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border transition-all duration-500 ease-out"
                style={{
                  aspectRatio: "16 / 10",
                  borderColor: hoveredIndex === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                  boxShadow: hoveredIndex === 0 ? "0 24px 64px rgba(0,0,0,0.55)" : "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <GlareHover
                  glareOpacity={0.4}
                  glareSize={200}
                  glareAngle={-45}
                  transitionDuration={600}
                  className="w-full h-full"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: hoveredIndex === 0 ? 1.06 : 1 }}
                    transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={designs[0].image}
                      alt={designs[0].name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: hoveredIndex === 0
                        ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)",
                    }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    animate={{
                      y: hoveredIndex === 0 ? 0 : 5,
                      opacity: hoveredIndex === 0 ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/95 mb-1 font-bold">
                      {designs[0].tag}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                      {designs[0].name}
                    </h3>
                  </motion.div>
                </GlareHover>
              </div>
            </motion.div>

            {/* Card 2 (Center Lifts Forward) */}
            <motion.div
              onMouseEnter={() => handleEnter(1)}
              onMouseLeave={handleLeave}
              onClick={() => setHoveredIndex(hoveredIndex === 1 ? null : 1)}
              style={{
                zIndex: hoveredIndex === 1 ? 50 : 20,
                y: hoveredIndex === 1 ? -18 : yCenter,
                scale: hoveredIndex === 1 ? 1.5 : scaleCenter,
                opacity: hoveredIndex !== null && hoveredIndex !== 1 ? 0.5 : opacityCenter,
                filter: hoveredIndex !== null && hoveredIndex !== 1
                  ? "blur(3px) brightness(0.45)"
                  : "blur(0px) brightness(1)",
                willChange: "transform, filter, opacity",
              }}
              transition={{
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-full md:flex-1 cursor-pointer transform-gpu"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border transition-all duration-500 ease-out"
                style={{
                  aspectRatio: "16 / 10",
                  borderColor: hoveredIndex === 1 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                  boxShadow: hoveredIndex === 1 ? "0 24px 64px rgba(0,0,0,0.55)" : "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <GlareHover
                  glareOpacity={0.4}
                  glareSize={200}
                  glareAngle={-45}
                  transitionDuration={600}
                  className="w-full h-full"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: hoveredIndex === 1 ? 1.06 : 1 }}
                    transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={designs[1].image}
                      alt={designs[1].name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: hoveredIndex === 1
                        ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)",
                    }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    animate={{
                      y: hoveredIndex === 1 ? 0 : 5,
                      opacity: hoveredIndex === 1 ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/95 mb-1 font-bold">
                      {designs[1].tag}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                      {designs[1].name}
                    </h3>
                  </motion.div>
                </GlareHover>
              </div>
            </motion.div>

            {/* Card 3 (Right Fan-Out) */}
            <motion.div
              onMouseEnter={() => handleEnter(2)}
              onMouseLeave={handleLeave}
              onClick={() => setHoveredIndex(hoveredIndex === 2 ? null : 2)}
              style={{
                zIndex: hoveredIndex === 2 ? 50 : 10,
                x: hoveredIndex === 2 ? 0 : xRight,
                rotate: hoveredIndex === 2 ? 0 : rotateRight,
                rotateY: hoveredIndex === 2 ? 0 : rotateYRight,
                opacity: hoveredIndex !== null && hoveredIndex !== 2 ? 0.5 : opacityRight,
                scale: hoveredIndex === 2 ? 1.5 : 1,
                filter: hoveredIndex !== null && hoveredIndex !== 2
                  ? "blur(3px) brightness(0.45)"
                  : "blur(0px) brightness(1)",
                willChange: "transform, filter, opacity",
              }}
              transition={{
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-full md:flex-1 cursor-pointer transform-gpu"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border transition-all duration-500 ease-out"
                style={{
                  aspectRatio: "16 / 10",
                  borderColor: hoveredIndex === 2 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                  boxShadow: hoveredIndex === 2 ? "0 24px 64px rgba(0,0,0,0.55)" : "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <GlareHover
                  glareOpacity={0.4}
                  glareSize={200}
                  glareAngle={-45}
                  transitionDuration={600}
                  className="w-full h-full"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: hoveredIndex === 2 ? 1.06 : 1 }}
                    transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={designs[2].image}
                      alt={designs[2].name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: hoveredIndex === 2
                        ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)",
                    }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    animate={{
                      y: hoveredIndex === 2 ? 0 : 5,
                      opacity: hoveredIndex === 2 ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/95 mb-1 font-bold">
                      {designs[2].tag}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                      {designs[2].name}
                    </h3>
                  </motion.div>
                </GlareHover>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
