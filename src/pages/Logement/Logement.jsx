import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch.js'
import { API_URL } from '../../api/config.js'
import Slideshow from '../../components/Slideshow/Slideshow.jsx'
import Host from '../../components/Host/Host.jsx'
import Rating from '../../components/Rating/Rating.jsx'
import Collapse from '../../components/Collapse/Collapse.jsx'
import Tags from '../../components/Tags/Tags.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import './Logement.css'

/**
 * Fiche d'un logement (/logement/:id).
 * L'identifiant vient de l'adresse ; le logement est demandé à l'API.
 * - Identifiant inconnu (l'API répond 404) : affiche la page 404.
 * - API injoignable : affiche un message d'erreur.
 */
function Logement() {
  const { id } = useParams()
  // encodeURIComponent : un identifiant contenant "?", "/" ou ".." ne doit pas
  // modifier l'adresse appelée (ex : "c67ab8a7?x=1" ne doit pas devenir "c67ab8a7")
  const { data: logement, isLoading, error } = useFetch(
    `${API_URL}/properties/${encodeURIComponent(id)}`,
  )

  if (isLoading) return <p className="logement__message">Chargement…</p>
  // Identifiant inconnu : l'API répond 404, on affiche la page 404
  if (error?.status === 404) return <NotFound />
  if (error) {
    return <p className="logement__message">Impossible de charger ce logement.</p>
  }

  return (
    <article className="logement">
      {/* key : le carrousel repart de la 1re photo quand on change de logement */}
      <Slideshow key={logement.id} pictures={logement.pictures} title={logement.title} />
      {/* À gauche : titre, localisation (30px sous le carrousel) et tags
          À droite : l'hôte (24px sous le carrousel) et la note */}
      <div className="logement__header">
        <div className="logement__info">
          <div className="logement__heading">
            <h1 className="logement__title">{logement.title}</h1>
            <p className="logement__location">{logement.location}</p>
          </div>
          {/* Tags 20px sous la localisation */}
          <Tags tags={logement.tags} />
        </div>
        {/* À droite : l'hôte, puis la note 21px en dessous */}
        <div className="logement__host-rating">
          <Host name={logement.host.name} picture={logement.host.picture} />
          <Rating value={logement.rating} />
        </div>
      </div>

      {/* Description et équipements : 24px sous les tags, deux menus de 582px, 76px d'écart */}
      <div className="logement__details">
        <Collapse title="Description" size="medium">
          <p>{logement.description}</p>
        </Collapse>
        <Collapse title="Équipements" size="medium">
          <ul>
            {logement.equipments.map((equipment) => (
              <li key={equipment}>{equipment}</li>
            ))}
          </ul>
        </Collapse>
      </div>
    </article>
  )
}

export default Logement
