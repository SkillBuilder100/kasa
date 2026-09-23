import './Rating.css'

const MAX_STARS = 5

/**
 * Étoile en SVG.
 *
 * @param {Object} props
 * @param {boolean} props.filled - Étoile pleine (rouge) ou vide (grise)
 */
function Star({ filled }) {
  return (
    <svg
      className={`rating__star ${filled ? 'rating__star--filled' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.6l-6.6 3.9 1.7-7.4-5.6-5 7.4-.7z" />
    </svg>
  )
}

/**
 * Note du logement sur 5 étoiles.
 *
 * @param {Object} props
 * @param {string|number} props.value - Note de 1 à 5 (l'API l'envoie en texte : "4")
 */
function Rating({ value }) {
  // L'API envoie la note sous forme de texte ("4") : on la convertit en nombre
  const rating = Number(value)

  return (
    <div className="rating" role="img" aria-label={`Note : ${rating} sur ${MAX_STARS}`}>
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Star key={index} filled={index < rating} />
      ))}
    </div>
  )
}

export default Rating
