'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Check, 
  Loader2, 
  Send,
} from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
}

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    servicio: '',
    descripcion: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const resp = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!resp.ok) throw new Error('Error')
      
      setIsSuccess(true)
    } catch (err) {
      alert('Error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           
           {/* Info Side */}
           <motion.div {...fadeInUp} className="space-y-10">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-[0.1em]">
                  Contacto
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-[-0.03em] leading-tight">
                  Hablemos sobre tu proyecto.
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed max-w-sm">
                  Cuéntame sobre tu desafío de QA o performance. Respondo en menos de 24 horas.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                 {[
                   { icon: Mail, label: 'Email', val: 'carlos.cervart@icloud.com', href: 'mailto:carlos.cervart@icloud.com' },
                   { icon: Linkedin, label: 'LinkedIn', val: 'carlos-eduardo-cervantes-arteaga', href: 'https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga' },
                   { icon: Github, label: 'GitHub', val: 'CarlosCerv', href: 'https://github.com/CarlosCerv' },
                   { icon: X, label: 'X', val: '@CarlosCerv', href: 'https://x.com/CarlosCerv' },
                 ].map((c) => (
                   <a 
                     key={c.label} 
                     href={c.href}
                     target={c.href.startsWith('http') ? '_blank' : undefined}
                     rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                     className="flex items-center gap-4 p-4 bg-background-alt border border-divider rounded-[12px] group hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                   >
                     <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors flex-shrink-0">
                        <c.icon className="w-5 h-5" />
                     </div>
                     <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">{c.label}</p>
                        <p className="text-sm font-semibold text-text-primary truncate">{c.val}</p>
                     </div>
                   </a>
                 ))}
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-[10px]">
                 <div className="h-2 w-2 bg-accent-green rounded-full animate-pulse" />
                 <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-green">
                   Disponible para nuevos proyectos
                 </span>
              </div>
           </motion.div>

           {/* Form Side */}
           <motion.div 
             {...fadeInUp} 
             transition={{ delay: 0.2 }}
             className="rounded-[20px] border border-divider bg-white p-8 md:p-10 shadow-sm"
           >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                            Nombre *
                          </label>
                          <input 
                            required
                            type="text" 
                            placeholder="Tu nombre"
                            value={formData.nombre}
                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                            className="w-full rounded-[10px] border border-divider bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                            Email *
                          </label>
                          <input 
                            required
                            type="email" 
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full rounded-[10px] border border-divider bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                       </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                        Empresa (opcional)
                      </label>
                      <input 
                        type="text" 
                        placeholder="Nombre de tu empresa"
                        value={formData.empresa}
                        onChange={e => setFormData({...formData, empresa: e.target.value})}
                        className="w-full rounded-[10px] border border-divider bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                        Servicio de interés *
                      </label>
                      <select 
                        required
                        value={formData.servicio}
                        onChange={e => setFormData({...formData, servicio: e.target.value})}
                        className="w-full rounded-[10px] border border-divider bg-white px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="Diagnóstico QA">Diagnóstico QA</option>
                        <option value="Automatización">Automatización E2E</option>
                        <option value="Performance">Performance Engineering</option>
                        <option value="Consultoría">Consultoría general</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                        ¿Qué necesitas? *
                      </label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Cuéntame sobre tu proyecto, el problema y el plazo..."
                        value={formData.descripcion}
                        onChange={e => setFormData({...formData, descripcion: e.target.value})}
                        className="w-full rounded-[10px] border border-divider bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3.5 rounded-[10px] text-sm font-semibold uppercase tracking-[0.12em] hover:bg-primary-hover hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                     <div className="w-16 h-16 bg-accent-green rounded-[12px] flex items-center justify-center mx-auto text-white shadow-lg">
                        <Check className="w-8 h-8" />
                     </div>
                     <h3 className="text-lg font-semibold text-text-primary">
                       ¡Mensaje enviado!
                     </h3>
                     <p className="text-sm text-text-secondary">
                       Te responderé en menos de 24 horas. Revisa tu email (incluye spam).
                     </p>
                     <button
                       onClick={() => setIsSuccess(false)}
                       className="mt-6 px-6 py-2 rounded-[10px] border border-divider text-text-primary hover:bg-background-alt transition-all"
                     >
                       Enviar otra consulta
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
        </div>
      </div>
    </main>
  )

           {/* Form Side */}
           <motion.div 
             {...fadeInUp} 
             transition={{ delay: 0.2 }}
             className="admin-card p-1 shadow-22xl bg-white/50 backdrop-blur-xl border-white"
           >
              <div className="bg-white rounded-[40px] p-8 md:p-12 space-y-10 border border-border">
                 
                 <AnimatePresence mode="wait">
                   {!isSuccess ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Nombre *</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Tu nombre completo"
                              value={formData.nombre}
                              onChange={e => setFormData({...formData, nombre: e.target.value})}
                              className="admin-input py-4"
                            />
                         </div>
                         <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Email *</label>
                            <input 
                              required
                              type="email" 
                              placeholder="tu@email.com"
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="admin-input py-4"
                            />
                         </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Empresa</label>
                        <input 
                          type="text" 
                          placeholder="Nombre de tu empresa o proyecto"
                          value={formData.empresa}
                          onChange={e => setFormData({...formData, empresa: e.target.value})}
                          className="admin-input py-4"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Servicio de interés *</label>
                        <select 
                          required
                          value={formData.servicio}
                          onChange={e => setFormData({...formData, servicio: e.target.value})}
                          className="admin-input py-4 appearance-none"
                        >
                          <option value="" disabled>Selecciona un servicio</option>
                          <option value="Diagnóstico QA">Diagnóstico QA — $500 USD</option>
                          <option value="Automatización">Automatización E2E</option>
                          <option value="Performance Engineering">Performance Engineering</option>
                          <option value="Consultoría general">Consultoría general / Otro</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">¿Qué necesitas? *</label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Cuéntame sobre tu proyecto, el problema que quieres resolver y el plazo que tienes en mente."
                          value={formData.descripcion}
                          onChange={e => setFormData({...formData, descripcion: e.target.value})}
                          className="admin-input p-4 resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Enviar mensaje <Send className="w-5 h-5" /></>}
                      </button>
                    </motion.form>
                   ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center space-y-6"
                    >
                       <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl shadow-green-500/20">
                          <Check className="w-10 h-10" />
                       </div>
                       <div className="space-y-2">
                          <h2 className="text-3xl font-black">¡Mensaje enviado!</h2>
                          <p className="text-secondary-muted font-medium max-w-xs mx-auto">
                            Gracias por escribir, {formData.nombre}. Te responderé a <strong>{formData.email}</strong> en menos de 24 horas.
                          </p>
                       </div>
                       <Link href="/servicios" className="inline-flex py-4 px-8 border border-border rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-background-alt transition-all">Ver mis servicios</Link>
                    </motion.div>
                   )}
                 </AnimatePresence>

              </div>
           </motion.div>

        </div>
      </div>
    </main>
  )
}
