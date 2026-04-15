'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Shield, Zap, GitBranch, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { animations } from '@/lib/animations'
import { HeroSection, ProcessStep, FeatureCard, SectionHeader } from '@/components/sections'

const processStepImages = [
  /* 01 — QA Strategy */
  <div key="01" className="rounded-[20px] border border-black/[0.08] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-black/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-auto text-[10px] font-mono font-semibold uppercase tracking-widest text-[#6f6f77]">qa-strategy.md</span>
    </div>
    <div className="space-y-3">
      {[
        { label: 'Riesgos críticos', value: '5 identificados', color: '#ff3b30' },
        { label: 'Cobertura objetivo', value: '87% flujos core', color: '#1d1d1f' },
        { label: 'Plan de release', value: 'Semana 3', color: '#34c759' },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7]">
          <span className="text-[12px] text-[#6f6f77] font-medium">{item.label}</span>
          <span className="text-[12px] font-bold" style={{ color: item.color }}>{item.value}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-2">
        <Shield className="w-4 h-4 text-[#1d1d1f]" />
        <span className="text-[11px] font-semibold text-[#34c759]">✓ Plan validado y listo</span>
      </div>
    </div>
  </div>,

  /* 02 — Automation */
  <div key="02" className="rounded-[20px] border border-black/[0.08] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-black/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-auto text-[10px] font-mono font-semibold uppercase tracking-widest text-[#6f6f77]">CI / pipeline</span>
    </div>
    <div className="space-y-2.5">
      {[
        { step: 'Build', status: 'passed', time: '1m 23s' },
        { step: 'Unit Tests', status: 'passed', time: '0m 48s' },
        { step: 'E2E Suite', status: 'passed', time: '4m 12s' },
        { step: 'Performance Smoke', status: 'passed', time: '2m 05s' },
      ].map((row) => (
        <div key={row.step} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#f5f5f7]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-[#6f6f77]" />
            <span className="text-[12px] font-medium text-[#1d1d1f]">{row.step}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6f6f77] font-mono">{row.time}</span>
            <span className="text-[10px] font-bold text-[#34c759] bg-[#34c759]/10 px-2 py-0.5 rounded-full">{row.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>,

  /* 03 — E2E */
  <div key="03" className="rounded-[20px] border border-black/[0.08] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-black/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-auto text-[10px] font-mono font-semibold uppercase tracking-widest text-[#6f6f77]">e2e-coverage</span>
    </div>
    <div className="space-y-3">
      {[
        { flow: 'Login / Auth', pct: 100 },
        { flow: 'Checkout flow', pct: 98 },
        { flow: 'Onboarding', pct: 95 },
        { flow: 'Payment gateway', pct: 100 },
      ].map((item) => (
        <div key={item.flow} className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#1d1d1f] font-medium">{item.flow}</span>
            <span className="text-[#1d1d1f] font-bold">{item.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1d1d1f]"
              style={{ width: `${item.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>,

  /* 04 — Performance */
  <div key="04" className="rounded-[20px] border border-black/[0.08] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-black/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-auto text-[10px] font-mono font-semibold uppercase tracking-widest text-[#6f6f77]">load-test.jmx</span>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'VUsers', value: '10K', sub: 'concurrentes' },
          { label: 'RPS', value: '1,847', sub: 'peak' },
          { label: 'P99', value: '248ms', sub: 'response' },
        ].map((m) => (
          <div key={m.label} className="text-center p-2.5 rounded-xl bg-[#f5f5f7]">
            <div className="text-[15px] font-bold text-[#1d1d1f] tabular-nums">{m.value}</div>
            <div className="text-[9px] text-[#6f6f77] uppercase tracking-wider font-semibold">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#34c759]/08 border border-[#34c759]/20">
        <Activity className="w-4 h-4 text-[#34c759]" />
        <span className="text-[11px] font-semibold text-[#1d1d1f]">Cero errores · 0% downtime</span>
      </div>
    </div>
  </div>,
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      {/* 1. HERO */}
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
        primaryButtonText="Diagnóstico gratis"
        primaryButtonHref="/servicios#diagnostico"
        secondaryButtonText="Ver mi perfil"
        secondaryButtonHref="/profile"
      />

      {/* 2. PROCESS SECTION */}
      <section className="bg-[#fafafa] py-28 md:py-40">
        <SectionHeader
          badge="Proceso"
          title="Así se construye software que no falla."
          description="La diferencia entre una gran experiencia y un crash está en estas cuatro fases."
          className="mb-16 md:mb-24"
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-6 lg:px-8 md:gap-10">
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
              image: processStepImages[0]
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
              image: processStepImages[1],
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
              image: processStepImages[2]
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
              image: processStepImages[3],
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
      <section className="bg-white py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Inicio de proyecto"
            title="Cómo arrancar con IA asistida."
            description="Un buen inicio reduce retrabajo y convierte la IA en una ventaja desde la semana 1."
            className="mb-14 md:mb-16"
          />

          <div className="grid grid-cols-1 gap-5 mt-14 md:grid-cols-2 xl:grid-cols-4">
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
      <section className="bg-[#f5f5f7] py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="section-badge">Proceso comercial</span>
              <h2
                className="font-bold text-[#1d1d1f] leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                Entender, proponer y ejecutar.
              </h2>
              <p className="text-[17px] text-[#6f6f77] max-w-md leading-relaxed">
                Un camino claro desde el primer contacto hasta la entrega con evidencia.
              </p>
            </div>

            <div className="relative space-y-6 rounded-[30px] border border-black/[0.06] bg-white/86 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.06)] md:p-8">
              <div className="timeline-line" />
              {[
                { n: '01', t: 'Contacto', d: 'Recibo brief y objetivos.' },
                { n: '02', t: 'IA analiza', d: 'Detectamos vacíos de negocio.' },
                { n: '03', t: 'Diagnóstico', d: 'Defino riesgos y prioridad.' },
                { n: '04', t: 'Entrega', d: 'Comparto evidencia y hallazgos.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-5 items-start relative z-10">
                  <div className="w-11 h-11 rounded-full bg-[#111113] border border-black/[0.1] flex items-center justify-center font-semibold text-[12px] text-white shadow-[0_14px_28px_rgba(17,17,19,0.16)] flex-shrink-0">
                    {s.n}
                  </div>
                  <div className="pt-1.5 space-y-0.5">
                    <p className="font-semibold text-[15px] text-[#1d1d1f]">{s.t}</p>
                    <p className="text-[13px] text-[#6f6f77]">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            {...animations.fadeInUp}
            className="overflow-hidden rounded-[30px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,250,250,0.92))] shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
          >
            <div className="p-6 space-y-7 md:p-8">
              <div className="flex items-center justify-between">
                <span className="section-badge">Journey visual</span>
                <span className="text-[11px] font-semibold text-[#6f6f77] uppercase tracking-wider">Carlos Cervantes</span>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-[#fafafa] rounded-[18px] border border-dashed border-black/[0.1] space-y-2">
                  <p className="text-[10px] font-bold text-[#6f6f77] uppercase tracking-[0.1em]">Input del cliente</p>
                  <p className="text-[17px] font-bold tracking-tight text-[#1d1d1f]">Mejorar calidad antes del release</p>
                  <p className="text-[12px] text-[#6f6f77] leading-relaxed">Producto activo con presión de tiempos.</p>
                </div>

                <div className="relative flex justify-center py-1">
                  <span className="px-3 py-1 bg-[#1d1d1f] text-white rounded-full text-[11px] font-bold tracking-[0.08em] uppercase shadow-sm">
                    Análisis IA
                  </span>
                </div>

                <div className="p-5 bg-[#111113]/[0.03] rounded-[18px] border border-[#111113]/[0.1] space-y-3">
                  <p className="text-[10px] font-bold text-[#1d1d1f] uppercase tracking-[0.1em]">Resultados detectados</p>
                  <ul className="space-y-2">
                    <li className="text-[12px] font-medium flex items-center gap-2 text-[#1d1d1f]">
                      <Check className="w-3.5 h-3.5 text-[#34c759]" strokeWidth={2.5} /> Resumen estructurado
                    </li>
                    <li className="text-[12px] font-medium flex items-center gap-2 text-[#1d1d1f]">
                      <Check className="w-3.5 h-3.5 text-[#34c759]" strokeWidth={2.5} /> 5 riesgos de alta prioridad
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex bg-[#fafafa] rounded-[16px] p-4 gap-5 items-center border border-black/[0.06]">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f6f77]">PDF Entregable</span>
                <div className="h-4 w-px bg-black/[0.1]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f6f77]">Alcance Validado</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/profile" className="text-[12px] font-semibold text-[#6f6f77] hover:text-[#1d1d1f] transition-colors flex items-center gap-1">
                  Conocerme <ArrowRight className="w-3 h-3" />
                </Link>
                <Link href="/servicios" className="text-[12px] font-semibold text-[#6f6f77] hover:text-[#1d1d1f] transition-colors flex items-center gap-1">
                  Portafolio <ArrowRight className="w-3 h-3" />
                </Link>
                <a href="/Carlos_Cervantes_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-[#1d1d1f] hover:underline ml-auto">
                  Descargar CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. PODCAST SECTION */}
      <section className="border-t border-black/[0.06] bg-white py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Contenido en profundidad"
            title="Podcast: Calidad Real"
            description="Episodios cortos, prácticos y sin relleno para QA Engineers, SDETs y líderes técnicos."
            className="mb-12 md:mb-14"
          />

          <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { icon: '⏱️', title: 'Episodios accionables', description: '12-20 min enfocados en resolver problemas reales sin relleno innecesario.' },
              { icon: '👥', title: 'Para líderes técnicos', description: 'Pensado para QA Engineers, SDETs, Tech Leads y Product Managers.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                {...animations.fadeInUpStagger}
                transition={{ delay: i * 0.12 }}
                className="rounded-[28px] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,250,250,0.92))] p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.1)]"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#fafafa] text-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">{item.icon}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2 tracking-[-0.01em]">{item.title}</h3>
                    <p className="text-[14px] text-[#6f6f77] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...animations.fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/podcast"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1d1d1f] text-white rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[#000000] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
            >
              Escuchar podcast
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-black/[0.13] text-[#1d1d1f] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[#f5f5f7]"
            >
              Leer artículos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
