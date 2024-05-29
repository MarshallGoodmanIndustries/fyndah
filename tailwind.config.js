/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#ffffff',
        secondary: '#edf2fb',
        accent: '#ed8936',
        accentDark: '#ed7a36',
      },
    },
  },
  plugins: [],
}