"use client";

import { SectionWrapper } from "@/components/sections/SectionWrapper";
import FlowingMenu from "@/components/ui/FlowingMenu";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import { Github } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { TECHNOLOGIES } from "@/config/technologies";

const IconImg = ({ src, invert }: { src: string; invert?: boolean }) => (
  <div className={`relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 ${invert ? 'dark:invert' : ''}`}>
    <Image src={src} alt="icon" fill sizes="40px" className="object-contain" loading="lazy" />
  </div>
);

const SKILL_CATEGORIES = [
  {
    category: "LANGUAGES",
    items: [
      { title: TECHNOLOGIES.JavaScript.name, icon: <IconImg src={TECHNOLOGIES.JavaScript.icon} /> },
      { title: TECHNOLOGIES.TypeScript.name, icon: <IconImg src={TECHNOLOGIES.TypeScript.icon} /> },
      { title: TECHNOLOGIES.Python.name, icon: <IconImg src={TECHNOLOGIES.Python.icon} /> },
      { title: TECHNOLOGIES.C.name, icon: <IconImg src={TECHNOLOGIES.C.icon} /> },
      { title: TECHNOLOGIES.CPP.name, icon: <IconImg src={TECHNOLOGIES.CPP.icon} /> },
      { title: TECHNOLOGIES.Solidity.name, icon: <IconImg src={TECHNOLOGIES.Solidity.icon} invert={TECHNOLOGIES.Solidity.invert} /> },
    ]
  },
  {
    category: "FRONTEND",
    items: [
      { title: TECHNOLOGIES.HTML.name, icon: <IconImg src={TECHNOLOGIES.HTML.icon} /> },
      { title: TECHNOLOGIES.CSS.name, icon: <IconImg src={TECHNOLOGIES.CSS.icon} /> },
      { title: TECHNOLOGIES.Tailwind.name, icon: <IconImg src={TECHNOLOGIES.Tailwind.icon} /> },
      { title: TECHNOLOGIES.React.name, icon: <IconImg src={TECHNOLOGIES.React.icon} /> },
      { title: TECHNOLOGIES.NextJS.name, icon: <IconImg src={TECHNOLOGIES.NextJS.icon} invert={TECHNOLOGIES.NextJS.invert} /> },
    ]
  },
  {
    category: "BACKEND",
    items: [
      { title: TECHNOLOGIES.NodeJS.name, icon: <IconImg src={TECHNOLOGIES.NodeJS.icon} /> },
      { title: TECHNOLOGIES.Express.name, icon: <IconImg src={TECHNOLOGIES.Express.icon} invert={TECHNOLOGIES.Express.invert} /> },
      { title: TECHNOLOGIES.MongoDB.name, icon: <IconImg src={TECHNOLOGIES.MongoDB.icon} /> },
    ]
  },
  {
    category: "BLOCKCHAIN",
    items: [
      { title: TECHNOLOGIES.SmartContracts.name, icon: <IconImg src={TECHNOLOGIES.SmartContracts.icon} /> },
      { title: TECHNOLOGIES.IPFS.name, icon: <IconImg src={TECHNOLOGIES.IPFS.icon} /> },
      { title: TECHNOLOGIES.Gaia.name, icon: <IconImg src={TECHNOLOGIES.Gaia.icon} /> },
    ]
  },
  {
    category: "TOOLS",
    items: [
      { title: TECHNOLOGIES.Git.name, icon: <IconImg src={TECHNOLOGIES.Git.icon} /> },
      { title: TECHNOLOGIES.GitHub.name, icon: <IconImg src={TECHNOLOGIES.GitHub.icon} invert={TECHNOLOGIES.GitHub.invert} /> },
      { title: TECHNOLOGIES.Linux.name, icon: <IconImg src={TECHNOLOGIES.Linux.icon} /> },
      { title: TECHNOLOGIES.Windows.name, icon: <IconImg src={TECHNOLOGIES.Windows.icon} /> },
      { title: TECHNOLOGIES.Figma.name, icon: <IconImg src={TECHNOLOGIES.Figma.icon} /> },
      { title: TECHNOLOGIES.Canva.name, icon: <IconImg src={TECHNOLOGIES.Canva.icon} /> },
    ]
  },
  {
    category: "AI & IDES",
    items: [
      { title: TECHNOLOGIES.ChatGPT.name, icon: <IconImg src={TECHNOLOGIES.ChatGPT.icon} /> },
      { title: TECHNOLOGIES.Claude.name, icon: <IconImg src={TECHNOLOGIES.Claude.icon} /> },
      { title: TECHNOLOGIES.Gemini.name, icon: <IconImg src={TECHNOLOGIES.Gemini.icon} /> },
      { title: TECHNOLOGIES.Cursor.name, icon: <IconImg src={TECHNOLOGIES.Cursor.icon} /> },
      { title: "GitHub Copilot", icon: <Github className="w-8 h-8 md:w-10 md:h-10 text-foreground" /> },
      { title: "Figma Make", icon: <IconImg src={TECHNOLOGIES.Figma.icon} /> },
      { title: TECHNOLOGIES.Antigravity.name, icon: <IconImg src={TECHNOLOGIES.Antigravity.icon} /> },
      { title: TECHNOLOGIES.Trae.name, icon: <IconImg src={TECHNOLOGIES.Trae.icon} /> },
      { title: TECHNOLOGIES.WebStorm.name, icon: <IconImg src={TECHNOLOGIES.WebStorm.icon} /> },
    ]
  }
];

export function SkillsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SectionWrapper id="skills" className="pb-12 bg-background relative overflow-hidden flex flex-col min-h-screen transition-colors duration-400">
      <div className="relative z-10 w-full px-4 md:px-12 pt-16 pb-10 flex flex-col items-center justify-center text-center flex-shrink-0">
        <TextStaggerHover as="h2" className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-3 text-night-2 dark:text-fog font-[family-name:var(--font-audiowide)] drop-shadow-sm">
          <TextStaggerHoverActive animation="top">
            My Stack
          </TextStaggerHoverActive>
          <TextStaggerHoverHidden animation="bottom">
            My Stack
          </TextStaggerHoverHidden>
        </TextStaggerHover>
        <p className="text-gunmetal dark:text-fog/85 text-base md:text-lg max-w-md">
          technologies, frameworks, and tools I use
        </p>
      </div>
      
      <div className="relative z-10 w-full flex-grow" style={{ minHeight: '600px' }}>
        <FlowingMenu 
          categories={SKILL_CATEGORIES}
          speed={40} 
          textColor={isDark ? "#cfd4d9" : "#11161b"}
          bgColor="transparent"
          marqueeBgColor={isDark ? "#cfd4d9" : "#11161b"} 
          marqueeTextColor={isDark ? "#11161b" : "#cfd4d9"}
          borderColor={isDark ? "rgba(207, 212, 217,0.08)" : "rgba(0,0,0,0.08)"}
          fontFamily="var(--font-wallpoet)"
        />
      </div>
    </SectionWrapper>
  );
}
