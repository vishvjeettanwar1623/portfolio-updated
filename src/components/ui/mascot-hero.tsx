"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PixelBlast from "./PixelBlast";
import TrueFocus from "./TrueFocus";
import ButtonWithIcon from "./button-with-icon";
import ShinyText from "./ShinyText";

interface MascotHeroProps {
  name?: string;
  badge?: string;
  mascotSrc?: string;
  animationDelay?: number;
}

export function MascotHero({
  name = "Vishvjeet Tanwar",
  badge = "Designer & Developer",
  mascotSrc = "/assets/Mascot Image.png",
  animationDelay = 0.2,
}: MascotHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  
  const surgenaFontClass = "font-surgena";

  
  const baseDelay = animationDelay > 0 ? animationDelay : 0; 
  
  const mascotDelay = baseDelay;
  const nameDelay1 = baseDelay + 0.1;
  const nameDelay2 = baseDelay + 0.3;
  
  
  const roleDelay = baseDelay + 0.8;
  const buttonDelay = baseDelay + 1.2;

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      
      {}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#c7c4cf"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />
        </div>
      </motion.div>

      <div className="relative z-10 w-full h-screen flex flex-col items-center overflow-hidden pointer-events-none">
        
        {}
        <motion.div
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: mascotDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ scale: 2.0 }}
          className="absolute top-[130px] z-20 w-auto h-[100vh] aspect-[3/4] md:aspect-[4/5] pointer-events-none flex items-center justify-center"
        >
          <Image
            src={mascotSrc}
            alt="Mascot"
            fill
            sizes="(max-width: 768px) 150vw, 80vw"
            priority
            fetchPriority="high"
            draggable={false}
            className="object-contain select-none"
          />
        </motion.div>

        {}
        <div className="absolute bottom-[4%] left-0 z-30 flex flex-col pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: nameDelay1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ShinyText 
              text="Vishvjeet" 
              className={cn("text-[12vw] md:text-[8vw] font-bold whitespace-nowrap tracking-tighter leading-[0.8] mb-2 cursor-default pointer-events-auto", surgenaFontClass)}
              speed={3}
              color="#555555"
              shineColor="#ffffff"
              spread={100}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: nameDelay2, ease: [0.16, 1, 0.3, 1] }}
            className="ml-[10vw] md:ml-[15vw]"
          >
            <ShinyText 
              text="Tanwar" 
              className={cn("text-[12vw] md:text-[8vw] font-bold whitespace-nowrap tracking-tighter leading-[0.8] cursor-default pointer-events-auto", surgenaFontClass)}
              speed={3}
              color="#555555"
              shineColor="#ffffff"
              spread={100}
            />
          </motion.div>
        </div>

        {}
        <div className="absolute bottom-[12%] right-[10%] z-30 flex flex-col items-center">
          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: roleDelay, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <div className="flex flex-col items-center">
              <TrueFocus 
                sentence="DESIGNER DEVELOPER"
                manualMode={false}
                blurAmount={3}
                borderColor="#ffffff"
                glowColor="transparent"
                animationDuration={0.6}
                pauseBetweenAnimations={2.5}
              />
            </div>
          </motion.div>
          
          {}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: buttonDelay, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 pointer-events-auto"
          >
            <ButtonWithIcon 
              label="EXPLORE WORKS" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
