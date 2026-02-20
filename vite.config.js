import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    emptyOutDir: true,
    assetsDir: 'assets',

    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
