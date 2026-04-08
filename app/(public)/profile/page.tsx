import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { DEFAULT_PUBLIC_PROFILE } from '@/lib/content/public-content'
import { MapPin, Briefcase, Award, Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'

export default async function PublicProfile() {
  const supabase = await createClient()
  const dbProfile = supabase
    ? (await supabase.from('site_profile').select('*').single()).data
    : null

  const profile = dbProfile
    ? {
        ...DEFAULT_PUBLIC_PROFILE,
        ...dbProfile,
        roles: dbProfile.roles?.length ? dbProfile.roles : DEFAULT_PUBLIC_PROFILE.roles,
        skills: Object.keys(dbProfile.skills || {}).length ? dbProfile.skills : DEFAULT_PUBLIC_PROFILE.skills,
        experiencia: dbProfile.experiencia?.length ? dbProfile.experiencia : DEFAULT_PUBLIC_PROFILE.experiencia,
        certificaciones: dbProfile.certificaciones?.length
          ? dbProfile.certificaciones
          : DEFAULT_PUBLIC_PROFILE.certificaciones,
        bio_1: dbProfile.bio_1 || DEFAULT_PUBLIC_PROFILE.bio_1,
        bio_2: dbProfile.bio_2 || DEFAULT_PUBLIC_PROFILE.bio_2,
        foto_url: dbProfile.foto_url || DEFAULT_PUBLIC_PROFILE.foto_url,
      }
    : DEFAULT_PUBLIC_PROFILE

  return (
    <main className="min-h-screen bg-background-alt pt-32 pb-20">
      <div className="mx-auto max-w-4xl space-y-20 px-6">
        <section className="flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:text-left">
          <div className="h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-white bg-border shadow-2xl">
            {profile.foto_url ? (
              <img src={profile.foto_url} alt={profile.nombre} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                CC
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-foreground">{profile.nombre}</h1>
              <p className="mt-2 text-xl font-medium text-secondary-muted">
                {profile.titulo} en <span className="text-primary">{profile.empresa}</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-secondary-muted md:justify-start">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {profile.ubicacion}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />{' '}
                {profile.disponible ? 'Disponible para proyectos' : 'Enfocado en proyectos actuales'}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {(profile.roles || []).map((role: { label: string; color: string }, i: number) => (
                <span
                  key={i}
                  className="rounded-full border px-3 py-1 text-xs font-bold"
                  style={{ borderColor: `${role.color}40`, color: role.color, backgroundColor: `${role.color}10` }}
                >
                  {role.label}
                </span>
              ))}
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-secondary-muted">{profile.bio_1}</p>
            {profile.bio_2 ? (
              <p className="max-w-2xl text-base leading-relaxed text-secondary-muted">{profile.bio_2}</p>
            ) : null}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight">Stack técnico</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(profile.skills || {}).map(([category, skills]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill, idx) => (
                    <span key={idx} className="rounded-lg border border-border bg-white px-3 py-1 text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black tracking-tight">Experiencia profesional</h2>
          <div className="relative ml-4 space-y-16 border-l-2 border-border pl-8">
            {(profile.experiencia || []).map(
              (
                ex: {
                  periodo: string
                  rol: string
                  empresa: string
                  descripcion: string
                  tags: string[]
                },
                idx: number
              ) => (
              <div key={idx} className="group relative">
                <div className="absolute -left-[41px] top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background-alt">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{ex.periodo}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{ex.rol}</h3>
                    <p className="text-base font-semibold text-secondary-muted">{ex.empresa}</p>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-secondary-muted">{ex.descripcion}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(ex.tags || []).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="rounded border border-border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-border bg-white p-10">
          <div className="space-y-2 text-center">
            <Award className="mx-auto h-10 w-10 text-primary" />
            <h2 className="text-3xl font-black tracking-tight">Certificaciones & Logros</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(profile.certificaciones || []).map(
              (cert: { nombre: string; institucion: string }, i: number) => (
              <div key={i} className="space-y-3 rounded-2xl border border-border p-6 text-center transition-all hover:shadow-xl">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background-alt">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-sm font-bold">{cert.nombre}</h4>
                <p className="text-xs font-bold uppercase text-muted">{cert.institucion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10 pt-20 text-center">
          <p className="text-xl font-medium text-secondary-muted">¿Tienes un proyecto en mente? Hablemos.</p>
          <div className="flex justify-center gap-8">
            <a href="mailto:carlos.cervart@icloud.com" className="text-secondary transition-colors hover:text-primary">
              <Mail className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/carlos-eduardo-cervantes-arteaga" target="_blank" rel="noreferrer" className="text-secondary transition-colors hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://x.com/CarlosCerv" target="_blank" rel="noreferrer" className="text-secondary transition-colors hover:text-primary">
              <X className="h-6 w-6" />
            </a>
            <a href="https://github.com/CarlosCerv" target="_blank" rel="noreferrer" className="text-secondary transition-colors hover:text-primary">
              <Github className="h-6 w-6" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
