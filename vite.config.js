import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: 'esbuild', // Plus rapide, intégré nativement
    reportCompressedSize: false, // Accélère le build
    cssCodeSplit: false, // Regroupe le CSS pour éviter plusieurs requêtes
  },
})
