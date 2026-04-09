/**
 * Tailwind Configuration - Apple Light Premium Design System
 * tailwind.config.ts
 * 
 * This file extends Tailwind with custom design tokens
 * and ensures brand consistency across utility classes
 */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // ===================================
      // COLORS
      // ===================================
      colors: {
        // Primary colors
        white: {
          primary: '#ffffff',
          secondary: '#f5f5f7',
          tertiary: '#efefef',
          DEFAULT: '#ffffff',
        },
        
        // Text colors
        black: {
          primary: '#1d1d1f',
          secondary: '#6f6f77',
          tertiary: '#a1a1a6',
        },
        
        // Brand blue
        blue: {
          50: '#f0f7ff',
          100: '#e3f2fd',
          200: '#bbdefb',
          300: '#90caf9',
          400: '#64b5f6',
          500: '#42a5f5',
          600: '#2196f3',
          primary: '#0071e3',  // Apple Blue
          hover: '#0077ed',    // Hover state
          active: '#0051b3',   // Active state
          DEFAULT: '#0071e3',
        },
        
        // Status colors
        green: {
          success: '#34c759',
          DEFAULT: '#34c759',
        },
        red: {
          error: '#ff3b30',
          DEFAULT: '#ff3b30',
        },
        orange: {
          warning: '#ff9500',
          DEFAULT: '#ff9500',
        },
        purple: {
          accent: '#af52de',
          DEFAULT: '#af52de',
        },
        
        // Border colors
        border: {
          primary: '#e5e5e7',
          secondary: '#d2d2d7',
          light: '#f5f5f7',
        },
      },

      // ===================================
      // TYPOGRAPHY
      // ===================================
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          '"SF Mono"',
          'Monaco',
          '"Cascadia Code"',
          '"Source Code Pro"',
          'monospace',
          ...defaultTheme.fontFamily.mono,
        ],
      },

      fontSize: {
        // Heading scale
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.4px', fontWeight: '700' }],
        'h2': ['2.625rem', { lineHeight: '1.2', letterSpacing: '-0.4px', fontWeight: '600' }],
        'h3': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.2px', fontWeight: '600' }],
        
        // Body scale
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        
        // Utility
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }],
        'caption': ['0.6875rem', { lineHeight: '1.3', fontWeight: '400' }],
        
        // Responsive scales (mobile first)
        'sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'lg': 'clamp(1.125rem, 3vw, 1.25rem)',
        'xl': 'clamp(1.25rem, 3.5vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 4vw, 2rem)',
        '3xl': 'clamp(2rem, 5vw, 2.625rem)',
        '4xl': 'clamp(2.625rem, 6vw, 3.5rem)',
      },

      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      letterSpacing: {
        tighter: '-0.4px',
        tight: '-0.3px',
        normal: '0px',
        wide: '0.5px',
        wider: '1px',
      },

      // ===================================
      // SPACING
      // ===================================
      spacing: {
        xs: '0.25rem',    // 4px
        sm: '0.5rem',     // 8px
        md: '1rem',       // 16px
        lg: '1.5rem',     // 24px
        xl: '2rem',       // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
        '4xl': '5rem',    // 80px
        '5xl': '6rem',    // 96px
        '6xl': '7.5rem',  // 120px
      },

      padding: {
        'safe-mobile': 'var(--safe-area-sides-mobile)',
        'safe-tablet': 'var(--safe-area-sides-tablet)',
        'safe-desktop': 'var(--safe-area-sides-desktop)',
      },

      // ===================================
      // BORDERS & SHADOWS
      // ===================================
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },

      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
        8: '8px',
      },

      boxShadow: {
        none: 'none',
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
        md: '0 4px 12px rgba(0, 0, 0, 0.12)',
        lg: '0 12px 24px rgba(0, 0, 0, 0.12)',
        xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
        
        // Component-specific
        'card': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.12)',
        'button-primary': '0 2px 8px rgba(0, 113, 227, 0.15)',
        'button-hover': '0 4px 16px rgba(0, 113, 227, 0.2)',
        
        // Inner shadow (for glassmorphism)
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'inner-dark': 'inset 0 1px 0 rgba(0, 0, 0, 0.05)',
      },

      // ===================================
      // ANIMATIONS
      // ===================================
      animation: {
        // Fade & Scale
        fade: 'fade 0.3s var(--ease-standard)',
        'fade-in': 'fadeIn 0.5s var(--ease-entrance)',
        'fade-up': 'fadeUp 0.5s var(--ease-entrance)',
        'scale-up': 'scaleUp 0.3s var(--ease-standard)',
        
        // Other animations
        'pulse': 'pulse 2s var(--ease-standard) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
      },

      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },

      // ===================================
      // TRANSITIONS
      // ===================================
      transitionDuration: {
        micro: '100ms',
        quick: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },

      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        interactive: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ===================================
      // LAYOUT
      // ===================================
      maxWidth: {
        'container-mobile': '100%',
        'container-tablet': '768px',
        'container-desktop': '1024px',
        'container-wide': '1280px',
        'container-ultra': '1536px',
      },

      zIndex: {
        auto: 'auto',
        hide: '-1',
        0: '0',
        dropdown: '100',
        sticky: '20',
        fixed: '40',
        'modal-backdrop': '50',
        modal: '60',
        popover: '70',
        tooltip: '80',
      },

      // ===================================
      // EFFECTS
      // ===================================
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        base: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },

      opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1',
        disabled: '0.5',
      },

      // ===================================
      // CUSTOM UTILITIES
      // ===================================
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'no-touch': { 'raw': '(hover: hover) and (pointer: fine)' },
        'dark': { 'raw': '(prefers-color-scheme: dark)' },
        'light': { 'raw': '(prefers-color-scheme: light)' },
        'reduced-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
      },
    },
  },

  plugins: [
    // Custom plugin for component utilities
    (({ addComponents, theme }: any) => {
      addComponents({
        // Button styles
        '.btn-primary': {
          '@apply px-8 py-3 bg-blue-primary text-white font-medium rounded-md transition-all duration-base hover:bg-blue-hover hover:shadow-button-hover active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-primary focus-visible:outline-offset-2': {},
        },
        '.btn-secondary': {
          '@apply px-8 py-3 border border-border-primary text-black-primary font-medium rounded-md transition-all duration-base hover:bg-white-tertiary active:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-primary focus-visible:outline-offset-2': {},
        },
        '.btn-small': {
          '@apply px-4 py-2 text-sm font-medium rounded-md transition-all duration-base': {},
        },

        // Card styles
        '.card': {
          '@apply bg-white border border-border-primary rounded-lg p-6 shadow-card transition-all duration-slow hover:shadow-card-hover hover:-translate-y-1': {},
        },
        '.card-compact': {
          '@apply bg-white border border-border-primary rounded-lg p-4 shadow-sm': {},
        },

        // Input styles
        '.input': {
          '@apply w-full h-11 px-4 py-3 bg-white border border-border-primary rounded-lg text-black-primary placeholder-black-tertiary transition-all duration-base focus:border-blue-primary focus:outline-none focus:ring-4 focus:ring-blue-primary/10': {},
        },

        // Badge styles
        '.badge': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white-secondary text-black-primary': {},
        },
        '.badge-blue': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-primary/10 text-blue-primary': {},
        },

        // Heading styles
        '.h1': {
          '@apply text-h1 font-bold': {},
        },
        '.h2': {
          '@apply text-h2 font-semibold': {},
        },
        '.h3': {
          '@apply text-h3 font-semibold': {},
        },

        // Text utilities
        '.text-primary': {
          '@apply text-black-primary': {},
        },
        '.text-secondary': {
          '@apply text-black-secondary': {},
        },
        '.text-tertiary': {
          '@apply text-black-tertiary': {},
        },

        // Accessibility
        '.sr-only': {
          '@apply absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-rect-0 whitespace-nowrap border-0': {},
        },
      })
    }),
  ],

  // Disable default colors if using custom
  corePlugins: {
    preflight: true,
  },

  darkMode: 'class',
}

export default config
