/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005F40', // dark green
          light: '#007A52',
          dark: '#004530'
        },
        secondary: {
          DEFAULT: '#004B8F', // dark blue
          light: '#0060B8',
          dark: '#003666'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};