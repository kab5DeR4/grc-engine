/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#171e19",
        charcoal: "#171e19",
        'dark-gray': '#272727',
        sage: '#b7c6c2',
        yellow: '#ffe17c',
        card: "#ffffff",
        border: "rgba(23, 30, 25, 0.1)", // Charcoal at 10%
        primary: "#ffe17c",
        "primary-foreground": "#171e19",
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-up': 'fade-in-up 0.8s ease-out forwards',
        'border-spin': 'border-spin 2.5s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-spin': {
          '0%': { '--gradient-angle': '0deg' },
          '100%': { '--gradient-angle': '360deg' },
        },
        'shimmer': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
