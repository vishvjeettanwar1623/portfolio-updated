const fs = require('fs');

// 1. Patch layout.tsx
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace('import { ThemeProvider } from "@/context/ThemeContext";', 'import { ThemeProvider } from "@/context/ThemeContext";\nimport { SoundProvider } from "@/context/SoundContext";');
layout = layout.replace('<ThemeProvider>', '<ThemeProvider>\n          <SoundProvider>');
layout = layout.replace('</ThemeProvider>', '  </SoundProvider>\n        </ThemeProvider>');
fs.writeFileSync('src/app/layout.tsx', layout, 'utf8');

// 2. Patch StaggeredMenu.tsx
let menu = fs.readFileSync('src/components/ui/StaggeredMenu.tsx', 'utf8');
menu = menu.replace("import ThemeToggle from './ThemeToggle';", "import ThemeToggle from './ThemeToggle';\nimport SoundToggle from './SoundToggle';");
menu = menu.replace('<ThemeToggle />', '<SoundToggle />\n          <ThemeToggle />');
fs.writeFileSync('src/components/ui/StaggeredMenu.tsx', menu, 'utf8');

// 3. Patch ThemeToggle.tsx
let theme = fs.readFileSync('src/components/ui/ThemeToggle.tsx', 'utf8');
theme = theme.replace('import { useTheme } from "@/context/ThemeContext";', 'import { useTheme } from "@/context/ThemeContext";\nimport { useSound } from "@/context/SoundContext";');
theme = theme.replace('const { theme, toggleTheme } = useTheme();', 'const { theme, toggleTheme } = useTheme();\n  const { playSound } = useSound();');
theme = theme.replace('onClick=toggleTheme', 'onClick={() => { playSound("theme"); toggleTheme(); }}');
fs.writeFileSync('src/components/ui/ThemeToggle.tsx', theme, 'utf8');

// 4. Patch JourneyScrollbar.tsx
let scroll = fs.readFileSync('src/components/ui/JourneyScrollbar.tsx', 'utf8');
scroll = scroll.replace('import {\n  motion', 'import { useSound } from "@/context/SoundContext";\nimport {\n  motion');
scroll = scroll.replace('const [hoveredSection, setHoveredSection] = useState<string | null>(null);', 'const [hoveredSection, setHoveredSection] = useState<string | null>(null);\n  const { playSound } = useSound();');
scroll = scroll.replace('onMouseEnter={() => setHoveredSection(sec.id)}', 'onMouseEnter={() => { playSound("hover"); setHoveredSection(sec.id); }}');
scroll = scroll.replace('onClick={() => scrollToSection(sec.id)}', 'onClick={() => { playSound("click"); scrollToSection(sec.id); }}');
fs.writeFileSync('src/components/ui/JourneyScrollbar.tsx', scroll, 'utf8');

// 5. Patch ProjectsSection.tsx
let proj = fs.readFileSync('src/components/sections/ProjectsSection.tsx', 'utf8');
proj = proj.replace('import { SectionWrapper }', 'import { useSound } from "@/context/SoundContext";\nimport { SectionWrapper }');
proj = proj.replace('const toggleExpand = (id: string) => {', 'const { playSound } = useSound();\n\n  const toggleExpand = (id: string) => {\n    if (expandedId === id) {\n      playSound("close");\n    } else {\n      playSound("expand");\n    }');
fs.writeFileSync('src/components/sections/ProjectsSection.tsx', proj, 'utf8');

// 6. Patch ExperienceSection.tsx
let exp = fs.readFileSync('src/components/sections/ExperienceSection.tsx', 'utf8');
exp = exp.replace('import { SectionWrapper }', 'import { useSound } from "@/context/SoundContext";\nimport { SectionWrapper }');
exp = exp.replace('const handlePrev = () => {', 'const { playSound } = useSound();\n\n  const handlePrev = () => {\n    playSound("switch");');
exp = exp.replace('const handleNext = () => {', 'const handleNext = () => {\n    playSound("switch");');
fs.writeFileSync('src/components/sections/ExperienceSection.tsx', exp, 'utf8');

console.log('All files successfully patched with Soundscape!');
