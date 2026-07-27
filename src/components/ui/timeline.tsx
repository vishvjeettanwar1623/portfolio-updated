"use client";

import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItemImage {
  src: string;
  alt: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  images?: TimelineItemImage[];
  href?: string;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  initialCount?: number;
  dateFormat?: Intl.DateTimeFormatOptions;
  className?: string;
  showMoreText?: string;
  showLessText?: string;
  dotClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg";
  animationDuration?: number;
  animationDelay?: number;
  showAnimation?: boolean;
}

function DesktopTimelineEntry({
  item,
  index,
  dotClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  index: number;
  dotClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State for Interactive Card
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Progress for Smooth Fade-In (Zero position shifting)
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const cardOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.95, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={entryRef}
      className={cn(
        "group hidden grid-cols-12 items-start md:grid gap-6 py-8 relative",
        !item.href && "pointer-events-auto"
      )}
    >
      {/* Date Column (Stable, Fixed Position) */}
      <dl className="col-span-3 pt-4 text-right pr-6">
        <dt className="sr-only">Date</dt>
        <motion.dd
          whileHover={{ scale: 1.05 }}
          className={cn(
            "inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-black/15 dark:border-white/20 backdrop-blur-xl text-base font-bold text-neutral-900 dark:text-white shadow-lg font-mono tracking-widest transition-all duration-300 group-hover:border-black/30 dark:group-hover:border-white/50 group-hover:bg-black/5 dark:group-hover:bg-white/10",
            dateClassName
          )}
        >
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </time>
        </motion.dd>
      </dl>

      {/* Center Laser Node & Interactive Card Column */}
      <div className="col-span-9 flex items-start">
        {/* Clean Milestone Icon Node (No AI glow / no pulsing aura) */}
        <div className="relative mr-8 min-h-[220px] flex justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={cn(
              "relative z-20 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-black/20 dark:border-white/25 text-neutral-900 dark:text-white shadow-lg transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black",
              dotClassName
            )}
          >
            {item.icon ? (
              <div className="h-4 w-4 flex items-center justify-center">{item.icon}</div>
            ) : (
              <div className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
            )}
          </motion.div>
        </div>

        {/* Stable Glassmorphism Card (Zero Y/X position shifting) */}
        <motion.div
          style={{ opacity: cardOpacity }}
          className="w-full"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
            className="group/card relative flex flex-col gap-5 w-full pr-4 p-7 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/70 backdrop-blur-2xl border border-black/10 dark:border-white/15 hover:border-black/25 dark:hover:border-white/40 transition-all duration-500 shadow-lg dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer"
          >
            {/* Interactive Spotlight Sheen Following Cursor */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0,0,0,0.04), transparent 40%)`,
              }}
            />

            {/* Top Ambient Glow Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/50 to-transparent group-hover/card:via-black dark:group-hover/card:via-white transition-all duration-500 z-20" />

            <h3
              className={cn(
                "text-2xl sm:text-3xl font-bold tracking-wide text-neutral-900 dark:text-white transition-colors font-[family-name:var(--font-audiowide)] drop-shadow-sm relative z-20",
                titleClassName
              )}
            >
              {item.title}
            </h3>

            {item.description && (
              <p
                className={cn(
                  "text-sm sm:text-base text-neutral-600 dark:text-white/85 leading-relaxed font-light relative z-20",
                  descriptionClassName
                )}
              >
                {item.description}
              </p>
            )}

            {item.content && <div className="mt-1 relative z-20">{item.content}</div>}

            {/* 4-Image Grid with 3D Hover Scale & Glow Sheen */}
            {item.images && item.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 relative z-20">
                {item.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-28 sm:h-34 rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 bg-neutral-100 dark:bg-neutral-950/90 hover:border-black/30 dark:hover:border-white/60 transition-all duration-500 group/img shadow-md cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                      <span className="text-[11px] font-mono text-white/90 truncate">
                        {img.alt}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MobileTimelineEntry({
  item,
  dotClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
}: {
  item: TimelineItem;
  dotClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
}) {
  return (
    <div className="flex flex-col space-y-4 rounded-3xl p-6 transition-all bg-white dark:bg-neutral-900/70 backdrop-blur-xl border border-black/10 dark:border-white/15 md:hidden shadow-lg">
      <div className="flex items-center space-x-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-black/20 dark:border-white/25 text-neutral-900 dark:text-white shadow-md",
            dotClassName
          )}
        >
          {item.icon ? (
            <div className="h-4 w-4 flex items-center justify-center">{item.icon}</div>
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
          )}
        </div>
        <dl>
          <dt className="sr-only">Date</dt>
          <dd
            className={cn(
              "text-xs font-mono font-bold text-neutral-700 dark:text-white/90",
              dateClassName
            )}
          >
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </time>
          </dd>
        </dl>
      </div>

      <div>
        <h3
          className={cn(
            "text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2 font-[family-name:var(--font-audiowide)]",
            titleClassName
          )}
        >
          {item.title}
        </h3>

        {item.description && (
          <p
            className={cn(
              "text-sm text-neutral-600 dark:text-white/80 leading-relaxed mb-3 font-light",
              descriptionClassName
            )}
          >
            {item.description}
          </p>
        )}

        {item.content && <div className="mb-3">{item.content}</div>}

        {item.images && item.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            {item.images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-24 rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-neutral-100 dark:bg-black/40"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Timeline({
  items,
  initialCount = 5,
  className,
  showMoreText = "Show More",
  showLessText = "Show Less",
  dotClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  buttonVariant = "ghost",
  buttonSize = "sm",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, initialCount);
  const remainingItems = sortedItems.slice(initialCount);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-5xl md:max-w-6xl mx-auto px-2 sm:px-4", className)}
    >
      {/* Background Track Line */}
      <div className="hidden md:block absolute top-10 bottom-10 left-[24.7%] w-[2px] bg-black/10 dark:bg-white/10 rounded-full pointer-events-none z-0" />

      <ul className="relative z-10 space-y-12">
        {visibleItems.map((item, index) => (
          <li key={index}>
            <DesktopTimelineEntry
              item={item}
              index={index}
              dotClassName={dotClassName}
              titleClassName={titleClassName}
              descriptionClassName={descriptionClassName}
              dateClassName={dateClassName}
            />
            <MobileTimelineEntry
              item={item}
              dotClassName={dotClassName}
              titleClassName={titleClassName}
              descriptionClassName={descriptionClassName}
              dateClassName={dateClassName}
            />
          </li>
        ))}
      </ul>

      {remainingItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className="gap-2 text-neutral-900 border border-black/20 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/10 px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all shadow-md"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? showLessText : showMoreText}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
