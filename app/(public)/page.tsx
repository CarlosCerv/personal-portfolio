'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Check, 
  Terminal as TerminalIcon, 
  Globe, 
  Activity, 
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Cpu,
  BarChart3,
  FileText,
  Layout
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } }
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-transparent pb-28 pt-44 md:pb-32 md:pt-48">
        <div className="absolute left-1/2 top-0 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          <motion.div 
            {...fadeInUp}
            className="apple-badge px-4 py-2"
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Ingeniero de Performance Testing · Wizeline · Guadalajara
          </motion.div>

          <motion.h1 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-semibold tracking-[-0.06em] leading-[0.92] text-foreground md:text-8xl"
          >
            Calidad de software<br />
            lista para <span className="text-primary">escalar.</span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed text-secondary-muted"
          >
            Especialista en garantizar que el software que usas cada día funcione sin importar cuántos usuarios lo estén usando al mismo tiempo.
          </motion.p>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/servicios#diagnostico" className="admin-btn-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] flex items-center gap-2">
              Ver cómo funciona <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/profile" className="admin-btn-outline px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted hover:text-foreground">
              Ver perfil completo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THE JOURNEY (PROCESS) */}
      <section className="space-y-28 py-28 md:space-y-32 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <motion.span {...fadeInUp} className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">El proceso</motion.span>
          <motion.h2 {...fadeInUp} className="mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Así se construye software que no falla.</motion.h2>
          <motion.p {...fadeInUp} className="mx-auto max-w-xl text-lg text-secondary-muted">La diferencia entre una gran experiencia y un crash está en estas cuatro fases.</motion.p>
        </div>

        {/* Step 01: Strategy */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em]">01 / 04</span>
            <div className="apple-badge w-fit px-3 py-1.5">
              <div className="w-2 h-2 bg-primary rounded-full" /> Estrategia QA
            </div>
            <h3 className="text-4xl font-semibold tracking-[-0.05em] leading-tight">Antes de escribir<br />una línea de código.</h3>
            <p className="text-lg text-secondary-muted leading-relaxed">
              Un bug en producción cuesta 100× más que uno detectado en diseño. La estrategia de calidad define qué probar, cómo y cuándo.
            </p>
            <ul className="space-y-4">
              {[
                'Riesgos críticos identificados antes de convertirse en crisis',
                'IA analiza requerimientos y genera escenarios automáticamente',
                'Cada release tiene un plan claro de verificación'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" /></div>
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
            <div className="apple-badge w-fit px-3 py-1.5 text-muted">
              <div className="w-2 h-2 bg-muted rounded-full" /> Automatización
            </div>
            <h3 className="text-4xl font-semibold tracking-[-0.05em] leading-tight">Las pruebas que corren<br />mientras tú duermes.</h3>
            <p className="text-lg text-secondary-muted leading-relaxed">
              Hacer pruebas a mano funciona. Hacerlas automáticas escala. Con Playwright y Appium, cada cambio activa cientos de verificaciones.
            </p>
            <ul className="space-y-4">
              {[
                'Regresión automática: ningún bug regresa sin ser detectado',
                'Integrado en CI/CD con GitHub Actions y Jenkins',
                'Web, iOS y Android con una sola estrategia de calidad'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" /></div>
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
            <div className="flex items-center gap-2 px-3 py-1 border border-border rounded-lg w-fit text-[10px] font-black uppercase tracking-widest text-primary">
              <div className="w-2 h-2 bg-primary rounded-full" /> Pruebas end-to-end
            </div>
            <h3 className="text-4xl font-black tracking-tight leading-tight">Cada flujo de usuario,<br />verificado al 100%.</h3>
            <p className="text-lg text-secondary-muted leading-relaxed">
              No basta con que las piezas funcionen por separado. Las pruebas E2E simulan lo que hace un usuario real: registrarse, comprar, cancelar.
            </p>
            <ul className="space-y-4">
              {[
                'Flujos críticos como pago, login y onboarding nunca fallan',
                'Cobertura visible para detectar zonas sin pruebas',
                'Self-healing selectors para UI dinámica'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" /></div>
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
            <div className="flex items-center gap-2 px-3 py-1 border border-border rounded-lg w-fit text-[10px] font-black uppercase tracking-widest text-muted">
              <div className="w-2 h-2 bg-muted rounded-full" /> Performance Engineering
            </div>
            <h3 className="text-4xl font-black tracking-tight leading-tight">100,000 usuarios.<br />Cero downtime.</h3>
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
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><Check className="w-3 h-3" /></div>
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
                    className="flex-1 bg-primary rounded-t-sm" 
                   />
                 ))}
               </div>
            </div>
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center text-primary font-black text-xs">HEX</div>
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
            <motion.span {...fadeInUp} className="text-xs font-black uppercase tracking-widest text-[#0071e3]">Inicio de proyecto</motion.span>
            <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black tracking-tight text-foreground max-w-2xl leading-none">Cómo arrancar con calidad asistida por IA.</motion.h2>
            <motion.p {...fadeInUp} className="text-xl text-secondary-muted max-w-xl">Un buen inicio reduce retrabajo y convierte la IA en una ventaja operativa desde la semana 1.</motion.p>
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
                icon: Zap
              },
            ].map((card, i) => (
              <motion.article 
                key={i} 
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-8 rounded-[32px] border transition-all h-full flex flex-col justify-between group",
                  card.highlight ? "bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-105" : "bg-white border-border hover:shadow-xl"
                )}
              >
                <div className="space-y-6">
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", card.highlight ? "text-white/60" : "text-muted")}>{card.tag}</span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tighter leading-none">{card.title}</h3>
                    <p className={cn("text-xs font-semibold leading-relaxed", card.highlight ? "text-white/80" : "text-muted")}>{card.desc}</p>
                  </div>
                </div>
                <div className="mt-8 space-y-2">
                  {card.points.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-2 text-[10px] font-bold">
                       <Check className="w-3 h-3" /> {p}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
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
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border dashed" />
                {[
                  { n: '01', t: 'Contacto', d: 'Recibo brief y objetivos.' },
                  { n: '02', t: 'IA analiza', d: 'Detectamos vacíos de negocio.' },
                  { n: '03', t: 'Diagnóstico', d: 'Defino riesgos y prioridad.' },
                  { n: '04', t: 'Entrega', d: 'Comparto evidencia y hallazgos.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-background-alt border border-border flex items-center justify-center font-black text-xs text-muted group-hover:text-primary transition-colors">{s.n}</div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm tracking-tight">{s.t}</p>
                      <p className="text-xs font-semibold text-muted">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="admin-card p-1 shadow-2xl relative overflow-hidden bg-background-alt">
              <div className="bg-white m-1 rounded-2xl p-8 space-y-8 border border-border">
                <div className="flex items-center justify-between">
                   <div className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-black text-[9px] uppercase tracking-widest">Journey visual</div>
                   <div className="text-[10px] font-black text-muted uppercase">Carlos Cervantes</div>
                </div>
                
                <div className="space-y-6">
                   <div className="p-5 bg-background-alt rounded-2xl border border-border border-dashed space-y-2">
                      <p className="text-[9px] font-black text-muted uppercase tracking-widest font-bold">Input del cliente</p>
                      <p className="text-lg font-black tracking-tight text-secondary">Mejorar calidad antes del release</p>
                      <p className="text-xs font-semibold text-muted leading-relaxed">Producto activo con presión de tiempos.</p>
                   </div>
                   
                   <div className="relative flex justify-center py-2">
                      <div className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-black tracking-widest uppercase shadow-xl shadow-primary/20">Análisis IA</div>
                   </div>

                   <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 space-y-3">
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest">Resultados detectados</p>
                      <ul className="space-y-2">
                        <li className="text-[11px] font-bold flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> Resumen estructurado</li>
                        <li className="text-[11px] font-bold flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> 5 riesgos de alta prioridad</li>
                      </ul>
                   </div>
                </div>

                <div className="flex bg-background-alt rounded-2xl p-4 gap-6 items-center border border-border">
                   <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-muted" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted">PDF Entregable</span>
                   </div>
                   <div className="h-4 w-px bg-border" />
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted">Alcance Validado</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/profile" className="text-xs font-black uppercase tracking-widest text-muted hover:text-primary flex items-center gap-1 transition-colors">Conocerme <ArrowUpRight className="w-3 h-3" /></Link>
                  <Link href="/servicios" className="text-xs font-black uppercase tracking-widest text-muted hover:text-primary flex items-center gap-1 transition-colors">Portafolio <ArrowUpRight className="w-3 h-3" /></Link>
                  <a href="/Carlos_Cervantes_CV.pdf" target="_blank" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:underline ml-auto">Descargar CV</a>
                </div>
              </div>
           </div>
        </div>
      </section>

    </main>
  )
}
