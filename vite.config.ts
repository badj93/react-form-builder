import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  // @ts-ignore
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    lib: {
      entry: {
        'react-form-craft': resolve(__dirname, 'src/lib.ts'),
        'form-craft': resolve(__dirname, 'src/form-craft.tsx'),
      },
      name: 'react-form-craft',
      fileName: 'react-form-craft',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    ssr: true,
  },
});
