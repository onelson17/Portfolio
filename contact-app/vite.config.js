import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../js',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'contact-bundle.js',
        chunkFileNames: 'contact-chunk.js',
        assetFileNames: 'contact-[name][extname]'
      }
    }
  }
})
