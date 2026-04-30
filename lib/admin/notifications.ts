import { Resend } from 'resend'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/admin/auth'

export type AdminNotificationSeverity = 'info' | 'success' | 'warning' | 'critical'

export type AdminNotification = {
  id: string
  title: string
  message: string
  severity: AdminNotificationSeverity
  createdAt: string
  relativeTime: string
  href?: string
  source: 'database' | 'derived'
}

export type NotificationRule = {
  id: string
  title: string
  description: string
  channel: 'panel' | 'email' | 'panel+email'
}

export const NOTIFICATION_RULES: NotificationRule[] = [
  {
    id: 'new-contact',
    title: 'Nuevo mensaje de contacto',
    description: 'Cada nuevo mensaje desde contacto debe verse en el panel y enviarse por correo.',
    channel: 'panel+email',
  },
  {
    id: 'new-diagnostic-lead',
    title: 'Nuevo lead de diagnóstico',
    description: 'Cada lead generado por el diagnóstico QA debe mostrarse en panel y enviarse al correo.',
    channel: 'panel+email',
  },
  {
    id: 'draft-reminder',
    title: 'Borradores pendientes',
    description: 'Si existen posts en borrador, el panel debe recordarlo para evitar contenido olvidado.',
    channel: 'panel',
  },
  {
    id: 'analytics-status',
    title: 'Estado de analytics',
    description: 'Si Vercel Analytics no está configurado o falla, el panel debe alertarlo.',
    channel: 'panel',
  },
]

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

function withRelativeTime<T extends { createdAt: string }>(items: T[]) {
  return items.map((item) => ({
    ...item,
    relativeTime: formatDistanceToNow(new Date(item.createdAt), {
      addSuffix: true,
      locale: es,
    }),
  }))
}

export async function createAdminNotification(input: {
  title: string
  message: string
  severity?: AdminNotificationSeverity
  href?: string
}) {
  const supabase = await createClient()
  if (!supabase) return false

  const { error } = await supabase.from('admin_notifications').insert({
    title: input.title,
    message: input.message,
    severity: input.severity ?? 'info',
    href: input.href ?? null,
  })

  return !error
}

export async function sendAdminNotificationEmail(input: {
  subject: string
  title: string
  message: string
  htmlDetails?: string
}) {
  const resend = getResendClient()
  if (!resend) return false

  await resend.emails.send({
    from: 'Admin Notifications <hello@carloscervantes.com>',
    to: ADMIN_EMAIL,
    subject: input.subject,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;color:#1d1d1f;">
        <div style="padding:24px 0 8px;">
          <div style="display:inline-block;padding:8px 12px;border:1px solid #d2d2d7;border-radius:999px;background:#f5f5f7;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#86868b;">
            Admin Notification
          </div>
        </div>
        <h1 style="font-size:28px;line-height:1.1;letter-spacing:-0.03em;margin:8px 0 12px;">${input.title}</h1>
        <p style="font-size:16px;line-height:1.6;color:#4b5563;margin:0 0 20px;">${input.message}</p>
        ${input.htmlDetails ?? ''}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />
        <p style="font-size:12px;color:#86868b;">Carlos Cervantes · Admin Panel Notification</p>
      </div>
    `,
  })

  return true
}

async function fetchStoredNotifications() {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('admin_notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  if (error || !data) return []

  return withRelativeTime(
    data.map((item: any) => ({
      id: String(item.id),
      title: String(item.title),
      message: String(item.message),
      severity: (item.severity as AdminNotificationSeverity) ?? 'info',
      createdAt: item.created_at ?? new Date().toISOString(),
      href: item.href ?? undefined,
      source: 'database' as const,
    }))
  )
}

export async function getAdminNotifications(): Promise<AdminNotification[]> {
  const stored = await fetchStoredNotifications()
  if (stored.length > 0) return stored

  const supabase = await createClient()
  const derived: Array<Omit<AdminNotification, 'relativeTime'>> = []

  if (!supabase) {
    return withRelativeTime([
      {
        id: 'supabase-missing',
        title: 'Supabase no configurado',
        message: 'El panel no puede leer leads ni contenido dinámico porque faltan variables de entorno de Supabase.',
        severity: 'warning',
        createdAt: new Date().toISOString(),
        href: '/admin',
        source: 'derived',
      },
    ])
  }

  const [{ data: leads }, { data: drafts }, { data: contactMessages }, { data: profile }] = await Promise.all([
    supabase
      .from('diagnostico_leads')
      .select('id,nombre,empresa,created_at,paquete_recomendado,score')
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('blog_posts')
      .select('id,titulo,estado,updated_at')
      .eq('estado', 'borrador')
      .order('updated_at', { ascending: false })
      .limit(3),
    supabase
      .from('contact_messages')
      .select('id,nombre,servicio,created_at')
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('site_profile')
      .select('updated_at,nombre,titulo')
      .single(),
  ])

  ;(leads ?? []).forEach((lead: any) => {
    derived.push({
      id: `lead-${lead.id}`,
      title: `Nuevo lead: ${lead.nombre}`,
      message: `${lead.empresa || 'Proyecto sin empresa'} · ${lead.paquete_recomendado || 'Paquete por definir'} · score ${lead.score ?? 'N/A'}`,
      severity: 'success',
      createdAt: lead.created_at ?? new Date().toISOString(),
      href: '/admin',
      source: 'derived',
    })
  })

  ;(contactMessages ?? []).forEach((message: any) => {
    derived.push({
      id: `contact-${message.id}`,
      title: `Nuevo mensaje: ${message.nombre}`,
      message: `Interés en ${message.servicio || 'consultoría general'}. Revisa y responde desde tu correo.`,
      severity: 'info',
      createdAt: message.created_at ?? new Date().toISOString(),
      href: '/admin',
      source: 'derived',
    })
  })

  const draftItems = drafts ?? []

  if (draftItems.length > 0) {
    derived.push({
      id: 'drafts-pending',
      title: `${draftItems.length} borrador(es) pendientes`,
      message: 'Hay contenido del blog sin publicar. Conviene revisarlo para mantener el blog activo.',
      severity: 'warning',
      createdAt: draftItems[0]?.updated_at ?? new Date().toISOString(),
      href: '/admin/blog',
      source: 'derived',
    })
  }

  if (!process.env.VERCEL_API_TOKEN || !process.env.VERCEL_PROJECT_ID) {
    derived.push({
      id: 'analytics-missing',
      title: 'Analytics web no configurado',
      message: 'Faltan VERCEL_API_TOKEN o VERCEL_PROJECT_ID. El dashboard mostrará solo métricas internas reales.',
      severity: 'warning',
      createdAt: new Date().toISOString(),
      href: '/admin',
      source: 'derived',
    })
  }

  if (!profile?.updated_at) {
    derived.push({
      id: 'profile-review',
      title: 'Perfil profesional por revisar',
      message: 'No se encontró actualización reciente del perfil público. Verifica que la información principal esté completa.',
      severity: 'warning',
      createdAt: new Date().toISOString(),
      href: '/admin/perfil',
      source: 'derived',
    })
  }

  return withRelativeTime(
    derived
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
  )
}
