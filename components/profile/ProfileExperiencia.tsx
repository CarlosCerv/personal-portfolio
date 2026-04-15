'use client'

import { useState } from 'react'
import { Building2 } from 'lucide-react'
import { ProfileExperience } from '@/lib/content/public-content'

function ExperienceItem({ item }: { item: ProfileExperience }) {
  const [expanded, setExpanded] = useState(false)
  const visibleBullets = expanded ? item.bullets : item.bullets.slice(0, 2)

  return (
    <div className="relative pl-8 md:pl-10">
      <div className="absolute left-[-5px] top-8 flex h-3 w-3 rounded-full bg-[#111113] ring-4 ring-[#ffffff]" />

      <div className="surface-card p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-sm">
              {item.logo_url ? (
                <img src={item.logo_url} alt={item.empresa} className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-7 w-7 text-[#1d1d1f]" strokeWidth={1.5} />
              )}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111113]">{item.cargo}</h3>
              <p className="text-[15px] font-semibold text-[#5c5d63]">{item.empresa}</p>
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#6f6f77] pt-1">
                <span>{item.periodo_inicio} – {item.periodo_fin}</span>
                <span>·</span>
                <span>{item.tipo}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-[1.85] text-[#5c5d63]">{item.descripcion}</p>

        <div className="mt-6 space-y-3">
          {visibleBullets.map((bullet) => (
            <div key={bullet} className="flex gap-3 text-[14px] leading-relaxed text-[#111113]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {item.bullets.length > 2 ? (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-5 text-[14px] font-semibold text-[#111113] hover:text-[#0071e3] transition-colors"
          >
            {expanded ? 'Ver menos logros' : 'Ver más logros'}
          </button>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-black/[0.08] bg-[#fafafa] px-3 py-1.5 text-[12px] font-medium text-[#111113]"
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
    <section className="space-y-10">
      <div>
        <h2 className="section-title">
          Experiencia profesional
        </h2>
        <p className="section-copy mt-3">
          Una trayectoria enfocada en calidad, automatización y escalabilidad para productos de alto impacto.
        </p>
      </div>

      <div className="relative ml-2 space-y-8 border-l-[2px] border-black/[0.08]">
        {experiencia.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
