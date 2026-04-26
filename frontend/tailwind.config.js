/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      boxShadow: {
        'card': '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(0, 0, 0, 0.02)',
        'card-hover': '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 10px 15px rgba(0, 0, 0, 0.04), 0px 20px 25px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
