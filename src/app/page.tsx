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
import { NFCContactModal } from "@/components/ui/NFCContactModal";
import { SwarmMotionButton } from "@/components/ui/SwarmMotionButton";

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
