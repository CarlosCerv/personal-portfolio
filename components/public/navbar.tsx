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
      "fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-sans">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-foreground group-hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
            <span className="text-white font-black text-2xl leading-none">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tighter leading-none group-hover:text-primary transition-colors">Carlos Cervantes</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-primary/70 leading-none mt-1 transition-colors">QA Consultant</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all hover:text-primary",
                pathname === link.href ? "text-primary ring-offset-4 ring-2 ring-primary/20 rounded-sm" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/servicios#diagnostico" 
            className="bg-foreground text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-black/10 hover:shadow-primary/20"
          >
            Diagnóstico QA
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
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
            className="fixed inset-0 top-[70px] bg-white z-40 p-8 flex flex-col gap-8 md:hidden overflow-y-auto"
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
                    "text-4xl font-black tracking-tighter flex items-center justify-between",
                    pathname === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                  <ChevronRight className="w-10 h-10 text-border" />
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
                className="mt-4 bg-primary text-white w-full py-6 rounded-3xl text-xl font-black uppercase tracking-widest text-center shadow-2xl shadow-primary/30 block"
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
