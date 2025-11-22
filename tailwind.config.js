/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        'primary-dark': '#003D99',
        'primary-light': '#E6F0FF',
        'primary-lighter': '#B3D9FF',
        background: '#F0F4F8',
      },
    },
  },
  plugins: [],
};