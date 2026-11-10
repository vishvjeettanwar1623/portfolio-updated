"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { MAINTENANCE_MODE } from '@/config/maintenance';

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] as const,
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] as const
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 0.8,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96] as const
    }
  }),
  floating: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.1,
      duration: 2,
      ease: "easeInOut" as const,
      repeat: Infinity
    }
  })
};

export function NotFound() {
  const isMaintenance = MAINTENANCE_MODE;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-20 px-4 bg-background text-foreground select-none">
      <div />

      <AnimatePresence mode="wait">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
            {["B", "O", "O", "M"].map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                animate={["visible", "floating"]}
                className="text-[90px] md:text-[180px] lg:text-[220px] font-black select-none tracking-tighter text-gunmetal dark:text-fog font-[family-name:var(--font-audiowide)]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="text-center w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 opacity-90 select-none text-foreground font-[family-name:var(--font-audiowide)]">
          {isMaintenance ? "Under Maintenance" : "Boo! Page missing!"}
        </h1>
        
        <p className="text-lg md:text-xl mb-10 text-foreground/60 select-none">
          {isMaintenance 
            ? "I'm currently upgrading the core systems. Come back soon for something epic!" 
            : "Whoops! This page must be a ghost - it's not here!"}
        </p>

        <div className="flex flex-col items-center gap-6">
          {!isMaintenance ? (
            <Link 
              href="/"
              className="inline-block bg-night-2 text-fog dark:bg-mist dark:text-night px-8 py-3.5 rounded-full text-sm font-mono font-semibold tracking-widest uppercase hover:opacity-90 transition-all select-none shadow-lg cursor-pointer"
            >
              Return Home
            </Link>
          ) : (
            <>
              <motion.a 
                href="https://www.linkedin.com/in/vishvjeet-tanwar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-fog/5 backdrop-blur-md border border-fog/10 rounded-full text-fog hover:bg-fog/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold tracking-wide">Connect on LinkedIn</span>
                <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </motion.a>
              <p className="text-fog/30 text-xs uppercase tracking-[0.3em] font-medium">Neural systems offline for calibration</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
