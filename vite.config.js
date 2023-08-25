import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// base: 'https://devrod.site',/
export default defineConfig({
  plugins: [react()],
  base: 'http://jonybebunio.github.io/la-casa-de-burger',
})
