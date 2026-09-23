import logo from '../../assets/logo.png'
import './Logo.css'

/**
 * Logo Kasa exporté depuis Figma.
 *
 * @param {Object} props
 * @param {boolean} [props.white=false] - Affiche le logo en blanc (Footer)
 * @param {string} [props.className=''] - Classe CSS supplémentaire (taille)
 */
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
