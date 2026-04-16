import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const supabase = await createClient()
  try {
    await supabase?.auth.signOut()
  } catch {
    // ignore
  }
  return NextResponse.redirect(new URL('/', url.origin))
}

