import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/alumni_hub/',   // important for GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
