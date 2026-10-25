import { defineConfig } from 'vite';
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

const input = {
  main: resolve(__dirname, 'index.html'),
};

for (const page of servicePages) {
  input[page] = resolve(__dirname, `src/pages/${page}/index.html`);
}

function servicePagePlugin() {
  return {
    name: 'service-page-plugin',
    apply: 'build',
    enforce: 'post',
    async writeBundle(options, bundle) {
      // Find the built assets for main-service
      const mainServiceJs = Object.keys(bundle).find(f => f.startsWith('main-service-') && f.endsWith('.js'));
      const mainCss = Object.keys(bundle).find(f => f.startsWith('index-') && f.endsWith('.css'));
      
      if (!mainServiceJs) return;
      
      const jsAsset = `/assets/${mainServiceJs}`;
      const cssAsset = mainCss ? `/assets/${mainCss}` : '';
      
      for (const page of servicePages) {
        // Vite outputs to dist/src/pages/<page>/index.html, we need to move to dist/<page>/index.html
        const srcHtmlPath = resolve(__dirname, `dist/src/pages/${page}/index.html`);
        const destHtmlPath = resolve(__dirname, `dist/${page}/index.html`);
        
        if (fs.existsSync(srcHtmlPath)) {
          let html = fs.readFileSync(srcHtmlPath, 'utf-8');
          
          // The HTML should already have correct assets from Vite's transformation
          // But ensure the main-service.js is the one loaded (not WhatsAppButton)
          // Vite already did this correctly
          
          // Ensure destination directory exists
          fs.mkdirSync(resolve(__dirname, `dist/${page}`), { recursive: true });
          fs.writeFileSync(destHtmlPath, html);
          
          // Remove the src/pages copy
          fs.rmSync(resolve(__dirname, `dist/src/pages/${page}`), { recursive: true });
        }
      }
      
      // Remove empty src/pages directory
      try {
        fs.rmSync(resolve(__dirname, 'dist/src/pages'), { recursive: true });
      } catch {}
      try {
        fs.rmSync(resolve(__dirname, 'dist/src'), { recursive: true });
      } catch {}
      
      // Copy public/assets to dist/assets/images
      const publicAssets = resolve(__dirname, 'public/assets');
      const distAssets = resolve(__dirname, 'dist/assets/images');
      if (fs.existsSync(publicAssets)) {
        fs.cpSync(publicAssets, distAssets, { recursive: true });
      }
      
      // Copy favicon.svg to dist root
      const faviconSrc = resolve(__dirname, 'public/favicon.svg');
      const faviconDest = resolve(__dirname, 'dist/favicon.svg');
      if (fs.existsSync(faviconSrc)) {
        fs.cpSync(faviconSrc, faviconDest);
      }
      
      // Copy robots.txt and sitemap.xml
      const robotsSrc = resolve(__dirname, 'public/robots.txt');
      const robotsDest = resolve(__dirname, 'dist/robots.txt');
      if (fs.existsSync(robotsSrc)) {
        fs.cpSync(robotsSrc, robotsDest);
      }
      
      const sitemapSrc = resolve(__dirname, 'public/sitemap.xml');
      const sitemapDest = resolve(__dirname, 'dist/sitemap.xml');
      if (fs.existsSync(sitemapSrc)) {
        fs.cpSync(sitemapSrc, sitemapDest);
      }
    }
  };
}

export default defineConfig({
  root: __dirname,
  publicDir: false,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input,
    },
  },
  plugins: [servicePagePlugin()]
});