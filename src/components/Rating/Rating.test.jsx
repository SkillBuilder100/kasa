import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Rating from './Rating.jsx'

const countStars = (container) => ({
  total: container.querySelectorAll('.rating__star').length,
  filled: container.querySelectorAll('.rating__star--filled').length,
})

describe('Rating (composant sans state)', () => {
  it.each([
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
  ])('affiche %s étoile(s) pleine(s) sur 5 pour la note "%s"', (value, filled) => {
    const { container } = render(<Rating value={value} />)
    expect(countStars(container)).toEqual({ total: 5, filled })
  })

  it('accepte une note en nombre', () => {
    const { container } = render(<Rating value={4} />)
    expect(countStars(container).filled).toBe(4)
  })

  it('décrit la note pour les lecteurs d\'écran', () => {
    render(<Rating value="3" />)
    expect(screen.getByRole('img', { name: 'Note : 3 sur 5' })).toBeInTheDocument()
  })

  it("n'affiche aucune étoile pleine pour une note de 0", () => {
    const { container } = render(<Rating value="0" />)
    expect(countStars(container)).toEqual({ total: 5, filled: 0 })
  })
})
