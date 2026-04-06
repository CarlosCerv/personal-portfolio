import React from 'react'
import { 
  Users, 
  Eye, 
  UserPlus, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  LogOut
} from 'lucide-react'

const STATS = [
  { 
    label: 'Visitantes hoy', 
    value: '1,284', 
    change: '+12%', 
    trend: 'up', 
    icon: Users 
  },
  { 
    label: 'Páginas vistas / semana', 
    value: '45.2K', 
    change: '+5%', 
    trend: 'up', 
    icon: Eye 
  },
  { 
    label: 'Leads del diagnóstico', 
    value: '24', 
    change: '-2%', 
    trend: 'down', 
    icon: UserPlus 
  },
  { 
    label: 'Tiempo promedio', 
    value: '3m 42s', 
    change: '+18%', 
    trend: 'up', 
    icon: Clock 
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo, Carlos.</h1>
        <p className="text-secondary-muted mt-1 text-base">Esto es lo que ha pasado en tu portafolio en las últimas 24 horas.</p>
      </div>

      {/* ROW 1: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon
          const isUp = stat.trend === 'up'
          
          return (
            <div key={idx} className="admin-card p-6 flex flex-col justify-between group hover:border-primary transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-background-alt rounded-lg text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                  {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-secondary-muted uppercase tracking-wider">{stat.label}</h3>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ROW 2: Graph Placeholder */}
      <div className="grid grid-cols-1 gap-6">
        <div className="admin-card p-8 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Actividad del sitio</h3>
              <p className="text-sm text-secondary-muted mt-0.5">Visitantes únicos vs. Páginas vistas</p>
            </div>
            <div className="flex items-center gap-2 bg-background-alt p-1 rounded-lg">
              <button className="px-3 py-1.5 text-xs font-semibold bg-white shadow-sm rounded-md border border-border">Últimos 30 días</button>
              <button className="px-3 py-1.5 text-xs font-semibold hover:bg-white rounded-md transition-all">Últimos 7 días</button>
            </div>
          </div>
          
          {/* Main Chart Area */}
          <div className="flex-1 bg-background-alt rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-border/50 text-secondary-muted space-y-4">
            <div className="p-4 bg-white rounded-full shadow-sm">
              <LogOut className="w-8 h-8 opacity-20 -rotate-90" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Gráficas disponibles próximamente</p>
              <p className="text-xs max-w-[240px] mt-1 line-clamp-2">Conectando con la API de Vercel Analytics para traer datos de tráfico real en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Two-Column Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h3 className="font-bold mb-4">Páginas más visitadas</h3>
          <div className="space-y-4">
            {[
              { path: '/', views: '1,240', bounce: '12%' },
              { path: '/blog/optimizing-qa-workflows', views: '840', bounce: '24%' },
              { path: '/servicios', views: '620', bounce: '8%' },
              { path: '/profile', views: '410', bounce: '15%' },
            ].map((page, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-background-alt rounded-lg transition-colors border border-transparent hover:border-border">
                <span className="text-sm font-medium font-mono text-primary truncate">{page.path}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold">{page.views}</p>
                    <p className="text-[10px] text-secondary-muted">visitas</p>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="text-right">
                    <p className="text-xs font-bold text-green-600">{page.bounce}</p>
                    <p className="text-[10px] text-secondary-muted">bounce</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card p-6">
          <h3 className="font-bold mb-4">Leads por calificar</h3>
          <div className="space-y-4">
            {[
              { name: 'Marcos R.', score: 85, pkg: 'Automatización', ago: '2h' },
              { name: 'Diana G.', score: 92, pkg: 'Performance', ago: '5h' },
              { name: 'Software Inc.', score: 78, pkg: 'Diagnóstico QA', ago: '1d' },
            ].map((lead, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {lead.score}%
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{lead.name}</p>
                  <p className="text-[10px] text-secondary-muted uppercase tracking-wider">{lead.pkg}</p>
                </div>
                <span className="text-xs text-muted font-medium">{lead.ago}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-all">Ver todos los leads →</button>
        </div>
      </div>
    </div>
  )
}
