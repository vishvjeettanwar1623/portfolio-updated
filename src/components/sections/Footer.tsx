"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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
      name: "GitHub",
      href: "https://github.com/vishvjeettanwar1623",
      icon: <Github className="w-5 h-5" />,
      image: "/assets/socials/github.png",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vishvjeet-tanwar/",
      icon: <Linkedin className="w-5 h-5" />,
      image: "/assets/socials/linkedIn.png",
    },
    {
      name: "Twitter",
      href: "https://x.com/VishvjeetTanwar",
      icon: <Twitter className="w-5 h-5" />,
      image: "/assets/socials/twitter.png",
    },
    {
      name: "Email me",
      href: "mailto:sbvj727@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      image: "/assets/socials/email_card.png",
    },
  ];

  return (
    <footer
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative border-t border-foreground/10 bg-background transition-colors duration-400 overflow-visible min-h-[360px] flex flex-col justify-between py-12 md:py-16"
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
        {/* 2-Column Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          {/* Left Column: Name & Tagline */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4, scale: 1.02 }}
              className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-audiowide)] tracking-tight whitespace-nowrap cursor-default transition-transform duration-300"
            >
              Vishvjeet Singh Tanwar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-700 dark:text-white/80 text-sm md:text-base max-w-md font-light leading-relaxed"
            >
              Designer & Builder — Building things that my creativity allows.
            </motion.p>
          </div>

          {/* Right Column: Social Links with Hover Card Preview */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono tracking-widest uppercase text-neutral-700 dark:text-white/70"
            >
              Get a link to my social cards
            </motion.span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + index * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.18, rotate: index % 2 === 0 ? 6 : -6, y: -5 }}
                  whileTap={{ scale: 0.92 }}
                  onMouseEnter={() =>
                    setActiveSocial({ name: social.name, image: social.image })
                  }
                  onMouseLeave={() => setActiveSocial(null)}
                  className="relative p-3.5 rounded-2xl bg-foreground/5 border border-foreground/15 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-300 shadow-md group overflow-visible cursor-pointer"
                >
                  <motion.div className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        {/* Expanding Divider Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent my-4 origin-center"
        />

        {/* Bottom Full-Width Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 text-center w-full"
        >
          <p className="text-xs md:text-sm text-foreground/60 font-mono tracking-wider">
            © {currentYear} Vishvjeet Singh Tanwar. All rights reserved. Built with inspirations and creations.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;





