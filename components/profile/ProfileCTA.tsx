import Link from 'next/link'

export function ProfileCTA() {
  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,#111113_0%,#1b1b20_100%)] px-8 py-12 text-center shadow-[0_24px_60px_rgba(17,17,19,0.22)] md:px-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.08),transparent_38%)]" />
      <div className="mx-auto max-w-3xl space-y-6 relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Siguiente paso</p>
        <h2 className="text-[32px] leading-tight tracking-[-0.05em] text-white md:text-[40px]">
          ¿Tienes un proyecto en mente? Hablemos.
        </h2>
        <p className="mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/72">
          Si tu equipo necesita más confianza para lanzar, automatizar o escalar, podemos revisar el caso y definir el mejor siguiente paso.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row pt-6">
          <Link href="/contacto" className="btn-base bg-white px-8 py-3.5 text-[15px] font-semibold text-[#111113] hover:bg-[#f5f5f7]">
            Hablar de tu proyecto
          </Link>
          <Link href="/servicios#diagnostico" className="btn-base border border-white/18 bg-white/6 px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10">
            Ver diagnóstico QA
          </Link>
        </div>
      </div>
    </section>
  )
}
