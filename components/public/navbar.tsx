'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Blog', href: '/blog' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Contacto', href: '/contacto' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500 px-4 pt-4 md:px-6",
      isScrolled ? "pt-3" : "pt-4"
    )}>
      <div className={cn(
        "apple-shell mx-auto flex max-w-7xl items-center justify-between rounded-[28px] px-4 py-3 font-sans md:px-6",
        isScrolled ? "border-border/90 bg-white/88 shadow-[0_18px_40px_rgba(15,23,42,0.08)]" : "bg-white/72"
      )}>
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-lg font-semibold text-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary">
            <span className="leading-none">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold tracking-[-0.03em] leading-none group-hover:text-primary transition-colors">Carlos Cervantes</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted group-hover:text-primary/70 leading-none transition-colors">QA Consultant</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-background-alt/80 px-2 py-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                pathname === link.href ? "bg-white text-foreground shadow-sm" : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link 
            href="/servicios#diagnostico" 
            className="admin-btn-primary px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
          >
            Diagnóstico QA
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-2xl border border-border bg-white p-2 text-foreground md:hidden"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[96px] z-40 flex max-h-[calc(100vh-112px)] flex-col gap-4 overflow-y-auto rounded-[30px] border border-border bg-white/96 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-[22px] border border-transparent px-2 py-3 text-2xl font-semibold tracking-[-0.04em]",
                    pathname === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                  <ChevronRight className="h-7 w-7 text-border" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href="/servicios#diagnostico" 
                className="admin-btn-primary mt-2 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.18em]"
              >
                Comenzar Diagnóstico
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
