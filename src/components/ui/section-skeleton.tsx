"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionSkeletonProps {
  type?: "projects" | "skills" | "experience" | "achievements" | "about" | "general";
  className?: string;
}

export function SectionSkeleton({ type = "general", className = "" }: SectionSkeletonProps) {
  const shimmerProps = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      repeat: Infinity,
      duration: 2.2,
      ease: "linear" as const,
    },
  };

  const shimmerClass =
    "bg-[linear-gradient(90deg,rgba(128,128,128,0.04)_0%,rgba(128,128,128,0.13)_50%,rgba(128,128,128,0.04)_100%)] bg-[length:200%_100%]";

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 md:px-8 py-20 sm:py-32 overflow-hidden select-none pointer-events-none ${className}`}>
      
      {/* 1. WORK PORTFOLIO SKELETON (1:1 Exact Match) */}
      {type === "projects" && (
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <div className="mb-14 text-center w-full flex flex-col items-center">
            <motion.div
              {...shimmerProps}
              className={`h-12 sm:h-16 w-72 sm:w-96 rounded-2xl ${shimmerClass}`}
            />
          </div>

          {/* Master Project Rows Table */}
          <div className="w-full border-t border-foreground/15 flex flex-col">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="w-full py-8 sm:py-10 px-4 sm:px-8 flex items-center justify-between border-b border-foreground/10"
              >
                {/* Left: Number + Title + Tagline */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <motion.div
                      {...shimmerProps}
                      className={`h-4 w-6 rounded ${shimmerClass}`}
                    />
                    <motion.div
                      {...shimmerProps}
                      className={`h-7 sm:h-8 w-44 sm:w-60 rounded-xl ${shimmerClass}`}
                    />
                  </div>
                  <motion.div
                    {...shimmerProps}
                    className={`h-4 w-52 sm:w-72 rounded-lg hidden sm:inline-block ${shimmerClass}`}
                  />
                </div>

                {/* Right: Category Badge + Circle Chevron */}
                <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 ml-4">
                  <motion.div
                    {...shimmerProps}
                    className={`h-7 w-28 rounded-full hidden md:inline-block ${shimmerClass}`}
                  />
                  <motion.div
                    {...shimmerProps}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/15 ${shimmerClass}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Explorer Bottom Card */}
          <div className="w-full mt-12 p-8 sm:p-10 rounded-3xl border border-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <motion.div
                {...shimmerProps}
                className={`w-12 h-12 rounded-2xl ${shimmerClass}`}
              />
              <div className="space-y-2">
                <motion.div
                  {...shimmerProps}
                  className={`h-5 w-48 rounded-lg ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-3.5 w-64 rounded-md ${shimmerClass}`}
                />
              </div>
            </div>
            <motion.div
              {...shimmerProps}
              className={`h-10 w-36 rounded-full ${shimmerClass}`}
            />
          </div>
        </div>
      )}

      {/* 2. MY JOURNEY / EXPERIENCE SKELETON (1:1 Exact Match) */}
      {type === "experience" && (
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="mb-14 text-center w-full flex flex-col items-center space-y-3">
            <motion.div
              {...shimmerProps}
              className={`h-12 sm:h-16 w-64 sm:w-80 rounded-2xl ${shimmerClass}`}
            />
            <motion.div
              {...shimmerProps}
              className={`h-4 w-48 sm:w-64 rounded-lg ${shimmerClass}`}
            />
          </div>

          {/* 3D Carousel Stage */}
          <div className="relative w-full max-w-5xl h-[580px] sm:h-[520px] rounded-3xl border border-foreground/20 bg-card/40 p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
            {/* Top Bar: Timeline Pill & Year Watermark */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-5">
              <div className="space-y-2.5">
                <motion.div
                  {...shimmerProps}
                  className={`h-6 w-52 rounded-full ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-8 sm:h-10 w-72 sm:w-96 rounded-xl ${shimmerClass}`}
                />
              </div>
              <motion.div
                {...shimmerProps}
                className={`h-14 w-24 rounded-2xl ${shimmerClass}`}
              />
            </div>

            {/* Main Content Grid: 7 cols Left (Bullets), 5 cols Right (Proof Card) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto">
              <div className="lg:col-span-7 space-y-4">
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-full rounded-md ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-4/5 rounded-md ${shimmerClass}`}
                />
                <div className="space-y-2.5 pt-2">
                  {[1, 2, 3].map((b) => (
                    <div
                      key={b}
                      className="p-3 rounded-xl border border-foreground/10 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <motion.div
                          {...shimmerProps}
                          className={`h-4 w-40 rounded ${shimmerClass}`}
                        />
                        <motion.div
                          {...shimmerProps}
                          className={`h-3 w-56 rounded ${shimmerClass}`}
                        />
                      </div>
                      <motion.div
                        {...shimmerProps}
                        className={`h-5 w-16 rounded-full ${shimmerClass}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <motion.div
                  {...shimmerProps}
                  className={`h-48 w-full rounded-2xl ${shimmerClass}`}
                />
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((t) => (
                    <motion.div
                      key={t}
                      {...shimmerProps}
                      className={`h-12 rounded-xl ${shimmerClass}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
              <motion.div
                {...shimmerProps}
                className={`h-4 w-28 rounded ${shimmerClass}`}
              />
              <div className="flex items-center gap-3">
                <motion.div
                  {...shimmerProps}
                  className={`w-10 h-10 rounded-full ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`w-10 h-10 rounded-full ${shimmerClass}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MY STACK / SKILLS SKELETON (1:1 Exact Match) */}
      {type === "skills" && (
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="mb-12 text-center w-full flex flex-col items-center space-y-3">
            <motion.div
              {...shimmerProps}
              className={`h-12 sm:h-16 w-56 sm:w-72 rounded-2xl ${shimmerClass}`}
            />
            <motion.div
              {...shimmerProps}
              className={`h-4 w-64 sm:w-80 rounded-lg ${shimmerClass}`}
            />
          </div>

          {/* Flowing Menu Track Rows */}
          <div className="w-full space-y-4">
            {["LANGUAGES", "FRONTEND", "BACKEND", "BLOCKCHAIN", "TOOLS", "AI & IDES"].map((cat) => (
              <div
                key={cat}
                className="w-full py-5 px-6 rounded-2xl border border-foreground/10 flex items-center justify-between gap-6"
              >
                <motion.div
                  {...shimmerProps}
                  className={`h-5 w-28 rounded-lg ${shimmerClass}`}
                />
                <div className="flex items-center gap-3 flex-1 justify-end overflow-hidden">
                  {[1, 2, 3, 4, 5].map((pill) => (
                    <div
                      key={pill}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-foreground/10 flex-shrink-0"
                    >
                      <motion.div
                        {...shimmerProps}
                        className={`w-5 h-5 rounded-md ${shimmerClass}`}
                      />
                      <motion.div
                        {...shimmerProps}
                        className={`h-4 w-16 rounded ${shimmerClass}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ACHIEVEMENTS SKELETON (1:1 Exact Match) */}
      {type === "achievements" && (
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="mb-14 text-center w-full flex flex-col items-center space-y-3">
            <motion.div
              {...shimmerProps}
              className={`h-12 sm:h-16 w-72 sm:w-96 rounded-2xl ${shimmerClass}`}
            />
            <motion.div
              {...shimmerProps}
              className={`h-4 w-60 sm:w-80 rounded-lg ${shimmerClass}`}
            />
          </div>

          {/* Kinetic Deck Shutter Accordion Skeleton */}
          <div className="flex gap-4 h-[480px] w-full items-stretch">
            {/* 1 Expanded Card */}
            <div className="flex-[5] rounded-3xl border border-foreground/20 p-8 flex flex-col justify-between bg-card/40">
              <div className="flex items-center justify-between">
                <motion.div
                  {...shimmerProps}
                  className={`h-6 w-28 rounded-full ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-12 rounded ${shimmerClass}`}
                />
              </div>
              <div className="space-y-3 my-auto">
                <motion.div
                  {...shimmerProps}
                  className={`h-8 w-64 rounded-xl ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-5 w-44 rounded-lg ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-full rounded-md ${shimmerClass}`}
                />
              </div>
              <motion.div
                {...shimmerProps}
                className={`h-10 w-36 rounded-full ${shimmerClass}`}
              />
            </div>

            {/* 6 Collapsed Shutter Bars */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-3xl border border-foreground/10 p-6 flex flex-col justify-between items-center bg-card/20 hidden md:flex"
              >
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-10 rounded-full ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-32 w-4 rounded-full ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-3 w-8 rounded ${shimmerClass}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ABOUT ME SKELETON (1:1 Exact Match) */}
      {(type === "about" || type === "general") && (
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="mb-14 text-center w-full flex flex-col items-center space-y-3">
            <motion.div
              {...shimmerProps}
              className={`h-12 sm:h-16 w-56 sm:w-72 rounded-2xl ${shimmerClass}`}
            />
            <motion.div
              {...shimmerProps}
              className={`h-4 w-48 sm:w-64 rounded-lg ${shimmerClass}`}
            />
          </div>

          {/* Grid Layout: Left Profile, Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            <div className="lg:col-span-5 p-8 rounded-3xl border border-foreground/15 flex flex-col items-center text-center space-y-4">
              <motion.div
                {...shimmerProps}
                className={`w-36 h-36 rounded-3xl ${shimmerClass}`}
              />
              <motion.div
                {...shimmerProps}
                className={`h-7 w-48 rounded-xl ${shimmerClass}`}
              />
              <motion.div
                {...shimmerProps}
                className={`h-4 w-36 rounded-lg ${shimmerClass}`}
              />
              <div className="flex gap-3 pt-2">
                {[1, 2, 3, 4].map((s) => (
                  <motion.div
                    key={s}
                    {...shimmerProps}
                    className={`w-10 h-10 rounded-xl ${shimmerClass}`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 rounded-3xl border border-foreground/15 space-y-6">
              <motion.div
                {...shimmerProps}
                className={`h-6 w-48 rounded-lg ${shimmerClass}`}
              />
              <div className="space-y-3">
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-full rounded-md ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-full rounded-md ${shimmerClass}`}
                />
                <motion.div
                  {...shimmerProps}
                  className={`h-4 w-3/4 rounded-md ${shimmerClass}`}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                {[1, 2, 3].map((stat) => (
                  <div key={stat} className="p-4 rounded-2xl border border-foreground/10 space-y-2">
                    <motion.div
                      {...shimmerProps}
                      className={`h-7 w-16 rounded-lg ${shimmerClass}`}
                    />
                    <motion.div
                      {...shimmerProps}
                      className={`h-3 w-20 rounded ${shimmerClass}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SectionSkeleton;
