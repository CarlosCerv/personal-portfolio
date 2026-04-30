import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { ensureAdminServer } from '@/lib/admin/auth'
import { normalizePublicProfile } from '@/lib/content/public-content'

export async function GET() {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const { data } = await supabase
    .from('site_profile')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return NextResponse.json({ profile: normalizePublicProfile(data) })
}

export async function POST(req: Request) {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const profile = await req.json()
  const existing = await supabase
    .from('site_profile')
    .select('id')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const payload = {
    ...(existing.data?.id ? { id: existing.data.id } : {}),
    ...profile,
    updated_at: new Date().toISOString(),
  }

  const { error: upsertError } = await supabase.from('site_profile').upsert(payload)

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  revalidatePath('/profile')
  return NextResponse.json({ ok: true })
}
