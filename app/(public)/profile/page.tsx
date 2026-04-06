import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe,
  ExternalLink,
  Mail
} from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin, XIcon as X } from '@/components/public/icons'

// This page corresponds to the public /profile
export default async function PublicProfile() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('site_profile').select('*').single()

  if (!profile) return <div className="p-20 text-center">Perfil no encontrado</div>

  return (
    <main className="min-h-screen bg-background-alt pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
          <div className="w-48 h-48 rounded-full bg-border overflow-hidden shadow-2xl shrink-0 border-4 border-white">
            {profile.foto_url ? (
              <img src={profile.foto_url} alt={profile.nombre} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl">
                CC
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-foreground">{profile.nombre}</h1>
              <p className="text-xl font-medium text-secondary-muted mt-2">{profile.titulo} en <span className="text-primary">{profile.empresa}</span></p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm font-semibold text-secondary-muted">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {profile.ubicacion}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> {profile.disponible ? 'Disponible para proyectos' : 'Enfocado en proyectos actuales'}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {(profile.roles || []).map((role: any, i: number) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-full text-xs font-bold border"
                  style={{ borderColor: role.color + '40', color: role.color, backgroundColor: role.color + '10' }}
                >
                  {role.label}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-secondary-muted max-w-2xl">
              {profile.bio_1}
            </p>
          </div>
        </section>

        {/* Engineering Skills */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight">Engineering Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(profile.skills || {}).map(([category, skills]: [string, any]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xs font-bold text-muted uppercase tracking-widest">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-white px-3 py-1 border border-border rounded-lg text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black tracking-tight">Experiencia Profesional</h2>
          <div className="relative border-l-2 border-border pl-8 ml-4 space-y-16">
            {(profile.experiencia || []).map((ex: any, idx: number) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-background-alt border-2 border-primary rounded-full z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{ex.periodo}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{ex.rol}</h3>
                    <p className="text-base font-semibold text-secondary-muted">{ex.empresa}</p>
                  </div>
                  <p className="text-secondary-muted leading-relaxed max-w-2xl">
                    {ex.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(ex.tags || []).map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-widest text-muted border border-border px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications (Simulated for Now) */}
        <section className="bg-white border border-border rounded-3xl p-10 space-y-8">
          <div className="text-center space-y-2">
            <Award className="w-10 h-10 text-primary mx-auto" />
            <h2 className="text-3xl font-black tracking-tight">Certificaciones & Logros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(profile.certificaciones || []).map((cert: any, i: number) => (
              <div key={i} className="p-6 border border-border rounded-2xl hover:shadow-xl transition-all text-center space-y-3">
                <div className="w-12 h-12 bg-background-alt rounded-full mx-auto flex items-center justify-center">
                   <Award className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-sm">{cert.nombre}</h4>
                <p className="text-xs text-muted font-bold uppercase">{cert.institucion}</p>
              </div>
            ))}
            {/* Fallback if empty */}
            {(!profile.certificaciones || profile.certificaciones.length === 0) && (
              <div className="col-span-full py-10 text-center text-muted font-bold uppercase tracking-widest text-xs">
                Gestionando certificaciones en el panel...
              </div>
            )}
          </div>
        </section>

        {/* Footer Contact */}
        <section className="text-center space-y-10 pt-20">
          <p className="text-xl font-medium text-secondary-muted">¿Tienes un proyecto en mente? Hablemos.</p>
          <div className="flex justify-center gap-8">
            <a href="mailto:carlos.cervart@icloud.com" className="text-secondary hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            <a href="#" className="text-secondary hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="text-secondary hover:text-primary transition-colors"><X className="w-6 h-6" /></a>
            <a href="#" className="text-secondary hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
          </div>
        </section>

      </div>
    </main>
  )
}
