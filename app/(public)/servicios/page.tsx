'use client'

import React, { useState, useEffect, useRef } from 'react'
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
    <main className="min-h-screen bg-background-alt pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Wizard Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-xs font-black uppercase tracking-widest text-primary">QA Diagnostic Wizard</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Diagnóstico de Calidad Asistido por IA.</h1>
          
          <div className="pt-10 space-y-6">
             <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-muted mb-2">
                <span>{STEPS[currentStep]}</span>
                <span>Paso {currentStep + 1} de 5</span>
             </div>
             <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                  className="h-full bg-primary" 
                />
             </div>
             <div className="flex justify-between items-center gap-2">
                {STEPS.map((_, i) => (
                  <div key={i} className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center text-[10px] font-bold",
                    i < currentStep ? "bg-primary border-primary text-white" : i === currentStep ? "border-primary text-primary" : "border-border text-muted"
                  )}>
                    {i < currentStep ? <Check className="w-2.5 h-2.5" /> : null}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="admin-card p-8 md:p-12 shadow-2xl relative bg-white overflow-hidden">
          
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
                    <h2 className="text-2xl font-black">¿Qué tipo de aplicación estás construyendo?</h2>
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
                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: SCALE */}
              {currentStep === 1 && (
                <div className="space-y-12">
                   <div className="space-y-8">
                      <h2 className="text-2xl font-black text-center">¿Cuál es tu escala actual de usuarios?</h2>
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
                        <h2 className="text-2xl font-black text-center">¿Cuál es tu pico esperado de concurrencia?</h2>
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
                    <h2 className="text-2xl font-black text-center">¿Cuál es tu stack tecnológico?</h2>
                    <p className="text-sm text-secondary-muted font-medium">Ayuda a la IA a identificar riesgos específicos de tu arquitectura.</p>
                  </div>
                  
                  <div className="space-y-8">
                     {[
                       { cat: 'frontend', label: 'Frontend', options: ['React', 'Next.js', 'Angular', 'Vue', 'React Native', 'Flutter', 'Swift', 'Kotlin'] },
                       { cat: 'backend', label: 'Backend', options: ['Node.js', 'Go', 'Python', 'Java', 'PHP / Laravel', 'PostgreSQL', 'Redis', 'Microservicios'] },
                       { cat: 'cicd', label: 'CI/CD & Cloud', options: ['Azure', 'AWS', 'Vercel', 'Jenkins', 'GitHub Actions', 'Terraform', 'Kubernetes'] },
                     ].map((group) => (
                       <div key={group.cat} className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-muted tracking-widest">{group.label}</p>
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
                    <h2 className="text-2xl font-black">¿Cuál es tu "dolor" principal hoy?</h2>
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
                     <p className="text-xs font-black uppercase tracking-widest text-muted">¿Algún otro contexto que deba saber?</p>
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
                    <h2 className="text-2xl font-black">¡Todo listo! ¿A dónde envío tu diagnóstico?</h2>
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
                        className="w-full bg-primary text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
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
                className="bg-foreground text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-30 flex items-center gap-2"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
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
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
             </div>
             <h2 className="text-2xl font-black">Claude 3.5 Sonnet está analizando tu proyecto...</h2>
             <p className="text-sm text-secondary-muted font-medium">Esto tomará unos segundos.</p>
          </div>
          
          <div className="space-y-4">
             {steps.map((s, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    i < activeStep ? "bg-green-500 border-green-500 text-white" : i === activeStep ? "border-primary text-primary" : "border-border"
                  )}>
                     {i < activeStep ? <Check className="w-3 h-3" /> : i === activeStep ? <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" /> : null}
                  </div>
                  <span className={cn(
                    "text-sm font-bold",
                    i <= activeStep ? "text-foreground" : "text-muted"
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
    <main className="min-h-screen bg-background-alt pt-32 pb-20">
       <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          {/* Header Action */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[32px] border border-border shadow-xl">
             <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="54" fill="none" stroke="#f5f5f7" strokeWidth="8" />
                      <circle 
                        cx="64" cy="64" r="54" fill="none" stroke="#0071e3" strokeWidth="8" 
                        strokeDasharray="339" 
                        style={{ strokeDashoffset: 339 - (score / 100) * 339 }}
                        className="transition-all duration-500"
                      />
                   </svg>
                   <span className="absolute text-3xl font-black">{score}%</span>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted">Diagnóstico Final</p>
                   <h2 className="text-3xl font-black text-foreground">{data.scoreLabel}</h2>
                   <p className="text-sm font-bold text-muted italic">Industria: {data.industryAvg}</p>
                </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href={`/api/diagnostico/pdf/${data.pdfId}`}
                  target="_blank"
                  className="admin-btn-primary py-4 px-8 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" /> Descargar PDF
                </a>
                <Link 
                  href="/contacto"
                  className="admin-btn-outline py-4 px-8 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Agendar revisión
                </Link>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* Left: Summary & Risks */}
             <div className="lg:col-span-2 space-y-12">
                <section className="space-y-6">
                   <h3 className="text-2xl font-black flex items-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-primary" /> Resumen Ejecutivo
                   </h3>
                   <div className="bg-white p-8 rounded-[32px] border border-border text-lg leading-relaxed text-secondary-muted shadow-sm">
                      {data.resumen}
                   </div>
                </section>

                <section className="space-y-8">
                   <h3 className="text-2xl font-black flex items-center gap-3">
                      <Target className="w-8 h-8 text-red-500" /> Riesgos de Alta Prioridad
                   </h3>
                   <div className="grid grid-cols-1 gap-6">
                      {data.riesgos.map((r: any, i: number) => (
                        <div key={i} className="flex items-start gap-6 bg-white p-8 rounded-[32px] border border-border hover:shadow-lg transition-all group">
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-xs",
                             r.severidad === 'Crítica' || r.severidad === 'ALTA' ? "bg-red-50 text-red-500" : "bg-primary/5 text-primary"
                           )}>
                              {r.severidad.substring(0, 4)}
                           </div>
                           <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                 <h4 className="text-xl font-bold">{r.titulo}</h4>
                                 <span className="text-[10px] font-black uppercase text-muted tracking-widest">{r.modulo}</span>
                              </div>
                              <p className="text-secondary-muted leading-relaxed">{r.descripcion}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>
             </div>

             {/* Right: Plan & Recommendation */}
             <div className="space-y-12">
                <section className="space-y-6">
                   <h3 className="text-2xl font-black flex items-center gap-3">
                      <PieChart className="w-8 h-8 text-primary" /> Plan de Acción
                   </h3>
                   <div className="admin-card p-8 space-y-8">
                      {data.planDeAccion.map((p: any, i: number) => (
                        <div key={i} className="relative flex gap-6 group">
                            <div className="absolute left-[3px] top-6 bottom-0 w-0.5 bg-border -ml-px group-last:hidden" />
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 relative z-10 flex-shrink-0" />
                            <div className="space-y-1">
                               <span className="text-[10px] font-black uppercase text-primary tracking-widest">{p.periodo}</span>
                               <p className="font-bold text-sm tracking-tight">{p.hito}</p>
                               <p className="text-xs text-secondary-muted leading-relaxed">{p.descripcion}</p>
                            </div>
                        </div>
                      ))}
                   </div>
                </section>

                <section className="p-1 bg-gradient-to-br from-primary to-blue-600 rounded-[32px] text-white overflow-hidden shadow-2xl">
                   <div className="bg-primary/20 backdrop-blur-xl p-8 space-y-6">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                         <Zap className="w-6 h-6 fill-white" />
                      </div>
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Paquete Recomendado</p>
                         <h4 className="text-3xl font-black tracking-tight leading-none">{data.paqueteRecomendado}</h4>
                      </div>
                      <p className="text-sm font-semibold opacity-90 leading-relaxed">
                         Diseñado para reducir tu deuda técnica en un 60% en los primeros 3 meses.
                      </p>
                      <button className="w-full bg-white text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-background-alt transition-all">Más detalles del servicio</button>
                   </div>
                </section>
             </div>

          </div>
       </div>
    </main>
  )
}
