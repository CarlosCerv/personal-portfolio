'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type BlogRow = {
  id: string
  titulo?: string
  slug?: string
  estado?: string
  updated_at?: string
  published_at?: string
  imagen_portada?: string | null
  tags?: string[] | null
}

export default function AdminBlogPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogRow[]>([])
  const [query, setQuery] = useState('')

  async function load() {
    setLoading(true)
    setError(null)
    const res = await fetch('/api/admin/blog', { cache: 'no-store' })
    const json = await res.json()
    if (!res.ok) {
      setError(json?.error || 'No fue posible cargar posts.')
      setPosts([])
      setLoading(false)
      return
    }
    setPosts(Array.isArray(json?.posts) ? json.posts : [])
    setLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter((p) => {
      const t = String(p.titulo || '').toLowerCase()
      const s = String(p.slug || '').toLowerCase()
      const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : ''
      return t.includes(q) || s.includes(q) || tags.includes(q)
    })
  }, [posts, query])

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Blog</span>
            <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
              Content
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
              Create, edit and publish articles. If a post has no image, the site uses an automatic cover.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog/nuevo" className="btn-base btn-primary px-6 py-2.5 text-[0.9rem]">
              New post
            </Link>
            <button type="button" className="btn-base btn-secondary px-6 py-2.5 text-[0.9rem]" onClick={() => void load()}>
              Reload
            </button>
          </div>
        </div>
      </header>

      <section className="surface-panel p-7 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Search</p>
            <p className="mt-2 text-[14px] text-[#5c5d63]">Filter by title, slug or tags.</p>
          </div>
          <div className="w-full md:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="admin-input rounded-[14px] border border-black/[0.08] bg-[#fafafa]"
              placeholder="Search…"
            />
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="text-[14px] text-[#5c5d63]">Loading…</p>
          ) : error ? (
            <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] text-[#111113]">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-[14px] text-[#5c5d63]">No results found.</p>
          ) : (
            <div className="divide-y divide-black/[0.06]">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  className="block py-5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-[#111113]">{post.titulo || 'No title'}</p>
                      <p className="mt-1 truncate text-[13px] text-[#8a8b92]">{post.slug || 'no-slug'}</p>
                      {Array.isArray(post.tags) && post.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.tags.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold text-[#5c5d63]">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c5d63]">
                        {post.estado || 'no status'}
                      </span>
                      <span className="text-[12px] text-[#8a8b92]">
                        {post.updated_at ? new Date(post.updated_at).toLocaleDateString() : ''}
                      </span>
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

