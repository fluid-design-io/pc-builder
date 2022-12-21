/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaeaf1',
          100: '#b4b5f3',
          200: '#6c6fef',
          300: '#6366e3',
          400: '#5f61d3',
          500: '#4a4dc4',
          600: '#393bb2',
          700: '#2b2e9c',
          800: '#21248c',
          900: '#121459',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
