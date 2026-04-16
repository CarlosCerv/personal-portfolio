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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { supabase, error } = await ensureAdmin()
  if (error || !supabase) return error

  const { id } = await ctx.params

  const { data, error: readError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { supabase, error } = await ensureAdmin()
  if (error || !supabase) return error

  const { id } = await ctx.params
  const input = await req.json()

  const payload = {
    ...input,
    updated_at: new Date().toISOString(),
  }

  const { data, error: updateError } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}

