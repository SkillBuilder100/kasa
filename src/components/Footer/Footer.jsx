import Logo from '../Logo/Logo.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <Logo white className="footer__logo" />
      <p className="footer__text">© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer
