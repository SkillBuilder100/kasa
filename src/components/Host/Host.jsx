import './Host.css'

// Hôte du logement : prénom et nom sur deux lignes, puis sa photo
function Host({ name, picture }) {
  // "Nathalie Jean" → prénom "Nathalie", nom "Jean"
  const [firstName, ...lastName] = name.split(' ')

  return (
    <div className="host">
      <p className="host__name">
        {firstName}
        <br />
        {lastName.join(' ')}
      </p>
      <img src={picture} alt={name} className="host__picture" />
    </div>
  )
}

export default Host
