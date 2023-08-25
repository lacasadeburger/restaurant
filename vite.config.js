import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// base: 'https://devrod.site',/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Jonybebunio/la-casa-de-burger.git',
})
