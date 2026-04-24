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
    <section className="surface-panel overflow-hidden">
      <div className="relative">
        <div className="h-[200px] md:h-[220px]" style={bannerStyle} />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="relative px-6 pb-10 md:px-12">
        <div className="-mt-24 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-8">
            {/* Avatar Profile */}
            <div className="relative h-[180px] w-[180px] md:h-[220px] md:w-[220px] flex-shrink-0 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] transition-transform duration-500 hover:scale-[1.02]">
              {profile.foto_url ? (
                <img
                  src={profile.foto_url}
                  alt={profile.nombre_mostrado}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e5e5ea] text-5xl font-bold text-[#1d1d1f]">
                  CC
                </div>
              )}
            </div>

            <div className="flex-1 space-y-6 pt-6 md:pt-20">
              <div className="space-y-3">
                <h1 className="text-[34px] leading-none tracking-[-0.05em] text-[#111113] md:text-[42px]">
                  {profile.nombre_mostrado}
                </h1>
                <p className="text-[14px] font-medium text-[#7a7b82]">{profile.nombre_completo}</p>
                <p className="max-w-2xl text-[18px] font-semibold leading-[1.3] tracking-[-0.03em] text-[#111113] md:text-[22px]">
                  {profile.headline}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6f6f77]">
                    <MapPin className="h-4 w-4" strokeWidth={2.5} />
                    {profile.ubicacion}
                  </span>
                  <span className="rounded-full bg-[#34c759]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#198f45]">
                    {profile.disponibilidad_texto}
                  </span>
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.roles.map((role) => (
                  <span
                    key={role.label}
                    className="mt-1 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold"
                    style={{
                      borderColor: `${role.color}30`,
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

              {/* Modalidades */}
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.modalidades_trabajo.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/[0.08] bg-[#fafafa] px-3 py-1.5 text-[12px] font-medium text-[#111113]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 md:pt-20 xl:min-w-[220px] xl:items-end">
            <div className="flex items-center gap-2">
              <a href={`mailto:${profile.email_contacto}`} className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] hover:bg-[#fafafa] transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] hover:bg-[#fafafa] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] hover:bg-[#fafafa] transition-colors" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.twitter_url} target="_blank" rel="noreferrer" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] hover:bg-[#fafafa] transition-colors" aria-label="X">
                <X className="h-4 w-4" />
              </a>
            </div>
            <Link href={profile.cv_url} className="btn-base btn-primary h-[42px] px-6 text-[13px]">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
