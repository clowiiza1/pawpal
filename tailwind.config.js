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
      pr: '#F2F1EB', // Replace with your custom color code
      sc: '#6C4E31',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      }
   },
  },
  plugins: [],
};