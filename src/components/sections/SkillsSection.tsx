"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { 
  Code2, 
  Figma, 
  Terminal, 
  Layers, 
  Palette,
  FileCode,
  Code,
  Hexagon,
  Layout,
  FileLock,
  Network,
  Cloud,
  GitBranch,
  Github,
  Command,
  LayoutGrid,
  Image as ImageIcon,
  Bot,
  Sparkles,
  MessageSquare,
  MousePointer2,
  Wand2,
  Rocket,
  Monitor
} from "lucide-react";

const IconImg = ({ src, invert }: { src: string; invert?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="icon" className={`w-6 h-6 object-contain ${invert ? 'dark:invert' : ''}`} />
);

const skillCategories = [
  {
    category: "Programming Languages",
    items: [
      { title: "JavaScript", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />, color: "orange" as const },
      { title: "Python", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />, color: "blue" as const },
      { title: "C", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />, color: "purple" as const },
      { title: "C++", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />, color: "blue" as const },
      { title: "Solidity", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg" />, color: "red" as const },
    ]
  },
  {
    category: "Web Development",
    items: [
      { title: "HTML", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />, color: "orange" as const },
      { title: "CSS", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />, color: "blue" as const },
      { title: "React.js", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />, color: "blue" as const },
    ]
  },
  {
    category: "Blockchain Technology",
    items: [
      { title: "Smart Contracts", icon: <IconImg src="/assets/skills/smart-contract.png" />, color: "green" as const },
      { title: "IPFS", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" />, color: "green" as const },
      { title: "Gaia", icon: <IconImg src="/assets/skills/gaia.png" />, color: "blue" as const },
    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      { title: "Git", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />, color: "orange" as const },
      { title: "GitHub", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" invert={true} />, color: "purple" as const },
      { title: "Linux", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />, color: "orange" as const },
      { title: "Windows", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" />, color: "blue" as const },
      { title: "Figma", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />, color: "purple" as const },
      { title: "Canva", icon: <IconImg src="/assets/skills/canva.png" />, color: "blue" as const },
    ]
  },
  {
    category: "AI Tools & IDEs",
    items: [
      { title: "ChatGPT", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" />, color: "green" as const },
      { title: "Claude", icon: <IconImg src="/assets/skills/claude.png" />, color: "orange" as const },
      { title: "Gemini", icon: <IconImg src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" />, color: "purple" as const },
      { title: "Cursor", icon: <IconImg src="/assets/skills/cursor image.png" />, color: "purple" as const },
      { title: "GitHub Copilot", icon: <Github className="w-6 h-6 text-white" />, color: "purple" as const },
      { title: "Figma Make", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />, color: "purple" as const },
      { title: "Antigravity", icon: <IconImg src="/assets/skills/antigravity.png" />, color: "purple" as const },
      { title: "Trae", icon: <IconImg src="/assets/skills/trae.png" />, color: "blue" as const },
      { title: "WebStorm", icon: <IconImg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg" />, color: "blue" as const },
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center lg:justify-start gap-4">
          <Layers className="w-8 h-8 md:w-12 md:h-12 text-primary hidden lg:block" />
          Tools I Use
        </h2>
        <p className="text-muted-foreground max-w-lg text-center lg:text-left mx-auto lg:mx-0">
          The core technologies and methodologies I use to build my ideas.
        </p>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 space-y-16">
        {skillCategories.map((group, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">
            <h3 className="text-2xl font-semibold px-2 border-b border-white/10 pb-4 inline-block text-white">
              {group.category}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-6 justify-items-start">
              {group.items.map((skill, index) => (
                <GlowCard
                  key={index}
                  glowColor={skill.color}
                  customSize={true}
                  className="flex flex-row items-center justify-start gap-4 group p-4 w-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    {skill.icon}
                  </div>
                  <h4 className="text-sm md:text-base font-semibold tracking-wide text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    {skill.title}
                  </h4>
                </GlowCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
