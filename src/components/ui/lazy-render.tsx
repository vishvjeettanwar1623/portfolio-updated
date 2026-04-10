"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LazyRender({ children, height = "100vh", id }: { children: React.ReactNode, height?: string, id?: string }) {
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
        rootMargin: "400px", 
        threshold: 0.01 
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
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        ) : (
          <div style={{ height }} className="w-full bg-black/2" />
        )}
      </AnimatePresence>
    </div>
  );
}
