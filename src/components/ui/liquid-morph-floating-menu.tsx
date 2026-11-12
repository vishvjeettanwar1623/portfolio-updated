"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { useSeason } from "@/context/SeasonContext";
import { useWeatherGlass } from "@/context/WeatherGlassContext";
import { useTheme } from "@/context/ThemeContext";
import { subscribePortfolioEvent } from "@/lib/events";
import { isSwarmRunning, startSwarm, stopSwarm } from "@/lib/swarm";
import "./swarm.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function LiquidMorphFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuNavOpen, setIsMenuNavOpen] = useState(false);
  const [isSwarmActive, setIsSwarmActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // App context integrations
  const { isSoundEnabled, toggleSound, playSound } = useSound();
  const { season, setSeason } = useSeason();
  const { effect: cardEffect, setEffect: setCardEffect } = useWeatherGlass();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === "dark";

  useEffect(() => {
    return subscribePortfolioEvent("portfolio_menu_toggle", (detail) => {
      const navOpen = Boolean(detail?.isOpen);
      setIsMenuNavOpen(navOpen);
      if (navOpen) setIsOpen(false);
    });
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Swarm Build Action handler
  const handleToggleBuild = () => {
    playSound("click");
    if (isSwarmRunning()) {
      stopSwarm();
      setIsSwarmActive(false);
    } else {
      const res = startSwarm({
        onExit: () => setIsSwarmActive(false),
        sound: (kind) => {
          playSound(
            kind === "press" ? "click" : kind === "type" ? "hover" : "switch"
          );
        },
      });
      if (res === "started") {
        setIsSwarmActive(true);
        setIsOpen(false);
      }
    }
  };

  const labelColor = isDark ? "text-[#f6f1e7]" : "text-[#181d22]";

  const activeBtnClass = isDark
    ? "features-btn-active bg-[#f6f1e7] text-[#11161b] font-bold border-[#f6f1e7] shadow-sm"
    : "features-btn-active bg-[#181d22] text-[#fffefb] font-bold border-[#181d22] shadow-sm";

  const inactiveBtnClass = isDark
    ? "features-btn-inactive bg-[#1b2229] text-[#f6f1e7] font-semibold border-[#3a444e]"
    : "features-btn-inactive bg-[#ede6d8] text-[#181d22] font-semibold border-[#232930]";

  const textColor = isDark ? "#f6f1e7" : "#181d22";
  const pillBg = isDark ? "#11161b" : "#fffefb";
  const pillBorder = isDark
    ? (isOpen ? "#4a5563" : "#3a444e")
    : (isOpen ? "#181d22" : "#232930");
  const liquidCircleBg = isDark ? "#182026" : "#ede6d8";

  return (
    <motion.div
      ref={containerRef}
      className="floating-features-menu fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 select-none font-mono"
      style={{
        opacity: isMenuNavOpen ? 0 : 1,
        pointerEvents: isMenuNavOpen ? "none" : "auto",
        transition: "opacity 0.25s ease",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isMenuNavOpen ? 0 : 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className="relative overflow-hidden flex flex-col shadow-2xl"
        onClick={() => {
          if (!isOpen) {
            playSound("click");
            setIsOpen(true);
          }
        }}
        style={{
          cursor: isOpen ? "default" : "pointer",
          transformOrigin: "bottom right",
        }}
        animate={{
          width: isOpen ? 310 : 145,
          height: isOpen ? 290 : 48,
          borderRadius: isOpen ? 24 : 48,
          scale: 1,
        }}
        whileHover={isOpen ? undefined : { scale: 1.03 }}
        transition={{
          duration: 0.8,
          ease,
          height: { duration: isOpen ? 0.8 : 0.22 },
          scale: { duration: 0.25, ease },
        }}
      >
        {/* Base background layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: pillBg,
            borderColor: pillBorder,
          }}
          transition={{ duration: 0.3, ease }}
          style={{
            borderWidth: 1.5,
            borderStyle: "solid",
            borderRadius: "inherit",
          }}
        />

        {/* Liquid circle expanding from bottom */}
        <motion.div
          className="absolute left-1/2"
          style={{
            width: "240%",
            height: "240%",
            borderRadius: "50%",
            x: "-50%",
            backgroundColor: liquidCircleBg,
            boxShadow: isDark
              ? "0 -6px 20px rgba(246, 241, 231, 0.06)"
              : "0 -6px 20px rgba(0, 0, 0, 0.05)",
          }}
          animate={{ bottom: isOpen ? "-20%" : "-240%" }}
          transition={{
            duration: 0.8,
            ease,
            delay: isOpen ? 0.06 : 0,
          }}
        />

        {/* Menu content (zero height/padding when closed so bottom bar is never pushed out) */}
        <div
          className="relative z-10 flex flex-col gap-3.5 select-none"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
            maxHeight: isOpen ? "245px" : 0,
            padding: isOpen ? "18px 16px 10px 16px" : "0px 16px",
            overflow: "hidden",
            flex: isOpen ? 1 : 0,
            transition: "opacity 0.3s ease 0.18s, max-height 0.6s ease, padding 0.4s ease",
          }}
        >
          {/* 1. Sound Option */}
          <div className="flex items-center justify-between">
            <span className={`text-[12px] uppercase font-semibold tracking-wider ${labelColor}`}>
              Sound
            </span>
              <button
                type="button"
                onClick={() => {
                  toggleSound();
                  playSound("click");
                }}
                className={`px-3.5 py-1 text-[11px] uppercase rounded-md border transition-colors ${
                  isSoundEnabled ? activeBtnClass : inactiveBtnClass
                }`}
              >
                {isSoundEnabled ? "ON" : "OFF"}
              </button>
            </div>

            {/* 2. Build Option */}
            <div className="flex items-center justify-between">
              <span className={`text-[12px] uppercase font-semibold tracking-wider ${labelColor}`}>
                Build
              </span>
              <button
                type="button"
                onClick={handleToggleBuild}
                className={`px-3.5 py-1 text-[11px] uppercase rounded-md border transition-colors ${
                  isSwarmActive ? activeBtnClass : inactiveBtnClass
                }`}
              >
                {isSwarmActive ? "STOP" : "RUN"}
              </button>
            </div>

            {/* 3. Card Glass Effects */}
            <div className="flex flex-col gap-1.5">
              <span className={`text-[12px] uppercase font-semibold tracking-wider ${labelColor}`}>
                Card Glass
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(["rain", "frost", "fog", "clear"] as const).map((eff) => (
                  <button
                    key={eff}
                    type="button"
                    onClick={() => {
                      setCardEffect(eff);
                      playSound("click");
                    }}
                    className={`py-1 text-[11px] uppercase rounded-md text-center border transition-colors ${
                      cardEffect === eff ? activeBtnClass : inactiveBtnClass
                    }`}
                  >
                    {eff}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Season Atmosphere */}
            <div className="flex items-center justify-between">
              <span className={`text-[12px] uppercase font-semibold tracking-wider ${labelColor}`}>
                Season
              </span>
              <div className="flex items-center gap-1.5">
                {(["autumn", "winter", "off"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSeason(s);
                      playSound("click");
                    }}
                    className={`px-2.5 py-1 text-[11px] uppercase rounded-md border transition-colors ${
                      season === s ? activeBtnClass : inactiveBtnClass
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
        </div>

        {/* Bottom bar: Features label + morphing hamburger / X */}
        <div
          className="relative z-10 flex items-center justify-between w-full h-[48px] px-5 shrink-0 cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();
            playSound("click");
            setIsOpen(!isOpen);
          }}
        >
          <span
            className="text-[12px] uppercase tracking-[0.16em] font-bold leading-none select-none"
            style={{ color: textColor }}
          >
            Features
          </span>

          <div className="relative w-[20px] h-[20px] flex items-center justify-center">
            <motion.span
              className="absolute block w-[16px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
                backgroundColor: textColor,
              }}
              transition={{ duration: 0.35, ease }}
            />
            <motion.span
              className="absolute block w-[16px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
                backgroundColor: textColor,
              }}
              transition={{ duration: 0.35, ease }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LiquidMorphFloatingMenu;
