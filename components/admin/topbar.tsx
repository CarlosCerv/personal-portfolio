'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, ChevronRight } from 'lucide-react'
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
    <header className="sticky top-0 z-30 mb-4 md:mb-6">
      <div className="flex min-h-14 flex-col gap-2 md:min-h-16 md:flex-row md:items-center md:justify-between rounded-[16px] md:rounded-[20px] border border-divider bg-white px-3 py-2 md:px-6 md:py-3 shadow-sm">
        {/* Breadcrumb & Title */}
        <div className="min-w-0 flex-1 space-y-0.5 md:space-y-1">
          <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.08em] md:tracking-[0.1em] text-text-tertiary overflow-x-auto">
            <span className="whitespace-nowrap">Dashboard</span>
            <ChevronRight className="h-2.5 w-2.5 md:h-3 md:w-3 text-divider flex-shrink-0" />
            <span className="truncate text-primary font-semibold text-[9px] md:text-[10px]">{currentSection}</span>
          </div>
          <p className="truncate text-xs md:text-sm font-medium text-text-secondary">
            Gestión editorial, perfil y operación del sitio.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Time Display */}
          <div className="hidden rounded-[12px] border border-divider bg-background-alt px-2.5 md:px-3.5 py-1.5 md:py-2 md:block">
            <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              Hora actual
            </p>
            <p className="text-sm font-semibold tabular-nums text-text-primary">
              {format(time, 'HH:mm', { locale: es })}
            </p>
          </div>

          {/* Status Badge */}
          <div className="hidden rounded-[12px] border border-green-200 bg-green-50 px-3.5 py-2 text-xs font-semibold text-accent-green lg:flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-accent-green" />
            Activo
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-divider bg-background-alt text-text-secondary transition-all duration-200 hover:text-text-primary hover:bg-white"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-white text-[10px] font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 top-14 z-40 w-96 max-h-80 rounded-[20px] border border-divider bg-white shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="border-b border-divider px-5 py-4">
                    <p className="text-sm font-semibold text-text-primary">Notificaciones</p>
                    <p className="text-xs text-text-tertiary mt-0.5">Alertas activas del panel</p>
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto max-h-60">
                    {notifications.length === 0 ? (
                      <div className="px-5 py-8 text-center">
                        <p className="text-sm text-text-tertiary">No hay notificaciones</p>
                      </div>
                    ) : (
                      <div className="space-y-2 p-3">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="rounded-[12px] border border-divider bg-background-alt px-4 py-3 transition-all hover:bg-white"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'mt-1.5 h-2 w-2 rounded-full shrink-0',
                                  notification.severity === 'success' && 'bg-accent-green',
                                  notification.severity === 'warning' && 'bg-accent-orange',
                                  notification.severity === 'critical' && 'bg-accent-red',
                                  notification.severity === 'info' && 'bg-primary'
                                )}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-semibold text-text-primary">
                                    {notification.title}
                                  </p>
                                  <span className="shrink-0 text-[10px] uppercase tracking-[0.05em] text-text-tertiary font-medium">
                                    {notification.relativeTime}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
