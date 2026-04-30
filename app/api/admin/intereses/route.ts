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
    .from('site_interests')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 })
  }

  return NextResponse.json({ interests: data ?? [] })
}

export async function POST(req: Request) {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const input = await req.json()
  const title = String(input?.title ?? '').trim()
  const slug = slugify(String(input?.slug ?? title))

  if (!title) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 })
  }

  if (!slug) {
    return NextResponse.json({ error: 'El slug es obligatorio.' }, { status: 400 })
  }

  const { data: existing } = await supabase
    .from('site_interests')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Ya existe un interés con ese slug.' }, { status: 409 })
  }

  const payload = {
    ...input,
    title,
    slug,
    subtitle: String(input?.subtitle ?? ''),
    icon: String(input?.icon ?? '✨'),
    background_image: String(input?.background_image ?? ''),
    description: String(input?.description ?? ''),
    why: String(input?.why ?? ''),
    experience: String(input?.experience ?? ''),
    highlights: Array.isArray(input?.highlights) ? input.highlights.map(String) : [],
    goals: Array.isArray(input?.goals) ? input.goals.map(String) : [],
    started: String(input?.started ?? ''),
    frequency: String(input?.frequency ?? ''),
    level: String(input?.level ?? ''),
    equipment: Array.isArray(input?.equipment) ? input.equipment.map(String) : [],
    resources: Array.isArray(input?.resources) ? input.resources.map(String) : [],
    visible: typeof input?.visible === 'boolean' ? input.visible : true,
    sort_order: Number.isFinite(Number(input?.sort_order)) ? Number(input.sort_order) : 0,
    updated_at: new Date().toISOString(),
  }

  const { data, error: insertError } = await supabase
    .from('site_interests')
    .insert(payload)
    .select('*')
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ interest: data })
}
