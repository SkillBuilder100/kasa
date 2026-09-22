import { useId, useState } from 'react'
import './Collapse.css'

// Bloc dépliable : un titre toujours visible, un contenu affiché ou masqué au clic
// "children" permet de passer n'importe quel contenu : un paragraphe, une liste...
// "size" : "large" (page À propos) ou "medium" (fiche logement)
function Collapse({ title, children, defaultOpen = false, size = 'large' }) {
  // Deux états possibles : ouvert (true) ou fermé (false)
  const [isOpen, setIsOpen] = useState(defaultOpen)
  // Identifiant unique pour relier le bouton à son contenu (accessibilité)
  const contentId = useId()

  return (
    <div className={`collapse collapse--${size} ${isOpen ? 'collapse--open' : ''}`}>
      <button
        type="button"
        className="collapse__header"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="collapse__title">{title}</span>
        <svg
          className="collapse__arrow"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M2 17 L12 7 L22 17" />
        </svg>
      </button>
      <div id={contentId} className="collapse__body" hidden={!isOpen}>
        <div className="collapse__content">{children}</div>
      </div>
    </div>
  )
}

export default Collapse
