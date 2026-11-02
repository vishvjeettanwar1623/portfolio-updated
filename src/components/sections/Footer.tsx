"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";
import { LoopingWords } from "@/components/ui/looping-words-with-gsap";
import { SITE_CONFIG } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeSocial, setActiveSocial] = useState<{
    name: string;
    image: string;
  } | null>(null);

  // Smooth Motion Values for Cursor Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const socialLinks = [
    {
      name: SITE_CONFIG.socials.github.label,
      href: SITE_CONFIG.socials.github.href,
      icon: <Github className="w-5 h-5" />,
      image: "/assets/socials/github.png",
    },
    {
      name: SITE_CONFIG.socials.linkedin.label,
      href: SITE_CONFIG.socials.linkedin.href,
      icon: <Linkedin className="w-5 h-5" />,
      image: "/assets/socials/linkedIn.png",
    },
    {
      name: SITE_CONFIG.socials.twitter.label,
      href: SITE_CONFIG.socials.twitter.href,
      icon: <Twitter className="w-5 h-5" />,
      image: "/assets/socials/twitter.png",
    },
    {
      name: "Email me",
      href: `mailto:${SITE_CONFIG.email}`,
      icon: <Mail className="w-5 h-5" />,
      image: "/assets/socials/email_card.png",
    },
  ];

  return (
    <footer
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative border-t border-foreground/10 bg-background transition-colors duration-400 overflow-visible min-h-[520px] flex flex-col justify-between py-16 md:py-24"
    >
      <WavyBackground />

      {/* Floating Interactive Social Card Preview Following Cursor */}
      <AnimatePresence>
        {activeSocial && (
          <motion.div
            style={{
              left: smoothX,
              top: smoothY,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -6, y: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 6, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-[115%] w-64 h-40 sm:w-72 sm:h-44 rounded-2xl p-1.5 bg-neutral-950/90 dark:bg-neutral-950/90 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
              <Image
                src={activeSocial.image}
                alt={`${activeSocial.name} card`}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                  {activeSocial.name}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container relative z-10 mx-auto px-6 flex flex-col justify-between flex-grow max-w-6xl"
      >
        {/* SINGLE-LINE BANNER WITH LOOPING WORDS */}
        <div className="w-full flex items-center justify-center text-center my-6 sm:my-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row flex-nowrap items-center justify-center gap-1 sm:gap-2 md:gap-3 max-w-full overflow-hidden"
