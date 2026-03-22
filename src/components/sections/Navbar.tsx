"use client";

import { Home, Briefcase, Zap, User, Trophy, Terminal, History, Palette } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { PremiumToggle } from "@/components/ui/bouncy-toggle";

export function Navbar() {
  const tabs = [
    { title: "Home", icon: Home, id: "home" },
    { title: "About", icon: User, id: "about" },
    { title: "Projects", icon: Briefcase, id: "projects" },
    { title: "Design", icon: Palette, id: "designs" },
    { title: "Skills", icon: Zap, id: "skills" },
    { title: "Awards", icon: Trophy, id: "achievements" },
    { title: "Code and Compete", icon: Terminal, id: "coding" },
    { title: "Change Log", icon: History, id: "experience" },
  ];

  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const tab = tabs[index];
    if (tab && 'id' in tab) {
      document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 z-50 flex w-full justify-center px-4 pointer-events-none">
      <div className="flex items-center gap-4 bg-background/80 backdrop-blur-md p-2 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg pointer-events-auto">
        <ExpandableTabs tabs={tabs} onChange={handleTabChange} />
        <PremiumToggle 
          defaultChecked={true}
          onChange={(checked) => {
            document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light')
          }}
        />
      </div>
    </nav>
  );
}
