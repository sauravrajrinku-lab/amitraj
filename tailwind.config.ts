import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          bg: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          accent: "var(--accent-primary)",
          accent2: "var(--accent-secondary)",
          text1: "var(--text-primary)",
          text2: "var(--text-secondary)",
          border: "var(--border-color)",
          cta: "var(--cta-color)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
