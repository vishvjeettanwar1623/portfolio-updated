export interface PortfolioSection {
  id: string;
  label: string;
  tocName: string;
  ariaLabel: string;
  skeletonType?: "projects" | "skills" | "experience" | "achievements" | "about" | "general";
}

export const PORTFOLIO_SECTIONS: readonly PortfolioSection[] = [
  { id: "home", label: "Home", tocName: "Home", ariaLabel: "Go to home section" },
  { id: "projects", label: "Work", tocName: "Projects", ariaLabel: "View selected engineering work", skeletonType: "projects" },
  { id: "skills", label: "Stack", tocName: "Skills", ariaLabel: "View my engineering stack", skeletonType: "skills" },
  { id: "achievements", label: "Achievements", tocName: "Achievements", ariaLabel: "View my achievements", skeletonType: "achievements" },
  { id: "about", label: "About", tocName: "About", ariaLabel: "Learn more about me", skeletonType: "about" },
  { id: "experience", label: "Journey", tocName: "Journey", ariaLabel: "View experience and leadership journey", skeletonType: "experience" },
  { id: "github-activity", label: "Orbit", tocName: "Orbit", ariaLabel: "View Commit Orbit and open source telemetry" },
  { id: "contact", label: "Contact", tocName: "Contact", ariaLabel: "Get in touch" },
] as const;

export const NAV_MENU_ITEMS = PORTFOLIO_SECTIONS.map((sec) => ({
  label: sec.label,
  ariaLabel: sec.ariaLabel,
  link: `#${sec.id}`,
}));

export const TOC_SECTIONS = PORTFOLIO_SECTIONS.map((sec) => ({
  id: sec.id,
  name: sec.tocName,
}));
