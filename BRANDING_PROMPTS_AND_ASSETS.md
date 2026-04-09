# Carlos Cervantes - Branding Prompts & Asset Guidelines

**Apple Light Premium Brand Identity System**

---

## 🎨 Part 1: Logo Prompt (For Midjourney/Nano Banana 2)

### Primary Logo Generation Prompt

```
"Create a professional minimalist personal brand logo for 'Carlos Cervantes'. 

Concept: QA Engineering, software stability, scalability, and zero-downtime performance.

Visual Style: Apple's hyper-premium aesthetic with perfect execution.

The logo consists of:
- A sleek geometric abstract symbol representing a 'perfect node' or 'unbreakable link'
- Ultra-fine precision lines (2-3px stroke weight)
- Subtle glassmorphism microeffects (very light, barely perceptible)
- The symbol should evoke digital reliability and structural integrity

Color Palette:
- Primary: Pure White (#FFFFFF) for stroke
- Secondary: Apple Gray (#F5F5F7) for subtle accents
- Accent: Electric Blue (#0071E3) for one keystone element (optional, 10% of the symbol)

Typography:
- Wordmark: 'Carlos Cervantes' in SF Pro Display or equivalent high-end sans-serif
- All caps optional, letter-spacing +2%
- Positioned to the right of the symbol, aligned to the baseline

Technical Execution:
- Soft studio lighting with directional key light from top-left
- Subtle soft shadows (barely cast, high-key aesthetic)
- 8k resolution
- Vector-style clarity (curves should be mathematically perfect)
- Isolated on absolute white background
- Ready for use at 512x512px minimum
- Scalable to billboard size without degradation

Mood: Premium, trustworthy, innovative, meticulous. Like opening a new MacBook Pro."
```

### Quick Reference - Logo Specifications
```
Size: 512x512px (primary), 256x256px (secondary)
Format: PNG with transparency or vector
Safe zone: 64px padding around symbol
Stroke weight: 1.5-2.5px for optimal clarity
Color mode: RGB or CMYK (depending on use)
File weight: <500KB for web, <2MB for print
```

---

## 📱 Part 2: Favicon Prompt (For Image Generator)

### Favicon Generation Prompt

```
"Design a high-contrast tech favicon symbol for a personal brand (Carlos Cervantes - QA Engineer).

Size & Context: Must be legible at 16x16px, 32x32px, and 180x180px (apple-touch-icon).

Symbol Options (Choose One):
1. Abstract geometric 'unbreakable node' icon - a perfect circle with internal geometric pattern
2. Monogram 'CC' - overlapping letter design, modern and minimal
3. Dot-link chain - representing interconnected systems with perfect reliability

Design Requirements:
- Flat design with subtle 3D depth effect (Apple iOS style)
- Thick enough lines to maintain form at 16px minimum
- No fine details that will disappear

Color Options (Choose One):
Option A: Solid Electric Blue (#0071E3) symbol on white background
Option B: White symbol on solid Electric Blue (#0071E3) background
Option C: Just the symbol with transparent background (versatile masking)

Special Considerations:
- Perfect geometric proportions (circles, squares, grids based on 4px baseline)
- No gradients (solid colors only)
- High contrast for accessibility
- High-quality render
- Centered composition
- Pixel-perfect alignment for small sizes

Output: 16x16px (favicon.ico), 32x32px (for browser tabs), 180x180px (iOS home screen)"
```

### Favicon Implementation Sizes
```
favicon.ico:        16x16px, 32x32px, 48x48px (ICO format support)
apple-touch-icon:   180x180px (rounded corners, iOS app icon)
android-chrome:     192x192px, 512x512px (Progressive Web App)
```

---

## 🔗 Part 3: Open Graph Image Prompt (For Social Sharing)

### OG Image Generation Prompt

```
"Create a premium social media card for professional sharing (LinkedIn, Twitter, Open Graph).

Layout & Dimensions:
- 1200x630px (standard OG image size)
- Safe text area: 200px margins on all sides

Background:
- Absolute white (#FFFFFF) with a subtle gradient vignette (less than 5% opacity)
- Or completely flat white with no texture

Central Element:
- The approved 'Carlos Cervantes' logo positioned at center (approximately 40% of canvas height)
- Logo area: 300x300px maximum

Text Elements (if included):
- Main tagline: 'Software que escala sin romperse' (white space below logo)
- Font: SF Pro Display or Inter, 64px, weight 600
- Color: Deep Black (#1D1D1F)
- Positioning: Centered horizontally, 120px from bottom
- Optional: Small subtitle '99% Quality Score | Performance Engineering' in 24px gray

Accent Elements:
- One thin horizontal line (#0071E3) above tagline, 2px height, 200px width
- Optional: Small geometric accent in corner (Electric Blue, 1% of canvas)

Lighting: High-key, studio photography aesthetic, barely perceptible shadows

Style: Luxury brand card, like Apple's product announcements

Format: PNG or JPG (1.5MB max), HDR-ready"
```

### OG Image Variants
```
Default (Generic):     1200x630px with logo + tagline
LinkedIn Specific:     1200x627px, formatted for LinkedIn preview
Twitter Card:          1024x512px (cropped version)
Mobile Preview:        800x418px (vertical-safe composition)
```

---

## 📄 Part 4: Design Tokens for Implementation

### Color Tokens (Implement in CSS/Tailwind)

```css
/* Primary Palette */
--color-white-primary:    #FFFFFF;
--color-white-secondary:  #F5F5F7;
--color-white-tertiary:   #EFEFEF;

--color-black-primary:    #1D1D1F;
--color-black-secondary:  #6F6F77;
--color-black-tertiary:   #A1A1A6;

--color-blue-primary:     #0071E3;  /* CTA, Logo accent */
--color-blue-hover:       #0077ED;
--color-blue-active:      #0051B3;

--color-green-success:    #34C759;
--color-red-error:        #FF3B30;
--color-orange-warning:   #FF9500;
--color-purple-tertiary:  #AF52DE;

/* Border & Shadows */
--color-border-primary:   #E5E5E7;
--color-border-secondary: #D2D2D7;
--color-shadow-subtle:    rgba(0, 0, 0, 0.08);
--color-shadow-medium:    rgba(0, 0, 0, 0.12);
--color-shadow-heavy:     rgba(0, 0, 0, 0.18);
```

### Typography Tokens

```
/* Font Stack */
--font-family-primary: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
                       'SF Pro Text', Helvetica, Arial, sans-serif;
--font-family-mono:    'SF Mono', Monaco, 'Cascadia Code', monospace;

/* Heading Scales */
H1: 56px / 700 / -0.4px letter-spacing / line-height: 1.1
H2: 42px / 600 / -0.4px letter-spacing / line-height: 1.2  
H3: 32px / 600 / -0.3px letter-spacing / line-height: 1.3
H4: 24px / 600 / -0.2px letter-spacing / line-height: 1.4

/* Body Scales */
Body Large:  18px / 400 / 0px / line-height: 1.6
Body:        16px / 400 / 0px / line-height: 1.6
Body Small:  14px / 500 / 0px / line-height: 1.5
Label:       12px / 600 / uppercase / line-height: 1.4
Caption:     11px / 400 / 0px / line-height: 1.3
```

### Spacing System (8px baseline)

```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
4xl:  80px
5xl:  96px
6xl:  120px

/* Safe Areas */
--logo-max-height:     32px;      /* Header logo size */
--logo-min-padding:    8px;       /* Clearance around logo */
--navbar-height:       64px;      /* Desktop nav height */
--safe-area-margins:   16px 32px; /* Mobile/desktop safe zones */
```

### Animation Tokens

```
/* Timing Functions */
--ease-entrance:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* Spring-like */
--ease-exit:        cubic-bezier(0.4, 0, 0.2, 1);       /* Standard Apple */
--ease-interact:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Balanced */

/* Durations */
--duration-micro:   100ms;   /* Micro-interactions */
--duration-quick:   150ms;   /* Quick feedback */
--duration-base:    200ms;   /* Standard transitions */
--duration-slow:    300ms;   /* Deliberate animations */
--duration-reveal:  500ms;   /* Scroll reveals */
--duration-epic:    800ms;   /* Page transitions */

/* Stagger Pattern */
--stagger-delay:    0.12s;   /* Between animated children */
--stagger-initial:  0.1s;    /* First child delay */
```

### Component Tokens

```
/* Buttons */
--btn-primary-bg:       #0071E3;
--btn-primary-text:     #FFFFFF;
--btn-primary-padding:  12px 28px;     /* Desktop: 14px 32px */
--btn-primary-radius:   6px;
--btn-primary-hover-bg: #0077ED;
--btn-primary-shadow:   0 2px 8px rgba(0, 113, 227, 0.15);

--btn-secondary-bg:     transparent;
--btn-secondary-border: 1px solid #E5E5E7;
--btn-secondary-text:   #1D1D1F;
--btn-secondary-hover:  #F5F5F7;

/* Cards */
--card-bg:         #FFFFFF;
--card-border:     1px solid #E5E5E7;
--card-radius:     8px;
--card-padding:    24px;
--card-shadow:     0 1px 3px rgba(0, 0, 0, 0.08);
--card-hover:      translateY(-4px);
--card-shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.12);

/* Inputs */
--input-height:    44px;     /* Touch target minimum */
--input-padding:   12px 16px;
--input-radius:    8px;
--input-border:    1px solid #E5E5E7;
--input-focus:     #0071E3;
```

---

## 🔧 Part 5: Implementation Checklist

### Logo Assets to Generate & Store

```
/public/logo/
  ├── logo.svg              (Primary wordmark + symbol, 1000x1000px export)
  ├── logo-symbol.svg       (Symbol only, 1000x1000px export)
  ├── logo-horizontal.svg   (Wordmark + symbol horizontal, 2000x600px)
  ├── logo-vertical.svg     (Stacked version, 600x800px)
  └── logo-monochrome.svg   (Black version for print)
```

### Favicon Assets to Generate & Store

```
/public/
  ├── favicon.ico                   (Multi-resolution: 16x16, 32x32, 48x48)
  ├── favicon-32x32.png            (Browser tab)
  ├── favicon-16x16.png            (Browser tab backup)
  ├── apple-touch-icon.png         (180x180 for iOS home screen)
  ├── android-chrome-192x192.png   (PWA manifest)
  └── android-chrome-512x512.png   (PWA splash screens)
```

### Social Media Assets

```
/public/og/
  ├── og-image-default.png   (1200x630px, generic)
  ├── og-image-linkedin.png  (1200x627px, LinkedIn optimized)
  ├── og-image-twitter.png   (1024x512px, Twitter card)
  └── og-image-mobile.png    (800x418px, mobile preview safe)
```

### Manifest Files

```
/public/
  ├── site.webmanifest       (PWA manifest with all icon references)
  └── robots.txt             (SEO crawling rules)
```

---

## ✅ Quality Assurance Checklist

Logo Design:
- [ ] Legible at 32x32px minimum
- [ ] Recognizable in black and white
- [ ] Works on all background colors
- [ ] Scalable from favicon to billboard
- [ ] Professional enough for business cards/LinkedIn

Favicon:
- [ ] Crisp at 16x16px on browser tab
- [ ] 180x180 appears well on iOS home screen
- [ ] Works with both light and dark OS themes
- [ ] Sufficient contrast (WCAG AAA)
- [ ] Icon Formats: ICO, PNG (iOS), WebP (PWA)

OG Images:
- [ ] Displays correctly in LinkedIn share preview
- [ ] Twitter card shows full image without crop
- [ ] Text readable on mobile (test 320px viewport)
- [ ] Logo/tagline proportions look balanced
- [ ] File size <300KB for web distribution

---

## 📊 Brand Guidelines Summary

| Element | Specification | Use Case |
|---------|--------------|----------|
| **Logo** | 512x512px, SVG | Website header, social profiles |
| **Favicon** | 16x16, 32x32, 180x180 | Browser tabs, iOS home screen |
| **OG Image** | 1200x630px, PNG | Social sharing (LinkedIn, Twitter) |
| **Color** | #0071E3 (primary accent) | CTA buttons, highlights |
| **Typography** | SF Pro Display / Inter | Headlines, body text |
| **Safe Area** | 64px padding | Logo composition margin |

---

## 🚀 Next Steps

1. **Generate Logo**: Use primary prompt with Midjourney or Nano Banana 2
2. **Create Favicon**: Use favicon prompt for small icon generation
3. **Design OG Image**: Use OG image prompt or request from designer
4. **Implement Assets**: Store in `/public/` with proper file structure
5. **Update Metadata**: Apply design tokens and colors to layout.tsx
6. **Test**: Verify favicon on browser, OG image on social platforms
7. **Deploy**: Push to Vercel with all asset files

---

**Last Updated:** April 9, 2026  
**Status:** Ready for Image Generation  
**Format:** Markdown + Implementation Guide
