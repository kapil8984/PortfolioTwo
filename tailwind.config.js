/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0D12',
          surface: '#121722',
          card: '#161D2C',
          cardHover: '#1B2436',
          border: '#232C40',
          textMuted: '#94A3B8',
          textHeading: '#F1F5F9'
        },
        light: {
          bg: '#F7F8FC',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          cardHover: '#F1F4F9',
          border: '#E2E8F0',
          textMuted: '#64748B',
          textHeading: '#0F172A'
        },
        brand: {
          primary: '#7C5CFC',
          primaryHover: '#6A46F0',
          primaryGlow: 'rgba(124, 92, 252, 0.25)',
          secondary: '#35D0BA',
          secondaryHover: '#29BFA9',
          secondaryGlow: 'rgba(53, 208, 186, 0.25)',
          accent: '#FF7B54'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(124, 92, 252, 0.3)',
        'glow-secondary': '0 0 25px -5px rgba(53, 208, 186, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
