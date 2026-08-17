# Book Catalog

## [Task](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view) 

## How to run the app

- Install dependencies:

```bash
  npm install
```

- Run development server:

```bash
  npm run dev
```

- Create production build:

```bash
  npm run build
```

- Preview production build:

```bash
  npm run preview
```

## Project structure

| Folder / file        | What it contains                                                                                          |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| `src/main.js`         | Application entry point that initializes search, tabs, author filtering, and favorites.              |
| `src/api/`            | Functions for interacting with the Open Library API, including book search and cover image URL generation.                |
| `src/state/`          | Application state and persistence: search results and the favorites list stored in localStorage. |
| `src/ui/`             | DOM rendering and event handling for the search form, book cards, tabs, author filter, and status messages. |
| `src/utils/`          | Small reusable helpers without DOM or API dependencies, such as debounce and search input validation.                 |
| `src/theme.js`        | Light/dark theme toggle logic, persisted in `localStorage`.                                                 |
| `src/assets/`         | SVG icons imported into JS/HTML and bundled by Vite.                 |
| `src/style.css`       | Global styles and responsive layouts for mobile devices.                                                 |
| `index.html`          | Root HTML template used by Vite in development and production builds.                                                |
| `vite.config.js`      | Vite configuration for the application build.                                                                                 |
