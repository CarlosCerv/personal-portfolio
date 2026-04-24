'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/servicios' },
  { label: 'Profile', href: '/profile' },
  { label: 'Blog', href: '/blog' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Interests', href: '/intereses' },
  { label: 'Contact', href: '/contacto' },
]

export function AppleHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              'apple-shell relative overflow-hidden rounded-[24px] border px-4 py-3 transition-all duration-300 sm:px-5',
              isScrolled
                ? 'border-black/[0.08] bg-white/82 shadow-[0_24px_60px_rgba(15,23,42,0.12)]'
                : 'border-white/75 bg-white/70 shadow-[0_16px_40px_rgba(15,23,42,0.07)]'
            )}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(17,17,19,0.04),transparent_32%)]" />

            <nav className="relative flex items-center justify-between gap-3">
              <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Carlos Cervantes - Home">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[16px] border border-black/[0.08] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.10)] sm:h-14 sm:w-14 sm:rounded-[18px]">
                  <img
                    src="/images/brand-mark.png"
                    alt="Carlos Cervantes"
                    className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                    loading="eager"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.98rem] font-semibold tracking-[-0.025em] text-[#111113]">
                    Carlos Cervantes
                  </p>
                </div>
              </Link>

              <div className="hidden items-center gap-1.5 lg:flex">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'relative rounded-full px-4 py-2.5 text-[0.86rem] font-medium tracking-[-0.015em] transition-all duration-200',
                        isActive
                          ? 'on-dark bg-[#111113] text-white shadow-[0_14px_26px_rgba(17,17,19,0.16)]'
                          : 'text-[#5c5d63] hover:bg-white hover:text-[#111113]'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <Link
                  href="/contacto"
                  className="btn-base btn-primary min-w-[132px] px-5 py-2.5 text-[0.88rem]"
                >
                  Let's Talk
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/[0.08] bg-white text-[#111113] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-colors hover:bg-[#fafafa] lg:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[rgba(17,17,19,0.16)] backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[88px] z-50 lg:hidden"
            >
              <div className="apple-shell rounded-[28px] border border-white/80 bg-white/92 p-4 shadow-[0_28px_60px_rgba(15,23,42,0.16)]">
                <div className="grid gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-[18px] px-4 py-3 text-[0.98rem] font-medium tracking-[-0.02em] transition-all',
                          isActive
                            ? 'on-dark bg-[#111113] text-white'
                            : 'text-[#5c5d63] hover:bg-[#fafafa] hover:text-[#111113]'
                        )}
                      >
                        {item.label}
                        <span className={cn('h-2 w-2 rounded-full', isActive ? 'bg-white' : 'bg-black/[0.08]')} />
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-4 border-t border-black/[0.06] pt-4">
                  <Link
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-base btn-primary w-full"
                  >
                    Let's Talk
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="h-[92px] sm:h-[108px]" />
    </>
  )
}
