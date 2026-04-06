import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Using Inter as a fallback if SF Pro is not available
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carlos Cervantes | QA & Performance Consultant',
  description: 'Especialista en QA Automation y Performance Engineering. Ayudando a las empresas a construir software que escala.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
