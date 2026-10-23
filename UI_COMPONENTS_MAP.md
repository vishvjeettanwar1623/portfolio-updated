# UI Architecture & Component Map

This document provides a comprehensive breakdown of every file in the **vishvjeet.me** UI codebase. It details what each file does, its role in the application, and lists all sections, buttons, and user flows where each file is utilized.

---

## 📑 Table of Contents

1. [Core Application & Routing (`src/app/`)](#1-core-application--routing-srcapp)
2. [Page Sections (`src/components/sections/`)](#2-page-sections-srccomponentssections)
3. [UI Components & Micro-Interactions (`src/components/ui/`)](#3-ui-components--micro-interactions-srccomponentsui)
4. [Context & State Management (`src/context/`)](#4-context--state-management-srccontext)
5. [Utilities & Configurations (`src/lib/` & `src/config/`)](#5-utilities--configurations-srclib--srcconfig)
6. [Component Cross-Reference Index](#6-component-cross-reference-index)

---

## 1. Core Application & Routing (`src/app/`)

### `src/app/page.tsx`
* **Purpose**: The main landing page and root layout composer for the single-page portfolio application.
* **What it does**: 
  * Controls the global startup sequence (`isLoading` state with `LoadingScreen`).
  * Assembles all primary page sections in their scroll order.
  * Wraps viewport sections in `LazyRender` boundaries to prevent premature rendering and ensure 60fps scrolling.
  * Mounts global viewport widgets: `ClickSpark`, `Navbar`, `SwarmMotionButton`, `JourneyScrollbar`, `NFCContactModal`, and `Footer`.
* **Where used**: Default route `/`.

### `src/app/layout.tsx`
* **Purpose**: Root HTML shell and provider injector.
* **What it does**:
  * Loads and exposes custom fonts via CSS variables: **Audiowide** (`--font-audiowide`), **Wallpoet** (`--font-wallpoet`), and **Geist**.
  * Wraps the application inside `ThemeProvider` (light/dark mode) and `SoundProvider` (interactive audio synthesis).
  * Defines SEO metadata, OpenGraph tags, viewport configurations, and robots directives.
* **Where used**: Wraps every page in the application.

### `src/app/globals.css`
* **Purpose**: Global stylesheet and Tailwind CSS v4 design token definitions.
* **What it does**:
  * Configures light/dark CSS color variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, etc.).
  * Registers local font families like **Surgena** and **Nexokora**.
  * Contains custom scrollbar styles, selection colors, and smooth rendering utilities (`transform-gpu`, `will-change-transform`).
* **Where used**: Imported into `src/app/layout.tsx`.

### `src/app/icon.tsx`
* **Purpose**: Dynamic Next.js favicon generator.
* **What it does**: Generates a high-contrast dark square favicon with a crisp lettermark `V` using Next.js `ImageResponse`.
* **Where used**: Automatic favicon served to browsers.

### `src/app/not-found.tsx`
* **Purpose**: Custom 404 error page.
* **What it does**: Renders an interactive, animated 404 experience powered by `Ghost404Page` with a button to return back home.
* **Where used**: Triggered whenever an invalid URL route is accessed.

---

## 2. Page Sections (`src/components/sections/`)

### `src/components/sections/HeroSection.tsx`
* **Purpose**: Primary above-the-fold introductory showcase.
* **What it does**:
  * Features the animated name header (`Vishvjeet Singh Tanwar`), role badges, and bio.
  * Integrates the interactive 3D physics-based lanyard badge (`IDCardLanyard`).
  * Houses call-to-action buttons: "Explore Work" (scrolls to `#projects`) and "Get In Touch" (scrolls to `#contact`).
  * Displays quick social links (GitHub, LinkedIn, Email).
* **Where used**: Main top section of `page.tsx`.

### `src/components/sections/Navbar.tsx`
* **Purpose**: Fixed navigation header across the website.
* **What it does**:
  * Wraps `StaggeredMenu` with brand logo `vishvjeet.me`, audio toggle, and theme switch.
  * Provides quick one-click navigation links to all sections: Home, Work, Stack, Achievements, About, Journey, Orbit, Contact.
  * Clicking the brand logo `vishvjeet.me` smoothly scrolls back to the top of `#home`.
* **Where used**: Mounted at the top level of `page.tsx`.

### `src/components/sections/ProjectsSection.tsx`
* **Purpose**: Featured software engineering projects showcase ("Work Portfolio").
* **What it does**:
  * Displays project details: title, category, screenshot, architectural highlights, domain tag, and tech stack badges.
  * Uses `ProgressSlider` with 6 tab buttons (`Eternal`, `Data Roots`, `Promp-IP`, `Questfi`, `LagLine`, `Profile Auditor`).
  * Features manual click-to-switch tabs (no timer-based jumping).
  * Contains external "Launch" and GitHub "Source" action buttons.
  * Bottom banner points users to 30+ open-source GitHub repositories.
* **Where used**: Loaded inside `LazyRender id="projects"` in `page.tsx`.

### `src/components/sections/DesignsSection.tsx`
* **Purpose**: UI/UX design and architectural mockups showcase.
* **What it does**:
  * Highlights high-fidelity interface designs (SaaS, FinTech, E-Commerce).
  * Provides dual mockup previews with interactive zoom, tags, and category filters.
* **Where used**: Mounted directly below Projects in `page.tsx`.

### `src/components/sections/SkillsSection.tsx`
* **Purpose**: Comprehensive technical stack and tools showcase ("My Stack").
* **What it does**:
  * Organizes skills into 6 distinct categories: Languages, Frontend, Backend, Blockchain, Tools, AI & IDEs.
  * Features `FlowingMenu`: an infinite GSAP horizontal marquee with SVG tech icons and hover acceleration.
  * Icons are created lazily inside the component to prevent initial render lag.
* **Where used**: Loaded inside `LazyRender id="skills"` in `page.tsx`.

### `src/components/sections/AchievementsSection.tsx`
* **Purpose**: Key milestones, hackathon wins, and professional certificates showcase.
* **What it does**:
  * Desktop: Kinetic 8-card shutter accordion that expands active cards to 480px on hover/click while playing audio cues.
  * Mobile: Collapsible touch-friendly card stack.
  * Each card has an external "Verify Certificate" button linking directly to verified LinkedIn credential posts.
  * Images use native `loading="lazy"` to ensure instant loading.
* **Where used**: Loaded inside `LazyRender id="achievements"` in `page.tsx`.

### `src/components/sections/AboutSection.tsx`
* **Purpose**: Biography, personal philosophy, and engineering mindset.
* **What it does**:
  * Uses `TrueFocus` magnetic word focus to highlight keywords in the biography.
  * Showcases core engineering principles, academic standing, and problem-solving philosophy.
* **Where used**: Loaded inside `LazyRender id="about"` in `page.tsx`.

### `src/components/sections/ExperienceSection.tsx`
* **Purpose**: Chronological timeline of engineering leadership and milestones ("My Journey").
* **What it does**:
  * 3D perspective carousel stage showcasing 3 major eras: 2024 (Foundation), 2025 (Completed), 2026 (Current Era).
  * Features text decryption/scrambling effects on headline and year on card shift.
  * 4 thumbnail switchers per slide allowing visitors to preview credential proof images.
  * Clicking any proof opens a fullscreen Lightbox modal for high-res credential inspection.
  * Arrow controller buttons (`ChevronLeft` / `ChevronRight`) for manual milestone switching.
* **Where used**: Loaded inside `LazyRender id="experience"` in `page.tsx`.

### `src/components/sections/GitHubActivitySection.tsx`
* **Purpose**: 3D interactive GitHub telemetry and commit constellation ("Commit Orbit").
* **What it does**:
  * Renders a 3D spherical constellation of 160 commit nodes via HTML5 Canvas with mouse parallax rotation and drag inertia.
  * Hovering any commit node displays a real-time floating tooltip with commit SHA, message, date, and repo.
  * Automatically fetches live public activity from the GitHub API (`/users/vishvjeettanwar1623/events/public`) only when scrolled into view.
  * Right column features verified repository cards and a direct profile link button.
* **Where used**: Loaded inside `LazyRender id="github-activity"` in `page.tsx`.

### `src/components/sections/VelocityMarquee.tsx`
* **Purpose**: Dynamic ticker text separating the Hero from the content below.
* **What it does**: Uses `ScrollBasedVelocity` to scroll infinite kinetic text strings across the screen with speed tied to the user's scroll velocity.
* **Where used**: Directly below `HeroSection` in `page.tsx`.

### `src/components/sections/Footer.tsx`
* **Purpose**: Final contact portal and page closing.
* **What it does**:
  * Large contact invitation ("Let's Build Together").
  * Direct action buttons for Email, GitHub, LinkedIn, Twitter, and Resume download.
  * Interactive "Back to Top" button that scrolls smoothly to `#home`.
  * Real-time local time indicator and copyright.
* **Where used**: Bottom of `page.tsx`.

### `src/components/sections/SectionWrapper.tsx`
* **Purpose**: Standardized layout wrapper for all sections.
* **What it does**: Provides uniform vertical padding, scroll anchor IDs, and max-width boundaries across sections.
* **Where used**: Used as the root element inside almost all section files (`SkillsSection`, `AchievementsSection`, `ProjectsSection`, `ExperienceSection`, `GitHubActivitySection`).

---

## 3. UI Components & Micro-Interactions (`src/components/ui/`)

### `src/components/ui/lazy-render.tsx`
* **Purpose**: Viewport-triggered lazy rendering wrapper.
* **What it does**:
  * Uses browser `IntersectionObserver` with an optimized `120px` root margin to delay mounting complex DOM trees until the user approaches them.
  * While offscreen, renders a lightweight skeleton placeholder (`SectionSkeleton`) with matching height.
  * Once scrolled into view, cleanly mounts the real section with an opacity fade.
* **Where used**: `src/app/page.tsx` for Projects, Designs, Skills, Achievements, About, Experience, and GitHub Activity.

### `src/components/ui/section-skeleton.tsx`
* **Purpose**: Skeleton placeholders for lazy rendering.
* **What it does**: Renders pulse-animated structural skeletons customized for each section type (`projects`, `skills`, `achievements`, `experience`, `about`, `general`).
* **Where used**: Used by `lazy-render.tsx` as fallback content.

### `src/components/ui/LoadingScreen.tsx`
* **Purpose**: Website initial startup loading sequence.
* **What it does**:
  1. **Phase 1 (0–100% Counter)**: 3D rolling letter typography for `VISHVJEET` and smooth cubic progress counter.
  2. **Phase 2 (Boarding Pass Card)**: Smoothly transitions into the Developer Boarding Pass card with 3D mouse perspective tilt.
  3. **Phase 3 (Perforation Cut)**: The user drags the single gold scissors button along the perforation seam (or clicks the stub). The cut line tracks 1:1 with the scissors.
  4. **Phase 4 (Passport Stamp & Entry)**: Upon cut completion, a large passport-style **"BOARDED"** stamp slams onto the center of the card, the barcode stub drops away, and cinematic shutter curtains slide open to reveal the site.
* **Where used**: Mounted at the top of `src/app/page.tsx` while `isLoading === true`.

### `src/components/ui/NFCContactModal.tsx`
* **Purpose**: On-demand developer boarding pass modal.
* **What it does**:
  * Triggered via global window event `open_contact_pass`.
  * Features the same high-resolution textured card, interactive social links, scissors cut mechanism, and full-card "BOARDED" rubber stamp.
  * Includes a backdrop blur overlay and top-right close `X` button.
* **Where used**: Mounted in `src/app/page.tsx`.

### `src/components/ui/StaggeredMenu.tsx` & `StaggeredMenu.css`
* **Purpose**: Full-screen slide-out kinetic navigation menu.
* **What it does**:
  * Powered by GSAP multi-layer colored prelayer wipes.
  * Animates navigation links with staggered rotations and numbers.
  * Hosts the `ThemeToggle` and `SoundToggle` controls in the header bar.
  * Features the `vishvjeet.me` brand text which scrolls back to top when clicked.
* **Where used**: Rendered inside `src/components/sections/Navbar.tsx`.

### `src/components/ui/FlowingMenu.tsx` & `FlowingMenu.css`
* **Purpose**: Infinite flowing skills marquee with mouseover translation.
* **What it does**:
  * GSAP timeline driving continuous marquee ribbons of skill badges.
  * Includes `IntersectionObserver` to automatically pause animation when offscreen to preserve CPU/GPU battery.
* **Where used**: Rendered inside `src/components/sections/SkillsSection.tsx`.

### `src/components/ui/text-stagger-hover.tsx`
* **Purpose**: Kinetic dual-layer typography hover effect for section titles.
* **What it does**: Renders two stacked text layers (`TextStaggerHoverActive` and `TextStaggerHoverHidden`). On hover, the visible layer slides out while the hidden layer slides in with elastic easing.
* **Where used**: Headings across `ProjectsSection`, `SkillsSection`, `AchievementsSection`, `ExperienceSection`, `GitHubActivitySection`.

### `src/components/ui/progressive-carousel.tsx`
* **Purpose**: Custom slider component for the work portfolio.
* **What it does**:
  * Manages active project tab state via React Context (`useProgressSliderContext`).
  * `SliderBtn` components at the bottom allow visitors to click any tab to switch projects manually without auto-advancing timers.
  * `SliderWrapper` animates slide content in/out using Framer Motion's `AnimatePresence`.
* **Where used**: Used exclusively in `src/components/sections/ProjectsSection.tsx`.

### `src/components/ui/id-card-lanyard.tsx`
* **Purpose**: Physics-simulated 3D lanyard conference badge.
* **What it does**:
  * Uses a custom 2D Verlet integration physics rope simulation rendered on an HTML5 `<canvas>`.
  * The ID card card swings, sways, and reacts to drag events with realistic gravity and momentum.
  * Features Vishvjeet's portrait photo, custom QR codes, barcode, and flip-to-back functionality.
* **Where used**: Prominently featured in `src/components/sections/HeroSection.tsx`.

### `src/components/ui/ClickSpark.tsx`
* **Purpose**: Interactive particle spark emitter on mouse clicks.
* **What it does**: Listens to clicks on its wrapper and shoots out 10 radial sparkling lines that expand and fade over 500ms.
* **Where used**: Wraps the entire `<main>` application in `src/app/page.tsx`.

### `src/components/ui/JourneyScrollbar.tsx`
* **Purpose**: Minimalist right-hand viewport progress indicator.
* **What it does**: Shows a sleek vertical indicator bar tracking total document scroll percentage.
* **Where used**: Fixed widget in `src/app/page.tsx`.

### `src/components/ui/SoundToggle.tsx`
* **Purpose**: Audio on/off toggle button.
* **What it does**: Visualizes audio state with animated equalizer bars; clicking toggles sound effects globally via `SoundContext`.
* **Where used**: Header of `StaggeredMenu.tsx` (Navbar).

### `src/components/ui/ThemeToggle.tsx` & `sky-toggle.tsx`
* **Purpose**: Theme mode switchers (Dark / Light).
* **What it does**: Switches between monochrome dark mode and clean light mode, persisting the user's choice in `localStorage`.
* **Where used**: Inside `StaggeredMenu.tsx` (Navbar).

### `src/components/ui/SwarmMotionButton.tsx` & `swarm.css`
* **Purpose**: Floating "BUILD" interactive motion button.
* **What it does**: Triggers particle swarm build animation and visual state changes (PLAY / STOP).
* **Where used**: Mounted fixed in the bottom-right corner next to `SoundToggle` in `src/app/page.tsx`.

### `src/components/ui/TrueFocus.tsx` & `TrueFocus.css`
* **Purpose**: Word-by-word magnetic focus highlight box.
* **What it does**: Animates a glowing border box that moves from word to word across text on hover or auto-interval.
* **Where used**: Highlight words inside `src/components/sections/AboutSection.tsx`.

### `src/components/ui/ShinyText.tsx` & `ShinyText.css`
* **Purpose**: Metallic light-sweep shimmer effect across text.
* **What it does**: Uses CSS background clip with linear gradient animation to create a traveling shine across text.
* **Where used**: Hero name headline and special badge accents.

### `src/components/ui/scroll-based-velocity.tsx`
* **Purpose**: Velocity-sensitive infinite text ticker.
* **What it does**: Accelerates text marquee scroll speed dynamically based on how fast the user is scrolling the page.
* **Where used**: Engine for `src/components/sections/VelocityMarquee.tsx`.

### `src/components/ui/TiltCard.tsx`
* **Purpose**: 3D perspective mouse tilt container.
* **What it does**: Calculates cursor X/Y coordinates relative to card center and rotates the card along X and Y axes with smooth spring damping.
* **Where used**: Reusable card wrapper for interactive items.

### `src/components/ui/GlareHover.tsx` & `GlareHover.css`
* **Purpose**: Holographic glare reflection on mouse hover.
* **What it does**: Projects an radial light spot across card surfaces as the cursor moves.
* **Where used**: Card micro-interactions.

### `src/components/ui/ScrollStack.tsx` & `ScrollStack.css`
* **Purpose**: Sticky stacking card deck animation.
* **What it does**: Stacks consecutive cards on top of each other as the user scrolls down the page.
* **Where used**: Reusable layout container.

### `src/components/ui/timeline.tsx`
* **Purpose**: Vertical milestone timeline with scroll-progress laser beam.
* **What it does**: Draws an SVG glowing beam that fills vertically as the user scrolls past milestone nodes.
* **Where used**: Timeline layout alternative.

### `src/components/ui/wavy-background.tsx`
* **Purpose**: Canvas sine-wave animated fluid background.
* **What it does**: Renders animated mathematical wave curves via HTML5 2D context.
* **Where used**: Dynamic background canvas.

### `src/components/ui/GlassRain.tsx`
* **Purpose**: Glass droplet and rain particle physics effect.
* **What it does**: Renders falling raindrops on a frosted glass surface.
* **Where used**: Ambient background option.

### `src/components/ui/KineticParallax.tsx`
* **Purpose**: Multi-layer depth parallax container.
* **What it does**: Moves background and foreground elements at differential speeds based on scroll offset.
* **Where used**: Hero and transition sections.

### `src/components/ui/morphing-cursor.tsx`
* **Purpose**: Custom mouse cursor with elastic trailing ring.
* **What it does**: Replaces default mouse cursor with an animated follower that morphs size and shape when hovering clickable buttons.
* **Where used**: Viewport-wide cursor accessory.

### `src/components/ui/ProjectLiveSandbox.tsx`
* **Purpose**: Modal iframe for live project testing.
* **What it does**: Opens live external project URLs in an embedded sandboxed preview window inside the portfolio.
* **Where used**: Optional preview trigger in project showcases.

### `src/components/ui/button.tsx` & `button-with-icon.tsx`
* **Purpose**: Base design system button primitives with variant styling (primary, outline, ghost).
* **Where used**: Shared across navigation and action links.

### `src/components/ui/ghost-404-page.tsx`
* **Purpose**: Illustrated 404 error animation.
* **What it does**: Renders a floating ghost illustration with a home navigation action button.
* **Where used**: Embedded in `src/app/not-found.tsx`.

---

## 4. Context & State Management (`src/context/`)

### `src/context/SoundContext.tsx`
* **Purpose**: Global Web Audio API synthesizer for sound effects.
* **What it does**:
  * Generates zero-latency procedural UI sounds mathematically using Web Audio oscillators and gain ramps (no external `.mp3` files needed).
  * Sound effects: `click`, `switch`, `hover`, `expand`, `close`, `theme`.
  * Manages global mute/unmute state and persists preference in `localStorage`.
  * Automatically unlocks audio context on the first user pointer gesture to satisfy modern browser autoplay policies.
* **Where used**: Consumed by `useSound()` across `LoadingScreen`, `NFCContactModal`, `Navbar`, `ProjectsSection`, `AchievementsSection`, `ExperienceSection`, `GitHubActivitySection`, `SoundToggle`.

### `src/context/ThemeContext.tsx`
* **Purpose**: Global theme provider (Dark / Light mode).
* **What it does**:
  * Toggles the `.dark` class on the root `<html>` element.
  * Persists user choice in `localStorage`.
  * Enforces the project's strict monochrome dark aesthetic while providing clean high-contrast light mode.
* **Where used**: Consumed by `useTheme()` across `Navbar`, `LoadingScreen`, `SkillsSection`, `ClickSpark`, `ThemeToggle`.

---

## 5. Utilities & Configurations (`src/lib/` & `src/config/`)

### `src/lib/utils.ts`
* **Purpose**: Class name merger utility (`cn`).
* **What it does**: Merges Tailwind CSS classes intelligently using `clsx` and `tailwind-merge` without style conflicts.
* **Where used**: Used in virtually every component file in `src/components/ui/` and `src/components/sections/`.

### `src/lib/swarm.ts`
* **Purpose**: Algorithmic particle swarm physics calculations.
* **What it does**: Computes attraction, repulsion, and flocking vectors for autonomous particle agents.
* **Where used**: Powers `SwarmMotionButton.tsx`.

### `src/config/maintenance.ts` & `src/components/ui/config/maintenance.ts`
* **Purpose**: Feature flags and maintenance mode configuration.
* **What it does**: Exports boolean switches to toggle maintenance banners or disable specific work-in-progress sections.
* **Where used**: Imported into root page components for operational control.

---

## 6. Component Cross-Reference Index

| File Name | Primary Role | Where It Appears In The UI |
|---|---|---|
| `page.tsx` | Main Page Assembler | Entire application root |
| `layout.tsx` | App Shell & Providers | Wraps all routes and pages |
| `globals.css` | Design Tokens & Fonts | Injected globally |
| `HeroSection.tsx` | Hero Landing Area | Top section of the home page |
| `Navbar.tsx` | Main Navigation Bar | Fixed at the top of the viewport |
| `ProjectsSection.tsx` | Work Portfolio Showcase | `#projects` section |
| `DesignsSection.tsx` | UI/UX Mockups Showcase | Under Projects section |
| `SkillsSection.tsx` | Tech Stack & Tools | `#skills` section |
| `AchievementsSection.tsx` | Hackathons & Certifications | `#achievements` section |
| `AboutSection.tsx` | Personal Philosophy & Bio | `#about` section |
| `ExperienceSection.tsx` | Timeline & Milestones | `#experience` section |
| `GitHubActivitySection.tsx` | 3D Commit Telemetry | `#github-activity` section |
| `VelocityMarquee.tsx` | Scrolling Velocity Ticker | Separator below Hero |
| `Footer.tsx` | Contact & Signature | Bottom `#contact` section |
| `lazy-render.tsx` | Viewport Performance Wrapper | Wraps all heavy sections in `page.tsx` |
| `section-skeleton.tsx` | Skeleton Placeholders | Fallbacks inside `lazy-render.tsx` |
| `LoadingScreen.tsx` | Startup Sequence & Boarding Pass | Initial startup overlay |
| `NFCContactModal.tsx` | Boarding Pass Contact Modal | Global modal on `open_contact_pass` |
| `StaggeredMenu.tsx` | Slide-Out Navigation Menu | Inside `Navbar.tsx` |
| `FlowingMenu.tsx` | Infinite Skills Marquee | Inside `SkillsSection.tsx` |
| `text-stagger-hover.tsx` | Dual-Layer Text Hover | Section titles across the site |
| `progressive-carousel.tsx` | Manual Tabbed Project Slider | Inside `ProjectsSection.tsx` |
| `id-card-lanyard.tsx` | 3D Swinging Badge Lanyard | Inside `HeroSection.tsx` |
| `ClickSpark.tsx` | Radial Click Spark Particles | Root wrapper in `page.tsx` |
| `JourneyScrollbar.tsx` | Scroll Progress Indicator | Fixed right-edge widget |
| `SoundToggle.tsx` | Audio Mute/Unmute Switch | Inside `Navbar.tsx` |
| `ThemeToggle.tsx` | Light/Dark Theme Switch | Inside `Navbar.tsx` |
| `SwarmMotionButton.tsx` | Agent Swarm Motion Trigger | Floating widget in `page.tsx` |
| `TrueFocus.tsx` | Magnetic Focus Highlight Box | Inside `AboutSection.tsx` |
| `SoundContext.tsx` | Web Audio Synthesizer | Global provider in `layout.tsx` |
| `ThemeContext.tsx` | Theme State Manager | Global provider in `layout.tsx` |
| `utils.ts` | Tailwind Class Merger (`cn`) | Shared utility across all UI files |

