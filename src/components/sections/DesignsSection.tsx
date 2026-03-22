"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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

// Each card gets a unique tilt for visual interest
// Uniform rightward tilt for all cards
const CARD_TILT = { rotate: "3deg", translateY: "-4px" };

export function DesignsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="designs"
      className="py-24 bg-background relative overflow-visible flex flex-col"
    >
      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-left">
          UI Craft
        </h2>
        <p className="text-muted-foreground max-w-sm text-left">
          Concept-driven designs shaped into usable interfaces.
        </p>
      </div>

      {/* Cards row — horizontal, tilted, expand on hover */}
      <div
        className="container mx-auto px-4 md:px-8 pb-16"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex items-center justify-center gap-6 md:gap-10 relative">
          {designs.map((design, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={index}
                className="relative"
                style={{
                  // Default: small tilted card
                  // Hovered: expand, straighten, come forward
                  transform: isHovered
                    ? "rotate(0deg) translateY(-20px) scale(1.6)"
                    : `rotate(${CARD_TILT.rotate}) translateY(${CARD_TILT.translateY})`,
                  zIndex: isHovered ? 50 : 10 - index,
                  filter:
                    isAnyHovered && !isHovered
                      ? "blur(4px) brightness(0.5)"
                      : "blur(0px) brightness(1)",
                  opacity: isAnyHovered && !isHovered ? 0.5 : 1,
                  transition:
                    "transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease, opacity 0.4s ease, z-index 0s, max-width 0.5s cubic-bezier(0.22,1,0.36,1)",
                  flex: "1 1 0%",
                  maxWidth: isHovered ? "805px" : "460px",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Card */}
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl border cursor-pointer",
                    "shadow-lg hover:shadow-2xl",
                    isHovered
                      ? "border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                      : "border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
                  )}
                  style={{
                    aspectRatio: "16 / 10",
                    transition: "box-shadow 0.5s ease, border-color 0.4s ease",
                  }}
                >
                  {/* Image */}
                  <img
                    src={design.image}
                    alt={design.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isHovered
                        ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
                      transition: "background 0.4s ease",
                    }}
                  />

                  {/* Label at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      transform: isHovered
                        ? "translateY(0)"
                        : "translateY(4px)",
                      opacity: isHovered ? 1 : 0.85,
                      transition:
                        "transform 0.4s ease, opacity 0.4s ease",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                      {design.tag}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                      {design.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
