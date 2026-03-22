# Portfolio Development Context

## Tech Stack
- **Framework:** Next.js 14/15 (App Router)
- **Library:** React 18
- **Styling:** Tailwind CSS v4 (with PostCSS)
- **Animations:** Framer Motion, GSAP & `@gsap/react`
- **3D Graphics:** Three.js (WebGL scrolling backgrounds)
- **Language:** TypeScript

## Core Architecture
- `src/app/page.tsx`: The main landing page orchestrating all sections.
- `src/app/globals.css`: Tailwind v4 syntax with custom CSS variables driving an extreme dark mode theme (strict black & white aesthetic).

## Structural Layout (Top to Bottom)
1. **LoadingScreen (`src/components/sections/LoadingScreen.tsx`)**
   - Displays for 1.5 seconds on initial load.
   - Scroll position is forced to `(0,0)` and scrolling is locked (`overflow: hidden`) during load to prevent GSAP mapping and layout errors.
2. **Navbar (`src/components/sections/Navbar.tsx`)**
3. **HeroSection (`src/components/sections/HeroSection.tsx`)**
   - Uses `ShapeLandingHero` with complex Framer Motion geometries.
   - Entrance animations are explicitly delayed to wait for the `LoadingScreen` to unmount.
4. **VelocityMarquee (`src/components/sections/VelocityMarquee.tsx`)**
   - Placed directly beneath the Hero Section. 
   - Uses `VelocityScroll` for a premium continuous typography marquee ("FRONTEND ARCHITECT • CREATIVE DEVELOPER...").
5. **AboutSection (`src/components/sections/AboutSection.tsx`)**
   - Clean, text-driven structural block.
6. **Projects & Designs Grid (`src/app/page.tsx`)**
   - `ProjectsSection` and `DesignsSection` sit perfectly side-by-side in a 50/50 responsive split on desktop screens (`grid-cols-2`).
   - Built on top of `AnimatedTestimonials`. Images were explicitly constrained (`max-w-lg`, `h-72`) to prevent overly stretched aspect ratios within the half-columns.
7. **SkillsSection (`src/components/sections/SkillsSection.tsx`)**
   - Features an interactive 8-card "Technical Arsenal" grid.
   - Uses a custom `HoverCard` component with pure black (`#0a0a0a`) bases and stark white text/border reveals on hover (strict avoidance of blues/purples).
8. **ExperienceSection (`src/components/sections/ExperienceSection.tsx`)**
   - Clean 2-row layout grouped into Work History & Academic History.
   - Uses `AnimatedProfileCard` featuring GSAP-powered floating 3D hover bounds. Cards use a faint white drop shadow (`shadow-[0_0_20px_rgba(255,255,255,0.03)]`) to lift off the pitch-black background.
9. **AchievementsSection (`src/components/sections/AchievementsSection.tsx`)**
   - Uses a custom `ElectricCard` component that relies on SVG displacement filters for dramatic turbulence effects.
   - Layout specifically mirrors the top-down stacked flow of the ExperienceSection.
10. **FloatingActionMenu (`src/components/sections/FloatingActionMenu.tsx`)**
    - Fixed to the bottom right of the viewport.
    - Completely replaces the traditional footer.
    - Expandable menu containing dynamic links (GitHub, LinkedIn, Email, Resume download) with animated tooltips.

## Key Bug Fixes & Technical Decisions (Do Not Regress)
- **SSR Hydration Fixes for Lighthouse:** Lighthouse was throwing severe React Hydration Mismatch errors. 
  - `ElectricCard` now utilizes React 18's stable `useId()` instead of `Math.random()` to generate IDs for SVG filters.
  - `AnimatedTestimonials` uses deterministic array generators for rotations based on the `index` instead of `Math.random()`, ensuring Server and Client DOM match exactly.
- **Tailwind v4 Upgrade:** The project was migrated explicitly to PostCSS Tailwind v4 syntax. Core utility classes (`bg-background` and `text-foreground`) are strictly mapped to CSS variables in `globals.css` (e.g., `var(--background)` is `#000` in dark mode).
- **Proof of Work (Three.js WebGL):** The "Atmospheric Depth Gallery" was fully ported to TypeScript within `src/lib/experience/` and `src/components/sections/ProofOfWork.tsx`. However, it is currently **commented out** in `page.tsx` because its super-kinetic 3D scroll clashed with the otherwise ultra-minimalist, black/white typography-driven UI of the portfolio. The code is completely functional if you wish to re-enable it.
- **Scroll Hijacking Blocked:** Global `wheel` event `preventDefault()` calls were surgically removed from the Three.js `Scroll.ts` engine. This ensures that the normal browser scrollbars work flawlessly across the rest of the site without locking up the DOM.

## Next Steps
- Replace the placeholder data arrays inside the `ProjectsSection`, `DesignsSection`, `ExperienceSection`, and `AchievementsSection` with the final, real copy.
- Hook up the actual `resume.pdf` file to the download button inside the `FloatingActionMenu`.
