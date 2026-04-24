import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import {
  getFallbackPostBySlug,
  getMongoPostBySlug,
  mergePublicPosts,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import { generateBlogPostMetadata } from '@/lib/metadata-utils'
import { ArrowLeft, Award, Calendar, Clock, Share2 } from 'lucide-react'
import { LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

// Helper function to fetch post data
async function getPostData(slug: string) {
  const mongoPost = await getMongoPostBySlug(slug)
  const supabase = await createClient()
  const rawSupabasePost = supabase
    ? (
        await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single()
      ).data
    : null

  const supabasePost = rawSupabasePost ? normalizeSupabasePost(rawSupabasePost) : null
  const mergedPosts = mergePublicPosts(
    mongoPost ? [mongoPost] : [],
    supabasePost ? [supabasePost] : []
  )
  return mergedPosts[0] || (await getFallbackPostBySlug(slug))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The article you are looking for is not available',
    }
  }

  return generateBlogPostMetadata({
    title: post.titulo,
    description: post.excerpt || 'QA and testing blog article',
    slug: post.slug,
    image: post.imagen_portada || '/og-image.png',
    tags: post.tags || [],
    publishedAt: post.published_at ? new Date(post.published_at) : new Date(),
    author: post.autor || 'Carlos Cervantes',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return (
      <main className="page-shell pt-10 pb-20 md:pt-12">
        <div className="mx-auto max-w-3xl px-6">
          <div className="surface-panel p-10 text-center md:p-14">
            <span className="eyebrow">Blog</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#111113] md:text-5xl">
              Article not found
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5c5d63]">
              We couldn't find this publication. The link might have changed or the article is no longer available.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className="btn-base btn-primary">
                Back to blog
              </Link>
              <Link href="/contacto" className="btn-base btn-secondary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const absoluteUrl = `https://carloscervantes-qa.vercel.app/blog/${post.slug}`
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(post.titulo)}&url=${encodeURIComponent(absoluteUrl)}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl)}`

  return (
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <header className="page-band">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a8b92] transition-colors hover:text-[#0071e3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="mt-10 max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                {post.categoria}
              </span>
              {(post.tags || []).slice(0, 3).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5c5d63]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-[#111113] md:text-7xl">
                {post.titulo}
              </h1>
              {post.excerpt ? (
                <p className="max-w-3xl text-lg leading-[1.75] text-[#5c5d63] md:text-xl">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="surface-panel flex flex-col gap-6 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div className="flex flex-wrap items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8b92]">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  8 min read
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  {post.autor || 'Carlos Cervantes'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[#fafafa] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5c5d63]">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </span>
                <a
                  href={xShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111113] transition-all hover:border-[#0071e3] hover:text-[#0071e3]"
                >
                  <X className="h-4 w-4" />
                  X
                </a>
                <a
                  href={linkedInShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111113] transition-all hover:border-[#0071e3] hover:text-[#0071e3]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="pb-24 pt-10 md:pt-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article className="surface-panel overflow-hidden p-0">
            {post.imagen_portada ? (
              <div className="aspect-[21/9] w-full overflow-hidden border-b border-black/[0.06] bg-[#f2f4f7]">
                <img src={post.imagen_portada} alt={post.titulo} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex aspect-[21/8] items-end border-b border-black/[0.06] bg-[linear-gradient(180deg,#f8f9fb_0%,#eef2f6_100%)] p-8 md:p-10">
                <div className="space-y-3">
                  <span className="eyebrow">Technical article</span>
                  <p className="max-w-xl text-sm leading-relaxed text-[#5c5d63]">
                    Practical ideas on software quality, automation, and performance engineering for teams that need to scale with confidence.
                  </p>
                </div>
              </div>
            )}

            <div className="px-6 py-10 md:px-12 md:py-14">
              <div
                className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.04em] prose-headings:text-[#111113] prose-p:text-[#5c5d63] prose-p:leading-[1.9] prose-a:text-[#0071e3] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#111113] prose-code:rounded prose-code:bg-[#0071e3]/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#0071e3] prose-pre:rounded-[24px] prose-pre:bg-[#111827] prose-pre:shadow-none prose-img:rounded-[28px] prose-img:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
                dangerouslySetInnerHTML={{ __html: post.contenido }}
              />
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="surface-card p-6">
              <span className="eyebrow">Author</span>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20 shadow-md">
                  <img
                    src="/images/profile.jpg"
                    alt="Carlos Cervantes"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111113]">Carlos Cervantes</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8a8b92]">QA & Performance</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5c5d63]">
                QA automation and performance engineering specialist. I share learnings about automation, testing, performance, and more reliable systems.
              </p>
            </div>

            <div className="surface-card p-6">
              <span className="eyebrow">Next step</span>
              <p className="mt-4 text-sm leading-relaxed text-[#5c5d63]">
                If this article connects with your current challenge, we can review your quality flow and detect where to improve coverage, speed, and release confidence.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/servicios" className="btn-base btn-primary justify-center">
                  View services
                </Link>
                <Link href="/contacto" className="btn-base btn-secondary justify-center">
                  Let's talk
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
