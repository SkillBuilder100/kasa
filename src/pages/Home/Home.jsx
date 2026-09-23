import Banner from '../../components/Banner/Banner.jsx'
import Gallery from '../../components/Gallery/Gallery.jsx'
import useFetch from '../../hooks/useFetch.js'
import { API_URL } from '../../api/config.js'
import bannerImage from '../../assets/banner-home.jpg'
import './Home.css'

/**
 * Page d'accueil (/) : bannière et galerie des logements récupérés depuis l'API.
 * Affiche un message pendant le chargement ou si l'API ne répond pas.
 */
function Home() {
  // Liste des logements récupérée depuis l'API
  const { data: logements, isLoading, error } = useFetch(`${API_URL}/properties`)

  return (
    <>
      <Banner image={bannerImage} title="Chez vous, partout et ailleurs" />
      {isLoading && <p className="home__message">Chargement des logements…</p>}
      {error && (
        <p className="home__message">
          Impossible de charger les logements. Vérifiez que l&apos;API est lancée.
        </p>
      )}
      {logements && <Gallery logements={logements} />}
    </>
  )
}

export default Home
