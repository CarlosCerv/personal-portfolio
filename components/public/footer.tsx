import React from 'react'
import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { LinkedinIcon as Linkedin, GithubIcon as Github, XIcon as X } from '@/components/public/icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-black text-xl leading-none">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tighter leading-none">Carlos Cervantes</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary leading-none mt-0.5">QA CONSULTANT</span>
              </div>
            </Link>
            <p className="text-sm text-secondary-muted leading-relaxed max-w-xs">
              Estrategias de QA de alto impacto, automatización de pruebas y consultoría técnica para equipos de ingeniería de élite.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="text-muted hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition-colors"><X className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Sitemaps */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#0071e3] mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><Link href="/servicios" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Servicios QA</Link></li>
              <li><Link href="/profile" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Perfil Profesional</Link></li>
              <li><Link href="/blog" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Blog & Tutoriales</Link></li>
              <li><Link href="/podcast" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Podcast Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#0071e3] mb-6">Utilidades</h4>
            <ul className="space-y-4">
              <li><Link href="/servicios#diagnostico" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Wizard de Diagnóstico</Link></li>
              <li><Link href="/contacto" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Agendar Consultoría</Link></li>
              <li><Link href="/politica-de-privacidad" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#0071e3] mb-6">Newsletter</h4>
            <p className="text-xs text-muted font-medium leading-relaxed">
              Suscríbete para recibir guías de automatización y performance directo en tu mail.
            </p>
            <div className="flex bg-background-alt border border-border rounded-xl p-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="flex-1 bg-transparent border-none text-xs px-3 focus:ring-0 outline-none"
              />
              <button className="bg-foreground text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">Unirse</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-muted uppercase tracking-widest">
          <div className="flex items-center gap-1">
            &copy; {currentYear} Carlos Cervantes &middot; Made with 
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mx-1" /> 
            in Apple Style
          </div>
          <div className="flex items-center gap-6">
             <Link href="/admin" className="p-2 border border-border rounded-lg bg-background-alt hover:text-primary transition-all flex items-center gap-1.5 grayscale hover:grayscale-0">
                <span className="opacity-40">Admin Panel</span>
                <ExternalLink className="w-2.5 h-2.5" />
             </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
