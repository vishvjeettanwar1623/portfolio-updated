"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { DesignsSection } from "@/components/sections/DesignsSection";
import { VelocityMarquee } from "@/components/sections/VelocityMarquee";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CodingSection } from "@/components/sections/CodingSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingActionMenuContainer } from "@/components/sections/FloatingActionMenu";
import { LoadingScreen } from "@/components/sections/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on every refresh
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Lock scrolling while the loader is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      // Re-enable scrolling when loader disappears
      document.body.style.overflow = 'unset';
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Navbar />
      
      <HeroSection />
      <VelocityMarquee />
      <AboutSection />
      
      <ProjectsSection />
      <DesignsSection />

      <SkillsSection />
      
      <AchievementsSection />
      <CodingSection />

      <ExperienceSection />
      <Footer />
      <FloatingActionMenuContainer />
    </main>
  );
}
