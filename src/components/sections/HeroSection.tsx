"use client";

import { MascotHero } from "@/components/ui/mascot-hero";
import { SITE_CONFIG } from "@/config/site";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <MascotHero
        name={SITE_CONFIG.name}
        badge={SITE_CONFIG.badge}
        avatarSrc="/assets/img.png"
        animationDelay={0}
      />
    </section>
  );
}

export default HeroSection;
