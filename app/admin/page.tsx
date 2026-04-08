import React from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  Eye,
  FileEdit,
  LayoutList,
  UserPlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDashboardData } from '@/lib/admin/dashboard'
import { getAdminNotifications, NOTIFICATION_RULES } from '@/lib/admin/notifications'

const METRIC_ICONS = [LayoutList, FileEdit, UserPlus, Activity]

export default async function DashboardPage() {
  const [dashboard, notifications] = await Promise.all([
    getDashboardData(),
    getAdminNotifications(),
  ])

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Dashboard operativo</h1>
          <p className="mt-1 text-base text-secondary-muted">
            Resumen real del contenido, leads y estado actual de la plataforma.
          </p>
        </div>
        <div className="rounded-[22px] border border-border bg-white px-4 py-3 text-sm text-secondary-muted shadow-sm">
          Fuente de analytics web: <span className="font-semibold text-foreground">{dashboard.analytics.source}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.metrics.map((metric, idx) => {
          const Icon = METRIC_ICONS[idx] || Activity
          return (
            <div key={metric.label} className="admin-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl bg-background-alt',
                    metric.tone === 'success' && 'text-emerald-600',
                    metric.tone === 'warning' && 'text-amber-600',
                    metric.tone === 'neutral' && 'text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </div>
              <div className="mt-5 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {metric.label}
                </p>
                <p className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  {metric.value}
                </p>
                <p className="text-sm leading-relaxed text-secondary-muted">{metric.helper}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">Páginas y contenidos con más movimiento</h2>
              <p className="mt-1 text-sm text-secondary-muted">
                Ordenado por datos reales disponibles desde Vercel Analytics o vistas del blog.
              </p>
            </div>
            <Eye className="h-5 w-5 text-muted" />
          </div>

          <div className="mt-6 space-y-3">
            {dashboard.topPages.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-border bg-background-alt px-5 py-6 text-sm text-muted">
                Aún no hay páginas con datos suficientes para mostrar ranking real.
              </div>
            ) : (
              dashboard.topPages.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between gap-4 rounded-[22px] border border-border bg-background px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-semibold text-primary">{page.path}</p>
                    <p className="mt-1 text-xs text-secondary-muted">{page.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                      {page.views !== null ? page.views.toLocaleString() : 'N/D'}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">visitas</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">Leads recientes</h2>
              <p className="mt-1 text-sm text-secondary-muted">
                Leads tomados directamente de la tabla `diagnostico_leads`.
              </p>
            </div>
            <UserPlus className="h-5 w-5 text-muted" />
          </div>

          <div className="mt-6 space-y-3">
            {dashboard.recentLeads.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-border bg-background-alt px-5 py-6 text-sm text-muted">
                Todavía no hay leads registrados en el diagnóstico.
              </div>
            ) : (
              dashboard.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-[22px] border border-border bg-background px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{lead.company}</p>
                    </div>
                    <div className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                      {lead.score !== null ? `${lead.score}%` : 'Sin score'}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 text-xs text-secondary-muted">
                    <span>{lead.package}</span>
                    <span>
                      {formatDistanceToNow(new Date(lead.createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <section id="panel-notifications" className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">Notificaciones del panel</h2>
              <p className="mt-1 text-sm text-secondary-muted">
                Eventos visibles dentro del admin, listos para seguimiento.
              </p>
            </div>
            <BellRing className="h-5 w-5 text-muted" />
          </div>

          <div className="mt-6 space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-border bg-background-alt px-5 py-6 text-sm text-muted">
                No hay notificaciones recientes.
              </div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="rounded-[22px] border border-border bg-background px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-1 h-2.5 w-2.5 rounded-full',
                        notification.severity === 'success' && 'bg-emerald-500',
                        notification.severity === 'warning' && 'bg-amber-500',
                        notification.severity === 'critical' && 'bg-red-500',
                        notification.severity === 'info' && 'bg-primary'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                        <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                          {notification.relativeTime}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-secondary-muted">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">Reglas activas de notificación</h2>
              <p className="mt-1 text-sm text-secondary-muted">
                Reglas básicas para panel y correo, ya contempladas en el flujo.
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-muted" />
          </div>

          <div className="mt-6 space-y-3">
            {NOTIFICATION_RULES.map((rule) => (
              <div key={rule.id} className="rounded-[22px] border border-border bg-background px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{rule.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-secondary-muted">{rule.description}</p>
                  </div>
                  <span className="rounded-full bg-background-alt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {rule.channel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <p>
                Los eventos de <strong>contacto</strong> y <strong>diagnóstico QA</strong> ya pueden disparar correo a
                <strong> carlos.cervart@icloud.com</strong>. El panel además los agrupa visualmente para seguimiento.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end">
        <Link href="/admin/blog" className="admin-btn-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
          Ir a gestionar contenido
        </Link>
      </div>
    </div>
  )
}
