"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LazyRender } from "@/components/ui/lazy-render";
import ClickSpark from "@/components/ui/ClickSpark";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { JourneyScrollbar } from "@/components/ui/JourneyScrollbar";
import { NFCContactModal } from "@/components/ui/NFCContactModal";
import { LiquidMorphFloatingMenu } from "@/components/ui/liquid-morph-floating-menu";
import { useTheme } from "@/context/ThemeContext";

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection),
  { ssr: false }
);
const DesignsSection = dynamic(
  () => import("@/components/sections/DesignsSection").then((mod) => mod.DesignsSection),
  { ssr: false }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection),
  { ssr: false }
);
const AchievementsSection = dynamic(
  () => import("@/components/sections/AchievementsSection").then((mod) => mod.AchievementsSection),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection").then((mod) => mod.ExperienceSection),
  { ssr: false }
);
const GitHubActivitySection = dynamic(
  () => import("@/components/sections/GitHubActivitySection").then((mod) => mod.GitHubActivitySection),
  { ssr: false }
);
const VelocityMarquee = dynamic(
  () => import("@/components/sections/VelocityMarquee").then((mod) => mod.VelocityMarquee),
  { ssr: false }
);
const FallingLeavesEffect = dynamic(
  () => import("@/components/ui/FallingLeavesEffect").then((mod) => mod.FallingLeavesEffect),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/sections/Footer").then((mod) => mod.Footer),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <ClickSpark
      sparkColor={isDark ? "#ff6a1a" : "#d9480f"}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main className="relative min-h-screen bg-background text-foreground selection:bg-molten/30">
        <FallingLeavesEffect />
        <Navbar />
        <LiquidMorphFloatingMenu />
        <JourneyScrollbar />
        <NFCContactModal />

        <HeroSection />
        <VelocityMarquee />

        <div className="relative w-full">
          <div className="relative pt-24 pb-48 z-10 pointer-events-auto">
            <LazyRender id="projects" skeletonType="projects">
              <ProjectsSection />
            </LazyRender>

            <LazyRender>
              <DesignsSection />
            </LazyRender>
          </div>
        </div>

        <LazyRender id="skills" skeletonType="skills">
          <SkillsSection />
        </LazyRender>

        <LazyRender id="achievements" skeletonType="achievements">
          <AchievementsSection />
        </LazyRender>

        <LazyRender id="about" skeletonType="about">
          <AboutSection />
        </LazyRender>

        <LazyRender id="experience" skeletonType="experience">
          <ExperienceSection />
        </LazyRender>

        <LazyRender id="github-activity">
          <GitHubActivitySection />
        </LazyRender>

        <Footer />
      </main>
    </ClickSpark>
  );
}
