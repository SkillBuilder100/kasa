import { Link } from 'react-router'
import './NotFound.css'

/**
 * Page d'erreur 404 : affichée pour toute adresse qui n'existe pas (route "*")
 * et pour un logement dont l'identifiant est inconnu.
 */
function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">
        {/* Le retour à la ligne n'est visible qu'en mobile, comme sur la maquette */}
        Oups! La page que <br className="not-found__break" />
        vous demandez n&apos;existe pas.
      </p>
      <Link to="/" className="not-found__link">
        Retourner sur la page d&apos;accueil
      </Link>
    </section>
  )
}

export default NotFound
