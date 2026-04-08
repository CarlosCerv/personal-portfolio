import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  getFallbackPostBySlug,
  getMongoPostBySlug,
  mergePublicPosts,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import { ArrowLeft, Award, Calendar, Clock, Share2 } from 'lucide-react'
import { LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

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
  const post = mergedPosts[0] || (await getFallbackPostBySlug(slug))

  if (!post) {
    return (
      <main className="min-h-screen bg-background-alt pt-40 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-[36px] border border-border bg-white p-10 text-center shadow-[0_30px_80px_rgba(15,23,42,0.06)] md:p-14">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Blog</span>
            <h1 className="mt-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
              Artículo no encontrado
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-secondary-muted">
              No pudimos encontrar esta publicación. Puede que el enlace haya cambiado o que el artículo ya no esté disponible.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-primary"
              >
                Volver al blog
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-xs font-black uppercase tracking-widest text-muted transition-all hover:text-foreground"
              >
                Contacto
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
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f8fb_0%,#f4f5f7_38%,#ffffff_100%)]">
      <header className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.08),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7f8fb_100%)] pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          <div className="mt-10 max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                {post.categoria}
              </span>
              {(post.tags || []).slice(0, 3).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="rounded-full border border-border bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-foreground md:text-7xl">
                {post.titulo}
              </h1>
              {post.excerpt ? (
                <p className="max-w-3xl text-lg leading-relaxed text-secondary-muted md:text-xl">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-6 rounded-[28px] border border-white/80 bg-white/88 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-6">
              <div className="flex flex-wrap items-center gap-5 text-[11px] font-black uppercase tracking-[0.2em] text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  8 min lectura
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  {post.autor || 'Carlos Cervantes'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-alt px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted">
                  <Share2 className="h-3.5 w-3.5" />
                  Compartir
                </span>
                <a
                  href={xShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <X className="h-4 w-4" />
                  X
                </a>
                <a
                  href={linkedInShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-foreground transition-all hover:border-primary hover:text-primary"
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
          <article className="overflow-hidden rounded-[34px] border border-border/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
            {post.imagen_portada ? (
              <div className="aspect-[21/9] w-full overflow-hidden border-b border-border/70 bg-[#f2f4f7]">
                <img src={post.imagen_portada} alt={post.titulo} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex aspect-[21/8] items-end border-b border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.12),transparent_22%),linear-gradient(180deg,#f7f9fc_0%,#eef2f7_100%)] p-8 md:p-10">
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Artículo técnico</span>
                  <p className="max-w-xl text-sm leading-relaxed text-secondary-muted">
                    Ideas prácticas sobre calidad de software, automatización y performance engineering para equipos que necesitan escalar con confianza.
                  </p>
                </div>
              </div>
            )}

            <div className="px-6 py-10 md:px-12 md:py-14">
              <div
                className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-[-0.04em] prose-headings:text-foreground prose-p:text-secondary-muted prose-p:leading-[1.9] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:rounded prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-pre:rounded-[24px] prose-pre:bg-[#111827] prose-pre:shadow-none prose-img:rounded-[28px] prose-img:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
                dangerouslySetInnerHTML={{ __html: post.contenido }}
              />
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Autor</span>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-sm font-black uppercase text-primary">
                  CC
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Carlos Cervantes</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">QA & Performance Consultant</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-secondary-muted">
                Comparto aprendizajes sobre automatización, performance, estrategia QA y sistemas más confiables para producto.
              </p>
            </div>

            <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Siguiente paso</span>
              <p className="mt-4 text-sm leading-relaxed text-secondary-muted">
                Si este artículo conecta con tu reto actual, podemos revisar tu flujo de calidad y detectar dónde mejorar cobertura, velocidad y confianza de release.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-primary"
                >
                  Ver servicios
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-muted transition-all hover:text-foreground"
                >
                  Hablemos
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
