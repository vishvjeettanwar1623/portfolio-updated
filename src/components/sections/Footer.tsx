"use client";

import { WavyBackground } from "@/components/ui/wavy-background";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/30 bg-background overflow-hidden min-h-[300px] flex items-center justify-center">
      <WavyBackground />
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 flex flex-col items-center h-full justify-end">
        {}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent max-w-5xl mx-auto mb-8 mt-auto"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-5xl mx-auto">
          {}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Vishvjeet Singh Tanwar
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Designer & Builder — Building things that my creativity allows.
            </p>
          </div>

          {}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vishvjeet Singh Tanwar.<br className="md:hidden" /> Built with
              inspirations and creations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
