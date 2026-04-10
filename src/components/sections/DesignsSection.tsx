"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

import GlareHover from "@/components/ui/GlareHover";

const designs = [
  {
    name: "404 Error Redesigned",
    tag: "UX/UI",
    image: "/assets/designs/Design-1.png",
  },
  {
    name: "Animated & Cartonic Loading Screen",
    tag: "UX/UI",
    image: "/assets/designs/Design-2.png",
  },
  {
    name: "Game View Page",
    tag: "UX/UI",
    image: "/assets/designs/Design-3.png",
  },
];

export function DesignsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      {}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-4 text-left text-white font-[family-name:var(--font-audiowide)] drop-shadow-[0_10px_50px_rgba(0,0,0,1)]">
          UI Craft
        </h2>
        <p className="text-white/95 max-w-lg text-left text-lg">
          Concept-driven designs shaped into usable interfaces.
        </p>
      </div>

      {}
      <div className="pb-16" onMouseLeave={handleLeave}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          {designs.map((design, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => handleEnter(index)}
                onMouseLeave={handleLeave}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                style={{ zIndex: isHovered ? 50 : 10 - index, willChange: "transform, filter, opacity" }}
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  rotate: isHovered ? 0 : 3,
                  y: isHovered ? -18 : -4,
                  filter: isDimmed
                    ? "blur(3px) brightness(0.45)"
                    : "blur(0px) brightness(1)",
                  opacity: isDimmed ? 0.5 : 1,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative w-full md:flex-1 cursor-pointer"
              >
                {}
                <motion.div
                  animate={{
                    boxShadow: isHovered
                      ? "0 24px 64px rgba(0,0,0,0.55)"
                      : "0 8px 24px rgba(0,0,0,0.2)",
                    borderColor: isHovered
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.08)",
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full overflow-hidden rounded-2xl border border-white/10"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <GlareHover
                    glareOpacity={0.4}
                    glareSize={200}
                    glareAngle={-45}
                    transitionDuration={600}
                    className="w-full h-full"
                  >
                    {}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: isHovered ? 1.06 : 1 }}
                      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Image
                        src={design.image}
                        alt={design.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </motion.div>

                    {}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: isHovered
                          ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)",
                      }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                    />

                    {}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      animate={{
                        y: isHovered ? 0 : 5,
                        opacity: isHovered ? 1 : 0.75,
                      }}
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/95 mb-1 font-bold">
                        {design.tag}
                      </p>
                      <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                        {design.name}
                      </h3>
                    </motion.div>
                  </GlareHover>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
