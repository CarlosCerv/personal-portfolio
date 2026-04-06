import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  
  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'carlos.cervart@icloud.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID

  try {
    // If no tokens, return mock data for development
    if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
      return NextResponse.json({
        visitors: 1284,
        pageviews: 45200,
        leads: 24,
        avgTime: '3m 42s',
        chartData: [
          { date: '2026-04-01', visitors: 100 },
          { date: '2026-04-02', visitors: 150 },
          { date: '2026-04-03', visitors: 120 },
          { date: '2026-04-04', visitors: 200 },
          { date: '2026-04-05', visitors: 180 },
        ],
        topPages: [
          { path: '/', views: 1240, bounce: '12%' },
          { path: '/blog/optimizing-qa-workflows', views: 840, bounce: '24%' },
          { path: '/servicios', views: 620, bounce: '8%' },
          { path: '/profile', views: 410, bounce: '15%' },
        ],
        isMock: true
      })
    }

    // Real Vercel Analytics API call (Example structure)
    // https://vercel.com/api/web/insights/stats
    const resp = await fetch(`https://vercel.com/api/web/insights/stats?projectId=${VERCEL_PROJECT_ID}`, {
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`
      }
    })

    if (!resp.ok) throw new Error('Vercel API error')
    const data = await resp.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Analytics Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
