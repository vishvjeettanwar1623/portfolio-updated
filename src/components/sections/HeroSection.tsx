"use client";

import { MascotHero } from "@/components/ui/mascot-hero";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <MascotHero
        name="Vishvjeet Singh Tanwar"
        badge="Designer & Builder"
        avatarSrc="/assets/img.png"
        animationDelay={0}
      />
    </section>
  );
}

export default HeroSection;
