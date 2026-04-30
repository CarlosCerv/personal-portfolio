'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type InterestRow = {
  id: string
  title?: string
  slug?: string
  visible?: boolean
  sort_order?: number
  updated_at?: string
}

export default function AdminInteresesPage() {
  const [loading, setLoading] = useState(true)
  const [bootstrapping, setBootstrapping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [items, setItems] = useState<InterestRow[]>([])
  const [query, setQuery] = useState('')

  async function load() {
    setLoading(true)
    setError(null)
    setOk(null)
    try {
      const res = await fetch('/api/admin/intereses', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'No fue posible cargar intereses.')
        setItems([])
        setLoading(false)
        return
      }
      setItems(Array.isArray(json?.interests) ? json.interests : [])
      setLoading(false)
    } catch {
      setError('No fue posible cargar intereses. Verifica tu conexión e intenta de nuevo.')
      setItems([])
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => {
      const title = String(item.title || '').toLowerCase()
      const slug = String(item.slug || '').toLowerCase()
      return title.includes(q) || slug.includes(q)
    })
  }, [items, query])

  async function bootstrapDefaults() {
    setBootstrapping(true)
    setError(null)
    setOk(null)
    try {
      const res = await fetch('/api/admin/intereses/bootstrap', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setBootstrapping(false)
        setError(json?.error || 'No fue posible inicializar intereses base.')
        return
      }
      if (json?.skipped) {
        setOk('La tabla ya tenía datos; no se insertaron duplicados.')
      } else {
        setOk(`Intereses base insertados: ${json?.inserted ?? 0}.`)
      }
      await load()
      setBootstrapping(false)
    } catch {
      setBootstrapping(false)
      setError('No fue posible inicializar intereses base.')
    }
  }

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Intereses</span>
            <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
              Contenido de intereses
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
              Administra los intereses que aparecen en `/intereses` y su detalle público.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/intereses/nuevo" className="btn-base btn-primary px-6 py-2.5 text-[0.9rem]">
              Nuevo interés
            </Link>
            <button type="button" className="btn-base btn-secondary px-6 py-2.5 text-[0.9rem]" onClick={() => void bootstrapDefaults()} disabled={bootstrapping}>
              {bootstrapping ? 'Inicializando…' : 'Inicializar base'}
            </button>
            <button type="button" className="btn-base btn-secondary px-6 py-2.5 text-[0.9rem]" onClick={() => void load()}>
              Recargar
            </button>
          </div>
        </div>
      </header>

      <section className="surface-panel p-7 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Búsqueda</p>
            <p className="mt-2 text-[14px] text-[#5c5d63]">Filtra por título o slug.</p>
          </div>
          <div className="w-full md:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="admin-input rounded-[14px] border border-black/[0.08] bg-[#fafafa]"
              placeholder="Buscar…"
            />
          </div>
        </div>

        <div className="mt-6">
          {ok ? (
            <div className="mb-4 rounded-[16px] border border-green-500/20 bg-green-500/5 px-4 py-3 text-[14px] text-[#111113]">
              {ok}
            </div>
          ) : null}
          {loading ? (
            <p className="text-[14px] text-[#5c5d63]">Cargando…</p>
          ) : error ? (
            <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] text-[#111113]">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-[14px] text-[#5c5d63]">No hay resultados.</p>
          ) : (
            <div className="divide-y divide-black/[0.06]">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/intereses/${item.id}`}
                  className="block py-5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-[#111113]">{item.title || 'Sin título'}</p>
                      <p className="mt-1 truncate text-[13px] text-[#8a8b92]">{item.slug || 'sin-slug'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c5d63]">
                        {item.visible ? 'visible' : 'oculto'}
                      </span>
                      <span className="text-[12px] text-[#8a8b92]">orden {item.sort_order ?? 0}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
