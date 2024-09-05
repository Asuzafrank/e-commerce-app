/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['poppins', 'sans-serif']
      },
      gridTemplateColumns:{
        '50/50': '48% 50%',
        '60/40': '60% 38%',
        '20/80': '20% 80%',
        '70/30': '70% 28%'
      },
      height: {
        '70': '25.5rem', // Customize this value as needed
      }
    },
  },
  plugins: [],
}

