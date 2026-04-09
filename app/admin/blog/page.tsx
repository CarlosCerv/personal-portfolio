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
    <div className="space-y-6 md:space-y-8 pb-16 md:pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">Blog CMS</h1>
          <p className="text-secondary-muted mt-1 text-sm md:text-base truncate">Gestiona tus artículos, guías técnicas y opiniones.</p>
        </div>
        <Link href="/admin/blog/nuevo" className="admin-btn-primary flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 md:px-6 whitespace-nowrap flex-shrink-0">
          <Plus className="w-4 md:w-5 h-4 md:h-5" /> 
          <span className="hidden sm:inline">Nuevo artículo</span>
          <span className="sm:hidden">Nuevo</span>
        </Link>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Total Post', value: stats.total, icon: FileText, color: 'text-primary' },
          { label: 'Publicados', value: stats.published, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Borradores', value: stats.drafts, icon: FileEdit, color: 'text-amber-500' },
          { label: 'Vistas', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'text-purple-500' },
        ].map((s, idx) => (
          <div key={idx} className="admin-card p-3 md:p-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className={`p-2 md:p-3 bg-background-alt rounded-lg md:rounded-xl flex-shrink-0 ${s.color}`}>
              <s.icon className="w-4 md:w-5 h-4 md:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-widest truncate">{s.label}</p>
              <p className="text-lg md:text-xl font-bold truncate">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between bg-white p-3 md:p-4 rounded-lg md:rounded-2xl border border-border">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 md:pr-4 py-2 bg-background-alt border border-transparent rounded-lg md:rounded-xl outline-none focus:border-primary transition-all text-xs md:text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter className="w-4 h-4 text-muted hidden md:block" />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 bg-background-alt border border-transparent rounded-lg md:rounded-xl outline-none text-xs md:text-sm font-medium focus:border-primary transition-all"
          >
            <option value="all">Todos</option>
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
            <option value="programado">Programado</option>
          </select>
        </div>
      </div>

      {/* Posts Table - Responsive wrapper */}
      <div className="admin-card shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-background-alt/50 border-b border-border">
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider">Artículo</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider hidden sm:table-cell">Categoría</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider">Estado</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider hidden md:table-cell">Fecha</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider text-right hidden sm:table-cell">Visitas</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-3 md:px-6 py-12 md:py-20 text-center">
                    <Loader2 className="w-6 md:w-8 h-6 md:h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 md:px-6 py-12 md:py-20 text-center text-xs md:text-sm text-muted">
                    No se encontraron artículos.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="group hover:bg-background-alt/30 transition-colors">
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-8 md:w-12 h-8 md:h-12 bg-background-alt rounded border border-border overflow-hidden flex-shrink-0">
                          {post.imagen_portada ? (
                            <img src={post.imagen_portada} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted bg-background-alt">
                              <FileText className="w-4 md:w-6 h-4 md:h-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs md:text-sm truncate">{post.titulo}</p>
                          <p className="text-[10px] md:text-xs text-muted font-mono mt-0.5 truncate italic hidden sm:block">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider inline-block max-w-full truncate">
                        {post.categoria || 'Sin cat.'}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          post.estado === 'publicado' ? "bg-green-500" :
                          post.estado === 'borrador' ? "bg-slate-300" : "bg-blue-500"
                        )} />
                        <span className="text-[10px] md:text-xs font-semibold capitalize truncate">{post.estado}</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-muted">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="hidden lg:inline">{format(new Date(post.created_at), 'dd MMM, yyyy', { locale: es })}</span>
                        <span className="lg:hidden">{format(new Date(post.created_at), 'dd/MM/yy', { locale: es })}</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-right hidden sm:table-cell">
                      <div className="flex items-center justify-end gap-1 md:gap-1.5 font-bold tabular-nums text-[10px] md:text-xs">
                        <Eye className="w-3 h-3 flex-shrink-0 text-muted" />
                        {post.visitas || 0}
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-3 md:py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/blog/${post.id}/editar`}
                          className="p-1.5 md:p-2 hover:bg-white rounded border border-transparent hover:border-border transition-all flex-shrink-0"
                          title="Editar"
                        >
                          <Edit3 className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" />
                        </Link>
                        <button 
                          className="p-1.5 md:p-2 hover:bg-white rounded border border-transparent hover:border-border transition-all hover:text-red-500 flex-shrink-0"
                          title="Eliminar"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
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
    </div>
  )
}
