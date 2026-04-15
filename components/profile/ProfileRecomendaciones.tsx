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
    <section className="space-y-10">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] md:text-[32px]">
          Recomendaciones
        </h2>
        <p className="mt-3 text-[16px] text-[#6f6f77] leading-relaxed">
          Validación social de colegas y clientes sobre la forma de trabajar de Carlos.
        </p>
      </div>

      {visibles.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {visibles.map((item) => (
            <article key={`${item.nombre}-${item.empresa}`} className="bg-white rounded-[24px] border border-black/[0.06] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-[#f5f5f7]">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nombre} className="h-full w-full object-cover" />
                  ) : (
                    <MessageSquareQuote className="h-6 w-6 text-[#1d1d1f]" strokeWidth={1.5} />
                  )}
                </div>
                <div className="space-y-1 pt-1">
                  <h3 className="text-[17px] font-bold text-[#1d1d1f]">{item.nombre}</h3>
                  <p className="text-[14px] font-medium text-[#6f6f77]">
                    {item.cargo} · {item.empresa}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-[1.8] text-[#1d1d1f] italic bg-[#f5f5f7] p-5 rounded-[16px] border border-black/[0.04] relative">
                <span className="absolute -top-3 -left-2 text-[48px] text-[#1d1d1f]/20 font-serif leading-none italic">&quot;</span>
                {item.texto}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] border border-black/[0.06] p-8 md:p-10 text-center">
          <p className="text-[20px] font-bold text-[#1d1d1f]">Solicitar recomendación</p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6f6f77] max-w-md mx-auto">
            Comparte este link con compañeros o clientes para que dejen un testimonio:
          </p>
          <div className="mt-6 rounded-[16px] bg-[#f5f5f7] px-6 py-4 text-[14px] font-semibold text-[#1d1d1f] border border-black/[0.04] inline-block">
            {profileLink}
          </div>
        </div>
      )}
    </section>
  )
}
