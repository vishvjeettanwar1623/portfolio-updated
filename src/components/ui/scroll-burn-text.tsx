"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollBurnTextProps {
  /**
   * The blocks, read in order. Each one comes up out of the dark, passes the
   * lens and burns off, uncovering the next one standing behind it.
   */
  sections: string[];
  /** Line shown on the opening frame, before the first block is close enough to read. Fades out on the first flick of scroll. */
  hint?: React.ReactNode;
  /** Scroll distance each block gets. Taller is slower. Default `"120vh"`. */
  runway?: string;
  /** Scrollable ancestor to track instead of the page — pass this when pinning inside a bounded panel. */
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='gamma' exponent='4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/** Progress through a block's own slot at which it starts to burn. */
const BURN_AT = 0.5;
/** How much of the slot the burn takes to eat the block whole. */
const BURN_SPAN = 0.5;
/** Slots of approach before the first block reaches the front. 0 starts Block 1 immediately centered & readable. */
const LEAD = 0;
/** Alpha of a block standing behind the one up front. */
const DIM = 0.25;
/** Distance a block is born at */
const FAR = 1.5;
/** Distance it closes to */
const NEAR = 0.85;
const RAMP = 0.09;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function useReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduce(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);
  return reduce;
}

export function ScrollBurnText({
  sections,
  hint = "scroll to continue",
  runway = "120vh",
  container,
  className,
}: ScrollBurnTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const runwayRef = React.useRef<HTMLDivElement>(null);
  const counterRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const blockRefs = React.useRef<(HTMLParagraphElement | null)[]>([]);

  const count = sections.length;
  const total = React.useRef(count);
  total.current = count;

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const el = runwayRef.current;
    if (!el) return;
    const containerEl = container?.current ?? null;
    const win = el.ownerDocument.defaultView ?? window;

    const measure = () => {
      blockRefs.current.forEach((block) => {
        if (!block) return;
        const w = block.offsetWidth || 1;
        const h = block.offsetHeight || 1;
        (Array.from(block.children) as HTMLElement[]).forEach((node) => {
          const x = (node.offsetLeft + node.offsetWidth / 2) / w;
          const y = (node.offsetTop + node.offsetHeight / 2) / h;
          const blob =
            0.5 +
            0.28 * Math.sin(x * 11.3 + y * 6.1 + 1.7) +
            0.22 * Math.sin(x * 5.7 - y * 13.9 + 4.2);
          const middle = Math.hypot(x - 0.5, (y - 0.5) * 1.15) / 0.62;
          node.style.setProperty(
            "--t",
            `${clamp01(0.05 + 0.55 * middle + 0.45 * blob)}`,
          );
        });
      });
    };

    const burnt: number[] = [];
    let active = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = containerEl ? containerEl.clientHeight : win.innerHeight;
      const top = containerEl
        ? rect.top - containerEl.getBoundingClientRect().top
        : rect.top;
      
      const scrollableDistance = rect.height - viewport;
      const p = scrollableDistance > 0 ? clamp01(-top / scrollableDistance) : 0;
      const count = total.current;
      
      // Calculate progress t across blocks
      const t = p * (count - 1 + 0.5);
      let front = 0;

      blockRefs.current.forEach((block, i) => {
        const wrap = block?.parentElement;
        if (!block || !wrap) return;
        const q = t - i;
        if (q > 0.4) front = Math.min(i + 1, count - 1);

        // Alpha calculation ensures Block 0 is 100% visible at start (q = 0)
        let alpha = 1;
        if (q < 0) {
          // Approaching block
          alpha = clamp01(1 + q * 1.5) * (DIM + (1 - DIM) * clamp01(1 + q));
        } else if (q > 1) {
          alpha = 0;
        }

        if (alpha <= 0.01) {
          wrap.style.visibility = "hidden";
          return;
        }
        wrap.style.visibility = "visible";
        wrap.style.opacity = `${alpha}`;

        // Smooth cinematic depth curve
        const depth = q <= 0
          ? Math.max(1, 1 - q * 0.45)
          : Math.max(NEAR, 1 - q * 0.25);
        wrap.style.transform = `scale(${1 / depth})`;

        // Burn transition
        const burn = clamp01((q - BURN_AT) / BURN_SPAN) * (1 + RAMP);
        if (burnt[i] !== burn) {
          burnt[i] = burn;
          block.style.setProperty("--b", `${burn}`);
          block.style.setProperty("--ab", `${0.35 + burn * 2.6}`);
        }
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = `${clamp01(1 - p / 0.12)}`;
      }
      if (active !== front) {
        active = front;
        if (counterRef.current) {
          counterRef.current.textContent = `${String(front + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        measure();
        update();
      });
    }

    win.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onResize);
    
    const ro = containerEl ? new ResizeObserver(onResize) : null;
    if (containerEl && ro) ro.observe(containerEl);

    // Also run a couple of animation frames on mount to ensure initial layout settles
    const timer = setTimeout(() => {
      measure();
      update();
    }, 100);

    return () => {
      clearTimeout(timer);
      win.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onResize);
      ro?.disconnect();
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, container]);

  const column =
    "relative w-[min(88vw,42rem)] text-center text-[clamp(1.5rem,5.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-foreground";

  if (prefersReducedMotion) {
    return (
      <div className={cn("w-full bg-background px-6 py-24", className)}>
        <div className="mx-auto grid max-w-2xl gap-10">
          {sections.map((body, i) => (
            <p key={i} className={cn(column, "w-full text-left")}>
              {body}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-background", className)}>
      <div
        ref={runwayRef}
        style={{ height: `calc(${runway} * ${count})` }}
        className="w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background flex flex-col justify-center items-center">
          <div
            ref={counterRef}
            className="pointer-events-none absolute bottom-6 left-8 z-10 text-[0.7rem] font-medium uppercase tracking-[0.22em] tabular-nums text-muted-foreground"
          />

          {hint ? (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-16 z-10 text-center transition-opacity duration-300"
            >
              <span className="relative text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground after:absolute after:left-1/2 after:top-full after:mt-2 after:h-8 after:w-px after:bg-gradient-to-b after:from-muted-foreground/50 after:to-transparent after:content-['']">
                {hint}
              </span>
            </div>
          ) : null}

          {sections.map((body, i) => (
            <div
              key={i}
              className="absolute inset-0 grid place-items-center will-change-transform"
              aria-hidden
            >
              <p
                ref={(node) => {
                  blockRefs.current[i] = node;
                }}
                className={column}
                style={
                  {
                    "--b": 0,
                    "--ab": 0.35,
                    textShadow:
                      "calc(var(--ab) * -1px) 0 rgb(255 45 85 / 0.85), calc(var(--ab) * 1px) 0 rgb(0 225 255 / 0.85)",
                  } as React.CSSProperties
                }
              >
                {Array.from(body).map((ch, k) =>
                  ch === " " ? (
                    " "
                  ) : (
                    <span
                      key={k}
                      className="opacity-[calc((var(--t,1)_+_0.09_-_var(--b,0))*11)] transition-none"
                    >
                      {ch}
                    </span>
                  ),
                )}
              </p>
            </div>
          ))}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{ backgroundImage: GRAIN, backgroundSize: "180px" }}
          />

          <p className="sr-only">{sections.join(" ")}</p>
        </div>
      </div>
    </div>
  );
}

export default ScrollBurnText;
