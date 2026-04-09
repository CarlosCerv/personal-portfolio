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
      <main className="min-h-screen bg-white pt-32 pb-20 text-center">
        <h1 className="text-4xl font-semibold text-text-primary tracking-[-0.03em]">Blog</h1>
        <p className="mt-3 text-base text-text-secondary">Próximamente más contenido de valor...</p>
      </main>
    )
  }

  const featured = posts[0]
  const others = posts.slice(1)

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-[0.1em]">
            Artículos técnicos
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-[-0.03em] leading-tight">
            Blog de QA y Automatización
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Guías detalladas, mejores prácticas y reflexiones sobre calidad de software, automatización y performance engineering.
          </p>
        </div>

        {/* Featured Post - Optimized for mobile */}
        <section>
          <Link
            href={`/blog/${featured.slug}`}
            className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-0 overflow-hidden rounded-[20px] border border-divider bg-white hover:shadow-lg transition-all duration-300 h-full group"
          >
            {/* Image - Optimized loading */}
            <div className="aspect-video lg:aspect-auto lg:h-full bg-background-alt overflow-hidden relative flex-shrink-0">
              {featured.imagen_portada ? (
                <Image
                  src={featured.imagen_portada}
                  alt={featured.titulo}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-tertiary bg-gradient-to-br from-background-alt to-background-tertiary">
                  <FileText className="w-16 h-16 opacity-40" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.1em] bg-primary/10 px-3 py-1 rounded-full">
                    {featured.categoria || 'Artículo'}
                  </span>
                  <span className="inline-block text-xs font-semibold text-accent-blue uppercase tracking-[0.1em] bg-accent-blue/10 px-3 py-1 rounded-full">
                    Destacado
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-[-0.02em] group-hover:text-primary transition-colors duration-200">
                  {featured.titulo}
                </h2>
                <p className="text-base text-text-secondary line-clamp-3 leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-semibold text-text-tertiary uppercase tracking-[0.1em] pt-6 border-t border-divider flexwrap">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(featured.published_at), 'dd MMM yyyy', { locale: es })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    5 min
                  </div>
                </div>
                <div className="text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Leer <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Posts Grid - Optimized */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-10 tracking-[-0.03em]">
            Más artículos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-divider rounded-[16px] overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                {/* Image - Optimized with Next.js Image */}
                <div className="aspect-video bg-gradient-to-br from-background-alt to-background-tertiary overflow-hidden relative flex-shrink-0">
                  {post.imagen_portada ? (
                    <Image
                      src={post.imagen_portada}
                      alt={post.titulo}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                      <FileText className="w-12 h-12 opacity-40" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.1em] bg-primary/10 px-2 py-1 rounded">
                      {post.categoria || 'Artículo'}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-text-tertiary">
                        <Tag className="w-3 h-3" />
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary tracking-[-0.02em] group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2 leading-tight">
                    {post.titulo}
                  </h3>

                  <p className="text-sm text-text-secondary line-clamp-2 flex-1 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-text-tertiary uppercase tracking-[0.08em] pt-4 border-t border-divider">
                    <time dateTime={new Date(post.published_at).toISOString()}>
                      {format(new Date(post.published_at), 'dd MMM', { locale: es })}
                    </time>
                    <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform duration-200">
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
