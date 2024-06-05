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
        navyBlue: "#00024c",
        lightRed: "#ec1908",
        textDark: "rgb(40, 40, 40)",
      },
      keyframes: {
        zoomIn: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        zoomIn: 'zoomIn 0.3s ease-out',
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}