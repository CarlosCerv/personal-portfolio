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

export default function AdminBlogNewPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoria, setCategoria] = useState('QA')
  const [tags, setTags] = useState('')
  const [estado, setEstado] = useState<'borrador' | 'publicado'>('borrador')
  const [imagen_portada, setImagenPortada] = useState('')
  const [contenido, setContenido] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      titulo,
      slug: slug || slugify(titulo),
      excerpt,
      categoria,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      estado,
      imagen_portada: imagen_portada || null,
      contenido,
      autor: 'Carlos Cervantes',
      published_at: new Date().toISOString(),
    }

    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    if (!res.ok) {
      setSaving(false)
      setError(json?.error || 'No fue posible guardar el post.')
      return
    }

    router.push('/admin/blog')
  }

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Blog</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Nuevo post
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
          Si no subes imagen, el sitio usará una portada automática.
        </p>
      </header>

      <section className="surface-panel p-7 md:p-8">
        <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div>
              <label className="eyebrow block">Título</label>
              <input value={titulo} onChange={(e) => { setTitulo(e.target.value); if (!slug) setSlug(slugify(e.target.value)) }} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" required />
            </div>
            <div>
              <label className="eyebrow block">Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="admin-input mt-2 min-h-[110px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
            <div>
              <label className="eyebrow block">Contenido (HTML)</label>
              <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} className="admin-input mt-2 min-h-[280px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="surface-card p-6">
              <p className="eyebrow">Publicación</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="eyebrow block">Estado</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value as any)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]">
                    <option value="borrador">borrador</option>
                    <option value="publicado">publicado</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow block">Categoría</label>
                  <input value={categoria} onChange={(e) => setCategoria(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                </div>
                <div>
                  <label className="eyebrow block">Tags (comma separated)</label>
                  <input value={tags} onChange={(e) => setTags(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" placeholder="qa, automation, performance" />
                </div>
                <div>
                  <label className="eyebrow block">Imagen portada (URL)</label>
                  <input value={imagen_portada} onChange={(e) => setImagenPortada(e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" placeholder="https://..." />
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
            <button type="button" className="btn-base btn-secondary w-full justify-center" onClick={() => router.push('/admin/blog')}>
              Cancelar
            </button>
          </aside>
        </form>
      </section>
    </div>
  )
}

