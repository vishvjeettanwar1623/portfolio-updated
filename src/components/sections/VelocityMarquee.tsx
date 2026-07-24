"use client";

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export function VelocityMarquee() {
  return (
    <section className="relative py-12 bg-background transition-colors duration-400 overflow-hidden">
      {/* Seamless Top & Bottom Gradient Blend Overlay */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <VelocityScroll
        text="FRONTEND DEVELOPER • CREATIVE DESIGNER • TECH GEEK • STUDENT • BLOCKCHAIN DEVELOPER • WEB3 EXPLORER •"
        default_velocity={2.25}
        className="font-[family-name:var(--font-tektur)] text-4xl md:text-7xl font-bold tracking-tighter text-foreground/20 uppercase"
      />
    </section>
  );
}
