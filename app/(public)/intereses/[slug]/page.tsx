import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getHobby, getAllHobbies } from '@/lib/hobbies-data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const hobbies = getAllHobbies();
  return hobbies.map((hobby) => ({
    slug: hobby.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hobby = getHobby(params.slug);
  
  if (!hobby) {
    return {
      title: 'No encontrado',
    };
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
  };
}

export default function HobbyDetailPage({ params }: { params: { slug: string } }) {
  const hobby = getHobby(params.slug);

  if (!hobby) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero section with background image */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl md:text-[150px] opacity-20">
            {hobby.icon}
          </span>
        </div>
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full bg-gradient-to-t from-black/50 to-transparent p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              <span className="text-sm font-medium text-primary/80">PASIÓN</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-2">
                {hobby.title}
              </h1>
              <p className="text-lg text-white/80">
                {hobby.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/intereses"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a intereses
          </Link>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description section */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Sobre este interés</h2>
              <p className="text-text-secondary leading-relaxed">
                {hobby.description}
              </p>
            </section>

            {/* Why section */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué me apasiona?</h2>
              <p className="text-text-secondary leading-relaxed">
                {hobby.why}
              </p>
            </section>

            {/* Experience section */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Mi experiencia</h2>
              <p className="text-text-secondary leading-relaxed">
                {hobby.experience}
              </p>
            </section>

            {/* Highlights and goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Highlights */}
              <section>
                <h3 className="text-xl font-bold text-text-primary mb-4">Destacados</h3>
                <ul className="space-y-3">
                  {hobby.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-text-secondary">
                      <span className="text-primary font-bold">{hobby.icon}</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Goals */}
              <section>
                <h3 className="text-xl font-bold text-text-primary mb-4">Objetivos</h3>
                <ul className="space-y-3">
                  {hobby.goals.map((goal, idx) => (
                    <li key={idx} className="flex gap-3 text-text-secondary">
                      <span className="text-primary font-bold">★</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Info card */}
            <div className="rounded-2xl bg-background-alt border border-border/50 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider">Información</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-tertiary mb-1">Desde</p>
                  <p className="text-lg font-semibold text-text-primary">{hobby.started}</p>
                </div>

                <div>
                  <p className="text-sm text-text-tertiary mb-1">Frecuencia</p>
                  <p className="text-lg font-semibold text-text-primary">{hobby.frequency}</p>
                </div>

                <div>
                  <p className="text-sm text-text-tertiary mb-1">Nivel</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-text-primary">{hobby.level}</span>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < (hobby.level === 'Advanced' ? 3 : hobby.level === 'Intermediate' ? 2 : 1)
                              ? 'bg-primary'
                              : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="text-sm text-text-tertiary mb-3">Equipo</p>
                <div className="space-y-2">
                  {hobby.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="text-sm text-text-tertiary mb-3">Recursos</p>
                <div className="space-y-2">
                  {hobby.resources.map((resource, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      <span className="text-sm text-text-secondary">{resource}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 p-6">
              <p className="text-sm text-text-secondary mb-4">
                ¿Compartimos pasiones similares? Conectemos y conversemos sobre nuestros intereses.
              </p>
              <Link
                href="/contacto"
                className="w-full px-4 py-2.5 bg-primary text-white rounded-lg font-medium text-center hover:bg-primary/90 transition-colors text-sm"
              >
                Ponte en contacto →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related hobbies section */}
      <div className="border-t border-border/50 mt-16 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Otros intereses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllHobbies()
              .filter(h => h.slug !== hobby.slug)
              .slice(0, 3)
              .map((relatedHobby) => (
                <Link key={relatedHobby.slug} href={`/intereses/${relatedHobby.slug}`}>
                  <div className="group cursor-pointer rounded-xl bg-background-alt border border-border/50 p-6 hover:border-primary/30 transition-all duration-300">
                    <div className="text-5xl mb-3">{relatedHobby.icon}</div>
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {relatedHobby.title}
                    </h3>
                    <p className="text-sm text-text-tertiary mt-1">
                      {relatedHobby.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
