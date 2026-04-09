'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Blog', href: '/blog' },
  { label: 'Intereses', href: '/intereses' },
  { label: 'Contacto', href: '/contacto' },
]

export function AppleHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-150',
          'bg-white',
          isScrolled && 'shadow-header'
        )}
      >
        <nav className="container h-header flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-blue flex items-center justify-center group-hover:bg-blue-hover transition-colors">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-gray-dark font-medium hidden sm:inline">
              Carlos Cervantes
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-medium hover:text-blue transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2 rounded-md bg-blue text-white text-sm font-medium hover:bg-blue-hover active:bg-blue-active transition-colors duration-150"
            >
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-dark hover:text-blue transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-2">
                <p className="text-xs font-medium text-gray-light uppercase tracking-wide mb-6">
                  Navegación
                </p>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-md text-gray-dark hover:bg-white-secondary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-light pt-6 mt-6">
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 rounded-md bg-blue text-white text-sm font-medium text-center hover:bg-blue-hover transition-colors"
                  >
                    Contacto
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-header" />
    </>
  )
}
