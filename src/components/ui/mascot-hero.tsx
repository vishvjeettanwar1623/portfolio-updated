"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { GlassRain } from "./GlassRain";
import { FogAtmosphere } from "./FogAtmosphere";
import ButtonWithIcon from "./button-with-icon";
import { IDCardLanyard } from "./id-card-lanyard";
import { LayeredText } from "./layered-text";
import { SITE_CONFIG } from "@/config/site";

interface HeroProps {
  name?: string;
  badge?: string;
  avatarSrc?: string;
  animationDelay?: number;
}

export function MascotHero({
  name = SITE_CONFIG.name,
  badge = SITE_CONFIG.badge,
  avatarSrc = "/assets/img.png",
  animationDelay = 0.2,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    const target = document.getElementById("projects");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const layeredNameLines = [
    { top: "\u00A0", bottom: "VISHVJEET" },
    { top: "VISHVJEET", bottom: "SINGH" },
    { top: "SINGH", bottom: "TANWAR" },
    { top: "TANWAR", bottom: "DESIGNER" },
    { top: "DESIGNER", bottom: "BUILDER" },
    { top: "BUILDER", bottom: "WEB3 DEV" },
    { top: "WEB3 DEV", bottom: "\u00A0" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background select-none"
    >
      <GlassRain className="opacity-70" />
      <FogAtmosphere />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 pb-16 pointer-events-none">
        <div className="w-full md:w-[48%] lg:w-[45%] flex flex-col justify-center items-start z-20 py-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: animationDelay, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-start"
          >
            <LayeredText
              lines={layeredNameLines}
              fontSize="100px"
              fontSizeMd="52px"
              lineHeight={84}
              lineHeightMd={46}
              className="py-2"
            />
          </motion.div>
        </div>

        <div className="w-full md:w-[52%] lg:w-[55%] h-[400px] md:h-screen pointer-events-none" />
      </div>

      <IDCardLanyard
        name={name}
        role={badge}
        brand="VISHVJEET"
        brandTagline="Designer & Developer"
        pillars={["Design", "Code", "Ship"]}
        location={SITE_CONFIG.location}
        idNumber="VT-2026"
        validThru="03/2005"
        avatarUrl="/assets/img.png"
        site={SITE_CONFIG.domain}
        githubUrl={SITE_CONFIG.socials.github.href}
        linkedinUrl={SITE_CONFIG.socials.linkedin.href}
        twitterUrl={SITE_CONFIG.socials.twitter.href}
        anchorX="82%"
        anchorY={52}
        zIndex={25}
        position="absolute"
        showHint={false}
      />

      <motion.div
        initial={{ opacity: 1, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[40px] sm:bottom-[50px] md:bottom-[60px] right-[30px] sm:right-[50px] md:right-[70px] z-30 pointer-events-auto rounded-full"
      >
        <ButtonWithIcon
          label="EXPLORE WORKS"
          onClick={handleExploreClick}
        />
      </motion.div>
    </div>
  );
}

export default MascotHero;
