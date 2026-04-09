import Link from 'next/link'
import { Download, Mail, MapPin } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import { PublicProfile } from '@/lib/content/public-content'

export function ProfileHero({ profile }: { profile: PublicProfile }) {
  const bannerStyle =
    profile.banner_tipo === 'imagen' && profile.banner_url
      ? {
          backgroundImage: `url(${profile.banner_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          backgroundImage: `linear-gradient(135deg, ${profile.banner_color_inicio}, ${profile.banner_color_fin})`,
        }

  return (
    <section className="admin-card overflow-visible rounded-[36px]">
      <div className="relative">
        <div className="h-[180px] rounded-t-[36px]" style={bannerStyle} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/75 to-transparent" />
      </div>

      <div className="relative px-6 pb-8 md:px-10">
        <div className="-mt-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="relative h-[140px] w-[140px] md:h-[160px] md:w-[160px] overflow-hidden rounded-full border-[4px] border-white bg-background shadow-[0_24px_60px_rgba(15,23,42,0.18)] ring-4 ring-primary/10">
              {profile.foto_url ? (
                <img
                  src={profile.foto_url}
                  alt={profile.nombre_mostrado}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-5xl font-black text-primary">
                  CC
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-[28px]">
                  {profile.nombre_mostrado}
                </h1>
                <p className="text-sm text-secondary-muted">{profile.nombre_completo}</p>
                <p className="max-w-3xl text-lg font-medium leading-relaxed text-foreground">
                  {profile.headline}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-secondary-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {profile.ubicacion}
                  </span>
                  <span className="rounded-full bg-background-alt px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {profile.disponibilidad_texto}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.roles.map((role) => (
                  <span
                    key={role.label}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{
                      borderColor: `${role.color}40`,
                      color: role.color,
                      backgroundColor: `${role.color}10`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: role.color }}
                    />
                    {role.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.modalidades_trabajo.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a href={`mailto:${profile.email_contacto}`} className="admin-btn-outline h-11 w-11 p-0" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="admin-btn-outline h-11 w-11 p-0" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="admin-btn-outline h-11 w-11 p-0" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.twitter_url} target="_blank" rel="noreferrer" className="admin-btn-outline h-11 w-11 p-0" aria-label="X">
              <X className="h-4 w-4" />
            </a>
            <Link href={profile.cv_url} className="admin-btn-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
              <Download className="mr-2 h-4 w-4" />
              Descargar CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
