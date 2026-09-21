import Banner from '../../components/Banner/Banner.jsx'
import Gallery from '../../components/Gallery/Gallery.jsx'
import useFetch from '../../hooks/useFetch.js'
import { API_URL } from '../../api/config.js'
// Image provisoire : à remplacer par la photo de la falaise (Image source 1)
import bannerImage from '../../assets/banner-about.jpg'
import './Home.css'

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
