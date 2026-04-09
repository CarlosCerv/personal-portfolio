import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { normalizePublicProfile } from '@/lib/content/public-content'

const ADMIN_EMAIL = 'carlos.cervart@icloud.com'

async function ensureAdmin() {
  const supabase = await createClient()
  if (!supabase) {
    return { supabase: null, error: NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 }) }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    return { supabase: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  return { supabase, error: null }
}

export async function GET() {
  const { supabase, error } = await ensureAdmin()
  if (error || !supabase) return error

  const { data } = await supabase.from('site_profile').select('*').single()
  return NextResponse.json({ profile: normalizePublicProfile(data) })
}

export async function POST(req: Request) {
  const { supabase, error } = await ensureAdmin()
  if (error || !supabase) return error

  const profile = await req.json()

  const payload = {
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
