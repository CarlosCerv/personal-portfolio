'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function splitCsv(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function AdminInteresNuevoPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [icon, setIcon] = useState('✨')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [description, setDescription] = useState('')
  const [why, setWhy] = useState('')
  const [experience, setExperience] = useState('')
  const [started, setStarted] = useState('')
  const [frequency, setFrequency] = useState('')
  const [level, setLevel] = useState('Intermedio')
  const [sortOrder, setSortOrder] = useState('0')
  const [visible, setVisible] = useState(true)
  const [highlights, setHighlights] = useState('')
  const [goals, setGoals] = useState('')
  const [equipment, setEquipment] = useState('')
  const [resources, setResources] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        title,
        slug: slug || slugify(title),
        subtitle,
        icon,
        background_image: backgroundImage,
        description,
        why,
        experience,
        started,
        frequency,
        level,
        sort_order: Number(sortOrder || 0),
        visible,
        highlights: splitCsv(highlights),
        goals: splitCsv(goals),
        equipment: splitCsv(equipment),
        resources: splitCsv(resources),
      }

      const res = await fetch('/api/admin/intereses', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        setSaving(false)
        setError(json?.error || 'No fue posible guardar el interés.')
        return
      }

      router.push('/admin/intereses')
    } catch {
      setSaving(false)
      setError('No fue posible guardar el interés. Verifica tu conexión e intenta de nuevo.')
    }
  }

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Intereses</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Nuevo interés
        </h1>
      </header>

      <section className="surface-panel p-7 md:p-8">
        <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div>
              <label className="eyebrow block">Título</label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(slugify(e.target.value)) }} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" required />
            </div>
            <div>
              <label className="eyebrow block">Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Subtítulo</label>
              <textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Por qué me apasiona</label>
              <textarea value={why} onChange={(e) => setWhy(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Experiencia</label>
              <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="surface-card p-6">
              <p className="eyebrow">Configuración</p>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="eyebrow block">Icono</label>
                    <input value={icon} onChange={(e) => setIcon(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Orden</label>
                    <input value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                </div>
                <div>
                  <label className="eyebrow block">Imagen de fondo URL</label>
                  <input value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="eyebrow block">Desde</label>
                    <input value={started} onChange={(e) => setStarted(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Frecuencia</label>
                    <input value={frequency} onChange={(e) => setFrequency(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Nivel</label>
                    <input value={level} onChange={(e) => setLevel(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-[14px] text-[#111113]">
                  <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                  Visible en sitio público
                </label>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="eyebrow">Listas (CSV)</p>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="eyebrow block">Destacados</label>
                  <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
                <div>
                  <label className="eyebrow block">Objetivos</label>
                  <textarea value={goals} onChange={(e) => setGoals(e.target.value)} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
                <div>
                  <label className="eyebrow block">Equipo</label>
                  <textarea value={equipment} onChange={(e) => setEquipment(e.target.value)} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
                <div>
                  <label className="eyebrow block">Recursos</label>
                  <textarea value={resources} onChange={(e) => setResources(e.target.value)} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] text-[#111113]">
                {error}
              </div>
            ) : null}

            <button type="submit" className="btn-base btn-primary w-full justify-center" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" className="btn-base btn-secondary w-full justify-center" onClick={() => router.push('/admin/intereses')}>
              Cancelar
            </button>
          </aside>
        </form>
      </section>
    </div>
  )
}
