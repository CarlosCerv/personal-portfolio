import { HOBBIES_DATA } from '@/lib/hobbies-data'
import crypto from 'node:crypto'

export type SiteInterest = {
  id: string
  slug: string
  title: string
  subtitle: string
  icon: string
  background_image: string
  description: string
  why: string
  experience: string
  highlights: string[]
  goals: string[]
  started: string
  frequency: string
  level: string
  equipment: string[]
  resources: string[]
  visible: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : []
}

export function normalizeInterest(input: Record<string, any>): SiteInterest {
  return {
    id: String(input.id ?? input.slug ?? crypto.randomUUID()),
    slug: String(input.slug ?? ''),
    title: String(input.title ?? ''),
    subtitle: String(input.subtitle ?? ''),
    icon: String(input.icon ?? '✨'),
    background_image: String(input.background_image ?? input.backgroundImage ?? ''),
    description: String(input.description ?? ''),
    why: String(input.why ?? ''),
    experience: String(input.experience ?? ''),
    highlights: normalizeStringArray(input.highlights),
    goals: normalizeStringArray(input.goals),
    started: String(input.started ?? ''),
    frequency: String(input.frequency ?? ''),
    level: String(input.level ?? ''),
    equipment: normalizeStringArray(input.equipment),
    resources: normalizeStringArray(input.resources),
    visible: typeof input.visible === 'boolean' ? input.visible : true,
    sort_order: Number.isFinite(Number(input.sort_order)) ? Number(input.sort_order) : 0,
    created_at: input.created_at ? String(input.created_at) : undefined,
    updated_at: input.updated_at ? String(input.updated_at) : undefined,
  }
}

export function getDefaultInterests(): SiteInterest[] {
  return Object.values(HOBBIES_DATA)
    .map((hobby, idx) =>
      normalizeInterest({
        ...hobby,
        background_image: hobby.backgroundImage,
        visible: true,
        sort_order: idx + 1,
      })
    )
    .sort((a, b) => a.sort_order - b.sort_order)
}
