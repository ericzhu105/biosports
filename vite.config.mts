import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Vite config for a multi-page static site.
// This ensures all HTML entry points are built into `dist/`
// so Vercel can serve routes like `/brad-kraut.html` directly.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bradKraut: resolve(__dirname, 'brad-kraut.html'),
        watchSr1Austin: resolve(__dirname, 'how-to-watch-sr1-austin-race.html'),
        runCoverageVo2: resolve(__dirname, 'run-coverage-vo2.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
});


