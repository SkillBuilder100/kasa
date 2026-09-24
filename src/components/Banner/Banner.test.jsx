import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Banner from './Banner.jsx'

describe('Banner (composant sans state)', () => {
  it("affiche l'image reçue en props", () => {
    const { container } = render(<Banner image="falaise.jpg" title="Chez vous" />)
    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', 'falaise.jpg')
  })

  it("donne un texte alternatif vide à l'image (image décorative)", () => {
    const { container } = render(<Banner image="falaise.jpg" />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('affiche le titre quand il est fourni', () => {
    render(<Banner image="falaise.jpg" title="Chez vous, partout et ailleurs" />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Chez vous, partout et ailleurs' }),
    ).toBeInTheDocument()
  })

  it("n'affiche pas de titre quand il n'est pas fourni", () => {
    render(<Banner image="montagnes.jpg" />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it("n'affiche pas de titre quand il est vide", () => {
    render(<Banner image="montagnes.jpg" title="" />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it("garde l'image quand le titre change", () => {
    const { container, rerender } = render(<Banner image="a.jpg" title="Titre 1" />)
    rerender(<Banner image="a.jpg" title="Titre 2" />)
    expect(screen.getByRole('heading')).toHaveTextContent('Titre 2')
    expect(container.querySelector('img')).toHaveAttribute('src', 'a.jpg')
  })
})
