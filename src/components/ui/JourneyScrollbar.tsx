"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { TOC_SECTIONS } from "@/config/sections";
import { scrollToSection } from "@/lib/scroll";

export function JourneyScrollbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { playSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 150) {
        setActiveSection("home");
        return;
      }

      if (scrollY + windowHeight >= documentHeight - 150) {
        setActiveSection("contact");
        return;
      }

      const sectionElements = TOC_SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((item) => item.el !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    playSound("click");
    scrollToSection(id);
  };

  return (
    <aside
      className="journey-scrollbar fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end select-none pointer-events-auto font-mono transition-opacity duration-300"
    >
      <div className="flex flex-col items-end space-y-3.5">
        {TOC_SECTIONS.map((section) => {
          const isActive = section.id === activeSection;
          const isHovered = section.id === hoveredSection;
          const isExpanded = isActive || isHovered;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSectionClick(section.id)}
              onMouseEnter={() => {
                setHoveredSection(section.id);
                playSound("hover");
              }}
              onMouseLeave={() => setHoveredSection(null)}
              className="group flex items-center justify-end gap-2.5 h-4 text-right cursor-pointer focus:outline-none"
            >
              {/* Section Name Label (Smooth unmasking for active/hovered items) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`text-[9.5px] sm:text-[10px] uppercase tracking-[2px] font-mono select-none ${
                      isActive
                        ? "text-foreground font-bold drop-shadow-sm"
                        : "text-muted-foreground font-medium opacity-85"
                    }`}
                  >
                    {section.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Minimalist Architectural Hairline Indicator Tick */}
              <motion.div
                animate={{
                  width: isActive ? 22 : isHovered ? 14 : 6,
                  opacity: isActive ? 1 : isHovered ? 0.75 : 0.2,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className={`h-[1.5px] rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-molten"
                    : "bg-foreground"
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default JourneyScrollbar;

