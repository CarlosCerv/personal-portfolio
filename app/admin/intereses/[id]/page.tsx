'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

function splitCsv(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function AdminInteresEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/admin/intereses/${id}`, { cache: 'no-store' })
        const json = await res.json()
        if (!res.ok) {
          setError(json?.error || 'No fue posible cargar el interés.')
          setLoading(false)
          return
        }

        const i = json?.interest || {}
        setTitle(String(i.title || ''))
        setSlug(String(i.slug || ''))
        setSubtitle(String(i.subtitle || ''))
        setIcon(String(i.icon || '✨'))
        setBackgroundImage(String(i.background_image || ''))
        setDescription(String(i.description || ''))
        setWhy(String(i.why || ''))
        setExperience(String(i.experience || ''))
        setStarted(String(i.started || ''))
        setFrequency(String(i.frequency || ''))
        setLevel(String(i.level || 'Intermedio'))
        setSortOrder(String(i.sort_order ?? 0))
        setVisible(Boolean(i.visible))
        setHighlights(Array.isArray(i.highlights) ? i.highlights.join(', ') : '')
        setGoals(Array.isArray(i.goals) ? i.goals.join(', ') : '')
        setEquipment(Array.isArray(i.equipment) ? i.equipment.join(', ') : '')
        setResources(Array.isArray(i.resources) ? i.resources.join(', ') : '')
      } catch {
        setError('No fue posible cargar el interés. Verifica tu conexión e intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    setSaving(true)
    setError(null)

    try {
      const payload = {
        title,
        slug,
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

      const res = await fetch(`/api/admin/intereses/${id}`, {
        method: 'PATCH',
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

  async function onDelete() {
    if (!id) return
    const confirmed = window.confirm('¿Seguro que quieres eliminar este interés? Esta acción no se puede deshacer.')
    if (!confirmed) return
    setSaving(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/intereses/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) {
        setSaving(false)
        setError(json?.error || 'No fue posible eliminar el interés.')
        return
      }
      router.push('/admin/intereses')
    } catch {
      setSaving(false)
      setError('No fue posible eliminar el interés. Verifica tu conexión e intenta de nuevo.')
    }
  }

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Intereses</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Editar interés
        </h1>
      </header>

      <section className="surface-panel p-7 md:p-8">
        {loading ? (
          <p className="text-[14px] text-[#5c5d63]">Cargando…</p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div>
                <label className="eyebrow block">Título</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" required />
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
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
              <button type="button" className="btn-base w-full justify-center border border-red-500/25 bg-red-500/6 text-red-700 hover:bg-red-500/10" onClick={() => void onDelete()} disabled={saving}>
                {saving ? 'Procesando…' : 'Eliminar interés'}
              </button>
              <button type="button" className="btn-base btn-secondary w-full justify-center" onClick={() => router.push('/admin/intereses')}>
                Volver
              </button>
            </aside>
          </form>
        )}
      </section>
    </div>
  )
}
