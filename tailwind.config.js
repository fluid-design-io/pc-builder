/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    keyframes: {
      spin: {
        '0%': {
          transform: 'rotate(0deg)',
          "-webkit-transform": "rotate(0deg)",
        },
        '100%': {
          transform: 'rotate(360deg)',
          "-webkit-transform": "rotate(360deg)",
        },
      }
    },
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
        gray: {
          50: '#f7f7fa',
          100: '#dedee0',
          200: '#9d9daf',
          300: '#b8b8ba',
          400: '#858594',
          500: '#62626e',
          600: '#3c3c47',
          700: '#24242e',
          800: '#191921',
          900: '#0f0f14',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        primary: ['var(--font-primary)']
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(173, 66, 82)) drop-shadow(0 0 15px rgba(74, 76, 180)) drop-shadow(0 0 1px rgba(173, 66, 82))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.65,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3.5s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
}
