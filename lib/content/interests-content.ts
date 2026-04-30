import { createClient } from '@/lib/supabase/server'
import { getDefaultInterests, normalizeInterest, type SiteInterest } from '@/lib/content/interests-schema'

export async function getPublicInterests(): Promise<SiteInterest[]> {
  const supabase = await createClient()
  if (!supabase) return getDefaultInterests()

  const { data, error } = await supabase
    .from('site_interests')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error || !Array.isArray(data) || data.length === 0) {
    return getDefaultInterests()
  }

  return data.map((item) => normalizeInterest(item))
}

export async function getPublicInterestBySlug(slug: string): Promise<SiteInterest | null> {
  const supabase = await createClient()
  if (!supabase) {
    const fallback = getDefaultInterests().find((item) => item.slug === slug)
    return fallback ?? null
  }

  const { data, error } = await supabase
    .from('site_interests')
    .select('*')
    .eq('slug', slug)
    .eq('visible', true)
    .maybeSingle()

  if (error || !data) {
    const fallback = getDefaultInterests().find((item) => item.slug === slug)
    return fallback ?? null
  }

  return normalizeInterest(data)
}

export async function getPublicInterestSlugs(): Promise<string[]> {
  const items = await getPublicInterests()
  return items.map((item) => item.slug)
}
