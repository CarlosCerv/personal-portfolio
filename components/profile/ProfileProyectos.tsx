import { ProfileProject } from '@/lib/content/public-content'

export function ProfileProyectos({ proyectos }: { proyectos: ProfileProject[] }) {
  const visibles = proyectos.filter((item) => item.visible)

  return (
    <section className="space-y-10">
      <div>
        <h2 className="section-title">
          Notable projects
        </h2>
        <p className="section-copy mt-3">
          Representative cases where QA and performance generated measurable improvements.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {visibles.map((project) => (
          <article
            key={`${project.nombre}-${project.empresa_anonima}`}
            className="surface-card flex flex-col p-6 md:p-8"
          >
            <div className="space-y-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[#111113]">
                    {project.empresa_anonima}
                  </p>
                  <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-[#111113]">
                    {project.nombre}
                  </h3>
                </div>
                <span className="rounded-full bg-[#fafafa] border border-black/[0.06] px-3 py-1 text-[12px] font-semibold text-[#6f6f77]">
                  {project.periodo}
                </span>
              </div>

              <div className="surface-card-soft px-5 py-4">
                <p className="text-[14px] font-semibold leading-snug text-[#111113]">{project.metricas}</p>
              </div>

              <p className="flex-1 text-[15px] leading-[1.85] text-[#5c5d63]">{project.descripcion}</p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-black/[0.06] mt-4">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[12px] font-medium text-[#111113]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
