'use client'

import { useState } from 'react'
import { Building2 } from 'lucide-react'
import { ProfileExperience } from '@/lib/content/public-content'

function ExperienceItem({ item }: { item: ProfileExperience }) {
  const [expanded, setExpanded] = useState(false)
  const visibleBullets = expanded ? item.bullets : item.bullets.slice(0, 2)

  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-white">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>

      <div className="admin-card rounded-[28px] p-6 md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background-alt">
              {item.logo_url ? (
                <img src={item.logo_url} alt={item.empresa} className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{item.cargo}</h3>
              <p className="text-base font-medium text-secondary-muted">{item.empresa}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>{item.periodo_inicio} – {item.periodo_fin}</span>
                <span>·</span>
                <span>{item.tipo}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-base leading-[1.8] text-secondary-muted">{item.descripcion}</p>

        <div className="mt-5 space-y-3">
          {visibleBullets.map((bullet) => (
            <div key={bullet} className="flex gap-3 text-sm leading-relaxed text-foreground">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {item.bullets.length > 2 ? (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {expanded ? 'Ver menos logros' : 'Ver más logros'}
          </button>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProfileExperiencia({ experiencia }: { experiencia: ProfileExperience[] }) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Experiencia profesional
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Una trayectoria enfocada en calidad, automatización y escalabilidad para productos de alto impacto.
        </p>
      </div>

      <div className="relative space-y-6 border-l border-border/80 pl-6">
        {experiencia.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
