import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimisations pour le SEO et les performances
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react', 'react-icons'],
          motion: ['framer-motion'],
        },
      },
    },
    // Compression des assets
    assetsInlineLimit: 4096,
    // Source maps pour le debug en production (optionnel)
    sourcemap: false,
  },
  // Optimisations de développement
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  // Préchargement des modules critiques
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
});
