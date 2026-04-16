import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

  return { supabase, error: null as NextResponse | null }
}

export async function GET() {
  const { supabase, error } = await ensureAdmin()
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
  const { supabase, error } = await ensureAdmin()
  if (error || !supabase) return error

  const input = await req.json()
  const now = new Date().toISOString()

  const payload = {
    ...input,
    updated_at: now,
    created_at: input.created_at ?? now,
    published_at: input.published_at ?? now,
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

