/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
          "Poppins":'Poppins,sans-serif'
      },
      colors:{
        'color':"#fff",
        'background': '#302f2fee',
        'background2':'#161414e6'
       
      },
      screens:{
        xs: '480px',
      },
    },
  },
  plugins: [],
}