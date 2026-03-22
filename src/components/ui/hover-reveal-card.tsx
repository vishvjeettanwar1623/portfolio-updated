"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HoverRevealCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  image: string;
  githubUrl?: string;
  className?: string;
}

export const HoverRevealCard = ({
  number,
  title,
  subtitle,
  description,
  image,
  githubUrl = "#",
  className,
}: HoverRevealCardProps) => {
  return (
    <div
      className={cn(
        "group relative w-full h-[320px] border-[6px] overflow-hidden cursor-pointer",
        className
      )}
      style={{
        borderImage:
          "linear-gradient(-50deg, #000000, #333333, #000000, #666666, #000000) 1",
      }}
    >
      {/* Back Content (revealed on hover) */}
      <div className="absolute inset-0 overflow-hidden flex flex-col">
        {/* Background image at 30% opacity with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            opacity: 0.3,
            filter: "blur(4px)",
            transform: "scale(1.05)", // prevents blurred edges from showing bleed
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="prose prose-base prose-invert max-w-none flex-1 text-sm md:text-base text-white/90 leading-relaxed font-medium">
            {description}
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg hover:bg-white/30 border border-white/30 transition-colors self-end"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Overlay (The Front) — pure CSS transition, no framer-motion */}
      <div
        className="absolute inset-0 z-10 flex bg-[#0a0a0a] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[100%]"
      >
        {/* Left Strip with Title */}
        <div className="flex flex-col justify-between w-[30%] h-full p-4 bg-black border-r border-white/10">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
              {title}
            </h3>
            <div className="w-12 h-1 bg-white/30" />
            <p className="text-[10px] text-white/50 italic uppercase tracking-[0.2em] font-medium">
              {subtitle}
            </p>
          </div>

          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
            Project / {number}
          </div>
        </div>

        {/* Main Image Strip */}
        <div
          className="relative flex-1 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Dots (Decoration) */}
        <div className="absolute bottom-4 right-8 flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-white border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-white border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-white border border-black/20" />
        </div>
      </div>
    </div>
  );
};
