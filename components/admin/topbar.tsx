'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, AlertCircle, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function Topbar() {
  const pathname = usePathname()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (pathname === '/admin/login') return null

  // Simple Breadcrumb logic
  const paths = pathname.split('/').filter(Boolean)
  const isDashboard = paths.length === 1 && paths[0] === 'admin'

  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumb / Section Title */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted">Panel</span>
        <ChevronRight className="w-4 h-4 text-border" />
        <span className="text-sm font-semibold capitalize tracking-tight text-foreground">
          {isDashboard ? 'Dashboard' : paths[paths.length - 1]}
        </span>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-6">
        {/* Live Clock */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Hora actual</span>
          <span className="text-sm font-medium text-foreground tabular-nums">
            {format(time, 'HH:mm:ss', { locale: es })}
          </span>
        </div>

        {/* Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-xs font-semibold">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Sitio activo
        </div>

        {/* Global Search (Placeholder) */}
        <button className="p-2 hover:bg-background-alt rounded-lg transition-colors text-muted hover:text-foreground">
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 hover:bg-background-alt rounded-lg transition-colors text-muted hover:text-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  )
}
