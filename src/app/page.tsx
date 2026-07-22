"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LazyRender } from "@/components/ui/lazy-render";
import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import ClickSpark from "@/components/ui/ClickSpark";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { useTheme } from "@/context/ThemeContext";

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const DesignsSection = dynamic(
  () => import("@/components/sections/DesignsSection").then((mod) => mod.DesignsSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const AchievementsSection = dynamic(
  () => import("@/components/sections/AchievementsSection").then((mod) => mod.AchievementsSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection").then((mod) => mod.ExperienceSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const VelocityMarquee = dynamic(
  () => import("@/components/sections/VelocityMarquee").then((mod) => mod.VelocityMarquee),
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
      sparkColor={isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navbar />

        <HeroSection />
        <VelocityMarquee />

        <div className="relative w-full">
          <div className="relative pt-24 pb-48 z-10 pointer-events-auto">
            <LazyRender id="projects" height="120vh">
              <ProjectsSection />
            </LazyRender>

            <LazyRender height="150vh">
              <DesignsSection />
            </LazyRender>
          </div>
        </div>

        <LazyRender id="skills" height="100vh">
          <SkillsSection />
        </LazyRender>

        <LazyRender id="achievements" height="100vh">
          <AchievementsSection />
        </LazyRender>

        <LazyRender id="about" height="200vh">
          <AboutSection />
        </LazyRender>

        <LazyRender id="experience" height="200vh">
          <ExperienceSection />
        </LazyRender>

        <LazyRender id="contact" height="50vh">
          <Footer />
        </LazyRender>
      </main>
    </ClickSpark>
  );
}
