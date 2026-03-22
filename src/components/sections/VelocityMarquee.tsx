"use client";

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export function VelocityMarquee() {
  return (
    <section className="py-12 bg-background/50 border-y border-white/5 overflow-hidden">
      <VelocityScroll
        text="FRONTEND DEVELOPER • CREATIVE DESIGNER • tECH GEEK • STUDENT • "
        default_velocity={3}
        className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-foreground/20 uppercase"
      />
    </section>
  );
}
