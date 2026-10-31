"use client";

import React, { useEffect, useState } from "react";
import { FallingLeaves } from "falling-leaves/react";
import { useTheme } from "@/context/ThemeContext";

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
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Rich natural autumn leaf colors (warm maple red, burnt orange, golden amber, russet oak, and ginkgo gold)
  const leafColors = isDark
    ? [
        "#e8590c",
        "#f08c00",
        "#d9480f",
        "#c92a2a",
        "#e0a800",
        "#d4af37",
        "#b5651d",
      ]
    : [
        "#c92a2a",
        "#d9480f",
        "#b5651d",
        "#d48806",
        "#ad4e00",
        "#9e1030",
        "#c27803",
      ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
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
    </div>
  );
}

export default FallingLeavesEffect;

