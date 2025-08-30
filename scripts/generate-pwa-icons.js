import fs from 'fs';
import path from 'path';


// Create a simple SVG icon for PWA
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#10B981"/>
  <path d="M${size * 0.2} ${size * 0.3}h${size * 0.6}v${size * 0.1}H${size * 0.2}V${size * 0.3}Z" fill="white"/>
  <path d="M${size * 0.2} ${size * 0.5}h${size * 0.4}v${size * 0.1}H${size * 0.2}V${size * 0.5}Z" fill="white"/>
  <path d="M${size * 0.2} ${size * 0.7}h${size * 0.5}v${size * 0.1}H${size * 0.2}V${size * 0.7}Z" fill="white"/>
  <circle cx="${size * 0.75}" cy="${size * 0.4}" r="${size * 0.1}" fill="white"/>
  <path d="M${size * 0.7} ${size * 0.6}L${size * 0.8} ${size * 0.6}L${size * 0.75} ${size * 0.7}Z" fill="white"/>
</svg>`;
};

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PWA icons
const sizes = [192, 512];
sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filename = `pwa-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);

  // For now, we'll create SVG files and you can convert them to PNG
  const svgFilename = `pwa-${size}x${size}.svg`;
  const svgFilepath = path.join(publicDir, svgFilename);

  fs.writeFileSync(svgFilepath, svgContent);
  console.log(`Created ${svgFilename}`);
});

// Create favicon
const faviconSVG = createSVGIcon(32);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG);
console.log('Created favicon.svg');

// Create apple-touch-icon
const appleIconSVG = createSVGIcon(180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleIconSVG);
console.log('Created apple-touch-icon.svg');

console.log('\nPWA icons generated!');
console.log('Note: You may want to convert the SVG files to PNG format for better browser compatibility.');
console.log('You can use online converters or tools like ImageMagick to convert SVG to PNG.');
