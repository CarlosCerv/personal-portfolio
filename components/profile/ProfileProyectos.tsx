import { ProfileProject } from '@/lib/content/public-content'

export function ProfileProyectos({ proyectos }: { proyectos: ProfileProject[] }) {
  const visibles = proyectos.filter((item) => item.visible)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Proyectos notables
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Casos representativos donde QA y performance generaron mejoras medibles.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibles.map((project) => (
          <article
            key={`${project.nombre}-${project.empresa_anonima}`}
            className="admin-card rounded-[30px] p-7 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {project.empresa_anonima}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {project.nombre}
                  </h3>
                </div>
                <span className="rounded-full bg-background-alt px-3 py-1 text-xs font-medium text-muted">
                  {project.periodo}
                </span>
              </div>

              <div className="rounded-[22px] bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">{project.metricas}</p>
              </div>

              <p className="text-sm leading-[1.8] text-secondary-muted">{project.descripcion}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted"
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
