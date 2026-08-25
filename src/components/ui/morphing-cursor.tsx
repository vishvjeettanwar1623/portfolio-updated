"use client";

import type React from "react";
import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagneticTextProps {
  text: string;
  hoverText?: string;
  className?: string;
}

export function MagneticText({
  text = "CREATIVE",
  hoverText = "EXPLORE",
  className,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        isHovered ? "cursor-none" : "cursor-default",
        className
      )}
    >
      <span className="text-5xl font-bold tracking-tighter text-foreground tracking-wide">
        {text}
      </span>

      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full bg-foreground overflow-hidden"
        style={{
          width: isHovered ? 150 : 0,
          height: isHovered ? 150 : 0,
          transition:
            "width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height",
        }}
      >
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          <span className="text-5xl font-bold tracking-tighter text-background whitespace-nowrap tracking-wide">
            {hoverText}
          </span>
        </div>
      </div>
    </div>
  );
}

interface MagneticImageProps {
  baseImageSrc: string;
  hoverImageSrc: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  lensSize?: number;
}

export function MagneticImage({
  baseImageSrc,
  hoverImageSrc,
  alt = "Mascot",
  className,
  imageClassName,
  lensSize = 220,
}: MagneticImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const lensSizeRef = useRef(lensSize);
  useEffect(() => {
    lensSizeRef.current = lensSize;
  }, [lensSize]);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.2);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (innerImageRef.current) {
        const halfLens = lensSizeRef.current / 2;
        innerImageRef.current.style.transform = `translate(${-currentPos.current.x + halfLens}px, ${-currentPos.current.y + halfLens}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };

    if (!isHoveredRef.current) {
      currentPos.current = { x, y };
    }
    isHoveredRef.current = true;
    setIsHovered(true);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };

    isHoveredRef.current = true;
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        isHovered ? "cursor-none" : "cursor-default",
        className
      )}
    >
      <style>{`
        @keyframes fluidBlobAnimation {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          12.5% {
            border-radius: 45% 55% 65% 35% / 35% 65% 35% 65%;
          }
          25% {
            border-radius: 30% 70% 70% 30% / 50% 60% 40% 50%;
          }
          37.5% {
            border-radius: 65% 35% 45% 55% / 40% 70% 30% 60%;
          }
          50% {
            border-radius: 70% 30% 50% 50% / 30% 70% 60% 40%;
          }
          62.5% {
            border-radius: 40% 60% 35% 65% / 65% 35% 55% 45%;
          }
          75% {
            border-radius: 35% 65% 60% 40% / 60% 35% 65% 40%;
          }
          87.5% {
            border-radius: 55% 45% 40% 60% / 45% 55% 70% 30%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }
        .animate-fluid-blob {
          animation: fluidBlobAnimation 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Base Mascot Image (100% Still) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={baseImageSrc}
        alt={alt}
        // @ts-ignore
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className={cn("w-full h-full object-contain pointer-events-none", imageClassName)}
      />

      {/* Morphing Fluid Blob Lens boundary revealing Mascot Image 2 (Mascot stays completely still) */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none overflow-hidden border-2 border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.4)] z-30 animate-fluid-blob"
        style={{
          width: isHovered ? lensSize : 0,
          height: isHovered ? lensSize : 0,
          transition:
            "width 0.4s cubic-bezier(0.33, 1, 0.68, 1), height 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height, border-radius",
        }}
      >
        <div
          ref={innerImageRef}
          className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            willChange: "transform",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hoverImageSrc}
            alt={`${alt} 2`}
            loading="lazy"
            decoding="async"
            className={cn("w-full h-full object-contain pointer-events-none scale-[2.25] origin-center", imageClassName)}
          />
        </div>
      </div>
    </div>
  );
}
