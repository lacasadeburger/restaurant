import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * CONFIGURATION VITE - VERSION ÉLITE PRO
 * ---------------------------------------------------
 * - Découpage granulaire (Chunking) pour parallélisme HTTP/2
 * - Nettoyage profond (Terser) pour réduire le poids JS
 * - Optimisation du cache via hachage persistant
 * - Désactivation des polyfills inutiles pour navigateurs modernes
 */
export default defineConfig({
  plugins: [react()],
  base: '/',

  build: {
    // 1. PERFORMANCE GLOBALE
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'esnext', // Génère un code moderne et ultra-léger

    // 2. OPTIMISATION DU PRÉCHARGEMENT (Nouveau)
    modulePreload: {
      polyfill: false, // Économise du poids en supposant un navigateur moderne
    },

    // 3. MINIFICATION HAUTE PRESSION (Terser)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // Supprime les logs
        drop_debugger: true,  // Supprime les debugger
        pure_funcs: [
          'console.info',
          'console.debug',
          'console.warn',
          'console.log'
        ],
        passes: 3, // 3 passes pour une optimisation maximale du code
      },
      output: {
        comments: false, // 0 commentaires dans le build final
      },
    },

    // 4. STRATÉGIE DE DÉCOUPAGE (Chunking)
    rollupOptions: {
      output: {
        // Naming pour Cache Immortel (Synchronisé avec ton .htaccess)
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,

        // DÉCOUPAGE DU "BLOC BLEU" NODE_MODULES
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Noyau React (Ne change presque jamais)
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-core';
            }
            // Interface & Icônes (Souvent lourd)
            if (id.includes('lucide') || id.includes('font-awesome')) {
              return 'vendor-ui';
            }
            // Moteur d'animations
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-animations';
            }
            // Le reste des utilitaires (Tailwind, etc.)
            return 'vendor-utils';
          }
        },
      },
    },

    // 5. SÉCURITÉ & LIMITES
    chunkSizeWarningLimit: 600, // Alerte de taille
    reportCompressedSize: false, // Accélère le build
  },

  // 6. OPTIMISATION DE DÉMARRAGE DÉVELOPPEUR
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})
