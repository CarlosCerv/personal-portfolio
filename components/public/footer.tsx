import React from 'react'
import Link from 'next/link'
import { LinkedinIcon as Linkedin, GithubIcon as Github, XIcon as X } from '@/components/public/icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-divider bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* CTA Section */}
        <div className="mb-16 rounded-[24px] border border-divider bg-background-alt px-6 py-10 md:px-10 md:py-14 backdrop-blur-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1 space-y-4">
              <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-[0.08em]">
                QA & Performance
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-text-primary leading-tight">
                Diseño claro, estrategia técnica y confianza.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-text-secondary">
                Desde diagnóstico hasta ejecución, la plataforma explica bien el proceso y convierte complejidad técnica en decisiones claras.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="rounded-[10px] bg-primary px-6 py-3 text-xs font-semibold text-white uppercase tracking-[0.12em] text-center transition-all hover:bg-primary-hover hover:shadow-lg active:scale-95"
              >
                Hablar del proyecto
              </Link>
              <Link
                href="/servicios"
                className="rounded-[10px] bg-white border border-divider px-6 py-3 text-xs font-semibold text-text-primary uppercase tracking-[0.12em] text-center transition-all hover:border-primary hover:text-primary hover:bg-background-alt"
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
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary text-white text-sm font-semibold transition-transform group-hover:scale-110">
                CC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-text-primary">Carlos Cervantes</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-tertiary mt-0.5">
                  QA Engineer
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Estrategias de QA, automatización de pruebas y consultoría técnica para equipos de ingeniería.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga"
                target="_blank"
                rel="noreferrer"
                className="text-text-tertiary hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/CarlosCerv"
                target="_blank"
                rel="noreferrer"
                className="text-text-tertiary hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/CarlosCerv"
                target="_blank"
                rel="noreferrer"
                className="text-text-tertiary hover:text-primary transition-colors duration-200"
                aria-label="X"
              >
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary">
              Explorar
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/servicios"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Perfil Profesional
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Blog & Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Podcast
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary">
              Recursos
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/servicios"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Diagnóstico QA
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Agendar consultoría
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-primary">
              Contacto rápido
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Escríbeme si quieres hablar sobre QA, automatización o performance. Respondo por correo.
            </p>
            <a
              href="mailto:carlos.cervart@icloud.com?subject=Consulta%20QA%20y%20Performance"
              className="inline-block rounded-[10px] border border-divider bg-white px-5 py-3 text-xs font-semibold text-text-primary uppercase tracking-[0.12em] transition-all hover:border-primary hover:text-primary hover:bg-background-alt"
            >
              Email directo
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-divider pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">
              &copy; {currentYear} Carlos Cervantes · QA & Performance Consultant
            </p>
            <p className="text-xs font-medium text-text-tertiary text-center md:text-right">
              Diseño limpio, editorial consistente, arquitectura clara.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
    </footer>
  )
}
