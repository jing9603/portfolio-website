import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        ink: "var(--color-ink)",
        mist: "var(--color-mist)",
        line: "var(--color-line)",
        accent: "var(--color-accent)",
        accentSoft: "var(--color-accent-soft)"
      },
      fontFamily: {
        body: "var(--font-body)",
        display: "var(--font-display)"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(21, 34, 34, 0.08)",
        soft: "0 16px 48px rgba(16, 23, 23, 0.07)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(11, 30, 30, 0.05) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
