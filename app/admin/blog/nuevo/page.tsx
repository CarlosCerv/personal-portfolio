'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Save, 
  Eye, 
  ChevronLeft, 
  Layout, 
  Link as LinkIcon, 
  Search, 
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
  Settings
} from 'lucide-react'
import { Editor } from '@/components/admin/ui/editor'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [post, setPost] = useState({
    titulo: '',
    slug: '',
    contenido: '',
    excerpt: '',
    imagen_portada: '',
    categoria: 'QA',
    tags: [],
    estado: 'borrador',
    og_title: '',
    og_description: ''
  })

  useEffect(() => {
    // Generate slug from title
    const slug = post.titulo
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    setPost(prev => ({ ...prev, slug }))
  }, [post.titulo])

  const handleSave = async (published: boolean = false) => {
    setLoading(true)
    const supabase = createClient()
    
    const finalPost = {
      ...post,
      estado: published ? 'publicado' : post.estado,
      published_at: published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from('blog_posts').insert(finalPost)
    
    if (!error) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/blog')
      }, 1500)
    } else {
      console.error(error)
      alert('Error al guardar: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background-alt">
      {/* Editor Top Bar */}
      <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-background-alt rounded-lg transition-colors text-muted hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="font-bold tracking-tight text-sm">Nuevo Artículo</h1>
          <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${post.estado === 'publicado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {post.estado}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave(false)}
            disabled={loading}
            className="admin-btn-outline text-xs px-4 py-2 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar borrador
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={loading}
            className="admin-btn-primary text-xs px-4 py-2 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Publicar artículo
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto bg-white p-6 md:p-12 lg:p-20">
          <div className="max-w-[720px] mx-auto space-y-12">
            
            {/* Title Input */}
            <textarea
              placeholder="Título del artículo..."
              rows={1}
              value={post.titulo}
              onChange={e => setPost({...post, titulo: e.target.value})}
              className="w-full text-5xl font-black tracking-tighter border-none focus:ring-0 p-0 resize-none placeholder:text-slate-200 overflow-hidden"
              onInput={e => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = `${target.scrollHeight}px`
              }}
            />

            {/* Editor Component */}
            <div className="border-t border-border pt-12">
              <Editor 
                content={post.contenido} 
                onChange={html => setPost({...post, contenido: html})}
              />
            </div>
          </div>
        </main>

        {/* Settings & SEO Sidebar */}
        <aside className="w-full lg:w-96 border-l border-border bg-background-alt overflow-y-auto p-6 space-y-8">
          
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Settings className="w-3 h-3" /> Metadatos
            </h3>
            
            <div className="space-y-4 admin-card p-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Slug</label>
                <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 text-xs text-muted font-mono truncate italic">
                  <span className="opacity-50">/blog/</span>
                  <input 
                    type="text" 
                    value={post.slug} 
                    onChange={e => setPost({...post, slug: e.target.value})}
                    className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-foreground"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Categoría</label>
                <select 
                  value={post.categoria}
                  onChange={e => setPost({...post, categoria: e.target.value})}
                  className="w-full text-xs font-semibold px-3 py-2 border border-border rounded-lg outline-none bg-white"
                >
                  <option value="QA">Calidad & QA</option>
                  <option value="Automation">Automatización</option>
                  <option value="Performance">Performance</option>
                  <option value="Mobile">Mobile Testing</option>
                  <option value="Career">Carrera & Tech</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest px-1">Resumen (Excerpt)</label>
                <textarea 
                  rows={3}
                  maxLength={160}
                  value={post.excerpt}
                  onChange={e => setPost({...post, excerpt: e.target.value})}
                  className="w-full text-xs p-3 border border-border rounded-lg outline-none focus:border-primary resize-none"
                  placeholder="Pequeño resumen para la preventa del artículo..."
                />
                <div className="text-[10px] text-right text-muted">{post.excerpt.length} / 160</div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-3 h-3" /> Imagen de portada
            </h3>
            <div className="admin-card p-4 space-y-4">
              <div className="aspect-video bg-white border border-border rounded-lg overflow-hidden flex items-center justify-center relative group">
                {post.imagen_portada ? (
                  <>
                    <img src={post.imagen_portada} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setPost({...post, imagen_portada: ''})}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity font-bold text-xs"
                    >
                      Cambiar imagen
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      const url = window.prompt('URL de la imagen de portada:')
                      if(url) setPost({...post, imagen_portada: url})
                    }}
                    className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Añadir imagen</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> SEO Preview (Google)
            </h3>
            <div className="admin-card p-5 space-y-3">
              <div className="space-y-1">
                <p className="text-[14px] text-[#1a0dab] font-medium truncate hover:underline cursor-pointer">
                  {post.og_title || post.titulo || 'Título del artículo'} | Carlos Cervantes
                </p>
                <div className="text-[12px] text-[#006621] truncate flex items-center gap-1">
                  carloscervantes-qa.vercel.app <ChevronLeft className="w-3 h-3 rotate-180 -mt-0.5" /> blog <ChevronLeft className="w-3 h-3 rotate-180 -mt-0.5" /> <span className="opacity-70">{post.slug || 'url-slug'}</span>
                </div>
                <p className="text-[12px] text-[#4d5156] line-clamp-2 mt-1">
                  {post.og_description || post.excerpt || 'Empieza a escribir un resumen optimizado para SEO para que las personas encuentren tu contenido en Google.'}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border space-y-4">
                <input 
                  type="text" 
                  placeholder="Título personalizado SEO" 
                  value={post.og_title}
                  onChange={e => setPost({...post, og_title: e.target.value})}
                  className="w-full text-xs p-2 bg-white border border-border rounded-lg outline-none focus:border-primary"
                />
                <textarea 
                  rows={2}
                  placeholder="Descripción personalizada SEO" 
                  value={post.og_description}
                  onChange={e => setPost({...post, og_description: e.target.value})}
                  className="w-full text-xs p-2 bg-white border border-border rounded-lg outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </section>

        </aside>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-secondary text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 font-bold"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            ¡Artículo guardado correctamente!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
