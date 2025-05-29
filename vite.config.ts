import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/uesr-home/' : '/',
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    open: true,
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
});