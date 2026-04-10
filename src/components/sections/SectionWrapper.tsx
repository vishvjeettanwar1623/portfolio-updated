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
      <div className={cn("container mx-auto px-4 relative z-10", containerClassName)}>
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
      
      {}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
    </section>
  );
}
