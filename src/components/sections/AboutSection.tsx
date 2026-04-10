"use client";

import BlurText from "@/components/ui/BlurText";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import dynamic from "next/dynamic";
import { FloatingPaths } from "@/components/ui/background-paths";

const InteractiveRobot = dynamic(() => import("@/components/3d/InteractiveRobot").then(mod => mod.InteractiveRobot), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin mb-4" />
       <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 animate-pulse">
         Awakening Core...
       </p>
    </div>
  )
});

export function AboutSection() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <SectionWrapper 
      id="about" 
      className="relative w-full py-0 md:py-0" 
      containerClassName="relative min-h-[120vh] w-full !max-w-none !px-0 flex items-center overflow-hidden"
      animate={false}
      noOverflow={true}
    >
      {}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 lg:px-20 gap-8 relative z-10">
        
        {}
        <div className="w-full md:w-[70%] flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <BlurText
            text="Hey I'm Vishvjeet Singh Tanwar. This is my journey from bits to GigaBytes."
            delay={200}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black/90 dark:text-white/90 leading-tight drop-shadow-sm"
          />
        </div>

        {}
        <div className="w-full md:w-[30%] h-[50vh] md:h-[80vh] relative z-20 pointer-events-auto">
          <InteractiveRobot />
        </div>
        
      </div>
    </SectionWrapper>
  );
}
