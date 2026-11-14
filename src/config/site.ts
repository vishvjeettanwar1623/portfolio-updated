export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
  username?: string;
}

export interface BoardingPassLink {
  name: string;
  href: string;
  top: string;
  height: string;
  left: string;
  width: string;
  label: string;
}

const EMAIL = "sbvj727@gmail.com";

const SOCIALS = {
  github: {
    label: "GitHub",
    href: "https://github.com/vishvjeettanwar1623",
    handle: "@vishvjeettanwar1623",
    username: "vishvjeettanwar1623",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishvjeet-tanwar/",
    handle: "in/vishvjeet-tanwar",
    username: "vishvjeet-tanwar",
  },
  twitter: {
    label: "Twitter / X",
    href: "https://x.com/VishvjeetTanwar",
    handle: "@VishvjeetTanwar",
    username: "VishvjeetTanwar",
  },
  resume: {
    label: "Resume",
    href: "/resume.pdf",
  },
  leetcode: {
    label: "LeetCode",
    href: "https://leetcode.com/u/vishvjeet1623/",
    username: "vishvjeet1623",
  },
} as const;

export const SITE_CONFIG = {
  name: "Vishvjeet Singh Tanwar",
  role: "Full-Stack & Web3 Systems Developer",
  badge: "Designer & Builder",
  domain: "vishvjeet.me",
  url: "https://vishvjeet.me",
  tagline: "Designer & systems builder focused on Web3 protocols, native tools, and interactive 3D.",
  shortTagline: "Build · Ship · Iterate",
  location: "Noida, UP",
  base: "DEL",
  destination: "GLOBAL",
  email: EMAIL,
  socials: SOCIALS,
  boardingPassLinks: [
    {
      name: "Email",
      href: `mailto:${EMAIL}`,
      top: "56.4%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: EMAIL,
    },
    {
      name: "GitHub",
      href: SOCIALS.github.href,
      top: "65.0%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: SOCIALS.github.handle,
    },
    {
      name: "LinkedIn",
      href: SOCIALS.linkedin.href,
      top: "73.5%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: SOCIALS.linkedin.handle,
    },
    {
      name: "Twitter / X",
      href: SOCIALS.twitter.href,
      top: "82.0%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: SOCIALS.twitter.handle,
    },
  ] as BoardingPassLink[],
};

export default SITE_CONFIG;
