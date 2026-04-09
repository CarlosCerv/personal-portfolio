'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  DEFAULT_PUBLIC_PROFILE,
  ProfileCertification,
  ProfileEducation,
  ProfileExperience,
  ProfileIdioma,
  ProfileProject,
  ProfileRecommendation,
  ProfileRole,
  ProfileStat,
  PublicProfile,
} from '@/lib/content/profile-schema'
import {
  Check,
  FileImage,
  GraduationCap,
  Languages,
  LayoutTemplate,
  Loader2,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
} from 'lucide-react'

type UploadKind =
  | 'foto_url'
  | 'banner_url'
  | `experiencia.${number}.logo_url`
  | `educacion.${number}.logo_url`
  | `certificaciones.${number}.logo_url`
  | `recomendaciones.${number}.foto_url`

function SectionShell({
  title,
  description,
  children,
  defaultOpen = false,
}: {
  title: string
  description: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details open={defaultOpen} className="admin-card rounded-[28px] p-6">
      <summary className="cursor-pointer list-none">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{title}</h2>
          <p className="text-sm leading-relaxed text-secondary-muted">{description}</p>
        </div>
      </summary>
      <div className="mt-6 space-y-6">{children}</div>
    </details>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      {children}
    </label>
  )
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`admin-input h-11 ${props.className || ''}`} />
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`admin-input min-h-[110px] py-3 ${props.className || ''}`} />
}

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [profile, setProfile] = useState<PublicProfile>(DEFAULT_PUBLIC_PROFILE)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/admin/profile', { cache: 'no-store' })
        if (!response.ok) throw new Error('load failed')
        const data = await response.json()
        setProfile(data.profile || DEFAULT_PUBLIC_PROFILE)
      } catch {
        setProfile(DEFAULT_PUBLIC_PROFILE)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (!response.ok) throw new Error('save failed')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  const uploadAsset = async (file: File, path: string) => {
    if (!supabase) throw new Error('Supabase no configurado')

    const extension = file.name.split('.').pop() || 'png'
    const filePath = `${path}-${Date.now()}.${extension}`
    const { error } = await supabase.storage.from('profile-assets').upload(filePath, file, {
      upsert: true,
    })

    if (error) throw error
    const { data } = supabase.storage.from('profile-assets').getPublicUrl(filePath)
    return data.publicUrl
  }

  const onUpload = async (kind: UploadKind, file?: File | null) => {
    if (!file) return
    setUploading(kind)

    try {
      const url = await uploadAsset(file, kind.replace(/\./g, '-'))

      if (kind === 'foto_url' || kind === 'banner_url') {
        setProfile((prev) => ({ ...prev, [kind]: url }))
      } else if (kind.startsWith('experiencia.')) {
        const index = Number(kind.split('.')[1])
        setProfile((prev) => ({
          ...prev,
          experiencia: prev.experiencia.map((item, idx) =>
            idx === index ? { ...item, logo_url: url } : item
          ),
        }))
      } else if (kind.startsWith('educacion.')) {
        const index = Number(kind.split('.')[1])
        setProfile((prev) => ({
          ...prev,
          educacion: prev.educacion.map((item, idx) =>
            idx === index ? { ...item, logo_url: url } : item
          ),
        }))
      } else if (kind.startsWith('certificaciones.')) {
        const index = Number(kind.split('.')[1])
        setProfile((prev) => ({
          ...prev,
          certificaciones: prev.certificaciones.map((item, idx) =>
            idx === index ? { ...item, logo_url: url } : item
          ),
        }))
      } else if (kind.startsWith('recomendaciones.')) {
        const index = Number(kind.split('.')[1])
        setProfile((prev) => ({
          ...prev,
          recomendaciones: prev.recomendaciones.map((item, idx) =>
            idx === index ? { ...item, foto_url: url } : item
          ),
        }))
      }
    } finally {
      setUploading(null)
    }
  }

  const addStat = () =>
    setProfile((prev) => ({
      ...prev,
      stats: [...prev.stats, { numero: '0', label: 'Nueva métrica' }],
    }))

  const addRole = () =>
    setProfile((prev) => ({
      ...prev,
      roles: [...prev.roles, { label: 'Nuevo rol', color: '#0071e3' }],
    }))

  const addIdioma = () =>
    setProfile((prev) => ({
      ...prev,
      idiomas: [...prev.idiomas, { nombre: '', bandera: '🌐', nivel: '' }],
    }))

  const addEducacion = () =>
    setProfile((prev) => ({
      ...prev,
      educacion: [
        ...prev.educacion,
        {
          institucion: '',
          logo_url: '',
          carrera: '',
          periodo_inicio: '',
          periodo_fin: '',
          descripcion: '',
        },
      ],
    }))

  const addExperiencia = () =>
    setProfile((prev) => ({
      ...prev,
      experiencia: [
        ...prev.experiencia,
        {
          id: crypto.randomUUID(),
          cargo: '',
          empresa: '',
          logo_url: '',
          periodo_inicio: '',
          periodo_fin: '',
          tipo: '',
          descripcion: '',
          bullets: [''],
          skills: [''],
        },
      ],
    }))

  const addProyecto = () =>
    setProfile((prev) => ({
      ...prev,
      proyectos: [
        ...prev.proyectos,
        {
          nombre: '',
          empresa_anonima: '',
          periodo: '',
          metricas: '',
          descripcion: '',
          stack: [''],
          visible: true,
        },
      ],
    }))

  const addCertificacion = () =>
    setProfile((prev) => ({
      ...prev,
      certificaciones: [
        ...prev.certificaciones,
        {
          nombre: '',
          institucion: '',
          anio: '',
          url_verificacion: '',
          credential_id: '',
          logo_url: '',
        },
      ],
    }))

  const addRecommendation = () =>
    setProfile((prev) => ({
      ...prev,
      recomendaciones: [
        ...prev.recomendaciones,
        {
          nombre: '',
          cargo: '',
          empresa: '',
          foto_url: '',
          texto: '',
          visible: true,
        },
      ],
    }))

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="sticky top-[72px] z-20 flex flex-col gap-4 rounded-[28px] border border-border bg-white/92 px-6 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">Perfil profesional completo</h1>
          <p className="mt-1 text-sm text-secondary-muted">
            Edita identidad, trayectoria, proyectos, certificaciones y secciones visuales del perfil público.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {success ? (
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <Check className="h-4 w-4" />
              Cambios publicados
            </div>
          ) : null}
          <button onClick={handleSave} className="admin-btn-primary px-6 py-3 text-sm font-semibold" disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publicar todos los cambios
          </button>
        </div>
      </div>

      <SectionShell
        title="Identidad y contacto"
        description="Nombre público, identidad extendida, contacto visible, disponibilidad, foto y banner."
        defaultOpen
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre mostrado">
            <TextInput value={profile.nombre_mostrado} onChange={(e) => setProfile({ ...profile, nombre_mostrado: e.target.value, nombre: e.target.value })} />
          </Field>
          <Field label="Nombre completo">
            <TextInput value={profile.nombre_completo} onChange={(e) => setProfile({ ...profile, nombre_completo: e.target.value })} />
          </Field>
          <Field label="Headline">
            <TextInput value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value, titulo: e.target.value })} />
          </Field>
          <Field label="Empresa actual">
            <TextInput value={profile.empresa_actual} onChange={(e) => setProfile({ ...profile, empresa_actual: e.target.value, empresa: e.target.value })} />
          </Field>
          <Field label="Ubicación">
            <TextInput value={profile.ubicacion} onChange={(e) => setProfile({ ...profile, ubicacion: e.target.value })} />
          </Field>
          <Field label="Disponibilidad">
            <TextInput value={profile.disponibilidad_texto} onChange={(e) => setProfile({ ...profile, disponibilidad_texto: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput value={profile.email_contacto} onChange={(e) => setProfile({ ...profile, email_contacto: e.target.value })} />
          </Field>
          <Field label="LinkedIn">
            <TextInput value={profile.linkedin_url} onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })} />
          </Field>
          <Field label="GitHub">
            <TextInput value={profile.github_url} onChange={(e) => setProfile({ ...profile, github_url: e.target.value })} />
          </Field>
          <Field label="Twitter / X">
            <TextInput value={profile.twitter_url} onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })} />
          </Field>
          <Field label="CV URL">
            <TextInput value={profile.cv_url} onChange={(e) => setProfile({ ...profile, cv_url: e.target.value })} />
          </Field>
          <Field label="Disponible">
            <label className="flex h-11 items-center gap-3 rounded-2xl border border-border bg-white px-4">
              <input
                type="checkbox"
                checked={profile.disponible}
                onChange={(e) => setProfile({ ...profile, disponible: e.target.checked })}
                className="accent-primary"
              />
              <span className="text-sm font-medium text-foreground">Mostrar como disponible para consultoría</span>
            </label>
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Modalidades de trabajo">
            <TextInput
              value={profile.modalidades_trabajo.join(' · ')}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  modalidades_trabajo: e.target.value
                    .split('·')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <Field label="Foto URL">
            <div className="space-y-3">
              <TextInput value={profile.foto_url} onChange={(e) => setProfile({ ...profile, foto_url: e.target.value })} />
              <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                <FileImage className="mr-2 h-4 w-4" />
                {uploading === 'foto_url' ? 'Subiendo...' : 'Subir foto'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload('foto_url', e.target.files?.[0])} />
              </label>
            </div>
          </Field>
          <Field label="Tipo de banner">
            <select
              value={profile.banner_tipo}
              onChange={(e) => setProfile({ ...profile, banner_tipo: e.target.value as 'imagen' | 'gradiente' })}
              className="admin-input h-11"
            >
              <option value="gradiente">Gradiente</option>
              <option value="imagen">Imagen</option>
            </select>
          </Field>
          <Field label="Banner URL">
            <div className="space-y-3">
              <TextInput value={profile.banner_url} onChange={(e) => setProfile({ ...profile, banner_url: e.target.value })} />
              <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                <FileImage className="mr-2 h-4 w-4" />
                {uploading === 'banner_url' ? 'Subiendo...' : 'Subir banner'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload('banner_url', e.target.files?.[0])} />
              </label>
            </div>
          </Field>
          <Field label="Color inicial">
            <TextInput value={profile.banner_color_inicio} onChange={(e) => setProfile({ ...profile, banner_color_inicio: e.target.value })} />
          </Field>
          <Field label="Color final">
            <TextInput value={profile.banner_color_fin} onChange={(e) => setProfile({ ...profile, banner_color_fin: e.target.value })} />
          </Field>
        </div>
      </SectionShell>

      <SectionShell title="Bio" description="Tres párrafos independientes para la sección Sobre mí.">
        <div className="grid gap-5">
          <Field label="Párrafo 1">
            <TextArea value={profile.bio_1} onChange={(e) => setProfile({ ...profile, bio_1: e.target.value })} />
          </Field>
          <Field label="Párrafo 2">
            <TextArea value={profile.bio_2} onChange={(e) => setProfile({ ...profile, bio_2: e.target.value })} />
          </Field>
          <Field label="Párrafo 3">
            <TextArea value={profile.bio_3} onChange={(e) => setProfile({ ...profile, bio_3: e.target.value })} />
          </Field>
        </div>
      </SectionShell>

      <SectionShell title="Estadísticas y roles" description="Métricas de impacto y chips de especialidad visibles en el hero.">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Estadísticas</h3>
            <button onClick={addStat} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <Plus className="mr-2 h-4 w-4" />
              Agregar métrica
            </button>
          </div>
          {profile.stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="grid gap-4 rounded-[24px] border border-border bg-background p-4 md:grid-cols-[0.4fr_1fr_auto]">
              <TextInput
                value={stat.numero}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    stats: profile.stats.map((item, idx) =>
                      idx === index ? { ...item, numero: e.target.value } : item
                    ),
                  })
                }
              />
              <TextInput
                value={stat.label}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    stats: profile.stats.map((item, idx) =>
                      idx === index ? { ...item, label: e.target.value } : item
                    ),
                  })
                }
              />
              <button
                onClick={() =>
                  setProfile({
                    ...profile,
                    stats: profile.stats.filter((_, idx) => idx !== index),
                  })
                }
                className="admin-btn-outline h-11 w-11 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Roles / especialidades</h3>
            <button onClick={addRole} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <Plus className="mr-2 h-4 w-4" />
              Agregar rol
            </button>
          </div>
          {profile.roles.map((role, index) => (
            <div key={`${role.label}-${index}`} className="grid gap-4 rounded-[24px] border border-border bg-background p-4 md:grid-cols-[1fr_180px_auto]">
              <TextInput
                value={role.label}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    roles: profile.roles.map((item, idx) =>
                      idx === index ? { ...item, label: e.target.value } : item
                    ),
                  })
                }
              />
              <TextInput
                value={role.color}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    roles: profile.roles.map((item, idx) =>
                      idx === index ? { ...item, color: e.target.value } : item
                    ),
                  })
                }
              />
              <button
                onClick={() =>
                  setProfile({
                    ...profile,
                    roles: profile.roles.filter((_, idx) => idx !== index),
                  })
                }
                className="admin-btn-outline h-11 w-11 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Idiomas y skills" description="Idiomas del perfil y mapa técnico por categorías.">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Idiomas</h3>
            <button onClick={addIdioma} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <Plus className="mr-2 h-4 w-4" />
              Agregar idioma
            </button>
          </div>
          {profile.idiomas.map((idioma, index) => (
            <div key={`${idioma.nombre}-${index}`} className="grid gap-4 rounded-[24px] border border-border bg-background p-4 md:grid-cols-[0.4fr_0.7fr_1fr_auto]">
              <TextInput value={idioma.bandera} onChange={(e) => setProfile({ ...profile, idiomas: profile.idiomas.map((item, idx) => idx === index ? { ...item, bandera: e.target.value } : item) })} />
              <TextInput value={idioma.nombre} onChange={(e) => setProfile({ ...profile, idiomas: profile.idiomas.map((item, idx) => idx === index ? { ...item, nombre: e.target.value } : item) })} />
              <TextInput value={idioma.nivel} onChange={(e) => setProfile({ ...profile, idiomas: profile.idiomas.map((item, idx) => idx === index ? { ...item, nivel: e.target.value } : item) })} />
              <button onClick={() => setProfile({ ...profile, idiomas: profile.idiomas.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-11 w-11 p-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(profile.skills).map(([category, items]) => (
            <div key={category} className="rounded-[24px] border border-border bg-background p-4">
              <Field label={category}>
                <TextArea
                  rows={4}
                  value={items.join(', ')}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: {
                        ...profile.skills,
                        [category]: e.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                      },
                    })
                  }
                />
              </Field>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Experiencia profesional" description="Timeline profesional completa con logros cuantificados y stack por rol.">
        <div className="flex justify-end">
          <button onClick={addExperiencia} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
            <Plus className="mr-2 h-4 w-4" />
            Agregar experiencia
          </button>
        </div>
        {profile.experiencia.map((item, index) => (
          <div key={item.id} className="rounded-[26px] border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">{item.cargo || `Rol ${index + 1}`}</p>
              <button onClick={() => setProfile({ ...profile, experiencia: profile.experiencia.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-10 w-10 p-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Cargo"><TextInput value={item.cargo} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, cargo: e.target.value } : row) })} /></Field>
              <Field label="Empresa"><TextInput value={item.empresa} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, empresa: e.target.value } : row) })} /></Field>
              <Field label="Periodo inicio"><TextInput value={item.periodo_inicio} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, periodo_inicio: e.target.value } : row) })} /></Field>
              <Field label="Periodo fin"><TextInput value={item.periodo_fin} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, periodo_fin: e.target.value } : row) })} /></Field>
              <Field label="Tipo"><TextInput value={item.tipo} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, tipo: e.target.value } : row) })} /></Field>
              <Field label="Logo URL">
                <div className="space-y-3">
                  <TextInput value={item.logo_url} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, logo_url: e.target.value } : row) })} />
                  <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                    <FileImage className="mr-2 h-4 w-4" />
                    {uploading === `experiencia.${index}.logo_url` ? 'Subiendo...' : 'Subir logo'}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(`experiencia.${index}.logo_url`, e.target.files?.[0])} />
                  </label>
                </div>
              </Field>
            </div>
            <div className="mt-4 grid gap-4">
              <Field label="Descripción">
                <TextArea value={item.descripcion} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, descripcion: e.target.value } : row) })} />
              </Field>
              <Field label="Bullets de logros (uno por línea)">
                <TextArea value={item.bullets.join('\n')} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, bullets: e.target.value.split('\n').map((bullet) => bullet.trim()).filter(Boolean) } : row) })} />
              </Field>
              <Field label="Skills (separadas por coma)">
                <TextArea value={item.skills.join(', ')} onChange={(e) => setProfile({ ...profile, experiencia: profile.experiencia.map((row, idx) => idx === index ? { ...row, skills: e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean) } : row) })} />
              </Field>
            </div>
          </div>
        ))}
      </SectionShell>

      <SectionShell title="Proyectos notables" description="Casos destacados con métricas visibles, descripción y stack.">
        <div className="flex justify-end">
          <button onClick={addProyecto} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
            <Plus className="mr-2 h-4 w-4" />
            Agregar proyecto
          </button>
        </div>
        {profile.proyectos.map((item, index) => (
          <div key={`${item.nombre}-${index}`} className="rounded-[26px] border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">{item.nombre || `Proyecto ${index + 1}`}</p>
              <button onClick={() => setProfile({ ...profile, proyectos: profile.proyectos.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-10 w-10 p-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nombre"><TextInput value={item.nombre} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, nombre: e.target.value } : row) })} /></Field>
              <Field label="Empresa anónima"><TextInput value={item.empresa_anonima} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, empresa_anonima: e.target.value } : row) })} /></Field>
              <Field label="Periodo"><TextInput value={item.periodo} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, periodo: e.target.value } : row) })} /></Field>
              <Field label="Métricas"><TextInput value={item.metricas} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, metricas: e.target.value } : row) })} /></Field>
            </div>
            <div className="mt-4 grid gap-4">
              <Field label="Descripción"><TextArea value={item.descripcion} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, descripcion: e.target.value } : row) })} /></Field>
              <Field label="Stack (separado por coma)"><TextArea value={item.stack.join(', ')} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, stack: e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean) } : row) })} /></Field>
              <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
                <input type="checkbox" checked={item.visible} onChange={(e) => setProfile({ ...profile, proyectos: profile.proyectos.map((row, idx) => idx === index ? { ...row, visible: e.target.checked } : row) })} className="accent-primary" />
                <span className="text-sm font-medium text-foreground">Visible en el perfil</span>
              </label>
            </div>
          </div>
        ))}
      </SectionShell>

      <SectionShell title="Educación y certificaciones" description="Formación académica y credenciales verificables.">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><GraduationCap className="h-4 w-4 text-primary" /> Educación</div>
            <button onClick={addEducacion} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"><Plus className="mr-2 h-4 w-4" />Agregar educación</button>
          </div>
          {profile.educacion.map((item, index) => (
            <div key={`${item.institucion}-${index}`} className="rounded-[26px] border border-border bg-background p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{item.carrera || `Educación ${index + 1}`}</p>
                <button onClick={() => setProfile({ ...profile, educacion: profile.educacion.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Institución"><TextInput value={item.institucion} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, institucion: e.target.value } : row) })} /></Field>
                <Field label="Carrera"><TextInput value={item.carrera} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, carrera: e.target.value } : row) })} /></Field>
                <Field label="Periodo inicio"><TextInput value={item.periodo_inicio} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, periodo_inicio: e.target.value } : row) })} /></Field>
                <Field label="Periodo fin"><TextInput value={item.periodo_fin} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, periodo_fin: e.target.value } : row) })} /></Field>
                <Field label="Logo URL">
                  <div className="space-y-3">
                    <TextInput value={item.logo_url} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, logo_url: e.target.value } : row) })} />
                    <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                      <FileImage className="mr-2 h-4 w-4" />
                      {uploading === `educacion.${index}.logo_url` ? 'Subiendo...' : 'Subir logo'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(`educacion.${index}.logo_url`, e.target.files?.[0])} />
                    </label>
                  </div>
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Descripción"><TextArea value={item.descripcion} onChange={(e) => setProfile({ ...profile, educacion: profile.educacion.map((row, idx) => idx === index ? { ...row, descripcion: e.target.value } : row) })} /></Field>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Certificaciones</div>
            <button onClick={addCertificacion} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"><Plus className="mr-2 h-4 w-4" />Agregar certificación</button>
          </div>
          {profile.certificaciones.map((item, index) => (
            <div key={`${item.nombre}-${index}`} className="rounded-[26px] border border-border bg-background p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{item.nombre || `Certificación ${index + 1}`}</p>
                <button onClick={() => setProfile({ ...profile, certificaciones: profile.certificaciones.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nombre"><TextInput value={item.nombre} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, nombre: e.target.value } : row) })} /></Field>
                <Field label="Institución"><TextInput value={item.institucion} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, institucion: e.target.value } : row) })} /></Field>
                <Field label="Año"><TextInput value={item.anio} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, anio: e.target.value } : row) })} /></Field>
                <Field label="Credential ID"><TextInput value={item.credential_id} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, credential_id: e.target.value } : row) })} /></Field>
                <Field label="URL de verificación"><TextInput value={item.url_verificacion} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, url_verificacion: e.target.value } : row) })} /></Field>
                <Field label="Logo URL">
                  <div className="space-y-3">
                    <TextInput value={item.logo_url} onChange={(e) => setProfile({ ...profile, certificaciones: profile.certificaciones.map((row, idx) => idx === index ? { ...row, logo_url: e.target.value } : row) })} />
                    <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                      <FileImage className="mr-2 h-4 w-4" />
                      {uploading === `certificaciones.${index}.logo_url` ? 'Subiendo...' : 'Subir logo'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(`certificaciones.${index}.logo_url`, e.target.files?.[0])} />
                    </label>
                  </div>
                </Field>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Recomendaciones y publicaciones" description="Controla testimonios visibles y si el perfil debe mostrar artículos recientes del blog.">
        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
            <input type="checkbox" checked={profile.mostrar_publicaciones} onChange={(e) => setProfile({ ...profile, mostrar_publicaciones: e.target.checked })} className="accent-primary" />
            <span className="text-sm font-medium text-foreground">Mostrar publicaciones recientes del blog en el perfil</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button onClick={addRecommendation} className="admin-btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
            <Plus className="mr-2 h-4 w-4" />
            Agregar recomendación
          </button>
        </div>
        {profile.recomendaciones.map((item, index) => (
          <div key={`${item.nombre}-${index}`} className="rounded-[26px] border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">{item.nombre || `Recomendación ${index + 1}`}</p>
              <button onClick={() => setProfile({ ...profile, recomendaciones: profile.recomendaciones.filter((_, idx) => idx !== index) })} className="admin-btn-outline h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nombre"><TextInput value={item.nombre} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, nombre: e.target.value } : row) })} /></Field>
              <Field label="Cargo"><TextInput value={item.cargo} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, cargo: e.target.value } : row) })} /></Field>
              <Field label="Empresa"><TextInput value={item.empresa} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, empresa: e.target.value } : row) })} /></Field>
              <Field label="Foto URL">
                <div className="space-y-3">
                  <TextInput value={item.foto_url} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, foto_url: e.target.value } : row) })} />
                  <label className="admin-btn-outline w-fit cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                    <FileImage className="mr-2 h-4 w-4" />
                    {uploading === `recomendaciones.${index}.foto_url` ? 'Subiendo...' : 'Subir foto'}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(`recomendaciones.${index}.foto_url`, e.target.files?.[0])} />
                  </label>
                </div>
              </Field>
            </div>
            <div className="mt-4 space-y-4">
              <Field label="Texto del testimonio"><TextArea value={item.texto} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, texto: e.target.value } : row) })} /></Field>
              <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
                <input type="checkbox" checked={item.visible} onChange={(e) => setProfile({ ...profile, recomendaciones: profile.recomendaciones.map((row, idx) => idx === index ? { ...row, visible: e.target.checked } : row) })} className="accent-primary" />
                <span className="text-sm font-medium text-foreground">Visible en el perfil</span>
              </label>
            </div>
          </div>
        ))}
      </SectionShell>

      <SectionShell title="Configuración visual" description="Opciones rápidas para revisar la capa visual del perfil.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-border bg-background p-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-background-alt text-primary">
              <LayoutTemplate className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">Banner</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary-muted">
              Compatible con gradiente o imagen cargada a `profile-assets`.
            </p>
          </div>
          <div className="rounded-[24px] border border-border bg-background p-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-background-alt text-primary">
              <Languages className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">Compatibilidad LinkedIn-like</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary-muted">
              El orden del perfil ya sigue una estructura similar a LinkedIn Premium, pero con un look editorial propio.
            </p>
          </div>
          <div className="rounded-[24px] border border-border bg-background p-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-background-alt text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">Publicación</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary-muted">
              Al guardar, el backend hace `revalidatePath('/profile')` para refrescar el sitio público.
            </p>
          </div>
        </div>
      </SectionShell>
    </div>
  )
}
