import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://carloscer.dev'),
  title: {
    default: 'Carlos Cervantes | QA Engineer & Performance Specialist',
    template: '%s | Carlos Cervantes',
  },
  description: 'QA Automation Engineer specializing in performance testing, test automation, and quality assurance. Helping companies build scalable software with confidence.',
  keywords: [
    'QA Engineer',
    'Test Automation',
    'Performance Testing',
    'Software Quality',
    'QA Consultant',
    'Automation Testing',
    'Testing Strategy',
    'Performance Engineering',
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
    icon: '/favicon.ico',
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
    url: 'https://carloscer.dev',
    siteName: 'Carlos Cervantes - QA Engineer',
    title: 'Carlos Cervantes | QA Engineer & Performance Specialist',
    description: 'Transforming quality assurance through automation and performance engineering. Expertise in scaling software with precision and confidence.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Carlos Cervantes - QA Engineer & Performance Specialist',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@carloscer_dev',
    creator: '@carloscer_dev',
    title: 'Carlos Cervantes | QA Engineer & Performance Specialist',
    description: 'QA Automation & Performance Engineering. Helping companies build scalable software with confidence.',
    images: ['/og-image.svg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://carloscer.dev',
    languages: {
      'es-ES': 'https://carloscer.dev',
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
