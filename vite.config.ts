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
        name: 'abFinance - Personal Finance Management',
        short_name: 'abFinance',
        description:
          'Track your income, expenses, and financial goals with abFinance. A modern, intuitive personal finance management application.',
        theme_color: '#10B981',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        lang: 'en',
        dir: 'ltr',
        categories: ['finance', 'productivity', 'utilities'],
        icons: [
          {
            src: '/favicon-data/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicon-data/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicon-data/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/favicon-data/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'View your financial overview',
            url: '/dashboard',
            icons: [
              {
                src: '/favicon-data/web-app-manifest-192x192.png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'Add Income',
            short_name: 'Add Income',
            description: 'Quickly add income',
            url: '/income',
            icons: [
              {
                src: '/favicon-data/web-app-manifest-192x192.png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'Add Expense',
            short_name: 'Add Expense',
            description: 'Quickly add expense',
            url: '/expenses',
            icons: [
              {
                src: '/favicon-data/web-app-manifest-192x192.png',
                sizes: '192x192',
              },
            ],
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
