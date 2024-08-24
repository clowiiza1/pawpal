// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
            "./src/**/*.{js,ts,jsx,tsx}",
          "./src/components/**/*.{js,jsx,ts,tsx}", // Include all component files
          "./src/pages/**/*.{js,jsx,ts,tsx}"      // Include all page files
  ],
  theme: {
    extend: {
      colors: {
      pr: '#FFF2D7', // Replace with your custom color code
      sc: '#6C4E31',
      st: '#D8AE7E',
      br: '#6b4e30'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      minHeight: {
        '3/4': '75vh',
        '4/5': '80vh',
      }
   },
  },
  plugins: [],
};