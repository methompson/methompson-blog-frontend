import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import cleanup from 'rollup-plugin-cleanup';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // cleanup({ comments: 'istanbul', extensions: ['js', 'ts'] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-dom': ['react-dom'],
          react: ['react'],
          'react-router-dom': ['react-router-dom'],
          'react-redux': ['react-redux'],
          'prosemirror-state': ['prosemirror-state'],
          'prosemirror-view': ['prosemirror-view'],
          'prosemirror-model': ['prosemirror-model'],
          'prosemirror-markdown': ['prosemirror-markdown'],
          'prosemirror-schema-list': ['prosemirror-schema-list'],
          'prosemirror-example-setup': ['prosemirror-example-setup'],
          'markdown-it': ['markdown-it'],
          '@saschazar/wasm-heif': ['@saschazar/wasm-heif'],
          'firebase/auth': ['firebase/auth'],
          'firebase/app': ['firebase/app'],
        },
      },
    },
  },
});
