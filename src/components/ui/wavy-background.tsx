"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function WavyBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 w-full h-[150%] overflow-hidden pointer-events-none z-0", className)}>
      {}
      <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] shadow-[inset_0_40px_50px_rgba(0,0,0,0.8)]">
        
        {}
        {}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ x: "-50%", y: "calc(-100% + 150px)" }}
          className="absolute top-0 left-1/2 w-[6000px] h-[6000px] rounded-[45%] bg-background"
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ x: "-50%", y: "calc(-100% + 150px)" }}
          className="absolute top-0 left-1/2 w-[6000px] h-[6000px] rounded-[40%] bg-background/80"
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
          style={{ x: "-50%", y: "calc(-100% + 150px)" }}
          className="absolute top-0 left-1/2 w-[6000px] h-[6000px] rounded-[42.5%] bg-background/80"
        />
      </div>
    </div>
  );
}
