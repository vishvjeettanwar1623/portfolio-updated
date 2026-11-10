"use client";

import React, { useEffect, useState } from "react";
import { FallingLeaves } from "falling-leaves/react";
import { Snowfall } from "falling-snow/react";
import { useTheme } from "@/context/ThemeContext";
import { useSeason } from "@/context/SeasonContext";

export interface FallingLeavesEffectProps {
  className?: string;
  count?: number;
  fullScreen?: boolean;
}

export function FallingLeavesEffect({
  className = "",
  count = 22,
  fullScreen = true,
}: FallingLeavesEffectProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { season } = useSeason();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Rich, visible autumn and molten leaf colors (warm maple red, molten orange, golden amber, russet)
  const leafColors = isDark
    ? [
        "#ff6a1a", // Molten orange
        "#e8590c", // Burnt orange
        "#f76707", // Vivid flame
        "#d9480f", // Deep molten
        "#c92a2a", // Autumn crimson
        "#f08c00", // Warm amber
        "#d48806", // Golden oak
        "#b5651d", // Russet copper
      ]
    : [
        "#d9480f",
        "#c92a2a",
        "#e8590c",
        "#b5651d",
        "#d48806",
        "#ad4e00",
        "#9e1030",
        "#ff6a1a",
      ];

  // Winter snowflakes palette (crisp fog silver and pure white in dark, soft gunmetal/fog in light)
  const snowColors = isDark
    ? ["#ffffff", "#eceff1", "#cfd4d9", "#e2e8f0"]
    : ["#5d6872", "#7b858f", "#8f99a3", "#aab3bb"];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {season === "winter" ? (
        <Snowfall
          fullScreen={fullScreen}
          zIndex={2}
          count={85}
          colors={snowColors}
          size={[3, 14]}
          speed={0.85}
          wind={0.15}
          opacity={[0.45, 0.95]}
          depth={0.8}
          respectReducedMotion={true}
        />
      ) : (
        <FallingLeaves
          fullScreen={fullScreen}
          zIndex={2}
          count={count}
          colors={leafColors}
          shapes={["maple", "oak", "ginkgo", "birch"]}
          opacity={isDark ? 0.9 : 0.85}
          size={[18, 32]}
          speed={[0.7, 1.5]}
          wind={[-0.3, 0.4]}
          sway={[0.5, 1.2]}
          respectReducedMotion={true}
        />
      )}
    </div>
  );
}

export default FallingLeavesEffect;
