import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    nodePolyfills({
      // Enable polyfills for specific globals and modules
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true, // Polyfill node: protocol imports
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Polyfill Node.js core modules exactly as per Irys docs
      crypto: "crypto-browserify",
      stream: "stream-browserify", 
      os: "os-browserify/browser",
      path: "path-browserify",
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
    // Fix for crypto-browserify process.version undefined error
    'process.version': JSON.stringify('v18.0.0'),
    // Provide dummy WalletConnect project ID to prevent Silk SDK errors
    'process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID': JSON.stringify('dummy-project-id'),
  },
})
