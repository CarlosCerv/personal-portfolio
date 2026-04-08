import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
