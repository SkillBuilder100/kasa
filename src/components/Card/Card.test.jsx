import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Card from './Card.jsx'

// Card contient un lien React Router : il faut l'afficher dans un routeur
const renderCard = (props) =>
  render(
    <MemoryRouter>
      <Card {...props} />
    </MemoryRouter>,
  )

describe('Card (composant sans state)', () => {
  it('affiche le titre du logement', () => {
    renderCard({ id: 'abc', title: 'Appartement cosy', cover: 'cover.jpg' })
    expect(screen.getByRole('heading', { name: 'Appartement cosy' })).toBeInTheDocument()
  })

  it('mène à la fiche du logement', () => {
    renderCard({ id: 'abc', title: 'Appartement cosy', cover: 'cover.jpg' })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/logement/abc')
  })

  it('affiche la photo de couverture quand elle est fournie', () => {
    const { container } = renderCard({ id: 'abc', title: 'Appartement', cover: 'cover.jpg' })
    expect(container.querySelector('img')).toHaveAttribute('src', 'cover.jpg')
  })

  it("n'affiche pas d'image quand il n'y a pas de couverture", () => {
    const { container } = renderCard({ id: 'abc', title: 'Appartement' })
    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Appartement' })).toBeInTheDocument()
  })

  it("construit l'adresse avec l'identifiant reçu", () => {
    renderCard({ id: 'c67ab8a7', title: 'Studio' })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/logement/c67ab8a7')
  })
})
