/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#091549',
        'sky-blue': '#87CEEB',
        'off-white': '#F5F5DC', // Beige equivalent as per doc
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}

