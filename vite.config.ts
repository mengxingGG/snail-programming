import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import electronRenderer from 'vite-plugin-electron-renderer';
import path from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [
      react(),
      electron([
        {
          entry: 'src/main/index.ts',
          onstart(args) {
            args.startup();
          },
          vite: {
            build: {
              outDir: 'dist/main',
              rollupOptions: {
                external: ['better-sqlite3', 'esbuild'],
              },
            },
          },
        },
        {
          entry: 'src/preload/index.ts',
          onstart(args) {
            args.reload();
          },
          vite: {
            build: {
              outDir: 'dist/preload',
            },
          },
        },
      ]),
      electronRenderer(),
    ],
    resolve: {
      alias: {
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@renderer': path.resolve(__dirname, 'src/renderer'),
        '@services': path.resolve(__dirname, 'src/services'),
      },
    },
    build: {
      outDir: 'dist/renderer',
    },
  };
});
