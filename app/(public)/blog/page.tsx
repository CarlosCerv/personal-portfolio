import React from 'react'
import { createClient } from '@/lib/supabase/server'
import {
  getFallbackPosts,
  getMongoPosts,
  mergePublicPosts,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

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
      <main className="min-h-screen bg-background-alt pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog QA & Tech</h1>
        <p className="mt-4 text-muted-foreground">Próximamente más contenido de valor...</p>
      </main>
    )
  }

  const featured = posts[0]
  const others = posts.slice(1)

  return (
    <main className="min-h-screen bg-background-alt pt-40 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        {/* Blog Header */}
        <div className="text-center md:text-left space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#0071e3]">Contenido Técnico</span>
          <h1 className="text-6xl font-black tracking-tighter text-foreground">El Blog de Carlos.</h1>
          <p className="text-xl text-secondary-muted max-w-2xl leading-relaxed">
            Explora guías sobre automatización, performance engineering y reflexiones sobre la cultura de calidad en ingeniería de software.
          </p>
        </div>

        {/* Featured Post */}
        <section className="group">
          <Link href={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl transition-all h-full">
            <div className="aspect-[16/9] lg:aspect-auto h-full bg-slate-100 overflow-hidden relative">
              {featured.imagen_portada ? (
                <img src={featured.imagen_portada} alt={featured.titulo} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <FileText className="w-20 h-20" />
                </div>
              )}
            </div>
            <div className="p-8 lg:p-12 space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{featured.categoria}</span>
              <h2 className="text-4xl font-black tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">{featured.titulo}</h2>
              <p className="text-lg text-secondary-muted line-clamp-3 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-6 pt-4 text-xs font-bold text-muted uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(featured.published_at), 'dd MMM yyyy', { locale: es })}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 min read</div>
                <div className="flex items-center gap-1.5 text-primary ml-auto group-hover:translate-x-2 transition-transform">LEER MÁS <ArrowRight className="w-4 h-4" /></div>
              </div>
            </div>
          </Link>
        </section>

        {/* Others Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white border border-border rounded-[24px] overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-video bg-slate-100 overflow-hidden relative">
                {post.imagen_portada ? (
                  <img src={post.imagen_portada} alt={post.titulo} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FileText className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{post.categoria}</span>
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-tight">{post.titulo}</h3>
                <p className="text-sm text-secondary-muted line-clamp-3 flex-1 mb-8">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-[10px] font-black text-muted uppercase tracking-widest pt-4 border-t border-border/50">
                   {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}
                   <span className="text-primary group-hover:translate-x-1 transition-all">Leer →</span>
                </div>
              </div>
            </Link>
          ))}
        </section>

      </div>
    </main>
  )
}
