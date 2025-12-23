import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// ...existing code...
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/entur-tavla/',
  publicDir: 'static'
});
// ...existing code...

