'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { animations } from '@/lib/animations'
import { HeroSection, ProcessStep, FeatureCard, SectionHeader } from '@/components/sections'

export default function HomePage() {
  
  return (
    <main className="min-h-screen bg-white text-gray-dark">
      {/* 1. HERO SECTION */}
      <HeroSection
        badge="Disponible para nuevos proyectos"
        title="Software que escala sin"
        titleHighlight="romperse"
        description="Especialista en Performance Testing y Calidad Automática. Garantizo que tu software funcione bajo cualquier escenario."
        stats={[
          { number: "99%", label: "Quality Score" },
          { number: "1,847", label: "Bugs Prevenidos" },
          { number: "∞", label: "Zero Downtime" }
        ]}
        bulletPoints={[
          "Zero downtime en producción",
          "Validado con 10M+ usuarios simultáneos",
          "99.99% uptime en sistemas críticos"
        ]}
        primaryButtonText="Diagnóstico gratis"
        primaryButtonHref="/servicios#diagnostico"
        secondaryButtonText="Ver mi perfil"
        secondaryButtonHref="/profile"
      />

      {/* 2. PROCESS SECTION */}
      <section className="space-y-20 bg-white-secondary py-32 md:py-40">
        <SectionHeader
          badge="Proceso"
          title="Así se construye software que no falla."
          description="La diferencia entre una gran experiencia y un crash está en estas cuatro fases."
        />

        {/* Process Steps */}
        <div className="container max-w-6xl space-y-32">
          {[
            {
              number: "01 / 04",
              tag: "Estrategia QA",
              title: "Antes de escribir una línea de código.",
              description: "Un bug en producción cuesta 100× más que uno detectado en diseño.",
              points: [
                "Riesgos críticos identificados antes de convertirse en crisis",
                "IA analiza requerimientos y genera escenarios automáticamente",
                "Cada release tiene un plan claro de verificación"
              ],
              image: (
                <div className="p-6 bg-white rounded-lg border border-gray-light shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-light pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-secondary">Sistema 01</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-secondary">
                    <p>Configuración de pruebas: estrategia qa</p>
                    <div className="p-3 bg-white-secondary rounded border border-gray-light">
                      <p className="text-xs font-mono text-gray-dark">Sistema listo para estrategia qa</p>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                  </div>
                </div>
              )
            },
            {
              number: "02 / 04",
              tag: "Automatización",
              title: "Las pruebas que corren mientras tú duermes.",
              description: "Hacer pruebas a mano funciona. Hacerlas automáticas escala.",
              points: [
                "Regresión automática: ningún bug regresa sin ser detectado",
                "Integrado en CI/CD con GitHub Actions y Jenkins",
                "Web, iOS y Android con una sola estrategia de calidad"
              ],
              image: (
                <div className="p-6 bg-white rounded-lg border border-gray-light shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-light pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-secondary">Sistema 02</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-secondary">
                    <p>Configuración de pruebas: automatización</p>
                    <div className="p-3 bg-white-secondary rounded border border-gray-light">
                      <p className="text-xs font-mono text-gray-dark">Sistema listo para automatización</p>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                  </div>
                </div>
              ),
              reverse: true
            },
            {
              number: "03 / 04",
              tag: "Pruebas End-to-End",
              title: "Cada flujo de usuario, verificado al 100%.",
              description: "No basta con que las piezas funcionen por separado.",
              points: [
                "Flujos críticos como pago, login y onboarding nunca fallan",
                "Cobertura visible para detectar zonas sin pruebas",
                "Self-healing selectors para UI dinámica"
              ],
              image: (
                <div className="p-6 bg-white rounded-lg border border-gray-light shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-light pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-secondary">Sistema 03</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-secondary">
                    <p>Configuración de pruebas: pruebas end-to-end</p>
                    <div className="p-3 bg-white-secondary rounded border border-gray-light">
                      <p className="text-xs font-mono text-gray-dark">Sistema listo para pruebas end-to-end</p>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                  </div>
                </div>
              )
            },
            {
              number: "04 / 04",
              tag: "Performance Engineering",
              title: "100,000 usuarios. Cero downtime.",
              description: "Black Friday y lanzamientos masivos exigen resiliencia.",
              points: [
                "JMeter simula el peor escenario antes de producción",
                "Detección exacta de cuellos de botella: API, DB o Infra",
                "Diseño de resiliencia para eventos de alto tráfico"
              ],
              image: (
                <div className="p-6 bg-white rounded-lg border border-gray-light shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-light pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-secondary">Sistema 04</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-secondary">
                    <p>Configuración de pruebas: performance engineering</p>
                    <div className="p-3 bg-white-secondary rounded border border-gray-light">
                      <p className="text-xs font-mono text-gray-dark">Sistema listo para performance engineering</p>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                  </div>
                </div>
              ),
              reverse: true
            }
          ].map((step, i) => (
            <ProcessStep
              key={i}
              number={step.number}
              tag={step.tag}
              title={step.title}
              description={step.description}
              points={step.points}
              image={step.image}
              reverse={step.reverse}
            />
          ))}
        </div>
      </section>

      {/* 3. AI-POWERED START */}
      <section className="py-32 bg-white">
        <div className="container max-w-6xl">
          <SectionHeader
            badge="Inicio de proyecto"
            title="Cómo arrancar con IA asistida."
            description="Un buen inicio reduce retrabajo y convierte la IA en una ventaja desde la semana 1."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              {
                title: "De requerimientos a riesgos",
                description: "La IA analiza historias de usuario para detectar vacíos funcionales.",
                points: ["Mapeo de flujos críticos", "Escenarios edge automáticos"],
                tag: "01 · Discovery"
              },
              {
                title: "Estrategia multi-capa",
                description: "Definimos qué automatizar, qué probar manual y qué merece carga.",
                points: ["Procesos Smoke & Regresión", "Matriz de automatización"],
                tag: "02 · Planning",
                highlight: true
              },
              {
                title: "Automatización ágil",
                description: "Aceleramos la creación de tests con prompts y revisiones humanas.",
                points: ["CI integrado en cada commit", "Suites autorreparables"],
                tag: "03 · Build"
              },
              {
                title: "Lanzamiento con datos",
                description: "El release deja de ser una apuesta y se vuelve decisión basada en evidencia.",
                points: ["Monitoreo post-despliegue", "Mejora continua asistida"],
                tag: "04 · Launch"
              }
            ].map((card, i) => (
              <FeatureCard
                key={i}
                tag={card.tag}
                title={card.title}
                description={card.description}
                points={card.points}
                highlighted={card.highlight}
              />
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
            {...animations.fadeInUp}
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
            <motion.span {...animations.fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-blue">Contenido en profundidad</motion.span>
            <motion.h2 {...animations.fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark">Podcast: Calidad Real</motion.h2>
            <motion.p {...animations.fadeInUp} className="text-lg text-gray-secondary max-w-2xl mx-auto">Episodios cortos, prácticos y sin relleno para QA Engineers, SDETs y líderes técnicos.</motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '⏱️', title: 'Episodios accionables', description: '12-20 min enfocados en resolver problemas reales sin relleno innecesario.' },
              { icon: '👥', title: 'Para líderes técnicos', description: 'Pensado para QA Engineers, SDETs, Tech Leads y Product Managers.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...animations.fadeInUpStagger}
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
            {...animations.fadeInUp}
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
