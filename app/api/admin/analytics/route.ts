import { NextResponse } from 'next/server'
import { ensureAdminServer } from '@/lib/admin/auth'
import { getDashboardData } from '@/lib/admin/dashboard'

export async function GET() {
  const { error } = await ensureAdminServer()
  if (error) return error

  const dashboard = await getDashboardData()
  return NextResponse.json({
    ...dashboard,
    isMock: false,
  })
}
