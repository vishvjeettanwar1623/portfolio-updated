"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type WeatherGlassEffect = "rain" | "frost" | "fog" | "clear";

interface WeatherGlassContextType {
  effect: WeatherGlassEffect;
  setEffect: (effect: WeatherGlassEffect) => void;
  toggleEffect: () => void;
}

const WeatherGlassContext = createContext<WeatherGlassContextType | undefined>(undefined);

const EFFECTS: WeatherGlassEffect[] = ["rain", "frost", "fog", "clear"];

export function WeatherGlassProvider({ children }: { children: React.ReactNode }) {
  const [effect, setEffectState] = useState<WeatherGlassEffect>("rain");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-card-effect") as WeatherGlassEffect | null;
      if (saved && EFFECTS.includes(saved)) {
        setEffectState(saved);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const setEffect = (nextEffect: WeatherGlassEffect) => {
    setEffectState(nextEffect);
    try {
      localStorage.setItem("portfolio-card-effect", nextEffect);
    } catch {
      // ignore storage access errors
    }
  };

  const toggleEffect = () => {
    const nextIdx = (EFFECTS.indexOf(effect) + 1) % EFFECTS.length;
    setEffect(EFFECTS[nextIdx] ?? "rain");
  };

  return (
    <WeatherGlassContext.Provider value={{ effect, setEffect, toggleEffect }}>
      {children}
    </WeatherGlassContext.Provider>
  );
}

export function useWeatherGlass(): WeatherGlassContextType {
  const context = useContext(WeatherGlassContext);
  if (!context) {
    return {
      effect: "rain",
      setEffect: () => {},
      toggleEffect: () => {},
    };
  }
  return context;
}

export default WeatherGlassContext;

