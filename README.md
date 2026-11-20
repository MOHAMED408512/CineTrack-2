# CinéTrack

CinéTrack est un petit catalogue en ligne pour découvrir des films et des séries. Dans la partie 2, les données viennent d'une API REST créée avec MockAPI, et on peut gérer les titres depuis une page d'administration et ajouter des commentaires. L'interface est faite en HTML, Tailwind CSS et JavaScript.

## Liens

- Projet déployé : _à compléter_
- Tableau Kanban Jira : _à compléter_
- API MockAPI : https://6afaed13730c1d152f32c202.mockapi.io/api/v1

## Fonctionnalités

### Catalogue (partie 1)

- Affichage de chaque film ou série sous forme de card : image, titre, année et type.
- Recherche d'un titre.
- Filtre par type : Tous, Films, Séries.
- La recherche et le filtre fonctionnent séparément et ensemble.
- Pagination : 8 titres par page. On revient à la page 1 après une recherche ou un changement de filtre.
- Modal au clic sur une card : image en grand, titre, type, année, durée (film) ou saisons (série), genres, réalisateurs, pays et description.
- La modal se ferme avec le bouton X ou en cliquant en dehors.
- Ajout d'un titre aux favoris avec le bouton cœur, sans doublon.
- Sidebar des favoris avec le nombre de films et de séries, et un bouton X pour retirer un favori.
- Les favoris restent après l'actualisation de la page.
- Un message d'erreur s'affiche si les données ne se chargent pas.

### Administration (partie 2)

- Page `admin.html` avec la liste des films et des séries : image, titre, type, année, boutons Modifier et Supprimer.
- Ajout d'un titre avec un formulaire.
- Modification d'un titre : le même formulaire se remplit avec les informations du titre. Le titre du formulaire et le texte du bouton changent.
- Suppression d'un titre après confirmation.
- Validation du formulaire avant l'envoi, avec le message d'erreur sous le champ :
  - le titre est obligatoire ;
  - le type est obligatoire ;
  - l'année est entre 1900 et l'année actuelle ;
  - l'URL de l'image est valide ;
  - la durée est obligatoire pour un film, le nombre de saisons pour une série.
- Messages de chargement, de succès et d'erreur.
- Les modifications restent car elles sont enregistrées dans MockAPI.

### Commentaires (partie 2)

- Dans la modal, on voit les commentaires du titre (auteur, date et texte), ou « Aucun commentaire ».
- On peut ajouter un commentaire avec un nom et un texte (les deux sont obligatoires).
- Le nouveau commentaire s'affiche sans recharger la page.
- Un message de chargement s'affiche pendant la récupération des commentaires.
- Le pseudo est gardé dans localStorage pour ne pas le retaper.

## Technologies

- HTML
- Tailwind CSS (CDN)
- JavaScript avec modules ES (import / export)
- Fetch API avec async / await et try / catch
- MockAPI (API REST)
- localStorage

## Structure du projet

```
CineTrack-2/
├── index.html
├── admin.html
├── README.md
└── js/
    ├── api.js
    ├── cards.js
    ├── cinetrack.js
    ├── infoCard.js
    ├── comments.js
    ├── filter.js
    ├── pagination.js
    ├── favorites.js
    ├── SideBarFavorite.js
    ├── admin.js
    ├── ui.js
    └── validators.js
```

## Rôle de chaque fichier

| Fichier              | Rôle                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `index.html`         | La page du catalogue, avec des conteneurs vides. Le contenu est créé par JavaScript.                    |
| `admin.html`         | La page d'administration : formulaire et liste des titres.                                              |
| `api.js`             | Parle avec MockAPI : lire, ajouter, modifier et supprimer les titres, lire et ajouter les commentaires. |
| `cards.js`           | Crée les cards avec `map` et les affiche dans la page.                                                  |
| `infoCard.js`        | Remplit, ouvre et ferme la modal.                                                                       |
| `comments.js`        | Charge les commentaires du titre, vérifie le formulaire et ajoute un commentaire.                       |
| `filter.js`          | Contient les trois fonctions : recherche, filtre par type et pagination.                                |
| `pagination.js`      | Crée les boutons des pages.                                                                             |
| `favorites.js`       | Lit et enregistre les favoris dans localStorage.                                                        |
| `SideBarFavorite.js` | Affiche les favoris dans la sidebar et compte les films et les séries.                                  |
| `cinetrack.js`       | Fichier principal du catalogue : il relie les modules et gère les événements.                           |
| `admin.js`           | Fichier principal de l'administration : liste, formulaire, ajout, modification, suppression.            |
| `ui.js`              | Affiche le message de chargement et les messages de succès ou d'erreur.                                 |
| `validators.js`      | Vérifie les champs du formulaire d'administration.                                                      |

## API MockAPI

Il y a deux ressources.

### `contents` (les films et les séries)

| Champ               | Type                         |
| ------------------- | ---------------------------- |
| id                  | Object ID                    |
| title               | String                       |
| image               | String                       |
| description         | String                       |
| type                | String (`movie` ou `series`) |
| releaseYear         | Number                       |
| duration            | Number (films)               |
| seasons             | Array (séries)               |
| genres              | Array                        |
| directors           | Array                        |
| productionCountries | Array                        |

### `comments` (les commentaires)

| Champ     | Type                                 |
| --------- | ------------------------------------ |
| id        | Object ID                            |
| contentId | String (l'id du film ou de la série) |
| author    | String                               |
| text      | String                               |
| rating    | Number (pas utilisé pour le moment)  |
| createdAt | Date                                 |

### Les routes utilisées

| Méthode | URL             | Rôle                           |
| ------- | --------------- | ------------------------------ |
| GET     | `/contents`     | Lister les films et les séries |
| POST    | `/contents`     | Ajouter un titre               |
| PUT     | `/contents/:id` | Modifier un titre              |
| DELETE  | `/contents/:id` | Supprimer un titre             |
| GET     | `/comments`     | Lister les commentaires        |
| POST    | `/comments`     | Ajouter un commentaire         |

Avec POST et PUT, on envoie le JSON avec l'en-tête `Content-Type: application/json` et `JSON.stringify`.

## Méthodes JavaScript utilisées

- `map` : créer les cards et les lignes de la liste d'administration.
- `filter` : la recherche, le filtre par type, retirer un titre supprimé de la liste et garder les commentaires d'un titre.
- `find` : retrouver le titre à afficher dans la modal ou à modifier dans le formulaire.
- `reduce` : compter les films et les séries dans les favoris.
- `slice` : couper la liste pour afficher 8 titres par page.
- `split` et `trim` : transformer « Drame, Crime » en liste de genres.
- `...` (spread) : fusionner l'ancien titre avec les nouvelles données avant le PUT.

## Ordre de l'affichage (catalogue)

À chaque action (recherche, filtre, changement de page), la fonction `updatelPage` suit toujours le même ordre :

1. Recherche
2. Filtre par type
3. Pagination
4. Affichage des cards et des boutons de pages

## Ajouter et modifier un titre

Un seul formulaire sert pour les deux. La variable `editingId` dit ce qu'on fait :

- `editingId` est `null` : on ajoute avec POST.
- `editingId` contient un id : on modifie avec PUT.

Quand on clique sur Modifier, on retrouve le titre avec `find`, on remplit le formulaire et on garde son id dans `editingId`. Après l'enregistrement, on met la liste à jour et on vide le formulaire.

Pour une série, le nombre de saisons saisi (par exemple 3) est transformé en liste `[1, 2, 3]`, car l'API enregistre `seasons` sous forme de tableau.

## Favoris et localStorage

Seuls les id des favoris sont enregistrés, par exemple `["1", "5"]`. `localStorage` sert aussi à retenir le pseudo des commentaires. Les commentaires, eux, sont enregistrés dans l'API.

- `JSON.stringify` transforme la liste en texte pour l'enregistrer.
- `JSON.parse` transforme le texte en liste quand on la relit.
- Avant d'ajouter un id, on vérifie avec `includes` qu'il n'est pas déjà dans la liste. Il n'y a donc pas de doublon.

## stopPropagation

Un clic sur le cœur ne doit pas ouvrir la modal. Dans le code, le cœur est vérifié en premier, on appelle `event.stopPropagation()` et on termine avec `return`. Le code qui ouvre la modal ne s'exécute donc pas.

## Gestion des erreurs

- `api.js` vérifie `response.ok` dans la fonction `request` et lance une erreur si le serveur répond mal.
- `try / catch` attrape l'erreur dans `cinetrack.js`, `admin.js` et `comments.js`, et affiche un message clair dans la page.
- Le message de chargement est caché dans les deux cas (succès ou erreur).

#

## Auteur

[Mohamed sidi hmed]

novembre 2026
