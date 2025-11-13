import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'jupiter-rebuked-by-venus': resolve(__dirname, 'pages/jupiter-rebuked-by-venus.html'),
        'after-the-bullfight': resolve(__dirname, 'pages/after-the-bullfight.html'),
        'the-continence-of-scipio': resolve(__dirname, 'pages/the-continence-of-scipio.html'),
        'old-peasant-lighting-pipe': resolve(__dirname, 'pages/old-peasant-lighting-pipe.html'),
        'an-elegant-company': resolve(__dirname, 'pages/an-elegant-company.html'),
        'about-baroque': resolve(__dirname, 'pages/about-baroque.html'),
      },
    },
  },
});

