"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ArrowUpRight, Mail, Github, Linkedin, Twitter, Plane, Scissors } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const SOCIAL_CHANNELS = [
  {
    name: "Email",
    label: "sbvj727@gmail.com",
    href: "mailto:sbvj727@gmail.com",
    icon: <Mail className="w-3.5 h-3.5" />,
  },
  {
    name: "GitHub",
    label: "@vishvjeettanwar1623",
    href: "https://github.com/vishvjeettanwar1623",
    icon: <Github className="w-3.5 h-3.5" />,
  },
  {
    name: "LinkedIn",
    label: "in/vishvjeet-tanwar",
    href: "https://www.linkedin.com/in/vishvjeet-tanwar/",
    icon: <Linkedin className="w-3.5 h-3.5" />,
  },
  {
    name: "Twitter / X",
    label: "@VishvjeetTanwar",
    href: "https://x.com/VishvjeetTanwar",
    icon: <Twitter className="w-3.5 h-3.5" />,
  },
];

const TRACK_WIDTH = 250;

export function NFCContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const { playSound } = useSound();
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth 3D perspective tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 280, damping: 24, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsTorn(false);
      setDragProgress(0);
      playSound("theme");
    };

    window.addEventListener("open_contact_pass", handleOpen);
    return () => window.removeEventListener("open_contact_pass", handleOpen);
  }, [playSound]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTorn) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Complete tear trigger
  const triggerTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    setDragProgress(1);
    playSound("switch");

    setTimeout(() => {
      setIsOpen(false);
      const target = document.getElementById("projects") || document.getElementById("experience");
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 950);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none font-mono overflow-hidden">
          {/* Frosted Dark Backdrop */}
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-[380px] flex flex-col items-center"
          >
            {/* Close Button */}
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

            {/* 3D Physical Boarding Pass */}
            <div
              style={{ perspective: 1000 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="w-full relative"
            >
              <motion.div
                ref={cardRef}
                style={{
                  rotateX: !isTorn ? rotateX : 0,
                  rotateY: !isTorn ? rotateY : 0,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full rounded-3xl bg-[#0e0e11] border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-visible flex flex-col text-white"
              >
                {/* Brushed Surface Sheen */}
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none overflow-hidden" />

                {/* TOP PASS MAIN BODY */}
                <div className="p-6 sm:p-7 space-y-5 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="space-y-0.5">
                      <div className="text-[9px] uppercase tracking-widest text-white/40">
                        DEVELOPER BOARDING PASS
                      </div>
                      <div className="text-xs font-bold tracking-wider text-white">
                        VT · 2026 EDITION
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold tracking-widest transition-all ${
                        isTorn
                          ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                          : "bg-white/10 border-white/15 text-white"
                      }`}
                    >
                      {isTorn ? "BOARDED" : "VERIFIED PASS"}
                    </span>
                  </div>

                  {/* Builder Name & Role */}
                  <div className="space-y-1">
                    <div className="text-[9px] uppercase tracking-widest text-white/40">
                      BUILDER / PASSENGER
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-sans text-white">
                      Vishvjeet Singh Tanwar
                    </h3>
                    <p className="text-xs text-white/60 font-sans">
                      Full-Stack &amp; Web3 Systems Developer
                    </p>
                  </div>

                  {/* Route Telemetry */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between relative overflow-hidden">
                    <div>
                      <div className="text-[8.5px] text-white/40 uppercase">BASE</div>
                      <div className="text-lg font-bold tracking-tight">DEL</div>
                      <div className="text-[8.5px] text-white/50 font-sans">New Delhi, IN</div>
                    </div>

                    <div className="flex flex-col items-center px-3 space-y-0.5 relative">
                      <Plane className="w-3.5 h-3.5 text-white/40 rotate-90" />
                      <div className="w-12 h-[1px] border-t border-dashed border-white/20" />
                      <span className="text-[7.5px] text-white/40 tracking-widest">DIRECT</span>
                    </div>

                    <div className="text-right">
                      <div className="text-[8.5px] text-white/40 uppercase">DESTINATION</div>
                      <div className="text-lg font-bold tracking-tight">GLOBAL</div>
                      <div className="text-[8.5px] text-white/50 font-sans">Decentralized</div>
                    </div>
                  </div>

                  {/* Direct Contact & Social Links List */}
                  <div className="space-y-2 pt-1">
                    {SOCIAL_CHANNELS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="text-white/60 group-hover:text-white transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-white/85 group-hover:text-white font-mono text-[11px]">
                            {item.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* PERFORATION TEAR TRACK WITH NATIVE FRAMER MOTION DRAG */}
                <div className="relative w-full flex items-center justify-between py-2 overflow-visible select-none">
                  <div className="w-4 h-4 rounded-r-full bg-black/90 border-r border-t border-b border-white/15 -ml-[1px] z-10" />

                  {/* Perforation Line & Live Laser Path */}
                  <div className="flex-1 relative mx-2 h-7 flex items-center">
                    <div className="w-full border-t border-dashed border-white/25" />

                    {/* Unzipped Laser Path */}
                    <div
                      style={{ width: `${dragProgress * 100}%` }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,1)] pointer-events-none transition-all duration-75"
                    />

                    {/* Native Draggable Scissors Blade */}
                    {!isTorn && (
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: TRACK_WIDTH }}
                        dragElastic={0.08}
                        onDragStart={() => playSound("click")}
                        onDrag={(_, info) => {
                          const p = Math.max(0, Math.min(1, info.offset.x / TRACK_WIDTH));
                          setDragProgress(p);
                        }}
                        onDragEnd={(_, info) => {
                          const p = info.offset.x / TRACK_WIDTH;
                          if (p >= 0.72) {
                            triggerTear();
                          } else {
                            setDragProgress(0);
                          }
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileDrag={{ scale: 1.25 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.9)] cursor-grab active:cursor-grabbing z-30 touch-none"
                      >
                        <Scissors className="w-4 h-4 rotate-90" />
                      </motion.div>
                    )}
                  </div>

                  <div className="w-4 h-4 rounded-l-full bg-black/90 border-l border-t border-b border-white/15 -mr-[1px] z-10" />
                </div>

                {/* BOTTOM BARCODE STUB */}
                <motion.div
                  onClick={triggerTear}
                  style={{
                    transformOrigin: "top right",
                  }}
                  animate={
                    isTorn
                      ? {
                          y: 180,
                          rotate: 15,
                          opacity: 0,
                          filter: "blur(4px)",
                        }
                      : {
                          rotate: -(dragProgress * 14),
                          y: dragProgress * 16,
                          x: -(dragProgress * 4),
                          opacity: 1,
                        }
                  }
                  transition={
                    isTorn
                      ? { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
                      : { type: "spring", stiffness: 350, damping: 25 }
                  }
                  className={`p-6 sm:p-7 pt-2 bg-[#0e0e11] rounded-b-3xl space-y-3 relative z-10 border-t border-transparent ${
                    !isTorn ? "cursor-pointer hover:bg-white/[0.03] group/stub" : "pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] text-white/40">
                    <span>GATE: 01</span>
                    <span className="text-white/80 group-hover/stub:text-white flex items-center gap-1 font-bold tracking-wider transition-colors">
                      <span>DRAG SCISSORS OR CLICK ➔</span>
                    </span>
                    <span>SEAT: 1A</span>
                  </div>

                  {/* Clean SVG Architectural Barcode Graphic */}
                  <div className="w-full flex flex-col items-center justify-center pt-1">
                    <div className="w-full h-8 flex items-center justify-between opacity-55 group-hover/stub:opacity-80 transition-opacity">
                      {Array.from({ length: 44 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: (i * 7) % 3 === 0 ? "3px" : (i * 5) % 2 === 0 ? "1.5px" : "1px",
                            height: "100%",
                          }}
                          className="bg-white rounded-xs"
                        />
                      ))}
                    </div>
                    <span className="text-[8.5px] tracking-[4px] text-white/35 group-hover/stub:text-white/60 font-mono mt-1.5 uppercase transition-colors">
                      DRAG SCISSORS RIGHT TO BOARD
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default NFCContactModal;
