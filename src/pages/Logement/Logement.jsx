import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch.js'
import { API_URL } from '../../api/config.js'
import NotFound from '../NotFound/NotFound.jsx'

// Fiche d'un logement : l'identifiant vient de l'adresse (/logement/:id)
function Logement() {
  const { id } = useParams()
  const { data: logement, isLoading, error } = useFetch(`${API_URL}/properties/${id}`)

  if (isLoading) return <p>Chargement…</p>
  // Identifiant inconnu : l'API répond 404, on affiche la page 404
  if (error?.status === 404) return <NotFound />
  if (error) return <p>Impossible de charger ce logement.</p>

  return <h1>{logement.title}</h1>
}

export default Logement
