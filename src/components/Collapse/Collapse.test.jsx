import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Collapse from './Collapse.jsx'

describe('Collapse (composant avec state)', () => {
  it('affiche le titre et est fermé au départ', () => {
    render(
      <Collapse title="Fiabilité">
        <p>Contenu</p>
      </Collapse>,
    )
    const button = screen.getByRole('button', { name: 'Fiabilité' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Contenu')).not.toBeVisible()
  })

  it("s'ouvre au clic et affiche son contenu", async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Fiabilité">
        <p>Contenu</p>
      </Collapse>,
    )
    await user.click(screen.getByRole('button', { name: 'Fiabilité' }))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Contenu')).toBeVisible()
  })

  it("ne s'ouvre pas au clic sur le titre : seul le chevron est cliquable (prototype Figma)", async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Fiabilité">
        <p>Contenu</p>
      </Collapse>,
    )
    await user.click(screen.getByText('Fiabilité'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Contenu')).not.toBeVisible()
  })

  it("a un seul bouton, qui contient le chevron", () => {
    const { container } = render(
      <Collapse title="Fiabilité">
        <p>Contenu</p>
      </Collapse>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button')).toContainElement(container.querySelector('.collapse__arrow'))
    expect(screen.getByRole('button')).not.toContainElement(screen.getByText('Fiabilité'))
  })

  it('se referme au second clic', async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Fiabilité">
        <p>Contenu</p>
      </Collapse>,
    )
    const button = screen.getByRole('button', { name: 'Fiabilité' })
    await user.click(button)
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Contenu')).not.toBeVisible()
  })

  it('peut être ouvert dès l\'affichage avec defaultOpen', () => {
    render(
      <Collapse title="Description" defaultOpen>
        <p>Texte</p>
      </Collapse>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Texte')).toBeVisible()
  })

  it('se ferme au clic quand il était ouvert au départ', async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Description" defaultOpen>
        <p>Texte</p>
      </Collapse>,
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Texte')).not.toBeVisible()
  })

  it("s'ouvre et se ferme au clavier (touche Entrée)", async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Service">
        <p>Contenu</p>
      </Collapse>,
    )
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Contenu')).toBeVisible()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Contenu')).not.toBeVisible()
  })

  it('affiche tout type de contenu, par exemple une liste', async () => {
    const user = userEvent.setup()
    render(
      <Collapse title="Équipements">
        <ul>
          <li>Wifi</li>
          <li>Cuisine</li>
        </ul>
      </Collapse>,
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Wifi')).toBeVisible()
  })

  it('relie le bouton à son contenu (aria-controls)', () => {
    render(
      <Collapse title="Respect">
        <p>Contenu</p>
      </Collapse>,
    )
    const contentId = screen.getByRole('button').getAttribute('aria-controls')
    expect(document.getElementById(contentId)).toContainElement(screen.getByText('Contenu'))
  })

  it('utilise la taille "large" par défaut et accepte la taille "medium"', () => {
    const { container, rerender } = render(<Collapse title="A">x</Collapse>)
    expect(container.firstChild).toHaveClass('collapse--large')
    rerender(
      <Collapse title="A" size="medium">
        x
      </Collapse>,
    )
    expect(container.firstChild).toHaveClass('collapse--medium')
  })

  it('ajoute la classe "collapse--open" seulement quand il est ouvert', async () => {
    const user = userEvent.setup()
    const { container } = render(<Collapse title="A">x</Collapse>)
    expect(container.firstChild).not.toHaveClass('collapse--open')
    await user.click(screen.getByRole('button'))
    expect(container.firstChild).toHaveClass('collapse--open')
  })

  it('fonctionne indépendamment quand il y en a plusieurs', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Collapse title="Premier">
          <p>Un</p>
        </Collapse>
        <Collapse title="Second">
          <p>Deux</p>
        </Collapse>
      </>,
    )
    await user.click(screen.getByRole('button', { name: 'Premier' }))
    expect(screen.getByText('Un')).toBeVisible()
    expect(screen.getByText('Deux')).not.toBeVisible()
  })
})
