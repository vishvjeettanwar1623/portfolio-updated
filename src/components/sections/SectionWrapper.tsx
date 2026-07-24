"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  noOverflow?: boolean;
}

export function SectionWrapper({
  children,
  id,
  className,
  containerClassName,
  animate = true,
  noOverflow = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        !noOverflow && "overflow-hidden",
        className
      )}
    >
      <div className={cn("container mx-auto px-4 relative z-20", containerClassName)}>
        {animate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>

      {/* Soft Ambient Radial Background Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_75%)]" />
    </section>
  );
}
