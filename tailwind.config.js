/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'comfortaa': ['Comfortaa', 'sans-serif'],
      },
      colors: {
        "alice-blue": "#f0f8ff",
        "charcoal-gray" :"#171717"
      }
    },
  },
  plugins: [],
};

