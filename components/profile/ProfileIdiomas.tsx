import { ProfileIdioma } from '@/lib/content/public-content'

export function ProfileIdiomas({ idiomas }: { idiomas: ProfileIdioma[] }) {
  return (
    <section className="bg-white rounded-[32px] border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 md:p-12">
      <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1d1d1f]">Idiomas</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {idiomas.map((idioma) => (
          <div
            key={`${idioma.nombre}-${idioma.nivel}`}
            className="flex items-center gap-5 rounded-[24px] border border-black/[0.06] bg-[#f5f5f7] px-6 py-5"
          >
            <span className="text-[32px] leading-none">{idioma.bandera}</span>
            <div className="space-y-1">
              <p className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{idioma.nombre}</p>
              <p className="text-[14px] font-medium text-[#6f6f77] uppercase tracking-[0.1em]">{idioma.nivel}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
