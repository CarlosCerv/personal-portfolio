import { NextResponse } from 'next/server'
import { ensureAdminServer } from '@/lib/admin/auth'
import { getAdminNotifications, NOTIFICATION_RULES } from '@/lib/admin/notifications'

export async function GET() {
  const { error } = await ensureAdminServer()
  if (error) return error

  const notifications = await getAdminNotifications()
  return NextResponse.json({
    notifications,
    rules: NOTIFICATION_RULES,
  })
}
