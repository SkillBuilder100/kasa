import Logo from '../Logo/Logo.jsx'
import './Footer.css'

/**
 * Pied de page commun à toutes les pages : logo blanc et mention de copyright.
 */
function Footer() {
  return (
    <footer className="footer">
      <Logo white className="footer__logo" />
      <p className="footer__text">© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer
