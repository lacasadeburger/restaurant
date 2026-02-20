import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: '/',
  build: {
    emptyOutDir: true,
    minify: 'esbuild',
    reportCompressedSize: false
  }
})
