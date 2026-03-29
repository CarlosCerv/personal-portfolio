# Deployment Guide

Esta aplicación se despliega en Vercel y usa MongoDB para posts, usuarios, comentarios y sesiones.

## Requisitos

- Node.js 18+
- MongoDB Atlas o local
- Cuenta de Vercel

## Variables de entorno

```env
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=replace-this-secret
ADMIN_PASSWORD=replace-this-password
SITE_URL=https://carloscervantes-qa.vercel.app
GITHUB_TOKEN=optional
NODE_ENV=production
```

## Despliegue manual

```bash
npm install
npm test
npx vercel --prod
```

## Qué validar después del deploy

- Home carga correctamente
- Blog lista posts y abre detalles
- Login y registro funcionan
- `/account` requiere sesión
- `/admin` sigue accesible por URL
- Favicon y logo se muestran con la identidad actual

## Archivos relevantes

- `vercel.json`
- `app.js`
- `views/partials/header.ejs`
- `public/favicon.ico`

## Notas

- La URL productiva principal es `https://carloscervantes-qa.vercel.app`.
- El proyecto usa `express-session` con `connect-mongo`, así que `MONGODB_URI` es obligatorio también para sesiones en producción.
- Si se actualiza el logo, vuelve a correr `npm run build:favicon` antes de desplegar.
