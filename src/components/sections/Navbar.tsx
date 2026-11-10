"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { useTheme } from "@/context/ThemeContext";
import { SITE_CONFIG } from "@/config/site";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home section", link: "#home" },
  { label: "Work", ariaLabel: "View selected engineering work", link: "#projects" },
  { label: "Stack", ariaLabel: "View my engineering stack", link: "#skills" },
  { label: "Achievements", ariaLabel: "View my achievements", link: "#achievements" },
  { label: "About", ariaLabel: "Learn more about me", link: "#about" },
  { label: "Journey", ariaLabel: "View experience and leadership journey", link: "#experience" },
  { label: "Orbit", ariaLabel: "View Commit Orbit and open source telemetry", link: "#github-activity" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems = [
  { label: SITE_CONFIG.socials.github.label, link: SITE_CONFIG.socials.github.href },
  { label: SITE_CONFIG.socials.linkedin.label, link: SITE_CONFIG.socials.linkedin.href },
  { label: SITE_CONFIG.socials.resume.label, link: SITE_CONFIG.socials.resume.href },
  { label: "Email me", link: `mailto:${SITE_CONFIG.email}` },
];

export function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logoText={SITE_CONFIG.domain}
      menuButtonColor={isDark ? "#cfd4d9" : "#11161b"}
      openMenuButtonColor="#11161b"
      changeMenuColorOnOpen
      colors={["#2a3239", "#ff6a1a"]}
      accentColor="#ff6a1a"
      onMenuOpen={() => {}}
      onMenuClose={() => {}}
    />
  );
}

export default Navbar;
