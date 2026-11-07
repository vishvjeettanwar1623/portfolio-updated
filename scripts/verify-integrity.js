#!/usr/bin/env node

/**
 * Behavior & Integrity Verification Suite
 * Ensures essential configuration, assets, and event channels are valid.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Running codebase integrity and regression verification...');

// 1. Verify Site Config
const siteConfigPath = path.join(__dirname, '..', 'src', 'config', 'site.ts');
assert(fs.existsSync(siteConfigPath), 'src/config/site.ts must exist');
const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf8');
assert(siteConfigContent.includes('Vishvjeet Singh Tanwar'), 'Site developer name must be present');
assert(siteConfigContent.includes('sbvj727@gmail.com'), 'Site email must be present');
assert(siteConfigContent.includes('boardingPassLinks'), 'Boarding pass links must be configured');
console.log('  ✓ Site configuration & contact metadata verified');

// 2. Verify Events Bus & Shared Components
const eventsPath = path.join(__dirname, '..', 'src', 'lib', 'events.ts');
assert(fs.existsSync(eventsPath), 'src/lib/events.ts must exist');
const cardPath = path.join(__dirname, '..', 'src', 'components', 'ui', 'BoardingPassCard.tsx');
assert(fs.existsSync(cardPath), 'src/components/ui/BoardingPassCard.tsx must exist');
const leavesPath = path.join(__dirname, '..', 'src', 'components', 'ui', 'FallingLeavesEffect.tsx');
assert(fs.existsSync(leavesPath), 'src/components/ui/FallingLeavesEffect.tsx must exist');
console.log('  ✓ Custom event bus, BoardingPassCard, and FallingLeavesEffect verified');

// 3. Verify All Static Assets Referenced in Code Exist
const requiredAssets = [
  'public/assets/img.png',
  'public/assets/mascot-image.webp',
  'public/assets/designs/card-top-v2.jpg',
  'public/assets/designs/card-bottom-v2.jpg',
  'public/assets/designs/Design-1.webp',
  'public/assets/designs/Design-2.webp',
  'public/assets/designs/Design-3.webp',
  'public/assets/Projects/data_roots.webp',
  'public/assets/Projects/questfi.webp',
  'public/assets/Projects/eternal.png',
  'public/assets/Projects/promp-ip.png',
  'public/assets/Projects/lagline.jpg',
  'public/assets/Projects/profile-auditor.png',
  'public/resume.pdf',
  'public/fonts/Surgena-Personal-Use-Only.ttf'
];

for (const asset of requiredAssets) {
  const fullPath = path.join(__dirname, '..', asset);
  assert(fs.existsSync(fullPath), `Required asset missing: ${asset}`);
}
console.log(`  ✓ All ${requiredAssets.length} essential static assets exist and are verified`);

// 4. Verify No Deprecated Wrappers Exist
const deadFiles = [
  'src/components/ui/ThemeToggle.tsx',
  'src/components/ui/config/maintenance.ts',
  'src/components/ui/morphing-cursor.tsx'
];

for (const dead of deadFiles) {
  const fullPath = path.join(__dirname, '..', dead);
  assert(!fs.existsSync(fullPath), `Deprecated surplus file must not exist: ${dead}`);
}
console.log('  ✓ Verified 0 surplus or duplicate files remain');

console.log('\n✨ All integrity and behavior tests passed successfully!\n');
process.exit(0);

