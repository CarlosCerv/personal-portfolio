'use client'

import React, { useEffect, useMemo, useState } from 'react'

type ProfilePayload = Record<string, any>

function prettyJson(value: any) {
  try {
    return JSON.stringify(value ?? {}, null, 2)
  } catch {
    return '{}'
  }
}

export default function AdminPerfilPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [profile, setProfile] = useState<ProfilePayload>({})

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/profile', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'No fue posible cargar el perfil.')
        setLoading(false)
        return
      }
      setProfile(json?.profile || {})
      setLoading(false)
    })()
  }, [])

  const [statsJson, setStatsJson] = useState('[]')
  const [rolesJson, setRolesJson] = useState('[]')
  const [idiomasJson, setIdiomasJson] = useState('[]')

  useEffect(() => {
    setStatsJson(prettyJson(profile.stats ?? []))
    setRolesJson(prettyJson(profile.roles ?? []))
    setIdiomasJson(prettyJson(profile.idiomas ?? []))
  }, [profile])

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setOk(false)
    setError(null)

    let stats: any = []
    let roles: any = []
    let idiomas: any = []
    try { stats = JSON.parse(statsJson) } catch { stats = [] }
    try { roles = JSON.parse(rolesJson) } catch { roles = [] }
    try { idiomas = JSON.parse(idiomasJson) } catch { idiomas = [] }

    const payload = {
      ...profile,
      stats,
      roles,
      idiomas,
    }

    const res = await fetch('/api/admin/profile', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    if (!res.ok) {
      setSaving(false)
      setError(json?.error || 'No fue posible guardar el perfil.')
      return
    }
    setSaving(false)
    setOk(true)
  }

  const identity = useMemo(() => ({
    nombre_mostrado: profile.nombre_mostrado ?? profile.nombre ?? '',
    nombre_completo: profile.nombre_completo ?? '',
    headline: profile.headline ?? profile.titulo ?? '',
    empresa_actual: profile.empresa_actual ?? '',
    ubicacion: profile.ubicacion ?? '',
    email_contacto: profile.email_contacto ?? profile.email ?? '',
    linkedin_url: profile.linkedin_url ?? '',
    github_url: profile.github_url ?? '',
    twitter_url: profile.twitter_url ?? '',
    cv_url: profile.cv_url ?? '/Carlos_Cervantes_CV.pdf',
  }), [profile])

  function setIdentity<K extends keyof typeof identity>(key: K, value: string) {
    setProfile((p) => ({ ...p, [key]: value }))
  }

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <span className="eyebrow">Perfil</span>
        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
          Información pública
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
          Edita los datos del perfil. Al guardar, el sitio revalida la ruta `/profile`.
        </p>
      </header>

      <section className="surface-panel p-7 md:p-8">
        {loading ? (
          <p className="text-[14px] text-[#5c5d63]">Cargando…</p>
        ) : (
          <form onSubmit={onSave} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <div className="surface-card p-6">
                <p className="eyebrow">Identidad</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="eyebrow block">Nombre mostrado</label>
                    <input value={identity.nombre_mostrado} onChange={(e) => setIdentity('nombre_mostrado', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Nombre completo</label>
                    <input value={identity.nombre_completo} onChange={(e) => setIdentity('nombre_completo', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="eyebrow block">Headline</label>
                    <input value={identity.headline} onChange={(e) => setIdentity('headline', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Empresa actual</label>
                    <input value={identity.empresa_actual} onChange={(e) => setIdentity('empresa_actual', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Ubicación</label>
                    <input value={identity.ubicacion} onChange={(e) => setIdentity('ubicacion', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                </div>
              </div>

              <div className="surface-card p-6">
                <p className="eyebrow">Contacto</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="eyebrow block">Email</label>
                    <input value={identity.email_contacto} onChange={(e) => setIdentity('email_contacto', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">LinkedIn URL</label>
                    <input value={identity.linkedin_url} onChange={(e) => setIdentity('linkedin_url', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">GitHub URL</label>
                    <input value={identity.github_url} onChange={(e) => setIdentity('github_url', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Twitter/X URL</label>
                    <input value={identity.twitter_url} onChange={(e) => setIdentity('twitter_url', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">CV URL</label>
                    <input value={identity.cv_url} onChange={(e) => setIdentity('cv_url', e.target.value)} className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="surface-card p-6">
                <p className="eyebrow">Bio</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="eyebrow block">Bio 1</label>
                    <textarea value={profile.bio_1 ?? ''} onChange={(e) => setProfile((p) => ({ ...p, bio_1: e.target.value }))} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Bio 2</label>
                    <textarea value={profile.bio_2 ?? ''} onChange={(e) => setProfile((p) => ({ ...p, bio_2: e.target.value }))} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Bio 3</label>
                    <textarea value={profile.bio_3 ?? ''} onChange={(e) => setProfile((p) => ({ ...p, bio_3: e.target.value }))} className="admin-input mt-2 min-h-[90px] rounded-[14px] border border-black/[0.08] bg-[#fafafa]" />
                  </div>
                </div>
              </div>

              <div className="surface-card p-6">
                <p className="eyebrow">Secciones (JSON)</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5c5d63]">
                  Stats, roles e idiomas se editan como JSON para mantener flexibilidad.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="eyebrow block">Stats</label>
                    <textarea value={statsJson} onChange={(e) => setStatsJson(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa] font-mono text-[12px]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Roles</label>
                    <textarea value={rolesJson} onChange={(e) => setRolesJson(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa] font-mono text-[12px]" />
                  </div>
                  <div>
                    <label className="eyebrow block">Idiomas</label>
                    <textarea value={idiomasJson} onChange={(e) => setIdiomasJson(e.target.value)} className="admin-input mt-2 min-h-[120px] rounded-[14px] border border-black/[0.08] bg-[#fafafa] font-mono text-[12px]" />
                  </div>
                </div>
              </div>

              {error ? (
                <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] text-[#111113]">
                  {error}
                </div>
              ) : null}
              {ok ? (
                <div className="rounded-[16px] border border-green-500/20 bg-green-500/5 px-4 py-3 text-[14px] text-[#111113]">
                  Guardado.
                </div>
              ) : null}

              <button type="submit" className="btn-base btn-primary w-full justify-center" disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

