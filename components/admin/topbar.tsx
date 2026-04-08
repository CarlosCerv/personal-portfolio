'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, ChevronRight, Search } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

type TopbarNotification = {
  id: string
  title: string
  message: string
  severity: 'info' | 'success' | 'warning' | 'critical'
  relativeTime: string
}

export function Topbar() {
  const pathname = usePathname()
  const [time, setTime] = useState(new Date())
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<TopbarNotification[]>([])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let active = true

    async function loadNotifications() {
      try {
        const response = await fetch('/api/admin/notifications', { cache: 'no-store' })
        if (!response.ok) return
        const data = await response.json()
        if (active) {
          setNotifications(Array.isArray(data.notifications) ? data.notifications : [])
        }
      } catch {
        if (active) setNotifications([])
      }
    }

    loadNotifications()
    const timer = setInterval(loadNotifications, 60000)

    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  if (pathname === '/admin/login') return null

  const paths = pathname.split('/').filter(Boolean)
  const isDashboard = paths.length === 1 && paths[0] === 'admin'
  const currentSection = isDashboard ? 'Dashboard' : paths[paths.length - 1]
  const unreadCount = notifications.length

  return (
    <header className="sticky top-4 z-30">
      <div className="flex min-h-[74px] items-center justify-between gap-4 rounded-[28px] border border-border bg-white/90 px-4 py-3 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl md:px-6">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-muted">
            <span>Admin Panel</span>
            <ChevronRight className="h-3.5 w-3.5 text-border" />
            <span className="truncate text-primary">{currentSection}</span>
          </div>
          <p className="truncate text-sm font-medium text-muted">
            Gestión editorial, perfil profesional y operación del sitio.
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden rounded-2xl border border-border bg-background-alt/80 px-3 py-2 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-muted">Hora actual</p>
            <p className="text-sm font-semibold tabular-nums text-foreground">
              {format(time, 'HH:mm:ss', { locale: es })}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 lg:flex">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Sitio activo
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background-alt/75 text-muted transition-colors hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background-alt/75 text-muted transition-colors hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-primary px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}

            {notificationsOpen && (
              <div className="absolute right-0 top-14 z-40 w-[360px] rounded-[26px] border border-border bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between px-2 pb-3 pt-1">
                  <div>
                    <p className="text-sm font-semibold tracking-[-0.02em] text-foreground">Notificaciones</p>
                    <p className="text-xs text-muted">Alertas activas del panel y del sitio.</p>
                  </div>
                </div>
                <div className="max-h-[360px] space-y-2 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="rounded-2xl bg-background-alt px-4 py-5 text-sm text-muted">
                      No hay notificaciones recientes.
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div key={notification.id} className="rounded-2xl border border-border bg-background px-4 py-3">
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
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                              <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                                {notification.relativeTime}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-secondary-muted">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
