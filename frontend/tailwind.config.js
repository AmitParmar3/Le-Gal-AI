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
        accentNavy: "var(--accent-navy)",
      },
      fontFamily: {
        serif: ["Libre Baskerville", "Baskerville", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
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
