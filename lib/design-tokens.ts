// Centralized Color & Design Token Configuration
// Maps CSS variables to design tokens used throughout the app

export const designTokens = {
  // Primary Colors
  colors: {
    // Neutrals (90% of design)
    white: '#ffffff',
    'white-secondary': '#f5f5f7',
    'white-tertiary': '#efefef',
    'gray-light': '#d2d2d7',
    'gray-medium': '#555555',
    'gray-dark': '#1d1d1f',
    black: '#000000',

    // Accent Colors (max 20% of design)
    blue: '#0071e3',
    'blue-hover': '#0077f0',
    'blue-active': '#0051b3',
    green: '#34c759',
    orange: '#ff9500',
    red: '#ff3b30',
  },

  // Typography
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },
    fontSizes: {
      h1: 'clamp(2.25rem, 6vw, 3.75rem)',
      h2: 'clamp(1.875rem, 5vw, 2.625rem)',
      h3: 'clamp(1.5rem, 3vw, 2rem)',
      h4: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      body: '1rem',
      'body-sm': '0.875rem',
      label: '0.75rem',
      caption: '0.6875rem',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5rem',
    '5xl': '6rem',
    '6xl': '7.5rem',
  },

  // Sizing
  sizing: {
    header: '60px',
    'max-width-full': '1200px',
    'max-width-large': '1000px',
    'max-width-medium': '800px',
    'max-width-small': '600px',
  },

  // Borders
  borders: {
    'radius-sm': '6px',
    'radius-md': '8px',
    'radius-lg': '12px',
    'radius-full': '9999px',
    'width': '1px',
    'color': 'rgba(0, 0, 0, 0.08)',
    'color-hover': 'rgba(0, 0, 0, 0.15)',
    'color-accent': 'rgba(0, 113, 227, 0.2)',
  },

  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 2px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.12)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.15)',
    header: '0 1px 0 rgba(0, 0, 0, 0.1)',
    card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },

  // Animations
  animations: {
    'duration-fast': '100ms',
    'duration-base': '150ms',
    'duration-slow': '300ms',
    'duration-slower': '500ms',
    'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Z-Index
  zIndex: {
    'base': 0,
    'dropdown': 100,
    'sticky': 50,
    'modal': 1000,
    'popover': 900,
    'tooltip': 800,
  },
}

// Tailwind class name mappings for easy use
export const clsColor = {
  // Background colors
  bgWhite: 'bg-white',
  bgWhiteSecondary: 'bg-white-secondary',
  bgWhiteTertiary: 'bg-white-tertiary',
  bgGrayLight: 'bg-gray-light',
  bgGrayDark: 'bg-gray-dark',
  bgBlue: 'bg-blue',
  bgBlueHover: 'bg-blue-hover',

  // Text colors
  textWhite: 'text-white',
  textGrayDark: 'text-gray-dark',
  textGraySecondary: 'text-gray-secondary',
  textBlue: 'text-blue',
  textGreen: 'text-green',

  // Border colors
  borderGrayLight: 'border-gray-light',
  borderBlue: 'border-blue',
  borderGrayDark: 'border-gray-dark',

  // Utilities
  shadow: 'shadow',
  shadowMd: 'shadow-md',
  shadowLg: 'shadow-lg',
}
