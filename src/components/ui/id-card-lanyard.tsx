"use client";

import React, { useEffect, useRef, useState } from "react";

export interface IDCardLanyardProps {
  /** Full name shown on the card and used for the back-face signature. */
  name?: string;
  /** Job title / role line under the name. */
  role?: string;
  /** Wordmark shown top-left on the front face. */
  brand?: string;
  /** Small caption under the wordmark. */
  brandTagline?: string;
  /** Three short values stacked top-right (e.g. your working pillars). */
  pillars?: [string, string, string];
  location?: string;
  idNumber?: string;
  validThru?: string;
  /** Custom logo image URL (e.g. /assets/img.png) */
  logoUrl?: string;
  /** Avatar image URL (defaults to mascot top image). */
  avatarUrl?: string;
  /** URL/label shown next to the back-face QR code. */
  site?: string;
  /** Social links shown as small icon buttons on the back face. Omit any you don't want rendered. */
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  /** Horizontal anchor for the lanyard clip: a percentage ("50%"), a px value ("120px"), or "calc(100% - 130px)" to anchor from the right edge. */
  anchorX?: string;
  /** Vertical anchor offset in px from the top of the viewport. */
  anchorY?: number;
  /** Stacking order of the overlay. Raise this if the card renders under other UI. */
  zIndex?: number;
  /** Position mode: "absolute" (contained within section) or "fixed" (fixed over entire viewport) */
  position?: "absolute" | "fixed";
  /** Show the "drag to swing" hint until the visitor first interacts with the card. */
  showHint?: boolean;
  className?: string;
}

const CSS = `
.idcl-root{
  --idcl-ink-faint:#5b6270;
  --idcl-accent:#e4e4e7;
  --idcl-accent-dim:#71717a;
  --idcl-card:#faf7f1;
  --idcl-card-2:#efeadf;
  --idcl-card-ink:#15171d;
  --idcl-card-soft:#666c78;
  --idcl-card-line:#e1dbcb;
  --idcl-font-display:'Archivo','Arial Narrow',sans-serif;
  --idcl-font-mono:'JetBrains Mono','Consolas',monospace;
  --idcl-font-script:'Caveat',cursive;
  font-family:'Work Sans',system-ui,sans-serif;
}
.idcl-root *{ box-sizing:border-box; }

/* overlay: transparent, click-through except on the card itself */
.idcl-stage{
  inset:0;
  z-index:var(--idcl-z, 60);
  pointer-events:none;
  overflow:visible;
}
.idcl-stage-fixed{ position:fixed; }
.idcl-stage-absolute{ position:absolute; }

.idcl-rope{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }

/* Card size */
.idcl-card{
  position:absolute;
  width:clamp(240px, 64vw, 290px);
  aspect-ratio: 236 / 460;
  perspective:1400px;
  cursor:grab; touch-action:none; user-select:none;
  transform-origin:top center;
  pointer-events:auto;
}
.idcl-card:active{ cursor:grabbing; }

.idcl-flipper{
  position:relative; width:100%; height:100%;
  transform-style:preserve-3d;
  -webkit-transform-style:preserve-3d;
}

.idcl-face{
  position:absolute; inset:0; border-radius:20px;
  padding:18px 18px 16px;
  display:flex; flex-direction:column;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  transform-style:preserve-3d;
  -webkit-transform-style:preserve-3d;
  box-shadow:
    0 36px 70px -18px rgba(0,0,0,.65),
    0 12px 24px -10px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.65),
    inset 0 0 0 1px rgba(0,0,0,.06);
}
.idcl-face::before{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:
    linear-gradient(180deg, rgba(255,255,255,.55) 0%, transparent 24%),
    radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.3px) 0 0/3px 3px;
  mix-blend-mode:multiply; opacity:.6;
}

.idcl-front{
  background:linear-gradient(165deg, var(--idcl-card), var(--idcl-card-2));
  align-items:stretch; text-align:left;
  transform:rotateY(0deg);
  -webkit-transform:rotateY(0deg);
}
.idcl-back{
  background:linear-gradient(165deg, var(--idcl-card-2), var(--idcl-card));
  transform:rotateY(180deg);
  -webkit-transform:rotateY(180deg);
}

.idcl-holo{
  position:absolute; top:16px; bottom:16px; right:6px; width:7px; border-radius:6px;
  background:repeating-linear-gradient(125deg, #eef1f7 0%, #cfd6e4 10%, #b9c2d6 20%, #e7ebf3 30%, #eef1f7 40%);
  background-size:220% 220%;
  animation:idcl-foil 7s linear infinite;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 0 7px rgba(255,255,255,.3);
}
@keyframes idcl-foil{ to{ background-position:220% 0%; } }
@media (prefers-reduced-motion: reduce){ .idcl-holo{ animation:none; } }

.idcl-hole{ width:38px; height:11px; background:var(--idcl-card-ink); border-radius:6px; margin:0 auto 12px; flex-shrink:0; opacity:.85; }

.idcl-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
.idcl-brand{ display:flex; align-items:center; gap:8px; }
.idcl-brand-logo{ width:22px; height:22px; object-fit:contain; border-radius:4px; flex-shrink:0; }
.idcl-brand-mark{ font-size:14px; color:var(--idcl-card-ink); line-height:1; margin-top:1px; }
.idcl-brand-text{ display:flex; flex-direction:column; }
.idcl-brand-text b{ font-family:var(--idcl-font-display); font-weight:800; font-size:13.5px; letter-spacing:.01em; color:var(--idcl-card-ink); line-height:1.2; }
.idcl-brand-text small{ font-family:var(--idcl-font-mono); font-size:7.5px; letter-spacing:.09em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-pillars{ display:flex; flex-direction:column; align-items:flex-end; gap:1.5px; }
.idcl-pillars span{ font-family:var(--idcl-font-mono); font-size:8.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }

/* Photo */
.idcl-photo{
  position:relative; width:100%; height:138px; border-radius:12px;
  background:#eae7de; overflow:hidden; margin-bottom:0px; flex-shrink:0;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.08), inset 0 2px 6px rgba(0,0,0,.12);
}
.idcl-photo svg{ width:100%; height:100%; display:block; }
.idcl-photo img{ width:100%; height:100%; display:block; object-fit:cover; object-position:center 35%; }
.idcl-verified{
  position:absolute; right:-6px; bottom:-6px; width:26px; height:26px; border-radius:50%;
  background:linear-gradient(160deg, #18181b, #27272a);
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 6px rgba(0,0,0,.4), 0 0 0 3px var(--idcl-card);
}
.idcl-verified svg{ width:13px; height:13px; }

/* Name on card - prominent, bold, clear */
.idcl-name{ margin:0 0 2px; font-family:var(--idcl-font-display); font-weight:800; font-size:23px; color:var(--idcl-card-ink); letter-spacing:-.015em; line-height:1.15; }
.idcl-role{ margin:0 0 12px; font-size:12px; color:var(--idcl-card-soft); font-weight:700; letter-spacing:.09em; text-transform:uppercase; }

.idcl-idrow{ width:100%; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:18px; }
.idcl-idrow-labels{ display:flex; flex-direction:column; gap:6px; font-family:var(--idcl-font-mono); }
.idcl-idrow-labels div{ display:flex; gap:9px; align-items:baseline; }
.idcl-idrow-labels span{ width:64px; flex-shrink:0; font-size:9px; letter-spacing:.06em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-idrow-labels b{ font-size:11.5px; font-weight:600; color:var(--idcl-card-ink); }

.idcl-footer{
  width:100%; margin-top:14px; padding-top:4px;
  text-align:center; font-family:var(--idcl-font-mono); font-size:10px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--idcl-card-soft);
}
.idcl-footer i{ color:var(--idcl-card-line); font-style:normal; margin:0 6px; }

.idcl-stripe{ width:100%; height:34px; background:repeating-linear-gradient(45deg, #1b1d24, #1b1d24 7px, #26282f 7px, #26282f 14px); border-radius:4px; margin-bottom:14px; }
.idcl-barcode{ display:flex; align-items:flex-end; gap:2.5px; height:38px; width:100%; background:#fff; border-radius:4px; padding:0 5px; margin-bottom:10px; overflow:hidden; }
.idcl-barcode span{ width:2.5px; background:#1a1c22; }
.idcl-idnum{ margin:0 0 10px; font-family:var(--idcl-font-mono); font-size:12px; font-weight:600; color:var(--idcl-card-ink); letter-spacing:.03em; display:flex; justify-content:space-between; font-variant-numeric: tabular-nums; }
.idcl-idnum em{ font-style:normal; color:var(--idcl-card-soft); }

.idcl-backrow{ display:flex; gap:14px; align-items:flex-start; margin-bottom:12px; }
.idcl-qr{ display:grid; grid-template-columns:repeat(9,1fr); gap:1.2px; width:68px; height:68px; background:#fff; padding:5px; border-radius:5px; flex-shrink:0; box-shadow:0 0 0 1px var(--idcl-card-line); }
.idcl-qr i{ background:transparent; }
.idcl-qr i.on{ background:#181a20; }
.idcl-qr.idcl-small{ width:54px; height:54px; padding:4px; }

.idcl-scan{ font-family:var(--idcl-font-mono); font-size:9.5px; color:var(--idcl-card-soft); line-height:1.5; padding-top:2px; text-align:left; }
.idcl-scan b{ color:var(--idcl-card-ink); display:block; font-size:10.5px; margin-bottom:2px; letter-spacing:.03em; }

.idcl-connect{ display:flex; align-items:center; justify-content:space-between; margin-top:16px; }
.idcl-connect span{ font-family:var(--idcl-font-mono); font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-connect-icons{ display:flex; gap:7px; }
.idcl-connect-icons a{
  width:28px; height:28px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:1px solid var(--idcl-card-line); color:var(--idcl-card-soft);
  transition:border-color .15s ease, color .15s ease, transform .15s ease;
}
.idcl-connect-icons a:hover{ border-color:var(--idcl-card-ink); color:var(--idcl-card-ink); transform:translateY(-1px); }
.idcl-connect-icons svg{ width:14px; height:14px; }

.idcl-sig{ margin-top:18px; }
.idcl-sig .idcl-script{ font-family:var(--idcl-font-script); font-size:32px; color:var(--idcl-card-ink); line-height:1; }
.idcl-sig small{ display:block; font-family:var(--idcl-font-mono); font-size:9px; letter-spacing:.08em; text-transform:uppercase; color:var(--idcl-card-soft); border-top:1px solid var(--idcl-card-line); margin-top:5px; padding-top:5px; }

.idcl-hint{
  position:absolute; top:20px; left:50%; transform:translateX(-50%);
  display:flex; align-items:center; gap:6px;
  background:rgba(10,12,16,.75);
  color:#f3f0e9;
  padding:8px 16px;
  border-radius:999px;
  font-family:var(--idcl-font-mono);
  font-size:12px; letter-spacing:.03em;
  pointer-events:none;
  opacity:1;
  transition:opacity .4s ease;
  white-space:nowrap;
  z-index:10;
}
.idcl-hint.idcl-hint-hidden{ opacity:0; }
.idcl-hint svg{ width:14px; height:14px; opacity:.75; flex-shrink:0; }
`;

export function IDCardLanyard({
  name = "Vishvjeet Singh Tanwar",
  role = "Designer & Builder",
  brand = "VISHVJEET",
  brandTagline = "Designer & Developer",
  pillars = ["Design", "Code", "Ship"],
  location = "Noida, UP",
  idNumber = "VT-2026",
  validThru = "03/2005",
  avatarUrl = "/assets/img.png",
  site = "vishvjeet.me",
  githubUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  anchorX = "46%",
  anchorY = 4,
  zIndex = 25,
  position = "absolute",
  showHint = false,
  className = "",
}: IDCardLanyardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);
  const qrBackRef = useRef<HTMLDivElement>(null);
  const qrFrontRef = useRef<HTMLDivElement>(null);
  const [interacted, setInteracted] = useState(false);

  // load the display fonts once
  useEffect(() => {
    const id = "idcl-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    const flipper = flipperRef.current;
    const barcodeEl = barcodeRef.current;
    const qrBackEl = qrBackRef.current;
    const qrFrontEl = qrFrontRef.current;
    if (!scene || !canvas || !card || !flipper || !barcodeEl || !qrBackEl || !qrFrontEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    barcodeEl.innerHTML = "";
    for (let i = 0; i < 32; i++) {
      const bar = document.createElement("span");
      bar.style.height = ((i * 37) % 100 > 40 ? 100 : 55) + "%";
      barcodeEl.appendChild(bar);
    }

    function buildQR(el: HTMLDivElement, seed: number) {
      el.innerHTML = "";
      const N = 9;
      const seedOn = new Set([
        0, 1, 2, 9, 10, 11, 18, 19, 20,
        6, 7, 8, 15, 16, 17, 24, 25, 26,
        54, 55, 56, 63, 64, 65, 72, 73, 74,
      ]);
      for (let i = 0; i < N * N; i++) {
        const cell = document.createElement("i");
        const pseudoRandom = (i * seed) % 97 < 46;
        if (seedOn.has(i) || pseudoRandom) cell.classList.add("on");
        el.appendChild(cell);
      }
    }
    buildQR(qrBackEl, 928371);
    buildQR(qrFrontEl, 574123);

    function resolveAnchorX() {
      const rect = scene!.getBoundingClientRect();
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return rect.width * 0.5;
      }
      const themeToggleEl = document.getElementById("theme-toggle-anchor") || document.querySelector("[data-theme-toggle]");
      if (themeToggleEl && scene) {
        const toggleRect = themeToggleEl.getBoundingClientRect();
        const targetX = toggleRect.left + toggleRect.width / 2 - rect.left;
        if (targetX > 40 && targetX < rect.width + 100) {
          return targetX;
        }
      }
      const v = anchorX.trim();
      const calcMatch = v.match(/^calc\(\s*100%\s*-\s*([\d.]+)px\s*\)$/);
      if (calcMatch) return rect.width - parseFloat(calcMatch[1]);
      if (v.endsWith("%")) return rect.width * (parseFloat(v) / 100);
      return parseFloat(v);
    }

    function resolveAnchorY() {
      const rect = scene!.getBoundingClientRect();
      const themeToggleEl = document.getElementById("theme-toggle-anchor") || document.querySelector("[data-theme-toggle]");
      if (themeToggleEl && scene && typeof window !== "undefined" && window.innerWidth >= 768) {
        const toggleRect = themeToggleEl.getBoundingClientRect();
        // Position top mounting loop snug directly beneath the theme toggle switch
        const targetY = toggleRect.bottom - rect.top + 5;
        if (targetY >= 0 && targetY < 180) {
          return targetY;
        }
      }
      return anchorY;
    }

    const anchor = { x: resolveAnchorX(), y: resolveAnchorY() };

    function drawRoundedRect(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }

    const NUM_POINTS = 18;
    const REST_LENGTH = 275;
    const SEGMENT_LENGTH = REST_LENGTH / (NUM_POINTS - 1);
    const GRAVITY = 0.55;
    const FRICTION = 0.98;
    const CONSTRAINT_ITERATIONS = 6;
    const TAP_THRESHOLD = 18;

    type Pt = { x: number; y: number; oldx: number; oldy: number; pinned: boolean };
    const points: Pt[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const y = anchor.y + i * SEGMENT_LENGTH;
      points.push({ x: anchor.x, y, oldx: anchor.x, oldy: y, pinned: i === 0 });
    }

    function resize() {
      const rect = scene!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + "px";
      canvas!.style.height = rect.height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newX = resolveAnchorX();
      const newY = resolveAnchorY();
      const dx = newX - anchor.x;
      const dy = newY - anchor.y;
      anchor.x = newX;
      anchor.y = newY;

      // Keep points synchronously locked with anchor when layout dimensions shift
      if ((dx !== 0 || dy !== 0) && !dragging) {
        for (let i = 0; i < points.length; i++) {
          points[i].x += dx;
          points[i].oldx += dx;
          points[i].y += dy;
          points[i].oldy += dy;
        }
      }
    }
    resize();

    let dragging = false;
    let flipped = false;
    let downPos = { x: anchor.x, y: anchor.y };
    let downTime = 0;
    let pointer = { x: anchor.x, y: anchor.y + REST_LENGTH };
    let lastPointer = { ...pointer };
    let velocity = { x: 0, y: 0 };

    let flipTarget = 0;
    let flipCurrent = 0;

    function getScenePos(e: PointerEvent) {
      const rect = scene!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function clampToScene(p: { x: number; y: number }) {
      const rect = scene!.getBoundingClientRect();
      const margin = 18;
      p.x = Math.max(margin, Math.min(rect.width - margin, p.x));
      p.y = Math.max(anchor.y + 20, Math.min(rect.height - 30, p.y));
      return p;
    }

    function updatePoints() {
      for (let i = 1; i < points.length; i++) {
        if (dragging && i === points.length - 1) continue;
        const p = points[i];
        const vx = (p.x - p.oldx) * FRICTION;
        const vy = (p.y - p.oldy) * FRICTION;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
    }

    function applyConstraints() {
      points[0].x = anchor.x;
      points[0].y = anchor.y;
      if (dragging) {
        const last = points[points.length - 1];
        last.x = pointer.x;
        last.y = pointer.y;
      }
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = (SEGMENT_LENGTH - dist) / dist;
          const offX = dx * diff * 0.5;
          const offY = dy * diff * 0.5;
          const p1Locked = p1.pinned;
          const p2Locked = dragging && i + 1 === points.length - 1;
          if (!p1Locked) {
            p1.x -= offX;
            p1.y -= offY;
          }
          if (!p2Locked) {
            p2.x += offX;
            p2.y += offY;
          }
        }
      }
    }

    function drawRope() {
      const rect = scene!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);

      if (points.length < 2) return;

      const path: { x: number; y: number; cx?: number; cy?: number }[] = [];
      path.push({ x: points[0].x, y: points[0].y });
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) * 0.5;
        const yc = (points[i].y + points[i + 1].y) * 0.5;
        path.push({ x: points[i].x, y: points[i].y, cx: xc, cy: yc });
      }
      const last = points[points.length - 1];
      path.push({ x: last.x, y: last.y });

      function strokeRibbon(style: string, width: number) {
        ctx!.beginPath();
        ctx!.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          const p = path[i];
          if (p.cx !== undefined) ctx!.quadraticCurveTo(p.x, p.y, p.cx, p.cy as number);
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.strokeStyle = style;
        ctx!.lineWidth = width;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      ctx!.save();
      ctx!.translate(3, 5);
      ctx!.globalAlpha = 0.5;
      strokeRibbon("#000000", 22);
      ctx!.restore();

      // Outer contrasting border (clearly visible on pure dark background)
      strokeRibbon("rgba(255, 255, 255, 0.4)", 20);

      // Main fabric strap body (tactile charcoal/graphite)
      strokeRibbon("#333742", 18);

      // Inner woven texture core
      strokeRibbon("#22252c", 14);

      // Center stitched reflective silver/white safety line
      strokeRibbon("rgba(255, 255, 255, 0.85)", 3);

      // Center dotted stitch pattern
      ctx!.save();
      ctx!.setLineDash([4, 4]);
      strokeRibbon("rgba(0, 0, 0, 0.7)", 2.5);
      ctx!.restore();

      const markIdx = Math.floor(points.length * 0.35);
      const m = points[markIdx];
      const mPrev = points[markIdx - 1];
      const mNext = points[markIdx + 1];
      if (m && mPrev && mNext) {
        const angle = Math.atan2(mNext.y - mPrev.y, mNext.x - mPrev.x) + Math.PI / 2;
        ctx!.save();
        ctx!.translate(m.x, m.y);
        ctx!.rotate(angle);
        ctx!.strokeStyle = "rgba(255,255,255,0.95)";
        ctx!.lineWidth = 2;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.beginPath();
        ctx!.moveTo(-5, 5);
        ctx!.lineTo(0, -5);
        ctx!.lineTo(5, 5);
        ctx!.stroke();
        ctx!.restore();
      }
    }

    function drawClip() {
      // 1. TOP HOLDER MOUNT (Sleek Proportional Strap Collar & Eyelet)
      ctx!.save();
      ctx!.translate(anchor.x, anchor.y);

      // (A) Top Metallic Eyelet / D-Ring Loop
      ctx!.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx!.lineWidth = 2.2;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      ctx!.arc(0, -7, 5.5, Math.PI, Math.PI * 2);
      ctx!.stroke();

      // (B) Hardware Collar Clamp (Clamps the 18px ribbon cleanly)
      const clampW = 22;
      const clampH = 11;
      const clampY = -5;

      // Soft drop shadow
      ctx!.fillStyle = "rgba(0, 0, 0, 0.55)";
      drawRoundedRect(ctx!, -clampW / 2, clampY + 2, clampW, clampH, 2.5);
      ctx!.fill();

      // Brushed Metal Finish
      const clampGrad = ctx!.createLinearGradient(-clampW / 2, clampY, clampW / 2, clampY + clampH);
      clampGrad.addColorStop(0, "#ffffff");
      clampGrad.addColorStop(0.3, "#c8ced8");
      clampGrad.addColorStop(0.7, "#7a828f");
      clampGrad.addColorStop(1, "#3c4048");
      ctx!.fillStyle = clampGrad;
      drawRoundedRect(ctx!, -clampW / 2, clampY, clampW, clampH, 2.5);
      ctx!.fill();

      // Metallic border highlight
      ctx!.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx!.lineWidth = 0.8;
      ctx!.stroke();

      // Center Crimp Groove
      ctx!.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(-clampW / 2 + 3, clampY + clampH / 2);
      ctx!.lineTo(clampW / 2 - 3, clampY + clampH / 2);
      ctx!.stroke();

      // Micro Twin Rivets
      ctx!.fillStyle = "#22252a";
      ctx!.beginPath();
      ctx!.arc(-6, clampY + clampH / 2, 1.4, 0, Math.PI * 2);
      ctx!.arc(6, clampY + clampH / 2, 1.4, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();

      // Bottom Swivel Clasp Connected Directly To Card Hole
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;

      ctx!.save();
      ctx!.translate(last.x, last.y);
      ctx!.rotate(angle);

      // Metal Clasp Loop with high-contrast chrome
      const claspGrad = ctx!.createLinearGradient(-12, -14, 12, 14);
      claspGrad.addColorStop(0, "#ffffff");
      claspGrad.addColorStop(0.4, "#a8adb6");
      claspGrad.addColorStop(0.8, "#5f636b");
      claspGrad.addColorStop(1, "#36393f");
      ctx!.fillStyle = claspGrad;
      ctx!.strokeStyle = "rgba(255,255,255,0.7)";
      ctx!.lineWidth = 1.2;
      drawRoundedRect(ctx!, -12, -16, 24, 20, 5);
      ctx!.fill();
      ctx!.stroke();

      // Chrome Swivel Pin
      const pinGrad = ctx!.createLinearGradient(-5, 0, 5, 0);
      pinGrad.addColorStop(0, "#a0a6b0");
      pinGrad.addColorStop(0.5, "#ffffff");
      pinGrad.addColorStop(1, "#707680");
      ctx!.fillStyle = pinGrad;
      drawRoundedRect(ctx!, -4, -6, 8, 16, 2);
      ctx!.fill();

      ctx!.restore();
    }

    function positionCard() {
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      card!.style.left = last.x - card!.offsetWidth / 2 + "px";
      card!.style.top = last.y - 2 + "px";
      card!.style.transform = `rotate(${angle}rad)`;
    }

    function updateFlip() {
      flipCurrent += (flipTarget - flipCurrent) * 0.14;
      flipper!.style.transform = `rotateY(${flipCurrent}deg)`;
    }

    let raf = 0;
    function loop() {
      updatePoints();
      applyConstraints();
      drawRope();
      drawClip();
      positionCard();
      updateFlip();
      raf = requestAnimationFrame(loop);
    }

    const onCardDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragging = true;
      setInteracted(true);
      downTime = performance.now();
      card!.setPointerCapture(e.pointerId);
      const pos = clampToScene(getScenePos(e));
      pointer = pos;
      lastPointer = pos;
      downPos = pos;
    };
    const onWindowMove = (e: PointerEvent) => {
      if (!dragging) return;
      const pos = clampToScene(getScenePos(e));
      velocity.x = pos.x - lastPointer.x;
      velocity.y = pos.y - lastPointer.y;
      lastPointer = pos;
      pointer = pos;
    };
    const onWindowUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const pos = getScenePos(e);
      const dist = Math.hypot(pos.x - downPos.x, pos.y - downPos.y);
      const elapsed = performance.now() - downTime;

      // Reliable 180° flip on any click / tap
      if (dist < 18 || elapsed < 350) {
        flipped = !flipped;
        flipTarget = flipped ? 180 : 0;
        const last = points[points.length - 1];
        last.oldx = last.x;
        last.oldy = last.y;
        return;
      }

      const last = points[points.length - 1];
      last.oldx = last.x - Math.max(-12, Math.min(12, velocity.x * 0.45));
      last.oldy = last.y - Math.max(-12, Math.min(12, velocity.y * 0.45));
    };
    const onResize = () => resize();

    card.addEventListener("pointerdown", onCardDown);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("resize", onResize);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onCardDown);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("resize", onResize);
    };
  }, [anchorX, anchorY]);

  return (
    <div className={`idcl-root ${className}`} style={{ "--idcl-z": zIndex } as React.CSSProperties}>
      <style>{CSS}</style>

      {/* stage container */}
      <div className={`idcl-stage ${position === "fixed" ? "idcl-stage-fixed" : "idcl-stage-absolute"}`} ref={sceneRef}>
        <canvas className="idcl-rope" ref={canvasRef} />

        <div className="idcl-card" ref={cardRef}>
          <div className="idcl-flipper" ref={flipperRef}>
            <div className="idcl-face idcl-front">
              <div className="idcl-hole" />
              <div className="idcl-holo" />

              <div className="idcl-header">
                <div className="idcl-brand">
                  <span className="idcl-brand-mark">▲</span>
                  <div className="idcl-brand-text">
                    <b>{brand}</b>
                    <small>{brandTagline}</small>
                  </div>
                </div>
                <div className="idcl-pillars">
                  {pillars.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>

              <div className="idcl-photo">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover object-[center_35%]"
                  />
                ) : (
                  <svg viewBox="0 0 182 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="idcl-faceGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#8fb0ff" />
                        <stop offset="1" stopColor="#3f5fd8" />
                      </linearGradient>
                      <pattern id="idcl-dots" width="6" height="6" patternUnits="userSpaceOnUse">
                        <circle cx="3" cy="3" r="0.8" fill="#ffffff" opacity="0.35" />
                      </pattern>
                    </defs>
                    <rect width="182" height="100" fill="#12151c" />
                    <circle cx="91" cy="62" r="46" fill="url(#idcl-faceGrad)" />
                    <path d="M42,46 Q91,-18 140,46 L140,66 Q91,38 42,66 Z" fill="#1c2029" />
                    <circle cx="72" cy="62" r="3.6" fill="#12151c" />
                    <circle cx="110" cy="62" r="3.6" fill="#12151c" />
                    <path d="M75,78 Q91,86 107,78" stroke="#12151c" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                    <rect width="182" height="100" fill="url(#idcl-dots)" />
                  </svg>
                )}
                <span className="idcl-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
              </div>

              <h2 className="idcl-name">{name}</h2>
              <p className="idcl-role">{role}</p>

              <div className="idcl-idrow">
                <div className="idcl-idrow-labels">
                  <div>
                    <span>ID</span>
                    <b>{idNumber}</b>
                  </div>
                  <div>
                    <span>Location</span>
                    <b>{location}</b>
                  </div>
                  <div>
                    <span>Valid Thru</span>
                    <b>{validThru}</b>
                  </div>
                </div>
                <div className="idcl-qr idcl-small" ref={qrFrontRef} />
              </div>

              <div className="idcl-footer">
                Build<i>·</i>Ship<i>·</i>Iterate
              </div>
            </div>

            <div className="idcl-face idcl-back">
              <div className="idcl-hole" />
              <div className="idcl-holo" />
              <div className="idcl-stripe" />

              <div className="idcl-idnum">
                <span>NO. {idNumber}</span>
                <em>VALID {validThru}</em>
              </div>
              <div className="idcl-barcode" ref={barcodeRef} />

              <div className="idcl-backrow">
                <div className="idcl-qr" ref={qrBackRef} />
                <div className="idcl-scan">
                  <b>Scan for portfolio</b>
                  {site}
                  <br />
                  Full case studies,
                  <br />
                  source &amp; credits.
                </div>
              </div>

              {(githubUrl || linkedinUrl || instagramUrl || twitterUrl) && (
                <div className="idcl-connect">
                  <span>Connect</span>
                  <div className="idcl-connect-icons">
                    {githubUrl && (
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                    {linkedinUrl && (
                      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                    {twitterUrl && (
                      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                      </a>
                    )}
                    {instagramUrl && (
                      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="idcl-sig">
                <div className="idcl-script">{name}</div>
                <small>Authorized Signature</small>
              </div>
            </div>
          </div>
        </div>

        {showHint && (
          <div className={`idcl-hint ${interacted ? "idcl-hint-hidden" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4" />
            </svg>
            Drag to swing · Click to flip
          </div>
        )}
      </div>
    </div>
  );
}

export default IDCardLanyard;
