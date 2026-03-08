/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: "#134f5c",
        secondary: "#88ada5",
        accent: "#45818e",
        light: "#d9ead3",
      }
    },
  },
  plugins: [],
}