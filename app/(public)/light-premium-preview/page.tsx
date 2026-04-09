'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Light Premium Color Palette
const LIGHT_PALETTE = {
  background: '#FFFFFF',
  surface: '#F5F5F7',
  primary: '#0071E3',
  accent: '#06B6D4',
  text: {
    primary: '#1D1D1F',
    secondary: '#6F6F77',
    tertiary: '#A1A1A6'
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

export default function LightPremiumPreview() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: LIGHT_PALETTE.background }}>
      
      {/* HERO SECTION - LIGHT PREMIUM */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20">
        
        {/* Subtle Gradient Orbs - Light Version */}
        <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 -right-40 w-80 h-80 rounded-full bg-gradient-to-bl from-cyan-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32 text-center space-y-12">
          
          {/* Status Badge - Light Style */}
          <motion.div 
            {...fadeInUp}
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 border transition-all duration-300"
            style={{ 
              backgroundColor: LIGHT_PALETTE.surface,
              borderColor: LIGHT_PALETTE.text.tertiary 
            }}
          >
            <div className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: LIGHT_PALETTE.primary }} />
            <span className="text-sm font-medium" style={{ color: LIGHT_PALETTE.text.secondary }}>
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* Main H1 - Apple Style */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl font-bold leading-tight tracking-tight"
              style={{ color: LIGHT_PALETTE.text.primary }}
            >
              <span className="block">Software que</span>
              <span className="block">escala sin</span>
              <span 
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${LIGHT_PALETTE.primary}, ${LIGHT_PALETTE.accent})`
                }}
              >
                romperse
              </span>
            </h1>
          </motion.div>

          {/* Description - Generous Whitespace */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light"
            style={{ color: LIGHT_PALETTE.text.secondary }}
          >
            Especialista en <span className="font-semibold" style={{ color: LIGHT_PALETTE.text.primary }}>Performance Testing</span> y <span className="font-semibold" style={{ color: LIGHT_PALETTE.text.primary }}>Calidad Automática</span>.
          </motion.p>

          {/* Stats - Glassmorphism Cards */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto pt-4"
          >
            {[
              { number: "99%", label: "Quality Score" },
              { number: "1,847", label: "Bugs Prevenidos" },
              { number: "∞", label: "Zero Downtime" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300"
                style={{
                  backgroundColor: `${LIGHT_PALETTE.surface}99`,
                  borderColor: LIGHT_PALETTE.text.tertiary,
                  borderWidth: '1px'
                }}
              >
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: LIGHT_PALETTE.primary }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: LIGHT_PALETTE.text.tertiary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs - Clean Buttons */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link 
              href="#"
              aria-label="Iniciar diagnóstico gratis"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-base rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: LIGHT_PALETTE.primary,
                color: '#FFFFFF'
              }}
            >
              Diagnóstico gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <Link 
              href="#"
              aria-label="Ver perfil profesional"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-base rounded-xl transition-all duration-300 border"
              style={{
                backgroundColor: LIGHT_PALETTE.surface,
                color: LIGHT_PALETTE.text.primary,
                borderColor: LIGHT_PALETTE.text.tertiary
              }}
            >
              Ver mi perfil
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION - AUTOMATION */}
      <section className="py-32 md:py-48" style={{ backgroundColor: LIGHT_PALETTE.surface }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center mb-32 space-y-6">
            <motion.span 
              {...fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: LIGHT_PALETTE.primary }}
            >
              Automatización
            </motion.span>
            <motion.h2 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto"
              style={{ color: LIGHT_PALETTE.text.primary }}
            >
              Las pruebas que corren mientras tú duermes.
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: LIGHT_PALETTE.text.secondary }}
            >
              Hacer pruebas a mano funciona. Hacerlas automáticas escala. Con Playwright y Appium, cada cambio activa cientos de verificaciones.
            </motion.p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Left: Text Content */}
            <motion.div {...fadeInUp} className="space-y-8 lg:sticky lg:top-32">
              <ul className="space-y-4">
                {[
                  'Regresión automática: ningún bug regresa sin ser detectado',
                  'Integrado en CI/CD con GitHub Actions y Jenkins',
                  'Web, iOS y Android con una sola estrategia de calidad'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: LIGHT_PALETTE.primary }}
                    >
                      <Check className="w-3 h-3 text-white" aria-hidden="true" />
                    </div>
                    <span 
                      className="text-base md:text-lg font-medium pt-0.5"
                      style={{ color: LIGHT_PALETTE.text.primary }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Code Card - Modern Look */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border shadow-xl"
              style={{
                backgroundColor: '#1f1f22',
                borderColor: '#404045'
              }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#404045' }}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-mono text-gray-400">checkout.spec.ts</span>
              </div>
              
              <div className="p-6 font-mono text-sm text-gray-300 space-y-1 overflow-x-auto">
                <p><span style={{ color: '#c586c0' }}>import</span> <span>{'{ test, expect }'}</span> <span style={{ color: '#c586c0' }}>from</span> <span style={{ color: '#6a9955' }}>'@playwright/test'</span>;</p>
                <p className="pt-3"><span style={{ color: '#c586c0' }}>test</span>(<span style={{ color: '#6a9955' }}>'Flujo de checkout'</span>, <span style={{ color: '#c586c0' }}>async</span> ({'{ page }'}) =&gt; {'{'}</p>
                <p>&nbsp;&nbsp;await page.<span style={{ color: '#dcdcaa' }}>goto</span>(<span style={{ color: '#6a9955' }}>'/checkout'</span>);</p>
                <p>&nbsp;&nbsp;await page.<span style={{ color: '#dcdcaa' }}>fill</span>(<span style={{ color: '#6a9955' }}>'[data-testid=card]'</span>, <span style={{ color: '#6a9955' }}>'4242...'</span>);</p>
                <p>&nbsp;&nbsp;await page.<span style={{ color: '#dcdcaa' }}>click</span>(<span style={{ color: '#6a9955' }}>'.pay-now'</span>);</p>
                <p>&nbsp;&nbsp;await <span style={{ color: '#dcdcaa' }}>expect</span>(page).<span style={{ color: '#dcdcaa' }}>toHaveURL</span>(/<span style={{ color: '#6a9955' }}>success</span>/);</p>
                <p>{'}'});</p>
              </div>

              <div 
                className="px-6 py-4 border-t font-mono text-xs space-y-1"
                style={{ borderColor: '#404045', backgroundColor: 'rgba(220, 220, 221, 0.03)' }}
              >
                <p style={{ color: '#6a9955' }}>✓ Resiliencia de token [38ms]</p>
                <p style={{ color: '#6a9955' }}>✓ Validación dinámica [52ms]</p>
                <p style={{ color: '#6a9955' }}>✓ Flujo de checkout [2.3s]</p>
                <p style={{ color: '#6f7278' }} className="pt-2">3 exitosas · 0 fallas · selectores optimizados</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER - Light Premium */}
      <footer className="border-t" style={{ backgroundColor: LIGHT_PALETTE.background, borderColor: LIGHT_PALETTE.text.tertiary }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 
                className="text-lg font-bold"
                style={{ color: LIGHT_PALETTE.text.primary }}
              >
                Carlos Cervantes
              </h3>
              <p 
                className="text-sm"
                style={{ color: LIGHT_PALETTE.text.secondary }}
              >
                QA Engineer especializado en Performance Testing y Calidad Automática.
              </p>
              <div className="flex gap-4 pt-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={`Visita ${social}`}
                    className="text-sm font-medium transition-colors hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-2 py-1 rounded"
                    style={{ 
                      color: LIGHT_PALETTE.primary,
                      outlineOffset: '4px'
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Producto', links: ['Blog', 'Podcast', 'Proyectos'] },
              { title: 'Legal', links: ['Privacidad', 'Términos', 'Contacto'] }
            ].map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: LIGHT_PALETTE.text.primary }}
                >
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-2 py-1 rounded"
                        style={{ 
                          color: LIGHT_PALETTE.text.secondary,
                          outlineOffset: '4px'
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div 
            className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm"
            style={{ borderColor: LIGHT_PALETTE.text.tertiary, color: LIGHT_PALETTE.text.tertiary }}
          >
            <p>© 2026 Carlos Cervantes. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">Construido con <span className="text-base">✨</span></p>
          </div>
        </div>
      </footer>

      {/* Prototype Badge */}
      <div 
        className="fixed bottom-8 right-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm border shadow-lg z-40"
        style={{
          backgroundColor: `${LIGHT_PALETTE.primary}15`,
          borderColor: LIGHT_PALETTE.primary,
          color: LIGHT_PALETTE.primary
        }}
      >
        Light Premium Preview
      </div>

      {/* Return Link */}
      <div className="fixed top-8 left-8 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: LIGHT_PALETTE.surface,
            color: LIGHT_PALETTE.text.primary,
            outlineOffset: '4px'
          }}
        >
          ← Volver
        </Link>
      </div>
    </main>
  )
}
