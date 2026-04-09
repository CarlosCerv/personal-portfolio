import { MessageSquareQuote } from 'lucide-react'
import { ProfileRecommendation } from '@/lib/content/public-content'

export function ProfileRecomendaciones({
  recomendaciones,
  profileLink,
}: {
  recomendaciones: ProfileRecommendation[]
  profileLink: string
}) {
  const visibles = recomendaciones.filter((item) => item.visible)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Recomendaciones
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Validación social de colegas y clientes sobre la forma de trabajar de Carlos.
        </p>
      </div>

      {visibles.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {visibles.map((item) => (
            <article key={`${item.nombre}-${item.empresa}`} className="admin-card rounded-[30px] p-7">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border bg-background-alt">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nombre} className="h-full w-full object-cover" />
                  ) : (
                    <MessageSquareQuote className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">{item.nombre}</h3>
                  <p className="text-sm text-secondary-muted">
                    {item.cargo} · {item.empresa}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-[1.9] text-secondary-muted">{item.texto}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-card rounded-[30px] p-8">
          <p className="text-lg font-medium text-foreground">Solicitar recomendación</p>
          <p className="mt-3 text-sm leading-[1.8] text-secondary-muted">
            Comparte este link con compañeros o clientes para que dejen un testimonio:
          </p>
          <div className="mt-4 rounded-[22px] bg-background px-4 py-4 text-sm font-medium text-primary">
            {profileLink}
          </div>
        </div>
      )}
    </section>
  )
}
