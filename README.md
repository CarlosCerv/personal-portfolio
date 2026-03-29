# Carlos Cervantes | QA & Performance Portfolio

[![Platform](https://img.shields.io/badge/Platform-Node.js-black?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-black?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

Portafolio profesional construido con Express y EJS para presentar servicios de QA, performance engineering, blog técnico, secciones editoriales y flujos de autenticación con sesiones.

Sitio en producción: [https://carloscervantes-qa.vercel.app](https://carloscervantes-qa.vercel.app)

## Qué incluye

- Home comercial con journeys visuales y animaciones suaves.
- Perfil, proyectos, podcast e intereses con diseño editorial unificado.
- Blog con filtros, etiquetas y detalle de posts.
- Registro, login y panel de usuario con sesiones.
- Panel admin privado accesible solo por URL.
- Metadatos SEO/Open Graph listos para compartir en WhatsApp y redes.

## Stack

- Backend: Node.js, Express, Mongoose
- Frontend: EJS, CSS personalizado, JavaScript vanilla
- Base de datos: MongoDB
- Auth y sesión: `express-session` + `connect-mongo`
- Deploy: Vercel

## Arranque local

```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

Variables recomendadas:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/personal-portfolio
SESSION_SECRET=replace-this-secret
ADMIN_PASSWORD=replace-this-password
SITE_URL=http://localhost:3000
GITHUB_TOKEN=optional
```

## Scripts

```bash
npm run dev
npm test
npm run build:favicon
```

`npm run build:favicon` genera `public/favicon.ico` a partir de los PNGs del logo actual.

## Estructura importante

- `app.js`: servidor Express, sesiones, metadatos y rutas
- `views/`: páginas y parciales EJS
- `public/css/style-redesign.css`: sistema visual principal
- `public/js/site.js`: interacciones y animaciones
- `posts/`: contenido Markdown del blog
- `docs/`: documentación de marca, contenido y despliegue

## Documentación

- [Brand Guide](docs/BRAND_GUIDE.md)
- [Content Update Guide](docs/CONTENT_UPDATE_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Notas

- El botón del admin no se muestra en la UI pública; el acceso es por URL.
- La aplicación usa un sistema híbrido de contenido: vistas estáticas + posts en MongoDB/Markdown.
- El branding actual usa `brand-mark.svg`, `favicon.ico` y `apple-touch-icon.png`.
