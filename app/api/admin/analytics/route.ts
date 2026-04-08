import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDashboardData } from '@/lib/admin/dashboard'

export async function GET() {
  const supabase = await createClient()
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== 'carlos.cervart@icloud.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const dashboard = await getDashboardData()
  return NextResponse.json({
    ...dashboard,
    isMock: false,
  })
}
