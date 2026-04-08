import React from 'react'
import Link from 'next/link'
import { LinkedinIcon as Linkedin, GithubIcon as Github, XIcon as X } from '@/components/public/icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/80 bg-[#fbfbfd] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="apple-shell mb-10 rounded-[36px] px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="apple-badge px-3 py-1.5">Consultoría de QA y Performance</span>
              <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl">
                Diseño claro, estrategia técnica y entregables que generan confianza.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-secondary-muted">
                Desde el diagnóstico hasta la ejecución, la plataforma está pensada para explicar bien el proceso y convertir complejidad técnica en decisiones claras.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className="admin-btn-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
                Hablar de tu proyecto
              </Link>
              <Link href="/servicios#diagnostico" className="admin-btn-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
                Ver diagnóstico QA
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-base font-semibold text-foreground transition-transform group-hover:scale-105">
                <span className="leading-none">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[-0.03em] leading-none">Carlos Cervantes</span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary leading-none">QA Consultant</span>
              </div>
            </Link>
            <p className="text-sm text-secondary-muted leading-relaxed max-w-xs">
              Estrategias de QA de alto impacto, automatización de pruebas y consultoría técnica para equipos de ingeniería de élite.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="https://github.com/CarlosCerv" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
              <a href="https://x.com/CarlosCerv" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="X"><X className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Sitemaps */}
          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Explorar</h4>
            <ul className="space-y-4">
              <li><Link href="/servicios" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Servicios QA</Link></li>
              <li><Link href="/profile" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Perfil Profesional</Link></li>
              <li><Link href="/blog" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Blog & Tutoriales</Link></li>
              <li><Link href="/podcast" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Podcast Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Utilidades</h4>
            <ul className="space-y-4">
              <li><Link href="/servicios#diagnostico" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Wizard de Diagnóstico</Link></li>
              <li><Link href="/contacto" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Agendar Consultoría</Link></li>
              <li><Link href="/politica-de-privacidad" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Contacto directo</h4>
            <p className="text-sm text-muted font-medium leading-relaxed">
              Si quieres hablar sobre QA, automatización o performance, puedes escribirme directo y te respondo por correo.
            </p>
            <a
              href="mailto:carlos.cervart@icloud.com?subject=Consulta%20de%20QA%20y%20Performance"
              className="admin-btn-outline px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              Escribirme por email
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row md:text-left">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            &copy; {currentYear} Carlos Cervantes · QA & Performance Consultant
          </div>
          <div className="text-[11px] font-medium text-secondary-muted">
            Plataforma pública y experiencia editorial con una dirección visual limpia y consistente.
          </div>
        </div>
      </div>
    </footer>
  )
}
