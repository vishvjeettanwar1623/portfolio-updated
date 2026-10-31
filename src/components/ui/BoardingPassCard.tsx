"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Scissors } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { SITE_CONFIG } from "@/config/site";

export interface BoardingPassCardProps {
  isTorn: boolean;
  onTear: () => void;
  className?: string;
}

export function BoardingPassCard({ isTorn, onTear, className = "" }: BoardingPassCardProps) {
  const { playSound } = useSound();
  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(260);

  const scissorX = useMotionValue(0);
  const cutWidth = useTransform(scissorX, (val) => `${Math.max(0, val)}px`);
  const cutOpacity = useTransform(scissorX, (val) => (val > 3 ? 1 : 0));

  const stubRotate = useTransform(scissorX, [0, trackWidth], [0, -10]);
  const stubY = useTransform(scissorX, [0, trackWidth], [0, 12]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 260, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth - 32);
    }
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTorn) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleStubClick = () => {
    if (isTorn) return;
    animate(scissorX, trackWidth, {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => onTear(),
    });
  };

  return (
    <div
      style={{ perspective: 1200 }}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      className={`w-full flex justify-center ${className}`.trim()}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: !isTorn ? rotateX : 0,
          rotateY: !isTorn ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full flex flex-col rounded-3xl overflow-visible shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
      >
        {/* Top Portion */}
        <div className="relative w-full aspect-[629/838] rounded-t-3xl overflow-hidden bg-[#121215] border-t border-l border-r border-[#c5a880]/30">
          <Image
            src="/assets/designs/card-top-v2.jpg"
            alt="Developer Boarding Pass Top"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 90vw, 400px"
            className="object-cover object-top select-none pointer-events-none"
          />

          <div className="absolute inset-0 bg-radial from-amber-500/[0.04] to-transparent pointer-events-none" />

          {SITE_CONFIG.boardingPassLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={link.label}
              onClick={(e) => {
                e.stopPropagation();
                playSound("click");
              }}
              style={{
                top: link.top,
                height: link.height,
                left: link.left,
                width: link.width,
              }}
              className="absolute rounded-xl transition-all duration-200 hover:ring-1 hover:ring-[#c5a880]/50 hover:bg-white/[0.03] flex items-center justify-end pr-3.5 z-10 group cursor-pointer"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#f5e6a3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}

          {/* Stamp */}
          <AnimatePresence>
            {isTorn && (
              <motion.div
                initial={{ scale: 2.8, opacity: 0, rotate: -32, filter: "blur(8px)" }}
                animate={{ scale: 1, opacity: 1, rotate: -14, filter: "blur(0px)" }}
                transition={{
                  type: "spring",
                  stiffness: 460,
                  damping: 18,
                  mass: 0.7,
                  delay: 0.05,
                }}
                className="absolute inset-0 z-30 flex items-center justify-center p-3 pointer-events-none"
              >
                <div className="relative border-4 border-dashed border-[#f5e6a3] rounded-2xl px-5 py-4 sm:px-7 sm:py-5 bg-[#14120e]/95 shadow-[0_0_45px_rgba(212,175,55,0.65)] text-center flex flex-col items-center justify-center transform-gpu">
                  <div className="absolute inset-1.5 border border-[#d4af37]/70 rounded-xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-[9px] sm:text-[10.5px] font-mono tracking-[3px] sm:tracking-[4px] text-[#e8c88c] uppercase font-bold mb-1">
                    <span>★</span>
                    <span>SECURITY &amp; BOARDING CLEARED</span>
                    <span>★</span>
                  </div>
                  <div className="text-4xl sm:text-6xl font-black font-mono tracking-[8px] sm:tracking-[14px] text-[#f5e6a3] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.9)] pl-2 sm:pl-3">
                    BOARDED
                  </div>
                  <div className="flex items-center justify-between w-full mt-2 pt-1.5 border-t border-[#d4af37]/50 text-[8px] sm:text-[9.5px] font-mono text-[#e8c88c] tracking-widest uppercase">
                    <span>GATE 01</span>
                    <span>VT-2026 EDITION</span>
                    <span>SEAT 1A</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Perforation Seam & Scissor */}
        <div
          ref={trackRef}
          className="relative w-full h-8 -my-4 z-30 flex items-center select-none"
        >
          <motion.div
            style={{
              width: cutWidth,
              opacity: cutOpacity,
            }}
            className="absolute left-[16px] top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-amber-300 via-yellow-100 to-white shadow-[0_0_12px_rgba(255,230,150,0.95)] pointer-events-none z-30"
          />

          {!isTorn && (
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: trackWidth }}
              dragElastic={0}
              dragMomentum={false}
              style={{ x: scissorX }}
              onDragStart={() => playSound("click")}
              onDragEnd={(_, info) => {
                if (info.offset.x >= trackWidth * 0.72) {
                  animate(scissorX, trackWidth, {
                    duration: 0.12,
                    onComplete: () => onTear(),
                  });
                } else {
                  animate(scissorX, 0, {
                    type: "spring",
                    stiffness: 420,
                    damping: 26,
                  });
                }
              }}
              whileHover={{ scale: 1.12 }}
              whileDrag={{ scale: 1.22 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7324] border border-[#f5e6a3] text-black flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.9)] cursor-grab active:cursor-grabbing z-40 touch-none"
            >
              <Scissors className="w-4 h-4 text-neutral-950 rotate-90 pointer-events-none" />
            </motion.div>
          )}
        </div>

        {/* Bottom Portion */}
        <motion.div
          onClick={handleStubClick}
          style={
            !isTorn
              ? {
                  rotate: stubRotate,
                  y: stubY,
                  transformOrigin: "top right",
                }
              : { transformOrigin: "top right" }
          }
          animate={
            isTorn
              ? {
                  y: 190,
                  rotate: 15,
                  opacity: 0,
                  filter: "blur(4px)",
                }
              : undefined
          }
          transition={
            isTorn ? { duration: 0.65, ease: [0.32, 0, 0.67, 0] } : undefined
          }
          className={`relative w-full aspect-[629/263] rounded-b-3xl overflow-hidden bg-[#121215] border-b border-l border-r border-[#c5a880]/30 ${
            !isTorn
              ? "cursor-pointer group/stub hover:border-[#c5a880]/60 transition-colors"
              : "pointer-events-none"
          }`}
        >
          <Image
            src="/assets/designs/card-bottom-v2.jpg"
            alt="Developer Boarding Pass Bottom"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 90vw, 400px"
            className="object-cover object-bottom select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/[0.02] group-hover/stub:bg-white/[0.06] transition-colors pointer-events-none" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BoardingPassCard;

