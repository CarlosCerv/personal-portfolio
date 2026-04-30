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
      <main className="page-shell pt-10 pb-20 md:pt-12">
        <div className="page-band bg-white bg-none">
          <div className="page-container">
            <div className="space-y-4">
              <span className="eyebrow">Technical articles</span>
              <h1 className="section-title max-w-4xl">QA & Automation Blog</h1>
              <p className="section-copy max-w-2xl">More valuable content coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const featured = posts[0]
  const others = posts.slice(1)

  return (
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <div className="page-band bg-white bg-none">
        <div className="page-container">
          <div className="space-y-4">
            <span className="eyebrow">Technical articles</span>
            <h1 className="section-title max-w-4xl">QA & Automation Blog</h1>
            <p className="section-copy max-w-2xl">
              Detailed guides, best practices and reflections on software quality, automation and performance engineering.
            </p>
          </div>
        </div>
      </div>

      <div className="page-container space-y-20 py-16 md:py-20">

        <section>
          <h2 className="eyebrow mb-6">Featured article</h2>
          <Link
            href={`/blog/${featured.slug}`}
            aria-label={`Read featured article: ${featured.titulo}`}
            className="group surface-panel grid h-full gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111113] lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-[#f3f4f6] lg:h-full lg:aspect-auto">
              {featured.imagen_portada ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={featured.imagen_portada}
                    alt={featured.titulo}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,19,0.18)] via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#f3f4f6] text-[#8a8b92]">
                  <FileText className="w-16 h-16 opacity-20" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 md:p-10">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="eyebrow rounded-full border border-[#0071e3]/12 bg-[#0071e3]/6 px-3 py-1.5">
                    {featured.categoria || 'Article'}
                  </span>
                  <span className="eyebrow rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1.5 text-[#5c5d63]">
                    Featured
                  </span>
                </div>
                <h2 className="text-[30px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#111113] transition-colors duration-200 md:text-[40px]">
                  {featured.titulo}
                </h2>
                <p className="line-clamp-3 text-[15px] leading-[1.85] text-[#5c5d63]">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/[0.06] pt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8b92]">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {format(new Date(featured.published_at), 'dd MMM yyyy', { locale: es })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    5 min
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[#111113] transition-transform group-hover:translate-x-1">
                  Read <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Posts Grid */}
        <section>
          <h2 className="eyebrow mb-6">More articles</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                aria-label={`Read article: ${post.titulo}`}
                className="group surface-card flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111113]"
              >
                <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-[#f3f4f6]">
                  {post.imagen_portada ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={post.imagen_portada}
                        alt={post.titulo}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,19,0.14)] via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f3f4f6] text-[#8a8b92]">
                      <FileText className="w-12 h-12 opacity-10" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="eyebrow rounded-full border border-[#0071e3]/12 bg-[#0071e3]/6 px-3 py-1.5 text-[9px]">
                      {post.categoria || 'Article'}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1.5 text-[10px] font-medium text-[#5c5d63]">
                        <Tag className="w-3 h-3" aria-hidden="true" />
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-3 line-clamp-2 text-[19px] font-semibold leading-snug tracking-[-0.035em] text-[#111113]">
                    {post.titulo}
                  </h3>

                  <p className="mb-5 flex-1 line-clamp-2 text-[14px] leading-[1.8] text-[#5c5d63]">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8b92]">
                    <time dateTime={new Date(post.published_at).toISOString()}>
                      {format(new Date(post.published_at), 'dd MMM', { locale: es })}
                    </time>
                    <span className="font-bold text-[#111113] transition-transform duration-200 group-hover:translate-x-1">
                      Read →
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
