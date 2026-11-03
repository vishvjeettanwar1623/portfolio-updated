"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { subscribePortfolioEvent } from "@/lib/events";
import { BoardingPassCard } from "./BoardingPassCard";

export function NFCContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    return subscribePortfolioEvent("open_contact_pass", () => {
      setIsOpen(true);
      setIsTorn(false);
      playSound("expand");
    });
  }, [playSound]);

  const triggerTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    playSound("switch");

    setTimeout(() => {
      setIsOpen(false);
      const target = document.getElementById("projects") || document.getElementById("experience");
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none font-mono overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isTorn) {
                setIsOpen(false);
                playSound("close");
              }
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-[88vw] max-w-[360px] sm:max-w-[390px] flex flex-col items-center"
          >
            {!isTorn && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  playSound("close");
                }}
                className="absolute -top-11 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <BoardingPassCard isTorn={isTorn} onTear={triggerTear} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default NFCContactModal;
