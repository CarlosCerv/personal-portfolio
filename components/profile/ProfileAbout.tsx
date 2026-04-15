'use client'

import { useState } from 'react'

export function ProfileAbout({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2)

  return (
    <section className="surface-panel p-8 md:p-12">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="section-title">Sobre mí</h2>
          <p className="section-copy mt-3">
            Un perfil completo de cómo Carlos piensa, ejecuta y convierte calidad en ventaja operativa.
          </p>
        </div>

        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-[16px] leading-[1.9] text-[#5c5d63] md:text-[17px]">
            {paragraph}
          </p>
        ))}

        {paragraphs.length > 2 ? (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-[14px] font-semibold text-[#111113] transition-colors hover:text-[#0071e3]"
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
