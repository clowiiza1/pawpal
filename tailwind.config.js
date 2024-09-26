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
      colors: { // Replace with your custom color code
      pr: '#FFF6EA',  // primary colour
      sc: '#6C4E31',  // secondary colour
      st: '#D8AE7E',  // statement colour
      br: '#6b4e30',  // brown (i think?? lol)
      c1: '#D8A05A',  // soft pink
      c2: '#DEC782',  // dust rose
      c3: '#E2B96D',  // soft meauve
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      minHeight: {
        '3/4': '75vh',
        '4/5': '80vh',
      },
      spacing: {
        '30': '7.8rem',  // Add '30' as 7.5rem (120px)
      },
      width: {
        '86': '60.0 rem',
      },
   },
  },
  plugins: [],
};