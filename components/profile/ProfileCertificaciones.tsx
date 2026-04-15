import { Award, ArrowUpRight } from 'lucide-react'
import { ProfileCertification } from '@/lib/content/public-content'

export function ProfileCertificaciones({
  certificaciones,
}: {
  certificaciones: ProfileCertification[]
}) {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] md:text-[32px]">
          Certificaciones
        </h2>
        <p className="mt-3 text-[16px] text-[#6f6f77] leading-relaxed">
          Credenciales relevantes en testing, automatización y prácticas ágiles.
        </p>
      </div>

      <div className="space-y-5">
        {certificaciones.map((cert) => (
          <div key={`${cert.nombre}-${cert.anio}`} className="bg-white rounded-[24px] border border-black/[0.06] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-black/[0.06] bg-[#f5f5f7]">
                  {cert.logo_url ? (
                    <img src={cert.logo_url} alt={cert.institucion} className="h-full w-full object-cover" />
                  ) : (
                    <Award className="h-7 w-7 text-[#1d1d1f]" strokeWidth={1.5} />
                  )}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[20px] font-bold tracking-tight text-[#1d1d1f]">{cert.nombre}</h3>
                  <p className="text-[16px] font-semibold text-[#6f6f77]">{cert.institucion}</p>
                  <div className="flex flex-wrap gap-3 text-[13px] font-medium text-[#6f6f77] pt-0.5">
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
                  className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 px-6 py-3 border border-black/[0.13] text-[#1d1d1f] rounded-full font-semibold text-[13px] hover:bg-[#f5f5f7] transition-all"
                >
                  Verificar
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="mt-4 md:mt-0 rounded-full border border-black/[0.1] bg-[#f5f5f7] px-4 py-2 text-[12px] font-medium text-[#6f6f77]">
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
