import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // Base path for GitHub Pages user/org site (username.github.io)
  base: '/',
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure assets are properly chunked
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}))
