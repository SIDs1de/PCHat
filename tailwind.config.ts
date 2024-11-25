import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        accent: '#3fb2ff',
        'accent-on-hover': '#3fe2ff',
        'dark-1': '#141414',
        'dark-2': '#222',
        'dark-3': '#333',
        'dark-4': '#444',
        'dark-5': '#555',
        'dark-6': '#666',
        'dark-8': '#888',
        danger: '#ff3f3f',
        'danger-on-hover': '#ff7676',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
