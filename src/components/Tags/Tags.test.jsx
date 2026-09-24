import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tags from './Tags.jsx'

describe('Tags (composant sans state)', () => {
  it('affiche un élément de liste par tag', () => {
    render(<Tags tags={['Cozy', 'Canal', 'Paris 10']} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items.map((item) => item.textContent)).toEqual(['Cozy', 'Canal', 'Paris 10'])
  })

  it("affiche une liste vide quand il n'y a pas de tag", () => {
    render(<Tags tags={[]} />)
    expect(screen.getByRole('list')).toBeEmptyDOMElement()
  })
})
