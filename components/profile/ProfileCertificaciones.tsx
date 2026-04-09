import { Award, ArrowUpRight } from 'lucide-react'
import { ProfileCertification } from '@/lib/content/public-content'

export function ProfileCertificaciones({
  certificaciones,
}: {
  certificaciones: ProfileCertification[]
}) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Certificaciones
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Credenciales relevantes en testing, automatización y prácticas ágiles.
        </p>
      </div>

      <div className="space-y-4">
        {certificaciones.map((cert) => (
          <div key={`${cert.nombre}-${cert.anio}`} className="admin-card rounded-[28px] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background-alt">
                  {cert.logo_url ? (
                    <img src={cert.logo_url} alt={cert.institucion} className="h-full w-full object-cover" />
                  ) : (
                    <Award className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{cert.nombre}</h3>
                  <p className="text-base font-medium text-secondary-muted">{cert.institucion}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted">
                    <span>Obtenida: {cert.anio}</span>
                    {cert.credential_id ? <span>Credential ID: {cert.credential_id}</span> : null}
                  </div>
                </div>
              </div>

              {cert.url_verificacion ? (
                <a
                  href={cert.url_verificacion}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-btn-outline px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  Verificar
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <span className="rounded-full bg-background-alt px-4 py-2 text-xs font-medium text-muted">
                  URL de verificación pendiente
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
