type SupabaseEnv = {
  url: string | null
  anonKey: string | null
}

export function getSupabaseEnv(): SupabaseEnv {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    null
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    null

  return { url, anonKey }
}

export function hasSupabaseEnv() {
  const { url, anonKey } = getSupabaseEnv()
  return Boolean(url && anonKey)
}

export function getMissingSupabaseEnvNames() {
  const hasPublicUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const hasPublicAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const hasServerUrl = Boolean(process.env.SUPABASE_URL)
  const hasServerAnon = Boolean(process.env.SUPABASE_ANON_KEY)

  const missing: string[] = []
  if (!hasPublicUrl && !hasServerUrl) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL (o SUPABASE_URL)')
  }
  if (!hasPublicAnon && !hasServerAnon) {
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY (o SUPABASE_ANON_KEY)')
  }
  return missing
}
