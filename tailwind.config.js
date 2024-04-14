/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        kurale: ['Kurale', 'sans-serif'],
      },
      screens: {
        custom: '950px',
        575: '575px',
        500: '500px',
        360: '360px',
        945: '945px',
        590: '590px',
        537: '537px',
        430: '430px',
        1120: '1120px',
        1045: '1045px',
        1024: '1024px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
