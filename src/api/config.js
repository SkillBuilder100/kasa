// Adresse de l'API (back-end lancé avec Docker)
// Peut être changée avec la variable d'environnement VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'
