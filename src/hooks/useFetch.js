import { useEffect, useState } from 'react'

/**
 * Hook personnalisé : récupère les données JSON d'une URL.
 * La requête est relancée quand l'URL change, et annulée si le composant
 * disparaît avant la réponse.
 *
 * @param {string} url - Adresse à appeler
 * @returns {{data: any, isLoading: boolean, error: (Error & {status?: number})|null}}
 *   - data : données reçues (null pendant le chargement ou en cas d'erreur)
 *   - isLoading : true tant que la réponse n'est pas arrivée
 *   - error : erreur éventuelle ; error.status contient le code HTTP (ex : 404)
 */
function useFetch(url) {
  // On mémorise pour quelle URL la réponse a été reçue :
  // tant qu'elle ne correspond pas à l'URL demandée, on est en chargement
  const [result, setResult] = useState({ url: null, data: null, error: null })

  useEffect(() => {
    // Permet d'annuler la requête si le composant disparaît ou si l'URL change
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          const error = new Error(`Erreur ${response.status}`)
          error.status = response.status
          throw error
        }
        return response.json()
      })
      .then((data) => setResult({ url, data, error: null }))
      .catch((error) => {
        // Requête annulée volontairement : on ne fait rien
        if (error.name === 'AbortError') return
        setResult({ url, data: null, error })
      })

    return () => controller.abort()
  }, [url])

  const isLoading = result.url !== url

  return {
    data: isLoading ? null : result.data,
    error: isLoading ? null : result.error,
    isLoading,
  }
}

export default useFetch
