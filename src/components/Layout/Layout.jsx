import { Outlet } from 'react-router'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import './Layout.css'

/**
 * Structure commune à toutes les pages : Header, contenu de la page, Footer.
 * Le contenu de la page en cours est affiché à la place de <Outlet />
 * (routes imbriquées de React Router).
 */
function Layout() {
  return (
    <div className="layout">
      <div className="layout__container">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      {/* Le Footer est en dehors du conteneur : il prend toute la largeur de l'écran */}
      <Footer />
    </div>
  )
}

export default Layout
