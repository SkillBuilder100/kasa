import { Link, NavLink } from 'react-router'
import Logo from '../Logo/Logo.jsx'
import './Header.css'

/**
 * En-tête commun à toutes les pages : logo (lien vers l'accueil) et menu
 * de navigation. Le lien de la page en cours est souligné.
 */
function Header() {
  return (
    <header className="header">
      <Link to="/" aria-label="Retour à l'accueil">
        <Logo className="header__logo" />
      </Link>
      <nav className="header__nav">
        {/* NavLink ajoute automatiquement la classe "active" sur le lien de la page en cours.
            "end" : le lien n'est actif que sur l'adresse exacte (pas sur /a-propos/test) */}
        <NavLink to="/" end className="header__link">
          Accueil
        </NavLink>
        <NavLink to="/a-propos" end className="header__link">
          A Propos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
