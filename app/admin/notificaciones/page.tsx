import React from 'react'
import Link from 'next/link'
import { getAdminNotifications, NOTIFICATION_RULES } from '@/lib/admin/notifications'

export default async function AdminNotificationsPage() {
  const notifications = await getAdminNotifications()

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Notificaciones</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Actividad y reglas
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
          Resumen de eventos importantes en el panel y configuración básica de alertas.
        </p>
      </header>

      <section className="surface-panel p-7 md:p-8">
        <p className="eyebrow">Reglas</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {NOTIFICATION_RULES.map((r) => (
            <div key={r.id} className="surface-card p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[14px] font-semibold text-[#111113]">{r.title}</p>
                <span className="rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c5d63]">
                  {r.channel}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5c5d63]">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Feed</p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#111113]">Últimas alertas</h2>
          </div>
          <Link href="/admin" className="btn-base btn-secondary px-5 py-2.5 text-[0.88rem]">
            Volver
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-[14px] text-[#5c5d63]">Sin notificaciones por ahora.</p>
          ) : (
            notifications.map((n) => (
              <Link
                key={n.id}
                href={n.href ?? '/admin'}
                className="surface-card-soft block rounded-[18px] px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold text-[#111113]">{n.title}</p>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a8b92]">{n.severity}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5c5d63]">{n.message}</p>
                <p className="mt-2 text-[12px] text-[#8a8b92]">{n.relativeTime}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

