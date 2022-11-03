/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    darkMode:"class",
    extend: {
      colors: {
        "title": "#2D2D2D",
        "text": "#7f7979",
        "text-dark": "#adadad",
        "title-dark": "#e8e5e5",
        primary: "#2563EB",
        secondary: "#ff7849",
        'bg-dark': "#1C1F20",
        bg:"#f7f7f7",
      },
    },
  },
  plugins: [],
});
