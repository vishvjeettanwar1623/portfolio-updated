"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Award, Sparkles, GraduationCap, History } from "lucide-react";

export function ExperienceSection() {
  const items: TimelineItem[] = [
    {
      date: "2026-03-01",
      title: "2026 — Certifications & Competition Wins",
      description: "Data analytics mastery, competitive coding achievements, and hackathon prizes.",
      content: (
        <ul className="space-y-2 text-sm sm:text-base text-foreground/90 font-normal">
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Got Certified from Google in Data Analytics</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Qualified Google Big Code Qualifiers Round</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Scored 9.35 SGPA in my 3rd Semester</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Won $100 prize at Monad Blitz V3</span>
          </motion.li>
        </ul>
      ),
      images: [
        { src: "/assets/experience/google-data-analytics.jpg", alt: "Google Data Analytics Certificate" },
        { src: "/assets/experience/big-code.png", alt: "Big Code Qualifiers" },
        { src: "/assets/experience/3rd-sem.png", alt: "3rd Sem Result" },
        { src: "/assets/achievements/monad.jpg", alt: "Monad Blitz Winner" },
      ],
      icon: <Award className="h-4 w-4" />,
    },
    {
      date: "2025-06-01",
      title: "2025 — Programs, Hackathons & Internships",
      description: "Leadership programs, hackathon podium finishes, 3D modeling internship, and academic excellence.",
      content: (
        <ul className="space-y-2 text-sm sm:text-base text-foreground/90 font-normal">
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Completed the Forward Learning program from McKinsey & Company</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Completed Google Arcade with Champion Badge</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Secured AIR 30 ACPC AlgoHour 3.0</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Secured 3rd Position in EduChain Delhi Regional Hackathon</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Completed Internship in 3D Modelling with GauravGo Games</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Completed 3 Virtual Job Simulations from Deloitte</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Mentored in 2 Co-learning camps at HackQuest</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Scored 9.45 SGPA in my 2nd Semester</span>
          </motion.li>
        </ul>
      ),
      images: [
        { src: "/assets/experience/forward.jpg", alt: "McKinsey Forward Certificate" },
        { src: "/assets/experience/google-arcade.png", alt: "Google Arcade Champion" },
        { src: "/assets/experience/algohour.jpg", alt: "ACPC AlgoHour 3.0" },
        { src: "/assets/experience/internship.jpg", alt: "GauravGo Games Internship" },
      ],
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      date: "2024-09-01",
      title: "Late 2024 — Academic Start & Blockchain Foundations",
      description: "Beginning of computer science degree, Web3 advocacy, and foundational blockchain research.",
      content: (
        <ul className="space-y-2 text-sm sm:text-base text-foreground/90 font-normal">
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Started B.Tech journey at JSS University Noida</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Scored 9.29 SGPA in my 1st Semester</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Started learning about Blockchains & Web3</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 shadow-sm" />
            <span>Joined HackQuest as an Advocate</span>
          </motion.li>
        </ul>
      ),
      images: [
        { src: "/assets/experience/2nd-sem.png", alt: "1st/2nd Sem Result" },
        { src: "/assets/experience/hackquest.png", alt: "HackQuest Advocate" },
        { src: "/assets/experience/college.jpg", alt: "College ID" },
        { src: "/assets/experience/blockchain.png", alt: "Blockchain Certificate" },
      ],
      icon: <GraduationCap className="h-4 w-4" />,
    },
  ];

  return (
    <SectionWrapper id="experience" animate={false}>
      <div className="max-w-4xl mx-auto mb-14 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-4 text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] drop-shadow-sm inline-flex items-center gap-4 justify-center">
          <History className="w-8 h-8 md:w-10 md:h-10 text-neutral-900 dark:text-white" />
          My Journey
        </h2>
        <p className="text-neutral-700 dark:text-white/85 text-base md:text-lg max-w-lg mx-auto">
          Milestones, certifications, hackathons, and achievements across my journey.
        </p>
      </div>

      <Timeline
        items={items}
        initialCount={3}
        showMoreText="Load More Milestones"
        showLessText="Show Less"
        dotClassName="bg-white dark:bg-neutral-900 border border-black/20 dark:border-white/20"
        lineClassName="border-l border-black/15 dark:border-white/20"
      />
    </SectionWrapper>
  );
}
