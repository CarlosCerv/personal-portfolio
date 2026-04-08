import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAdminNotifications, NOTIFICATION_RULES } from '@/lib/admin/notifications'

export async function GET() {
  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json(
      { notifications: await getAdminNotifications(), rules: NOTIFICATION_RULES },
      { status: 200 }
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== 'carlos.cervart@icloud.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const notifications = await getAdminNotifications()
  return NextResponse.json({
    notifications,
    rules: NOTIFICATION_RULES,
  })
}
