import Card from '../Card/Card.jsx'
import './Gallery.css'

/**
 * Grille des vignettes de logements sur l'accueil.
 * Affiche 6 logements à la fois sur PC (3 en mobile), les suivants en défilant.
 *
 * @param {Object} props
 * @param {Array<{id: string, title: string, cover: string}>} props.logements
 *   - Liste des logements renvoyée par l'API
 */
function Gallery({ logements }) {
  return (
    <section className="gallery">
      {logements.map((logement) => (
        <Card
          key={logement.id}
          id={logement.id}
          title={logement.title}
          cover={logement.cover}
        />
      ))}
    </section>
  )
}

export default Gallery
