"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";

export function AboutSection() {
  return (
    <section id="about" className="relative h-[150vh] z-20">
      <TextRevealByWord 
          text="Hey, I'm Vishvjeet Singh Tanwar, a Developer , a Leaner and a Designer. I like learning things that are unique and innovative. I know my limits and I'm improving to overcome them everyday. I'm a quick learner and I'm always open to new challenges."
      />
    </section>
  );
}
