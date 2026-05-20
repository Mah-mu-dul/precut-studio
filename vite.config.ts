import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 5174,
    strictPort: true,
    host: true
  },
  build: {
    // Enable chunk splitting for better caching and smaller initial bundles
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate cached chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-hls': ['hls.js'],
          // Cal.com is dynamically imported, so it'll auto-split,
          // but we define it here for consistent naming
          'vendor-calcom': ['@calcom/embed-react'],
        }
      }
    },
    // Target modern browsers to enable smaller output
    target: 'es2020',
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting for smaller initial CSS
    cssCodeSplit: true,
    // Minify with esbuild (fastest) — default but explicit
    minify: 'esbuild',
  }
})
