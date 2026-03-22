/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--text-primary)",
          foreground: "var(--background)",
        },
        secondary: {
          DEFAULT: "var(--text-secondary)",
          foreground: "var(--foreground)",
        },
        muted: {
          DEFAULT: "var(--text-secondary)",
          foreground: "var(--background)",
        },
        accent: {
          DEFAULT: "var(--text-primary)",
          foreground: "var(--background)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)'],
        signika: ['var(--font-signika)'],
        'dm-sans': ['var(--font-dm-sans)'],
        'great-vibes': ['var(--font-great-vibes)'],
      },
      animation: {
        'fade-in': 'simpleFadeIn 0.3s ease-out forwards',
        'pulse-bar': 'pulseBar 1.5s ease-in-out infinite',
        'pulse-bar-delay': 'pulseBarShort 1.5s ease-in-out 0.2s infinite',
        'pulse-bar-delay2': 'pulseBar 1.5s ease-in-out 0.4s infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'bounce-x': 'bounce-x 1.5s ease-in-out infinite',
        'float-up': 'float-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
      keyframes: {
        simpleFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseBar: {
          '0%, 100%': { height: '24px', opacity: '0.6' },
          '50%': { height: '12px', opacity: '0.2' }
        },
        pulseBarShort: {
          '0%, 100%': { height: '16px', opacity: '0.6' },
          '50%': { height: '8px', opacity: '0.2' }
        },
        glow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)', filter: 'blur(10px)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)', filter: 'blur(15px)' }
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(0px)' }
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
