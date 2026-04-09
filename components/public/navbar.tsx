'use client'

import React, { useState, useEffect, memo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Blog', href: '/blog' },
  { label: 'Intereses', href: '/intereses' },
  { label: 'Podcast', href: '/podcast' },
]

// Memoized nav link for desktop
const NavLink = memo(({ link, isActive }: { link: typeof NAV_LINKS[0]; isActive: boolean }) => (
  <Link
    href={link.href}
    aria-label={`Ir a ${link.label}`}
    className={cn(
      'rounded-lg px-3 py-2.5 text-[13px] font-bold transition-all duration-200 whitespace-nowrap uppercase tracking-[0.05em]',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      isActive
        ? 'bg-gradient-to-r from-accent-indigo/10 to-accent-cyan/10 text-accent-indigo border border-accent-indigo/30'
        : 'text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/20 border border-transparent'
    )}
  >
    {link.label}
  </Link>
))
NavLink.displayName = 'NavLink'

// Memoized mobile nav link - Light Premium
const MobileNavLink = memo(
  ({ link, isActive, onClick }: { link: typeof NAV_LINKS[0]; isActive: boolean; onClick: () => void }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Link
        href={link.href}
        aria-label={`Ir a ${link.label}`}
        onClick={onClick}
        className={cn(
          'flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-bold transition-all duration-200 uppercase tracking-[0.05em]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt',
          isActive
            ? 'bg-gradient-to-r from-accent-indigo/10 to-accent-cyan/10 text-accent-indigo border border-accent-indigo/30'
            : 'text-text-secondary hover:bg-surface hover:text-accent-indigo hover:border-accent-indigo/20 border border-transparent'
        )}
      >
        {link.label}
      </Link>
    </motion.div>
  )
)
MobileNavLink.displayName = 'MobileNavLink'

function NavbarComponent() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 pt-3 md:px-6 md:pt-4">
      {/* Main navigation bar - Dark Tech Premium */}
      <div
        className={cn(
          'mx-auto max-w-7xl transition-all duration-300',
          'flex items-center justify-between rounded-xl px-4 py-3 md:px-6 md:py-3.5',
          'border backdrop-blur-lg',
          isScrolled
            ? 'bg-background-alt/80 border-border-accent shadow-lg'
            : 'bg-background/60 border-border-primary shadow-none hover:border-border-accent'
        )}
      >
        {/* Logo - Left */}
        <Link 
          href="/" 
          aria-label="Carlos Cervantes - QA Engineer - Inicio"
          className="group flex items-center gap-3 no-underline flex-shrink-0 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        >
          <Logo className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden lg:flex flex-col">
            <span className="text-[12px] font-bold text-text-primary leading-tight whitespace-nowrap tracking-tight">
              CARLOS CERVANTES
            </span>
            <span className="text-[10px] font-semibold bg-gradient-to-r from-accent-indigo to-accent-cyan bg-clip-text text-transparent uppercase tracking-[0.08em] leading-tight whitespace-nowrap">
              QA Engineer
            </span>
          </div>
          <div className="hidden md:flex lg:hidden flex-col flex-shrink-0 pl-1">
            <span className="text-[11px] font-bold text-text-primary leading-none">
              Carlos
            </span>
            <span className="text-[9px] font-bold bg-gradient-to-r from-accent-indigo to-accent-cyan bg-clip-text text-transparent uppercase tracking-[0.1em] leading-none">
              QA
            </span>
          </div>
          <div className="flex md:hidden flex-col flex-shrink-0">
            <span className="text-[10px] font-bold text-text-primary leading-none">
              CC
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Right aligned */}
        <div className="hidden items-center gap-0.5 lg:flex ml-auto">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.href} 
              link={link} 
              isActive={pathname === link.href} 
            />
          ))}
          <Link
            href="/contacto"
            aria-label="Abrir formulario de contacto"
            className="ml-3 rounded-lg bg-gradient-to-r from-accent-indigo to-accent-cyan px-5 py-2 text-white text-[13px] font-bold transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMobileMenu}
          className="rounded-lg border border-border-primary bg-surface/50 hover:border-border-accent hover:bg-surface p-2 text-text-primary transition-all md:hidden flex-shrink-0 ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Dark Tech Premium */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 top-[80px] bg-black/40 backdrop-blur-md z-40"
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-menu"
              role="navigation"
              aria-label="Menú de navegación móvil"
              className="absolute right-4 top-[68px] flex flex-col rounded-xl border border-border-accent bg-background-alt/90 shadow-lg backdrop-blur-xl md:hidden z-50 overflow-hidden min-w-[280px]"
            >
              {/* Menu items */}
              <div className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map((link, index) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    isActive={pathname === link.href}
                    onClick={closeMobileMenu}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-border-accent/30" />

              {/* CTA Button */}
              <Link
                href="/contacto"
                aria-label="Abrir formulario de contacto"
                onClick={closeMobileMenu}
                className="w-full px-4 py-3 text-center text-[15px] font-bold text-background bg-gradient-to-r from-accent-cyan to-accent-indigo transition-all duration-200 hover:shadow-glow uppercase tracking-[0.05em] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt"
              >
                Contacto
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Export memoized component to prevent re-renders when parent updates
export const Navbar = memo(NavbarComponent)
