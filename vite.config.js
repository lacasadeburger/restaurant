import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression' // <-- NOUVEAU

/**
 * CONFIGURATION VITE - VERSION ÉLITE PRO + COMPRESSION ULTIME
 * ---------------------------------------------------
 * - Compression Brotli & Gzip (Réduction drastique du poids JS)
 * - Découpage granulaire (Chunking) pour parallélisme HTTP/2
 * - Nettoyage profond (Terser) pour réduire le poids JS
 */
export default defineConfig({
  plugins: [
    react(),
    // 1. COMPRESSION BROTLI (La plus efficace pour les navigateurs modernes)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Compresse tout ce qui dépasse 1ko
    }),
    // 2. COMPRESSION GZIP (Pour la compatibilité maximale)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    })
  ],

  base: '/',

  build: {
    // 3. PERFORMANCE GLOBALE
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'esnext',

    // 4. OPTIMISATION DU PRÉCHARGEMENT
    modulePreload: {
      polyfill: false,
    },

    // 5. MINIFICATION HAUTE PRESSION (Terser)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          'console.info',
          'console.debug',
          'console.warn',
          'console.log'
        ],
        passes: 3,
      },
      output: {
        comments: false,
      },
    },

    // 6. STRATÉGIE DE DÉCOUPAGE (Chunking)
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,

        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Noyau React
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-core';
            }
            // Interface & Icônes
            if (id.includes('lucide') || id.includes('font-awesome')) {
              return 'vendor-ui';
            }
            // Moteur d'animations
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-animations';
            }
            // Le reste des utilitaires
            return 'vendor-utils';
          }
        },
      },
    },

    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})
