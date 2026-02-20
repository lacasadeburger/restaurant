import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile({
      removeViteModuleLoader: true,
      // On empêche d'inclure les fichiers trop gros dans le HTML
      inlinePattern: ["*.css"],
      deleteInlinedFiles: true
    })
  ],
  base: '/',
  build: {
    emptyOutDir: true,
    assetsInlineLimit: 4096 // Ne transforme en texte que les fichiers < 4ko
  }
})
