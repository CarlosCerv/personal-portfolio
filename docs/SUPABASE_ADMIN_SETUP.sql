-- ============================================================
-- SUPABASE SETUP · ADMIN PANEL (Perfil + Blog + Intereses)
-- Ejecutar en SQL Editor de Supabase (entorno productivo)
-- ============================================================

-- 1) EXTENSIONES
create extension if not exists pgcrypto;

-- 2) TABLA DE INTERESES (NUEVA)
create table if not exists public.site_interests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text default '',
  icon text default '✨',
  background_image text default '',
  description text default '',
  why text default '',
  experience text default '',
  highlights jsonb default '[]'::jsonb,
  goals jsonb default '[]'::jsonb,
  started text default '',
  frequency text default '',
  level text default '',
  equipment jsonb default '[]'::jsonb,
  resources jsonb default '[]'::jsonb,
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_site_interests_slug on public.site_interests(slug);
create index if not exists idx_site_interests_visible_sort on public.site_interests(visible, sort_order);

-- 3) TABLA BLOG (Asegurar columnas esperadas por admin/public)
alter table if exists public.blog_posts
  add column if not exists titulo text,
  add column if not exists slug text,
  add column if not exists excerpt text,
  add column if not exists categoria text default 'QA',
  add column if not exists tags jsonb default '[]'::jsonb,
  add column if not exists contenido text,
  add column if not exists imagen_portada text,
  add column if not exists estado text default 'borrador',
  add column if not exists autor text default 'Carlos Cervantes',
  add column if not exists published_at timestamptz,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

create index if not exists idx_blog_posts_slug on public.blog_posts(slug);
create index if not exists idx_blog_posts_estado on public.blog_posts(estado);

-- 4) TABLA PERFIL (Asegurar campos usados por /profile y /admin/perfil)
alter table if exists public.site_profile
  add column if not exists nombre_mostrado text,
  add column if not exists nombre_completo text,
  add column if not exists headline text,
  add column if not exists empresa_actual text,
  add column if not exists ubicacion text,
  add column if not exists bio_1 text,
  add column if not exists bio_2 text,
  add column if not exists bio_3 text,
  add column if not exists email_contacto text,
  add column if not exists linkedin_url text,
  add column if not exists github_url text,
  add column if not exists twitter_url text,
  add column if not exists cv_url text default '/Carlos_Cervantes_CV.pdf',
  add column if not exists roles jsonb default '[]'::jsonb,
  add column if not exists stats jsonb default '[]'::jsonb,
  add column if not exists idiomas jsonb default '[]'::jsonb,
  add column if not exists skills jsonb default '{}'::jsonb,
  add column if not exists educacion jsonb default '[]'::jsonb,
  add column if not exists experiencia jsonb default '[]'::jsonb,
  add column if not exists proyectos jsonb default '[]'::jsonb,
  add column if not exists certificaciones jsonb default '[]'::jsonb,
  add column if not exists recomendaciones jsonb default '[]'::jsonb,
  add column if not exists mostrar_publicaciones boolean default true,
  add column if not exists updated_at timestamptz default now();

-- 5) RLS
alter table public.site_profile enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_interests enable row level security;
alter table public.admin_notifications enable row level security;

-- públicas de lectura (sitio público)
drop policy if exists "public read profile" on public.site_profile;
create policy "public read profile" on public.site_profile
for select to anon, authenticated
using (true);

drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts" on public.blog_posts
for select to anon, authenticated
using (estado = 'publicado');

drop policy if exists "public read visible interests" on public.site_interests;
create policy "public read visible interests" on public.site_interests
for select to anon, authenticated
using (visible = true);

-- admin (email específico)
drop policy if exists "admin full profile" on public.site_profile;
create policy "admin full profile" on public.site_profile
for all to authenticated
using ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com')
with check ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com');

drop policy if exists "admin full blog_posts" on public.blog_posts;
create policy "admin full blog_posts" on public.blog_posts
for all to authenticated
using ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com')
with check ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com');

drop policy if exists "admin full interests" on public.site_interests;
create policy "admin full interests" on public.site_interests
for all to authenticated
using ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com')
with check ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com');

drop policy if exists "admin read notifications" on public.admin_notifications;
create policy "admin read notifications" on public.admin_notifications
for select to authenticated
using ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com');

drop policy if exists "admin write notifications" on public.admin_notifications;
create policy "admin write notifications" on public.admin_notifications
for insert to authenticated
with check ((auth.jwt() ->> 'email') = 'carlos.cervart@icloud.com');
