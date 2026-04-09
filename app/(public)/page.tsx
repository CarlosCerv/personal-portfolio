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

// Animation Variants using CSS Variables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const fadeInUpStagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

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
    <main className="min-h-screen bg-white text-gray-dark">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-white overflow-hidden pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="container max-w-4xl space-y-12 md:space-y-16 text-center">
          
          {/* Status Badge */}
          <motion.div 
            {...fadeInUpStagger}
            className="w-fit mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-light bg-white hover:bg-white-secondary transition-colors">
              <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-dark">
                Disponible para nuevos proyectos
              </span>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.div 
            {...fadeInUpStagger}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.08, duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-gray-dark">
              <span className="block">Software que</span>
              <span className="block">escala sin</span>
              <span className="block text-blue">romperse</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeInUpStagger}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.16, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-secondary max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Especialista en <span className="font-semibold text-gray-dark">Performance Testing</span> y <span className="font-semibold text-gray-dark">Calidad Automática</span>. Garantizo que tu software funcione bajo cualquier escenario.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            {...fadeInUpStagger}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.24, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-8"
          >
            {[
              { number: "99%", label: "Quality Score" },
              { number: "1,847", label: "Bugs Prevenidos" },
              { number: "∞", label: "Zero Downtime" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 rounded-lg border border-gray-light bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue mb-2">{stat.number}</div>
                <div className="text-xs font-semibold text-gray-secondary uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value Props */}
          <motion.div
            {...fadeInUpStagger}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.32, duration: 0.6 }}
            className="space-y-3 pt-8 max-w-2xl mx-auto"
          >
            {["Zero downtime en producción", "Validado con 10M+ usuarios simultáneos", "99.99% uptime en sistemas críticos"].map((prop, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="w-1 h-1 rounded-full bg-blue" />
                <span className="text-base text-gray-secondary">{prop}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            {...fadeInUpStagger}
            transition={{ delay: shouldReduceAnimations ? 0 : 0.40, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12"
          >
            <Link 
              href="/servicios#diagnostico"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue text-white font-semibold text-base rounded-lg transition-all duration-200 hover:bg-blue hover:shadow-md active:scale-95"
            >
              Diagnóstico gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <Link 
              href="/profile"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-light text-gray-dark font-semibold text-base rounded-lg transition-all duration-200 hover:bg-white-secondary hover:border-gray-secondary"
            >
              Ver mi perfil
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PROCESS SECTION */}
      <section className="space-y-20 bg-white-secondary py-32 md:py-40">
        {/* Header */}
        <div className="container max-w-4xl text-center space-y-6">
          <motion.span {...fadeInUp} className="text-xs font-semibold uppercase tracking-wider text-gray-secondary">Proceso</motion.span>
          <motion.h2 {...fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark leading-tight">Así se construye software que no falla.</motion.h2>
          <motion.p {...fadeInUp} className="text-lg text-gray-secondary leading-relaxed">La diferencia entre una gran experiencia y un crash está en estas cuatro fases.</motion.p>
        </div>

        {/* Process Steps */}
        <div className="container max-w-6xl space-y-32">
          {[
            { 
              n: "01", 
              tag: "Estrategia QA", 
              title: "Antes de escribir una línea de código.", 
              desc: "Un bug en producción cuesta 100× más que uno detectado en diseño.",
              points: ["Riesgos críticos identificados antes de convertirse en crisis", "IA analiza requerimientos y genera escenarios automáticamente", "Cada release tiene un plan claro de verificación"]
            },
            { 
              n: "02", 
              tag: "Automatización", 
              title: "Las pruebas que corren mientras tú duermes.",
              desc: "Hacer pruebas a mano funciona. Hacerlas automáticas escala.",
              points: ["Regresión automática: ningún bug regresa sin ser detectado", "Integrado en CI/CD con GitHub Actions y Jenkins", "Web, iOS y Android con una sola estrategia de calidad"]
            },
            { 
              n: "03", 
              tag: "Pruebas End-to-End", 
              title: "Cada flujo de usuario, verificado al 100%.",
              desc: "No basta con que las piezas funcionen por separado.",
              points: ["Flujos críticos como pago, login y onboarding nunca fallan", "Cobertura visible para detectar zonas sin pruebas", "Self-healing selectors para UI dinámica"]
            },
            { 
              n: "04", 
              tag: "Performance Engineering", 
              title: "100,000 usuarios. Cero downtime.",
              desc: "Black Friday y lanzamientos masivos exigen resiliencia.",
              points: ["JMeter simula el peor escenario antes de producción", "Detección exacta de cuellos de botella: API, DB o Infra", "Diseño de resiliencia para eventos de alto tráfico"]
            }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={cn("space-y-8", i % 2 === 1 && "lg:order-2")}>
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-gray-secondary uppercase tracking-wide">{step.n} / 04</span>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue/10 border border-blue/20">
                    <div className="w-2 h-2 bg-blue rounded-full" /> 
                    <span className="text-sm font-semibold text-blue">{step.tag}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-dark leading-tight">{step.title}</h3>
                  <p className="text-lg text-gray-secondary leading-relaxed">{step.desc}</p>
                </div>
                <ul className="space-y-4">
                  {step.points.map((point, pi) => (
                    <li key={pi} className="flex items-center gap-3 text-sm font-medium text-gray-dark">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div 
                {...fadeInUp}
                className={cn("p-6 bg-white rounded-lg border border-gray-light shadow-sm", i % 2 === 1 && "lg:order-1")}
              >
                <div className="flex items-center justify-between mb-4 border-b border-gray-light pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-secondary">Sistema {step.n}</span>
                </div>
                <div className="space-y-3 text-sm text-gray-secondary">
                  <p>Configuración de pruebas: {step.tag.toLowerCase()}</p>
                  <div className="p-3 bg-white-secondary rounded border border-gray-light">
                    <p className="text-xs font-mono text-gray-dark">Sistema listo para {step.tag.toLowerCase()}</p>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. AI-POWERED START */}
      <section className="py-32 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-20 space-y-4">
            <motion.span {...fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-blue">Inicio de proyecto</motion.span>
            <motion.h2 {...fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark">Cómo arrancar con IA asistida.</motion.h2>
            <motion.p {...fadeInUp} className="text-lg text-gray-secondary max-w-2xl mx-auto">Un buen inicio reduce retrabajo y convierte la IA en una ventaja desde la semana 1.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                tag: '01 · Discovery', 
                title: 'De requerimientos a riesgos', 
                desc: 'La IA analiza historias de usuario para detectar vacíos funcionales.', 
                points: ['Mapeo de flujos críticos', 'Escenarios edge automáticos']
              },
              { 
                tag: '02 · Planning', 
                title: 'Estrategia multi-capa', 
                desc: 'Definimos qué automatizar, qué probar manual y qué merece carga.', 
                points: ['Procesos Smoke & Regresión', 'Matriz de automatización'],
                highlight: true
              },
              { 
                tag: '03 · Build', 
                title: 'Automatización ágil', 
                desc: 'Aceleramos la creación de tests con prompts y revisiones humanas.', 
                points: ['CI integrado en cada commit', 'Suites autorreparables']
              },
              { 
                tag: '04 · Launch', 
                title: 'Lanzamiento con datos', 
                desc: 'El release deja de ser una apuesta y se vuelve decisión basada en evidencia.', 
                points: ['Monitoreo post-despliegue', 'Mejora continua asistida']
              },
            ].map((card, i) => (
              <motion.article 
                key={i} 
                {...fadeInUpStagger}
                transition={{ delay: i * 0.12 }}
                className={cn(
                  "p-6 md:p-8 rounded-lg border transition-all h-full flex flex-col justify-between",
                  card.highlight ? "bg-blue text-white border-blue shadow-md" : "bg-white border-gray-light hover:shadow-md hover:border-blue/20"
                )}
              >
                <div className="space-y-6">
                  <span className={cn("text-xs font-semibold uppercase tracking-widest", card.highlight ? "text-white/70" : "text-gray-secondary")}>{card.tag}</span>
                  <div className="space-y-2">
                    <h3 className={cn("text-lg font-semibold tracking-tight", card.highlight ? "text-white" : "text-gray-dark")}>{card.title}</h3>
                    <p className={cn("text-sm leading-relaxed", card.highlight ? "text-white/80" : "text-gray-secondary")}>{card.desc}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  {card.points.map((p, pi) => (
                    <div key={pi} className={cn("flex items-center gap-2 text-xs font-semibold", card.highlight ? "text-white" : "text-gray-dark")}>
                      <Check className="w-3 h-3" /> {p}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL JOURNEY */}
      <section className="py-32 bg-white-secondary">
        <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue">Proceso comercial</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark leading-tight">Entender, proponer y ejecutar.</h2>
                <p className="text-lg text-gray-secondary max-w-md">Un camino claro desde el primer contacto hasta la entrega con evidencia.</p>
              </div>
              
              <div className="space-y-8 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gray-light" />
                {[
                  { n: '01', t: 'Contacto', d: 'Recibo brief y objetivos.' },
                  { n: '02', t: 'IA analiza', d: 'Detectamos vacíos de negocio.' },
                  { n: '03', t: 'Diagnóstico', d: 'Defino riesgos y prioridad.' },
                  { n: '04', t: 'Entrega', d: 'Comparto evidencia y hallazgos.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-light flex items-center justify-center font-semibold text-xs text-gray-dark">{s.n}</div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-base text-gray-dark">{s.t}</p>
                      <p className="text-xs text-gray-secondary">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <motion.div 
            {...fadeInUp}
            className="p-1 bg-white rounded-lg border border-gray-light shadow-sm"
           >
              <div className="bg-white rounded-lg p-8 space-y-8 border border-gray-light">
                <div className="flex items-center justify-between">
                   <div className="px-3 py-1 bg-blue/10 text-blue border border-blue/20 rounded-full font-semibold text-xs uppercase tracking-widest">Journey visual</div>
                   <div className="text-xs font-semibold text-gray-secondary uppercase">Carlos Cervantes</div>
                </div>
                
                <div className="space-y-6">
                   <div className="p-5 bg-white-secondary rounded-lg border border-gray-light border-dashed space-y-2">
                      <p className="text-xs font-semibold text-gray-secondary uppercase tracking-widest">Input del cliente</p>
                      <p className="text-lg font-bold tracking-tight text-gray-dark">Mejorar calidad antes del release</p>
                      <p className="text-xs text-gray-secondary leading-relaxed">Producto activo con presión de tiempos.</p>
                   </div>
                   
                   <div className="relative flex justify-center py-2">
                      <div className="px-3 py-1 bg-blue text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-sm">Análisis IA</div>
                   </div>

                   <div className="p-5 bg-blue/5 rounded-lg border border-blue/20 space-y-3">
                      <p className="text-xs font-semibold text-blue uppercase tracking-widest">Resultados detectados</p>
                      <ul className="space-y-2">
                        <li className="text-xs font-semibold flex items-center gap-2 text-gray-dark"><Check className="w-3 h-3 text-green-500" /> Resumen estructurado</li>
                        <li className="text-xs font-semibold flex items-center gap-2 text-gray-dark"><Check className="w-3 h-3 text-green-500" /> 5 riesgos de alta prioridad</li>
                      </ul>
                   </div>
                </div>

                <div className="flex bg-white-secondary rounded-lg p-4 gap-6 items-center border border-gray-light">
                   <span className="text-xs font-semibold uppercase tracking-widest text-gray-secondary">PDF Entregable</span>
                   <div className="h-4 w-px bg-gray-light" />
                   <span className="text-xs font-semibold uppercase tracking-widest text-gray-secondary">Alcance Validado</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/profile" className="text-xs font-semibold uppercase tracking-widest text-gray-secondary hover:text-blue transition-colors flex items-center gap-1">Conocerme →</Link>
                  <Link href="/servicios" className="text-xs font-semibold uppercase tracking-widest text-gray-secondary hover:text-blue transition-colors flex items-center gap-1">Portafolio →</Link>
                  <a href="/Carlos_Cervantes_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-widest text-blue hover:underline ml-auto">Descargar CV</a>
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 5. PODCAST SECTION */}
      <section className="py-20 md:py-32 border-t border-gray-light bg-white">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="space-y-4 mb-12 md:mb-16 text-center">
            <motion.span {...fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-blue">Contenido en profundidad</motion.span>
            <motion.h2 {...fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark">Podcast: Calidad Real</motion.h2>
            <motion.p {...fadeInUp} className="text-lg text-gray-secondary max-w-2xl mx-auto">Episodios cortos, prácticos y sin relleno para QA Engineers, SDETs y líderes técnicos.</motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '⏱️', title: 'Episodios accionables', description: '12-20 min enfocados en resolver problemas reales sin relleno innecesario.' },
              { icon: '👥', title: 'Para líderes técnicos', description: 'Pensado para QA Engineers, SDETs, Tech Leads y Product Managers.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUpStagger}
                transition={{ delay: i * 0.12 }}
                className="p-6 md:p-8 bg-white-secondary border border-gray-light hover:border-blue/30 rounded-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-2">{item.title}</h3>
                    <p className="text-gray-secondary">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div 
            {...fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/podcast"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue text-white rounded-lg font-semibold text-base transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                Escuchar podcast
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-light text-gray-dark rounded-lg font-semibold text-base transition-all duration-200 hover:bg-white-secondary"
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
