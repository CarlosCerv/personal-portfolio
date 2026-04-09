import React from 'react'
import Link from 'next/link'
import { LinkedinIcon as Linkedin, GithubIcon as Github, XIcon as X } from '@/components/public/icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-divider bg-background-alt">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* CTA Section */}
        <div className="mb-16 rounded-[24px] border border-divider bg-gradient-to-r from-primary/10 to-blue-600/10 px-6 py-10 md:px-10 md:py-14 backdrop-blur-md">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1 space-y-4">
              <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-[0.08em]">
                QA & Performance
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Diseño claro, estrategia técnica y confianza.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-secondary-muted">
                Desde diagnóstico hasta ejecución, la plataforma explica bien el proceso y convierte complejidad técnica en decisiones claras.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide text-center transition-all hover:bg-primary-hover hover:shadow-lg active:scale-95"
              >
                Hablar del proyecto
              </Link>
              <Link
                href="/servicios"
                className="rounded-lg bg-white border border-divider px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wide text-center transition-all hover:border-primary hover:text-primary hover:bg-background-alt"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-2.5 w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-sm font-semibold transition-transform group-hover:scale-110">
                CC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-foreground">Carlos Cervantes</span>
                <span className="text-xs font-medium uppercase tracking-wide text-secondary-muted mt-0.5">
                  QA Engineer
                </span>
              </div>
            </Link>
            <p className="text-sm text-secondary-muted leading-relaxed max-w-xs">
              Estrategias de QA, automatización de pruebas y consultoría técnica para equipos de ingeniería.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga"
                target="_blank"
                rel="noreferrer"
                className="text-secondary-muted hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/CarlosCerv"
                target="_blank"
                rel="noreferrer"
                className="text-secondary-muted hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/CarlosCerv"
                target="_blank"
                rel="noreferrer"
                className="text-secondary-muted hover:text-primary transition-colors duration-200"
                aria-label="X"
              >
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-wide text-foreground">
              Explorar
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/servicios"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Perfil Profesional
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Blog & Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Podcast
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-wide text-foreground">
              Recursos
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/servicios"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Diagnóstico QA
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm font-medium text-secondary-muted hover:text-primary transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-divider pt-8 text-center text-xs text-secondary-muted">
          © {currentYear} Carlos Cervantes. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
