"use client";

import { MascotHero } from "@/components/ui/mascot-hero";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <MascotHero
        name="Vishvjeet Tanwar"
        badge="Designer & Builder"
        mascotSrc="/assets/Mascot Image.png?v=2"
        animationDelay={0}
      />
    </section>
  );
}

export default HeroSection;
