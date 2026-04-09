# Testing & Verification Guide

**Versión:** 2.0 | **Fecha:** 9 de Abril de 2026

Este documento describe cómo verificar que el rediseño funciona correctamente en todos los navegadores y cumple con estándares de accesibilidad.

---

## ✅ Testing Checklist

### 1. Contraste y Accesibilidad

#### Verificación automática:
```javascript
// En la consola del navegador (Dev Tools → Console)
import { auditColorSystem } from '@/lib/a11y/contrast'
auditColorSystem()
```

**Resultado esperado:**
```
🎨 Color Contrast Audit
============================================================
✅ AAA text-primary-on-white             Ratio: 11.20:1
✅ AAA text-secondary-on-white           Ratio: 7.80:1
✅ AA  text-tertiary-on-white            Ratio: 4.50:1
✅ AAA primary-on-white                  Ratio: 6.50:1
...
✅ All contrasts pass WCAG AA standards!
```

#### Herramientas manuales:
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
  - Ingresa dos colores hex y verifica ratio
  
- **Accessible Colors:** https://accessible-colors.com/
  - Visualización interactiva de contraste

- **Chrome DevTools:**
  - Inspecta elemento → selecciona texto
  - Chrome muestra ratio de contraste automáticamente

---

### 2. Testing en Navegadores

#### Navegadores principales (todas las versiones recientes):
- [ ] **Chrome** (118+)
- [ ] **Safari** (17+) — especialmente importante para Apple design
- [ ] **Firefox** (119+)
- [ ] **Edge** (118+)

#### Dispositivos a probar:
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (iPad Pro, 1024×1366)
- [ ] Mobile (iPhone 14, 390×844)
- [ ] Mobile (Android, 412×915)

---

### 3. Visual Regression Testing

#### Sistema de diseño nuevo vs anterior:

| Componente | Verificar |
|-----------|----------|
| **Navbar** | Logo, navegación, responsividad, scrolled state |
| **Hero** | Typography, spacing, gradient |
| **Cards Blog** | Image, title, border, hover effects |
| **Admin Sidebar** | Background, active states, icons, hover |
| **Admin Topbar** | Breadcrumb, icons, notifications |
| **Buttons** | Primary, secondary, ghost states |
| **Forms** | Inputs, focus ring, labels |
| **Footer** | Layout, links, spacing |

#### Cómo testear:
1. Abre la página en el navegador
2. Compara visual con screenshots previos
3. Busca: cambios inesperados, elementos desalineados, colores incorrectos
4. Prueba hover states (desktop) y tap states (mobile)

---

### 4. Tipografía y Spacing

#### Verificar:
- [ ] **Font family:** `SF Pro Display` (Mac) o font stack fallback
- [ ] **Font smoothing:** Texto clear y anti-aliased
- [ ] **Line heights:** Readability adecuada
- [ ] **Letter spacing:** Visible pero no exagerado

#### Tamaños clave a probar:
- H1 (36px) en servicios/blog pages
- Body text (15px) natural
- Small text (12px) labels y hints
- Inputs (15px) con padding

---

### 5. Responsividad

#### Breakpoints a probar:
```
sm: 640px  (max-width)
md: 768px  (max-width)
lg: 1024px (max-width)
xl: 1280px (max-width)
2xl: 1536px
```

#### Testing steps:
1. Abre DevTools (F12)
2. Habilita "Device Toolbar"
3. Prueba cada breakpoint
4. Verifica que no hay overflow horizontal
5. Prueba navbar mobile menu

**Página crítica para mobile:** `/blog`, `/servicios`, `/contacto`

---

### 6. Color System Verification

#### Colores a verificar visualmente:
- [ ] **Backgrounds:** White (#fff), light gray (#f5f5f7), gray (#efefef)
- [ ] **Text:** Primary (#1d1d1f) = Negro puro, Secondary (#424245), Tertiary (#6f6f74)
- [ ] **Primary:** Blue (#0071e3) en botones y links
- [ ] **Accents:** Green, red, orange, purple en status indicators
- [ ] **Borders:** Dividers grises sutiles (#e5e5e7)

#### Verificación visual:
```
Expected:
- Colores neutros, no saturados
- Gray scale natural (sin tonos azules/verdes)
- Primary blue clean y moderno
- Contraste suficiente en todos textos
```

---

### 7. Dark Mode Testing (Preparado)

#### Activar dark mode:
- **Mac:** System Settings → Appearance → Dark
- **Windows:** Settings → Personalization → Colors → Dark
- **iPhone:** Settings → Display & Brightness → Dark
- **Android:** Settings → Display → Dark Theme

#### Verificar:
- [ ] Pagina responde a `prefers-color-scheme: dark`
- [ ] Colores se invierten correctamente
- [ ] Contraste sin perder legibilidad
- [ ] No hay "broken" images o colores

**Nota:** Dark mode está preparado en CSS pero no activado visualmente aún.

---

### 8. Focus & Keyboard Navigation

#### Testing steps:
1. Abre una página
2. Presiona `Tab` (navega entre elementos)
3. `Shift + Tab` (navega atrás)
4. `Enter` (clickea links/buttons)
5. `Space` (clickea buttons)

#### Verificar:
- [ ] Focus ring visible (blue outline)
- [ ] Focus orden lógico (top to bottom)
- [ ] Links enfocables
- [ ] Buttons enfocables
- [ ] Inputs editable con Tab

---

### 9. Screen Reader Testing

#### Herramientas:
- **Mac:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (gratuito) o JAWS (pago)
- **iPhone:** VoiceOver (Settings → Accessibility)
- **Android:** TalkBack (Settings → Accessibility)

#### Verificar:
- [ ] Headers anunciados correctamente (h1, h2, h3)
- [ ] Links tienen texto descriptivo
- [ ] Botones tienen etiquetas
- [ ] Imágenes tienen alt text
- [ ] Formularios tienen labels asociados

---

### 10. Performance

#### Tools:
- **Lighthouse** (Chrome DevTools → Lighthouse)
- **WebPageTest:** https://www.webpagetest.org/
- **Core Web Vitals:** https://web.dev/vitals/

#### Métricas a verificar:
- [ ] LCP (Cumulative Layout Shift) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Accessibility score > 90

#### Run Lighthouse:
```
1. DevTools → Lighthouse
2. Select "Mobile" or "Desktop"
3. Click "Analyze page load"
4. Review results
```

---

## 🔄 Testing Workflow

### Pre-deployment checklist:
```
✅ Contraste cumple WCAG AA (mínimo)
✅ Funcional en Chrome, Safari, Firefox
✅ Responsive en mobile (390px) y desktop (1920px)
✅ Navbar y admin sidebar visuales OK
✅ Sin errors en console (F12 → Console)
✅ Dark mode CSS preparado (si se activa)
✅ Botones y forms funcionan
✅ Links navigables
✅ Lighthouse score > 90
✅ Keyboard navigation funciona
```

### Post-deployment:
```
✅ Test en producción URL
✅ Monitor errors (Sentry, Vercel logs)
✅ User feedback en primeras 24h
✅ Mobile testing real (iPhone, Android)
```

---

## 🐛 Testing en Local

### Environment setup:
```bash
# Instala dependencias
npm install

# Run dev server
npm run dev

# Open in browser
open http://localhost:3000
```

### Check styles:
```bash
# Lint CSS/TS
npm run lint

# Type check
npx tsc --noEmit
```

### Build test:
```bash
# Build para producción
npm run build

# Start production server
npm start
```

---

## 📊 Resultado esperado

Después de testing, deberías ver:

✅ **Visual:** Interfaz limpia, Apple-like, coherente
✅ **Accessible:** Todos textos legibles, WCAG AA+
✅ **Performance:** Lighthouse > 90
✅ **Responsive:** Funciona en cualquier pantalla
✅ **Dark mode:** Preparado para futuro

---

## 🆘 Troubleshooting

### "Contraste bajo en tal elemento"
→ Verifica variables CSS en `tailwind.config.ts` o `globals.css`

### "Dark mode looks weird"
→ Dark mode está preparado pero no activo. Para activar: busca `prefers-color-scheme: dark` en CSS

### "Navbar text invisible en scroll"
→ Verifica opacidad en `navbar.tsx` (bg-white/40 → bg-white/80 on scroll)

### "Buttons no responden en mobile"
→ Verifica touch target (mínimo 44×44px)

---

## 📝 Notas

1. **Este testing es continuado:** Después de deploy, monitorea con Lighthouse regularmente
2. **Dark mode:** Está preparado pero no activado. Próxima fase: toggle + localStorage
3. **A11y:** Accesibilidad es continua, no one-time thing
4. **Performance:** Monitorea Core Web Vitals en Google Analytics

---

**Mantenido por:** Carlos Cervantes | **Última actualización:** 9 de Abril 2026
