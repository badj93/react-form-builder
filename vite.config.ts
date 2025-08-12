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
  build: {
    lib: {
      entry: {
        'react-form-builder': resolve(__dirname, 'src/lib.ts'),
        'form-builder': resolve(__dirname, 'src/form-builder.tsx'),
      },
      name: 'react-form-builder',
      fileName: 'react-form-builder',
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
