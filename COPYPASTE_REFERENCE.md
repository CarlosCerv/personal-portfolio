# 📋 Copy-Paste Reference Card

**For Quick Implementation - Copy These Sections As-Is**

---

## 1️⃣ Import Design Tokens in globals.css

```css
/* Place this at the TOP of app/globals.css */
@import '/public/css/design-tokens.css';

/* Rest of your styles below this line */
```

---

## 2️⃣ Update .env.local (Optional)

```env
# Add these optional verification codes
NEXT_PUBLIC_GOOGLE_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
NEXT_PUBLIC_GA_ID=G_
```

---

## 3️⃣ HTML Head Tags (If Not Using Next.js Layout)

```html
<head>
  <!-- Existing stuff first -->
  
  <!-- Favicons & Icons -->
  <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
  <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
  <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="android-chrome" href="/android-chrome-192x192.png" sizes="192x192" />
  <link rel="android-chrome" href="/android-chrome-512x512.png" sizes="512x512" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/site.webmanifest" />
  
  <!-- Theme color for browser UI -->
  <meta name="theme-color" content="#0071E3" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Carlos Cervantes" />
</head>
```

---

## 4️⃣ Tailwind Extension (Create/Merge Into tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#0071e3',
          hover: '#0077ed',
          active: '#0051b3',
        },
        white: {
          primary: '#ffffff',
          secondary: '#f5f5f7',
          tertiary: '#efefef',
        },
        black: {
          primary: '#1d1d1f',
          secondary: '#6f6f77',
          tertiary: '#a1a1a6',
        },
        border: {
          primary: '#e5e5e7',
          secondary: '#d2d2d7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.4px', fontWeight: '700' }],
        h2: ['2.625rem', { lineHeight: '1.2', letterSpacing: '-0.4px', fontWeight: '600' }],
        h3: ['2rem', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '600' }],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.12)',
        'button-primary': '0 2px 8px rgba(0, 113, 227, 0.15)',
      },
    },
  },
}

export default config
```

---

## 5️⃣ Common Utility Classes

```html
<!-- Buttons -->
<button class="px-8 py-3 bg-blue-primary text-white font-medium rounded-md hover:bg-blue-hover transition-all">
  Primary CTA
</button>

<button class="px-8 py-3 border border-border-primary text-black-primary font-medium rounded-md hover:bg-white-tertiary">
  Secondary
</button>

<!-- Cards -->
<div class="bg-white border border-border-primary rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all">
  Card Content
</div>

<!-- Text Hierarchy -->
<h1 class="text-h1 font-bold text-black-primary">Heading 1</h1>
<h2 class="text-h2 font-semibold text-black-primary">Heading 2</h2>
<p class="text-black-secondary">Body text gray</p>
<span class="text-black-tertiary">Meta/tertiary text</span>

<!-- Inputs -->
<input 
  type="text"
  class="w-full px-4 py-3 border border-border-primary rounded-lg text-black-primary placeholder-black-tertiary focus:border-blue-primary focus:ring-4 focus:ring-blue-primary/10"
  placeholder="Search..."
/>

<!-- Badges -->
<span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white-secondary text-black-primary">
  Badge
</span>

<span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-primary/10 text-blue-primary">
  Active
</span>
```

---

## 6️⃣ Color Palette Quick Reference

```css
/* Copy these into your code */

/* Primary Brand */
.bg-brand { background-color: #0071E3; }  /* Apple Blue */
.text-brand { color: #0071E3; }
.border-brand { border-color: #0071E3; }

/* Whites */
.bg-white-primary { background-color: #FFFFFF; }
.bg-white-secondary { background-color: #F5F5F7; }
.bg-white-tertiary { background-color: #EFEFEF; }

/* Blacks/Text */
.text-primary { color: #1D1D1F; }  /* Deep black */
.text-secondary { color: #6F6F77; }  /* Medium gray */
.text-tertiary { color: #A1A1A6; }  /* Light gray */

/* Status */
.bg-success { background-color: #34C759; }  /* Green */
.bg-error { background-color: #FF3B30; }    /* Red */
```

---

## 7️⃣ Animation Easing Functions

```css
/* Use these in your Framer Motion or CSS */

/* Apple Spring-like entrance */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Standard ease-out */
cubic-bezier(0.4, 0, 0.2, 1)

/* Balanced exit */
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

## 8️⃣ Common Durations

```typescript
// Use these in animations (milliseconds)
100ms  - Micro-interactions
150ms  - Quick feedback
200ms  - Standard transitions (buttons)
300ms  - Deliberate animations (card reveal)
500ms  - Scroll entrance
800ms  - Page transitions
```

---

## 9️⃣ File Paths (Verify These Exist)

```
✅ Check these are in /public/ after you place files:

/public/
├── favicon.ico                  ✓
├── favicon-16x16.png           ✓
├── favicon-32x32.png           ✓
├── apple-touch-icon.png        ✓
├── android-chrome-192x192.png  ✓
├── android-chrome-512x512.png  ✓
├── logo.svg                     ✓
├── logo-symbol.svg              ✓
├── css/
│   └── design-tokens.css        ✓
├── og-images/
│   ├── og-image-default.png    ✓
│   ├── og-image-linkedin.png   ✓
│   ├── og-image-twitter.png    ✓
│   └── og-image-mobile.png     ✓
└── site.webmanifest            ✓
```

---

## 🔟 Layout.tsx Metadata Replacement

```typescript
// Replace this section in app/layout.tsx:

import { BRAND_CONFIG, metadata, viewport, jsonLdOrganization } from '@/lib/seo-metadata'

export const metadata = {
  metadataBase: new URL('https://carloscervantes-qa.vercel.app'),
  
  title: {
    default: `Carlos Cervantes | QA Engineer & Performance Specialist`,
    template: `%s | Carlos Cervantes`,
  },
  
  description: BRAND_CONFIG.descriptions.homepage,
  keywords: BRAND_CONFIG.keywords.primary,
  
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://carloscervantes-qa.vercel.app',
    title: `Carlos Cervantes | QA Engineer & Performance Specialist`,
    description: `Software que escala sin romperse. Garantizo que tu software funcione bajo cualquier escenario.`,
    images: [
      {
        url: 'https://carloscervantes-qa.vercel.app/og-images/og-image-default.png',
        width: 1200,
        height: 630,
        alt: `Carlos Cervantes - Software Quality & Performance`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@carloscer_dev',
    creator: '@carloscer_dev',
    images: ['/og-images/og-image-twitter.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
}
```

---

## 1️⃣1️⃣ JSON-LD Schema (Add to Head)

```typescript
// In your layout.tsx <head>:

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Carlos Cervantes',
      url: 'https://carloscervantes-qa.vercel.app',
      jobTitle: 'QA Engineer & Performance Specialist',
      email: 'carlos@carloscervantes-qa.vercel.app',
      knowsAbout: [
        'QA Engineering',
        'Performance Testing',
        'Test Automation',
        'Software Quality',
      ],
      sameAs: [
        'https://linkedin.com/in/carloscervantes-qa',
        'https://twitter.com/carloscer_dev',
        'https://github.com/carloscervantes',
      ],
    }),
  }}
/>
```

---

## 1️⃣2️⃣ Mobile-First Responsive Example

```html
<!-- Hero section with responsive spacing -->
<section class="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold">
      Responsive Title
    </h1>
    <p class="mt-4 md:mt-6 text-black-secondary text-base md:text-lg">
      Body text scales with screen size
    </p>
  </div>
</section>
```

---

## Terminal Commands Reference

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Deploy to Vercel (if using Vercel)
git push

# Hard refresh browser (when favicon not showing)
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Clear Vercel cache
# Go to: vercel.com/dashboard → Settings → Git → Redeploy
```

---

## Verification Checklist (Copy & Paste)

```
Browser & Favicon:
☐ Favicon shows on browser tab
☐ All sizes render correctly (16x16, 32x32)
☐ iOS home screen shows 180x180 icon with rounded corners

SEO & Schema:
☐ Meta title appears in search results preview
☐ Meta description shows (155 chars max)
☐ JSON-LD schema validates at schema.org/docs
☐ No 404 errors in console

Social Sharing:
☐ LinkedIn preview shows OG image (1200x627)
☐ Twitter preview shows card without crop
☐ Facebook shows correct image

Performance:
☐ Lighthouse score > 90
☐ Core Web Vitals pass
☐ No render-blocking resources

Accessibility:
☐ Keyboard navigation works
☐ Focus visible on all interactive elements
☐ Color contrast meets WCAG AA
☐ Dark mode text still readable (if enabled)
```

---

## 🎯 Most Important Files

| For | File | Action |
|-----|------|--------|
| **Starting quick?** | QUICKSTART_BRANDING_SEO.md | Read (10 min summary) |
| **Need image prompts?** | BRANDING_PROMPTS_AND_ASSETS.md | Copy § paste into Midjourney |
| **CSS variables?** | public/css/design-tokens.css | Import into globals.css |
| **Metadata setup?** | lib/seo-metadata.ts | Import & export |
| **Replacing layout?** | app/layout-premium.tsx | Copy to layout.tsx |
| **Unsure about something?** | BRANDING_SEO_IMPLEMENTATION_GUIDE.md | Reference guide |

---

**That's everything! Copy sections above as needed. Good luck! 🚀**
