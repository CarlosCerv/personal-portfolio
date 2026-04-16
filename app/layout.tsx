import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://carloscervantes-qa.vercel.app'),
  title: {
    default: 'Carlos Cervantes | QA y performance',
    template: '%s | Carlos Cervantes',
  },
  description:
    'Ingeniero de QA y performance. Automatización E2E, performance testing y estrategia de calidad para software que escala con confianza.',
  keywords: [
    'QA',
    'Automatización de pruebas',
    'Performance testing',
    'Calidad de software',
    'Consultoría QA',
    'E2E',
    'Estrategia de testing',
    'Ingeniería de performance',
  ],
  authors: [
    {
      name: 'Carlos Cervantes',
      url: 'https://carloscer.dev',
    },
  ],
  creator: 'Carlos Cervantes',
  publisher: 'Carlos Cervantes',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Carlos Cervantes - QA y performance',
    title: 'Carlos Cervantes | QA y performance',
    description:
      'Calidad de software con automatización y performance testing. Estrategia y ejecución para lanzar con confianza.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Carlos Cervantes - QA y performance',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@carloscer_dev',
    creator: '@carloscer_dev',
    title: 'Carlos Cervantes | QA y performance',
    description:
      'QA, automatización y performance testing para software que escala con confianza.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* Performance: Google Analytics with optimal config */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR-ID');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
