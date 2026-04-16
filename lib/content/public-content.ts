import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import matter from 'gray-matter'
import { marked } from 'marked'
import mongoose from 'mongoose'
import Post from '@/models/Post'
export * from '@/lib/content/profile-schema'
import { normalizePublicProfile } from '@/lib/content/profile-schema'

export type PublicPost = {
  id: string
  slug: string
  titulo: string
  excerpt: string
  categoria: string
  tags: string[]
  contenido: string
  published_at: string
  imagen_portada: string | null
  estado: string
  autor: string
}

type SourcePost = Partial<PublicPost> & Record<string, any>

const POSTS_DIR = path.join(process.cwd(), 'posts')
const MONGODB_URI = process.env.MONGODB_URI

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/[*_>~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function createExcerpt(markdown: string, maxLength = 180) {
  const clean = stripMarkdown(markdown)
  if (clean.length <= maxLength) return clean
  return `${clean.slice(0, maxLength).trim()}...`
}

function normalizeCategory(tags: string[]) {
  return tags[0] || 'QA'
}

function generateImageUrlFromTitle(title: string, slug: string): string {
  // Local covers (no external dependencies, consistent Apple-like look)
  const covers = [
    '/blog-covers/cover-1.svg',
    '/blog-covers/cover-2.svg',
    '/blog-covers/cover-3.svg',
    '/blog-covers/cover-4.svg',
    '/blog-covers/cover-5.svg',
  ]

  const basis = `${slug || ''}:${title || ''}`
  const hash = crypto.createHash('sha1').update(basis).digest()
  const index = hash[0] % covers.length
  return covers[index]
}

export async function getFallbackPosts(): Promise<PublicPost[]> {
  try {
    const files = await fs.readdir(POSTS_DIR)
    const markdownFiles = files.filter((file) => file.endsWith('.md'))

    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(POSTS_DIR, file)
        const raw = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(raw)
        const html = await marked.parse(content)
        const tags = Array.isArray(data.tags) ? data.tags.map(String) : []
        const author = typeof data.author === 'string' ? data.author : 'Carlos Cervantes'

        return {
          id: String(data.slug || file.replace(/\.md$/, '')),
          slug: String(data.slug || file.replace(/\.md$/, '')),
          titulo: String(data.title || 'Artículo'),
          excerpt: createExcerpt(content),
          categoria: normalizeCategory(tags),
          tags,
          contenido: html,
          published_at: String(data.date || new Date().toISOString()),
          imagen_portada: data.imagen_portada || generateImageUrlFromTitle(String(data.title || 'Artículo'), String(data.slug || file.replace(/\.md$/, ''))),
          estado: 'publicado',
          autor: author,
        } satisfies PublicPost
      })
    )

    return posts.sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
  } catch {
    return []
  }
}

export async function getFallbackPostBySlug(slug: string) {
  const posts = await getFallbackPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

let mongoConnectionPromise: Promise<typeof mongoose> | null = null

async function connectToMongo() {
  if (!MONGODB_URI) return null
  if (mongoose.connection.readyState === 1) return mongoose

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      bufferCommands: false,
    })
  }

  try {
    return await mongoConnectionPromise
  } catch {
    mongoConnectionPromise = null
    return null
  }
}

function createMongoExcerpt(content: string, maxLength = 180) {
  const clean = String(content || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= maxLength) return clean
  return `${clean.slice(0, maxLength).trim()}...`
}

function mapMongoPost(post: any): PublicPost {
  const rendered = marked.parse(post.content || '')
  const html = typeof rendered === 'string' ? rendered : String(rendered)

  return {
    id: String(post._id),
    slug: String(post.slug),
    titulo: String(post.title),
    excerpt: post.metaDescription || createMongoExcerpt(post.content),
    categoria: Array.isArray(post.tags) && post.tags.length > 0 ? String(post.tags[0]) : 'QA',
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    contenido: html,
    published_at: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    imagen_portada: post.coverImage || generateImageUrlFromTitle(String(post.title), String(post.slug)),
    estado: post.published === false ? 'borrador' : 'publicado',
    autor: post.author || 'Carlos Cervantes',
  }
}

export async function getMongoPosts(): Promise<PublicPost[]> {
  const connection = await connectToMongo()
  if (!connection) return []

  try {
    const posts = await Post.find({ published: true }).sort({ date: -1 }).lean()
    return posts.map(mapMongoPost)
  } catch {
    return []
  }
}

export async function getMongoPostBySlug(slug: string): Promise<PublicPost | null> {
  const connection = await connectToMongo()
  if (!connection) return null

  try {
    const post = await Post.findOne({ slug, published: true }).lean()
    return post ? mapMongoPost(post) : null
  } catch {
    return null
  }
}

export function normalizeSupabasePost(post: SourcePost): PublicPost {
  const slug = String(post.slug ?? '')
  const titulo = String(post.titulo ?? post.title ?? 'Artículo')
  
  return {
    id: String(post.id ?? post.slug ?? crypto.randomUUID()),
    slug: slug,
    titulo: titulo,
    excerpt: String(post.excerpt ?? post.og_description ?? ''),
    categoria: String(post.categoria ?? 'QA'),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    contenido: String(post.contenido ?? post.content ?? ''),
    published_at: String(
      post.published_at ?? post.date ?? post.created_at ?? new Date().toISOString()
    ),
    imagen_portada: post.imagen_portada ?? post.coverImage ?? generateImageUrlFromTitle(titulo, slug),
    estado: String(post.estado ?? (post.published === false ? 'borrador' : 'publicado')),
    autor: String(post.autor ?? post.author ?? 'Carlos Cervantes'),
  }
}

export function mergePublicPosts(...collections: Array<PublicPost[] | null | undefined>) {
  const postMap = new Map<string, PublicPost>()

  collections
    .flatMap((items) => items || [])
    .filter((post) => post.slug)
    .forEach((post) => {
      const existing = postMap.get(post.slug)
      if (!existing) {
        postMap.set(post.slug, post)
        return
      }

      const currentDate = new Date(existing.published_at).getTime()
      const nextDate = new Date(post.published_at).getTime()
      postMap.set(post.slug, nextDate >= currentDate ? post : existing)
    })

  return Array.from(postMap.values()).sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )
}

export { normalizePublicProfile }
