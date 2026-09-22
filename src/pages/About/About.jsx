import Banner from '../../components/Banner/Banner.jsx'
import Collapse from '../../components/Collapse/Collapse.jsx'
import { aboutValues } from '../../data/aboutValues.js'
import bannerImage from '../../assets/banner-about.jpg'
import './About.css'

function About() {
  return (
    <>
      {/* Même composant Banner que l'accueil, avec une autre image et sans titre */}
      <Banner image={bannerImage} />
      <section className="about">
        {aboutValues.map((value) => (
          <Collapse key={value.title} title={value.title}>
            <p>{value.text}</p>
          </Collapse>
        ))}
      </section>
    </>
  )
}

export default About
