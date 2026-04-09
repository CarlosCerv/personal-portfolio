export function ProfileSkills({ skills }: { skills: Record<string, string[]> }) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Skills técnicas
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Herramientas, frameworks y capacidades que Carlos usa para ejecutar QA a nivel de producto.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="admin-card rounded-[28px] p-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
