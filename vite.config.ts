// Vite configuration file for optimized build and development process.
 

 import { defineConfig } from 'vite';
 import react from '@vitejs/plugin-react';
 import viteCompression from 'vite-plugin-compression';
 

 // https://vitejs.dev/config/
 export default defineConfig({
  base: '/valorant-bot-landing/',
  plugins: [
  react(),
  viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
  sourcemap: true,
  target: 'esnext',
  minify: 'terser',
  terserOptions: {
  compress: {
  drop_console: true,
  },
  },
  rollupOptions: {
  output: {
  manualChunks(id) {
  if (id.includes('three') || id.includes('three-stdlib')) {
  return 'three';
  }
  },
  },
  },
  chunkSizeWarningLimit: 500,
  },
 });