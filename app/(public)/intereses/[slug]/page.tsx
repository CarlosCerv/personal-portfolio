import { Metadata } from 'next'
import Link from 'next/link'
import { getHobby, getAllHobbies } from '@/lib/hobbies-data'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const hobbies = getAllHobbies()
  return hobbies.map((hobby) => ({
    slug: hobby.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hobby = getHobby(slug)
  
  if (!hobby) {
    return {
      title: 'No encontrado',
    }
  }

  return {
    title: `${hobby.title} | Carlos Cervantes`,
    description: hobby.subtitle,
    openGraph: {
      title: `${hobby.title} | Carlos Cervantes`,
      description: hobby.subtitle,
      url: `/intereses/${hobby.slug}`,
      type: 'article',
    },
  }
}

export default async function HobbyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hobby = getHobby(slug)

  if (!hobby) {
    notFound()
  }

  return (
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <div className="surface-panel relative overflow-hidden p-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f9fb_0%,#eef2f6_100%)]" />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-8 md:pr-14">
          <span className="text-[120px] opacity-[0.14] md:text-[180px]">
            {hobby.icon}
          </span>
        </div>
        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
          <div className="max-w-4xl">
            <span className="eyebrow">Pasión</span>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#111113] md:text-6xl">
                {hobby.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-[1.8] text-[#5c5d63]">
              {hobby.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div className="mb-8">
          <Link 
            href="/intereses"
            className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8a8b92] transition-colors hover:text-[#0071e3]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a intereses
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="surface-panel p-8 md:p-10">
              <h2 className="section-title text-[28px] md:text-[34px]">Sobre este interés</h2>
              <p className="mt-4 text-[15px] leading-[1.9] text-[#5c5d63]">
                {hobby.description}
              </p>
            </section>

            <section className="surface-panel p-8 md:p-10">
              <h2 className="section-title text-[28px] md:text-[34px]">¿Por qué me apasiona?</h2>
              <p className="mt-4 text-[15px] leading-[1.9] text-[#5c5d63]">
                {hobby.why}
              </p>
            </section>

            <section className="surface-panel p-8 md:p-10">
              <h2 className="section-title text-[28px] md:text-[34px]">Mi experiencia</h2>
              <p className="mt-4 text-[15px] leading-[1.9] text-[#5c5d63]">
                {hobby.experience}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="surface-card p-7">
                <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111113] mb-4">Destacados</h3>
                <ul className="space-y-3">
                  {hobby.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-[#5c5d63] leading-[1.75]">
                      <span className="font-bold text-[#0071e3]">{hobby.icon}</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="surface-card p-7">
                <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111113] mb-4">Objetivos</h3>
                <ul className="space-y-3">
                  {hobby.goals.map((goal, idx) => (
                    <li key={idx} className="flex gap-3 text-[#5c5d63] leading-[1.75]">
                      <span className="font-bold text-[#0071e3]">★</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-card space-y-4 p-6">
              <h3 className="eyebrow">Información</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-[#8a8b92]">Desde</p>
                  <p className="text-lg font-semibold text-[#111113]">{hobby.started}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#8a8b92]">Frecuencia</p>
                  <p className="text-lg font-semibold text-[#111113]">{hobby.frequency}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#8a8b92]">Nivel</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#111113]">{hobby.level}</span>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < (hobby.level === 'Avanzado' ? 3 : hobby.level === 'Intermedio' ? 2 : 1)
                              ? 'bg-[#0071e3]'
                              : 'bg-black/[0.08]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/[0.06] pt-4">
                <p className="mb-3 text-sm text-[#8a8b92]">Equipo</p>
                <div className="space-y-2">
                  {hobby.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#0071e3]">→</span>
                      <span className="text-sm text-[#5c5d63]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/[0.06] pt-4">
                <p className="mb-3 text-sm text-[#8a8b92]">Recursos</p>
                <div className="space-y-2">
                  {hobby.resources.map((resource, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#0071e3]">→</span>
                      <span className="text-sm text-[#5c5d63]">{resource}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-card-soft p-6">
              <p className="mb-4 text-sm leading-[1.8] text-[#5c5d63]">
                ¿Compartimos pasiones similares? Conectemos y conversemos sobre nuestros intereses.
              </p>
              <Link
                href="/contacto"
                className="btn-base btn-primary w-full justify-center"
              >
                Ponte en contacto →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-black/[0.06] py-12 md:py-16">
        <div>
          <h2 className="section-title mb-8 text-[30px] md:text-[38px]">Otros intereses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllHobbies()
              .filter(h => h.slug !== hobby.slug)
              .slice(0, 3)
              .map((relatedHobby) => (
                <Link key={relatedHobby.slug} href={`/intereses/${relatedHobby.slug}`}>
                  <div className="surface-card group cursor-pointer p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
                    <div className="text-5xl mb-3">{relatedHobby.icon}</div>
                    <h3 className="font-semibold tracking-[-0.03em] text-[#111113] transition-colors group-hover:text-[#0071e3]">
                      {relatedHobby.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.7] text-[#5c5d63]">
                      {relatedHobby.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
