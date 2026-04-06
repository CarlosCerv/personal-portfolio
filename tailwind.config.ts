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
        background: {
          DEFAULT: "var(--background)",
          alt: "var(--background-alt)",
        },
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0071e3",
          hover: "#0077ed",
        },
        secondary: {
          DEFAULT: "#1d1d1f",
          muted: "#86868b",
        },
        border: "#d2d2d7",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
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
        xl: "12px",
        "2xl": "20px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
export default config;
