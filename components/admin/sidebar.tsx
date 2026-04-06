'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  PenSquare, 
  Mic, 
  Star, 
  Radio, 
  Settings, 
  ExternalLink, 
  LogOut,
  Menu,
  X
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
  { label: 'Podcast', href: '/admin/podcast', icon: Mic },
  { label: 'Intereses', href: '/admin/intereses', icon: Star },
  { label: 'SISTEMA', type: 'header' },
  { label: 'Distribución', href: '/admin/podcast/distribucion', icon: Radio },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  if (pathname === '/admin/login') return null

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-secondary text-white rounded-full lg:hidden shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-[240px] bg-secondary text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-secondary font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="font-bold tracking-tight">Admin</h1>
              <p className="text-[10px] text-secondary-muted uppercase tracking-widest">Carlos Cervantes</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mx-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              CC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Carlos Cervantes</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-secondary-muted">● En línea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {NAV_ITEMS.map((item, idx) => {
            if (item.type === 'header') {
              return (
                <div key={idx} className="pt-6 pb-2 px-3 text-[10px] font-bold text-secondary-muted uppercase tracking-widest">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-secondary-muted hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-secondary-muted")} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Ver sitio público
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
