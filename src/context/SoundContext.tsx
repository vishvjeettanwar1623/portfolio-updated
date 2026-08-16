"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type SoundType = "click" | "switch" | "hover" | "expand" | "close" | "theme";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type?: SoundType) => void;
}

const SoundContext = createContext<SoundContextType>({
  isSoundEnabled: false,
  toggleSound: () => {},
  playSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_sound_enabled");
      if (saved !== null) {
        setIsSoundEnabled(saved === "true");
      }
    } catch {}
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio_sound_enabled", String(next));
      } catch {}
      if (next) {
        setTimeout(() => {
          const ctx = getAudioContext();
          if (ctx) {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);
          }
        }, 30);
      }
      return next;
    });
  }, [getAudioContext]);

  const playSound = useCallback(
    (type: SoundType = "click") => {
      if (!isSoundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      try {
        switch (type) {
          case "hover": {
            // Crisp, tactile micro tick
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(460, now);
            osc.frequency.exponentialRampToValueAtTime(260, now + 0.035);
            gain.gain.setValueAtTime(0.045, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
            break;
          }

          case "click": {
            // High-precision mechanical switch click
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = "sine";
            osc2.type = "triangle";
            osc1.frequency.setValueAtTime(1100, now);
            osc2.frequency.setValueAtTime(450, now);
            osc1.frequency.exponentialRampToValueAtTime(320, now + 0.045);
            osc2.frequency.exponentialRampToValueAtTime(180, now + 0.045);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.05);
            osc2.stop(now + 0.05);
            break;
          }

          case "switch": {
            // Resonant acoustic glass chime
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = "sine";
            osc2.type = "triangle";
            osc1.frequency.setValueAtTime(587.33, now);
            osc2.frequency.setValueAtTime(1174.66, now);
            osc1.frequency.exponentialRampToValueAtTime(440, now + 0.09);
            osc2.frequency.exponentialRampToValueAtTime(880, now + 0.09);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.1);
            osc2.stop(now + 0.1);
            break;
          }

          case "expand": {
            // Rich upward acoustic harmonic sweep
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = "sine";
            osc2.type = "sine";
            osc1.frequency.setValueAtTime(260, now);
            osc1.frequency.exponentialRampToValueAtTime(680, now + 0.09);
            osc2.frequency.setValueAtTime(520, now);
            osc2.frequency.exponentialRampToValueAtTime(1040, now + 0.09);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.1);
            osc2.stop(now + 0.1);
            break;
          }

          case "close": {
            // Rich downward acoustic tap
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = "sine";
            osc2.type = "sine";
            osc1.frequency.setValueAtTime(580, now);
            osc1.frequency.exponentialRampToValueAtTime(220, now + 0.08);
            osc2.frequency.setValueAtTime(880, now);
            osc2.frequency.exponentialRampToValueAtTime(330, now + 0.08);

            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.09);
            osc2.stop(now + 0.09);
            break;
          }

          case "theme": {
            // Celestial dual-tone melodic chime
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = "sine";
            osc2.type = "sine";
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc1.frequency.setValueAtTime(783.99, now + 0.06); // G5
            osc2.frequency.setValueAtTime(1046.5, now + 0.06); // C6

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now + 0.06);
            osc1.stop(now + 0.22);
            osc2.stop(now + 0.22);
            break;
          }
        }
      } catch {}
    },
    [isSoundEnabled, getAudioContext]
  );

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
