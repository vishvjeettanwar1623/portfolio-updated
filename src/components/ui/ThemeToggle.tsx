"use client";

import React from "react";
import Switch from "@/components/ui/sky-toggle";

interface ThemeToggleProps {
  className?: string;
  size?: string;
}

export function ThemeToggle({ className = "", size = "14px" }: ThemeToggleProps) {
  return <Switch className={className} size={size} />;
}

export default ThemeToggle;
