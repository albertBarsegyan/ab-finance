import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon-data/favicon.ico',
        'favicon-data/apple-touch-icon.png',
        'favicon-data/favicon.svg',
        'favicon-data/favicon-96x96.png',
      ],
      manifest: {
        name: 'abFinance',
        short_name: 'abFin',
        description:
          'A modern finance management application for tracking income, expenses, and financial goals',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon-data/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon-data/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon-data/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
