"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

export function LazyRender({
  children,
  skeletonType = "general",
  height = "80vh",
  id,
}: {
  children: React.ReactNode;
  skeletonType?: "projects" | "skills" | "experience" | "achievements" | "about" | "general";
  height?: string;
  id?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "350px",
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} id={id} className="min-h-[1px]">
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            {children}
          </motion.div>
        ) : (
          <SectionSkeleton type={skeletonType} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default LazyRender;

