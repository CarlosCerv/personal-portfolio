import React from 'react'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  Award
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const revalidate = 3600 // every hour

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) return <div className="p-40 text-center text-4xl font-black">Artículo no encontrado</div>

  return (
    <main className="min-h-screen bg-white">
      {/* Post Header */}
      <header className="pt-40 pb-20 bg-background-alt border-b border-border">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </Link>
          
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#0071e3]">{post.categoria}</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
              {post.titulo}
            </h1>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-black text-muted uppercase tracking-widest">
             <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}</div>
             <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</div>
             <div className="flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Compartir</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-16 py-20 relative">
        
        {/* Left: Sticky Social Shares */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-fit space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">Autor</p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">CC</div>
               <div>
                  <p className="text-sm font-bold">Carlos Cervantes</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">QA Consultant</p>
               </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">Compartir</p>
            <div className="flex flex-col gap-2">
               <button className="flex items-center gap-3 p-3 bg-background-alt hover:bg-primary/5 rounded-xl text-sm font-bold transition-all"><Twitter className="w-4 h-4" /> Twitter / X</button>
               <button className="flex items-center gap-3 p-3 bg-background-alt hover:bg-primary/5 rounded-xl text-sm font-bold transition-all"><Linkedin className="w-4 h-4" /> LinkedIn</button>
               <button className="flex items-center gap-3 p-3 bg-background-alt hover:bg-primary/5 rounded-xl text-sm font-bold transition-all"><Facebook className="w-4 h-4" /> Facebook</button>
            </div>
          </div>
        </aside>

        {/* Center: Content */}
        <article className="lg:col-span-3 lg:max-w-3xl">
          {post.imagen_portada && (
            <div className="aspect-[21/9] bg-slate-100 rounded-[32px] overflow-hidden mb-16 shadow-2xl">
               <img src={post.imagen_portada} alt={post.titulo} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-a:text-primary prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-pre:bg-secondary prose-img:rounded-3xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: post.contenido }}
          />

          <div className="mt-20 pt-10 border-t border-border space-y-10">
             <div className="flex items-center gap-2">
                <Award className="w-8 h-8 text-primary" />
                <p className="text-xl font-bold italic tracking-tight text-secondary-muted">¿Te sirvió este contenido? Compártelo o hablemos en redes.</p>
             </div>
          </div>
        </article>
      </div>

    </main>
  )
}
