import { NextResponse } from 'next/server'
import { ensureAdminServer } from '@/lib/admin/auth'

function slugify(input: string) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function GET() {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const { data, error: readError } = await supabase
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false })

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data ?? [] })
}

export async function POST(req: Request) {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const input = await req.json()
  const titulo = String(input?.titulo ?? '').trim()
  const slug = slugify(String(input?.slug ?? titulo))

  if (!titulo) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 })
  }

  if (!slug) {
    return NextResponse.json({ error: 'El slug es obligatorio.' }, { status: 400 })
  }

  const { data: existingBySlug } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existingBySlug) {
    return NextResponse.json({ error: 'Ya existe un post con ese slug.' }, { status: 409 })
  }

  const estado = input?.estado === 'publicado' ? 'publicado' : 'borrador'
  const now = new Date().toISOString()

  const payload = {
    ...input,
    titulo,
    slug,
    excerpt: String(input?.excerpt ?? ''),
    categoria: String(input?.categoria ?? 'QA'),
    tags: Array.isArray(input?.tags) ? input.tags.map(String) : [],
    contenido: String(input?.contenido ?? ''),
    estado,
    imagen_portada: input?.imagen_portada ? String(input.imagen_portada) : null,
    updated_at: now,
    created_at: input.created_at ?? now,
    published_at: estado === 'publicado' ? (input.published_at ?? now) : null,
  }

  const { data, error: insertError } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select('*')
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}
