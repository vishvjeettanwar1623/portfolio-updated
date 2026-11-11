"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Season = "autumn" | "winter";

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
  toggleSeason: () => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>("autumn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-season") as Season | null;
      if (saved === "autumn" || saved === "winter") {
        setSeasonState(saved);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const setSeason = (nextSeason: Season) => {
    setSeasonState(nextSeason);
    try {
      localStorage.setItem("portfolio-season", nextSeason);
    } catch {
      // ignore storage access errors
    }
  };

  const toggleSeason = () => {
    const nextSeason: Season = season === "autumn" ? "winter" : "autumn";
    setSeason(nextSeason);
  };

  return (
    <SeasonContext.Provider value={{ season, setSeason, toggleSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason(): SeasonContextType {
  const context = useContext(SeasonContext);
  if (!context) {
    return {
      season: "autumn",
      setSeason: () => {},
      toggleSeason: () => {},
    };
  }
  return context;
}

export default SeasonContext;

