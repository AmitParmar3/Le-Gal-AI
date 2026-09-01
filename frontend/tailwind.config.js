/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: "var(--bg-base)",
        bgSurface: "var(--bg-surface)",
        bgSurfaceActive: "var(--bg-surface-active)",
        borderSubtle: "var(--border-subtle)",
        borderAccent: "var(--border-accent)",
        textPrimary: "var(--text-primary)",
        textMuted: "var(--text-muted)",
        accentRiskHigh: "var(--accent-risk-high)",
        accentPurple: "var(--accent-purple)",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "0px",
      },
    },
  },
  plugins: [],
};
