import logo from '../../assets/logo.png'
import './Logo.css'

// Logo Kasa exporté depuis Figma
// La prop "white" l'affiche en blanc (utilisé dans le Footer)
function Logo({ white = false, className = '' }) {
  return (
    <img
      src={logo}
      alt="Kasa"
      className={`logo ${white ? 'logo--white' : ''} ${className}`}
    />
  )
}

export default Logo
