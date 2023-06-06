import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cleanup from 'rollup-plugin-cleanup';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cleanup({ comments: 'istanbul', extensions: ['js', 'ts'] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
  },
});
