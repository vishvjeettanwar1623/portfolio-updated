"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type React from "react";

export interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>;
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  className?: string;
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "VISHVJEET" },
    { top: "VISHVJEET", bottom: "SINGH" },
    { top: "SINGH", bottom: "TANWAR" },
    { top: "TANWAR", bottom: "DESIGNER" },
    { top: "DESIGNER", bottom: "BUILDER" },
    { top: "BUILDER", bottom: "DEVELOPER" },
    { top: "DEVELOPER", bottom: "\u00A0" },
  ],
  fontSize = "105px",
  fontSizeMd = "52px",
  lineHeight = 90,
  lineHeightMd = 46,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const calculateTranslateX = (index: number) => {
    const baseOffset = Math.round(lineHeight * 0.55);
    const baseOffsetMd = Math.round(lineHeightMd * 0.55);
    const centerIndex = Math.floor(lines.length / 2);
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll("p");

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -lineHeight : -lineHeightMd,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });

    const handleMouseEnter = () => {
      timelineRef.current?.play();
    };

    const handleMouseLeave = () => {
      timelineRef.current?.reverse();
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      timelineRef.current?.kill();
    };
  }, [lines, lineHeight, lineHeightMd]);

  return (
    <div
      ref={containerRef}
      className={`mx-auto py-4 font-sans font-black tracking-[-3px] uppercase text-black dark:text-white antialiased cursor-pointer select-none ${className}`}
      style={{ fontSize } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          return (
            <li
              key={index}
              className={`
                overflow-hidden relative
                ${
                  index % 2 === 0
                    ? "[transform:skew(60deg,-30deg)_scaleY(0.66667)]"
                    : "[transform:skew(0deg,-30deg)_scaleY(1.33333)]"
                }
              `}
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                } as React.CSSProperties
              }
            >
              <p
                className="px-[18px] align-top whitespace-nowrap m-0 select-none"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight * 0.92}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>
              <p
                className="px-[18px] align-top whitespace-nowrap m-0 select-none"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight * 0.92}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LayeredText;
