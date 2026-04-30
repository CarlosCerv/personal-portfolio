import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMissingSupabaseEnvNames } from '@/lib/supabase/env'

export const ADMIN_EMAIL = 'carlos.cervart@icloud.com'

export function isAdminEmail(email?: string | null) {
  if (!email) return false
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

export async function ensureAdminServer() {
  const supabase = await createClient()

  if (!supabase) {
    const missing = getMissingSupabaseEnvNames()
    return {
      supabase: null,
      user: null,
      error: NextResponse.json(
        {
          error: missing.length > 0
            ? `Supabase no configurado. Variables faltantes: ${missing.join(', ')}`
            : 'Supabase no configurado',
        },
        { status: 503 }
      ),
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    return {
      supabase: null,
      user: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return { supabase, user, error: null as NextResponse | null }
}
