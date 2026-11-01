import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgCurrenciesDir = path.join(process.cwd(), 'public', 'images', 'currencies');
const iconsDir = path.join(process.cwd(), 'public', 'icons');
const iconCurrenciesDir = path.join(process.cwd(), 'public', 'icons', 'currencies');

for (const dir of [imgCurrenciesDir, iconsDir, iconCurrenciesDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. MLBB Blue Diamond SVG
const mlbbDiamondSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ml-top" x1="128" y1="20" x2="128" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#80E5FF"/>
      <stop offset="100%" stopColor="#00A2FF"/>
    </linearGradient>
    <linearGradient id="ml-center" x1="128" y1="85" x2="128" y2="235" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#00A6FF"/>
      <stop offset="60%" stopColor="#0066CC"/>
      <stop offset="100%" stopColor="#003D80"/>
    </linearGradient>
    <linearGradient id="ml-left" x1="30" y1="85" x2="128" y2="235" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#0088EA"/>
      <stop offset="100%" stopColor="#002855"/>
    </linearGradient>
    <linearGradient id="ml-right" x1="226" y1="85" x2="128" y2="235" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#40D0FF"/>
      <stop offset="100%" stopColor="#004D99"/>
    </linearGradient>
    <linearGradient id="ml-glow" x1="128" y1="0" x2="128" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#C4F5FF" stopOpacity="0.8"/>
      <stop offset="100%" stopColor="#0099FF" stopOpacity="0"/>
    </linearGradient>
  </defs>
  <!-- Ambient Soft Glow -->
  <circle cx="128" cy="128" r="110" fill="#00A2FF" opacity="0.15"/>
  
  <!-- Lower Facets -->
  <polygon points="128,235 70,85 128,85" fill="url(#ml-center)"/>
  <polygon points="128,235 128,85 186,85" fill="#1AB2FF"/>
  <polygon points="128,235 30,85 70,85" fill="url(#ml-left)"/>
  <polygon points="128,235 186,85 226,85" fill="url(#ml-right)"/>

  <!-- Upper Facets (Crown) -->
  <polygon points="70,85 128,85 105,25 65,25" fill="#4DD6FF"/>
  <polygon points="128,85 186,85 191,25 151,25" fill="#8FE3FF"/>
  <polygon points="105,25 128,85 151,25" fill="#E6FAFF"/>
  <polygon points="65,25 30,85 70,85" fill="#0091E6"/>
  <polygon points="191,25 186,85 226,85" fill="#0077C2"/>

  <!-- Table (Flat top edge) -->
  <polygon points="65,25 191,25 151,25 105,25" fill="#FFFFFF" opacity="0.9"/>
  
  <!-- Highlight Shimmers -->
  <polygon points="105,25 128,85 118,50" fill="#FFFFFF" opacity="0.6"/>
  <circle cx="128" cy="85" r="4" fill="#FFFFFF"/>
</svg>
`;

// 2. Valorant VP (Red V Emblem)
const valorantVpSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="120" fill="#111827"/>
  <circle cx="128" cy="128" r="115" stroke="#FF4655" stroke-width="6"/>
  <path d="M128 190L60 65H98L128 140L158 65H196L128 190Z" fill="#FF4655"/>
  <path d="M128 140L148 90H108L128 140Z" fill="#FFFFFF"/>
</svg>
`;

// 3. Genshin Impact Genesis Crystal / Primogem 4-point Star
const genshinCrystalSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="genshin-grad" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#45E0EC"/>
      <stop offset="35%" stopColor="#5D85F8"/>
      <stop offset="70%" stopColor="#9656E8"/>
      <stop offset="100%" stopColor="#DE62B0"/>
    </linearGradient>
  </defs>
  <circle cx="128" cy="128" r="110" fill="#5D85F8" opacity="0.2"/>
  <!-- 4-pointed Star -->
  <path d="M128 10L145 95L230 112L165 145L180 230L128 175L76 230L91 145L26 112L111 95L128 10Z" fill="url(#genshin-grad)"/>
  <!-- Inner Core Facet -->
  <polygon points="128,50 150,110 200,128 150,146 128,206 106,146 56,128 106,110" fill="#FFFFFF" opacity="0.85"/>
</svg>
`;

// 4. Free Fire Diamond (Fiery Blue Diamond)
const freeFireDiamondSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="110" fill="#00D2FF" opacity="0.2"/>
  <polygon points="128,225 35,90 70,35 186,35 221,90" fill="#0072FF"/>
  <polygon points="128,225 80,90 176,90" fill="#00C6FF"/>
  <polygon points="70,35 186,35 176,90 80,90" fill="#E0F7FF"/>
  <polygon points="128,225 35,90 80,90" fill="#0051B3"/>
  <polygon points="128,225 176,90 221,90" fill="#0080FF"/>
  <polygon points="70,35 35,90 80,90" fill="#33B5E5"/>
  <polygon points="186,35 221,90 176,90" fill="#66D9FF"/>
</svg>
`;

// 5. PUBG Mobile UC Coin
const pubgUcSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="115" fill="#E5A823"/>
  <circle cx="128" cy="128" r="100" stroke="#FFF0A0" stroke-width="8" fill="#F5C242"/>
  <circle cx="128" cy="128" r="85" stroke="#B87D0A" stroke-width="4" fill="#E5A823"/>
  <text x="128" y="150" fill="#332005" font-family="system-ui, sans-serif" font-weight="900" font-size="70" text-anchor="middle" letter-spacing="2">
    UC
  </text>
</svg>
`;

// 6. Roblox Robux Coin
const robuxSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="115" fill="#00A249"/>
  <!-- Hexagon Outer -->
  <polygon points="128,30 215,80 215,176 128,226 41,176 41,80" fill="#00C853" stroke="#FFFFFF" stroke-width="8"/>
  <!-- Center Square -->
  <rect x="96" y="96" width="64" height="64" rx="14" fill="#007E33" stroke="#FFFFFF" stroke-width="6"/>
</svg>
`;

async function generate() {
  console.log('Rendering currency icons...');

  const items = [
    { svg: mlbbDiamondSvg, targets: [
      path.join(imgCurrenciesDir, 'diamond.webp'),
      path.join(imgCurrenciesDir, 'diamond.png'),
      path.join(imgCurrenciesDir, 'mlbb-diamond.webp'),
      path.join(iconsDir, 'diamond.png'),
      path.join(iconCurrenciesDir, 'mobile-legends.webp'),
      path.join(iconCurrenciesDir, 'mlbb.webp')
    ]},
    { svg: freeFireDiamondSvg, targets: [
      path.join(imgCurrenciesDir, 'freefire-diamond.webp'),
      path.join(iconCurrenciesDir, 'free-fire.webp')
    ]},
    { svg: valorantVpSvg, targets: [
      path.join(imgCurrenciesDir, 'valorant-vp.webp'),
      path.join(iconCurrenciesDir, 'valorant.webp')
    ]},
    { svg: genshinCrystalSvg, targets: [
      path.join(imgCurrenciesDir, 'genshin-crystal.webp'),
      path.join(iconCurrenciesDir, 'genshin-impact.webp')
    ]},
    { svg: pubgUcSvg, targets: [
      path.join(imgCurrenciesDir, 'pubg-uc.webp'),
      path.join(iconCurrenciesDir, 'pubg-mobile.webp')
    ]},
    { svg: robuxSvg, targets: [
      path.join(imgCurrenciesDir, 'robux.webp'),
      path.join(iconCurrenciesDir, 'roblox.webp')
    ]}
  ];

  for (const item of items) {
    const svgBuffer = Buffer.from(item.svg);
    for (const target of item.targets) {
      if (target.endsWith('.webp')) {
        await sharp(svgBuffer).resize(128, 128).webp({ quality: 95 }).toFile(target);
      } else if (target.endsWith('.png')) {
        await sharp(svgBuffer).resize(128, 128).png().toFile(target);
      }
      console.log('Created:', target);
    }
  }

  console.log('All currency assets successfully generated!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});

