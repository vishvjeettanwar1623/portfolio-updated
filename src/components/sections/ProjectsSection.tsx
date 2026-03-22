"use client";

import { HoverRevealCard } from "@/components/ui/hover-reveal-card";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const projects = [
  {
    name: "Data Roots",
    subtitle: "JavaScript • Solidity • Pinata",
    image: "./assets/Projects/data_roots.png",
    githubUrl: "https://github.com/vishvjeettanwar1623/Data-Roots",
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
    githubUrl: "https://github.com/vishvjeettanwar1623/prompIP",
    description: (
      <>
        <p className="mb-2">
          Promp IP is a AI Prompt Ownership & Licensing Marketplace powered by Story Protocol
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
    githubUrl: "https://github.com/vishvjeettanwar1623/Questfi-VietBuild",
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
    githubUrl: "https://github.com/vishvjeettanwar1623/ProfileAuditor",
    description: (
      <>
        <p className="mb-2">
         A application that verifies resume claims against online activity.
        </p>
        <p>
          This application matches your current skills mentioned in your resume with your online presences from GitHub and Leetcode. 
        </p>
      </>
    ),
  },
  {
    name: "PDF-Chatbot",
    subtitle: "Flutter • Dart • Firebase",
    image: "./assets/Projects/pdf-chatbot.png",
    githubUrl: "https://github.com/vishvjeettanwar1623/pdf-chatbot",
    description: (
      <>
        <p className="mb-2">
         This PDF chatbot not only interacts with you like a PDF teacher but also provides you PDF-specific questions and PDF-specific quizzes generated from that exact PDF. 
        </p>
        <p>
         Its architectures include using various APIs generation where the bearer tokens to match the user's resume and online presence and then rate them. 
        </p>
      </>
    ),
  },
  {
    name: "Playback Extension",
    subtitle: "JavaScript • HTML",
    image: "./assets/Projects/playback-extension.png",
    githubUrl: "https://github.com/vishvjeettanwar1623/playback_extension",
    description: (
      <>
        <p className="mb-2">
         This extension allows the user to go from 2x speed to 3x, 4x, and in between speed measurements also. 
        </p>
        <p>
         It uses simple HTML and JavaScript to create the process of increasing the YouTube speed. 
        </p>
      </>
    ),
  },  
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 md:px-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-left">Work Portfolio</h2>
          <p className="text-muted-foreground max-w-lg text-left text-lg">Not concepts, just things that exist and work..</p>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <HoverRevealCard
            key={index}
            number={String(index + 1).padStart(2, '0')}
            title={project.name}
            subtitle={project.subtitle}
            image={project.image}
            description={project.description}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-12 mb-4 flex justify-end">
        <LiquidMetalButton 
          label="View More on GitHub"
          onClick={() => window.open('https://github.com/vishvjeettanwar1623', '_blank')}
        />
      </div>
    </section>
  );
}
