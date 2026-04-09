import React from 'react'
import { createClient } from '@/lib/supabase/server'
import {
  getFallbackPosts,
  getMongoPosts,
  mergePublicPosts,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, FileText, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const dynamic = 'force-dynamic'
// Cache for 1 hour then revalidate
export const revalidate = 3600

export default async function PublicBlog() {
  const mongoPosts = await getMongoPosts()
  const supabase = await createClient()
  const rawSupabasePosts = supabase
    ? (await supabase
        .from('blog_posts')
        .select('*')
        .eq('estado', 'publicado')
        .order('published_at', { ascending: false })).data
    : []
  const supabasePosts = (rawSupabasePosts || []).map(normalizeSupabasePost)
  const fallbackPosts = await getFallbackPosts()
  const realPosts = mergePublicPosts(mongoPosts, supabasePosts)
  const posts = realPosts.length > 0 ? realPosts : fallbackPosts

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20 text-center">
        <h1 className="text-4xl font-semibold text-text-primary tracking-[-0.03em]">Blog</h1>
        <p className="mt-3 text-base text-text-secondary">Próximamente más contenido de valor...</p>
      </main>
    )
  }

  const featured = posts[0]
  const others = posts.slice(1)

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Header - Light Premium */}
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-gradient-to-r from-accent-indigo/10 to-accent-cyan/10 px-4 py-2 text-xs font-semibold text-accent-indigo uppercase tracking-[0.1em] border border-accent-indigo/30">
            Artículos técnicos
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary tracking-[-0.04em] leading-tight">
            Blog de QA y Automatización
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl font-light">
            Guías detalladas, mejores prácticas y reflexiones sobre calidad de software, automatización y performance engineering.
          </p>
        </div>

        {/* Featured Post - Full Width with Light Premium Style */}
        <section>
          <Link
            href={`/blog/${featured.slug}`}
            aria-label={`Leer artículo destacado: ${featured.titulo}`}
            className="group flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-6 overflow-hidden rounded-lg border border-border-primary bg-surface hover:border-border-accent transition-all duration-300 hover:shadow-lg h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Image - Dark Overlay */}
            <div className="aspect-video lg:aspect-auto lg:h-full bg-background-alt overflow-hidden relative flex-shrink-0">
              {featured.imagen_portada ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={featured.imagen_portada}
                    alt={featured.titulo}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent group-hover:from-background/20 transition-all duration-300" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-tertiary bg-background-alt">
                  <FileText className="w-16 h-16 opacity-20" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block text-xs font-bold text-accent-indigo uppercase tracking-[0.1em] bg-gradient-to-r from-accent-indigo/10 to-accent-cyan/10 px-3 py-1.5 rounded-full border border-accent-indigo/30">
                    {featured.categoria || 'Artículo'}
                  </span>
                  <span className="inline-block text-xs font-bold text-accent-cyan uppercase tracking-[0.1em] bg-gradient-to-r from-accent-cyan/10 to-accent-indigo/10 px-3 py-1.5 rounded-full border border-accent-cyan/30">
                    Destacado
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-[-0.03em] group-hover:text-accent-cyan transition-colors duration-200">
                  {featured.titulo}
                </h2>
                <p className="text-base text-text-secondary line-clamp-3 leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-semibold text-text-tertiary uppercase tracking-[0.1em] pt-6 border-t border-border-primary">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {format(new Date(featured.published_at), 'dd MMM yyyy', { locale: es })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    5 min
                  </div>
                </div>
                <div className="text-accent-cyan flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Leer <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Posts Grid - Dark Tech Premium Grid */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-10 tracking-[-0.03em]">
            Más artículos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                aria-label={`Leer artículo: ${post.titulo}`}
                className="group flex flex-col h-full bg-surface border border-border-primary rounded-lg overflow-hidden hover:border-border-accent hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* Image - Dark Overlay with Zoom */}
                <div className="aspect-video bg-background-alt overflow-hidden relative flex-shrink-0">
                  {post.imagen_portada ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={post.imagen_portada}
                        alt={post.titulo}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/20 to-transparent group-hover:from-background/30 transition-all duration-300" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary bg-background-alt">
                      <FileText className="w-12 h-12 opacity-10" aria-hidden="true" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-bold text-accent-indigo uppercase tracking-[0.1em] bg-gradient-to-r from-accent-indigo/10 to-accent-cyan/10 px-2.5 py-1.5 rounded border border-accent-indigo/30">
                      {post.categoria || 'Artículo'}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-text-tertiary">
                        <Tag className="w-3 h-3" aria-hidden="true" />
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-text-primary tracking-[-0.02em] group-hover:text-accent-indigo transition-colors duration-200 line-clamp-2 mb-2 leading-tight">
                    {post.titulo}
                  </h3>

                  <p className="text-sm text-text-secondary line-clamp-2 flex-1 mb-4 leading-relaxed font-light">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-text-tertiary uppercase tracking-[0.08em] pt-4 border-t border-border-primary">
                    <time dateTime={new Date(post.published_at).toISOString()}>
                      {format(new Date(post.published_at), 'dd MMM', { locale: es })}
                    </time>
                    <span className="text-accent-indigo font-bold group-hover:translate-x-1 transition-transform duration-200">
                      Leer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
