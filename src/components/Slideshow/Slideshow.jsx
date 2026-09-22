import { useState } from 'react'
import './Slideshow.css'

// Flèche du carrousel (chevron), orientée vers la gauche ou vers la droite
function Arrow({ direction }) {
  const path = direction === 'left' ? 'M40 4 L8 40 L40 76' : 'M8 4 L40 40 L8 76'
  return (
    <svg className="slideshow__arrow-icon" viewBox="0 0 48 80" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

// Carrousel de photos d'un logement
function Slideshow({ pictures, title }) {
  // Index de la photo affichée (0 = première photo)
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = pictures.length

  // Photo précédente : depuis la première, on revient à la dernière
  const showPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? total - 1 : index - 1))
  }

  // Photo suivante : depuis la dernière, on revient à la première
  const showNext = () => {
    setCurrentIndex((index) => (index === total - 1 ? 0 : index + 1))
  }

  return (
    <section className="slideshow" aria-label={`Photos de ${title}`}>
      <img
        src={pictures[currentIndex]}
        alt={`${title} - photo ${currentIndex + 1} sur ${total}`}
        className="slideshow__image"
      />

      {/* Flèches et numéro seulement s'il y a plus d'une photo */}
      {total > 1 && (
        <>
          <button
            type="button"
            className="slideshow__arrow slideshow__arrow--left"
            onClick={showPrevious}
            aria-label="Photo précédente"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            className="slideshow__arrow slideshow__arrow--right"
            onClick={showNext}
            aria-label="Photo suivante"
          >
            <Arrow direction="right" />
          </button>
          <p className="slideshow__counter">
            {currentIndex + 1}/{total}
          </p>
        </>
      )}
    </section>
  )
}

export default Slideshow
