import { Link } from 'react-router'
import './Card.css'

/**
 * Vignette d'un logement dans la galerie de l'accueil.
 * Un clic mène à la fiche du logement (/logement/:id).
 *
 * @param {Object} props
 * @param {string} props.id - Identifiant du logement (utilisé dans l'adresse)
 * @param {string} props.title - Titre du logement
 * @param {string} [props.cover] - URL de la photo de couverture
 */
function Card({ id, title, cover }) {
  return (
    <Link to={`/logement/${id}`} className="card">
      {cover && <img src={cover} alt="" className="card__image" />}
      <h2 className="card__title">{title}</h2>
    </Link>
  )
}

export default Card
