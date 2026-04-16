import type { MetadataRoute } from 'next'
import { getAllHobbies } from '@/lib/hobbies-data'
import {
  getFallbackPosts,
  getMongoPosts,
  mergePublicPosts,
  normalizeSupabasePost,
} from '@/lib/content/public-content'
import { createClient } from '@/lib/supabase/server'

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://carloscervantes-qa.vercel.app'
  return raw.replace(/\/+$/, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/profile`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/podcast`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/intereses`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/politica-de-privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const hobbyEntries: MetadataRoute.Sitemap = getAllHobbies().map((hobby) => ({
    url: `${siteUrl}/intereses/${hobby.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.4,
  }))

  // Blog posts: merge Supabase + Mongo + local fallback (same strategy as the public pages).
  const supabase = await createClient()
  const [dbPosts, mongoPosts, fallbackPosts] = await Promise.all([
    supabase
      ? (
          await supabase
            .from('blog_posts')
            .select('*')
            .eq('estado', 'publicado')
            .order('published_at', { ascending: false })
            .limit(200)
        ).data
      : null,
    getMongoPosts(),
    getFallbackPosts(),
  ])

  const mergedPosts = mergePublicPosts(
    (dbPosts || []).map(normalizeSupabasePost),
    mongoPosts,
    fallbackPosts
  )

  const blogEntries: MetadataRoute.Sitemap = mergedPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries, ...hobbyEntries]
}

