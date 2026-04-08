import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { 
  Mic2, 
  Play, 
  Clock, 
  Users, 
  Target, 
  Radio, 
  ChevronRight,
  Headphones,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export const revalidate = 3600 // every hour

export default async function PublicPodcast() {
  const supabase = await createClient()
  const episodes = supabase
    ? (await supabase
        .from('podcast_episodes')
        .select('*')
        .eq('estado', 'publicado')
        .order('published_at', { ascending: false })).data
    : []

  return (
    <main className="min-h-screen bg-background-alt pt-40 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-2">
            <Radio className="w-4 h-4 animate-pulse" /> Podcast Studio
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
            Calidad, automatización y performance con criterio real.
          </h1>
          <p className="text-xl text-secondary-muted leading-relaxed">
            Una propuesta editorial para compartir aprendizajes de QA, delivery y crecimiento profesional con un formato técnico y accesible.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
             <a href="#latests" className="bg-foreground text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-black/10">Escuchar Episodios</a>
             <a href="/blog" className="px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest text-muted hover:text-foreground">Explorar Artículos</a>
          </div>
        </div>

        {/* Concept Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <article className="bg-white p-10 rounded-[32px] border border-border shadow-sm space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                 <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Episodios cortos y accionables</h3>
              <p className="text-secondary-muted font-medium leading-relaxed">
                Cada episodio está pensado para dejar una idea concreta que el equipo pueda aplicar en su stack, proceso o estrategia de calidad. 12 a 20 minutos de valor puro.
              </p>
              <ul className="space-y-3">
                 {['Duración ideal: 15min', 'Un problema real, una solución.', 'Sin relleno corporativo.'].map((li, i) => (
                   <li key={i} className="flex items-center gap-2 text-xs font-bold text-muted">
                      <Check className="w-3 h-3 text-primary" /> {li}
                   </li>
                 ))}
              </ul>
           </article>

           <article className="bg-[#1d1d1f] p-10 rounded-[32px] text-white space-y-6 shadow-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                 <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Pensado para líderes e ingenieros</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                La intención es hablarle tanto a quien automatiza como a quien prioriza riesgos o coordina releases de alta presión.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                 {['QA Engineers', 'SDETs', 'Tech Leads', 'Product Teams'].map(chip => (
                   <span key={chip} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">{chip}</span>
                 ))}
              </div>
           </article>
        </section>

        {/* Latest Episodes Section */}
        <section id="latests" className="space-y-12">
           <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Últimos Episodios</h2>
              <p className="text-secondary-muted font-medium">Actualizado semanalmente.</p>
           </div>

           {episodes && episodes.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {episodes.map((ep: any) => (
                  <article key={ep.id} className="group bg-white rounded-[32px] border border-border overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col">
                     <div className="aspect-video relative overflow-hidden bg-slate-100">
                        {ep.imagen_portada ? (
                          <img src={ep.imagen_portada} alt={ep.titulo} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                             <Mic2 className="w-20 h-20" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                           <div className="flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-widest">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(ep.published_at), 'dd MMM yyyy', { locale: es })}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ep.duracion || '15 min'}</span>
                           </div>
                        </div>
                     </div>
                     <div className="p-8 space-y-4 flex-1">
                        <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{ep.titulo}</h3>
                        <p className="text-sm text-secondary-muted line-clamp-2 leading-relaxed">{ep.descripcion}</p>
                        <div className="pt-6 flex items-center justify-between">
                           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                              <Play className="w-4 h-4 fill-primary" /> Escuchar ahora
                           </button>
                           <ChevronRight className="w-5 h-5 text-border group-hover:translate-x-1 transition-transform" />
                        </div>
                     </div>
                  </article>
                ))}
             </div>
           ) : (
             <div className="bg-white border border-border border-dashed rounded-[32px] p-20 text-center space-y-6">
                <div className="w-20 h-20 bg-background-alt rounded-full flex items-center justify-center mx-auto">
                   <Headphones className="w-10 h-10 text-muted" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black">Estudio en preparación...</h3>
                  <p className="text-secondary-muted font-medium max-w-sm mx-auto">Estamos afinando los últimos detalles de la primera temporada. Regresa pronto para el episodio 01.</p>
                </div>
                <div className="pt-4 flex justify-center gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#1db954]/10 text-[#1db954] rounded-full text-[10px] font-black uppercase tracking-widest">Spotify</div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-[#fa243c]/10 text-[#fa243c] rounded-full text-[10px] font-black uppercase tracking-widest">Apple Podcasts</div>
                </div>
             </div>
           )}
        </section>

        {/* Editorial Topics */}
        <section className="bg-white rounded-[40px] border border-border p-12 space-y-12">
            <div className="text-center space-y-2">
               <h2 className="text-3xl font-black tracking-tight">Líneas Editoriales</h2>
               <p className="text-secondary-muted font-medium">Temas que exploraremos a fondo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { t: 'Appium vs Nativo', d: 'Portabilidad vs velocidad de feedback en automatización móvil.', tag: 'Mobile' },
                 { t: 'Quality Gates reales', d: 'Cómo diseñar validaciones útiles para evitar ruido en CI/CD.', tag: 'CI/CD', s: true },
                 { t: 'Liderazgo Técnico', d: 'De testing manual a coordinar estrategias de calidad de élite.', tag: 'Carrera' },
               ].map((topic, i) => (
                 <div key={i} className="p-8 border border-border bg-background-alt rounded-3xl space-y-4 hover:shadow-lg transition-all group">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", topic.s ? "text-green-500" : "text-primary")}>{topic.tag}</span>
                    <h4 className="text-xl font-black tracking-tight group-hover:text-primary transition-all">{topic.t}</h4>
                    <p className="text-xs text-muted font-semibold leading-relaxed">{topic.d}</p>
                 </div>
               ))}
            </div>
        </section>

      </div>
    </main>
  )
}

function Check({ className }: { className?: string }) {
  return <div className={cn("w-4 h-4", className)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="20 6 9 17 4 12" /></svg></div>
}
