import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration des tests (Vitest)
  test: {
    // Simule un navigateur pour afficher les composants React
    environment: 'jsdom',
    // Ajoute les vérifications du DOM (toBeInTheDocument, toHaveAttribute...)
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/**/*.test.{js,jsx}', 'src/setupTests.js'],
    },
  },
})
