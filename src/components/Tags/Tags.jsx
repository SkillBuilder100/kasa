import './Tags.css'

// Liste des tags du logement (quartier, ambiance...)
function Tags({ tags }) {
  return (
    <ul className="tags">
      {tags.map((tag) => (
        <li key={tag} className="tags__item">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default Tags
