"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] pointer-events-none"
    >
      {}
      
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: [0, 1, 1, 1, 1, 0],
              scale: [0.85, 1, 1, 1, 0.35, 0.35],
              y: [0, 0, 0, "calc(-50vh + 45.4px)", "calc(-50vh + 45.4px)", "calc(-50vh + 45.4px)"],
              x: [0, 0, 0, "-4.5px", "-4.5px", "-4.5px"]
            }}
            transition={{ 
              duration: 3.5,
              times: [0, 0.1, 0.4, 0.85, 0.94, 1.0],
              ease: ["easeOut", "linear", "easeInOut", "easeInOut", "easeIn"]
            }}
            className="flex flex-col items-center"
        >
            <span className="text-white text-4xl md:text-6xl font-bold tracking-tighter cursor-default select-none font-surgena">
              vishvjeet.me
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%", opacity: [1, 1, 1, 0, 0, 0] }}
              transition={{ 
                width: { duration: 1.2, delay: 0.4 },
                opacity: { duration: 3.5, times: [0, 0.4, 0.41, 1.0] }
              }}
              className="h-[1px] bg-white/30 mt-4"
            />
        </motion.div>
      </div>
    </motion.div>
  );
}
