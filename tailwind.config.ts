import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds - Apple-inspired grays
        background: {
          DEFAULT: "var(--background)",
          alt: "var(--background-alt)",
          tertiary: "var(--background-tertiary)",
        },
        foreground: "var(--foreground)",
        
        // Text colors - Semantic gray hierarchy
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        
        // Primary accent - Modern Apple blue
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          interactive: "var(--primary-interactive)",
          hover: "var(--primary-hover)",
          active: "var(--primary-active)",
        },
        
        // Secondary accent colors
        accent: {
          blue: "var(--accent-blue)",
          green: "var(--accent-green)",
          red: "var(--accent-red)",
          orange: "var(--accent-orange)",
          yellow: "var(--accent-yellow)",
          purple: "var(--accent-purple)",
        },
        
        // Borders and dividers
        border: "var(--border)",
        divider: "var(--divider)",
        
        // Surface colors with transparency
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
          overlay: "var(--surface-overlay)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Myriad Set Pro"',
          '"SF Pro Icons"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
      fontSize: {
        "xs": ["12px", { lineHeight: "16px", letterSpacing: "-0.01em" }],
        "sm": ["13px", { lineHeight: "18px", letterSpacing: "-0.01em" }],
        "base": ["15px", { lineHeight: "22px", letterSpacing: "-0.01em" }],
        "lg": ["17px", { lineHeight: "26px", letterSpacing: "-0.02em" }],
        "xl": ["20px", { lineHeight: "30px", letterSpacing: "-0.02em" }],
        "2xl": ["24px", { lineHeight: "34px", letterSpacing: "-0.03em" }],
        "3xl": ["30px", { lineHeight: "40px", letterSpacing: "-0.03em" }],
        "4xl": ["36px", { lineHeight: "46px", letterSpacing: "-0.04em" }],
      },
      boxShadow: {
        xs: "0 2px 4px rgba(0, 0, 0, 0.04)",
        sm: "0 4px 8px rgba(0, 0, 0, 0.06)",
        md: "0 8px 16px rgba(0, 0, 0, 0.08)",
        lg: "0 12px 24px rgba(0, 0, 0, 0.10)",
        xl: "0 16px 32px rgba(0, 0, 0, 0.12)",
        "2xl": "0 24px 48px rgba(0, 0, 0, 0.14)",
        elevation: "0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.06)",
        "elevation-2": "0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.08)",
        card: "0 4px 12px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
export default config;
