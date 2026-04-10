"use client";

import { SectionWrapper } from "@/components/sections/SectionWrapper";
import FlowingMenu from "@/components/ui/FlowingMenu";
import { Github } from "lucide-react";
import Image from "next/image";

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
      { title: "React.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> },
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
      { title: "GitHub Copilot", icon: <Github className="w-8 h-8 md:w-10 md:h-10 text-white" /> },
      { title: "Figma Make", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" /> },
      { title: "Antigravity", icon: <IconImg src="/assets/skills/antigravity.png" /> },
      { title: "Trae", icon: <IconImg src="/assets/skills/trae.png" /> },
      { title: "WebStorm", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg" /> },
    ]
  }
];

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="pb-12 bg-[#121212] relative overflow-hidden flex flex-col min-h-screen">
      
      {}
      <div className="relative z-10 w-full px-4 md:px-12 pt-16 pb-10 pointer-events-none flex-shrink-0">
        <div className="flex items-center gap-3 text-sm text-white/80 tracking-widest font-semibold uppercase pointer-events-auto w-fit">
          <span className="text-2xl mt-1 leading-none text-white/60">✻</span>
          <span>My Stack</span>
        </div>
      </div>
      
      {}
      <div className="relative z-10 w-full flex-grow" style={{ minHeight: '600px' }}>
        <FlowingMenu 
          categories={skillCategories}
          speed={40} 
          textColor="#ffffff"
          bgColor="transparent"
          marqueeBgColor="#ffffff" 
          marqueeTextColor="#0a0a0a"
          borderColor="rgba(255,255,255,0.05)"
          fontFamily="var(--font-wallpoet)"
        />
      </div>

    </SectionWrapper>
  );
}
