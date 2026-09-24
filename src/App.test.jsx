import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

// Données simulées de l'API
const logements = [
  {
    id: 'aaa',
    title: 'Appartement cosy',
    cover: 'cover-a.jpg',
    pictures: ['a1.jpg', 'a2.jpg', 'a3.jpg'],
    description: 'Un appartement lumineux.',
    host: { name: 'Nathalie Jean', picture: 'nathalie.jpg' },
    rating: '4',
    location: 'Ile de France - Paris 17e',
    equipments: ['Wifi', 'Cuisine'],
    tags: ['Batignolle', 'Montmartre'],
  },
  {
    id: 'bbb',
    title: 'Studio de charme',
    cover: 'cover-b.jpg',
    pictures: ['b1.jpg'],
    description: 'Un petit studio.',
    host: { name: 'Della Case', picture: 'della.jpg' },
    rating: '3',
    location: 'Ile de France - Paris 19e',
    equipments: ['Frigo'],
    tags: ['Buttes Chaumont'],
  },
]

// Simule l'API : liste, logement par identifiant, 404 sinon
const jsonResponse = (status, body) =>
  Promise.resolve({ ok: status === 200, status, json: () => Promise.resolve(body) })

const fakeApi = (url) => {
  const path = new URL(url).pathname
  if (path === '/api/properties') return jsonResponse(200, logements)
  const id = decodeURIComponent(path.replace('/api/properties/', ''))
  const logement = logements.find((l) => l.id === id)
  return logement ? jsonResponse(200, logement) : jsonResponse(404, 'Not found')
}

// Affiche l'application à une adresse donnée
const renderAt = (path) => {
  window.history.pushState({}, '', path)
  return render(<App />)
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(fakeApi))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Navigation et pages', () => {
  it("affiche l'accueil avec la bannière et un lien par logement", async () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Chez vous, partout et ailleurs' })).toBeInTheDocument()
    expect(screen.getByText('Chargement des logements…')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Appartement cosy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Studio de charme' })).toHaveAttribute(
      'href',
      '/logement/bbb',
    )
  })

  it('affiche le Header et le Footer sur toutes les pages', () => {
    renderAt('/a-propos')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 2020 Kasa. All rights reserved')
  })

  it('souligne le lien de la page en cours dans le menu', () => {
    renderAt('/a-propos')
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'A Propos' })).toHaveClass('active')
    expect(within(nav).getByRole('link', { name: 'Accueil' })).not.toHaveClass('active')
  })

  it('affiche la page À propos avec ses quatre blocs dépliables', () => {
    renderAt('/a-propos')
    for (const title of ['Fiabilité', 'Respect', 'Service', 'Sécurité']) {
      expect(screen.getByRole('button', { name: title })).toBeInTheDocument()
    }
  })

  it("ouvre la fiche d'un logement au clic sur sa vignette", async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(await screen.findByRole('link', { name: 'Appartement cosy' }))
    expect(window.location.pathname).toBe('/logement/aaa')
    expect(await screen.findByRole('heading', { level: 1, name: 'Appartement cosy' })).toBeInTheDocument()
  })

  it('va à la page À propos depuis le menu', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: 'A Propos' }))
    expect(window.location.pathname).toBe('/a-propos')
    expect(screen.getByRole('button', { name: 'Fiabilité' })).toBeInTheDocument()
  })
})

describe('Fiche logement', () => {
  it('affiche toutes les informations du logement', async () => {
    renderAt('/logement/aaa')
    expect(screen.getByText('Chargement…')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Appartement cosy' })).toBeInTheDocument()
    expect(screen.getByText('Ile de France - Paris 17e')).toBeInTheDocument()
    expect(screen.getByText('Batignolle')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Nathalie Jean' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Note : 4 sur 5' })).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('affiche la description et les équipements dans les blocs dépliables', async () => {
    const user = userEvent.setup()
    renderAt('/logement/aaa')
    await user.click(await screen.findByRole('button', { name: 'Description' }))
    expect(screen.getByText('Un appartement lumineux.')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Équipements' }))
    expect(screen.getByText('Wifi')).toBeVisible()
    expect(screen.getByText('Cuisine')).toBeVisible()
  })

  it("n'affiche pas de flèches pour un logement à une seule photo", async () => {
    renderAt('/logement/bbb')
    expect(await screen.findByRole('heading', { name: 'Studio de charme' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Photo suivante' })).not.toBeInTheDocument()
  })
})

describe("Gestion des erreurs", () => {
  it.each(['/nimporte-quoi', '/a-propos/test', '/logement'])(
    "affiche la page 404 pour l'adresse inexistante %s",
    (path) => {
      renderAt(path)
      expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
      expect(screen.getByText(/La page que/)).toBeInTheDocument()
    },
  )

  it('affiche la page 404 pour un identifiant de logement inconnu', async () => {
    renderAt('/logement/inconnu')
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('affiche la page 404 pour un identifiant contenant un "?" encodé', async () => {
    renderAt('/logement/aaa%3Fx%3D1')
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it("ramène à l'accueil depuis la page 404", async () => {
    const user = userEvent.setup()
    renderAt('/nimporte-quoi')
    await user.click(screen.getByRole('link', { name: "Retourner sur la page d'accueil" }))
    expect(window.location.pathname).toBe('/')
    expect(screen.getByRole('heading', { name: 'Chez vous, partout et ailleurs' })).toBeInTheDocument()
  })

  it("affiche un message sur l'accueil quand l'API ne répond pas", async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    renderAt('/')
    expect(await screen.findByText(/Impossible de charger les logements/)).toBeInTheDocument()
  })

  it("affiche un message sur la fiche quand l'API ne répond pas", async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    renderAt('/logement/aaa')
    expect(await screen.findByText('Impossible de charger ce logement.')).toBeInTheDocument()
  })
})
