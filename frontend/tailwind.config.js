/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {
      colors: {
        text: "#afa99e",
        title: "#cecac3",
        "text-light": "#13ce66",
        "title-light": "#ffc82c",
        primary: "#2563EB",
        secondary: "#ff7849",
        bg: "#1C1F20",
        "bg-light": "#8492a6",
      },
    },
  },
  plugins: [],
});
