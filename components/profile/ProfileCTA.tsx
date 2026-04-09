import Link from 'next/link'

export function ProfileCTA() {
  return (
    <section className="admin-card rounded-[34px] px-8 py-10 text-center md:px-10 md:py-12">
      <div className="mx-auto max-w-3xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Siguiente paso</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl">
          ¿Tienes un proyecto en mente? Hablemos.
        </h2>
        <p className="text-base leading-relaxed text-secondary-muted">
          Si tu equipo necesita más confianza para lanzar, automatizar o escalar, podemos revisar el caso y definir el mejor siguiente paso.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contacto" className="admin-btn-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em]">
            Hablar de tu proyecto
          </Link>
          <Link href="/servicios#diagnostico" className="admin-btn-outline px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em]">
            Ver diagnóstico QA
          </Link>
        </div>
      </div>
    </section>
  )
}
