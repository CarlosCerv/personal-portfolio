import type { Metadata } from 'next'
import { AppleHeader } from '@/components/Header'
import { AppleFooter } from '@/components/Footer'

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppleHeader />
      <div className="flex-1 pt-header">
        {children}
      </div>
      <AppleFooter />
    </div>
  )
}
