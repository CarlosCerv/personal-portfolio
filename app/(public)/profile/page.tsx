import React from 'react'
import { createClient } from '@/lib/supabase/server'
import {
  getFallbackPosts,
  getMongoPosts,
  mergePublicPosts,
  normalizePublicProfile,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileStats } from '@/components/profile/ProfileStats'
import { ProfileAbout } from '@/components/profile/ProfileAbout'
import { ProfileIdiomas } from '@/components/profile/ProfileIdiomas'
import { ProfileExperiencia } from '@/components/profile/ProfileExperiencia'
import { ProfileProyectos } from '@/components/profile/ProfileProyectos'
import { ProfileEducacion } from '@/components/profile/ProfileEducacion'
import { ProfileCertificaciones } from '@/components/profile/ProfileCertificaciones'
import { ProfileSkills } from '@/components/profile/ProfileSkills'
import { ProfilePublicaciones } from '@/components/profile/ProfilePublicaciones'
import { ProfileRecomendaciones } from '@/components/profile/ProfileRecomendaciones'
import { ProfileCTA } from '@/components/profile/ProfileCTA'

export const revalidate = 60

export default async function PublicProfile() {
  const supabase = await createClient()
  const [dbProfile, dbPosts, mongoPosts, fallbackPosts] = await Promise.all([
    supabase ? (await supabase.from('site_profile').select('*').single()).data : null,
    supabase
      ? (
          await supabase
            .from('blog_posts')
            .select('*')
            .eq('estado', 'publicado')
            .order('published_at', { ascending: false })
            .limit(3)
        ).data
      : null,
    getMongoPosts(),
    getFallbackPosts(),
  ])

  const profile = normalizePublicProfile(dbProfile)
  const mergedPosts = mergePublicPosts(
    (dbPosts || []).map(normalizeSupabasePost),
    mongoPosts,
    fallbackPosts
  ).slice(0, 3)

  const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://carloscervantes-qa.vercel.app'

  return (
    <main className="page-shell pt-10 pb-20 md:pt-12">
      <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-6 lg:space-y-10 lg:px-8">
        <ProfileHero profile={profile} />
        <ProfileStats stats={profile.stats} />
        <ProfileAbout paragraphs={[profile.bio_1, profile.bio_2, profile.bio_3].filter(Boolean)} />
        <ProfileSkills skills={profile.skills} />
        <ProfileIdiomas idiomas={profile.idiomas} />
        <ProfileExperiencia experiencia={profile.experiencia} />
        <ProfileProyectos proyectos={profile.proyectos} />
        <ProfileEducacion educacion={profile.educacion} />
        <ProfileCertificaciones certificaciones={profile.certificaciones} />
        {profile.mostrar_publicaciones ? <ProfilePublicaciones posts={mergedPosts} /> : null}
        <ProfileRecomendaciones recomendaciones={profile.recomendaciones} profileLink={`${publicBaseUrl}/profile`} />
        <ProfileCTA />
      </div>
    </main>
  )
}
