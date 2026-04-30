import { NextResponse } from 'next/server'
import { ensureAdminServer } from '@/lib/admin/auth'

type CheckResult = {
  key: string
  label: string
  ok: boolean
  detail: string
}

export async function GET() {
  const { supabase, error } = await ensureAdminServer()
  if (error || !supabase) return error

  const checks: CheckResult[] = []

  async function runCheck(key: string, label: string, fn: () => Promise<any>) {
    try {
      await fn()
      checks.push({ key, label, ok: true, detail: 'OK' })
    } catch (e: any) {
      checks.push({
        key,
        label,
        ok: false,
        detail: String(e?.message || 'Error de conexión/mapeo'),
      })
    }
  }

  await runCheck('blog_posts', 'Tabla blog_posts', async () => {
    const { error: qError } = await supabase
      .from('blog_posts')
      .select('id,titulo,slug,estado,published_at,updated_at')
      .limit(1)
    if (qError) throw qError
  })

  await runCheck('site_profile', 'Tabla site_profile', async () => {
    const { error: qError } = await supabase
      .from('site_profile')
      .select('nombre_mostrado,headline,stats,roles,idiomas,experiencia,proyectos,certificaciones')
      .limit(1)
    if (qError) throw qError
  })

  await runCheck('site_interests', 'Tabla site_interests', async () => {
    const { error: qError } = await supabase
      .from('site_interests')
      .select('id,slug,title,subtitle,icon,background_image,visible,sort_order,updated_at')
      .limit(1)
    if (qError) throw qError
  })

  await runCheck('admin_notifications', 'Tabla admin_notifications', async () => {
    const { error: qError } = await supabase
      .from('admin_notifications')
      .select('id,title,message,severity,created_at')
      .limit(1)
    if (qError) throw qError
  })

  await runCheck('diagnostico_leads', 'Tabla diagnostico_leads', async () => {
    const { error: qError } = await supabase
      .from('diagnostico_leads')
      .select('id,nombre,empresa,score,created_at')
      .limit(1)
    if (qError) throw qError
  })

  await runCheck('contact_messages', 'Tabla contact_messages', async () => {
    const { error: qError } = await supabase
      .from('contact_messages')
      .select('id,nombre,email,mensaje,created_at')
      .limit(1)
    if (qError) throw qError
  })

  const allOk = checks.every((item) => item.ok)

  return NextResponse.json({
    ok: allOk,
    checks,
    checkedAt: new Date().toISOString(),
  })
}
