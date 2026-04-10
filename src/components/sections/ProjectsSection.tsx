"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  {
    name: "Eternal",
    subtitle: "TypeScript • Solidity • JavaScript",
    image: "./assets/Projects/eternal.png",
    description: (
      <>
        <p className="mb-2">
          Eternal is a real-time, on-chain auto-battler where two players stake on-chain tokens, solve a live coding challenge in their browser, and have their code graded by AI.
        </p>
        <p>
          The resulting stats power an animated fighter that battles the opponent's fighter — all resolved on-chain.
        </p>
      </>
    ),
  },
  {
    name: "Data Roots",
    subtitle: "JavaScript • Solidity • Pinata",
    image: "./assets/Projects/data_roots.png",
    description: (
      <>
        <p className="mb-2">
          Data Roots is a blockchain application that allows users to store and share their data in a secure and decentralized manner.
        </p>
        <p>
          It uses IPFS for file storage and Solidity for smart contracts to ensure data security and transparency.
        </p>
      </>
    ),
  },
  {
    name: "Promp-IP",
    subtitle: "React • TypeScript • Solidity",
    image: "./assets/Projects/promp-ip.png",
    description: (
      <>
        <p className="mb-2">
          Promp IP is an AI Prompt Ownership &amp; Licensing Marketplace powered by Story Protocol.
        </p>
        <p>
          It uses Story Protocol for IP management and Solidity for smart contracts to ensure data security and transparency.
        </p>
      </>
    ),
  },
  {
    name: "Questfi",
    subtitle: "JavaScript • Solidity • React.js",
    image: "./assets/Projects/questfi.png",
    description: (
      <>
        <p className="mb-2">
          A modern bounty platform, enabling users to create, manage, and complete tasks with blockchain-based payments.
        </p>
        <p>
          It uses Solidity for smart contracts to ensure data security and transparency.
        </p>
      </>
    ),
  },
  {
    name: "Profile Auditor",
    subtitle: "Python • JavaScript • FastAPI",
    image: "./assets/Projects/profile-auditor.png",
    description: (
      <>
        <p className="mb-2">
          An application that verifies resume claims against online activity.
        </p>
        <p>
          Matches skills mentioned in your resume with your online presence from GitHub and Leetcode.
        </p>
      </>
    ),
  },
  {
    name: "PDF-Chatbot",
    subtitle: "Flutter • Dart • Firebase",
    image: "./assets/Projects/pdf-chatbot.png",
    description: (
      <>
        <p className="mb-2">
          This PDF chatbot interacts like a PDF teacher and provides PDF-specific questions and quizzes generated from that exact document.
        </p>
        <p>
          Built with Flutter and Firebase for a seamless cross-platform experience.
        </p>
      </>
    ),
  },
  {
    name: "Playback Extension",
    subtitle: "JavaScript • HTML",
    image: "./assets/Projects/playback-extension.png",
    description: (
      <>
        <p className="mb-2">
          This extension allows users to control YouTube playback speed beyond the default 2x — up to 3x, 4x, and in-between.
        </p>
        <p>
          Built with simple HTML and JavaScript for a lightweight, no-dependency experience.
        </p>
      </>
    ),
  },
];

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardSwapRef = useRef<any>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  const activeProject = projects[selectedIndex] || projects[0];

  return (
    <>
    <div ref={sectionRef}>
      <SectionWrapper id="projects" className="bg-transparent overflow-visible">

        {}
        <div className="mb-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-4 text-left text-white font-[family-name:var(--font-audiowide)] drop-shadow-[0_10px_50px_rgba(0,0,0,1)]">
            Work Portfolio
          </h2>
          <p className="text-white/85 max-w-lg text-left text-lg">Not concepts, just things that exist and work.</p>
        </div>

        {}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-center gap-0 w-full min-h-[520px]">

          {}
          <div className="w-full lg:w-2/5 flex flex-col items-center text-center justify-center relative z-10 pr-0 lg:pr-12 md:mt-24 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-[family-name:var(--font-syne-mono)] flex flex-col items-center"
              >
                <p className="text-white/85 text-xs uppercase tracking-widest mb-4 font-medium">
                  {activeProject.subtitle}
                </p>
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-5 text-white leading-tight">
                  {activeProject.name}
                </h3>
                <div className="text-white/95 space-y-3 leading-relaxed text-base lg:text-lg max-w-sm">
                  {activeProject.description}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {}
          <div className="w-full lg:w-3/5 relative flex items-center justify-center lg:justify-end h-[500px] lg:h-[600px] overflow-visible">
            <CardSwap
              ref={cardSwapRef}
              width={750}
              height={460}
              cardDistance={60}
              verticalDistance={60}
              delay={4000}
              pauseOnHover={false}
              isAutoPlayActive={isInView}
              skewAmount={4}
              onOrderChange={(frontIndex: number) => setSelectedIndex(frontIndex)}
            >
              {projects.map((p, i) => (
                <Card key={i}>
                  <img src={p.image} alt={p.name} />
                </Card>
              ))}
            </CardSwap>
          </div>

        </div>
      </SectionWrapper>
    </div>
    </>
  );
}
