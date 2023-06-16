/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        backColor:'#121212',
        secBackColor:'#323232',
        textColor:"#FFFFFF",
        secTextColor:'#C4C5C5',
        blue:'#0077FF',
    }
    },
  },
  plugins: [],
}