# Vishvjeet's Portfolio — Build Workflow for Antigravity

## Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Animation**: Framer Motion, GSAP (Proof of Work section)
- **Component source**: 21st.dev components (all component code lives in `project.txt`)

---

## Project Structure

```
/app
  page.tsx              ← single-page entry, all sections assembled here
  not-found.tsx         ← 404 page
/components
  /ui                   ← all 21st.dev components go here
  /sections             ← each page section as its own component
/public
  /assets               ← personal photo, LinkedIn post images (added manually)
```

---

## Critical CSS Fix — Do This First

The `globals.css` in `project.txt` has `position: fixed` and `overflow: hidden` on `html, body`. **This will break all scroll-driven animations.** Remove those rules:

```css
/* DELETE these from globals.css */
html,
body {
  position: fixed;
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
}
```

Keep everything else from `globals.css` as-is.

---

## Page Section Order

Assemble `page.tsx` in this exact order, top to bottom:

1. `<Navbar />`
2. `<HeroSection />`
3. `<AboutSection />`
4. `<SkillsSection />`
5. `<ProjectsSection />`
6. `<AchievementsSection />`
7. `<ProofOfWorkSection />`
8. `<Footer />`
9. `<FloatingActionMenu />` (fixed position, always visible)

---

## Navbar

**Component**: `expandable-tabs.tsx` → `ExpandableTabs`  
**Placement**: Sticky top, centered horizontally  
**Tabs to configure**:

```ts
const tabs = [
  { title: "Home", icon: Home },
  { title: "Projects", icon: Briefcase },
  { type: "separator" },
  { title: "Skills", icon: Zap },
  { title: "About", icon: User },
]
```

Each tab should smooth-scroll to its corresponding section on click using `scrollIntoView({ behavior: 'smooth' })`.

---

## Section 1 — Hero

**Component**: `shape-landing-hero.tsx` → `HeroGeometric`  
**Placement**: Full viewport height (`min-h-screen`)

**Customize props**:
```tsx
<HeroGeometric
  badge="Designer & Builder"
  title1="[Your Name]"           // placeholder — user will update
  title2="Building things that matter."
/>
```

**Additional**: Place a circular/rounded personal photo in the hero. Use an Unsplash placeholder for now — user will swap with their own image from `/public/assets/`.

**Button**: Include the `MotionButton` (`motion-button.tsx`) inside the hero with label `"See my work"` — clicking it should scroll down to `#projects`.

---

## Section 2 — About

**Component**: `text-reveal.tsx` → `TextRevealByWord`  
**Placement**: After hero, full scroll-driven section (`h-[200vh]`)

**How it works**: Words appear one by one as the user scrolls down. This is the about section. The text should be a dummy bio paragraph.

**Dummy text to use**:
```
I design and build things on the internet. Currently obsessed with motion, interaction, and making the web feel alive. Open to collaborations and interesting problems.
```

User will update this text themselves later.

**Important**: This component needs a scrollable page to work — make sure the CSS fix above is applied first.

---

## Section 3 — Skills

**Component**: `scroll-based-velocity.tsx` → `VelocityScroll`  
**Placement**: After About section  
**Purpose**: Horizontally scrolling ticker of skills/tools — speeds up as user scrolls

**Dummy text to use** (user will update):
```
React • Next.js • Figma • TypeScript • Framer Motion • Tailwind • Node.js • Design Systems •
```

Use two rows (the component does this automatically — one goes left, one goes right).

---

## Section 4 — Projects

**Component**: `animated-testimonials.tsx` → `AnimatedTestimonials`  
**Placement**: After Skills  
**Section id**: `id="projects"`

**Data mapping** — this is a repurposed testimonial card, map fields like this:

| Component field | What it shows |
|---|---|
| `src` | Project screenshot (use Unsplash placeholder for now) |
| `name` | Project title |
| `designation` | Tech stack used |
| `quote` | Short project description |

**Dummy data**:
```ts
const projects = [
  {
    name: "Project Alpha",
    designation: "Next.js • Tailwind • Framer Motion",
    quote: "A dummy project description. User will update this with their real work.",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
  },
  {
    name: "Project Beta",
    designation: "React • TypeScript • Node.js",
    quote: "Another placeholder project. Short, punchy description of what it does.",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
  },
  {
    name: "Project Gamma",
    designation: "Figma • Design Systems",
    quote: "A design-focused project. User will fill in real details.",
    src: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=500",
  },
]
```

---

## Section 5 — Achievements

**Component**: Electric border card — HTML/CSS/JS code will be added to `project.txt` by the user before build.

**Instructions for Antigravity**:
- The component code for this section will be present in `project.txt` under the heading `"for achievements section"`.
- Extract that HTML/CSS/JS, convert it into a React component, and place it at `/components/ui/electric-border-card.tsx`.
- Use it to display 3–4 achievement cards in a grid layout.
- Use dummy text for achievement titles and descriptions — user will update.

**Dummy achievement data**:
```ts
[
  { title: "Achievement One", description: "Placeholder description. User will update." },
  { title: "Achievement Two", description: "Placeholder description. User will update." },
  { title: "Achievement Three", description: "Placeholder description. User will update." },
]
```

---

## Section 6 — Proof of Work

**Placement**: After Achievements  
**Animation**: GSAP scroll animation — user will provide the repo. Expect it to be present in the project folder.

**Data**: User will provide LinkedIn post URLs and images. For now, use placeholder cards:

```ts
const proofOfWork = [
  {
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    url: "#",
    caption: "LinkedIn post placeholder — user will replace with real URL and image.",
  },
  {
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    url: "#",
    caption: "LinkedIn post placeholder — user will replace with real URL and image.",
  },
]
```

Each card should be a link that opens the LinkedIn post in a new tab. Apply the GSAP scroll animation from the repo to animate cards into view as the user scrolls.

---

## Section 7 — Footer

**Keep it minimal.** No component from 21st.dev needed — build a simple footer:

- Name or initials on the left
- Social links on the right (GitHub, LinkedIn, Twitter — dummy `#` hrefs, user will update)
- A one-line copyright at the bottom: `© 2025 [Name]. Built with obsession.`

---

## Floating Contact Button (Always Visible)

**Component**: `floating-action-menu.tsx` → `FloatingActionMenu`  
**Placement**: Fixed, bottom-right corner, renders outside section flow  
**Position**: `fixed bottom-8 right-8`

**Options to configure**:
```ts
const options = [
  { label: "Email", Icon: <Mail className="w-4 h-4" />, onClick: () => window.location.href = "mailto:placeholder@email.com" },
  { label: "LinkedIn", Icon: <Linkedin className="w-4 h-4" />, onClick: () => window.open("#", "_blank") },
  { label: "GitHub", Icon: <Github className="w-4 h-4" />, onClick: () => window.open("#", "_blank") },
]
```

User will update hrefs later.

---

## Theme Toggle

**Component**: `bouncy-toggle.tsx` → `PremiumToggle`  
**Placement**: Inside the Navbar, right side  
**Wiring**: Toggle switches between `data-theme="dark"` and `data-theme="light"` on the `<html>` element. Both themes are already defined in `globals.css`.

```ts
onChange={(checked) => {
  document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light')
}}
```

Default to dark mode (`defaultChecked={true}`).

---

## Loading State

**Component**: `spinner-1.tsx` → `Spinner`  
**Placement**: Show on initial page load, hide once page is ready  
**Size**: `size={40}`  
**Implementation**: Wrap in a full-screen overlay that fades out after 1–1.5s using Framer Motion `AnimatePresence`.

---

## 404 Page

**Component**: `ghost-404-page.tsx` → `NotFound`  
**File**: `/app/not-found.tsx`  
**Fix**: Replace the hardcoded ghost image URL (`xubohuah.github.io/...`) with a locally hosted ghost SVG or any Unsplash placeholder. The original URL may be unreliable.

---

## NPM Dependencies — Install All Upfront

```bash
npm install framer-motion lucide-react usehooks-ts @tabler/icons-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot gsap
```

---

## Global Notes for Antigravity

- All dummy text is intentionally placeholder — **do not generate AI-sounding filler copy**. Keep it short and clearly marked so the user knows what to replace.
- All dummy images use Unsplash URLs — user will replace with real screenshots and personal photo.
- All social links, email, and external URLs use `#` as placeholder.
- The `project.txt` file is the source of truth for all component code. Pull every component from there.
- The Achievements section component code will be at the bottom of `project.txt` — user is adding it before handoff.
- The Proof of Work GSAP repo will be in the project folder — reference it by directory, don't assume the file structure.
- Do not modify the component logic — only wire up data and placement.
