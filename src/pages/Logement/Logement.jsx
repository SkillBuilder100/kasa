import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch.js'
import { API_URL } from '../../api/config.js'
import Slideshow from '../../components/Slideshow/Slideshow.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import './Logement.css'

// Fiche d'un logement : l'identifiant vient de l'adresse (/logement/:id)
function Logement() {
  const { id } = useParams()
  const { data: logement, isLoading, error } = useFetch(`${API_URL}/properties/${id}`)

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
      <h1 className="logement__title">{logement.title}</h1>
    </article>
  )
}

export default Logement
