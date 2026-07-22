"use client";

import { Trophy, Linkedin, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";

const achievements = [
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

  return (
    <SectionWrapper id="achievements" className="bg-background transition-colors duration-400 py-20 md:py-28 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Stable Centered Heading */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal uppercase tracking-[3px] md:tracking-[6px] mb-4 text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] flex items-center justify-center gap-4 drop-shadow-sm">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-neutral-900 dark:text-white" />
            Achievements
          </h2>
          <p className="text-neutral-700 dark:text-white/85 text-base md:text-lg font-light">
            Hover or tap across the kinetic deck to explore verified milestones.
          </p>
        </div>

        {/* Desktop Kinetic Deck Shutter Accordion */}
        <div className="hidden lg:flex gap-4 h-[520px] w-full items-stretch">
          {achievements.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-3xl overflow-hidden border transition-colors duration-700 cursor-pointer ${
                  isActive
                    ? "border-black/20 dark:border-white/40 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl"
                    : "border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-950/80 hover:border-black/25 dark:hover:border-white/25"
                }`}
              >
                {/* Background Image with Slow Smooth Lens Shutter Scale */}
                <motion.div
                  className="absolute inset-0 z-0"
                  animate={{
                    scale: isActive ? 1.05 : 1.2,
                    opacity: isActive ? 0.95 : 0.7,
                    filter: isActive ? "brightness(1) contrast(1.05)" : "brightness(0.9) contrast(1)",
                  }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>

                {/* Subtle Gradient Vignette Overlay for Crisp Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/45 to-white/10 dark:from-neutral-950/90 dark:via-neutral-950/45 dark:to-neutral-950/10 z-10" />

                {/* Collapsed Vertical Tag View */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-20 h-full flex flex-col justify-between p-6 items-center pointer-events-none"
                >
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-white/80 bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white/75 font-[family-name:var(--font-audiowide)] uppercase [writing-mode:vertical-rl] rotate-180 tracking-widest">
                    {item.title}
                  </span>
                  <span className="text-xs font-mono text-neutral-700 dark:text-white/40">{item.date}</span>
                </motion.div>

                {/* Expanded Active View with STRICT Hardcoded 480px Width (Zero text reflow or width shrinking) */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-30 p-8 md:p-10 flex flex-col justify-between overflow-hidden pointer-events-auto"
                >
                  {/* Strict Hardcoded 480px Layout Container (Immune to Parent Card Resizing) */}
                  <div className="w-[480px] min-w-[480px] h-full flex flex-col justify-between">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 dark:text-white/90 bg-black/5 dark:bg-white/10 border border-black/20 dark:border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                        {item.tag}
                      </span>
                      <span className="text-sm font-mono font-bold text-neutral-700 dark:text-white/80">
                        {item.date}
                      </span>
                    </div>

                    {/* Middle Title & Description */}
                    <div className="my-auto w-full">
                      <h4 className="text-xs font-mono tracking-[0.25em] text-neutral-600 dark:text-white/70 uppercase mb-2">
                        {item.subtitle}
                      </h4>
                      <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] uppercase tracking-tight leading-tight mb-4 drop-shadow-sm">
                        {item.title}
                      </h3>
                      <p className="text-neutral-800 dark:text-white/90 text-base md:text-lg leading-relaxed font-light">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Bottom Link Action Button */}
                    <div className="w-full">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-7 py-3.5 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl group/btn"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>Verify on LinkedIn</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Interactive Accordion Stack */}
        <div className="flex flex-col gap-4 lg:hidden">
          {achievements.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`rounded-3xl overflow-hidden border transition-all duration-500 ${
                  isActive
                    ? "border-black/20 dark:border-white/40 bg-white dark:bg-neutral-900 shadow-md"
                    : "border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80"
                }`}
              >
                <div className="p-5 flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)]">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-600 dark:text-white/50">{item.date}</span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="px-5 pb-6 pt-2 border-t border-black/10 dark:border-white/10 flex flex-col gap-4"
                    >
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-black/10 dark:border-white/15">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-white/80 font-light leading-relaxed">
                        {item.excerpt}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-full mt-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>Verify on LinkedIn</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
