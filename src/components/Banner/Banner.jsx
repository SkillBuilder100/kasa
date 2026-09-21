import './Banner.css'

// Bannière réutilisable : l'image et le titre (optionnel) sont passés en props
function Banner({ image, title }) {
  return (
    <section className="banner">
      <img src={image} alt="" className="banner__image" />
      {title && <h1 className="banner__title">{title}</h1>}
    </section>
  )
}

export default Banner
