/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vide: '#0A0A14',
        violet: '#7B61FF',
        fantome: '#F0EFF4',
        graphite: '#18181B',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
    },
  },
  plugins: [],
}
