/**
 * Adresse de base de l'API Kasa (back-end lancé avec Docker).
 * Peut être remplacée par la variable d'environnement VITE_API_URL
 * (fichier .env à la racine du projet).
 * @type {string}
 */
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'
