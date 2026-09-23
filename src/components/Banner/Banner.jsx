import './Banner.css'

/**
 * Bannière en haut de page : une photo assombrie, avec un titre optionnel.
 * Réutilisée sur l'accueil (avec titre) et sur la page À propos (sans titre).
 *
 * @param {Object} props
 * @param {string} props.image - Image de fond (fichier importé ou URL)
 * @param {string} [props.title] - Titre affiché sur la photo (facultatif)
 */
function Banner({ image, title }) {
  return (
    <section className="banner">
      <img src={image} alt="" className="banner__image" />
      {title && <h1 className="banner__title">{title}</h1>}
    </section>
  )
}

export default Banner
