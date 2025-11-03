import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with "/api" will be proxied to your backend
      '/api': {
        target: 'http://localhost:3001', // Your Express server
        changeOrigin: true,              // Needed for virtual hosted sites
        secure: false,                   // Ignore self-signed SSL certs (for dev)
      },
    },
  },
})
