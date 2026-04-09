import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getHobbyList } from '@/lib/hobbies-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Intereses | Carlos Cervantes',
  description: 'Explora mis pasiones: fotografía, fitness, cocina, lectura, música y viajes. Conoce más sobre mis intereses y hobbies.',
  openGraph: {
    title: 'Intereses | Carlos Cervantes',
    description: 'Explora mis pasiones: fotografía, fitness, cocina, lectura, música y viajes.',
    url: '/intereses',
    type: 'website',
  },
};

export default function HobbiesPage() {
  const hobbies = getHobbyList();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium text-primary">EXPLORANDO PASIONES</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Mis Intereses
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Más allá del código, estos son mis intereses y pasiones que definen quién soy.
          Cada uno de estos hobbies contribuye a mantenerme creativo, saludable y feliz.
        </p>
      </div>

      {/* Hobbies Grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => (
            <Link key={hobby.slug} href={`/intereses/${hobby.slug}`}>
              <div className="group cursor-pointer h-full">
                {/* Card container */}
                <div className="relative overflow-hidden rounded-2xl bg-background-alt border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg h-full flex flex-col">
                  {/* Image and icon section */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    {/* Background image with overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url('${hobby.backgroundImage}')`,
                      }}
                    />
                    
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                    {/* Hover accent effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Title and subtitle */}
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                        {hobby.title}
                      </h3>
                      <p className="text-sm text-text-tertiary mt-1">
                        {hobby.subtitle}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Explorar más
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 mt-20">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              ¿Quieres conocer más sobre mi vida?
            </h2>
            <p className="text-text-secondary mb-6">
              Sígueme en redes sociales para conocer más sobre mis experiencias, 
              proyectos y el día a día en la industria tech.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link 
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Ver mi perfil completo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                Contacto
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
