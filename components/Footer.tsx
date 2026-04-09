'use client'

import React from 'react'
import Link from 'next/link'

// Social Icons - Using SVGs for maximum compatibility
const GithubIcon = (props: any) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedinIcon = (props: any) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const TwitterIcon = (props: any) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.658-5.848 6.658H2.422l7.723-8.835L1.254 2.25h6.798l4.622 6.059L17.25 2.25h.994zm-1.697 17.896h1.833L5.75 4.171H3.771l12.776 15.975z" />
  </svg>
)

const MailIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const footerSections = [
  {
    title: 'Servicios',
    links: [
      { label: 'Automatización de Tests', href: '/servicios#automation' },
      { label: 'Testing de Performance', href: '/servicios#performance' },
      { label: 'Consultoría QA', href: '/servicios#consulting' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'Portafolio', href: '/profile' },
      { label: 'Intereses', href: '/intereses' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
      { label: 'Términos de Servicio', href: '/terminos' },
    ],
  },
]

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/carloscerv', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/carloscervantes-qa', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com/carloscer_dev', label: 'Twitter' },
  { icon: MailIcon, href: 'mailto:carlos@carloscervantes-qa.com', label: 'Email' },
]

export function AppleFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-light">
      {/* Main Footer Content */}
      <div className="container py-16 md:py-20 lg:py-24">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 group mb-6"
            >
              <div className="w-10 h-10 rounded-md bg-blue flex items-center justify-center group-hover:bg-blue-hover transition-colors">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="text-gray-dark font-semibold">Carlos</span>
            </Link>
            <p className="text-gray-medium text-sm leading-relaxed max-w-xs">
              QA Engineer & Performance Specialist. Ayudando a empresas a construir software que escala.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-dark mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-medium hover:text-blue transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-light pt-12 md:pt-16">
          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gray-medium hover:bg-white-secondary hover:text-blue transition-all duration-150"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-light text-center md:text-right">
              <p>
                © {currentYear} Carlos Cervantes. Todos los derechos reservados.
              </p>
              <p className="mt-1">
                Diseñado y desarrollado con cuidado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
