import { ProfileIdioma } from '@/lib/content/public-content'

export function ProfileIdiomas({ idiomas }: { idiomas: ProfileIdioma[] }) {
  return (
    <section className="admin-card rounded-[32px] p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">Idiomas</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {idiomas.map((idioma) => (
          <div
            key={`${idioma.nombre}-${idioma.nivel}`}
            className="flex items-center gap-4 rounded-[24px] border border-border bg-background px-5 py-4"
          >
            <span className="text-3xl leading-none">{idioma.bandera}</span>
            <div>
              <p className="text-base font-semibold text-foreground">{idioma.nombre}</p>
              <p className="text-sm text-secondary-muted">{idioma.nivel}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
