/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brandColor': '#0071DC',
        'brandColorLight': '#AAD5FF',
        'secendary' : '#ffd620',
        'highLight' : '#CDDC39',
        'brandBg' : '#F2F8FD'
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '1rem',
      },
    },
    fontFamily: {
      'Playfair' : ["Playfair Display", "serif"],
      'Poppins' : ["Poppins", "serif"],
    },
  },
  plugins: [],
}