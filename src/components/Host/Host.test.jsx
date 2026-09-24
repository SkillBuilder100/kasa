import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Host from './Host.jsx'

describe('Host (composant sans state)', () => {
  it('affiche le prénom et le nom sur deux lignes', () => {
    const { container } = render(<Host name="Nathalie Jean" picture="nathalie.jpg" />)
    const name = container.querySelector('.host__name')
    expect(name).toHaveTextContent('NathalieJean')
    expect(name.querySelector('br')).toBeInTheDocument()
  })

  it("affiche la photo de l'hôte avec son nom en texte alternatif", () => {
    render(<Host name="Nathalie Jean" picture="nathalie.jpg" />)
    expect(screen.getByRole('img', { name: 'Nathalie Jean' })).toHaveAttribute(
      'src',
      'nathalie.jpg',
    )
  })

  it('garde tous les mots du nom après le prénom', () => {
    const { container } = render(<Host name="Jean Paul Sartre" picture="p.jpg" />)
    expect(container.querySelector('.host__name')).toHaveTextContent('JeanPaul Sartre')
  })
})
