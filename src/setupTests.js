// Ajoute à Vitest les vérifications du DOM de Testing Library
// (toBeInTheDocument, toHaveAttribute, toHaveTextContent...)
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Vide le DOM entre deux tests
afterEach(() => {
  cleanup()
})
