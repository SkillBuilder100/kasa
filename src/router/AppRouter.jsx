import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from '../components/Layout/Layout.jsx'
import Home from '../pages/Home/Home.jsx'
import About from '../pages/About/About.jsx'
import Logement from '../pages/Logement/Logement.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'

/**
 * Routeur de l'application : associe chaque adresse à sa page.
 * Toutes les pages partagent le Layout (Header + Footer).
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Toutes les pages partagent le Layout (Header + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          {/* ":id" est une partie variable de l'adresse : /logement/c67ab8a7, /logement/b9123946... */}
          <Route path="/logement/:id" element={<Logement />} />
          {/* "*" attrape toutes les adresses qui n'existent pas */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
