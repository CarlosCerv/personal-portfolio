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
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
        
        {/* Hero Section */}
        <div className="surface-panel max-w-5xl mx-auto px-8 py-12 text-center md:px-12 md:py-16">
          <div className="space-y-6">
          <span className="eyebrow inline-flex items-center justify-center gap-2 text-[#111113]">
            <Radio className="w-4 h-4 animate-pulse" /> Podcast Studio
          </span>
          <h1 className="text-[42px] md:text-[60px] font-semibold tracking-[-0.05em] text-[#111113] leading-[1.02]">
            Quality, automation and performance <br className="hidden md:block"/>with real judgment.
          </h1>
          <p className="mx-auto max-w-2xl text-[17px] md:text-[19px] text-[#5c5d63] leading-[1.8]">
            An editorial proposal to share QA, delivery and professional growth learnings with a technical and accessible format.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
             <a href="#latests" className="btn-base btn-primary px-8 py-3.5 text-[15px]">Listen to Episodes</a>
             <a href="/blog" className="btn-base btn-secondary px-8 py-3.5 text-[15px]">Explore Articles</a>
          </div>
          </div>
        </div>

        {/* Concept Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <article className="surface-panel p-8 md:p-10 space-y-6">
              <div className="w-12 h-12 bg-[#fafafa] rounded-2xl flex items-center justify-center text-[#1d1d1f]">
                 <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-[24px] font-semibold tracking-[-0.03em] text-[#111113]">Short and actionable episodes</h3>
              <p className="text-[16px] text-[#5c5d63] font-medium leading-[1.8]">
                Each episode is designed to leave a concrete idea the team can apply to their stack, process or quality strategy. 12 to 20 minutes of pure value.
              </p>
              <ul className="space-y-3 pt-2">
                 {['Ideal duration: 15min', 'One real problem, one solution.', 'No corporate filler.'].map((li, i) => (
                   <li key={i} className="surface-card-soft flex items-center gap-3 rounded-[16px] px-4 py-3 text-[14px] font-semibold text-[#111113]">
                      <Check className="w-4 h-4 text-[#1d1d1f]" /> {li}
                   </li>
                 ))}
              </ul>
           </article>

           <article className="surface-panel p-8 md:p-10 space-y-6">
              <div className="w-12 h-12 bg-[#fafafa] rounded-2xl flex items-center justify-center text-[#1d1d1f]">
                 <Users className="w-6 h-6" />
              </div>
              <h3 className="text-[24px] font-semibold tracking-[-0.03em] text-[#111113]">Designed for leaders and engineers</h3>
              <p className="text-[16px] text-[#5c5d63] font-medium leading-[1.8]">
                The intent is to speak to both those who automate and those who prioritize risks or coordinate high-pressure releases.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                 {['QA Engineers', 'SDETs', 'Tech Leads', 'Product Teams'].map((chip) => (
                   <span key={chip} className="px-3 py-1.5 bg-[#fafafa] border border-black/[0.08] rounded-full text-[12px] font-medium text-[#1d1d1f]">{chip}</span>
                 ))}
              </div>
           </article>
        </section>

        {/* Latest Episodes Section */}
        <section id="latests" className="space-y-10">
           <div className="text-center md:text-left space-y-2">
              <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Latest Episodes</h2>
              <p className="text-[16px] text-[#6f6f77] font-medium">Updated weekly.</p>
           </div>

           {episodes && episodes.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {episodes.map((ep: any) => (
                  <article key={ep.id} className="group surface-panel overflow-hidden h-full flex flex-col">
                     <div className="aspect-video relative overflow-hidden bg-[#f5f5f7]">
                        {ep.imagen_portada ? (
                          <img src={ep.imagen_portada} alt={ep.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#6f6f77]">
                             <Mic2 className="w-16 h-16 opacity-30" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                           <div className="flex items-center gap-4 text-white/90 text-[11px] font-bold uppercase tracking-[0.1em]">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(ep.published_at), 'dd MMM yyyy', { locale: es })}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {ep.duracion || '15 min'}</span>
                           </div>
                        </div>
                     </div>
                     <div className="p-8 space-y-4 flex-1 flex flex-col">
                        <h3 className="text-[20px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#1d1d1f] transition-colors line-clamp-2">{ep.titulo}</h3>
                        <p className="text-[15px] text-[#6f6f77] line-clamp-3 leading-relaxed flex-1">{ep.descripcion}</p>
                        <div className="pt-6 flex items-center justify-between border-t border-black/[0.06] mt-auto">
                           <button className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#1d1d1f] group-hover:text-[#000000]">
                              <Play className="w-4 h-4 fill-current" /> Listen now
                           </button>
                           <ChevronRight className="w-5 h-5 text-[#6f6f77] group-hover:translate-x-1 group-hover:text-[#1d1d1f] transition-all" />
                        </div>
                     </div>
                  </article>
                ))}
             </div>
           ) : (
             <div className="surface-panel border-dashed p-16 md:p-24 text-center space-y-6">
                <div className="w-20 h-20 bg-[#fafafa] rounded-full flex items-center justify-center mx-auto">
                   <Headphones className="w-10 h-10 text-[#6f6f77]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[24px] font-bold text-[#1d1d1f]">Studio in preparation...</h3>
                  <p className="text-[16px] text-[#6f6f77] leading-relaxed max-w-sm mx-auto">We're fine-tuning the last details of the first season. Come back soon for episode 01.</p>
                </div>
                <div className="pt-6 flex flex-wrap justify-center gap-3">
                   <div className="flex items-center gap-2 px-5 py-2.5 bg-[#1db954]/10 text-[#1db954] rounded-full text-[11px] font-bold uppercase tracking-[0.1em]">Spotify</div>
                   <div className="flex items-center gap-2 px-5 py-2.5 bg-[#fa243c]/10 text-[#fa243c] rounded-full text-[11px] font-bold uppercase tracking-[0.1em]">Apple Podcasts</div>
                </div>
             </div>
           )}
        </section>

        {/* Editorial Topics */}
        <section className="surface-panel p-10 md:p-16 space-y-12">
            <div className="text-center space-y-2">
               <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f]">Editorial Lines</h2>
               <p className="text-[16px] text-[#6f6f77] font-medium">Topics we'll explore in depth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { t: 'Appium vs Native', d: 'Portability vs feedback speed in mobile automation.', tag: 'Mobile' },
                 { t: 'Real Quality Gates', d: 'How to design useful validations to avoid noise in CI/CD.', tag: 'CI/CD', s: true },
                 { t: 'Technical Leadership', d: 'From manual testing to coordinating elite quality strategies.', tag: 'Career' },
               ].map((topic, i) => (
                 <div key={i} className="p-8 border border-black/[0.06] bg-[#f5f5f7] rounded-[24px] space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all group">
                    <span className={cn("text-[10px] font-bold uppercase tracking-[0.1em]", topic.s ? "text-[#34c759]" : "text-[#1d1d1f]")}>{topic.tag}</span>
                    <h4 className="text-[20px] font-bold tracking-tight text-[#1d1d1f]">{topic.t}</h4>
                    <p className="text-[14px] text-[#6f6f77] leading-relaxed font-medium">{topic.d}</p>
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
