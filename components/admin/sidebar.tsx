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
      {/* Logo Section */}
      <div className="rounded-[16px] border border-divider bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-primary text-white text-lg font-semibold">
            CC
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-black truncate">Admin</h1>
            <p className="text-[10px] uppercase tracking-[0.05em] text-text-tertiary">Console</p>
          </div>
        </div>
      </div>

      {/* Session Status */}
      <div className="mt-3 rounded-[16px] border border-divider bg-background-alt p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/10 font-semibold text-primary text-sm">
              CC
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent-green border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">Carlos Cervantes</p>
            <p className="text-[10px] uppercase tracking-[0.05em] text-text-tertiary">Sesión activa</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto pr-2">
        {NAV_ITEMS.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <div
                key={idx}
                className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-text-tertiary first:pt-2"
              >
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
                'flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-alt'
              )}
            >
              <Icon className={cn('h-4.5 w-4.5 shrink-0', isActive ? 'text-primary' : 'text-text-tertiary')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="mt-4 space-y-2 border-t border-divider pt-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-[12px] border border-divider bg-background-alt px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-white"
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio
        </Link>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-[12px] border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-white text-text-primary shadow-md hover:bg-background-alt transition-all lg:hidden"
        aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-4 left-4 z-40 flex w-72 flex-col rounded-[24px] border border-border bg-white p-4 shadow-xl transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 flex-col rounded-[24px] border border-border bg-white p-4 shadow-sm lg:flex">
        {content}
      </aside>
    </>
  )
}
