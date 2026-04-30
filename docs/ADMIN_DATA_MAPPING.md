# Admin Panel · Mapeo de Datos (Supabase)

## Blog
- Tabla: `blog_posts`
- API admin: `/api/admin/blog`, `/api/admin/blog/[id]`
- Admin UI: `/admin/blog`, `/admin/blog/nuevo`, `/admin/blog/[id]`
- Sitio público: `/blog`, `/blog/[slug]`

Campos esperados:
- `titulo`, `slug`, `excerpt`, `categoria`, `tags`, `contenido`
- `imagen_portada`, `estado`, `autor`, `published_at`, `updated_at`

## Perfil
- Tabla: `site_profile`
- API admin: `/api/admin/profile`
- Admin UI: `/admin/perfil`
- Sitio público: `/profile`

Campos clave:
- Identidad: `nombre_mostrado`, `nombre_completo`, `headline`, `empresa_actual`, `ubicacion`
- Contacto: `email_contacto`, `linkedin_url`, `github_url`, `twitter_url`, `cv_url`
- Secciones JSON: `stats`, `roles`, `idiomas`, `skills`, `educacion`, `experiencia`, `proyectos`, `certificaciones`, `recomendaciones`

## Intereses
- Tabla: `site_interests`
- API admin: `/api/admin/intereses`, `/api/admin/intereses/[id]`
- Admin UI: `/admin/intereses`, `/admin/intereses/nuevo`, `/admin/intereses/[id]`
- Sitio público: `/intereses`, `/intereses/[slug]`

Campos esperados:
- Base: `slug`, `title`, `subtitle`, `icon`, `background_image`
- Contenido: `description`, `why`, `experience`
- Listas JSON: `highlights`, `goals`, `equipment`, `resources`
- Operación: `visible`, `sort_order`, `updated_at`

## Verificación rápida antes de operar
1. Ir a `/admin/sistema` y ejecutar validación.
2. Confirmar que todas las tablas estén en `OK`.
3. Crear un post de prueba en `/admin/blog/nuevo` y validar en `/blog`.
4. Crear un interés de prueba en `/admin/intereses/nuevo` y validar en `/intereses`.
5. Editar perfil en `/admin/perfil` y validar en `/profile`.
