# Content Update Guide

Guía rápida para actualizar el contenido principal del sitio sin romper el diseño actual.

## Home

Archivo:

- `views/index.ejs`

Aquí se controlan:

- Hero principal
- Journeys visuales del home
- CTAs y bloques de confianza

## Perfil

Archivo:

- `views/profile.ejs`

Aquí se actualizan:

- Bio y experiencia
- Skills
- Timeline
- Sección visual tipo profile del template

## Proyectos

Archivos:

- `views/projects.ejs`
- `app.js`

La página se alimenta del perfil de GitHub configurado en `app.js` mediante `GITHUB_USERNAME`.

## Blog

Archivos:

- `views/blog.ejs`
- `views/post.ejs`
- `posts/`
- `app.js`

Opciones:

- Admin: `/admin`
- Markdown directo: crear o editar archivos en `posts/`

## Podcast e Intereses

Archivos:

- `views/podcast.ejs`
- `views/hobbies.ejs`
- `views/hobby-detail.ejs`
- `app.js`

Los datos largos de hobbies viven en `getHobbyData()` dentro de `app.js`.

## Navegación y Footer

Archivos:

- `views/partials/navigation.ejs`
- `views/partials/footer.ejs`

## Branding y metadatos

Archivos:

- `views/partials/header.ejs`
- `public/images/brand-mark.svg`
- `public/favicon.ico`
- `public/images/apple-touch-icon.png`
- `app.js`

Si cambias el logo:

```bash
npm run build:favicon
```

## Estilos e interacciones

Archivos:

- `public/css/style-redesign.css`
- `public/js/site.js`

El diseño actual vive principalmente en esos dos archivos. Los assets heredados de la línea `apple` se mantienen aparte para no mezclar sistemas visuales.
