"use client";

import { SectionWrapper } from "@/components/sections/SectionWrapper";
import FlowingMenu from "@/components/ui/FlowingMenu";
import { Github } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const IconImg = ({ src, invert }: { src: string; invert?: boolean }) => (
  <div className={`relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 ${invert ? 'dark:invert' : ''}`}>
    <Image src={src} alt="icon" fill sizes="40px" className="object-contain" loading="lazy" />
  </div>
);

const skillCategories = [
  {
    category: "LANGUAGES",
    items: [
      { title: "JavaScript", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" /> },
      { title: "TypeScript", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> },
      { title: "Python", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" /> },
      { title: "C", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" /> },
      { title: "C++", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" /> },
      { title: "Solidity", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg" /> },
    ]
  },
  {
    category: "FRONTEND",
    items: [
      { title: "HTML", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" /> },
      { title: "CSS", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" /> },
      { title: "Tailwind CSS", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" /> },
      { title: "React.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> },
      { title: "Next.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" invert={true} /> },
    ]
  },
  {
    category: "BACKEND",
    items: [
      { title: "Node.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" /> },
      { title: "Express.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" invert={true} /> },
      { title: "MongoDB", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" /> },
    ]
  },
  {
    category: "BLOCKCHAIN",
    items: [
      { title: "Smart Contracts", icon: <IconImg src="/assets/skills/smart-contract.png" /> },
      { title: "IPFS", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" /> },
      { title: "Gaia", icon: <IconImg src="/assets/skills/gaia.png" /> },
    ]
  },
  {
    category: "TOOLS",
    items: [
      { title: "Git", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" /> },
      { title: "GitHub", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" invert={true} /> },
      { title: "Linux", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" /> },
      { title: "Windows", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" /> },
      { title: "Figma", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" /> },
      { title: "Canva", icon: <IconImg src="/assets/skills/canva.png" /> },
    ]
  },
  {
    category: "AI & IDES",
    items: [
      { title: "ChatGPT", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" /> },
      { title: "Claude", icon: <IconImg src="/assets/skills/claude.png" /> },
      { title: "Gemini", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" /> },
      { title: "Cursor", icon: <IconImg src="/assets/skills/cursor image.png" /> },
      { title: "GitHub Copilot", icon: <Github className="w-8 h-8 md:w-10 md:h-10 text-foreground" /> },
      { title: "Figma Make", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" /> },
      { title: "Antigravity", icon: <IconImg src="/assets/skills/antigravity.png" /> },
      { title: "Trae", icon: <IconImg src="/assets/skills/trae.png" /> },
      { title: "WebStorm", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg" /> },
    ]
  }
];

export function SkillsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SectionWrapper id="skills" className="pb-12 bg-background relative overflow-hidden flex flex-col min-h-screen transition-colors duration-400">
      {/* Centered Heading */}
      <div className="relative z-10 w-full px-4 md:px-12 pt-16 pb-10 flex flex-col items-center justify-center text-center flex-shrink-0">
        <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-[2px] sm:tracking-[5px] mb-3 text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] drop-shadow-sm">
          My Stack
        </h2>
        <p className="text-neutral-700 dark:text-white/85 text-base md:text-lg max-w-md">
          technologies, frameworks, and tools I use
        </p>
      </div>
      
      <div className="relative z-10 w-full flex-grow" style={{ minHeight: '600px' }}>
        <FlowingMenu 
          categories={skillCategories}
          speed={40} 
          textColor={isDark ? "#ffffff" : "#09090b"}
          bgColor="transparent"
          marqueeBgColor={isDark ? "#ffffff" : "#09090b"} 
          marqueeTextColor={isDark ? "#0a0a0a" : "#ffffff"}
          borderColor={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
          fontFamily="var(--font-wallpoet)"
        />
      </div>
    </SectionWrapper>
  );
}
