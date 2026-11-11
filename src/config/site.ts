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

export const SITE_CONFIG = {
  name: "Vishvjeet Singh Tanwar",
  role: "Full-Stack & Web3 Systems Developer",
  badge: "Designer & Builder",
  domain: "vishvjeet.me",
  url: "https://vishvjeet.me",
  tagline: "Designer & Builder — Building things that my creativity allows.",
  shortTagline: "Build · Ship · Iterate",
  location: "Noida, UP",
  base: "DEL",
  destination: "GLOBAL",
  email: "sbvj727@gmail.com",
  socials: {
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
  },
  boardingPassLinks: [
    {
      name: "Email",
      href: "mailto:sbvj727@gmail.com",
      top: "56.4%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: "sbvj727@gmail.com",
    },
    {
      name: "GitHub",
      href: "https://github.com/vishvjeettanwar1623",
      top: "65.0%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: "@vishvjeettanwar1623",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vishvjeet-tanwar/",
      top: "73.5%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: "in/vishvjeet-tanwar",
    },
    {
      name: "Twitter / X",
      href: "https://x.com/VishvjeetTanwar",
      top: "82.0%",
      height: "6.8%",
      left: "7%",
      width: "86%",
      label: "@VishvjeetTanwar",
    },
  ] as BoardingPassLink[],
};

export default SITE_CONFIG;
