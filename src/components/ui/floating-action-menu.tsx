"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingActionMenuProps = {
options: {
  label: string;
  onClick: () => void;
  Icon?: React.ReactNode;
}[];
className?: string;
};

const FloatingActionMenu = ({
options,
className,
}: FloatingActionMenuProps) => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};

return (
  <div className={cn("fixed bottom-8 right-8", className)}>
      <Button
        onClick={toggleMenu}
        className="w-14 h-14 rounded-full bg-foreground text-background hover:opacity-90 shadow-2xl transition-all flex items-center justify-center p-0 border border-white/20"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="flex items-center justify-center w-full h-full"
        >
          {isOpen ? <Plus className="w-7 h-7" /> : <MessageCircle className="w-7 h-7 scale-x-[-1]" />}
        </motion.div>
      </Button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="absolute bottom-16 flex flex-col items-center gap-3 mb-4 right-1"
        >
          {options.map((option, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="relative flex items-center group"
              >
                {}
                <span className="absolute right-full mr-3 whitespace-nowrap bg-foreground text-background text-xs px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl font-medium">
                  {option.label}
                </span>
                
                {}
                <Button
                  onClick={option.onClick}
                  size="icon"
                  className="w-12 h-12 rounded-full bg-foreground text-background hover:opacity-90 shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/10 flex items-center justify-center p-0 transition-all hover:scale-110 active:scale-95"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {option.Icon}
                  </div>
                </Button>
              </motion.div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default FloatingActionMenu;
