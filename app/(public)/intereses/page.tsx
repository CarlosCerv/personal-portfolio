import { Metadata } from 'next'
import Link from 'next/link'
import { getPublicInterests } from '@/lib/content/interests-content'

export const metadata: Metadata = {
  title: 'Intereses | Carlos Cervantes',
  description: 'Explora mis pasiones: fotografía, fitness, cocina, lectura, música y viajes. Conoce más sobre mis intereses y hobbies.',
  openGraph: {
    title: 'Intereses | Carlos Cervantes',
    description: 'Explora mis pasiones: fotografía, fitness, cocina, lectura, música y viajes.',
    url: '/intereses',
    type: 'website',
  },
}

export default async function HobbiesPage() {
  const hobbies = await getPublicInterests()

  return (
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <div className="page-band">
        <div className="page-container py-9 md:py-12">
          <div className="space-y-4 md:space-y-5">
            <span className="eyebrow">Explorando pasiones</span>
            <h1 className="section-title max-w-4xl">Mis Intereses</h1>
            <p className="section-copy max-w-2xl">
              Más allá del código: intereses y pasiones que me mantienen creativo, saludable y feliz.
            </p>
          </div>
        </div>
      </div>

      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {hobbies.map((hobby) => (
            <Link key={hobby.slug} href={`/intereses/${hobby.slug}`}>
              <div className="group h-full cursor-pointer">
                <article className="surface-card relative flex h-full min-w-0 flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
                  <div className="relative h-44 overflow-hidden bg-[linear-gradient(180deg,#f8f9fb_0%,#eef2f6_100%)] sm:h-48 md:h-52">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{
                        backgroundImage: `url('${hobby.background_image}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,19,0.44)] via-[rgba(17,17,19,0.08)] to-transparent" />
                    <div className="absolute bottom-4 right-4 text-[28px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.32)]">
                      {hobby.icon}
                    </div>
                    <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111113] backdrop-blur">
                      Interés
                    </div>
                  </div>

                  <div className="flex min-h-[248px] flex-1 min-w-0 flex-col p-5 md:min-h-[260px] md:p-6">
                    <div className="mb-4">
                      <h2 className="min-w-0 break-words text-[1.38rem] font-semibold tracking-[-0.04em] text-[#111113] [overflow-wrap:anywhere]">
                        {hobby.title}
                      </h2>
                      <p className="mt-2 min-w-0 break-words text-[14px] leading-[1.75] text-[#5c5d63] [overflow-wrap:anywhere]">
                        {hobby.subtitle}
                      </p>
                    </div>

                    <div className="mt-auto border-t border-black/[0.06] pt-4">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#111113] transition-transform duration-200 group-hover:translate-x-1">
                        Explorar más
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="page-container mt-8 md:mt-10">
        <div className="rounded-[32px] bg-[linear-gradient(180deg,#111113_0%,#1c1c21_100%)] p-7 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <div>
              <h2 className="mb-4 text-[24px] font-semibold tracking-[-0.045em] text-white md:text-[34px]">
              ¿Quieres conocer más sobre mi vida?
              </h2>
              <p className="text-[15px] leading-[1.85] text-white/68">
                Sígueme en redes sociales para conocer más sobre mis experiencias,
                proyectos y el día a día en la industria tech.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link href="/profile" className="btn-base bg-white text-[#111113] hover:bg-[#f5f5f7]">
                Ver mi perfil completo
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contacto" className="btn-base border border-white/18 bg-white/8 text-white hover:bg-white/12">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
