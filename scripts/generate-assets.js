const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const movies = [
  {
    slug: "interstellar",
    title: "Interstellar",
    year: "2014",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    primary: "#030712",
    secondary: "#1e3a8a",
    accent: "#f59e0b",
    highlight: "#38bdf8"
  },
  {
    slug: "dune-part-two",
    title: "Dune: Part Two",
    year: "2024",
    tagline: "Long live the fighters.",
    primary: "#180e05",
    secondary: "#78350f",
    accent: "#f59e0b",
    highlight: "#fbbf24"
  },
  {
    slug: "oppenheimer",
    title: "Oppenheimer",
    year: "2023",
    tagline: "The world changes forever.",
    primary: "#090505",
    secondary: "#7f1d1d",
    accent: "#ef4444",
    highlight: "#f97316"
  },
  {
    slug: "blade-runner-2049",
    title: "Blade Runner 2049",
    year: "2017",
    tagline: "The key to the future is finally unearthed.",
    primary: "#090514",
    secondary: "#581c87",
    accent: "#06b6d4",
    highlight: "#ec4899"
  },
  {
    slug: "the-dark-knight",
    title: "The Dark Knight",
    year: "2008",
    tagline: "Welcome to a world without rules.",
    primary: "#030712",
    secondary: "#111827",
    accent: "#dc2626",
    highlight: "#94a3b8"
  },
  {
    slug: "inception",
    title: "Inception",
    year: "2010",
    tagline: "Your mind is the scene of the crime.",
    primary: "#050b14",
    secondary: "#1e293b",
    accent: "#3b82f6",
    highlight: "#60a5fa"
  },
  {
    slug: "the-martian",
    title: "The Martian",
    year: "2015",
    tagline: "Help is only 140 million miles away.",
    primary: "#140705",
    secondary: "#7c2d12",
    accent: "#f97316",
    highlight: "#fb923c"
  },
  {
    slug: "avatar",
    title: "Avatar",
    year: "2009",
    tagline: "Enter the world of Pandora.",
    primary: "#031412",
    secondary: "#064e3b",
    accent: "#06b6d4",
    highlight: "#34d399"
  },
  {
    slug: "arrival",
    title: "Arrival",
    year: "2016",
    tagline: "Language is the first weapon drawn.",
    primary: "#090814",
    secondary: "#312e81",
    accent: "#818cf8",
    highlight: "#c084fc"
  },
  {
    slug: "tenet",
    title: "Tenet",
    year: "2020",
    tagline: "Time runs out.",
    primary: "#070c14",
    secondary: "#0f172a",
    accent: "#38bdf8",
    highlight: "#94a3b8"
  },
  {
    slug: "the-prestige",
    title: "The Prestige",
    year: "2006",
    tagline: "Are you watching closely?",
    primary: "#0c0a09",
    secondary: "#27272a",
    accent: "#eab308",
    highlight: "#d4d4d8"
  },
  {
    slug: "whiplash",
    title: "Whiplash",
    year: "2014",
    tagline: "The pursuit of perfection comes at a cost.",
    primary: "#140505",
    secondary: "#450a0a",
    accent: "#eab308",
    highlight: "#ef4444"
  }
];

const targetDir = path.join(__dirname, '..', 'public', 'movies');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function createPosterSVG(movie) {
  return `<svg width="600" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${movie.primary}"/>
        <stop offset="50%" stop-color="${movie.secondary}"/>
        <stop offset="100%" stop-color="${movie.primary}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${movie.accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${movie.primary}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="#000000" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#070707" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="600" height="900" fill="url(#bg)"/>
    <circle cx="300" cy="360" r="280" fill="url(#glow)"/>
    <!-- Decorative geometric lines -->
    <circle cx="300" cy="360" r="180" fill="none" stroke="${movie.highlight}" stroke-opacity="0.15" stroke-width="2"/>
    <circle cx="300" cy="360" r="240" fill="none" stroke="${movie.accent}" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="8 8"/>
    <rect width="600" height="900" fill="url(#overlay)"/>
    
    <!-- Header info -->
    <text x="50" y="80" fill="${movie.accent}" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" letter-spacing="4">RUWORA SELECTION</text>
    <text x="550" y="80" fill="#A7A7A7" font-family="Inter, sans-serif" font-size="14" font-weight="600" text-anchor="end">${movie.year}</text>

    <!-- Center Monogram artwork -->
    <g transform="translate(300, 360)">
      <text x="0" y="20" fill="${movie.highlight}" font-family="Space Grotesk, sans-serif" font-size="110" font-weight="900" text-anchor="middle" fill-opacity="0.85" letter-spacing="-2">${movie.title.charAt(0)}</text>
    </g>

    <!-- Bottom content -->
    <text x="50" y="730" fill="${movie.accent}" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" letter-spacing="3">A FILM BY RUWORA CINEMA</text>
    <text x="50" y="780" fill="#F5F3EF" font-family="Space Grotesk, sans-serif" font-size="38" font-weight="800">${escapeXML(movie.title.toUpperCase())}</text>
    <text x="50" y="820" fill="#A7A7A7" font-family="Inter, sans-serif" font-size="14" font-weight="400" font-style="italic">"${escapeXML(movie.tagline)}"</text>
  </svg>`;
}

function createBackdropSVG(movie) {
  return `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${movie.primary}"/>
        <stop offset="40%" stop-color="${movie.secondary}"/>
        <stop offset="80%" stop-color="${movie.primary}"/>
        <stop offset="100%" stop-color="#070707"/>
      </linearGradient>
      <radialGradient id="glow" cx="70%" cy="40%" r="50%">
        <stop offset="0%" stop-color="${movie.accent}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${movie.primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#070707" stop-opacity="0.95"/>
      </radialGradient>
      <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#070707" stop-opacity="0.95"/>
        <stop offset="50%" stop-color="#070707" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#070707" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg)"/>
    <rect width="1920" height="1080" fill="url(#glow)"/>
    
    <!-- Atmospheric cinematic circles -->
    <circle cx="1300" cy="450" r="350" fill="none" stroke="${movie.highlight}" stroke-opacity="0.12" stroke-width="2"/>
    <circle cx="1300" cy="450" r="500" fill="none" stroke="${movie.accent}" stroke-opacity="0.1" stroke-width="1.5" stroke-dasharray="12 12"/>

    <rect width="1920" height="1080" fill="url(#leftGrad)"/>
    <rect width="1920" height="1080" fill="url(#vignette)"/>

    <!-- Left side subtle typography -->
    <text x="120" y="450" fill="${movie.accent}" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="700" letter-spacing="5">RUWORA FEATURED CINEMA</text>
    <text x="120" y="540" fill="#F5F3EF" font-family="Space Grotesk, sans-serif" font-size="72" font-weight="900" letter-spacing="-1">${escapeXML(movie.title.toUpperCase())}</text>
    <text x="120" y="590" fill="#A7A7A7" font-family="Inter, sans-serif" font-size="20" font-weight="400" font-style="italic">"${escapeXML(movie.tagline)}"</text>
  </svg>`;
}

function escapeXML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

async function generate() {
  console.log('Generating 24 movie assets...');
  for (const movie of movies) {
    const posterPath = path.join(targetDir, `${movie.slug}-poster.jpg`);
    const backdropPath = path.join(targetDir, `${movie.slug}-backdrop.jpg`);

    const posterSVG = Buffer.from(createPosterSVG(movie));
    const backdropSVG = Buffer.from(createBackdropSVG(movie));

    await sharp(posterSVG).jpeg({ quality: 92 }).toFile(posterPath);
    await sharp(backdropSVG).jpeg({ quality: 92 }).toFile(backdropPath);

    console.log(`Created assets for ${movie.slug}: ${movie.slug}-poster.jpg, ${movie.slug}-backdrop.jpg`);
  }
  console.log('All 24 movie assets generated successfully in /public/movies/');
}

generate().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
