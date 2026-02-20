import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    emptyOutDir: true,
    // Cela garantit que les assets sont bien gérés
    assetsDir: 'assets',
  },
})
