import React from 'react'
import Link from 'next/link'
import { getDashboardData } from '@/lib/admin/dashboard'
import { getAdminNotifications, NOTIFICATION_RULES } from '@/lib/admin/notifications'

function toneChip(tone: 'neutral' | 'success' | 'warning') {
  if (tone === 'success') return 'bg-green-500/10 text-green-700 border-green-500/20'
  if (tone === 'warning') return 'bg-amber-500/10 text-amber-700 border-amber-500/20'
  return 'bg-black/[0.04] text-[#5c5d63] border-black/[0.06]'
}

export default async function AdminDashboardPage() {
  const [dashboard, notifications] = await Promise.all([getDashboardData(), getAdminNotifications()])

  return (
    <div className="space-y-10">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Dashboard</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Resumen operativo
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
          Métricas reales de contenido, leads y estado de analítica. Todo en un solo lugar.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.metrics.map((metric) => (
          <div key={metric.label} className="surface-card p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-semibold text-[#8a8b92]">{metric.label}</p>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${toneChip(metric.tone)}`}>
                {metric.tone}
              </span>
            </div>
            <p className="mt-4 text-[34px] font-semibold tracking-[-0.06em] text-[#111113]">{metric.value}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5c5d63]">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel p-7 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Top páginas</p>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#111113]">Interés del sitio</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/blog" className="btn-base btn-secondary px-5 py-2.5 text-[0.88rem]">
                Blog
              </Link>
              <Link href="/admin/intereses" className="btn-base btn-secondary px-5 py-2.5 text-[0.88rem]">
                Intereses
              </Link>
              <Link href="/admin/sistema" className="btn-base btn-secondary px-5 py-2.5 text-[0.88rem]">
                Sistema
              </Link>
            </div>
          </div>

          <div className="mt-6 divide-y divide-black/[0.06]">
            {dashboard.topPages.length === 0 ? (
              <p className="py-4 text-[14px] text-[#5c5d63]">Sin datos aún.</p>
            ) : (
              dashboard.topPages.map((row) => (
                <div key={row.path} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#111113]">{row.path}</p>
                    <p className="mt-1 text-[12px] text-[#8a8b92]">{row.note}</p>
                  </div>
                  <div className="rounded-full border border-black/[0.06] bg-[#fafafa] px-4 py-2 text-[12px] font-semibold text-[#111113]">
                    {row.views ?? 'N/D'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-panel p-7 md:p-8">
            <p className="eyebrow">Leads recientes</p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#111113]">Diagnóstico</h2>
            <div className="mt-6 space-y-3">
              {dashboard.recentLeads.length === 0 ? (
                <p className="text-[14px] text-[#5c5d63]">Sin leads por ahora.</p>
              ) : (
                dashboard.recentLeads.map((lead) => (
                  <div key={lead.id} className="surface-card-soft flex items-center justify-between gap-3 rounded-[18px] px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#111113]">{lead.name}</p>
                      <p className="mt-1 truncate text-[12px] text-[#8a8b92]">{lead.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-semibold text-[#111113]">{lead.package}</p>
                      <p className="mt-1 text-[12px] text-[#8a8b92]">{lead.score ?? 'N/A'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="surface-panel p-7 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Notificaciones</p>
                <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#111113]">Actividad</h2>
              </div>
              <Link href="/admin/notificaciones" className="btn-base btn-secondary px-5 py-2.5 text-[0.88rem]">
                Ver todo
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <Link
                  key={n.id}
                  href={n.href ?? '/admin/notificaciones'}
                  className="surface-card-soft block rounded-[18px] px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-semibold text-[#111113]">{n.title}</p>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a8b92]">{n.severity}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5c5d63]">{n.message}</p>
                  <p className="mt-2 text-[12px] text-[#8a8b92]">{n.relativeTime}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[20px] border border-black/[0.06] bg-[#fafafa] p-5">
              <p className="eyebrow">Reglas básicas</p>
              <div className="mt-3 space-y-2">
                {NOTIFICATION_RULES.map((r) => (
                  <div key={r.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#111113]">{r.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#5c5d63]">{r.description}</p>
                    </div>
                    <span className="rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c5d63]">
                      {r.channel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
