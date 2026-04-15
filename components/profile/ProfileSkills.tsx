export function ProfileSkills({ skills }: { skills: Record<string, string[]> }) {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] md:text-[32px]">
          Skills técnicas
        </h2>
        <p className="mt-3 text-[16px] text-[#6f6f77] leading-relaxed">
          Herramientas, frameworks y capacidades que Carlos usa para ejecutar QA a nivel de producto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="bg-white rounded-[24px] border border-black/[0.06] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1d1d1f]">{category}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/[0.08] bg-[#f5f5f7] px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f]"
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
