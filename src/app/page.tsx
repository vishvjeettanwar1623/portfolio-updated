"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LazyRender } from "@/components/ui/lazy-render";
import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import ClickSpark from "@/components/ui/ClickSpark";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { JourneyScrollbar } from "@/components/ui/JourneyScrollbar";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { useTheme } from "@/context/ThemeContext";
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection),
  { ssr: false, loading: () => <SectionSkeleton type="projects" /> }
);
const DesignsSection = dynamic(
  () => import("@/components/sections/DesignsSection").then((mod) => mod.DesignsSection),
  { ssr: false, loading: () => <SectionSkeleton type="projects" /> }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection),
  { ssr: false, loading: () => <SectionSkeleton type="skills" /> }
);
const AchievementsSection = dynamic(
  () => import("@/components/sections/AchievementsSection").then((mod) => mod.AchievementsSection),
  { ssr: false, loading: () => <SectionSkeleton type="achievements" /> }
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection),
  { ssr: false, loading: () => <SectionSkeleton type="about" /> }
);
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection").then((mod) => mod.ExperienceSection),
  { ssr: false, loading: () => <SectionSkeleton type="experience" /> }
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
        <JourneyScrollbar />
        <SoundToggle />
        <HeroSection />
        <VelocityMarquee />
        <div className="relative w-full">
          <div className="relative pt-24 pb-48 z-10 pointer-events-auto">
            <LazyRender id="projects" skeletonType="projects" height="120vh">
              <ProjectsSection />
            </LazyRender>
            <LazyRender height="150vh">
              <DesignsSection />
            </LazyRender>
          </div>
        </div>
        <LazyRender id="skills" skeletonType="skills" height="100vh">
          <SkillsSection />
        </LazyRender>
        <LazyRender id="achievements" skeletonType="achievements" height="100vh">
          <AchievementsSection />
        </LazyRender>
        {/* Animating Text Section (About) */}
        <LazyRender id="about" skeletonType="about" height="80vh">
          <AboutSection />
        </LazyRender>
        {/* My Journey (Experience Section) right below animating text and above Footer */}
        <LazyRender id="experience" skeletonType="experience" height="200vh">
          <ExperienceSection />
        </LazyRender>
        {/* Contact (Footer) */}
        <Footer />
      </main>
    </ClickSpark>
  );
}
