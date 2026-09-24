import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Slideshow from './Slideshow.jsx'

const pictures = ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg']

// Renvoie l'adresse de la photo affichée
const currentPicture = () => screen.getByRole('img').getAttribute('src')

describe('Slideshow (composant avec state)', () => {
  it('affiche la première photo au départ', () => {
    render(<Slideshow pictures={pictures} title="Appartement" />)
    expect(currentPicture()).toBe('photo-1.jpg')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Appartement - photo 1 sur 3')
  })

  it('affiche les deux flèches et le numéro "1/3" quand il y a plusieurs photos', () => {
    render(<Slideshow pictures={pictures} title="Appartement" />)
    expect(screen.getByRole('button', { name: 'Photo précédente' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Photo suivante' })).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it("n'affiche ni flèche ni numéro quand il n'y a qu'une photo", () => {
    render(<Slideshow pictures={['seule.jpg']} title="Studio" />)
    expect(currentPicture()).toBe('seule.jpg')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText('1/1')).not.toBeInTheDocument()
  })

  it('passe à la photo suivante au clic sur la flèche droite', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={pictures} title="Appartement" />)
    await user.click(screen.getByRole('button', { name: 'Photo suivante' }))
    expect(currentPicture()).toBe('photo-2.jpg')
    expect(screen.getByText('2/3')).toBeInTheDocument()
  })

  it('revient à la photo précédente au clic sur la flèche gauche', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={pictures} title="Appartement" />)
    await user.click(screen.getByRole('button', { name: 'Photo suivante' }))
    await user.click(screen.getByRole('button', { name: 'Photo précédente' }))
    expect(currentPicture()).toBe('photo-1.jpg')
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('va à la dernière photo quand on clique sur la flèche gauche depuis la première', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={pictures} title="Appartement" />)
    await user.click(screen.getByRole('button', { name: 'Photo précédente' }))
    expect(currentPicture()).toBe('photo-3.jpg')
    expect(screen.getByText('3/3')).toBeInTheDocument()
  })

  it('revient à la première photo quand on clique sur la flèche droite depuis la dernière', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={pictures} title="Appartement" />)
    const next = screen.getByRole('button', { name: 'Photo suivante' })
    await user.click(next)
    await user.click(next)
    expect(currentPicture()).toBe('photo-3.jpg')
    await user.click(next)
    expect(currentPicture()).toBe('photo-1.jpg')
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('fait le tour complet des photos dans les deux sens', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={pictures} title="Appartement" />)
    const next = screen.getByRole('button', { name: 'Photo suivante' })
    const previous = screen.getByRole('button', { name: 'Photo précédente' })

    const forward = []
    for (let i = 0; i < 4; i++) {
      await user.click(next)
      forward.push(currentPicture())
    }
    expect(forward).toEqual(['photo-2.jpg', 'photo-3.jpg', 'photo-1.jpg', 'photo-2.jpg'])

    const backward = []
    for (let i = 0; i < 4; i++) {
      await user.click(previous)
      backward.push(currentPicture())
    }
    expect(backward).toEqual(['photo-1.jpg', 'photo-3.jpg', 'photo-2.jpg', 'photo-1.jpg'])
  })

  it('fonctionne avec deux photos (les deux flèches mènent à l\'autre photo)', async () => {
    const user = userEvent.setup()
    render(<Slideshow pictures={['a.jpg', 'b.jpg']} title="Duo" />)
    await user.click(screen.getByRole('button', { name: 'Photo précédente' }))
    expect(currentPicture()).toBe('b.jpg')
    await user.click(screen.getByRole('button', { name: 'Photo suivante' }))
    expect(currentPicture()).toBe('a.jpg')
  })

  it('donne un nom accessible au carrousel', () => {
    render(<Slideshow pictures={pictures} title="Appartement" />)
    expect(screen.getByRole('region', { name: 'Photos de Appartement' })).toBeInTheDocument()
  })
})
