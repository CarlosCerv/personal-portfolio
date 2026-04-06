'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Check, 
  Loader2, 
  Send,
  MessageSquare,
  MapPin,
  Briefcase
} from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
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
    <main className="min-h-screen bg-background-alt pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Abstract Background Element */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
           
           {/* Info Side */}
           <motion.div {...fadeInUp} className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Contacto</span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-foreground">Hablemos.</h1>
                <p className="text-xl text-secondary-muted max-w-sm leading-relaxed">
                  Cuéntame sobre tu proyecto o desafío de ingeniería. Respondo en menos de 24 horas.
                </p>
              </div>

              <div className="space-y-6">
                 {[
                   { icon: Mail, label: 'Email', val: 'carlos.cervart@icloud.com', href: 'mailto:carlos.cervart@icloud.com' },
                   { icon: Linkedin, label: 'LinkedIn', val: 'carlos-eduardo-cervantes-arteaga', href: '#' },
                   { icon: Github, label: 'GitHub', val: 'CarlosCerv', href: '#' },
                   { icon: X, label: 'X / Twitter', val: '@CarlosCerv', href: '#' },
                 ].map((c) => (
                   <a 
                     key={c.label} 
                     href={c.href}
                     className="flex items-center gap-6 p-6 bg-white border border-border rounded-3xl group hover:shadow-xl hover:-translate-y-1 transition-all"
                   >
                     <div className="w-12 h-12 bg-background-alt rounded-2xl flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                        <c.icon className="w-6 h-6" />
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted">{c.label}</p>
                        <p className="font-bold text-sm tracking-tight">{c.val}</p>
                     </div>
                   </a>
                 ))}
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl w-fit">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Disponible para nuevos proyectos</span>
              </div>
           </motion.div>

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
