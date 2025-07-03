// Simple script to generate SVG icons for PWA
// Run this in browser console or use it as reference

function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
      <text x="50%" y="45%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.4}" fill="white">🏠</text>
      <text x="50%" y="80%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" fill="white">KHUSHI</text>
    </svg>
  `;
  return svg;
}

// Generate icons
console.log('192x192 Icon:');
console.log(generateIcon(192));

console.log('\n512x512 Icon:');
console.log(generateIcon(512));

console.log('\n180x180 Icon (Apple):');
console.log(generateIcon(180));
