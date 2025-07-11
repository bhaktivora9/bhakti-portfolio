import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bhakti-portfolio/', // <-- this must match your GitHub repo name, with slashes!
})