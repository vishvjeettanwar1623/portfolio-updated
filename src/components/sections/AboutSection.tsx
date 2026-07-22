"use client";

import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

export function AboutSection() {
  const lines = [
    "Hey I'm Vishvjeet Singh Tanwar.",
    "This is my journey",
    "from bits to GigaBytes.",
  ];

  return (
    <SectionWrapper
      id="about"
      className="relative w-full py-24 md:py-36 bg-background transition-colors duration-400"
      containerClassName="relative min-h-[40vh] w-full max-w-6xl mx-auto flex items-center justify-center px-4 md:px-12"
      animate={false}
      noOverflow={true}
    >
      {/* Soft Ambient Radial Blur Glow connecting section colors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_75%)] pointer-events-none z-0" />

      <div className="w-full flex flex-col items-center justify-center text-center z-20 overflow-hidden">
        <FlipFadeText
          words={lines}
          interval={4500}
          duration={0.6}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight drop-shadow-md font-surgena"
        />
      </div>
    </SectionWrapper>
  );
}
