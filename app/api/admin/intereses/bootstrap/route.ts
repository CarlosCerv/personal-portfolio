import { NextResponse } from 'next/server'
import { ensureAdminServer } from '@/lib/admin/auth'
import { getDefaultInterests } from '@/lib/content/interests-schema'

export async function POST() {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const { data: existing, error: readError } = await supabase
    .from('site_interests')
    .select('id')
    .limit(1)

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 })
  }

  if (Array.isArray(existing) && existing.length > 0) {
    return NextResponse.json({ ok: true, inserted: 0, skipped: true })
  }

  const defaults = getDefaultInterests().map((item) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    icon: item.icon,
    background_image: item.background_image,
    description: item.description,
    why: item.why,
    experience: item.experience,
    highlights: item.highlights,
    goals: item.goals,
    started: item.started,
    frequency: item.frequency,
    level: item.level,
    equipment: item.equipment,
    resources: item.resources,
    visible: item.visible,
    sort_order: item.sort_order,
    updated_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase.from('site_interests').insert(defaults)
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, inserted: defaults.length, skipped: false })
}
