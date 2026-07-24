"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home section", link: "#home" },
  { label: "About", ariaLabel: "Learn about me", link: "#about" },
  { label: "Skills", ariaLabel: "View my skills", link: "#skills" },
  { label: "Projects", ariaLabel: "View my projects", link: "#projects" },
  { label: "Designs", ariaLabel: "View my UI designs", link: "#designs" },
  { label: "Achievements", ariaLabel: "View my achievements", link: "#achievements" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com/vishvjeettanwar1623" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/vishvjeet-tanwar/" },
  { label: "Resume", link: "/resume.pdf" },
  { label: "Email me", link: "mailto:vishvjeetsinghtanwar@gmail.com" },
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
      logoText="vishvjeet.me"
      menuButtonColor={isDark ? "#ffffff" : "#000000"}
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen
      colors={isDark ? ["#222222", "#ffffff"] : ["#e5e5e5", "#ffffff"]}
      accentColor="#000000"
      onMenuOpen={() => {}}
      onMenuClose={() => {}}
    />
  );
}
