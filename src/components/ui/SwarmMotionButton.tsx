"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { isSwarmRunning, startSwarm, stopSwarm } from "@/lib/swarm";
import "./swarm.css";

type Props = { ready?: boolean }; // accepted for compatibility, not needed

/**
 * "Watch it build" control. Same look as the Sound toggle: vertical mono text in the bottom-right
 * corner, sitting just to its left. Click to let the swarm rebuild the page, click again to stop.
 */
export function SwarmMotionButton(_props: Props) {
  const { playSound } = useSound();
  const [running, setRunning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [note, setNote] = useState("");

  const run = useCallback(() => {
    if (isSwarmRunning()) return;
    let last = 0;
    const result = startSwarm({
      onExit: () => setRunning(false),
      sound: (kind) => {
        const now = performance.now();
        const gap = kind === "type" ? 140 : 90;
        if (kind !== "done" && now - last < gap) return;
        last = now;
        playSound(kind === "press" ? "click" : kind === "type" ? "hover" : "switch");
      },
    });
    if (result === "started") setRunning(true);
    else {
      setNote(
        result === "reduced"
          ? "Reduced motion is on, so the build animation is off."
          : "The build animation isn't available on this page."
      );
      window.setTimeout(() => setNote(""), 4000);
    }
  }, [playSound]);

  useEffect(() => {
    const onMenu = (e: Event) => setIsMenuOpen(Boolean((e as CustomEvent<{ isOpen: boolean }>).detail?.isOpen));
    window.addEventListener("portfolio_menu_toggle", onMenu);
    window.addEventListener("portfolio_swarm_start", run); // optional external trigger
    return () => {
      window.removeEventListener("portfolio_menu_toggle", onMenu);
      window.removeEventListener("portfolio_swarm_start", run);
    };
  }, [run]);

  useEffect(() => () => stopSwarm(), []);

  return (
    <>
      <motion.button
        type="button"
        data-sw-ignore
        onClick={() => (running ? stopSwarm() : run())}
        onMouseEnter={() => playSound("hover")}
        whileTap={{ scale: 0.94 }}
        animate={{
          opacity: isMenuOpen ? 0 : 1,
          y: isMenuOpen ? 15 : 0,
          pointerEvents: isMenuOpen ? "none" : "auto",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-pressed={running}
        title={running ? "Click to stop the build animation" : "Click to watch this page build itself"}
        aria-label={running ? "Stop the build animation" : "Watch this page build itself"}
        className="swarm-toggle-btn fixed bottom-8 right-12 sm:bottom-10 sm:right-[3.75rem] z-20 cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 font-mono text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase select-none [writing-mode:vertical-rl] rotate-180 bg-transparent border-none p-0 shadow-none outline-none"
      >
        <span className="text-muted-foreground/70 font-semibold tracking-widest whitespace-nowrap">BUILD</span>
        <div className="relative min-w-[36px] sm:min-w-[42px] min-h-[50px] sm:min-h-[56px] flex items-center justify-center">
          <span
            className={`font-black whitespace-nowrap select-none transition-colors ${
              running ? "text-foreground opacity-100" : "text-muted-foreground/45"
            }`}
          >
            {running ? "STOP" : "PLAY"}
          </span>
        </div>
      </motion.button>

      {note && (
        <div data-sw-ignore className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-3">
          <p
            role="status"
            className="border border-foreground/15 bg-background/85 px-4 py-3 font-mono text-xs text-foreground/80 backdrop-blur"
          >
            {note}
          </p>
        </div>
      )}
    </>
  );
}

export default SwarmMotionButton;