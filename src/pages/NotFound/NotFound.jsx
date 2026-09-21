import { Link } from 'react-router'
import './NotFound.css'

// Page affichée quand l'adresse n'existe pas (route "*")
function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">
        Oups! La page que vous demandez n&apos;existe pas.
      </p>
      <Link to="/" className="not-found__link">
        Retourner sur la page d&apos;accueil
      </Link>
    </section>
  )
}

export default NotFound
