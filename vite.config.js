import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// base: 'https://devrod.site',/
//http://127.0.0.1:5173/
//https://jonybebunio.github.io/la-casa-de-burger
export default defineConfig({
  plugins: [react()],
  base: 'https://lacasadeburger.es',
})
