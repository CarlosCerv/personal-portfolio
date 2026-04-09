import type { Metadata } from 'next'
import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'

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
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}
