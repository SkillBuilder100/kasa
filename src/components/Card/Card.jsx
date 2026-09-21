import { Link } from 'react-router'
import './Card.css'

// Vignette d'un logement : image de couverture (optionnelle) + titre
// Un clic mène à la fiche du logement
function Card({ id, title, cover }) {
  return (
    <Link to={`/logement/${id}`} className="card">
      {cover && <img src={cover} alt="" className="card__image" />}
      <h2 className="card__title">{title}</h2>
    </Link>
  )
}

export default Card
