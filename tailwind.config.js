/** @type {import('tailwindcss').Config} */
 module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  extend: {
  colors: {
  red: '#FF4655',
  black: '#000000',
  white: '#FFFFFF',
  },
  fontFamily: {
  roboto: ['Roboto', 'sans-serif'],
  'exo-2': ['Exo 2', 'sans-serif'],
  },
  spacing: {
  '3xs': '0.25rem',
  '2xs': '0.5rem',
  'xs': '0.75rem',
  'sm': '1rem',
  'md': '1.5rem',
  'lg': '2rem',
  'xl': '3rem',
  '2xl': '4rem',
  },
  },
  },
  plugins: [],
 };