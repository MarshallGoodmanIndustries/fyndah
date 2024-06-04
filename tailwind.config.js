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
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}