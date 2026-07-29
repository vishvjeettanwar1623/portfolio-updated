# Portfolio Project Specification & User Preferences Guide

This document contains the complete context, architectural breakdown, design standards, and specific user preferences for **Vishvjeet Singh Tanwar's Portfolio**. Pass this file to any new AI agent session to ensure instant alignment with the project and coding standards.

---

## 1. Project Overview & Tech Stack

- **Developer / Designer**: Vishvjeet Singh Tanwar
- **Domain**: `vishvjeet.me`
- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System
- **Animation & Graphics Libraries**:
  - **Framer Motion**: Page transitions, 3D scroll effects, block turning, layout animations
  - **GSAP**: `StaggeredMenu` navigation panel and `FlowingMenu` infinite skill marquee
  - **Three.js**: `LiquidEther` interactive WebGL fluid background
  - **Lucide React**: Modern iconography

---

## 2. User Preferences & Design Standards (STRICT RULES)

### 🎨 Aesthetic & Visual Style
- **Monochrome & Deep Dark Mode Only**:
  - Pitch black (`#000000`), deep obsidian (`#080808`), and dark neutral backgrounds (`#121212`).
  - High-contrast white text with subtle translucent glassmorphism borders (`border-white/10` to `border-white/25`).
  - **NEVER use blue, purple, or neon colors**.

- **NO NEON GLOWS OR ARTIFICIAL AURA RINGS (STRICT)**:
  - The user **strongly dislikes** neon glows, pulsing glow overlays (`shadow-[0_0_30px_...]`), or generic "AI-style" aura rings (`animate-ping`).
  - Keep all icon nodes, badges, borders, and cards clean, sharp, monochrome, and handcrafted.

- **NO CARD NUMBERING (STRICT)**:
  - Do **NOT** add number badges like `01`, `02`, `08` anywhere on project cards or section cards.

---

### 🔤 Typography System
- **Brand & Loading Logo**: `vishvjeet.me` in **Surgena** font (`font-surgena font-bold tracking-tighter lowercase`).
- **Section Headings**: **Audiowide** font (`font-[family-name:var(--font-audiowide)] uppercase tracking-[2px] sm:tracking-[5px] text-white`).
- **Hero Staired Name**: `Vishvjeet Singh Tanwar` in Surgena font with `ShinyText` effect.
- **Staggered Navigation Menu**: `Surgena` font for default links; transitions to **Bungee Outline** with solid strokes on hover.

---

### 🎬 Animation & Motion Guidelines
- **Loading Screen Reveal**:
  - 3D Block Turning character tiles for `vishvjeet.me` on a pitch-black screen.
  - Each character flips 180° on its horizontal axis inside a clean 3D glass tile.
  - Followed by a theatrical **Black Curtain Upward Lift** (`y: 0% -> -100%`, `duration: 1.8s`, `ease: [0.76, 0, 0.24, 1]`) revealing the hero page underneath.

- **Speed & Smoothness**:
  - Prefer **measured, smooth, luxurious animation speeds** over rushed or twitchy transitions.
  - Avoid high-parallax chaos; focus on tactile, premium micro-interactions.

- **Interactive Card Hover**:
  - 3D perspective tilt (`rotateX/rotateY`) following cursor position.
  - Radial specular spotlight sheen following cursor coordinates.

- **UI Craft Section ("DesignsSection")**:
  - 3D Overlapping Card Deck Fan-Spread on scroll (`useScroll` + `useSpring`).
  - Cards start stacked as a single 3D deck and fan out dynamically as the user scrolls into view.

---

### 📐 Layout Requirements
- **Centered Headings**: All section headings (`Work Portfolio`, `UI Craft`, `My Stack`, `My Journey`, `Achievements`) MUST be horizontally centered.
- **My Stack Subtitle**: Must explicitly read: `"technologies, frameworks, and tools I use"`.
- **Footer Section**:
  - **2-Column Layout**:
    - *Left Column*: Name (`Vishvjeet Singh Tanwar`) on a single line + Tagline (`Designer & Builder — Building things that my creativity allows.`).
    - *Right Column*: Icon-only buttons for **GitHub**, **LinkedIn**, **Twitter/X**, and **Email** (No long text URLs).
  - *Bottom Bar*: Full-width centered copyright line below a horizontal gradient divider (`© 2026 Vishvjeet Singh Tanwar. All rights reserved.`).
- **My Journey (Timeline)**:
  - Clean monochrome date pills without glowing dots before dates.
  - Clean icon badges without pulsing aura rings or neon drop shadows.

---

## 3. Performance & Optimization Specs

1. **Deferred WebGL Shader Mount**:
   - `LiquidEther` Three.js canvas in `mascot-hero.tsx` MUST be deferred until AFTER the intro loading screen & curtain lift complete (~3.6s delay). This prevents WebGL shader compilation from causing main-thread frame drops during loading text animation.
2. **GPU Hardware Acceleration**:
   - Use `transform-gpu` and `will-change: transform` on animating containers.
   - Avoid `backdrop-blur` on multiple animating 3D tiles to prevent GPU layer re-compositing hitches.
   - Use native CSS `transition` for `borderColor` and `boxShadow` to prevent Framer Motion `oklab()` color warnings.
3. **Framer Motion Container Positioning**:
   - Always ensure target containers passed to `useScroll({ target: containerRef })` have `className="relative w-full"` to avoid non-static container warnings.

---

## 4. Key Component Structure Map

```
src/
├── app/
│   ├── page.tsx                     # Main layout with LoadingScreen & lazy-rendered sections
│   ├── layout.tsx                   # Global font definitions and theme wrapper
│   └── globals.css                  # Custom fonts (Surgena), tokens, & utility classes
├── components/
│   ├── ui/
│   │   ├── LoadingScreen.tsx        # 3D Block Turning text + Upward Black Curtain Lift
│   │   ├── mascot-hero.tsx          # Hero section with mascot lens hover, Surgena typography, & LiquidEther
│   │   ├── LiquidEther.tsx          # Three.js interactive WebGL fluid background (performance.now timing)
│   │   ├── StaggeredMenu.tsx        # GSAP fixed navigation panel (Bungee Outline hover font)
│   │   ├── FlowingMenu.tsx          # GSAP infinite skill marquee for My Stack
│   │   ├── timeline.tsx             # Clean monochrome vertical timeline for My Journey
│   │   ├── TrueFocus.tsx            # Animated role focus indicator ("DESIGNER DEVELOPER")
│   │   └── GlareHover.tsx           # Glare sheen effect for UI Craft cards
│   └── sections/
│       ├── Navbar.tsx               # Fixed header menu container
│       ├── HeroSection.tsx          # Wrapper for MascotHero
│       ├── ProjectsSection.tsx      # Work Portfolio 3D grid with tech logos & GitHub card
│       ├── DesignsSection.tsx       # UI Craft section with 3D Card Deck Fan-Spread on scroll
│       ├── SkillsSection.tsx        # My Stack section
│       ├── AchievementsSection.tsx  # Milestones bento grid
│       ├── ExperienceSection.tsx    # My Journey wrapper
│       └── Footer.tsx               # 2-Column layout with social icon buttons & bottom copyright
```

---

## 5. Quick Instructions for New AI Agents

When working on this repository:
1. **Always run TypeScript check** (`npx tsc --noEmit`) after code modifications.
2. **Preserve exact user preferences**: No neon glows, no number badges, monochrome theme, centered section headers, 2-column footer with icon-only social handles.
3. **Maintain 60FPS performance**: Defer heavy canvas renders and avoid animating `oklab()` colors or `fontSize` inside Framer Motion `animate={{}}`.
