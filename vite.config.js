import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // 1. Nettoyage automatique du dossier dist
    emptyOutDir: true,
    assetsDir: 'assets',

    // 2. Activation de la minification ultra-poussée avec Terser
    minify: 'terser',
    terserOptions: {
      compress: {
        // Supprime les console.log et debugger qui alourdissent le JS final
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        // Supprime les commentaires inutiles
        comments: false,
      },
    },

    // 3. Optimisation du découpage du code (Chunking)
    rollupOptions: {
      output: {
        // Force la création de noms de fichiers avec des hash (ex: main-a1b2c3.js)
        // C'est indispensable pour que ton cache .htaccess fonctionne sans erreur
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,

        // Regrouper les bibliothèques externes (React, etc.) dans un fichier séparé
        // pour que le navigateur ne les recharge pas si tu changes juste un texte dans App.jsx
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },

    // 4. Augmenter la limite d'avertissement de taille de chunk
    chunkSizeWarningLimit: 1000,
  },
})
