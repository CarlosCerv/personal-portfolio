import { Metadata } from 'next'

export interface GenerateMetadataProps {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  author?: string
  type?: 'website' | 'article' | 'profile'
  publishedAt?: Date
  updatedAt?: Date
  authorName?: string
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://carloscervantes-qa.vercel.app'
const DEFAULT_OG_IMAGE = '/og-image.png'

export function generatePageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  author = 'Carlos Cervantes',
  type = 'website',
  publishedAt,
  updatedAt,
  authorName = 'Carlos Cervantes',
}: GenerateMetadataProps): Metadata {
  const url = `${BASE_URL}${path}`
  const fullTitle = title.includes('Carlos Cervantes') ? title : `${title} | Carlos Cervantes`

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      ...(Array.isArray(keywords) ? keywords : []),
      'QA',
      'Automatización de pruebas',
      'Performance testing',
      'Carlos Cervantes',
    ],
    creator: 'Carlos Cervantes',
    openGraph: {
      type,
      locale: 'es_ES',
      url,
      title: fullTitle,
      description,
      siteName: 'Carlos Cervantes - QA y performance',
      images: [
        {
          url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: image.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
        },
      ],
      ...(publishedAt && { publishedTime: publishedAt.toISOString() }),
      ...(updatedAt && { modifiedTime: updatedAt.toISOString() }),
      authors: [authorName],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@carloscer_dev',
      creator: '@carloscer_dev',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${BASE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

export function generateBlogPostMetadata({
  title,
  description,
  slug,
  image,
  tags = [],
  publishedAt,
  updatedAt,
  author = 'Carlos Cervantes',
}: {
  title: string
  description: string
  slug: string
  image?: string
  tags?: string[] | readonly string[]
  publishedAt?: Date
  updatedAt?: Date
  author?: string
}): Metadata {
  return generatePageMetadata({
    title: `${title} | Blog`,
    description,
    path: `/blog/${slug}`,
    image: image || DEFAULT_OG_IMAGE,
    keywords: ['Blog', 'Artículo', ...(Array.isArray(tags) ? tags : [])],
    type: 'article',
    publishedAt,
    updatedAt,
    author,
    authorName: author,
  })
}

export function generateStructuredData(data: {
  '@context': string
  '@type': string
  [key: string]: any
}) {
  return JSON.stringify(data)
}
