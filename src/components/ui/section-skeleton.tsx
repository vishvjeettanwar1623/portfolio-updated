"use client";

import { motion } from "framer-motion";

export function SectionSkeleton() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-black/5 animate-pulse">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-24 h-24 border-2 border-white/10 rounded-full border-t-white/30 animate-spin"
      />
    </div>
  );
}
