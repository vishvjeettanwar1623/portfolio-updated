"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  RotateCw,
  QrCode,
  Sparkles,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function BuilderPass() {
  const { playSound } = useSound();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 260 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-180, 180], [14, -14]);
  const rotateY = useTransform(smoothX, [-220, 220], [-14, 14]);

  // Glint coordinate transformations
  const glintX = useTransform(smoothX, [-220, 220], ["0%", "100%"]);
  const glintY = useTransform(smoothY, [-180, 180], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // vCard Generator & Instant Download
  const downloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound("click");

    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Tanwar;Vishvjeet;Singh;;",
      "FN:Vishvjeet Singh Tanwar",
      "TITLE:Software Engineer & Designer",
      "EMAIL;TYPE=PREF,INTERNET:sbvj727@gmail.com",
      "URL:https://github.com/vishvjeettanwar1623",
      "NOTE:Designer & Builder — Web3, Systems & Frontend Architecture",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Vishvjeet_Singh_Tanwar.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound("click");
    navigator.clipboard.writeText("sbvj727@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlip = () => {
    playSound("switch");
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-10 relative z-20">
      {/* HUD Header Tag */}
      <div className="flex items-center gap-2 mb-4 font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
        <Wifi className="w-3.5 h-3.5 text-foreground animate-pulse" />
        <span>3D NFC BUILDER PASS · DRAG & FLIP</span>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        className="w-full max-w-[340px] sm:max-w-[380px] h-[215px] sm:h-[235px] cursor-grab active:cursor-grabbing relative select-none"
        style={{ perspective: "1200px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          onClick={toggleFlip}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 24,
          }}
          className="w-full h-full relative rounded-3xl p-5 bg-card/90 dark:bg-card/95 border border-foreground/20 shadow-2xl backdrop-blur-2xl transition-colors duration-400 flex flex-col justify-between overflow-hidden group"
        >
          {/* Specular Holographic Foil Light Glint Layer */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glintX} ${glintY}, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          />

          {/* Sublte Carbon Holographic Micro Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* ================= FRONT FACE ================= */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="w-full h-full flex flex-col justify-between absolute inset-0 p-5 sm:p-6 z-20"
          >
            {/* Top Bar: Holographic NFC Chip & Status */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                {/* Metallic NFC Smart Chip Icon */}
                <div className="w-8 h-6 rounded-md bg-foreground/10 border border-foreground/30 flex items-center justify-center relative overflow-hidden shadow-xs">
                  <div className="w-4 h-3 border border-foreground/40 rounded-xs flex items-center justify-center">
                    <div className="w-2 h-1 bg-foreground/20" />
                  </div>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[0.5px] bg-foreground/30" />
                </div>
                <span className="font-mono text-[9px] text-muted-foreground font-bold tracking-widest">
                  NFC://VERIFIED
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/15">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                <span className="font-mono text-[9px] font-bold text-foreground uppercase tracking-wider">
                  DEVNET AUTH
                </span>
              </div>
            </div>

            {/* Middle Bar: Identity & Avatar */}
            <div className="flex items-center gap-3.5 my-auto relative z-10">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-neutral-900 border border-foreground/20 shadow-md flex-shrink-0">
                <Image
                  src="/assets/Mascot Image.png"
                  alt="Vishvjeet Singh Tanwar"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-audiowide)] text-foreground tracking-tight truncate">
                  Vishvjeet Singh Tanwar
                </h3>
                <p className="text-xs text-muted-foreground font-mono tracking-tight truncate">
                  Designer & Software Builder
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-mono font-bold text-foreground bg-foreground/10 px-1.5 py-0.5 rounded-md">
                    CSE Dept
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    JSS Noida
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Security Hash & Flip Instruction */}
            <div className="flex items-center justify-between pt-3 border-t border-foreground/10 relative z-10">
              <span className="font-mono text-[8px] sm:text-[9px] text-muted-foreground tracking-tighter truncate max-w-[200px]">
                PASS-ID: 0x8453..VT1623
              </span>
              <div className="flex items-center gap-1 text-[9px] font-mono text-foreground font-bold hover:underline">
                <span>FLIP CARD</span>
                <RotateCw className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="w-full h-full flex flex-col justify-between absolute inset-0 p-5 sm:p-6 z-20"
          >
            {/* Magnetic Stripe Header */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-foreground/10">
              <span className="font-mono text-[9px] text-muted-foreground font-bold tracking-widest uppercase">
                DIGITAL NFC PASS
              </span>
              <span className="font-mono text-[8px] text-muted-foreground/60">
                TAP ANYWHERE TO FLIP
              </span>
            </div>

            {/* Quick-Action Buttons */}
            <div className="grid grid-cols-2 gap-2 my-auto">
              <motion.button
                onClick={downloadVCard}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="p-2.5 rounded-xl bg-foreground text-background font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </motion.button>

              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="p-2.5 rounded-xl bg-foreground/5 border border-foreground/20 text-foreground font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-foreground/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Footer QR Info & Direct Link */}
            <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
              <a
                href="https://github.com/vishvjeettanwar1623"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 font-mono text-[10px] text-foreground font-bold hover:underline"
              >
                <span>github.com/vishvjeettanwar1623</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <ShieldCheck className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BuilderPass;
