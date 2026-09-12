/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // semantic surface tokens — mapped via CSS vars in index.css
        ground: "var(--ground)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        ink: "var(--ink)",
        "ink-secondary": "var(--ink-secondary)",
        "ink-muted": "var(--ink-muted)",
        hairline: "var(--hairline)",
        "hairline-subtle": "var(--hairline-subtle)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-subtle": "var(--accent-subtle)",
        pass: "var(--pass)",
        "pass-surface": "var(--pass-surface)",
        fail: "var(--fail)",
        "fail-surface": "var(--fail-surface)",
        warn: "var(--warn)",
        "warn-surface": "var(--warn-surface)",
        "code-surface": "var(--code-surface)",
        "code-ink": "var(--code-ink)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      fontSize: {
        // fluid type scale via clamp()
        'display': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['clamp(1.375rem, 2.5vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h3': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['clamp(0.9375rem, 1vw, 1rem)', { lineHeight: '1.6' }],
        'body-sm': ['clamp(0.8125rem, 0.9vw, 0.875rem)', { lineHeight: '1.5' }],
        'caption': ['clamp(0.6875rem, 0.8vw, 0.75rem)', { lineHeight: '1.4', fontWeight: '500' }],
        'mono-label': ['clamp(0.625rem, 0.7vw, 0.6875rem)', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.1em' }],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        // only two shadows — no neumorphism
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
        // keep tailwind defaults for lg/xl/2xl
      },
      animation: {
        'fade-up': 'fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        'workspace': '1400px',
        'editorial': '1152px',
        'prose': '768px',
      },
    },
  },
  plugins: [],
}
