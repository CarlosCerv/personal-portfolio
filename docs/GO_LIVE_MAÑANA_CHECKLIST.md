# Go-Live Mañana · Checklist Operativa

## 1) Base de datos (Supabase)
1. Abrir SQL Editor.
2. Ejecutar [`SUPABASE_ADMIN_SETUP.sql`](./SUPABASE_ADMIN_SETUP.sql).
3. Confirmar que no hubo errores de políticas o columnas.

## 2) Validar admin técnico
1. Entrar a `/admin/sistema`.
2. Click en `Ejecutar validación`.
3. Confirmar todos los checks en `OK`.

## 3) Intereses
1. Entrar a `/admin/intereses`.
2. Si está vacío, click en `Inicializar base`.
3. Editar un interés y guardar.
4. Verificar en `/intereses` y `/intereses/[slug]`.

## 4) Perfil
1. Entrar a `/admin/perfil`.
2. Guardar cambios (aunque sea mínimos) para persistir fila en `site_profile`.
3. Verificar en `/profile`.

## 5) Blog
1. Entrar a `/admin/blog/nuevo`.
2. Crear post en `borrador`.
3. Editarlo y cambiar a `publicado`.
4. Verificar en `/blog` y `/blog/[slug]`.

## 6) Cierre de validación
1. Confirmar navegación completa desktop/mobile.
2. Confirmar que botones admin críticos funcionan:
   - `/admin/blog`
   - `/admin/intereses`
   - `/admin/perfil`
   - `/admin/notificaciones`
   - `/admin/sistema`
