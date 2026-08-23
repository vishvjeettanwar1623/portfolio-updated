"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { useTheme } from "@/context/ThemeContext";

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
  { label: "GitHub", link: "https://github.com/vishvjeettanwar1623" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/vishvjeet-tanwar/" },
  { label: "Resume", link: "/resume.pdf" },
  { label: "Email me", link: "mailto:sbvj727@gmail.com" },
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
      menuButtonColor={isDark ? "#f4f4f5" : "#000000"}
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen
      colors={isDark ? ["#18181b", "#ffffff"] : ["#e5e5e5", "#ffffff"]}
      accentColor="#000000"
      onMenuOpen={() => {}}
      onMenuClose={() => {}}
    />
  );
}

export default Navbar;
