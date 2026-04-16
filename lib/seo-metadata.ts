/**
 * SEO Metadata Configuration
 * Apple Light Premium - Premium SaaS Personal Brand
 * Optimized for LinkedIn, Twitter, and Search Engines
 */

export const BRAND_CONFIG = {
  name: 'Carlos Cervantes',
  title: 'QA y performance',
  shortTitle: 'Carlos Cervantes',
  baseUrl: 'https://carloscervantes-qa.vercel.app',
  domain: 'carloscervantes-qa.vercel.app',
  year: new Date().getFullYear(),
  
  // Primary taglines (for different contexts)
  taglines: {
    short: 'Software que escala sin romperse',
    long: 'Garantizo que tu software funcione bajo cualquier escenario, con cualquier volumen de usuarios.',
    seo: 'QA y performance testing | Software sin downtime',
    social: 'Calidad y performance para productos que escalan',
  },

  // SEO Keywords (strategic, not keyword stuffing)
  keywords: {
    primary: [
      'QA',
      'Performance testing',
      'Automatización de pruebas',
      'Calidad de software',
      'Ingeniería de performance',
      'Escalabilidad',
      'Cero downtime',
      'QA enterprise',
    ],
    secondary: [
      'Testing automatizado',
      'Integración CI/CD',
      'Optimización de performance',
      'Estrategia de calidad',
      'SDET',
      'Framework de pruebas',
      'Pruebas de carga',
      'Pruebas de regresión',
    ],
    long_tail: [
      'Consultor de QA',
      'Consultor de performance testing',
      'Servicios de calidad de software',
      'Especialista en automatización de pruebas',
      'Estrategia de despliegue sin downtime',
      'Pruebas para software enterprise',
    ],
  },

  // Meta descriptions (optimized for CTR)
  descriptions: {
    homepage:
      'Ingeniero de QA y performance. Automatización de pruebas y performance testing para software que escala con confianza.',
    services:
      'Servicios de QA: automatización E2E, performance testing y estrategia de calidad con entregables claros.',
    blog:
      'Artículos técnicos sobre QA, automatización, estrategia de testing y performance. Ideas prácticas para equipos de producto.',
    profile:
      'Perfil profesional de Carlos Cervantes. Experiencia en QA, automatización y performance testing en productos que escalan.',
  },

  // Social media profiles
  social: {
    linkedin: 'https://linkedin.com/in/carloscervantes-qa',
    twitter: 'https://twitter.com/carloscer_dev',
    github: 'https://github.com/carloscervantes',
    email: 'carlos@carloscervantes-qa.vercel.app',
  },

  // Color scheme for browser/social themes
  colors: {
    primary: '#0071E3',      // Apple Blue
    secondary: '#FFFFFF',    // Pure White
    accent: '#1D1D1F',       // Deep Black
  },

  // Contact & organization schema
  organization: {
    name: 'Carlos Cervantes QA',
    description: 'QA, automatización y performance testing',
    logo: 'https://carloscervantes-qa.vercel.app/logo.svg',
    url: 'https://carloscervantes-qa.vercel.app',
    sameAs: [
      'https://linkedin.com/in/carloscervantes-qa',
      'https://twitter.com/carloscer_dev',
      'https://github.com/carloscervantes',
    ],
  },

  // Verification codes (populate after generating)
  verification: {
    google: '',      // Add your Google Search Console verification code
    microsoft: '',   // Bing Webmaster Tools code
    yandex: '',      // Yandex metrica code
  },
}

/**
 * Next.js Metadata Object
 * Type: import type { Metadata } from 'next'
 */
export const metadata = {
  metadataBase: new URL(BRAND_CONFIG.baseUrl),
  
  // Primary metadata
  title: {
    default: `${BRAND_CONFIG.shortTitle} | ${BRAND_CONFIG.title}`,
    template: `%s | ${BRAND_CONFIG.shortTitle}`,
  },
  
  description: BRAND_CONFIG.descriptions.homepage,
  keywords: BRAND_CONFIG.keywords.primary,

  // Author & Creator
  authors: [
    {
      name: BRAND_CONFIG.name,
      url: `${BRAND_CONFIG.baseUrl}/profile`,
    },
  ],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,

  // Manifest & Icons
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
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

  // Mobile optimization
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  // Robots & Crawling
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // Open Graph (Social Sharing)
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BRAND_CONFIG.baseUrl,
    siteName: `${BRAND_CONFIG.name} - ${BRAND_CONFIG.title}`,
    title: `${BRAND_CONFIG.name} | ${BRAND_CONFIG.taglines.seo}`,
    description: `${BRAND_CONFIG.taglines.short}. ${BRAND_CONFIG.taglines.long}`,
    
    // OG Image (1200x630px - Open Graph standard)
    images: [
      {
        url: `${BRAND_CONFIG.baseUrl}/og-images/og-image-default.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortTitle} - ${BRAND_CONFIG.taglines.short}`,
        type: 'image/png',
        secureUrl: `${BRAND_CONFIG.baseUrl}/og-images/og-image-default.png`,
      },
      // LinkedIn optimized variant
      {
        url: `${BRAND_CONFIG.baseUrl}/og-images/og-image-linkedin.png`,
        width: 1200,
        height: 627,
        alt: `${BRAND_CONFIG.shortTitle} - QA y performance`,
        type: 'image/png',
      },
    ],
  },

  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    site: '@carloscer_dev',
    creator: '@carloscer_dev',
    title: `${BRAND_CONFIG.name} | QA y performance`,
    description: `${BRAND_CONFIG.taglines.short}. ${BRAND_CONFIG.social.twitter}`,
    images: [
      {
        url: `${BRAND_CONFIG.baseUrl}/og-images/og-image-twitter.png`,
        width: 1024,
        height: 512,
        alt: BRAND_CONFIG.taglines.short,
      },
    ],
  },

  // Canonical & Alternates
  alternates: {
    canonical: BRAND_CONFIG.baseUrl,
    languages: {
      'es-ES': BRAND_CONFIG.baseUrl,
      'es': BRAND_CONFIG.baseUrl,
      'en': `${BRAND_CONFIG.baseUrl}/en`,
    },
  },

  // Search verification
  verification: BRAND_CONFIG.verification,

  // App-specific
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: BRAND_CONFIG.shortTitle,
  },

  // Theme color for browsers that support it
  themeColor: BRAND_CONFIG.colors.primary,
}

/**
 * Viewport Configuration
 * Type: import { Viewport } from 'next'
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  colorScheme: 'light',
  viewportFit: 'cover',
}

/**
 * JSON-LD Structured Data
 * For Google Rich Snippets and Knowledge Graph
 */
export const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: BRAND_CONFIG.name,
  url: BRAND_CONFIG.baseUrl,
  image: `${BRAND_CONFIG.baseUrl}/logo.svg`,
  email: BRAND_CONFIG.social.email,
  telephone: '',  // Optional: add if you want to include
  jobTitle: BRAND_CONFIG.title,
  description: `${BRAND_CONFIG.title}. ${BRAND_CONFIG.taglines.long}`,
  
  // Credentials & Expertise
  knowsAbout: [
    'QA',
    'Performance testing',
    'Automatización de pruebas',
    'Aseguramiento de calidad de software',
    'Ingeniería de performance',
    'SDET',
    'Playwright',
    'Appium',
    'JMeter',
  ],

  // Social profiles
  sameAs: BRAND_CONFIG.organization.sameAs,

  // Organization affiliation
  affiliation: {
    '@type': 'Organization',
    name: BRAND_CONFIG.organization.name,
    url: BRAND_CONFIG.organization.url,
  },
}

/**
 * JSON-LD Service Schema
 * For Service offerings
 */
export const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Servicios de QA y performance',
  provider: {
    '@type': 'Person',
    name: BRAND_CONFIG.name,
    url: BRAND_CONFIG.baseUrl,
    image: `${BRAND_CONFIG.baseUrl}/logo.svg`,
  },
  description: BRAND_CONFIG.organization.description,
  areaServed: 'Worldwide',
  availableLanguage: ['es', 'en'],
  
  // Key service features (from hero metrics)
  hasOfferingDetails: [
    {
      '@type': 'Offer',
      name: 'Garantía de calidad',
      description: 'Score de calidad consistente en entregables clave',
    },
    {
      '@type': 'Offer',
      name: 'Performance testing',
      description: 'Validación de escalabilidad con escenarios de carga',
    },
    {
      '@type': 'Offer',
      name: 'Despliegue con alta confiabilidad',
      description: 'Estrategias para reducir incidentes y aumentar estabilidad',
    },
  ],
}

/**
 * JSON-LD Organization Schema
 * For Knowledge Graph
 */
export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND_CONFIG.organization.name,
  url: BRAND_CONFIG.organization.url,
  logo: BRAND_CONFIG.organization.logo,
  description: BRAND_CONFIG.organization.description,
  
  // Contact info
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Professional Services',
    email: BRAND_CONFIG.social.email,
    url: BRAND_CONFIG.baseUrl,
  },
  
  // Organization owner
  founder: {
    '@type': 'Person',
    name: BRAND_CONFIG.name,
  },
  
  // Social profiles
  sameAs: BRAND_CONFIG.organization.sameAs,
  
  // Aggregated rating (if you have reviews)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',  // Update with actual review count
    bestRating: '5',
    worstRating: '1',
  },
}

/**
 * BreadcrumbList Schema
 * For improved navigation in search results
 */
export const jsonLdBreadcrumb = (breadcrumbs: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BRAND_CONFIG.baseUrl}${item.path}`,
  })),
})

/**
 * FAQ Schema
 * For FAQ sections (if including)
 */
export const jsonLdFaq = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export default metadata
