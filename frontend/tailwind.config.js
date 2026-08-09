/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chassis: "#e0e5ec",
        panel: "#f0f2f5",
        recessed: "#d1d9e6",
        ink: "#2d3436",
        muted: "#4a5568",
        accent: "#ff4757",
        "accent-fg": "#ffffff",
        shadow: "#babecc",
        highlight: "#ffffff",
        "deep-shadow": "#a3b1c6"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        card: "8px 8px 16px var(--shadow), -8px -8px 16px var(--highlight)",
        floating: "12px 12px 24px var(--shadow), -12px -12px 24px var(--highlight), inset 1px 1px 0 rgba(255,255,255,0.5)",
        pressed: "inset 6px 6px 12px var(--shadow), inset -6px -6px 12px var(--highlight)",
        recessed: "inset 4px 4px 8px var(--shadow), inset -4px -4px 8px var(--highlight)",
        sharp: "4px 4px 8px rgba(0,0,0,0.15), -1px -1px 1px rgba(255,255,255,0.8)",
        glow: "0 0 10px 2px rgba(255, 71, 87, 0.6)",
        "glow-green": "0 0 10px 2px rgba(34, 197, 94, 0.6)"
      },
      animation: {
        'fade-up': 'fade-in-up 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
