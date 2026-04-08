'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  PenSquare,
  User,
  X,
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createClient } from '@/lib/supabase/client'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NAV_ITEMS = [
  { label: 'PRINCIPAL', type: 'header' },
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Perfil', href: '/admin/perfil', icon: User },
  { label: 'CONTENIDO', type: 'header' },
  { label: 'Blog', href: '/admin/blog', icon: PenSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  if (pathname === '/admin/login') return null

  const handleSignOut = async () => {
    if (!supabase) {
      window.location.href = '/admin/login'
      return
    }

    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const content = (
    <>
      <div className="rounded-[26px] border border-border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background-alt text-xl font-semibold text-foreground">
            <span>C</span>
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-[-0.03em] text-foreground">Admin Console</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-secondary-muted">Carlos Cervantes</p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-[26px] border border-border bg-background p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 font-semibold text-primary">
            CC
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground">Carlos Cervantes</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-secondary-muted">Sesión activa</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <div key={idx} className="px-3 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-muted">
                {item.label}
              </div>
            )
          }

          const Icon = item.icon!
          const isActive = pathname === item.href

          return (
            <Link
              key={idx}
              href={item.href!}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-background-alt text-foreground shadow-sm'
                  : 'text-muted hover:bg-background hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-secondary-muted')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-2xl border border-border bg-background px-3 py-3 text-sm font-medium text-muted transition-all hover:text-foreground"
        >
          <ExternalLink className="h-5 w-5" />
          Ver sitio público
        </Link>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-3 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.08)] lg:hidden"
        aria-label={isOpen ? 'Cerrar navegación admin' : 'Abrir navegación admin'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-3 left-3 z-40 flex w-[280px] flex-col rounded-[30px] border border-border bg-white p-3 text-foreground shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </aside>

      <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[280px] shrink-0 flex-col rounded-[30px] border border-border bg-white p-3 text-foreground shadow-[0_20px_60px_rgba(15,23,42,0.1)] lg:flex">
        {content}
      </aside>
    </>
  )
}
