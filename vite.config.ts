import { defineConfig } from 'vite';

// Configuração básica do Vite para projeto em TypeScript
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
