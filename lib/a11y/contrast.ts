/**
 * Accessibility & Contrast Utilities
 * Verificación de contraste WCAG y accesibilidad
 */

interface ContrastCheckResult {
  ratio: number
  wcagAA: boolean
  wcagAAA: boolean
  normalText: boolean
  largeText: boolean
  level: 'fail' | 'AAA' | 'AA' | 'enhanced'
}

/**
 * Convierte un color hex a RGB
 */
function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ]
}

/**
 * Calcula la luminancia relativa de un color (según WCAG)
 */
function getLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map(val => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calcula el ratio de contraste entre dos colores (según WCAG)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid hex color format')
  }

  const l1 = getLuminance(rgb1)
  const l2 = getLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Verifica si un contraste cumple con estándares WCAG
 */
export function checkContrast(
  color1: string,
  color2: string,
  type: 'normal' | 'large' = 'normal'
): ContrastCheckResult {
  const ratio = Math.round(getContrastRatio(color1, color2) * 100) / 100

  // WCAG Guidelines:
  // Normal text: AA = 4.5:1, AAA = 7:1
  // Large text (18pt+ or 14pt+ bold): AA = 3:1, AAA = 4.5:1
  
  const isLarge = type === 'large'
  const wcagAA = isLarge ? ratio >= 3 : ratio >= 4.5
  const wcagAAA = isLarge ? ratio >= 4.5 : ratio >= 7

  let level: 'fail' | 'AAA' | 'AA' | 'enhanced' = 'fail'
  if (wcagAAA) level = 'AAA'
  else if (wcagAA) level = 'AA'

  return {
    ratio,
    wcagAA,
    wcagAAA,
    normalText: ratio >= 4.5,
    largeText: ratio >= 3,
    level,
  }
}

/**
 * Verifica múltiples combinaciones de colores (el sistema actual)
 */
export function auditColorSystem(): void {
  const colors = {
    // Text on white
    'text-primary-on-white': ['#1d1d1f', '#ffffff'],
    'text-secondary-on-white': ['#424245', '#ffffff'],
    'text-tertiary-on-white': ['#6f6f74', '#ffffff'],
    
    // Primary on white
    'primary-on-white': ['#0071e3', '#ffffff'],
    
    // Buttons
    'primary-button-text': ['#ffffff', '#0071e3'],
    'primary-button-hover': ['#ffffff', '#0077ed'],
    
    // Borders on background
    'border-on-white': ['#d2d2d7', '#ffffff'],
    'divider-on-white': ['#e5e5e7', '#ffffff'],
    
    // Semantic colors
    'green-on-white': ['#34c759', '#ffffff'],
    'red-on-white': ['#ff3b30', '#ffffff'],
    'orange-on-white': ['#ff9500', '#ffffff'],
  }

  console.log('🎨 Color Contrast Audit\n')
  console.log('=' .repeat(60))

  let issuesFound = 0

  Object.entries(colors).forEach(([name, [fg, bg]]) => {
    const result = checkContrast(fg, bg, 'normal')
    const status =
      result.level === 'AAA' ? '✅ AAA' : result.level === 'AA' ? '⚠️  AA' : '❌ FAIL'
    
    if (!result.wcagAA) issuesFound++
    
    console.log(
      `${status} ${name.padEnd(30)} Ratio: ${result.ratio.toFixed(2)}:1`
    )
  })

  console.log('=' .repeat(60))
  if (issuesFound === 0) {
    console.log('✅ All contrasts pass WCAG AA standards!\n')
  } else {
    console.log(`⚠️  ${issuesFound} contrast issues found.\n`)
  }
}

// Auto-run audit in development
if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // Run in browser console on load
    window.addEventListener('DOMContentLoaded', () => {
      console.log('💡 Tip: Run auditColorSystem() in console to check contrasts')
    })
  }
}

export default {
  getContrastRatio,
  checkContrast,
  auditColorSystem,
}