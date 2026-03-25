# Professional Brand Identity

## Logo Design

Your brand features a modern, clean identity for a Senior QA Engineer.

### Design Elements

- **Color**: Electric Blue (`#0071E3`) — conveys trust, professionalism, and technical expertise
- **CC Initials**: Bold, modern typography
- **QA Identity**: Clean, precision-focused aesthetic

### Current Asset Files

```
public/
├── favicon.ico                   # Browser tab icon (16×16 + 32×32, binary ICO)
└── images/
    ├── favicon.svg               # Scalable favicon for modern browsers (SVG)
    ├── apple-touch-icon.svg      # iOS home screen icon (180×180)
    ├── logo-icon.svg             # Standalone icon for nav/branding
    └── profile.jpg               # Profile photo
```

---

## Favicon Usage

Favicon tags are integrated in `views/partials/header.ejs`:

```html
<link rel="shortcut icon" href="/favicon.ico">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.svg">
```

> `favicon.ico` is a valid binary ICO file (16×16 + 32×32 px). No regeneration needed.

---

## Navigation Logo

```html
<a href="/" class="nav-brand">
  <img src="/images/logo-icon.svg" alt="CC Logo" class="brand-logo">
  <span class="brand-name">CervantesQA</span>
</a>
```

### Logo Features

- **Hover Animation**: Logo scales and rotates slightly on hover
- **Gradient Text**: Brand name has a gradient effect
- **Drop Shadow**: Blue glow effect
- **Responsive**: Scales on all screen sizes and themes

---

## Brand Colors

```css
Primary Blue:    #0071E3   /* Main brand color — buttons, accents */
Dark Blue:       #003D99   /* Hover states, secondary elements */
Accent Cyan:     #00D9FF   /* Highlights, badges */
Success Green:   #28A745   /* Positive states */
Text Primary:    #1D1D1F   /* Body text (light mode) */
Text Secondary:  #6E6E73   /* Muted text */
```

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Body / UI | Inter | 300–900 |
| Display / Headings | Space Grotesk | 300–700 |
| Code / Terminal | JetBrains Mono | 400–700 |

All loaded via Google Fonts CDN in `views/partials/header.ejs`.

---

## Brand Guidelines

### Do's
- Use `#0071E3` as the primary accent color consistently
- Keep `favicon.ico` and `favicon.svg` in sync visually
- Use Inter for all UI text

### Don'ts
- Do not rename `favicon.ico` to `.svg` or another format
- Do not add SVG-only favicon files for pixel-sized variants — use `favicon.ico` for those
- Do not change primary colors without updating CSS variables in `style-apple.css`

---

## Dark Mode Support

The UI automatically adapts to dark mode via CSS variables. See `public/css/style-apple.css` for the `[data-theme="dark"]` overrides.

---

## Future Enhancements

- [ ] Animated logo for loading states
- [ ] Logo variations (icon only, text only)
- [ ] Social media profile images (square format)
- [ ] Email signature version

---

## Credits

Designed for Carlos Cervantes — Senior QA Engineer  
Updated: March 2026  
Style: Modern, Technical, Professional
