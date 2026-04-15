# Carlos Cervantes | QA & Performance Portfolio

Portafolio profesional construido con Next.js App Router para presentar servicios de QA, performance engineering, perfil profesional, blog técnico y flujos de diagnóstico asistido por IA.

Sitio en producción: [https://carloscervantes-qa.vercel.app](https://carloscervantes-qa.vercel.app)

## Stack actual

- Framework: Next.js 16 + React 19 + TypeScript
- UI: Tailwind CSS 4 + Framer Motion
- Datos: Supabase + Markdown + soporte Mongo para posts públicos existentes
- Deploy: Vercel

## Qué incluye

- Home comercial con journeys visuales y composición editorial.
- Página de servicios con diagnóstico asistido por IA.
- Perfil profesional completo editable desde `/admin/perfil`.
- Blog público conectado a Supabase con fallback a contenido existente.
- Secciones públicas para contacto, podcast, intereses y política de privacidad.
- Metadatos Open Graph y estructura optimizada para compartir.

## Arranque local

```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

## Variables de entorno

Usa `.env.example` como base. Las variables más importantes son:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
MONGODB_URI=your_mongodb_connection
ANTHROPIC_API_KEY=your_anthropic_api_key
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=verified_sender@example.com
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
npm run build:favicon
```

## Estructura principal

- `app/`: rutas públicas y APIs App Router
- `components/`: shell del sitio, secciones y bloques del perfil
- `lib/`: contenido, metadata, IA, Supabase y utilidades
- `models/Post.js`: modelo de posts para compatibilidad con contenido existente
- `posts/`: artículos en Markdown
- `public/`: assets del sitio
- `docs/`: documentación vigente del rediseño y del sistema visual

## Estado del proyecto

- Solo se mantiene la arquitectura actual basada en Next.js.
- La estructura del repositorio está alineada al frontend premium vigente.
- El diseño actual responde al último rediseño visual aplicado al sitio público.
