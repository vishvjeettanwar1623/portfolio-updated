"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Hero atmosphere for the Gunmetal / Fog / Molten palette.
 *
 *  - Fog: three huge, soft silver masses that drift very slowly (pure CSS, GPU transforms).
 *  - Grain + vignette: gives the gunmetal ground a tactile, machined feel.
 *
 * Everything is decorative (aria-hidden, pointer-events-none) and the drift stops for
 * visitors who prefer reduced motion.
 */
export function FogAtmosphere() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fog = isDark ? "207,212,217" : "17,22,27";
  const fogA = isDark ? 0.085 : 0.06;

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Fog masses */}
      <div
        className="fog-drift-a absolute -left-[18%] top-[6%] h-[70vh] w-[75vw] rounded-full blur-[90px] transform-gpu"
        style={{ background: `radial-gradient(closest-side, rgba(${fog},${fogA}), transparent)` }}
      />
      <div
        className="fog-drift-b absolute -right-[22%] top-[34%] h-[80vh] w-[80vw] rounded-full blur-[110px] transform-gpu"
        style={{ background: `radial-gradient(closest-side, rgba(${fog},${fogA * 0.85}), transparent)` }}
      />
      <div
        className="fog-drift-c absolute left-[18%] -bottom-[28%] h-[60vh] w-[70vw] rounded-full blur-[100px] transform-gpu"
        style={{ background: `radial-gradient(closest-side, rgba(${fog},${fogA * 1.1}), transparent)` }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: isDark ? 0.07 : 0.1,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 45%, rgba(8,11,14,0.55) 100%)"
            : "radial-gradient(ellipse at center, transparent 55%, rgba(17,22,27,0.12) 100%)",
        }}
      />
    </div>
  );
}

export default FogAtmosphere;
