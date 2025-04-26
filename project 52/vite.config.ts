import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    host: true,
    port: 5173
  },
  preview: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-alert-dialog', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
          utils: ['marked', 'lodash', 'html2canvas', 'jspdf']
        }
      }
    },
    // Add these settings
    cssCodeSplit: true,
    modulePreload: true,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true
  }
});