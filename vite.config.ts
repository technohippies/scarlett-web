import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        404: path.resolve(__dirname, 'public/404.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === '404.html') {
            return '404.html';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
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
    // Provide dummy WalletConnect project ID to prevent Silk SDK errors
    'process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID': JSON.stringify('dummy-project-id'),
  },
})
