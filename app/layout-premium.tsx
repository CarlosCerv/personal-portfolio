import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { BRAND_CONFIG, metadata as seoMetadata, viewport as seoViewport, jsonLdOrganization, jsonLdPerson } from '@/lib/seo-metadata'

export const metadata: Metadata = {
  metadataBase: new URL('https://carloscervantes-qa.vercel.app'),
  
  // PRIMARY METADATA
  title: {
    default: `${BRAND_CONFIG.shortTitle} | QA Engineer & Performance Specialist`,
    template: `%s | ${BRAND_CONFIG.shortTitle}`,
  },
  
  description: BRAND_CONFIG.descriptions.homepage,
  keywords: BRAND_CONFIG.keywords.primary,

  // AUTHOR & CREATOR
  authors: [
    {
      name: BRAND_CONFIG.name,
      url: `${BRAND_CONFIG.baseUrl}/profile`,
    },
  ],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,

  // ICONS & FAVICONS
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', rel: 'icon' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', rel: 'icon' },
    ],
  },

  // MOBILE & FORMAT DETECTION
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  // ROBOTS & CRAWLING
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

  // OPEN GRAPH (SOCIAL SHARING)
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://carloscervantes-qa.vercel.app',
    siteName: 'Carlos Cervantes - QA Engineer',
    title: `${BRAND_CONFIG.name} | QA Engineer & Performance Specialist`,
    description: `${BRAND_CONFIG.taglines.short}. ${BRAND_CONFIG.taglines.long}`,
    images: [
      {
        url: 'https://carloscervantes-qa.vercel.app/og-images/og-image-default.png',
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} - ${BRAND_CONFIG.taglines.short}`,
        type: 'image/png',
        secureUrl: 'https://carloscervantes-qa.vercel.app/og-images/og-image-default.png',
      },
      {
        url: 'https://carloscervantes-qa.vercel.app/og-images/og-image-linkedin.png',
        width: 1200,
        height: 627,
        alt: 'Carlos Cervantes - Performance Testing & QA Engineering',
        type: 'image/png',
      },
    ],
  },

  // TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    site: '@carloscer_dev',
    creator: '@carloscer_dev',
    title: `${BRAND_CONFIG.name} | QA Engineer & Performance Specialist`,
    description: `${BRAND_CONFIG.taglines.short}. Helping companies build scalable software with confidence.`,
    images: [
      {
        url: 'https://carloscervantes-qa.vercel.app/og-images/og-image-twitter.png',
        width: 1024,
        height: 512,
        alt: BRAND_CONFIG.taglines.short,
      },
    ],
  },

  // CANONICAL & ALTERNATES
  alternates: {
    canonical: 'https://carloscervantes-qa.vercel.app',
    languages: {
      'es-ES': 'https://carloscervantes-qa.vercel.app',
      'es': 'https://carloscervantes-qa.vercel.app',
      'en': 'https://carloscervantes-qa.vercel.app/en',
    },
  },

  // VERIFICATION
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },

  // APP ADDITIONS
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: BRAND_CONFIG.shortTitle,
  },

  // THEME COLOR
  themeColor: BRAND_CONFIG.colors.primary,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  colorScheme: 'light',
  viewportFit: 'cover',
}

// Extend viewport with interactive checks
export const dynamicParams = true

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Primary Font - Apple System Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.svg" as="image" />
        <link rel="preload" href="/favicon.ico" as="image" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
          suppressHydrationWarning
        />

        {/* Google Analytics (if configured) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Global CSS */}
      </head>

      <body>
        {children}

        {/* Skip to main content link (accessibility) */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Ir al contenido principal
        </a>
      </body>
    </html>
  )
}
