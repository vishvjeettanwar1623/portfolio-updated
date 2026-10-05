"use client";

import React, { useState } from "react";
import { Trophy, Linkedin, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import { useSound } from "@/context/SoundContext";

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  date: string;
  tag: string;
  url: string;
}

const achievements: AchievementItem[] = [
  {
    id: "01",
    title: "Hackathon Winner",
    subtitle: "Monad Blitz V3",
    excerpt: "Won $100 in Monad Blitz V3 Hackathon for real-time Web3 development.",
    image: "/assets/achievements/monad.jpg",
    date: "2026",
    tag: "Hackathon",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_hackathon-web3-buildinginpublic-activity-7444239514056724480-TZVP",
  },
  {
    id: "02",
    title: "Google Data Analytics",
    subtitle: "Professional Certificate",
    excerpt: "Completed comprehensive data analytics program covering data collection, SQL, R, and visualization.",
    image: "/assets/achievements/data-analytics.png",
    date: "2025",
    tag: "Google",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googleanalytics-dataanalytics-digitalmarketing-activity-7440993113424207872-Yvg_",
  },
  {
    id: "03",
    title: "Forward Learner",
    subtitle: "McKinsey & Company",
    excerpt: "Graduated from McKinsey's Forward Program focusing on strategic leadership and problem solving.",
    image: "/assets/achievements/forward.png",
    date: "2025",
    tag: "McKinsey",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_offline-sailing-for-a-while-for-the-past-activity-7408498174392229888-AD4J",
  },
  {
    id: "04",
    title: "QuestFi Mainnet",
    subtitle: "U2U Blockchain Network",
    excerpt: "Successfully deployed QuestFi bounty platform onto the U2U blockchain mainnet.",
    image: "/assets/achievements/blockchain.jpg",
    date: "2025",
    tag: "Mainnet",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6",
  },
  {
    id: "05",
    title: "Data Roots Mainnet",
    subtitle: "U2U Blockchain Network",
    excerpt: "Integrated Data Roots IPFS storage system onto the U2U mainnet.",
    image: "/assets/achievements/blockchain2.jpg",
    date: "2025",
    tag: "Mainnet",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6",
  },
  {
    id: "06",
    title: "Champion Ranking",
    subtitle: "Google Facilitator Program",
    excerpt: "Secured Champion Tier status in Google Arcade & Cloud Facilitator Program.",
    image: "/assets/achievements/google.png",
    date: "2025",
    tag: "Google",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googlearcade-cloud-gamifiedlearning-activity-7338863061321023489-KBMa",
  },
  {
    id: "07",
    title: "ACPC AlgoHour 3.0",
    subtitle: "AIR 30 Rank",
    excerpt: "Achieved All India Rank 30 in ACPC AlgoHour 3.0 competitive coding contest.",
    image: "/assets/experience/algohour.jpg",
    date: "2025",
    tag: "Competitive Coding",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_competitiveprogramming-coding-problemsolving-activity-7364514173751324672-9K6R",
  },
  {
    id: "08",
    title: "EduChain Hackathon",
    subtitle: "3rd Place Regional Winner",
    excerpt: "Secured 3rd Position in EduChain Delhi Regional Blockchain Hackathon.",
    image: "/assets/achievements/hackathon.jpg",
    date: "2025",
    tag: "Hackathon",
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_hackathon-web3-educhain-activity-7308344042352746496-g1uL",
  },
];

export function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playSound } = useSound();

  return (
    <SectionWrapper id="achievements" className="bg-background transition-colors duration-400 py-20 md:py-28 overflow-hidden font-mono">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Stable Centered Heading */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-neutral-900 dark:text-white flex-shrink-0" />
            <TextStaggerHover as="h2" className="text-4xl md:text-6xl font-normal uppercase tracking-[3px] md:tracking-[6px] text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] drop-shadow-sm">
              <TextStaggerHoverActive animation="top">
                Achievements
              </TextStaggerHoverActive>
              <TextStaggerHoverHidden animation="bottom">
                Achievements
              </TextStaggerHoverHidden>
            </TextStaggerHover>
          </div>
          <p className="text-neutral-700 dark:text-white/85 text-xs sm:text-sm font-light mt-3 uppercase tracking-wider font-mono">
            Key milestones, hackathons, and certifications.
          </p>
        </div>

        {/* Desktop Kinetic Deck Shutter Accordion */}
        <div className="hidden lg:flex gap-4 h-[520px] w-full items-stretch">
          {achievements.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  playSound("hover");
                }}
                onClick={() => setActiveIndex(index)}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{
                  duration: 0.85,
