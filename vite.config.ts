import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Add headers to allow iframe embedding and relax CSP for development
    headers: {
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: wss: ws:; frame-src 'self' https:; connect-src 'self' https: wss: ws:",
    }
  },
  // Define global variables that might be needed
  define: {
    global: 'globalThis',
  },
})
