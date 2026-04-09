import { GraduationCap } from 'lucide-react'
import { ProfileEducation } from '@/lib/content/public-content'

export function ProfileEducacion({ educacion }: { educacion: ProfileEducation[] }) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">Educación</h2>
        <p className="mt-2 text-base text-secondary-muted">
          Formación técnica y académica que acompaña la práctica profesional.
        </p>
      </div>

      <div className="space-y-4">
        {educacion.map((item) => (
          <div key={`${item.institucion}-${item.carrera}`} className="admin-card rounded-[28px] p-6">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background-alt">
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.institucion} className="h-full w-full object-cover" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{item.carrera}</h3>
                <p className="text-base font-medium text-secondary-muted">{item.institucion}</p>
                <p className="text-sm text-muted">
                  {item.periodo_inicio} – {item.periodo_fin}
                </p>
                <p className="text-sm leading-relaxed text-secondary-muted">{item.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
