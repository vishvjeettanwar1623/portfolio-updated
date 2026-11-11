"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { useTheme } from "@/context/ThemeContext";
import { SITE_CONFIG } from "@/config/site";
import { NAV_MENU_ITEMS } from "@/config/sections";

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
      items={NAV_MENU_ITEMS}
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
