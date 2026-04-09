'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Check, 
  Terminal as TerminalIcon, 
  Globe, 
  Search,
  Cpu,
  BarChart3,
  Layout
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useShouldReduceAnimations } from '@/lib/hooks/use-reduce-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } }
}

// Reduced motion variants for mobile/accessibility
const fadeInUpReduced = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.3 }
}

export default function HomePage() {
  const shouldReduceAnimations = useShouldReduceAnimations()
  const animationVariants = shouldReduceAnimations ? fadeInUpReduced : fadeInUp
  
  return (
    <main className="min-h-screen text-foreground">
      
      {/* 1. HERO SECTION - LIGHT PREMIUM */}
      <section className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
        {/* Subtle Gradient Orbs - Light Version */}
        <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/30 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-gradient-to-bl from-cyan-100/30 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 text-center space-y-10">
          
          {/* Status Badge */}
          <motion.div 
            {...fadeInUp}
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 border border-border-primary bg-surface hover:border-border-accent transition-all duration-300"
          >
            <div className="flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-sm font-semibold text-text-primary">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* Main H1 Title */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.1, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="block text-text-primary">Software que</span>
              <span className="block text-text-primary">escala sin</span>
              <span className="block bg-gradient-to-r from-accent-indigo via-accent-cyan to-accent-indigo bg-clip-text text-transparent">
                romperse
              </span>
            </h1>
          </motion.div>

          {/* Description Paragraph */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-light"
          >
            Especialista en <span className="font-semibold text-text-primary">Performance Testing</span> y <span className="font-semibold text-text-primary">Calidad Automática</span>. Garantizo que tu software funcione bajo cualquier escenario, con cualquier volumen de usuarios.
          </motion.p>

          {/* Stats Dashboard */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-8"
          >
            {[
              { number: "99%", label: "Quality Score" },
              { number: "1,847", label: "Bugs Prevenidos" },
              { number: "∞", label: "Zero Downtime" }
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg border border-border-primary bg-surface hover:border-border-accent transition-all duration-300 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-accent-indigo mb-2">{stat.number}</div>
                <div className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.4, duration: 0.8 }}
            className="space-y-3 pt-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
              <span className="text-base text-text-secondary">Zero downtime en producción</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
              <span className="text-base text-text-secondary">Validado con 10M+ usuarios simultáneos</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
              <span className="text-base text-text-secondary">99.99% uptime en sistemas críticos</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link 
              href="/servicios#diagnostico" 
              aria-label="Iniciar diagnóstico gratis de calidad de software"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-accent-indigo to-accent-cyan text-white font-bold text-sm md:text-base rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Diagnóstico gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <Link 
              href="/profile" 
              aria-label="Ver perfil profesional completo"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border-primary text-text-primary font-bold text-sm md:text-base rounded-lg transition-all duration-300 hover:border-border-accent hover:bg-surface active:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver mi perfil
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THE JOURNEY (PROCESS) - APPLE STYLE */}
      <section className="space-y-32 bg-background-alt py-32 md:space-y-40 md:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center space-y-6">
          <motion.span {...fadeInUp} className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">Proceso</motion.span>
          <motion.h2 {...fadeInUp} className="mx-auto max-w-3xl text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight">Así se construye software que no falla.</motion.h2>
          <motion.p {...fadeInUp} className="mx-auto max-w-2xl text-xl text-text-secondary leading-relaxed">La diferencia entre una gran experiencia y un crash está en estas cuatro fases.</motion.p>
        </div>

        {/* Step 01: Strategy */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em]">01 / 04</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <div className="w-2 h-2 bg-primary rounded-full" /> 
              <span className="text-sm font-semibold text-text-primary">Estrategia QA</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight">Antes de escribir<br />una línea de código.</h3>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Un bug en producción cuesta 100× más que uno detectado en diseño. La estrategia de calidad define qué probar, cómo y cuándo.
            </p>
            <ul className="space-y-4">
              {[
                'Riesgos críticos identificados antes de convertirse en crisis',
                'IA analiza requerimientos y genera escenarios automáticamente',
                'Cada release tiene un plan claro de verificación'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" aria-hidden="true" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp} className="admin-card p-6 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">SMARTS QA MATRIX · OPTIMIZADA CON IA</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Resiliencia de token', p: 'P1 CRÍTICO', ai: true },
                { label: 'Validación dinámica', p: 'P1 CRÍTICO', ai: true },
                { label: 'Edge case de latencia', p: 'P2 ALTA', ai: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl bg-background-alt px-4 py-3">
                  <span className="text-xs font-semibold">{row.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-semibold text-red-500">{row.p}</span>
                    <span className="text-[9px] font-bold text-primary italic">✦ Auto</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step 02: Automation */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="lg:order-2 space-y-8">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em]">02 / 04</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <div className="w-2 h-2 bg-primary rounded-full" /> 
              <span className="text-sm font-semibold text-text-primary">Automatización</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight">Las pruebas que corren<br />mientras tú duermes.</h3>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Hacer pruebas a mano funciona. Hacerlas automáticas escala. Con Playwright y Appium, cada cambio activa cientos de verificaciones.
            </p>
            <ul className="space-y-4">
              {[
                'Regresión automática: ningún bug regresa sin ser detectado',
                'Integrado en CI/CD con GitHub Actions y Jenkins',
                'Web, iOS y Android con una sola estrategia de calidad'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" aria-hidden="true" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp} className="rounded-[28px] border border-[#2d2d30] bg-[#1f1f22] p-6 text-[#c7c7cc] shadow-[0_22px_50px_rgba(15,23,42,0.18)] transition-transform duration-500">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">checkout.spec.ts</span>
            </div>
            <div className="font-mono text-xs space-y-1">
              <p><span className="text-primary italic">// Playwright · Suite E2E</span></p>
              <p><span className="text-white">import</span> {'{ test, expect }'} <span className="text-white">from</span> <span className="text-green-400">'@playwright/test'</span>;</p>
              <p className="pt-2 text-white">test(<span className="text-green-400">'Flujo de checkout'</span>, async ({'{ page }'}) =&gt; {'{'}</p>
              <p>&nbsp;&nbsp;await page.goto(<span className="text-green-400">'/checkout'</span>);</p>
              <p>&nbsp;&nbsp;await page.fill(<span className="text-green-400">'[data-testid=card]'</span>, <span className="text-green-400">'4242...'</span>);</p>
              <p>&nbsp;&nbsp;await page.click(<span className="text-green-400">'.pay-now'</span>);</p>
              <p>&nbsp;&nbsp;await expect(page).toHaveURL(/success/);</p>
              <p>{'}'});<span className="w-1 h-3 bg-primary inline-block ml-1 animate-pulse" /></p>
            </div>
            <div className="mt-8 p-4 bg-white/5 rounded-lg text-green-400 text-[10px] space-y-1 border border-white/5 font-bold">
              <p>✓ Resiliencia de token &nbsp;[38ms]</p>
              <p>✓ Validación dinámica [52ms]</p>
              <p>✓ Flujo de checkout &nbsp;&nbsp;[2.3s]</p>
              <p className="pt-2 text-white/40">3 exitosas · 0 fallas · selectores optimizados</p>
            </div>
          </motion.div>
        </div>

        {/* Step 03: E2E */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">03 / 04</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <div className="w-2 h-2 bg-primary rounded-full" /> 
              <span className="text-sm font-semibold text-text-primary">Pruebas End-to-End</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight">Cada flujo de usuario,<br />verificado al 100%.</h3>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              No basta con que las piezas funcionen por separado. Las pruebas E2E simulan lo que hace un usuario real: registrarse, comprar, cancelar.
            </p>
            <ul className="space-y-4">
              {[
                'Flujos críticos como pago, login y onboarding nunca fallan',
                'Cobertura visible para detectar zonas sin pruebas',
                'Self-healing selectors para UI dinámica'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" aria-hidden="true" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp} className="admin-card p-6 shadow-2xl relative">
             <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-[10px] font-black text-muted bg-background-alt px-4 py-1 rounded-full border border-border italic">https://carloscervantes.qa/checkout</div>
             </div>
             <div className="space-y-4">
               {[
                 'Registro de usuario', 'Checkout multimoneda', 'Integración de pagos', 'Manejo de errores'
               ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-border/50 rounded-xl">
                   <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]"><Check className="w-3 h-3" /></div>
                   <span className="text-xs font-bold">{c}</span>
                </div>
               ))}
               <div className="pt-8 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>Cobertura de pruebas</span>
                    <span className="text-primary">94%</span>
                  </div>
                  <div className="h-2 bg-background-alt rounded-full overflow-hidden border border-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '94%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary" 
                    />
                  </div>
               </div>
             </div>
          </motion.div>
        </div>

        {/* Step 04: Performance */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="lg:order-2 space-y-8">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">04 / 04</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <div className="w-2 h-2 bg-primary rounded-full" /> 
              <span className="text-sm font-semibold text-text-primary">Performance Engineering</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight">100,000 usuarios.<br />Cero downtime.</h3>
            <p className="text-lg text-secondary-muted leading-relaxed">
              Black Friday y lanzamientos masivos exigen una plataforma capaz de resistir el pico más agresivo sin degradar la experiencia.
            </p>
            <ul className="space-y-4">
              {[
                'JMeter simula el peor escenario antes de producción',
                'Detección exacta de cuellos de botella: API, DB o Infra',
                'Diseño de resiliencia para eventos de alto tráfico'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" aria-hidden="true" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp} className="admin-card p-6 shadow-2xl bg-secondary text-white border-white/10">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6]">PANEL DE PERFORMANCE</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[9px] font-black">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" /> LIVE
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { k: 'Concurrentes', v: '100K' },
                { k: 'Latencia P99', v: '94ms' },
                { k: 'Tasa error', v: '0.00%' },
                { k: 'Throughput', v: '8.2K/s' },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] font-black text-[#a1a1a6] uppercase">{s.k}</p>
                  <p className="text-xl font-bold mt-1">{s.v}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
               <p className="text-[9px] font-black text-[#a1a1a6] uppercase">Usuarios concurrentes (Ventana 10m)</p>
               <div className="h-24 flex items-end gap-1 px-2">
                 {[35, 52, 65, 80, 90, 96, 100, 98, 93, 97].map((h, i) => (
                   <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-primary rounded-t-sm shadow-md" 
                   />
                 ))}
               </div>
            </div>
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center text-primary font-black text-xs shadow-lg">HEX</div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">SCALE CERTIFIED</p>
                  <p className="text-[9px] text-[#a1a1a6]">Nivel enterprise · Listo para producción</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. AI START SECTION */}
      <section className="py-32 bg-background-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left space-y-4 mb-20">
            <motion.span {...fadeInUp} className="text-xs font-black uppercase tracking-widest text-accent">Inicio de proyecto</motion.span>
            <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black tracking-tight text-text-primary max-w-2xl leading-none">Cómo arrancar con calidad asistida por IA.</motion.h2>
            <motion.p {...fadeInUp} className="text-xl text-text-secondary max-w-xl">Un buen inicio reduce retrabajo y convierte la IA en una ventaja operativa desde la semana 1.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                tag: '01 · Discovery', 
                title: 'De requerimientos a riesgos', 
                desc: 'La IA analiza historias de usuario para detectar vacíos funcionales.', 
                points: ['Mapeo de flujos críticos', 'Escenarios edge automáticos'],
                icon: Search
              },
              { 
                tag: '02 · Planning', 
                title: 'Estrategia multi-capa', 
                desc: 'Definimos qué automatizar, qué probar manual y qué merece carga.', 
                points: ['Procesos Smoke & Regresión', 'Matriz de automatización'],
                icon: Layout,
                highlight: true
              },
              { 
                tag: '03 · Build', 
                title: 'Automatización ágil', 
                desc: 'Aceleramos la creación de tests con prompts y revisiones humanas.', 
                points: ['CI integrado en cada commit', 'Suites autorreparables'],
                icon: TerminalIcon
              },
              { 
                tag: '04 · Launch', 
                title: 'Lanzamiento con datos', 
                desc: 'El release deja de ser una apuesta y se vuelve una decisión basada en evidencia.', 
                points: ['Monitoreo post-despliegue', 'Mejora continua asistida'],
                icon: Check
              },
            ].map((card, i) => {
              const IconComponent = card.icon
              return (
                <motion.article 
                  key={i} 
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "p-8 rounded-xl border transition-all h-full flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    card.highlight ? "bg-accent-indigo text-white shadow-lg" : "bg-white border-border hover:shadow-md"
                  )}
                >
                  <div className="space-y-6">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", card.highlight ? "text-white/60" : "text-text-secondary")}>{card.tag}</span>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black tracking-tighter leading-none text-text-primary">{card.title}</h3>
                      <p className={cn("text-xs font-semibold leading-relaxed", card.highlight ? "text-white/80" : "text-text-secondary")}>{card.desc}</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-2">
                    {card.points.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2 text-[10px] font-bold text-text-primary">
                        <Check className="w-3 h-3" aria-hidden="true" /> {p}
                      </div>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. CLIENT JOURNEY CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Proceso comercial</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tighter">Entender, proponer y ejecutar.</h2>
                <p className="text-lg text-secondary-muted max-w-md">Un camino claro desde el primer contacto hasta la entrega con evidencia.</p>
              </div>
              
              <div className="space-y-8 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border-primary" />
                {[
                  { n: '01', t: 'Contacto', d: 'Recibo brief y objetivos.' },
                  { n: '02', t: 'IA analiza', d: 'Detectamos vacíos de negocio.' },
                  { n: '03', t: 'Diagnóstico', d: 'Defino riesgos y prioridad.' },
                  { n: '04', t: 'Entrega', d: 'Comparto evidencia y hallazgos.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-background-alt border border-border-primary flex items-center justify-center font-black text-xs text-text-secondary group-hover:text-accent transition-colors">{s.n}</div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm tracking-tight">{s.t}</p>
                      <p className="text-xs font-semibold text-text-secondary">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="admin-card p-1 shadow-lg relative overflow-hidden bg-background-alt">
              <div className="bg-white m-1 rounded-xl p-8 space-y-8 border border-border-primary">
                <div className="flex items-center justify-between">
                   <div className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded font-black text-[9px] uppercase tracking-widest">Journey visual</div>
                   <div className="text-[10px] font-black text-text-secondary uppercase">Carlos Cervantes</div>
                </div>
                
                <div className="space-y-6">
                   <div className="p-5 bg-background-alt rounded-xl border border-border-primary border-dashed space-y-2">
                      <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest font-bold">Input del cliente</p>
                      <p className="text-lg font-black tracking-tight text-text-primary">Mejorar calidad antes del release</p>
                      <p className="text-xs font-semibold text-text-secondary leading-relaxed">Producto activo con presión de tiempos.</p>
                   </div>
                   
                   <div className="relative flex justify-center py-2">
                      <div className="px-3 py-1 bg-accent text-white rounded-lg text-[10px] font-black tracking-widest uppercase shadow-md">Análisis IA</div>
                   </div>

                   <div className="p-5 bg-accent/5 rounded-xl border border-accent/20 space-y-3">
                      <p className="text-[9px] font-black text-accent uppercase tracking-widest">Resultados detectados</p>
                      <ul className="space-y-2">
                        <li className="text-[11px] font-bold flex items-center gap-2 text-text-primary"><Check className="w-3 h-3 text-accent" /> Resumen estructurado</li>
                        <li className="text-[11px] font-bold flex items-center gap-2 text-text-primary"><Check className="w-3 h-3 text-accent" /> 5 riesgos de alta prioridad</li>
                      </ul>
                   </div>
                </div>

                <div className="flex bg-background-alt rounded-xl p-4 gap-6 items-center border border-border-primary">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">PDF Entregable</span>
                   </div>
                   <div className="h-4 w-px bg-border-primary" />
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Alcance Validado</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/profile" aria-label="Ver perfil completo" className="text-xs font-black uppercase tracking-widest text-text-secondary hover:text-accent-indigo flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-indigo rounded px-1">Conocerme →</Link>
                  <Link href="/servicios" aria-label="Ver portafolio y servicios" className="text-xs font-black uppercase tracking-widest text-text-secondary hover:text-accent-indigo flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-indigo rounded px-1">Portafolio →</Link>
                  <a href="/Carlos_Cervantes_CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="Descargar CV en PDF" className="text-xs font-black uppercase tracking-widest text-accent-indigo flex items-center gap-1 hover:underline ml-auto focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-indigo rounded px-1">Descargar CV</a>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. PODCAST SECTION */}
      <section className="py-20 md:py-32 border-t border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="space-y-4 mb-12 md:mb-16 text-center">
            <motion.span 
              {...fadeInUp} 
              className="text-xs font-semibold uppercase tracking-widest text-accent"
            >
              Contenido en profundidad
            </motion.span>
            <motion.h2 
              {...fadeInUp} 
              className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary"
            >
              Podcast: Calidad Real
            </motion.h2>
            <motion.p 
              {...fadeInUp} 
              className="mx-auto max-w-2xl text-lg text-text-secondary"
            >
              Episodios cortos, prácticos y sin relleno. Para QA Engineers, SDETs y líderes técnicos que quieren mejorar su estrategia de calidad.
            </motion.p>
          </div>

          {/* Concept Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: '⏱️',
                title: 'Episodios accionables',
                description: '12-20 min enfocados en resolver problemas reales sin relleno innecesario.'
              },
              {
                icon: '👥',
                title: 'Para líderes técnicos',
                description: 'Pensado para QA Engineers, SDETs, Tech Leads y Product Managers.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="admin-card p-6 md:p-8 bg-background-alt border border-border-primary hover:border-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl text-accent">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA to Podcast Page */}
          <motion.div 
            {...fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/podcast"
              aria-label="Escuchar episodios del podcast Calidad Real"
              className="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-accent-indigo text-white rounded-full font-semibold text-sm md:text-base uppercase tracking-widest transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="relative z-10 flex items-center gap-2">
                Escuchar podcast
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link 
              href="/blog"
              aria-label="Ver todos los artículos del blog"
              className="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-border-primary text-text-primary rounded-full font-semibold text-sm md:text-base uppercase tracking-widest transition-all duration-300 hover:bg-background-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Leer artículos
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
