"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { IDCardLanyard } from "@/components/ui/id-card-lanyard";
import { LayeredText } from "@/components/ui/layered-text";
import { SITE_CONFIG } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

const LAYERED_NAME_LINES = [
  { top: "\u00A0", bottom: "VISHVJEET" },
  { top: "VISHVJEET", bottom: "SINGH" },
  { top: "SINGH", bottom: "TANWAR" },
  { top: "TANWAR", bottom: "DESIGNER" },
  { top: "DESIGNER", bottom: "BUILDER" },
  { top: "BUILDER", bottom: "WEB3 DEV" },
  { top: "WEB3 DEV", bottom: "\u00A0" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background select-none"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 pb-16 pointer-events-none">
        <div className="w-full md:w-[48%] lg:w-[45%] flex flex-col justify-center items-start z-20 py-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-start"
          >
            <LayeredText
              lines={LAYERED_NAME_LINES}
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
        name={SITE_CONFIG.name}
        role={SITE_CONFIG.badge}
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
          onClick={() => scrollToSection("projects")}
        />
      </motion.div>
    </section>
  );
}

export default HeroSection;
