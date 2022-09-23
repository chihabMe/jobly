/** @type {import('tailwindcss').Config} */
module.exports = {
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
        bg: "#F2F6FD",
        "bg-light": "#8492a6",
      },
    },
  },
  plugins: [],
};
