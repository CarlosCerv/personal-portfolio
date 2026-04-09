import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata-utils'
import { getPageMetadata } from '@/lib/pages-metadata.config'

const pageData = getPageMetadata('privacy')

export const metadata: Metadata = generatePageMetadata({
  title: pageData.title,
  description: pageData.description,
  path: pageData.path,
  keywords: pageData.keywords,
  type: 'website',
})

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
