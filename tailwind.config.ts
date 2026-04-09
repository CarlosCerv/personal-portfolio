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
        // Light Premium Apple-style Palette
        background: {
          DEFAULT: "#FFFFFF",
          alt: "#F5F5F7",
          tertiary: "#F0F0F3",
        },
        text: {
          primary: "#1D1D1F",
          secondary: "#6F6F77",
          tertiary: "#A1A1A6",
        },
        accent: {
          cyan: "#06B6D4",
          indigo: "#0071E3",
          light: "#F5F5F7",
        },
        border: {
          primary: "rgba(0, 0, 0, 0.08)",
          secondary: "rgba(0, 0, 0, 0.04)",
          accent: "rgba(0, 113, 227, 0.2)",
        },
        // CSS Variable-based colors for consistency
        blue: "#0071E3",
        "blue-hover": "#0077F0",
        "blue-active": "#0051B3",
        green: "#34C759",
        orange: "#FF9500",
        red: "#FF3B30",
        white: "#FFFFFF",
        "white-secondary": "#F5F5F7",
        "white-tertiary": "#EFEFEF",
        "gray-light": "#D2D2D7",
        "gray-medium": "#555555",
        "gray-dark": "#1D1D1F",
        black: "#000000",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Roboto Flex",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Fira Code", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      fontSize: {
        "xs": ["11px", { lineHeight: "16px", letterSpacing: "0.05em" }],
        "sm": ["13px", { lineHeight: "18px", letterSpacing: "0.01em" }],
        "base": ["15px", { lineHeight: "24px", letterSpacing: "0em" }],
        "lg": ["17px", { lineHeight: "26px", letterSpacing: "-0.01em" }],
        "xl": ["20px", { lineHeight: "30px", letterSpacing: "-0.01em" }],
        "2xl": ["24px", { lineHeight: "34px", letterSpacing: "-0.02em" }],
        "3xl": ["30px", { lineHeight: "40px", letterSpacing: "-0.02em" }],
        "4xl": ["36px", { lineHeight: "46px", letterSpacing: "-0.03em" }],
        "5xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.03em" }],
        "6xl": ["60px", { lineHeight: "72px", letterSpacing: "-0.04em" }],
        "7xl": ["72px", { lineHeight: "84px", letterSpacing: "-0.04em" }],
      },
      boxShadow: {
        xs: "0 2px 4px rgba(0, 0, 0, 0.3)",
        sm: "0 4px 8px rgba(0, 0, 0, 0.4)",
        md: "0 8px 16px rgba(0, 0, 0, 0.5)",
        lg: "0 16px 32px rgba(0, 0, 0, 0.6)",
        xl: "0 20px 48px rgba(0, 0, 0, 0.7)",
        glow: "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-lg": "0 0 40px rgba(6, 182, 212, 0.4)",
      },
      backdropFilter: {
        none: "none",
        sm: "blur(4px)",
        md: "blur(12px)",
        lg: "blur(20px)",
      },
      ringColor: {
        DEFAULT: "#0071E3",
        cyan: "#06B6D4",
        indigo: "#0071E3",
      },
      ringOffsetColor: {
        background: "#FFFFFF",
        "background-alt": "#F5F5F7",
      },
      spacing: {
        header: "60px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
export default config;
