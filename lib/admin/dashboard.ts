import { createClient } from '@/lib/supabase/server'

export type DashboardMetric = {
  label: string
  value: string
  helper: string
  tone: 'neutral' | 'success' | 'warning'
}

export type DashboardPageRow = {
  path: string
  views: number | null
  note: string
}

export type DashboardLeadRow = {
  id: string
  name: string
  company: string
  package: string
  score: number | null
  createdAt: string
}

export type DashboardData = {
  metrics: DashboardMetric[]
  topPages: DashboardPageRow[]
  recentLeads: DashboardLeadRow[]
  blogSummary: {
    total: number
    published: number
    drafts: number
    totalViews: number
  }
  analytics: {
    configured: boolean
    source: string
  }
}

function formatDurationFromSeconds(seconds: number | null) {
  if (!seconds || Number.isNaN(seconds)) return 'No disponible'
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}m ${String(secs).padStart(2, '0')}s`
}

async function fetchVercelInsights() {
  const token = process.env.VERCEL_API_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID

  if (!token || !projectId) {
    return {
      configured: false,
      source: 'Sin configuración de Vercel Analytics',
      visitors: null as number | null,
      pageviews: null as number | null,
      avgVisitDuration: null as number | null,
      topPages: [] as DashboardPageRow[],
    }
  }

  try {
    const response = await fetch(
      `https://vercel.com/api/web/insights/stats?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error(`Analytics error: ${response.status}`)
    }

    const data = await response.json()
    const pages = Array.isArray(data?.pages) ? data.pages : []

    return {
      configured: true,
      source: 'Vercel Web Analytics',
      visitors: typeof data?.visitors === 'number' ? data.visitors : null,
      pageviews: typeof data?.pageviews === 'number' ? data.pageviews : null,
      avgVisitDuration:
        typeof data?.avgVisitDuration === 'number' ? data.avgVisitDuration : null,
      topPages: pages.slice(0, 5).map((page: any) => ({
        path: String(page.path || '/'),
        views: typeof page.views === 'number' ? page.views : null,
        note: typeof page.bounceRate === 'number'
          ? `bounce ${Math.round(page.bounceRate)}%`
          : 'sin detalle de rebote',
      })),
    }
  } catch {
    return {
      configured: false,
      source: 'No fue posible leer Vercel Analytics',
      visitors: null as number | null,
      pageviews: null as number | null,
      avgVisitDuration: null as number | null,
      topPages: [] as DashboardPageRow[],
    }
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()
  const analytics = await fetchVercelInsights()

  if (!supabase) {
    return {
      metrics: [
        { label: 'Posts publicados', value: '0', helper: 'Supabase no configurado', tone: 'warning' },
        { label: 'Borradores', value: '0', helper: 'Supabase no configurado', tone: 'warning' },
        { label: 'Leads 30 días', value: '0', helper: 'Supabase no configurado', tone: 'warning' },
        { label: 'Analytics web', value: 'No disponible', helper: analytics.source, tone: 'warning' },
      ],
      topPages: [],
      recentLeads: [],
      blogSummary: { total: 0, published: 0, drafts: 0, totalViews: 0 },
      analytics: { configured: analytics.configured, source: analytics.source },
    }
  }

  const [{ data: posts }, { data: leads }] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id,titulo,slug,estado,visitas,updated_at')
      .order('updated_at', { ascending: false }),
    supabase
      .from('diagnostico_leads')
      .select('id,nombre,empresa,paquete_recomendado,score,created_at')
      .order('created_at', { ascending: false }),
  ])

  const safePosts = posts ?? []
  const safeLeads = leads ?? []
  const published = safePosts.filter((post: any) => post.estado === 'publicado')
  const drafts = safePosts.filter((post: any) => post.estado === 'borrador')
  const now = Date.now()
  const days30 = 1000 * 60 * 60 * 24 * 30
  const recentLeads = safeLeads.filter((lead: any) => {
    const createdAt = new Date(lead.created_at ?? 0).getTime()
    return now - createdAt <= days30
  })

  const totalViews = published.reduce(
    (sum: number, post: any) => sum + (typeof post.visitas === 'number' ? post.visitas : 0),
    0
  )

  const topPages =
    analytics.topPages.length > 0
      ? analytics.topPages
      : published
          .sort((a: any, b: any) => (b.visitas || 0) - (a.visitas || 0))
          .slice(0, 5)
          .map((post: any) => ({
            path: `/blog/${post.slug}`,
            views: typeof post.visitas === 'number' ? post.visitas : null,
            note: 'visitas desde contenido del blog',
          }))

  return {
    metrics: [
      {
        label: 'Posts publicados',
        value: String(published.length),
        helper: `${safePosts.length} piezas editoriales totales`,
        tone: 'neutral',
      },
      {
        label: 'Borradores activos',
        value: String(drafts.length),
        helper: drafts.length > 0 ? 'Hay contenido pendiente por revisar' : 'Sin borradores pendientes',
        tone: drafts.length > 0 ? 'warning' : 'success',
      },
      {
        label: 'Leads en 30 días',
        value: String(recentLeads.length),
        helper: safeLeads.length > 0 ? 'Calculado desde diagnostico_leads' : 'Aún sin leads registrados',
        tone: recentLeads.length > 0 ? 'success' : 'neutral',
      },
      {
        label: 'Analytics web',
        value: analytics.pageviews !== null ? analytics.pageviews.toLocaleString() : 'No disponible',
        helper:
          analytics.pageviews !== null
            ? `${analytics.visitors?.toLocaleString() ?? 'N/D'} visitantes · ${formatDurationFromSeconds(analytics.avgVisitDuration)} promedio`
            : analytics.source,
        tone: analytics.pageviews !== null ? 'success' : 'warning',
      },
    ],
    topPages,
    recentLeads: safeLeads.slice(0, 5).map((lead: any) => ({
      id: String(lead.id),
      name: String(lead.nombre || 'Lead sin nombre'),
      company: String(lead.empresa || 'Sin empresa'),
      package: String(lead.paquete_recomendado || 'Paquete por definir'),
      score: typeof lead.score === 'number' ? lead.score : null,
      createdAt: lead.created_at ?? new Date().toISOString(),
    })),
    blogSummary: {
      total: safePosts.length,
      published: published.length,
      drafts: drafts.length,
      totalViews,
    },
    analytics: {
      configured: analytics.configured,
      source: analytics.source,
    },
  }
}
