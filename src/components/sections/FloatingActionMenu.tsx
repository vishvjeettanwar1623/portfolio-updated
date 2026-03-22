"use client";

import { useMemo } from "react";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import FloatingActionMenu from "@/components/ui/floating-action-menu";

export function FloatingActionMenuContainer() {
  const options = useMemo(() => [
    { 
      label: "Email Me", 
      Icon: <Mail className="w-5 h-5" />, 
      onClick: () => window.location.href = "mailto:[sbvj727@gmail.com]" 
    },
    { 
      label: "LinkedIn", 
      Icon: <Linkedin className="w-5 h-5" />, 
      onClick: () => window.open("https://www.linkedin.com/in/vishvjeet-tanwar/", "_blank") 
    },
    { 
      label: "GitHub", 
      Icon: <Github className="w-5 h-5" />, 
      onClick: () => window.open("https://github.com/vishvjeettanwar1623", "_blank") 
    },
    { 
        label: "Download Resume", 
        Icon: <FileText className="w-5 h-5" />, 
        onClick: () => {
          const link = document.createElement('a');
          link.href = '/resume.pdf'; 
          link.download = 'Vishvjeet_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
    },
  ], []);

  return <FloatingActionMenu options={options} className="z-[100]" />;
}
