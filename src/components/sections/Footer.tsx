"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/vishvjeettanwar1623",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishvjeet-tanwar/", // Replace with your LinkedIn URL
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:[sbvj727@gmail.com]", // Replace with your email
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — Name & tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Vishvjeet Singh Tanwar
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Designer & Builder — Building things that my creativity allows.
            </p>
          </div>

          {/* Right — Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-card/20 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-card/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Vishvjeet Singh Tanwar. Built with
            inspirations and creations.
          </p>
        </div>
      </div>
    </footer>
  );
}
