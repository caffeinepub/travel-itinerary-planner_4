import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        terracotta: {
          50:  'oklch(0.97 0.02 38)',
          100: 'oklch(0.93 0.05 38)',
          200: 'oklch(0.86 0.09 38)',
          300: 'oklch(0.76 0.12 38)',
          400: 'oklch(0.66 0.14 38)',
          500: 'oklch(0.58 0.14 38)',
          600: 'oklch(0.48 0.13 38)',
          700: 'oklch(0.38 0.11 38)',
          800: 'oklch(0.30 0.08 38)',
          900: 'oklch(0.22 0.05 38)',
        },
        forest: {
          50:  'oklch(0.96 0.02 145)',
          100: 'oklch(0.90 0.05 145)',
          200: 'oklch(0.80 0.08 145)',
          300: 'oklch(0.68 0.10 145)',
          400: 'oklch(0.56 0.11 145)',
          500: 'oklch(0.45 0.10 145)',
          600: 'oklch(0.36 0.09 145)',
          700: 'oklch(0.28 0.07 145)',
          800: 'oklch(0.22 0.05 145)',
          900: 'oklch(0.16 0.03 145)',
        },
        sand: {
          50:  'oklch(0.99 0.005 80)',
          100: 'oklch(0.96 0.012 76)',
          200: 'oklch(0.91 0.025 73)',
          300: 'oklch(0.84 0.038 70)',
          400: 'oklch(0.75 0.048 68)',
          500: 'oklch(0.64 0.052 65)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 2px 12px 0 rgba(100,60,20,0.08)',
        'card-hover': '0 6px 24px 0 rgba(100,60,20,0.14)',
        warm: '0 4px 20px 0 rgba(140,80,30,0.12)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out'
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
