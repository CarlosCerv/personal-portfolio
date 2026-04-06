'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Save, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Check, 
  Loader2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProfileAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('site_profile').select('*').single()
    if (!error && data) {
      setProfile(data)
    } else {
      // Default empty profile
      setProfile({
        nombre: 'Carlos Cervantes',
        titulo: 'Senior QA Automation Engineer',
        empresa: 'Wizeline',
        ubicacion: 'Guadalajara, México',
        bio_1: '',
        bio_2: '',
        foto_url: '',
        roles: [{ label: 'QA Automation', color: '#0071e3' }],
        skills: { Mobile: [], Web: [], Cloud: [], Tools: [] },
        experiencia: [],
        certificaciones: [],
        disponible: true
      })
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const { error } = await supabase.from('site_profile').upsert(profile)
    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  const addExperience = () => {
    const newExp = {
      id: Math.random().toString(36).substr(2, 9),
      periodo: '2024 — Presente',
      rol: 'Nuevo Rol',
      empresa: 'Nombre Empresa',
      descripcion: '',
      tags: []
    }
    setProfile({ ...profile, experiencia: [newExp, ...profile.experiencia] })
  }

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = profile.experiencia.map((ex: any) => 
      ex.id === id ? { ...ex, [field]: value } : ex
    )
    setProfile({ ...profile, experiencia: updated })
  }

  const removeExperience = (id: string) => {
    setProfile({ ...profile, experiencia: profile.experiencia.filter((ex: any) => ex.id !== id) })
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="space-y-10 pb-20">
      {/* Header with Save */}
      <div className="flex items-center justify-between sticky top-[65px] bg-background-alt/80 backdrop-blur-md z-20 py-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestionar Perfil</h1>
          <p className="text-secondary-muted text-sm mt-1 uppercase tracking-widest font-bold">Última actualización: {new Date(profile.updated_at || Date.now()).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-green-600 flex items-center gap-2 text-sm font-bold"
              >
                <Check className="w-4 h-4" /> Guardado
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={handleSave}
            className="admin-btn-primary flex items-center gap-2"
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Guardando...' : 'Publicar cambios'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <section className="admin-card p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> Información básica
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Nombre</label>
                <input 
                  type="text" 
                  value={profile.nombre} 
                  onChange={e => setProfile({...profile, nombre: e.target.value})}
                  className="w-full mt-1 p-2 bg-background-alt border border-border rounded-lg outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Título</label>
                <input 
                  type="text" 
                  value={profile.titulo} 
                  onChange={e => setProfile({...profile, titulo: e.target.value})}
                  className="w-full mt-1 p-2 bg-background-alt border border-border rounded-lg outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Empresa</label>
                  <input 
                    type="text" 
                    value={profile.empresa} 
                    onChange={e => setProfile({...profile, empresa: e.target.value})}
                    className="w-full mt-1 p-2 bg-background-alt border border-border rounded-lg outline-none focus:border-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Ubicación</label>
                  <input 
                    type="text" 
                    value={profile.ubicacion} 
                    onChange={e => setProfile({...profile, ubicacion: e.target.value})}
                    className="w-full mt-1 p-2 bg-background-alt border border-border rounded-lg outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={profile.disponible} 
                  onChange={e => setProfile({...profile, disponible: e.target.checked})}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm font-semibold">Disponible para proyectos</span>
              </label>
            </div>
          </section>

          <section className="admin-card p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Bio & Story
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Bio (Párrafo 1)</label>
                <textarea 
                  rows={4} 
                  value={profile.bio_1} 
                  onChange={e => setProfile({...profile, bio_1: e.target.value})}
                  className="w-full mt-1 p-3 bg-background-alt border border-border rounded-lg outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Bio (Párrafo 2)</label>
                <textarea 
                  rows={4} 
                  value={profile.bio_2} 
                  onChange={e => setProfile({...profile, bio_2: e.target.value})}
                  className="w-full mt-1 p-3 bg-background-alt border border-border rounded-lg outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Skills & Experience */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="admin-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" /> Experiencia Laboral
              </h3>
              <button 
                onClick={addExperience}
                className="admin-btn-outline text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Agregar
              </button>
            </div>

            <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/50">
              <AnimatePresence initial={false}>
                {profile.experiencia.map((ex: any) => (
                  <motion.div 
                    layout
                    key={ex.id} 
                    className="relative pl-10 group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="absolute left-0 top-[6px] w-[24px] h-[24px] bg-white border-2 border-primary rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-md">
                      <div className="w-[8px] h-[8px] bg-primary rounded-full" />
                    </div>
                    
                    <div className="p-5 border border-border rounded-xl bg-background-alt/30 hover:bg-white hover:shadow-lg transition-all space-y-4">
                      <div className="flex flex-wrap gap-4 items-start justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Periodo</label>
                            <input 
                              type="text" 
                              value={ex.periodo} 
                              onChange={e => updateExperience(ex.id, 'periodo', e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Rol</label>
                            <input 
                              type="text" 
                              value={ex.rol} 
                              onChange={e => updateExperience(ex.id, 'rol', e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Empresa</label>
                            <input 
                              type="text" 
                              value={ex.empresa} 
                              onChange={e => updateExperience(ex.id, 'empresa', e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => removeExperience(ex.id)}
                          className="hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div>
                        <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">Descripción de logros</label>
                        <textarea 
                          rows={2}
                          value={ex.descripcion} 
                          onChange={e => updateExperience(ex.id, 'descripcion', e.target.value)}
                          placeholder="Implementé suite E2E reduciendo tiempos de regresión en un 40%..."
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 resize-none"
                        />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground mr-2">TECH STACK:</span>
                        {(ex.tags || []).map((tag: string, tidx: number) => (
                          <div key={tidx} className="bg-white px-2 py-0.5 border border-border rounded-md text-[10px] font-bold flex items-center gap-1 group/tag shadow-sm">
                            {tag}
                            <button 
                              onClick={() => {
                                const newTags = ex.tags.filter((_: any, i: any) => i !== tidx)
                                updateExperience(ex.id, 'tags', newTags)
                              }}
                              className="opacity-0 group-hover/tag:opacity-100 hover:text-red-500 transition-all"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button 
                          className="text-primary hover:text-primary-hover p-1 rounded-full hover:bg-primary/5 transition-all"
                          onClick={() => {
                            const tag = window.prompt("Agregar Tecnología:")
                            if(tag) updateExperience(ex.id, 'tags', [...(ex.tags || []), tag])
                          }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="admin-card p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
              <Globe className="w-6 h-6 text-primary" /> Skills de Ingeniería
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.keys(profile.skills).map((cat) => (
                <div key={cat} className="space-y-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">{cat}</h4>
                  <div className="flex flex-wrap gap-2 p-3 bg-background-alt/50 border border-border rounded-2xl min-h-[60px] content-start">
                    {profile.skills[cat].map((s: string, idx: number) => (
                      <div key={idx} className="bg-white px-3 py-1 border border-border rounded-full text-sm font-medium flex items-center gap-2 group/skill shadow-sm">
                        {s}
                        <button 
                          onClick={() => {
                            const updated = { ...profile.skills, [cat]: profile.skills[cat].filter((_: any, i: any) => i !== idx) }
                            setProfile({ ...profile, skills: updated })
                          }}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const skill = window.prompt(`Agregar skill en ${cat}:`)
                        if(skill) {
                          const updated = { ...profile.skills, [cat]: [...profile.skills[cat], skill] }
                          setProfile({ ...profile, skills: updated })
                        }
                      }}
                      className="bg-primary/5 border border-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-primary/10 transition-all border-dashed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
