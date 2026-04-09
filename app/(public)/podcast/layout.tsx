import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata-utils'
import { getPageMetadata } from '@/lib/pages-metadata.config'

const pageData = getPageMetadata('podcast')

export const metadata: Metadata = generatePageMetadata({
  title: pageData.title,
  description: pageData.description,
  path: pageData.path,
  keywords: pageData.keywords,
  type: 'website',
})

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
