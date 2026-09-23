import './Tags.css'

/**
 * Liste des tags du logement (quartier, ambiance...).
 *
 * @param {Object} props
 * @param {string[]} props.tags - Tags du logement (uniques, servent de clé React)
 */
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
