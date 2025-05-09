import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Khatmul-Quran/', // ✅ This is the important part
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
