"use client";

import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { KineticParallax } from "@/components/ui/KineticParallax";

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
