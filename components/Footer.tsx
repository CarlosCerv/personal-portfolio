'use client'

import React from 'react'
import Link from 'next/link'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.658-5.848 6.658H2.422l7.723-8.835L1.254 2.25h6.798l4.622 6.059L17.25 2.25h.994zm-1.697 17.896h1.833L5.75 4.171H3.771l12.776 15.975z" />
  </svg>
)

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const footerSections = [
  {
    title: 'Servicios',
    links: [
      { label: 'Diagnóstico QA', href: '/servicios#diagnostico' },
      { label: 'Automatización E2E', href: '/servicios#automation' },
      { label: 'Performance Testing', href: '/servicios#performance' },
      { label: 'Consultoría QA', href: '/servicios#consulting' },
    ],
  },
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Perfil', href: '/profile' },
      { label: 'Intereses', href: '/intereses' },
    ],
  },
  {
    title: 'Contenido',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
    ],
  },
]

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/CarlosCerv', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://x.com/CarlosCerv', label: 'X / Twitter' },
  { icon: MailIcon, href: 'mailto:carlos.cervart@icloud.com', label: 'Email' },
]

const stackBadges = ['JMeter', 'Playwright', 'k6', 'Next.js', 'CI/CD']

export function AppleFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-black/[0.06] bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(250,250,250,0.92))] shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:px-12 lg:py-12">
            <div className="space-y-7">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-black/[0.08] bg-white shadow-[0_14px_26px_rgba(15,23,42,0.08)]">
                  <span className="text-[13px] font-semibold tracking-[-0.03em] text-[#111113]">CC</span>
                </div>
                <div>
                  <p className="text-[1rem] font-semibold tracking-[-0.03em] text-[#111113]">Carlos Cervantes</p>
                  <p className="text-[0.8rem] leading-relaxed text-[#5c5d63]">
                    QA Engineer & Performance Specialist. Ayudo a empresas a construir software que escala con confianza.
                  </p>
                </div>
              </Link>

              <div className="flex flex-wrap gap-2">
                {stackBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#5c5d63]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/[0.07] bg-white text-[#5c5d63] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#111113] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#8a8b92]">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[0.96rem] font-medium tracking-[-0.015em] text-[#111113] transition-colors duration-200 hover:text-[#0071e3]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/[0.06] px-6 py-5 text-[0.82rem] text-[#5c5d63] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <p>© {currentYear} Carlos Cervantes. Todos los derechos reservados.</p>
            <div className="flex items-center gap-1">
              <span>Diseñado y desarrollado con</span>
              <span className="text-[#ef4444]">♥</span>
              <span>en México 🇲🇽</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
