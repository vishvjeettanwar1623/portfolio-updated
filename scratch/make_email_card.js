const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const width = 1200;
const height = 750;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="50%" stop-color="#141417"/>
      <stop offset="100%" stop-color="#050506"/>
    </linearGradient>

    <!-- Card Inner Glow -->
    <linearGradient id="cardGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>

    <!-- Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.25"/>
    </linearGradient>

    <!-- Pattern Grid -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Base Rectangle -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Subtle Grid Pattern Layer -->
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Ambient Glow Circle -->
  <circle cx="200" cy="150" r="300" fill="#ffffff" fill-opacity="0.03" filter="blur(60px)"/>
  <circle cx="1000" cy="600" r="350" fill="#ffffff" fill-opacity="0.02" filter="blur(70px)"/>

  <!-- Main Card Container -->
  <rect x="60" y="60" width="1080" height="630" rx="32" fill="url(#cardGlow)" stroke="url(#borderGrad)" stroke-width="2"/>

  <!-- Corner Tech Accent Line -->
  <path d="M 100 100 L 140 100 M 100 100 L 100 140" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none"/>
  <path d="M 1100 100 L 1060 100 M 1100 100 L 1100 140" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none"/>
  <path d="M 100 650 L 140 650 M 100 650 L 100 610" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none"/>
  <path d="M 1100 650 L 1060 650 M 1100 650 L 1100 610" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none"/>

  <!-- Header Badge -->
  <rect x="120" y="120" width="220" height="42" rx="21" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1"/>
  <text x="230" y="146" font-family="monospace, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" fill-opacity="0.9" text-anchor="middle" letter-spacing="3">DIRECT CONTACT</text>

  <!-- Big Mail Envelope Icon SVG -->
  <g transform="translate(120, 220)">
    <rect width="90" height="90" rx="24" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5"/>
    <!-- Envelope Path -->
    <path d="M 27 34 L 63 34 C 66.3 34 69 36.7 69 40 L 69 62 C 69 65.3 66.3 68 63 68 L 27 68 C 23.7 68 21 65.3 21 62 L 21 40 C 21 36.7 23.7 34 27 34 Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 21 40 L 45 54 L 69 40" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- User Name -->
  <text x="240" y="265" font-family="sans-serif" font-size="44" font-weight="bold" fill="#ffffff" letter-spacing="1">Vishvjeet Singh Tanwar</text>
  <text x="240" y="300" font-family="monospace, sans-serif" font-size="18" fill="#ffffff" fill-opacity="0.6" letter-spacing="2">DESIGNER &amp; BUILDER</text>

  <!-- Divider Bar -->
  <line x1="120" y1="360" x2="1080" y2="360" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Actual Email Address Box -->
  <rect x="120" y="410" width="960" height="150" rx="24" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5"/>
  
  <text x="160" y="460" font-family="monospace, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" fill-opacity="0.5" letter-spacing="3">EMAIL ADDRESS</text>
  <text x="160" y="515" font-family="monospace, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" letter-spacing="2">sbvj727@gmail.com</text>
</svg>
`;

async function generate() {
  const outputPath = path.join(__dirname, '../public/assets/socials/email.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  console.log('Successfully created email.png at', outputPath);
}

generate().catch(console.error);
