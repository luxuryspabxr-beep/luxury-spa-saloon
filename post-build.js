import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const servicePages = [
  'relaxation-massage-buxar',
  'aroma-wellness-buxar',
  'body-spa-buxar',
  'facial-glow-buxar'
];

// Read the manifest to find the correct asset files
const manifestPath = resolve(__dirname, 'dist/.vite/manifest.json');
let manifest = {};
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

// Find the main-service entry
const mainServiceEntry = manifest['src/main-service.js'];
const mainEntry = manifest['src/main.js'];

const mainServiceJs = mainServiceEntry?.file;
const mainServiceCss = mainServiceEntry?.css?.[0];
const mainCss = mainEntry?.css?.[0];

console.log('mainServiceJs:', mainServiceJs);
console.log('mainServiceCss:', mainServiceCss);
console.log('mainCss:', mainCss);

const jsAsset = mainServiceJs ? `/assets/${mainServiceJs}` : '';
const cssAsset = mainServiceCss ? `/assets/${mainServiceCss}` : (mainCss ? `/assets/${mainCss}` : '');

for (const page of servicePages) {
  const srcHtmlPath = resolve(__dirname, `dist/src/pages/${page}/index.html`);
  const destHtmlPath = resolve(__dirname, `dist/${page}/index.html`);
  
  if (fs.existsSync(srcHtmlPath)) {
    let html = fs.readFileSync(srcHtmlPath, 'utf-8');
    
    // The HTML should already have correct assets from Vite's transformation
    // But we can verify and fix if needed
    
    // Ensure destination directory exists
    fs.mkdirSync(resolve(__dirname, `dist/${page}`), { recursive: true });
    fs.writeFileSync(destHtmlPath, html);
    console.log(`Copied ${page} to ${destHtmlPath}`);
    
    // Remove the src/pages copy
    fs.rmSync(resolve(__dirname, `dist/src/pages/${page}`), { recursive: true });
  } else {
    console.log(`NOT FOUND: ${srcHtmlPath}`);
  }
}

// Remove empty src/pages directory
try {
  fs.rmSync(resolve(__dirname, 'dist/src/pages'), { recursive: true });
} catch {}
try {
  fs.rmSync(resolve(__dirname, 'dist/src'), { recursive: true });
} catch {}

// Copy public/assets to dist/assets
const publicAssets = resolve(__dirname, 'public/assets');
const distAssets = resolve(__dirname, 'dist/assets');
if (fs.existsSync(publicAssets)) {
  fs.cpSync(publicAssets, distAssets, { recursive: true });
  console.log('Copied public/assets to dist/assets');
}

// Copy favicon.svg to dist root
const faviconSrc = resolve(__dirname, 'public/favicon.svg');
const faviconDest = resolve(__dirname, 'dist/favicon.svg');
if (fs.existsSync(faviconSrc)) {
  fs.cpSync(faviconSrc, faviconDest);
  console.log('Copied favicon.svg');
}

// Copy robots.txt and sitemap.xml
const robotsSrc = resolve(__dirname, 'public/robots.txt');
const robotsDest = resolve(__dirname, 'dist/robots.txt');
if (fs.existsSync(robotsSrc)) {
  fs.cpSync(robotsSrc, robotsDest);
  console.log('Copied robots.txt');
}

const sitemapSrc = resolve(__dirname, 'public/sitemap.xml');
const sitemapDest = resolve(__dirname, 'dist/sitemap.xml');
if (fs.existsSync(sitemapSrc)) {
  fs.cpSync(sitemapSrc, sitemapDest);
  console.log('Copied sitemap.xml');
}

console.log('Post-build completed!');