'use client'

import { useState } from 'react'

export function ProfileAbout({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2)

  return (
    <section className="admin-card rounded-[32px] p-8 md:p-10">
      <div className="max-w-4xl space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">Sobre mí</h2>
          <p className="mt-2 text-base text-secondary-muted">
            Un perfil completo de cómo Carlos piensa, ejecuta y convierte calidad en ventaja operativa.
          </p>
        </div>

        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-[1.9] text-secondary-muted md:text-lg">
            {paragraph}
          </p>
        ))}

        {paragraphs.length > 2 ? (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
