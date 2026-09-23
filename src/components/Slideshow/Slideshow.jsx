import { useState } from 'react'
import './Slideshow.css'

/**
 * Flèche du carrousel : chevron de 46.68 x 79.2px (Figma), trait de 10px,
 * dessiné vers la droite ; la flèche gauche est la même, retournée en CSS.
 *
 * @param {Object} props
 * @param {'left'|'right'} props.direction - Sens de la flèche
 */
function Arrow({ direction }) {
  return (
    <svg
      className={`slideshow__arrow-icon slideshow__arrow-icon--${direction}`}
      viewBox="0 0 46.68 79.2"
      aria-hidden="true"
    >
      <path d="M5 5 L39.6 39.6 L5 74.2" />
    </svg>
  )
}

/**
 * Carrousel des photos d'un logement.
 * - Les flèches font défiler les photos en boucle : de la première,
 *   la flèche gauche mène à la dernière, et inversement.
 * - S'il n'y a qu'une photo, ni flèche ni numéro ne sont affichés.
 *
 * @param {Object} props
 * @param {string[]} props.pictures - URL des photos du logement
 * @param {string} props.title - Titre du logement (texte alternatif des photos)
 */
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
