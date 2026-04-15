'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  Smartphone, 
  Globe, 
  Server, 
  Layers,
  Zap,
  Activity,
  ShieldCheck,
  Download,
  Mail,
  PieChart,
  Target,
  ArrowRight,
  Clock,
  Layout
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  "Tu aplicación",
  "Escala y usuarios",
  "Stack técnico",
  "Tu mayor problema",
  "Recibir diagnóstico"
]

const SERVICE_PILLARS = [
  {
    title: 'Estrategia QA',
    description: 'Definición de cobertura, riesgos, criterios de salida y plan de validación antes de que el producto falle en producción.',
    icon: ShieldCheck,
    points: ['Mapeo de riesgos críticos', 'Plan de calidad por release', 'Alineación técnica y de negocio'],
  },
  {
    title: 'Automatización E2E',
    description: 'Suites automatizadas para web y mobile con foco en flujos críticos, regresión y confianza continua de despliegue.',
    icon: Layout,
    points: ['Playwright, Cypress y Appium', 'CI/CD y ejecución continua', 'Cobertura visible por flujo'],
  },
  {
    title: 'Performance Engineering',
    description: 'Pruebas de carga, estrés y endurance para validar escalabilidad real antes de que el crecimiento exponga cuellos de botella.',
    icon: Activity,
    points: ['k6 y JMeter', 'Escenarios por concurrencia', 'Recomendaciones priorizadas'],
  },
]

const DELIVERY_BLOCKS = [
  {
    title: 'Auditoría inicial',
    description: 'Revisión técnica del estado actual de calidad, arquitectura, cobertura y principales riesgos del producto.',
  },
  {
    title: 'Plan de acción',
    description: 'Roadmap con quick wins, automatizaciones prioritarias, riesgos de performance y estructura de ejecución.',
  },
  {
    title: 'Implementación guiada',
    description: 'Acompañamiento para ejecutar el plan, integrar tooling, construir suites y dejar evidencia del avance.',
  },
]

export default function ServiciosPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  const [formData, setFormData] = useState<any>({
    tipo: [],
    usuariosActuales: '',
    picoEsperado: '',
    stack: {
      frontend: [],
      backend: [],
      cicd: []
    },
    sintomas: [],
    contexto: '',
    nombre: '',
    email: '',
    empresa: '',
    rol: ''
  })

  const canGoNext = () => {
    if (currentStep === 0) return formData.tipo.length > 0
    if (currentStep === 1) return formData.usuariosActuales !== '' && formData.picoEsperado !== ''
    if (currentStep === 2) return true
    if (currentStep === 3) return formData.sintomas.length > 0
    if (currentStep === 4) return formData.nombre !== '' && formData.email !== ''
    return true
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      const resp = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!resp.ok) throw new Error('API Error')
      const data = await resp.json()
      
      // Simulate processing time for UX
      setTimeout(() => {
        setResult(data)
        setIsProcessing(false)
      }, 3500)

    } catch (err) {
      console.error(err)
      alert('Error técnico. Por favor intenta de nuevo.')
      setIsProcessing(false)
    }
  }

  if (result) return <ResultsState data={result} userData={formData} />
  if (isProcessing) return <ProcessingState />

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero strip */}
      <div className="mb-20 overflow-hidden border-b border-black/[0.06] bg-[#fafafa] pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-4">
          <span className="section-badge">QA & Performance</span>
          <h1
            className="font-bold text-[#1d1d1f] leading-tight max-w-4xl"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}
          >
            Calidad técnica documentada y escalable.
          </h1>
          <p className="text-[17px] text-[#6f6f77] leading-relaxed max-w-2xl">
            Ayudo a equipos a implementar QA como capacidad real: diagnóstico de riesgos, automatización E2E y performance testing con entregables claros.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-5">
            <Link
              href="#diagnostico"
              className="group inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-[#1d1d1f] text-white rounded-full font-semibold text-[15px] hover:bg-[#000000] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all"
            >
              Iniciar diagnóstico <ArrowRight className="w-4 h-4 hidden sm:block group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-black/[0.13] text-[#1d1d1f] rounded-full font-semibold text-[15px] hover:bg-[#f5f5f7] transition-all"
            >
              Agendar consultoría
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 space-y-4">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] tracking-[0.1em] text-primary">
              Servicios principales
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-[-0.03em] leading-tight max-w-3xl">
              Cómo ayudo a mejorar la calidad del producto.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              Cada servicio es independiente pero funciona mejor en conjunto. El diagnóstico es el punto de entrada.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICE_PILLARS.map((service) => (
              <div
                key={service.title}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,250,250,0.92))] p-8 shadow-[0_20px_48px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(15,23,42,0.1)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(17,17,19,0.14),transparent)]" />
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#fafafa] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] flex-shrink-0">
                  <service.icon className="w-6 h-6 text-[#1d1d1f]" strokeWidth={2} />
                </div>
                <div className="mt-6 space-y-3 flex-1">
                  <h3 className="text-[18px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#6f6f77]">
                    {service.description}
                  </p>
                </div>
                <ul className="mt-6 space-y-3 border-t border-black/[0.06] pt-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 rounded-[16px] bg-white px-3 py-3">
                      <div className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#1d1d1f] flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-[13px] font-medium text-[#1d1d1f]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] tracking-[0.18em] text-primary">Cómo se trabaja</span>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-foreground">
                Un proceso claro desde la auditoría hasta la implementación.
              </h2>
              <p className="text-lg leading-relaxed text-secondary-muted">
                El objetivo es que el cliente entienda qué se revisa, qué se prioriza y qué recibe al final de cada etapa.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {DELIVERY_BLOCKS.map((block, index) => (
                <div key={block.title} className="admin-card rounded-[30px] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">{block.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-muted">{block.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="diagnostico" className="scroll-mt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] tracking-[0.18em] text-primary">Diagnóstico inicial</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-foreground">
              Diagnóstico de Calidad Asistido por IA.
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-secondary-muted">
              Si quieres aterrizar tu situación actual antes de contratar una intervención más profunda, este flujo genera
              una primera lectura técnica y un plan inicial.
            </p>
            
            <div className="pt-10 space-y-6">
               <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-muted mb-2">
                  <span>{STEPS[currentStep]}</span>
                  <span>Paso {currentStep + 1} de 5</span>
               </div>
               <div className="relative pt-2">
                 <div className="absolute top-1/2 -mt-[1px] left-0 right-0 h-[2px] bg-black/[0.06] rounded-full" />
                 <motion.div 
                   className="absolute top-1/2 -mt-[1px] left-0 h-[2px] bg-[#1d1d1f] rounded-full"
                   initial={{ width: 0 }}
                   animate={{ width: `${((currentStep) / (STEPS.length - 1)) * 100}%` }}
                   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                 />
                 <div className="relative flex justify-between items-center w-full z-10">
                    {STEPS.map((_, i) => (
                      <div key={i} className={cn(
                        "w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm",
                        i < currentStep ? "bg-[#1d1d1f] text-white ring-2 ring-white" : 
                        i === currentStep ? "bg-white border-2 border-[#1d1d1f] scale-110" : 
                        "bg-white border-2 border-black/[0.1] text-transparent"
                      )}>
                        {i < currentStep ? <Check className="w-3 h-3" strokeWidth={3} /> : <div className={cn("w-2 h-2 rounded-full", i === currentStep ? "bg-[#1d1d1f]" : "bg-transparent")} />}
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="admin-card relative overflow-hidden bg-white p-8 shadow-[0_32px_84px_rgba(15,23,42,0.12)] md:p-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* STEP 0: TYPE */}
              {currentStep === 0 && (
                <div className="space-y-10">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">¿Qué tipo de aplicación estás construyendo?</h2>
                    <p className="text-sm text-secondary-muted font-medium">Selecciona una o varias opciones.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'web', label: 'E-commerce / Web', icon: Globe },
                      { id: 'mobile', label: 'App Móvil', icon: Smartphone },
                      { id: 'api', label: 'API / Backend', icon: Server },
                      { id: 'saas', label: 'SaaS / B2B', icon: Layers },
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => {
                          const exists = formData.tipo.includes(item.id)
                          setFormData({ ...formData, tipo: exists ? formData.tipo.filter((t: string) => t !== item.id) : [...formData.tipo, item.id] })
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 rounded-[24px] border-2 transition-all gap-4 group",
                          formData.tipo.includes(item.id) ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-border-dark text-muted"
                        )}
                      >
                        <item.icon className="w-8 h-8" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: SCALE */}
              {currentStep === 1 && (
                <div className="space-y-12">
                   <div className="space-y-8">
                      <h2 className="text-2xl font-semibold text-center">¿Cuál es tu escala actual de usuarios?</h2>
                      <div className="flex flex-wrap justify-center gap-3">
                         {['MVP (0 - 1K)', 'Crecimiento (1K - 10K)', 'Escala (10K - 100K)', 'Nivel Enterprise (+100K)'].map(val => (
                           <button 
                             key={val}
                             onClick={() => setFormData({...formData, usuariosActuales: val})}
                             className={cn(
                               "px-6 py-3 rounded-full text-sm font-bold border-2 transition-all",
                               formData.usuariosActuales === val ? "bg-primary border-primary text-white" : "border-border text-muted hover:border-foreground hover:text-foreground"
                             )}
                           >
                             {val}
                           </button>
                         ))}
                      </div>
                   </div>

                   {formData.usuariosActuales && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pt-8 border-t border-border">
                        <h2 className="text-2xl font-semibold text-center">¿Cuál es tu pico esperado de concurrencia?</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                           {['Uso constante', 'Pico moderado', 'Evento masivo (+100K)', 'Desconocido'].map(val => (
                             <button 
                               key={val}
                               onClick={() => setFormData({...formData, picoEsperado: val})}
                               className={cn(
                                 "px-6 py-3 rounded-full text-sm font-bold border-2 transition-all",
                                 formData.picoEsperado === val ? "bg-secondary border-secondary text-white" : "border-border text-muted hover:border-foreground hover:text-foreground"
                               )}
                             >
                               {val}
                             </button>
                           ))}
                        </div>
                     </motion.div>
                   )}
                </div>
              )}

              {/* STEP 2: STACK */}
              {currentStep === 2 && (
                <div className="space-y-12">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold text-center">¿Cuál es tu stack tecnológico?</h2>
                    <p className="text-sm text-secondary-muted font-medium">Ayuda a la IA a identificar riesgos específicos de tu arquitectura.</p>
                  </div>
                  
                  <div className="space-y-8">
                     {[
                       { cat: 'frontend', label: 'Frontend', options: ['React', 'Next.js', 'Angular', 'Vue', 'React Native', 'Flutter', 'Swift', 'Kotlin'] },
                       { cat: 'backend', label: 'Backend', options: ['Node.js', 'Go', 'Python', 'Java', 'PHP / Laravel', 'PostgreSQL', 'Redis', 'Microservicios'] },
                       { cat: 'cicd', label: 'CI/CD & Cloud', options: ['Azure', 'AWS', 'Vercel', 'Jenkins', 'GitHub Actions', 'Terraform', 'Kubernetes'] },
                     ].map((group) => (
                       <div key={group.cat} className="space-y-3">
                          <p className="text-[10px] font-semibold uppercase text-muted tracking-widest">{group.label}</p>
                          <div className="flex flex-wrap gap-2">
                             {group.options.map(opt => (
                               <button 
                                 key={opt}
                                 onClick={() => {
                                   const exists = formData.stack[group.cat].includes(opt)
                                   const updated = exists ? formData.stack[group.cat].filter((s: string) => s !== opt) : [...formData.stack[group.cat], opt]
                                   setFormData({ ...formData, stack: { ...formData.stack, [group.cat]: updated } })
                                 }}
                                 className={cn(
                                   "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                                   formData.stack[group.cat].includes(opt) ? "bg-primary/10 border-primary text-primary" : "border-border text-secondary-muted hover:border-primary/50"
                                 )}
                               >
                                 {opt}
                               </button>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {/* STEP 3: PROBLEM */}
              {currentStep === 3 && (
                <div className="space-y-10">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">¿Cuál es tu "dolor" principal hoy?</h2>
                    <p className="text-sm text-secondary-muted font-medium text-center">Selecciona hasta 3 síntomas críticos.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'regresion', label: 'Regresión: Bugs que regresan', icon: Zap },
                      { id: 'scale', label: 'Escalabilidad: La app se cae o se alenta', icon: Activity },
                      { id: 'delivery', label: 'Lentitud: El release tarda semanas', icon: Clock },
                      { id: 'confidence', label: 'Miedo: No confiamos en lo que desplegamos', icon: ShieldCheck },
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => {
                          const exists = formData.sintomas.includes(item.id)
                          if (!exists && formData.sintomas.length >= 3) return
                          setFormData({ ...formData, sintomas: exists ? formData.sintomas.filter((t: string) => t !== item.id) : [...formData.sintomas, item.id] })
                        }}
                        className={cn(
                          "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left",
                          formData.sintomas.includes(item.id) ? "border-primary bg-primary/5 text-primary" : "border-border text-muted hover:border-foreground hover:text-foreground"
                        )}
                      >
                        <item.icon className="w-6 h-6 flex-shrink-0" />
                        <span className="text-sm font-bold leading-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-border space-y-2">
                     <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">¿Algún otro contexto que deba saber?</p>
                     <textarea 
                        rows={3}
                        value={formData.contexto}
                        onChange={e => setFormData({...formData, contexto: e.target.value})}
                        className="w-full bg-background-alt border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        placeholder="Ej: Tenemos un lanzamiento el próximo mes y no tenemos QA directo..."
                     />
                  </div>
                </div>
              )}

              {/* STEP 4: FINAL */}
              {currentStep === 4 && (
                <div className="space-y-10">
                   <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">¡Todo listo! ¿A dónde envío tu diagnóstico?</h2>
                    <p className="text-sm text-secondary-muted font-medium">Carlos generará un reporte detallado para tu proyecto.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Tu nombre</label>
                          <input 
                            required
                            type="text" 
                            value={formData.nombre} 
                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                            className="w-full bg-background-alt border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Email profesional</label>
                          <input 
                            required
                            type="email" 
                            value={formData.email} 
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-background-alt border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Empresa (Opcional)</label>
                          <input 
                            type="text" 
                            value={formData.empresa} 
                            onChange={e => setFormData({...formData, empresa: e.target.value})}
                            className="w-full bg-background-alt border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Tu rol</label>
                          <input 
                            type="text" 
                            value={formData.rol} 
                            onChange={e => setFormData({...formData, rol: e.target.value})}
                            className="w-full bg-background-alt border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                     </div>
                     
                     <div className="pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                           <input type="checkbox" required className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20" />
                           <span className="text-xs text-muted font-medium group-hover:text-foreground transition-colors">Acepto el procesamiento de mis datos para la generación del diagnóstico QA.</span>
                        </label>
                     </div>

                     <button 
                        type="submit"
                        disabled={!canGoNext()}
                        className="w-full bg-primary text-white py-5 rounded-2xl text-lg font-semibold uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
                     >
                        Generar Diagnóstico Asistido <ChevronRight className="w-6 h-6" />
                     </button>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Navigation */}
          {currentStep < 4 && (
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-all disabled:opacity-0"
              >
                <ChevronLeft className="w-4 h-4" /> Volver
              </button>
              <button 
                onClick={handleNext}
                disabled={!canGoNext()}
                className="bg-foreground text-white px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-30 flex items-center gap-2"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        </div>
      </section>
    </main>
  )
}

function ProcessingState() {
  const [activeStep, setActiveStep] = useState(0)
  
  const steps = [
    "Analizando sintomatología...",
    "Correlacionando Tech Stack con riesgos...",
    "Simulando carga y escalabilidad...",
    "Generando recomendaciones estratégicas...",
    "Firmando reporte final..."
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s < steps.length - 1 ? s + 1 : s))
    }, 700)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
       <div className="max-w-md w-full space-y-12">
          <div className="text-center space-y-4">
             <div className="w-20 h-20 bg-[#f5f5f7] border border-black/[0.06] rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-[#1d1d1f] animate-spin" />
             </div>
             <h2 className="text-[24px] font-bold text-[#1d1d1f] tracking-[-0.02em]">Analizando tu proyecto...</h2>
             <p className="text-[15px] text-[#6f6f77]">La IA está procesando tu arquitectura.</p>
          </div>
          
          <div className="space-y-4">
             {steps.map((s, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center flex-shrink-0 shadow-sm",
                    i < activeStep ? "bg-[#34c759] text-white ring-2 ring-white" : 
                    i === activeStep ? "bg-white border-2 border-[#1d1d1f]" : 
                    "bg-white border-2 border-black/[0.1] text-transparent"
                  )}>
                     {i < activeStep ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i === activeStep ? <div className="w-2 h-2 bg-[#1d1d1f] rounded-full animate-pulse" /> : null}
                  </div>
                  <span className={cn(
                    "text-[14px] font-medium transition-colors",
                    i <= activeStep ? "text-[#1d1d1f]" : "text-[#6f6f77]"
                  )}>{s}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  )
}

function ResultsState({ data, userData }: { data: any, userData: any }) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
       setScore(s => (s < data.score ? s + 1 : s))
    }, 20)
    return () => clearInterval(timer)
  }, [data.score])

  return (
    <main className="min-h-screen bg-[#f5f5f7] pt-28 pb-20">
       <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Action */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[24px] border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
             <div className="flex items-center gap-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="54" fill="none" stroke="#f5f5f7" strokeWidth="6" />
                      <circle 
                        cx="64" cy="64" r="54" fill="none" stroke="#1d1d1f" strokeWidth="6" 
                        strokeDasharray="339" 
                        strokeLinecap="round"
                        style={{ strokeDashoffset: 339 - (score / 100) * 339 }}
                        className="transition-all duration-500 ease-out"
                      />
                   </svg>
                   <span className="absolute text-[32px] font-bold text-[#1d1d1f] tracking-tight">{score}%</span>
                </div>
                <div className="space-y-1.5">
                   <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f6f77]">Diagnóstico Final</p>
                   <h2 className="text-[28px] font-bold text-[#1d1d1f] tracking-tight">{data.scoreLabel}</h2>
                   <p className="text-[13px] font-medium text-[#6f6f77]">Industria: {data.industryAvg}</p>
                </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a 
                  href={`/api/diagnostico/pdf/${data.pdfId}`}
                  target="_blank"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-[#1d1d1f] text-white rounded-full font-semibold text-[14px] hover:bg-[#000000] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all"
                >
                  <Download className="w-4 h-4" /> PDF Report
                </a>
                <Link 
                  href="/contacto"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 border border-black/[0.13] text-[#1d1d1f] rounded-full font-semibold text-[14px] hover:bg-[#f5f5f7] transition-all"
                >
                  <Mail className="w-4 h-4" /> Agendar revisión
                </Link>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* Left:                 <section className="space-y-5">
                   <h3 className="text-[20px] font-bold flex items-center gap-3 text-[#1d1d1f] tracking-tight">
                      <ShieldCheck className="w-6 h-6 text-[#1d1d1f]" /> Resumen Ejecutivo
                   </h3>
                   <div className="bg-white p-8 rounded-[24px] border border-black/[0.06] text-[15px] leading-relaxed text-[#6f6f77] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      {data.resumen}
                   </div>
                </section>

                <section className="space-y-5">
                   <h3 className="text-[20px] font-bold flex items-center gap-3 text-[#1d1d1f] tracking-tight">
                      <Target className="w-6 h-6 text-[#ff3b30]" /> Riesgos Prioritarios
                   </h3>
                   <div className="space-y-4">
                      {data.riesgos.map((r: any, i: number) => (
                        <div key={i} className="flex items-start gap-5 bg-white p-6 rounded-[20px] border border-black/[0.06] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all group">
                           <div className={cn(
                             "w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 font-bold text-[11px]",
                             r.severidad === 'Crítica' || r.severidad === 'ALTA' ? "bg-[#ff3b30]/10 text-[#ff3b30]" : "bg-[#1d1d1f]/10 text-[#1d1d1f]"
                           )}>
                              {r.severidad.substring(0, 4)}
                           </div>
                           <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                 <h4 className="text-[17px] font-semibold text-[#1d1d1f]">{r.titulo}</h4>
                                 <span className="text-[9px] font-bold uppercase text-[#6f6f77] tracking-[0.1em] border border-black/[0.1] px-2 py-0.5 rounded-full">{r.modulo}</span>
                              </div>
                              <p className="text-[14px] text-[#6f6f77] leading-relaxed">{r.descripcion}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>                      ))}
                   </div>
                </section>
             </div>

             {/* Right: Plan & Recommendation */}
             <div className="space-y-12">
                <section className="space-y-5">
                   <h3 className="text-[20px] font-bold flex items-center gap-3 text-[#1d1d1f] tracking-tight">
                      <PieChart className="w-6 h-6 text-[#1d1d1f]" /> Plan de Acción
                   </h3>
                   <div className="bg-white p-8 rounded-[24px] border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-7">
                      {data.planDeAccion.map((p: any, i: number) => (
                        <div key={i} className="relative flex gap-5 group">
                            <div className="absolute left-[3px] top-6 bottom-[-28px] w-[2px] bg-[#f5f5f7] rounded-full group-last:hidden" />
                            <div className="w-2 h-2 bg-[#1d1d1f] rounded-full mt-2 relative z-10 flex-shrink-0 ring-4 ring-white" />
                            <div className="space-y-1 mb-2">
                               <span className="text-[10px] font-bold uppercase text-[#1d1d1f] tracking-[0.1em]">{p.periodo}</span>
                               <p className="font-semibold text-[15px] text-[#1d1d1f] tracking-[-0.01em]">{p.hito}</p>
                               <p className="text-[13px] text-[#6f6f77] leading-relaxed">{p.descripcion}</p>
                            </div>
                        </div>
                      ))}
                   </div>
                </section>

                <section className="bg-gradient-to-br from-[#1d1d1f] to-[#0051b3] rounded-[24px] text-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] space-y-6 relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5" />
                   <div className="relative z-10 space-y-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                         <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/80">Paquete Recomendado</p>
                         <h4 className="text-[28px] font-bold tracking-tight leading-tight">{data.paqueteRecomendado}</h4>
                      </div>
                      <p className="text-[14px] text-white/90 leading-relaxed font-medium">
                         Diseñado para reducir tu deuda técnica en un 60% en los primeros 3 meses.
                      </p>
                      <Link href="/contacto" className="block w-full bg-white text-[#1d1d1f] py-3.5 rounded-full font-semibold text-center text-[14px] hover:bg-[#f5f5f7] transition-all">
                        Más detalles del servicio
                      </Link>
                   </div>
                </section>
             </div>

          </div>
       </div>
    </main>
  )
}
