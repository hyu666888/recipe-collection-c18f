/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50:  '#fdf4f0',
          100: '#fae5db',
          200: '#f5c9b5',
          300: '#eda484',
          400: '#e47a52',
          500: '#c1440e',
          600: '#a8390b',
          700: '#8c2f09',
          800: '#732708',
          900: '#5e1f07',
        },
        cream: {
          50:  '#fdfcf8',
          100: '#f8f3ea',
          200: '#f0e8d4',
          300: '#e5d8bc',
          400: '#d6c49e',
          500: '#c4ad81',
        },
        sage: {
          50:  '#f3f5f0',
          100: '#e4e9de',
          200: '#c8d3bc',
          300: '#a8b998',
          400: '#869e74',
          500: '#6b845a',
          600: '#556a47',
          700: '#435437',
          800: '#35422c',
          900: '#293421',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
