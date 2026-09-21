import Card from '../Card/Card.jsx'
import './Gallery.css'

// Grille des vignettes de logements
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
