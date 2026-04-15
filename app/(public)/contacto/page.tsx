'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Check,
  Loader2,
  Send,
  ArrowRight,
} from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }
}

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    val: 'carlos.cervart@icloud.com',
    href: 'mailto:carlos.cervart@icloud.com',
    color: '#1d1d1f',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    val: 'carlos-eduardo-cervantes-arteaga',
    href: 'https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga',
    color: '#0a66c2',
  },
  {
    icon: Github,
    label: 'GitHub',
    val: 'CarlosCerv',
    href: 'https://github.com/CarlosCerv',
    color: '#1d1d1f',
  },
  {
    icon: X,
    label: 'X / Twitter',
    val: '@CarlosCerv',
    href: 'https://x.com/CarlosCerv',
    color: '#1d1d1f',
  },
]

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
    } catch {
      alert('Error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      {/* Hero strip */}
      <div className="page-band pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="space-y-3">
            <span className="section-badge">Contacto</span>
            <h1
              className="font-bold text-[#1d1d1f] leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}
            >
              Hablemos sobre tu proyecto.
            </h1>
            <p className="text-[17px] text-[#6f6f77] leading-relaxed max-w-xl">
              Cuéntame sobre tu desafío de QA o performance. Respondo en menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">

          {/* ─── Info Side ─── */}
          <motion.div {...fadeInUp} className="space-y-10">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 rounded-[14px] border border-[#34c759]/20 bg-[#f0fdf4] px-4 py-2.5">
              <span className="status-dot-green" />
              <span className="text-[13px] font-semibold text-[#1d1d1f]">
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group surface-card flex items-center gap-4 rounded-[18px] p-4 transition-all duration-200 hover:border-black/[0.12]"
                >
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: `${c.color}12` }}
                  >
                    <c.icon className="w-5 h-5 transition-colors duration-200" style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f6f77]">{c.label}</p>
                    <p className="text-[13px] font-semibold text-[#1d1d1f] truncate">{c.val}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#c7c7cc] group-hover:text-[#1d1d1f] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* Response commitment */}
            <div className="surface-card-soft space-y-3 rounded-[18px] p-5">
              <h3 className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-[0.06em]">
                ¿Qué esperar después?
              </h3>
              {[
                "Respuesta en menos de 24 horas",
                "Sesión de 30 min gratuita para entender tu proyecto",
                "Propuesta clara con entregables definidos",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#1d1d1f]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#1d1d1f]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] text-[#6f6f77]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Form Side ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.15 }}
            className="surface-panel overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 p-8 md:p-10"
                >
                  <div>
                    <h2 className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                      Envíame un mensaje
                    </h2>
                    <p className="text-[13px] text-[#6f6f77] mt-1">
                      Todos los campos marcados con * son obligatorios.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="eyebrow text-[#8a8b92]">
                        Nombre *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                        className="admin-input rounded-[14px] bg-[#fafafa] px-3.5 py-2.5 text-[14px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="eyebrow text-[#8a8b92]">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="admin-input rounded-[14px] bg-[#fafafa] px-3.5 py-2.5 text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="eyebrow text-[#8a8b92]">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={formData.empresa}
                      onChange={e => setFormData({ ...formData, empresa: e.target.value })}
                      className="admin-input rounded-[14px] bg-[#fafafa] px-3.5 py-2.5 text-[14px]"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="eyebrow text-[#8a8b92]">
                      Servicio de interés *
                    </label>
                    <select
                      required
                      value={formData.servicio}
                      onChange={e => setFormData({ ...formData, servicio: e.target.value })}
                      className="admin-input rounded-[14px] bg-[#fafafa] px-3.5 py-2.5 text-[14px] appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="Diagnóstico QA">Diagnóstico QA</option>
                      <option value="Automatización">Automatización E2E</option>
                      <option value="Performance">Performance Engineering</option>
                      <option value="Consultoría">Consultoría general</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="eyebrow text-[#8a8b92]">
                      ¿Qué necesitas? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Cuéntame sobre tu proyecto, el problema y el plazo..."
                      value={formData.descripcion}
                      onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                      className="admin-input min-h-[130px] rounded-[14px] bg-[#fafafa] px-3.5 py-3 text-[14px] resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1d1d1f] text-white py-3.5 rounded-full text-[14px] font-semibold tracking-[-0.005em] hover:bg-[#000000] hover:shadow-[0_6px_20px_rgba(0,0,0,0.32)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-10 flex flex-col items-center text-center gap-5"
                >
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-20 h-20 bg-[#34c759] rounded-[22px] flex items-center justify-center shadow-[0_8px_24px_rgba(52,199,89,0.35)]"
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-[22px] font-bold text-[#1d1d1f] tracking-[-0.02em]">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-[14px] text-[#6f6f77] max-w-sm">
                      Te responderé en menos de 24 horas. Revisa tu bandeja de entrada (y la carpeta de spam).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="flex-1 py-3 rounded-full border border-black/[0.13] text-[#1d1d1f] text-[13px] font-semibold hover:bg-[#f5f5f7] transition-all"
                    >
                      Enviar otra consulta
                    </button>
                    <Link
                      href="/"
                      className="flex-1 py-3 rounded-full bg-[#1d1d1f] text-white text-[13px] font-semibold text-center hover:bg-[#000000] transition-all"
                    >
                      Volver al inicio
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
