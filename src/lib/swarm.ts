/**
 * Swarm rebuild: click "Motion" and the page blanks while a swarm of named cursors builds it back,
 * block by block, the way a design tool would:
 *   1. a cursor drags out a frame (live W x H badge, corner handles)
 *   2. the frame stays as a blueprint while the content is created inside it:
 *      text is typed line by line with a caret, images are scanned in top to bottom,
 *      cards and panels get their borders and fills laid down
 *   3. the blueprint dissolves and the cursor moves on.
 * The page scrolls itself as each screen is finished, so you can sit back and watch; touch the wheel,
 * keys or screen to take over. At the end the page returns to the top and offers "Go live". Esc exits.
 *
 * Original implementation of the idea behind "Swarm" by Joel Califa
 * (https://califa.github.io/swarm-site/). No code is copied from that project
 * or from the Swarm Rebuild extension.
 */

export type SwarmSound = "press" | "release" | "type" | "done";
export interface SwarmOptions {
  sound?: (kind: SwarmSound) => void;
  onExit?: () => void;
}

type Kind = "text" | "media" | "box";

interface Cur {
  el: HTMLElement;
  x: number;
  y: number;
  off: [number, number];
  bend: number;
  skill: number; // personality: some cursors are quick, some careful
  busy: boolean;
  px: number;
  rot: number;
}

/* Cursor name tags: edit freely (keep them short). Matches COLORS by index. */
const NAMES = ["kitsune", "segfault", "ronin", "daemon", "sumi", "0xdead", "wraith", "tanuki", "kernel", "overflow", "oni", "nullptr"];
/* Muted earth tones: distinct per cursor, but no blue, purple or neon. Edit freely. */
const COLORS = ["#e07a5f", "#d9a441", "#81b29a", "#c8553d", "#e5c9a0", "#a3b18a", "#d98e73", "#f2cc8f", "#b08968", "#c9b79c", "#cf9d7a", "#9fb59a"];
const IGNORE =
  '[data-sw-ignore],.staggered-menu-wrapper,.sw-layer,.sw-bar,dialog,[aria-hidden="true"],script,style,noscript,svg *';
/* Split-text headings (one span per word or letter, hover-roll duplicates) must be built as ONE block. */
const READ = "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,label";
const ACT = "a,button";

let live = false;
let done = false;
let main: HTMLElement | null = null;
let layer: HTMLElement | null = null;
let bar: HTMLElement | null = null;
let obs: MutationObserver | null = null;
let timer: number | undefined;
let cursors: Cur[] = [];
let queue: HTMLElement[] = [];
let all: HTMLElement[] = [];
let seen = new WeakSet<HTMLElement>();
let blueprints = new Map<HTMLElement, HTMLElement>();
let active = 0;
let builtN = 0;
let maxP = 0;
let t0 = 0;
let auto = true;
let scrolling = false;
let scrollTok = 0;
let lastH = 0;
let still = 0;
let mx = 0;
let my = 0;
let opts: SwarmOptions = {};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const linear = (t: number) => t;
/** Slight overshoot, then settle: how a dragged frame feels in a real design tool. */
const easeOutBack = (t: number) => 1 + 1.8 * Math.pow(t - 1, 3) + 0.8 * Math.pow(t - 1, 2);
/** Typing in bursts rather than a constant crawl (still ends exactly at 1). */
const bursty = (t: number) => t + 0.012 * Math.sin(2 * Math.PI * 7 * t);
const jitter = () => 0.85 + Math.random() * 0.3;

function tween(ms: number, fn: (k: number, t: number) => void, e: (t: number) => number = ease): Promise<void> {
  return new Promise((res) => {
    const s = performance.now();
    const f = (n: number) => {
      const t = Math.min(1, (n - s) / ms);
      fn(e(t), t);
      if (t < 1 && live) requestAnimationFrame(f);
      else res();
    };
    requestAnimationFrame(f);
  });
}

const put = (c: Cur) => {
  c.el.style.transform = `translate(${c.x}px,${c.y}px)`;
  // the arrow leans slightly into its direction of travel
  const vx = c.x - c.px;
  c.px = c.x;
  c.rot += (Math.max(-14, Math.min(14, vx * 0.5)) - c.rot) * 0.25;
  c.el.style.setProperty("--rot", `${c.rot.toFixed(1)}deg`);
};
const move = (c: Cur, x: number, y: number, ms: number) => {
  const x0 = c.x;
  const y0 = c.y;
  return tween(ms, (k) => {
    c.x = x0 + (x - x0) * k;
    c.y = y0 + (y - y0) * k;
    put(c);
  });
};
const onPointer = (e: PointerEvent) => {
  mx = e.clientX;
  my = e.clientY;
};
const TAKEOVER_KEYS = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
const onKey = (e: KeyboardEvent) => {
  if (!live) return;
  if (e.key === "Escape") stopSwarm();
  else if (e.key === " ") {
    if ((e.target as HTMLElement | null)?.closest("button,a,input,textarea")) return;
    if (!done) {
      e.preventDefault();
      setAuto(!auto);
    }
  } else if (TAKEOVER_KEYS.includes(e.key)) setAuto(false);
};
const onUser = () => {
  if (!live) return;
  if (done) {
    scrollTok++; // let the visitor interrupt the return to the top
    scrolling = false;
  } else setAuto(false);
};

/* ------------------------------------------------------------------ scanning */

function alphaOf(c: string): number {
  if (!c || c === "transparent") return 0;
  const sl = c.match(/\/\s*([\d.]+)(%?)/);
  if (sl) return parseFloat(sl[1]) / (sl[2] ? 100 : 1);
  const m = c.match(/^rgba\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(",");
    return p.length > 3 ? parseFloat(p[3]) : 1;
  }
  return 1;
}

/** Does this element draw its own panel (fill, border, shadow)? Those get a "box" build. */
function hasChrome(el: HTMLElement): boolean {
  const cs = getComputedStyle(el);
  if (alphaOf(cs.backgroundColor) > 0.04 || cs.backgroundImage !== "none") return true;
  if (cs.boxShadow !== "none") return true;
  return parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none" && alphaOf(cs.borderTopColor) > 0.05;
}

function scan(root: Element) {
  if (!main) return;
  const m = main;
  const fixedCache = new Map<Element, boolean>();
  const isFixed = (e: Element | null): boolean => {
    if (!e || e === m) return false;
    const hit = fixedCache.get(e);
    if (hit !== undefined) return hit;
    const p = getComputedStyle(e).position;
    const v = p === "fixed" || p === "sticky" || isFixed(e.parentElement);
    fixedCache.set(e, v);
    return v;
  };
  const els: Element[] = [root, ...Array.from(root.querySelectorAll("*"))];
  for (const el of els) {
    if (!(el instanceof HTMLElement) || el === m) continue;
    if (el.closest(IGNORE)) continue;
    const media = el.matches("img,video");
    const own = !media && Array.from(el.childNodes).some((n) => n.nodeType === 3 && !!n.textContent?.trim());
    let kind: Kind;
    let t: HTMLElement | null = el;
    if (media) kind = "media";
    else if (own) {
      kind = "text";
      const blk = el.closest<HTMLElement>(READ) ?? el.closest<HTMLElement>(ACT);
      if (blk && blk !== m && m.contains(blk)) t = blk;
      // climb out of inline, inline-block and inline-flex fragments (words, letters, wrappers)
      while (t && t !== m && getComputedStyle(t).display.startsWith("inline")) t = t.parentElement;
    } else {
      kind = "box";
      if (!hasChrome(el)) continue;
    }
    if (!t || t === m || seen.has(t) || !m.contains(t)) continue;
    if (t.closest(IGNORE) || isFixed(t)) continue;
    const r = t.getBoundingClientRect();
    if (r.width < 4 || r.height < 4 || r.height > innerHeight * 1.5) continue;
    if (kind === "box") {
      const fullBleed = r.width >= innerWidth * 0.97 && r.height >= innerHeight * 0.5;
      if (r.width < 40 || r.height < 28 || r.height > innerHeight * 1.2 || fullBleed) continue;
    }
    seen.add(t);
    t.setAttribute("data-sw", kind);
    all.push(t);
    queue.push(t);
  }
}

const eligible = (t: HTMLElement) => {
  const r = t.getBoundingClientRect();
  return t.isConnected && r.width > 0 && r.bottom > 0 && r.top < innerHeight + 60;
};

/** Take the closest unbuilt block near the top of the queue, so cursors spread out and travel less. */
function pick(c: Cur): HTMLElement | null {
  queue = queue.filter((t) => t.isConnected);
  let best = -1;
  let bd = Infinity;
  let n = 0;
  for (let i = 0; i < queue.length && n < 14; i++) {
    const r = queue[i].getBoundingClientRect();
    if (!(r.width > 0 && r.bottom > 0 && r.top < innerHeight + 60)) continue;
    const kd = queue[i].getAttribute("data-sw");
    // structure first (panels), then images, then text: the way a page really gets laid out
    const rank = kd === "box" ? 0 : kd === "media" ? 120 : 240;
    const d = Math.hypot(c.x - r.left, c.y - r.top) + n * 30 + rank;
    n++;
    if (d < bd) {
      bd = d;
      best = i;
    }
  }
  return best >= 0 ? queue.splice(best, 1)[0] : null;
}

/** 1 = relaxed. Rises (up to 4x) when a screen is dense, so text-heavy areas don't drag on. */
function pace(): number {
  const n = queue.reduce((a, t) => a + (eligible(t) ? 1 : 0), 0);
  const est = (n * 1.6) / Math.max(1, cursors.length);
  return Math.max(1, Math.min(4, est / 5));
}

/* ------------------------------------------------------------------- geometry */

/**
 * Rect to draw. Vertical extent is always the element's own box (stable even when split-text words are
 * still translated off-screen by their entrance animation); horizontal extent hugs the text.
 */
function rectOf(t: HTMLElement): DOMRect {
  const box = t.getBoundingClientRect();
  if (t.matches("img,video") || t.getAttribute("data-sw") === "box") return box;
  const rg = document.createRange();
  rg.selectNodeContents(t);
  const g = rg.getBoundingClientRect();
  if (g.width < 2) return box;
  const left = Math.max(box.left, g.left);
  const right = Math.min(box.right, g.right);
  if (right - left < 2) return box;
  return new DOMRect(left, box.top, right - left, box.height);
}

/** Keep every blueprint frame glued to its element while the page scrolls. */
function track() {
  if (!live) return;
  blueprints.forEach((bx, t) => {
    if (!t.isConnected) {
      bx.remove();
      blueprints.delete(t);
      return;
    }
    const r = rectOf(t);
    bx.style.left = `${r.left}px`;
    bx.style.top = `${r.top}px`;
    bx.style.width = `${r.width}px`;
    bx.style.height = `${r.height}px`;
    bx.style.display = r.bottom < -20 || r.top > innerHeight + 20 ? "none" : "";
  });
  requestAnimationFrame(track);
}

/** Move along a gentle arc, chasing the target's live position (it may scroll or animate). */
function travel(c: Cur, target: () => [number, number], ms: number) {
  const x0 = c.x;
  const y0 = c.y;
  return tween(ms, (k, t) => {
    const [tx, ty] = target();
    const dx = tx - x0;
    const dy = ty - y0;
    const len = Math.hypot(dx, dy) || 1;
    const bend = Math.min(70, len * 0.18) * c.bend * Math.sin(Math.PI * t);
    c.x = x0 + dx * k + (-dy / len) * bend;
    c.y = y0 + dy * k + (dx / len) * bend;
    put(c);
  });
}

/* ---------------------------------------------------------------- auto-scroll */

function scrollBy(dy: number, ms: number) {
  const tok = ++scrollTok;
  scrolling = true;
  const y0 = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  const y1 = Math.max(0, Math.min(max, y0 + dy));
  return tween(ms, (k) => {
    if (tok === scrollTok) window.scrollTo({ top: y0 + (y1 - y0) * k, behavior: "instant" as ScrollBehavior });
  }).then(() => {
    if (tok === scrollTok) scrolling = false;
  });
}

/** Bring the next unbuilt content into view (or nudge down so lazy sections mount). */
function autoStep() {
  const tops = queue
    .filter((t) => t.isConnected)
    .map((t) => t.getBoundingClientRect().top)
    .filter((top) => top >= innerHeight - 60);
  let dy = innerHeight * 0.6;
  if (tops.length) dy = Math.max(220, Math.min(innerHeight * 0.9, Math.min(...tops) - innerHeight * 0.3));
  scrollBy(dy, Math.min(1600, 700 + dy * 0.6));
}

function setAuto(v: boolean) {
  auto = v;
  if (!v) {
    scrollTok++;
    scrolling = false;
  }
  if (!bar || done) return;
  const b = bar.querySelector(".sw-auto") as HTMLButtonElement;
  b.textContent = v ? "Auto-scroll: on" : "Auto-scroll: off";
  b.setAttribute("aria-pressed", String(v));
  (bar.querySelector(".sw-msg") as HTMLElement).textContent = v ? "Sit back, it scrolls itself" : "Scroll and the swarm follows";
}

function progress() {
  if (!bar || done) return;
  const p = all.length ? Math.round((builtN / all.length) * 100) : 0;
  maxP = Math.min(100, Math.max(maxP, p));
  (bar.querySelector(".sw-pct") as HTMLElement).textContent = `${maxP}%`;
  (bar.querySelector(".sw-prog i") as HTMLElement).style.width = `${maxP}%`;
}


/* ------------------------------------------------------------------ the build */

const div = (cls: string) => {
  const d = document.createElement("div");
  d.className = cls;
  layer?.appendChild(d);
  return d;
};

/**
 * Text is typed line by line: the cursor clicks in, the caret blinks, then a staircase clip grows while
 * the caret rides its edge. Long passages occasionally get a small slip and a correction.
 */
async function typeText(c: Cur, t: HTMLElement, sp: number) {
  const cs = getComputedStyle(t);
  const fs = parseFloat(cs.fontSize) || 16;
  const lhRaw = parseFloat(cs.lineHeight);
  const lh0 = Number.isNaN(lhRaw) ? fs * 1.2 : lhRaw;
  const n = Math.max(1, Math.round(t.getBoundingClientRect().height / lh0));
  const chars = (t.textContent || "").trim().length;
  const caret = div("sw-caret");
  caret.style.setProperty("--c", c.el.style.getPropertyValue("--c"));
  let lastTick = -1;

  const show = (pr: number) => {
    const b = t.getBoundingClientRect();
    const g = rectOf(t);
    const lh = b.height / n;
    const x0 = g.left - b.left;
    const p = pr * n;
    const L = Math.min(n - 1, Math.max(0, Math.floor(p)));
    const f = p - L;
    const xr = x0 + f * g.width;
    t.style.clipPath = `polygon(0 0,${b.width}px 0,${b.width}px ${L * lh}px,${xr}px ${L * lh}px,${xr}px ${(L + 1) * lh}px,0 ${(L + 1) * lh}px)`;
    caret.style.left = `${b.left + xr}px`;
    caret.style.top = `${b.top + L * lh}px`;
    caret.style.height = `${lh}px`;
    c.x = b.left + xr;
    c.y = b.top + (L + 1) * lh;
    put(c);
    const tick = Math.floor((pr * chars) / 4);
    if (tick !== lastTick) {
      lastTick = tick;
      opts.sound?.("type");
    }
  };

  t.style.clipPath = "polygon(0 0,0 0,0 0)";
  t.setAttribute("data-sw-built", "");
  // glide from the frame corner to the start of the first line, then click in
  const b0 = t.getBoundingClientRect();
  const g0 = rectOf(t);
  await move(c, g0.left, b0.top + b0.height / n, Math.max(90, 220 / sp));
  if (!live) return;
  show(0);
  caret.classList.add("blink");
  await sleep(Math.max(90, 320 / sp));
  caret.classList.remove("blink");

  const run = (a: number, b: number, ms: number) => tween(ms, (k) => show(a + (b - a) * k), bursty);
  const dur = Math.max(160, Math.min(1300, 250 + chars * 8) / sp);
  if (chars > 40 && sp < 2.5 && Math.random() < 0.18) {
    const stop = 0.35 + Math.random() * 0.4;
    const back = 0.05;
    await run(0, stop, dur * stop);
    await sleep(160); // notice the slip
    await run(stop, stop - back, 170); // backspace
    await sleep(140);
    await run(stop - back, 1, dur * (1 - stop + back));
  } else await run(0, 1, dur);
  t.style.clipPath = "";
  caret.remove();
}

/** Images and video are scanned in from top to bottom, like a render pass. */
async function scanIn(c: Cur, t: HTMLElement, sp: number) {
  const line = div("sw-scan");
  line.style.setProperty("--c", c.el.style.getPropertyValue("--c"));
  t.style.clipPath = "inset(0 0 100% 0)";
  t.setAttribute("data-sw-built", "");
  await tween(
    Math.max(220, 600 / sp),
    (k) => {
      const b = t.getBoundingClientRect();
      const y = b.top + k * b.height;
      t.style.clipPath = `inset(0 0 ${(1 - k) * 100}% 0)`;
      line.style.left = `${b.left}px`;
      line.style.width = `${b.width}px`;
      line.style.top = `${y}px`;
      c.x = b.right;
      c.y = y;
      put(c);
    },
    easeOut
  );
  t.style.clipPath = "";
  line.remove();
}

async function build(c: Cur, t: HTMLElement, sp: number) {
  if (!layer) return;
  sp *= c.skill;
  const kind = (t.getAttribute("data-sw") as Kind) || "text";
  const color = c.el.style.getPropertyValue("--c");
  const start = rectOf(t);

  await travel(
    c,
    () => {
      const q = rectOf(t);
      return [q.left, q.top];
    },
    Math.max(160, (Math.min(600, 250 + Math.hypot(c.x - start.left, c.y - start.top) * 0.3) / sp) * jitter())
  );
  if (!live || !layer) return;

  /* 1. drag out the frame */
  const box = div("sw-box");
  const badge = document.createElement("i");
  box.style.setProperty("--c", color);
  box.appendChild(badge);
  opts.sound?.("press");
  (c.el.firstElementChild as HTMLElement).style.setProperty("--s", "0.8");
  const rp = div("sw-ripple"); // click feedback at the press point
  rp.style.setProperty("--c", color);
  rp.style.left = `${c.x}px`;
  rp.style.top = `${c.y}px`;
  setTimeout(() => rp.remove(), 520);
  const diag = Math.hypot(start.width, start.height);
  await tween(
    Math.max(130, (Math.min(700, 220 + diag * 0.55) / sp) * jitter()),
    (k, tt) => {
      const q = rectOf(t);
      const cw = q.width * k;
      // height lags a touch behind width, so the drag path curves instead of running dead straight
      const ch = q.height * easeOutBack(Math.min(1, Math.max(0, tt * 1.12 - 0.06)));
      box.style.left = `${q.left}px`;
      box.style.top = `${q.top}px`;
      box.style.width = `${cw}px`;
      box.style.height = `${ch}px`;
      c.x = q.left + cw;
      c.y = q.top + ch;
      put(c);
      badge.textContent = `${Math.round(cw)} × ${Math.round(ch)}`;
    },
    easeOutBack
  );
  (c.el.firstElementChild as HTMLElement).style.removeProperty("--s");
  opts.sound?.("release");
  if (!live) return;

  /* 2. the frame stays as a blueprint while the content is created inside it */
  box.classList.add("bp");
  if (start.width >= 120 && start.height >= 24) {
    badge.textContent = kind === "text" ? t.tagName.toLowerCase() : kind === "media" ? "image" : "box";
  } else badge.style.display = "none";
  blueprints.set(t, box);
  await sleep(90 / sp);
  if (!live) return;

  if (kind === "text") await typeText(c, t, sp);
  else if (kind === "media") await scanIn(c, t, sp);
  else {
    t.setAttribute("data-sw-built", "");
    await sleep(70 / sp);
  }

  /* 3. dissolve the blueprint */
  t.setAttribute("data-sw-built", "");
  builtN++;
  progress();
  blueprints.delete(t);
  box.style.opacity = "0";
  setTimeout(() => box.remove(), 450);
}

async function worker(c: Cur) {
  while (live && !done) {
    const t = pick(c);
    if (!t) {
      // idle: often wander over to watch a busy colleague, otherwise drift near the pointer
      const busy = cursors.filter((o) => o !== c && o.busy);
      const w = busy.length && Math.random() < 0.6 ? busy[Math.floor(Math.random() * busy.length)] : null;
      const tx = (w ? w.x + c.off[0] * 0.5 : mx + c.off[0]) + (Math.random() * 30 - 15);
      const ty = (w ? w.y + c.off[1] * 0.5 : my + c.off[1]) + (Math.random() * 30 - 15);
      await move(c, tx, ty, 1800);
      await sleep(500);
      continue;
    }
    active++;
    c.busy = true;
    try {
      const sp = pace();
      if (sp < 2) await sleep((Math.random() * 160) / sp); // a beat of "deciding" before moving on
      await build(c, t, sp);
    } finally {
      active--;
      c.busy = false;
    }
  }
}

const atBottom = () => scrollY + innerHeight >= document.documentElement.scrollHeight - 8;

function setBar(text: string, skip: string, exit: string, onSkip: () => void) {
  if (!bar) return;
  (bar.querySelector(".sw-msg") as HTMLElement).textContent = text;
  const s = bar.querySelector(".sw-skip") as HTMLButtonElement;
  s.textContent = skip;
  s.onclick = onSkip;
  (bar.querySelector(".sw-exit") as HTMLButtonElement).textContent = exit;
}

function finale() {
  done = true;
  all.forEach((e) => e.setAttribute("data-sw-built", ""));
  const secs = Math.max(1, Math.round((performance.now() - t0) / 1000));
  (bar?.querySelector(".sw-prog i") as HTMLElement | null)?.style.setProperty("width", "100%");
  ["sw-pct", "sw-hint"].forEach((cl) => (bar?.querySelector(`.${cl}`) as HTMLElement | null)?.style.setProperty("display", "none"));
  setBar(`Rebuilt in ${secs}s`, "Replay", "Go live", () => {
    stopSwarm();
    startSwarm(opts);
  });
  (bar?.querySelector(".sw-auto") as HTMLElement | null)?.style.setProperty("display", "none");
  if (auto) scrollBy(-scrollY, 1500);
  opts.sound?.("done");
  const f = () => {
    if (!live || !done) return;
    cursors.forEach((c) => {
      c.x += (mx + c.off[0] - c.x) * 0.06;
      c.y += (my + c.off[1] - c.y) * 0.06;
      put(c);
    });
    requestAnimationFrame(f);
  };
  f();
}

/* ----------------------------------------------------------------- lifecycle */

export function isSwarmRunning() {
  return live;
}

export function startSwarm(options: SwarmOptions = {}): "started" | "reduced" | "unavailable" {
  if (live) return "started";
  if (typeof window === "undefined") return "unavailable";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  main = document.querySelector("main");
  if (!main) return "unavailable";

  opts = options;
  live = true;
  done = false;
  queue = [];
  all = [];
  seen = new WeakSet();
  blueprints = new Map();
  active = 0;
  builtN = 0;
  maxP = 0;
  t0 = performance.now();
  mx = innerWidth / 2;
  my = innerHeight / 2;
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

  scan(main);
  document.body.classList.add("swarming");
  obs = new MutationObserver((muts) => {
    muts.forEach((mu) =>
      mu.addedNodes.forEach((n) => {
        if (n instanceof Element) scan(n);
      })
    );
  });
  obs.observe(main, { childList: true, subtree: true });

  layer = document.createElement("div");
  layer.className = "sw-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);
  const title = document.createElement("div");
  title.className = "sw-title";
  const host = location.hostname;
  title.textContent = `Rebuilding ${/^(localhost|127\.|\d)/.test(host) ? "this page" : host.replace(/^www\./, "")}`;
  layer.appendChild(title);
  setTimeout(() => title.remove(), 2300);

  bar = document.createElement("div");
  bar.className = "sw-bar";
  bar.setAttribute("role", "status");
  bar.innerHTML =
    '<div class="sw-prog" aria-hidden="true"><i></i></div><span class="sw-pct">0%</span><span class="sw-msg"></span><button type="button" class="sw-auto" aria-pressed="true"></button><button type="button" class="sw-skip">Skip</button><button type="button" class="sw-exit">Exit</button><span class="sw-hint">Esc exit · Space auto-scroll</span>';
  document.body.appendChild(bar);
  setBar("", "Skip", "Exit", stopSwarm);
  (bar.querySelector(".sw-exit") as HTMLButtonElement).onclick = stopSwarm;
  auto = true;
  scrolling = false;
  lastH = 0;
  still = 0;
  setAuto(true);
  (bar.querySelector(".sw-auto") as HTMLButtonElement).onclick = () => setAuto(!auto);

  const n = innerWidth < 700 ? 7 : 12;
  cursors = [];
  for (let i = 0; i < n; i++) {
    const el = document.createElement("div");
    el.className = "sw-cur";
    el.style.setProperty("--c", COLORS[i % COLORS.length]);
    el.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.6 3.9C4.2 3.1 4.9 2.4 5.7 2.8L20.6 9.4C21.5 9.8 21.4 11.1 20.4 11.3L13.9 12.9C13.4 13 13 13.4 12.9 13.9L11.3 20.4C11.1 21.4 9.8 21.5 9.4 20.6Z"/></svg>';
    const tag = document.createElement("span");
    tag.textContent = NAMES[i % NAMES.length];
    el.appendChild(tag);
    layer.appendChild(el);
    cursors.push({
      skill: 0.82 + Math.random() * 0.4,
      busy: false,
      px: innerWidth / 2,
      rot: 0,
      el,
      x: innerWidth / 2,
      y: innerHeight / 2,
      off: [Math.cos(i * 2.4) * (60 + i * 14), Math.sin(i * 2.4) * (60 + i * 14)],
      bend: i % 2 ? 1 : -1,
    });
  }

  addEventListener("pointermove", onPointer);
  addEventListener("keydown", onKey);
  addEventListener("wheel", onUser, { passive: true });
  addEventListener("touchstart", onUser, { passive: true });
  requestAnimationFrame(track);

  tween(900, (k, t) =>
    cursors.forEach((c, i) => {
      const a = t * 4 + (i / cursors.length) * Math.PI * 2;
      const rad = 110 * (1 - k * 0.2);
      c.x = innerWidth / 2 + Math.cos(a) * rad;
      c.y = innerHeight / 2 + Math.sin(a) * rad;
      put(c);
    })
  ).then(() => {
    if (!live) return;
    cursors.forEach((c, i) => setTimeout(() => worker(c), i * 90));
    timer = window.setInterval(() => {
      if (live && !done) progress();
      if (!live || done || active > 2) return;
      if (queue.some(eligible)) return;
      const h = document.documentElement.scrollHeight;
      if (atBottom()) {
        // at the end and the page height has stopped changing (lazy sections finished mounting)
        still = h === lastH ? still + 1 : 0;
        lastH = h;
        if (active === 0 && still >= 2) finale();
        return;
      }
      still = 0;
      lastH = h;
      if (auto && !scrolling) autoStep();
    }, 400);
  });
  return "started";
}

export function stopSwarm() {
  if (!live && !layer) return;
  live = false;
  done = false;
  clearInterval(timer);
  obs?.disconnect();
  obs = null;
  removeEventListener("pointermove", onPointer);
  removeEventListener("keydown", onKey);
  removeEventListener("wheel", onUser);
  removeEventListener("touchstart", onUser);
  scrollTok++;
  scrolling = false;
  document.body.classList.remove("swarming");
  all.forEach((e) => {
    e.removeAttribute("data-sw");
    e.removeAttribute("data-sw-built");
    e.style.clipPath = "";
  });
  layer?.remove();
  bar?.remove();
  layer = bar = null;
  cursors = [];
  queue = [];
  all = [];
  blueprints = new Map();
  active = 0;
  opts.onExit?.();
}