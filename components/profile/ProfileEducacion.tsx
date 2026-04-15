import { GraduationCap } from 'lucide-react'
import { ProfileEducation } from '@/lib/content/public-content'

export function ProfileEducacion({ educacion }: { educacion: ProfileEducation[] }) {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] md:text-[32px]">Educación</h2>
        <p className="mt-3 text-[16px] text-[#6f6f77] leading-relaxed">
          Formación técnica y académica que acompaña la práctica profesional.
        </p>
      </div>

      <div className="space-y-5">
        {educacion.map((item) => (
          <div key={`${item.institucion}-${item.carrera}`} className="bg-white rounded-[24px] border border-black/[0.06] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-black/[0.06] bg-[#f5f5f7]">
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.institucion} className="h-full w-full object-cover" />
                ) : (
                  <GraduationCap className="h-7 w-7 text-[#1d1d1f]" strokeWidth={1.5} />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-[20px] font-bold tracking-tight text-[#1d1d1f]">{item.carrera}</h3>
                <p className="text-[16px] font-semibold text-[#6f6f77]">{item.institucion}</p>
                <p className="text-[13px] font-medium text-[#6f6f77]">
                  {item.periodo_inicio} – {item.periodo_fin}
                </p>
                <p className="pt-2 text-[15px] leading-relaxed text-[#6f6f77]">{item.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
