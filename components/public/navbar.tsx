'use client'

import React, { useState, useEffect, memo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const NAV_LINKS = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
]

// Memoized nav link to prevent unnecessary re-renders
const NavLink = memo(({ link, isActive }: { link: typeof NAV_LINKS[0]; isActive: boolean }) => (
  <Link
    href={link.href}
    className={cn(
      'rounded-[10px] px-3.5 py-2 text-[13px] font-medium transition-all duration-200',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-text-secondary hover:text-primary hover:bg-primary/5'
    )}
  >
    {link.label}
  </Link>
))
NavLink.displayName = 'NavLink'

function NavbarComponent() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Use passive event listener for better scroll performance
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Memoized callback to prevent re-creating function on every render
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 pt-3 md:px-6 md:pt-4">
      {/* Main navigation bar */}
      <div
        className={cn(
          'mx-auto max-w-7xl transition-all duration-300',
          'flex items-center justify-between rounded-[20px] px-4 py-3.5 md:px-6 md:py-4',
          'border backdrop-blur-xl',
          isScrolled
            ? 'bg-white/80 border-border shadow-md'
            : 'bg-white/40 border-border/40 shadow-none'
        )}
      >
        {/* Logo - Minimal */}
        <Link href="/" className="group flex items-center gap-2.5 no-underline flex-shrink-0 hover:opacity-80 transition-opacity">
          <Logo className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-semibold text-text-primary leading-tight whitespace-nowrap">
              Carlos Cervantes
            </span>
            <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-[0.05em] leading-tight whitespace-nowrap">
              QA Engineer
            </span>
          </div>
          <div className="flex md:hidden flex-col flex-shrink-0">
            <span className="text-[11px] font-semibold text-text-primary leading-none">
              Carlos
            </span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.05em] leading-none">
              QA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Clean center */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.href} 
              link={link} 
              isActive={pathname === link.href} 
            />
          ))}
        </div>

        {/* CTA Button - Right side */}
        <div className="hidden items-center gap-3 md:flex flex-shrink-0">
          <Link
            href="/servicios"
            className="rounded-[10px] bg-primary px-4 py-2 text-white text-[13px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:shadow-lg active:scale-95"
          >
            Servicios
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMobileMenu}
          className="rounded-[10px] border border-border bg-white/50 p-2 text-text-primary hover:bg-white transition-colors md:hidden flex-shrink-0"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-[68px] flex flex-col gap-2 rounded-[20px] border border-border bg-white/90 p-4 shadow-lg backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center rounded-[12px] px-3.5 py-3 text-[15px] font-semibold transition-all duration-200',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-primary hover:bg-background-alt'
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 pt-2 border-t border-divider"
            >
              <Link
                href="/servicios"
                className="block w-full rounded-[12px] bg-primary px-4 py-3.5 text-center text-[14px] font-semibold text-white transition-all duration-200 hover:bg-primary-hover active:scale-95"
              >
                Servicios
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Export memoized component to prevent re-renders when parent updates
export const Navbar = memo(NavbarComponent)
