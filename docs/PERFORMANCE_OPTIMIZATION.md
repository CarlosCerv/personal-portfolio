# 🚀 Performance Optimization Plan

**Date:** 9 de Abril 2026  
**Goal:** Improve LCP < 1.5s, FID < 50ms, CLS < 0.05  
**Target Lighthouse Score:** > 95

---

## 📊 Current Metrics (Baseline)

Run these commands to measure baseline:
```bash
# Local performance measurement
npm run build && npm start
# Then use DevTools Lighthouse
```

---

## 🎯 Optimization Strategy

### Phase 1: Critical (Implement immediately)
- [ ] Image optimization (Next.js Image)
- [ ] Font loading optimization
- [ ] Remove unused CSS
- [ ] Lazy load below-the-fold components
- [ ] Enable compression

### Phase 2: Important (Next week)
- [ ] ISR (Incremental Static Regeneration)
- [ ] Implement React.memo for expensive components
- [ ] Code splitting + dynamic imports
- [ ] Database query optimization
- [ ] API caching headers

### Phase 3: Polish (Optional)
- [ ] Storybook + visual testing
- [ ] E2E performance testing
- [ ] Core Web Vitals monitoring
- [ ] Automated performance budgets

---

## ✅ PHASE 1: CRITICAL OPTIMIZATIONS

### 1. Image Optimization
**Impact:** -30-40% LCP | FID -10-15%

Files to update:
- [ ] `components/public/navbar.tsx`
- [ ] `components/public/footer.tsx`
- [ ] `app/(public)/profile/page.tsx`
- [ ] `app/(public)/blog/page.tsx`
- [ ] `app/(public)/servicios/page.tsx`

**Pattern:**
```tsx
// Before
<img src="/images/thumb.png" alt="..." />

// After
import Image from 'next/image'
<Image 
  src="/images/thumb.png"
  alt="..."
  width={300}
  height={200}
  placeholder="blur"
  priority={false}
/>
```

### 2. Font Loading
**Impact:** -15-20% CLS | FID -5%

Update `app/globals.css`:
```css
/* System font stack (faster than external) */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;

/* If using Google Fonts, add font-display: swap */
@font-face {
  font-family: 'CustomFont';
  src: url(...);
  font-display: swap; /* Show fallback immediately */
}
```

### 3. Remove Unused CSS
**Impact:** -20-30% CSS bundle

```bash
# Check current CSS size
npm run build
# Look for `.next/static/css/` size

# Identify unused classes
npx @fullhuman/postcss-purgecss --help
```

Update `postcss.config.mjs`:
```js
module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
      ],
    },
    autoprefixer: {},
  },
}
```

### 4. Lazy Load Below-the-Fold
**Impact:** -40-50% FCP | LCP -20-30%

Replace `app/(public)/blog/page.tsx`:
```tsx
'use client'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const PostCard = dynamic(() => import('@/components/PostCard'), {
  loading: () => <div className="h-64 bg-gray-100 rounded animate-pulse" />,
})

export default function BlogPage() {
  return (
    <>
      {/* Critical content - loaded immediately */}
      <Header />
      
      {/* Below fold - loaded on demand */}
      <Suspense fallback={<LoadingCards />}>
        <PostCard />
      </Suspense>
    </>
  )
}
```

### 5. Compression & Caching Headers
**In `vercel.json`:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, immutable, max-age=31536000"
        }
      ]
    }
  ]
}
```

---

## 📋 Checklist - Phase 1

### Images
- [ ] Navbar logo: optimize + lazy load
- [ ] Footer images: lazy load
- [ ] Article thumbnails: responsive images
- [ ] Profile avatar: blur placeholder

### Fonts
- [ ] Switch to system font
- [ ] Add `font-display: swap`
- [ ] Remove unused font weights

### CSS
- [ ] Verify no unused Tailwind classes
- [ ] Minify CSS (default in Next.js)
- [ ] Remove duplicate declarations

### Code Splitting
- [ ] Wrap heavy components with `dynamic()`
- [ ] Use `Suspense` boundaries
- [ ] Lazy load modals/popovers

### Caching
- [ ] Set Cache-Control headers
- [ ] Enable edge caching (Vercel)
- [ ] Image optimization at build time

---

## 🎯 PHASE 2: IMPORTANT OPTIMIZATIONS

### 1. Incremental Static Regeneration (ISR)
**Files:** `app/(public)/blog/page.tsx`, `/blog/[slug]`

```tsx
// Revalidate every 1 hour
export const revalidateTime = 3600

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogList posts={posts} />
}
```

### 2. React.memo for Lists
**Files:** Components rendering lists

```tsx
import { memo } from 'react'

const PostCard = memo(({ post }) => (
  <article>{post.title}</article>
), (prevProps, nextProps) => {
  return prevProps.post.id === nextProps.post.id
})

export default PostCard
```

### 3. Database Query Optimization
**Files:** `lib/supabase/client.ts`, `/api/routes`

```ts
// Before: N+1 queries
const posts = await supabase.from('posts').select('*')
posts.forEach(p => {
  const author = await supabase.from('authors').select('*').eq('id', p.author_id)
})

// After: Single query with joins
const posts = await supabase
  .from('posts')
  .select('*, author:authors(id, name)')
  .limit(10)
```

### 4. API Response Compression
**In `next.config.mjs`:**
```js
/** @type {import('next').NextConfig} */
const config = {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  // ...
}
```

---

## 📈 Performance Metrics to Track

### Core Web Vitals
```
LCP (Largest Contentful Paint):
  Good: < 2.5s
  Need improvement: > 2.5s
  Target: < 1.5s ✅

FID (First Input Delay):
  Good: < 100ms
  Need improvement: > 100ms
  Target: < 50ms ✅

CLS (Cumulative Layout Shift):
  Good: < 0.1
  Need improvement: > 0.1
  Target: < 0.05 ✅
```

### Measure in DevTools
```javascript
// Open console, run:
const perfData = performance.getEntriesByType('navigation')[0]
console.log({
  fcpTime: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
  lcpTime: performance.getEntriesByType('largest-contentful-paint').pop()?.startTime,
  timeToInteractive: perfData.loadEventEnd - perfData.startTime
})
```

---

## 🛠 Implementation Checklist

- [ ] **Week 1:**
  - [ ] Implement Next.js Image optimization
  - [ ] Remove unused CSS
  - [ ] Set up caching headers
  - [ ] Measure baseline metrics

- [ ] **Week 2:**
  - [ ] Implement ISR for blog
  - [ ] Add React.memo to components
  - [ ] Optimize database queries
  - [ ] Test on 3G connection

- [ ] **Week 3:**
  - [ ] Run Lighthouse audit
  - [ ] Fix remaining issues
  - [ ] Set up monitoring
  - [ ] Document results

---

## 🔍 Testing & Validation

### Test on Different Networks
```bash
# Slow 3G simulation
# DevTools → Network → Slow 3G

# Measure:
- Page load time
- TTI (Time to Interactive)
- First Paint
- Largest Contentful Paint
```

### Lighthouse Audit
```bash
# Run locally
npx lighthouse https://localhost:3000

# Or in DevTools: F12 → Lighthouse tab
```

### Performance in DevTools
```bash
# Measure performance:
1. Open DevTools (F12)
2. Performance tab
3. Click record
4. Interact with page
5. Stop recording
6. Analyze the flame chart
```

---

## 📚 Resources

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals Guide](https://web.dev/research-2024/)

---

## 🎯 Success Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| LCP | ? | < 1.5s | ⏳ |
| FID | ? | < 50ms | ⏳ |
| CLS | ? | < 0.05 | ⏳ |
| Lighthouse | ? | > 95 | ⏳ |
| Bundle size | ? | < 200KB | ⏳ |
| Time to TTI | ? | < 2s | ⏳ |

---

**Status:** Ready for Phase 1 implementation  
**Last updated:** 9 de Abril 2026
