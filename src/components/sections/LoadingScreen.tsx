"use client";

import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner-1";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size={40} />
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-medium"
        >
            Preparing Experience
        </motion.p>
      </div>
    </motion.div>
  );
}
