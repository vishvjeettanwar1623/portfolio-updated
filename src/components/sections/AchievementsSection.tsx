"use client";

import { Trophy, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const achievements = [
  {
    title: "Hackathon Winner",
    excerpt: "Won $100 in Monad Blitz V3 Hackathon",
    image: "/assets/achievements/monad.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2026",
    readTime: "$100",
    tags: ["Monad", "Hackathon"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_hackathon-web3-buildinginpublic-activity-7444239514056724480-TZVP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Google Data Analytics Certificate",
    excerpt: "Completed a comprehensive program in data analytics, covering data collection, cleaning, analysis, and visualization.",
    image: "/assets/achievements/data-analytics.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Certificate",
    tags: ["Google", "Data Analytics"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googleanalytics-dataanalytics-digitalmarketing-activity-7440993113424207872-Yvg_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Forward Learner Badge",
    excerpt: "Completed the program offered by McKinsey and Company named Forward Learning Program.",
    image: "/assets/achievements/forward.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Certificate",
    tags: ["McKinsey", "Forward"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_offline-sailing-for-a-while-for-the-past-activity-7408498174392229888-AD4J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Live Project on Blockchain",
    excerpt: "Integrated my project QuestFi on the main net of the U2U network.",
    image: "/assets/achievements/blockchain.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Project",
    tags: ["mainnet", "U2U"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Live Project on Blockchain",
    excerpt: "Integrated my project Data Roots on the main net of the U2U network.",
    image: "/assets/achievements/blockchain2.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Project",
    tags: ["Mainnet", "U2U"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Champion Ranking",
    excerpt: "Secured Champion Ranking in the Google Facilitator Program.",
    image: "/assets/achievements/google.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Recognition",
    tags: ["Google", "Facilitator"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googlearcade-cloud-gamifiedlearning-activity-7338863061321023489-KBMa?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "ACPC AlgoHour 3.0",
    excerpt: "Secured AIR 30 in the ACPC AlgoHour 3.0, organized by AMITY University, in coding questions.",
    image: "/assets/experience/algohour.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Recognition",
    tags: ["Award", "Coding"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_competitiveprogramming-coding-problemsolving-activity-7364514173751324672-9K6R?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Hackathon Winner",
    excerpt: "Won third place in the Delhi Regional Hackathon in Blockchain Competition.",
    image: "/assets/achievements/hackathon.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Award",
    tags: ["Hackathon", "Blockchain"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_hackathon-web3-educhain-activity-7308344042352746496-g1uL?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
];

export function AchievementsSection() {
  return (
    <div className="relative w-full overflow-hidden isolate bg-[#121212]">
      <SectionWrapper id="achievements" className="relative z-10 bg-transparent" noOverflow>
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-4 text-left text-white font-[family-name:var(--font-audiowide)] drop-shadow-[0_10px_50px_rgba(0,0,0,1)] flex items-center gap-4">
                <Trophy className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                Achievements
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Milestones and recognitions from my journey in the digital space.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ScrollStack useWindowScroll={true} itemDistance={50} baseScale={0.9} itemStackDistance={20} blurAmount={2}>
              {achievements.map((item, index) => (
                <ScrollStackItem key={index}>
                  <div className="scroll-stack-card-details">
                    <div className="flex flex-wrap gap-2 mb-3">
                       {item.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-[10px] uppercase tracking-widest font-bold rounded-full font-[family-name:var(--font-syne-mono)]">
                           {tag}
                         </span>
                       ))}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight font-[family-name:var(--font-tektur)] uppercase tracking-tight">{item.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed font-[family-name:var(--font-tactic-sans)] mt-2">{item.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-white/50 font-medium font-[family-name:var(--font-syne-mono)] uppercase tracking-wider">
                      <span>{item.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{item.readTime}</span>
                    </div>

                    <div className="mt-8">
                       <motion.a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl group transition-all duration-300 hover:bg-white/10"
                        whileHover="hover"
                        initial="initial"
                      >
                        {}
                        <motion.div 
                          className="absolute inset-0 bg-primary/20 rounded-xl -z-10"
                          variants={{
                            initial: { y: 0, opacity: 0 },
                            hover: { y: 5, opacity: 1 }
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                        
                        <Linkedin className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-125" />
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/90">
                          View on LinkedIn
                        </span>
                        <motion.span 
                          className="text-primary font-bold"
                          variants={{
                            initial: { x: 0, opacity: 0.7 },
                            hover: { x: 4, opacity: 1 }
                          }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    </div>
                  </div>
                  <div className="scroll-stack-card-image">
                    <img src={item.image} alt={item.title} draggable={false} />
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

