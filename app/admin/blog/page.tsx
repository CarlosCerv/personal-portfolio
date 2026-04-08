'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Eye, 
  Trash2, 
  Copy, 
  FileText,
  Loader2,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  FileEdit
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function BlogList() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    if (!supabase) {
      setPosts([])
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) setPosts(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!supabase) return
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (!error) fetchPosts()
  }

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.titulo.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || p.estado === filter
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.estado === 'publicado').length,
    drafts: posts.filter(p => p.estado === 'borrador').length,
    totalViews: posts.reduce((acc, p) => acc + (p.visitas || 0), 0)
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog CMS</h1>
          <p className="text-secondary-muted mt-1 text-base">Gestiona tus artículos, guías técnicas y opiniones.</p>
        </div>
        <Link href="/admin/blog/nuevo" className="admin-btn-primary flex items-center gap-2 py-3 px-6">
          <Plus className="w-5 h-5" /> Nuevo artículo
        </Link>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Post', value: stats.total, icon: FileText, color: 'text-primary' },
          { label: 'Publicados', value: stats.published, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Borradores', value: stats.drafts, icon: FileEdit, color: 'text-amber-500' },
          { label: 'Vistas Totales', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'text-purple-500' },
        ].map((s, idx) => (
          <div key={idx} className="admin-card p-5 flex items-center gap-4">
            <div className={`p-3 bg-background-alt rounded-xl ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background-alt border border-transparent rounded-xl outline-none focus:border-primary transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-muted hidden md:block" />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 md:w-40 px-3 py-2 bg-background-alt border border-transparent rounded-xl outline-none text-sm font-medium"
          >
            <option value="all">Todos los estados</option>
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
            <option value="programado">Programado</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="admin-card overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-alt/50 border-b border-border">
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Artículo</th>
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Categoría</th>
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Fecha</th>
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest text-right">Visitas</th>
              <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                </td>
              </tr>
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-muted">
                  No se encontraron artículos.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="group hover:bg-background-alt/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-background-alt rounded-lg border border-border overflow-hidden flex-shrink-0">
                        {post.imagen_portada ? (
                          <img src={post.imagen_portada} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted">
                            <FileText className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="max-w-xs md:max-w-md">
                        <p className="font-bold text-sm truncate">{post.titulo}</p>
                        <p className="text-xs text-muted font-mono mt-0.5 truncate italic">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {post.categoria || 'Sin categoría'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        post.estado === 'publicado' ? "bg-green-500" :
                        post.estado === 'borrador' ? "bg-slate-300" : "bg-blue-500"
                      )} />
                      <span className="text-xs font-semibold capitalize">{post.estado}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Clock className="w-3 h-3" />
                      {format(new Date(post.created_at), 'dd MMM, yyyy', { locale: es })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-bold tabular-nums">
                      <Eye className="w-3 h-3 text-muted" />
                      {post.visitas || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/blog/${post.id}/editar`}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border transition-all"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4 text-secondary" />
                      </Link>
                      <button 
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border transition-all hover:text-red-500"
                        title="Eliminar"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
