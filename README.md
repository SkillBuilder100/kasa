# Kasa

Application de location de logements entre particuliers, réalisée en React
dans le cadre du parcours OpenClassrooms.

## Fonctionnalités

- **Accueil** : bannière et galerie des logements, récupérés depuis l'API
- **Fiche logement** : carrousel de photos, titre, localisation, tags, hôte,
  note sur 5 étoiles, description et équipements dans des blocs dépliables
- **À propos** : valeurs de Kasa dans des blocs dépliables
- **Page 404** : pour toute adresse inexistante ou tout logement inconnu
- Mise en page PC et mobile (responsive) suivant la maquette Figma

## Technologies

- [React 19](https://react.dev) et [Vite](https://vite.dev)
- [React Router 8](https://reactrouter.com) pour la navigation
- CSS classique, un fichier par composant
- ESLint pour la qualité du code

## Installation et lancement

### 1. Lancer l'API (back-end)

L'API fournit la liste des logements. Elle tourne dans un conteneur Docker
et doit être lancée avant le site :

```bash
docker start kasa-api
```

Vérifier qu'elle répond : <http://localhost:8080/api/properties> doit afficher
la liste des logements.

### 2. Lancer le site (front-end)

```bash
npm install
npm start
```

Le site s'ouvre à l'adresse indiquée dans le terminal
(par défaut <http://localhost:5173>).

### Autres commandes

| Commande | Rôle |
|---|---|
| `npm start` / `npm run dev` | Lance le site en développement |
| `npm run build` | Crée la version de production dans `dist/` |
| `npm run preview` | Affiche la version de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm test` | Lance les tests |
| `npm run test:watch` | Relance les tests à chaque modification |
| `npm run coverage` | Lance les tests et affiche le taux de couverture |

### Adresse de l'API

Par défaut, le site appelle `http://localhost:8080/api`. Pour en utiliser
une autre, créer un fichier `.env` à la racine du projet :

```
VITE_API_URL=http://mon-serveur/api
```

## Routes

| Adresse | Page |
|---|---|
| `/` | Accueil |
| `/a-propos` | À propos |
| `/logement/:id` | Fiche du logement `id` (404 si l'identifiant est inconnu) |
| toute autre adresse | Page 404 |

## Structure du code

```
src/
├── api/config.js          Adresse de l'API
├── assets/                Logo et images des bannières
├── components/            Composants réutilisables
│   ├── Banner/            Bannière (accueil, à propos)
│   ├── Card/              Vignette d'un logement
│   ├── Collapse/          Bloc dépliable (à propos, fiche logement)
│   ├── Footer/            Pied de page
│   ├── Gallery/           Grille des vignettes
│   ├── Header/            En-tête et navigation
│   ├── Host/              Hôte du logement
│   ├── Layout/            Header + page + Footer
│   ├── Logo/              Logo Kasa
│   ├── Rating/            Note sur 5 étoiles
│   ├── Slideshow/         Carrousel de photos
│   └── Tags/              Tags du logement
├── data/aboutValues.js    Textes de la page À propos
├── hooks/useFetch.js      Hook de récupération des données
├── pages/                 Une page par route
│   ├── About/
│   ├── Home/
│   ├── Logement/
│   └── NotFound/
├── router/AppRouter.jsx   Définition des routes
├── App.jsx
├── main.jsx               Point d'entrée
└── index.css              Variables de couleurs et styles globaux
```

Chaque composant est documenté en [JSDoc](https://jsdoc.app) (rôle et props)
directement dans son fichier.

## Tests

Tests réalisés avec [Vitest](https://vitest.dev) et
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
Chaque fichier de test est placé à côté du composant qu'il teste
(`Slideshow.jsx` → `Slideshow.test.jsx`).

| Fichier testé | Type | Ce qui est vérifié |
|---|---|---|
| `Slideshow` | avec state | photo affichée, flèches et numéro, navigation dans les deux sens, passage de la dernière à la première photo et inversement, logement à une seule photo |
| `Collapse` | avec state | fermé au départ, ouverture et fermeture (souris et clavier), `defaultOpen`, tailles, plusieurs blocs indépendants |
| `Banner` | sans state | image, titre présent / absent / vide |
| `Card` | sans state | titre, lien vers la fiche, couverture présente / absente |
| `Rating`, `Tags`, `Host` | sans state | affichage selon les props reçues |
| `useFetch` | hook | chargement, données, erreur 404, API injoignable, changement d'URL, annulation |
| `App` | intégration | toutes les routes, clic sur une vignette, menu, pages 404, identifiant inconnu, API injoignable |

Taux de couverture : **100 %** des lignes, branches et fonctions sur l'ensemble
des fichiers (`npm run coverage`).

## Choix techniques

- **Routeur dans un composant dédié** (`router/AppRouter.jsx`), avec des routes
  imbriquées : le `Layout` affiche Header et Footer autour de la page en cours
  (`<Outlet />`).
- **Page 404** : la route `*` attrape toute adresse inexistante. Pour un
  logement, l'API répond 404 quand l'identifiant est inconnu, et la fiche
  affiche alors la page 404. L'identifiant est encodé (`encodeURIComponent`)
  avant l'appel à l'API.
- **Hook personnalisé `useFetch`** : récupère les données avec `useState` et
  `useEffect`, gère le chargement et les erreurs, et annule la requête si on
  quitte la page avant la réponse.
- **Listes sans warning** : chaque élément répété a une `key` unique et stable
  (identifiant du logement, nom du tag ou de l'équipement), jamais l'index.
- **Composants réutilisables** : `Collapse` existe en deux tailles
  (`large` pour À propos, `medium` pour la fiche logement) ; `Banner` accepte
  un titre facultatif.
- **Carrousel** : navigation en boucle (de la première photo, la flèche gauche
  mène à la dernière) ; ni flèche ni numéro pour un logement à une seule photo.
