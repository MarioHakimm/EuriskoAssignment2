// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons',
    },
  },
});
