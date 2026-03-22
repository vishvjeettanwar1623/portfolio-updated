"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <HeroGeometric 
        badge="Designer & Builder"
        title1="Vishvjeet Singh Tanwar"
        title2="Building things that excites me."
      />
      
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-32 pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.23, 0.86, 0.39, 0.96] as const }}
            className="flex flex-col items-center pointer-events-auto"
        >
            <ButtonWithIcon 
                label="Explore Works" 
                onClick={scrollToProjects}
            />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold"
      >
        <span>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
